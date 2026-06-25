"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { loadGame } from "@/data/load-game";
import { generateSetup, baseFor, effectiveParams } from "@/lib/engine";
import { localize, useT } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";
import { FfbPanel } from "@/components/ffb-panel";
import { TrackCoach } from "@/components/track-coach";
import type {
  BalancePref,
  ConditionFieldId,
  ConditionInput,
  DriverLevel,
  GameData,
  ParameterDef,
  ParameterGroup,
  SetupResult,
  SmoothnessPref,
  Symptom,
  TimeOfDay,
  Track,
  Weather,
} from "@/lib/types";

const SYMPTOMS: Symptom[] = [
  "understeer_entry",
  "understeer_mid",
  "understeer_exit",
  "oversteer_entry",
  "oversteer_mid",
  "oversteer_exit",
  "braking_instability",
  "poor_traction",
  "tyres_overheat",
  "tyres_cold",
  "bouncing",
  "kerb_instability",
];

// Campos de condición por defecto si el juego no declara `conditionFields`.
// Cada juego puede sobrescribirlos en su index.ts para mostrar SOLO las palancas
// que aplican a su disciplina.
const DEFAULT_CONDITION_FIELDS: Record<"circuit" | "rally", ConditionFieldId[]> = {
  circuit: ["weather", "trackTemp", "grip", "fuel"],
  rally: ["surface", "roughness", "weather"],
};

const GROUP_ORDER: ParameterGroup[] = [
  "tyres",
  "aero",
  "suspension",
  "dampers",
  "differential",
  "brakes",
  "gearing",
  "alignment",
  "electronics",
  "other",
];

function decimals(step: number): number {
  if (step >= 1) return 0;
  const s = String(step).split(".")[1];
  return s ? s.length : 1;
}

function formatValue(p: ParameterDef, v: number): string {
  const out = v.toFixed(decimals(p.step));
  return p.unit ? `${out} ${p.unit}` : out;
}

function parseLapToMs(input: string): number | null {
  const m = input.trim().match(/^(?:(\d+):)?(\d{1,2})(?:[.,](\d{1,3}))?$/);
  if (!m) return null;
  const min = m[1] ? parseInt(m[1], 10) : 0;
  const sec = parseInt(m[2], 10);
  const ms = m[3] ? parseInt(m[3].padEnd(3, "0"), 10) : 0;
  if (sec >= 60) return null;
  return (min * 60 + sec) * 1000 + ms;
}

export function Generator({ gameId }: { gameId: string }) {
  const { t } = useT();

  // Carga perezosa del juego: solo bajamos los datos del sim pedido (no el
  // catálogo de los 5), así que game arranca undefined hasta que resuelve.
  const [game, setGame] = useState<GameData | undefined>(undefined);
  const [loadingGame, setLoadingGame] = useState(true);

  // Estado de selección
  const [categoryId, setCategoryId] = useState("");
  const [carId, setCarId] = useState("");
  const [trackId, setTrackId] = useState("");

  // Condiciones
  const [weather, setWeather] = useState<Weather>("dry");
  const [trackTempC, setTrackTempC] = useState<string>("");
  const [grip, setGrip] = useState<"green" | "medium" | "rubbered">("medium");
  const [fuel, setFuel] = useState<"low" | "medium" | "high">("medium");
  const [surface, setSurface] = useState<"tarmac" | "gravel" | "snow" | "mixed">("gravel");
  const [roughness, setRoughness] = useState<"smooth" | "medium" | "rough">("medium");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");

  // Estilo de manejo (cómo le gusta el auto al piloto). Defaults neutros: no mueven
  // el setup hasta que el piloto elige otra cosa.
  const [driverLevel, setDriverLevel] = useState<DriverLevel>("intermediate");
  const [balance, setBalance] = useState<BalancePref>("neutral");
  const [smoothness, setSmoothness] = useState<SmoothnessPref>("neutral");

  const [symptoms, setSymptoms] = useState<Set<Symptom>>(new Set());
  const [result, setResult] = useState<SetupResult | null>(null);
  const [view, setView] = useState<"beginner" | "advanced">("beginner");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoadingGame(true);
    loadGame(gameId).then((g) => {
      if (!alive) return;
      setGame(g);
      // Reseteamos la selección al juego recién cargado (categoría por defecto).
      setCategoryId(g?.categories[0]?.id ?? "");
      setCarId("");
      setResult(null);
      setLoadingGame(false);
    });
    return () => {
      alive = false;
    };
  }, [gameId]);

  const cars = useMemo(
    () => (game ? game.cars.filter((c) => c.categoryId === categoryId) : []),
    [game, categoryId],
  );

  if (loadingGame) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <div className="mx-auto mb-4 h-7 w-7 animate-spin rounded-full border-2 border-border border-t-brand" />
        <h1 className="font-display text-lg font-semibold tracking-tight text-muted">
          {t("common.loading")}
        </h1>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="font-display text-xl font-semibold">{t("games.title")}</h1>
        <p className="mt-2 text-sm text-muted">{t("games.noData")}</p>
        <Link href="/app" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
          ← {t("games.title")}
        </Link>
      </div>
    );
  }

  const isRally = game.meta.discipline === "rally";
  // Campos de condición que ESTE juego expone (data-driven). Si no los declara,
  // usamos el set por defecto de su disciplina.
  const conditionFields =
    game.conditionFields ?? DEFAULT_CONDITION_FIELDS[isRally ? "rally" : "circuit"];
  const showField = (id: ConditionFieldId) => conditionFields.includes(id);
  const car = game.cars.find((c) => c.id === carId);
  const track = game.tracks.find((t) => t.id === trackId);
  // Solo ofrecemos los síntomas que ESTE juego sabe resolver (tiene regla para
  // ellos), respetando el orden de SYMPTOMS. Mantiene las opciones acotadas a lo
  // que aplica a cada disciplina/juego.
  const availableSymptoms = SYMPTOMS.filter((s) =>
    game.symptomRules.some((r) => r.symptom === s),
  );

  function toggleSymptom(s: Symptom) {
    setSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  function onGenerate() {
    if (!carId) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const conditions: ConditionInput = {
      weather,
      trackTempC:
        showField("trackTemp") && trackTempC !== "" ? Number(trackTempC) : undefined,
      grip: showField("grip") ? grip : undefined,
      fuelLoad: showField("fuel") ? fuel : undefined,
      surface: showField("surface") ? surface : undefined,
      roughness: showField("roughness") ? roughness : undefined,
      timeOfDay: showField("timeOfDay") ? timeOfDay : undefined,
      // Estilo: siempre se pasa; en sus valores neutros no aplica ninguna regla.
      driverLevel,
      balance,
      smoothness,
    };
    setResult(
      generateSetup(game!, {
        carId,
        trackId: trackId || undefined,
        conditions,
        symptoms: [...symptoms],
      }),
    );
  }

  function onReset() {
    setResult(null);
    setSymptoms(new Set());
    setWeather("dry");
    setTrackTempC("");
    setTimeOfDay("day");
    setDriverLevel("intermediate");
    setBalance("neutral");
    setSmoothness("neutral");
    setShowError(false);
  }

  // Render de un campo de condición por id. El juego decide CUÁLES se muestran
  // (game.conditionFields); este switch sabe pintar cada uno.
  function renderCondition(id: ConditionFieldId): React.ReactNode {
    switch (id) {
      case "weather":
        return (
          <Field key="weather" label={t("gen.weather")} groupLabel>
            <Segmented
              value={weather}
              onChange={(v) => setWeather(v as Weather)}
              options={(["dry", "damp", "wet"] as const).map((w) => ({
                value: w,
                label: t(`weather.${w}`),
              }))}
            />
          </Field>
        );
      case "trackTemp":
        return (
          <Field key="trackTemp" label={t("gen.trackTemp")} hint={t("common.optional")}>
            <input
              type="number"
              value={trackTempC}
              onChange={(e) => setTrackTempC(e.target.value)}
              placeholder="25"
              className="field telemetry"
            />
          </Field>
        );
      case "grip":
        return (
          <Field key="grip" label={t("gen.grip")} groupLabel>
            <Segmented
              value={grip}
              onChange={(v) => setGrip(v as typeof grip)}
              options={(["green", "medium", "rubbered"] as const).map((gr) => ({
                value: gr,
                label: t(`grip.${gr}`),
              }))}
            />
          </Field>
        );
      case "fuel":
        return (
          <Field key="fuel" label={t("gen.fuel")} groupLabel>
            <Segmented
              value={fuel}
              onChange={(v) => setFuel(v as typeof fuel)}
              options={(["low", "medium", "high"] as const).map((f) => ({
                value: f,
                label: t(`fuel.${f}`),
              }))}
            />
          </Field>
        );
      case "timeOfDay":
        return (
          <Field key="timeOfDay" label={t("gen.timeOfDay")} groupLabel>
            <Segmented
              value={timeOfDay}
              onChange={(v) => setTimeOfDay(v as TimeOfDay)}
              options={(["day", "dusk", "night"] as const).map((d) => ({
                value: d,
                label: t(`timeOfDay.${d}`),
              }))}
            />
          </Field>
        );
      case "surface":
        return (
          <Field key="surface" label={t("gen.surface")} groupLabel>
            <Segmented
              value={surface}
              onChange={(v) => setSurface(v as typeof surface)}
              options={(["tarmac", "gravel", "snow", "mixed"] as const).map((s) => ({
                value: s,
                label: t(`surface.${s}`),
              }))}
            />
          </Field>
        );
      case "roughness":
        return (
          <Field key="roughness" label={t("gen.roughness")} groupLabel>
            <Segmented
              value={roughness}
              onChange={(v) => setRoughness(v as typeof roughness)}
              options={(["smooth", "medium", "rough"] as const).map((r) => ({
                value: r,
                label: t(`roughness.${r}`),
              }))}
            />
          </Field>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <header className="reveal reveal-1 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link
            href="/app"
            className="eyebrow text-[0.65rem] text-muted transition-colors hover:text-brand"
          >
            ← {t("games.title")}
          </Link>
          <h1 className="mt-1.5 font-display text-3xl font-bold tracking-tight">
            {game.meta.name}
          </h1>
        </div>
        <span
          className="rounded-md border px-2.5 py-1 font-display text-xs font-bold uppercase tracking-wider"
          style={{
            background: `${game.meta.accent}1a`,
            color: game.meta.accent,
            borderColor: `${game.meta.accent}44`,
          }}
        >
          {isRally ? t("games.rally") : t("games.circuit")}
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Panel de selección */}
        <section className="card reveal reveal-2 flex h-fit flex-col gap-5 p-5 lg:sticky lg:top-20 lg:p-6">
          {/* Categoría + auto */}
          <Field label={t("gen.category")}>
            <Select
              value={categoryId}
              onChange={(v) => {
                setCategoryId(v);
                setCarId("");
                setResult(null);
              }}
              options={game.categories.map((c) => ({ value: c.id, label: c.name }))}
            />
          </Field>

          <Field label={t("gen.car")}>
            <Select
              value={carId}
              onChange={(v) => {
                // Limpiamos el result viejo: si no, al cambiar de auto la tabla
                // y el guardado mezclaban el auto nuevo con los valores del viejo.
                setCarId(v);
                setResult(null);
              }}
              placeholder={t("gen.selectCar")}
              options={cars.map((c) => ({ value: c.id, label: c.name }))}
            />
          </Field>

          <Field
            label={isRally ? t("gen.trackRally") : t("gen.trackCircuit")}
            hint={t("common.optional")}
          >
            <Select
              value={trackId}
              onChange={(v) => {
                setTrackId(v);
                setResult(null);
              }}
              placeholder={isRally ? t("gen.selectTrackRally") : t("gen.selectTrackCircuit")}
              options={game.tracks.map((tk) => ({
                value: tk.id,
                label: tk.country ? `${tk.name} · ${tk.country}` : tk.name,
              }))}
            />
          </Field>

          <Divider />

          {/* Condiciones (data-driven: cada juego declara sus campos) */}
          <SectionLabel>{t("gen.conditions")}</SectionLabel>
          {conditionFields.map((f) => renderCondition(f))}

          <Divider />

          {/* Tu estilo de manejo (nivel + balance + suavidad) */}
          <div>
            <SectionLabel>{t("gen.style")}</SectionLabel>
            <p className="mt-1 text-xs text-muted">{t("gen.styleHint")}</p>
          </div>
          <Field label={t("gen.driverLevel")} groupLabel>
            <Segmented
              value={driverLevel}
              onChange={(v) => setDriverLevel(v as DriverLevel)}
              options={(["beginner", "intermediate", "pro"] as const).map((l) => ({
                value: l,
                label: t(`level.${l}`),
              }))}
            />
          </Field>
          <Field label={t("gen.balance")} groupLabel>
            <Segmented
              value={balance}
              onChange={(v) => setBalance(v as BalancePref)}
              options={(["stable", "neutral", "agile"] as const).map((b) => ({
                value: b,
                label: t(`balance.${b}`),
              }))}
            />
          </Field>
          <Field label={t("gen.smoothness")} groupLabel>
            <Segmented
              value={smoothness}
              onChange={(v) => setSmoothness(v as SmoothnessPref)}
              options={(["smooth", "neutral", "aggressive"] as const).map((s) => ({
                value: s,
                label: t(`smoothness.${s}`),
              }))}
            />
          </Field>

          <Divider />

          {/* Problemas / síntomas */}
          <div>
            <SectionLabel>{t("gen.problems")}</SectionLabel>
            <p className="mt-1 text-xs text-muted">{t("gen.problemsHint")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSymptoms.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={symptoms.has(s)}
                onClick={() => toggleSymptom(s)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  symptoms.has(s)
                    ? "border-brand/60 bg-brand/15 text-brand shadow-[0_0_0_1px_rgba(46,139,255,0.25),0_6px_18px_-10px_rgba(46,139,255,0.7)]"
                    : "border-border bg-bg/40 text-muted hover:border-border-strong hover:text-fg",
                )}
              >
                {t(`symptom.${s}`)}
              </button>
            ))}
          </div>

          {showError && (
            <p
              role="alert"
              className="rounded-lg border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn"
            >
              {t("gen.pickCarFirst")}
            </p>
          )}

          <div className="flex gap-2.5 pt-1">
            <button onClick={onGenerate} className="btn-primary flex-1 px-4 py-3 text-sm">
              {t("gen.generate")}
            </button>
            <button onClick={onReset} className="btn-ghost px-4 py-3 text-sm text-muted">
              {t("gen.reset")}
            </button>
          </div>
        </section>

        {/* Resultado */}
        <section className="min-w-0">
          {result && car ? (
            <ResultPanel
              game={game}
              gameId={gameId}
              result={result}
              carId={carId}
              carName={car.name}
              trackId={trackId}
              trackName={track?.name ?? null}
              track={track}
              symptoms={[...symptoms]}
              view={view}
              setView={setView}
            />
          ) : (
            <div className="card flex h-full min-h-[340px] flex-col items-center justify-center gap-3 border-dashed p-8 text-center">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface-2 font-display text-xl text-brand"
              >
                ⚙
              </span>
              <p className="max-w-xs text-sm text-muted">{t("gen.emptyResult")}</p>
            </div>
          )}
        </section>
      </div>

      <FfbPanel game={game} />
    </div>
  );
}

/* ---------- Resultado ---------- */

function ResultPanel({
  game,
  gameId,
  result,
  carId,
  carName,
  trackId,
  trackName,
  track,
  symptoms,
  view,
  setView,
}: {
  game: GameData;
  gameId: string;
  result: SetupResult;
  carId: string;
  carName: string;
  trackId: string;
  trackName: string | null;
  track?: Track;
  symptoms: Symptom[];
  view: "beginner" | "advanced";
  setView: (v: "beginner" | "advanced") => void;
}) {
  const { t, locale } = useT();
  const base = useMemo(() => baseFor(game, carId), [game, carId]);
  // Parámetros EFECTIVOS de este auto: el rango/paso/default puede diferir por
  // coche o clase, así que la tabla, los formatos y las explicaciones usan estos.
  const params = useMemo(() => effectiveParams(game, carId), [game, carId]);
  const paramById = useMemo(
    () => new Map(params.map((p) => [p.id, p])),
    [params],
  );
  const changedIds = useMemo(
    () => new Set(params.filter((p) => base[p.id] !== result.values[p.id]).map((p) => p.id)),
    [params, base, result],
  );

  const explainParams =
    view === "advanced"
      ? params
      : params.filter((p) => changedIds.has(p.id));

  return (
    <div className="reveal reveal-3 flex flex-col gap-5">
      <div className="card overflow-hidden p-0">
        <div className="h-1 w-full bg-gradient-to-r from-brand via-sky to-transparent" />
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-[0.6rem]">{t("result.title")}</span>
            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-display text-[0.65rem] font-semibold uppercase tracking-wider text-brand">
              {result.adjustments.length} {t("result.changed")}
            </span>
          </div>
          <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight">
            {carName}
          </h2>
          {trackName && <p className="text-sm text-muted">{trackName}</p>}
          <p className="mt-3 rounded-lg border border-border/60 bg-bg/40 px-3 py-2 text-xs leading-relaxed text-muted">
            {t("result.disclaimer")}
          </p>
        </div>
      </div>

      <TrackCoach track={track} symptoms={symptoms} />

      {result.notes.length > 0 && (
        <div className="rounded-2xl border border-sky/25 bg-sky/[0.06] p-4">
          <ul className="flex flex-col gap-2 text-xs leading-relaxed text-muted">
            {result.notes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-sky">ℹ</span>
                <span>{localize(n, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cambios aplicados */}
      <div className="card p-5">
        <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {t("result.changed")}
        </h3>
        {result.adjustments.length === 0 ? (
          <p className="text-sm text-muted">{t("result.noChanges")}</p>
        ) : (
          <ul className="flex flex-col gap-3.5">
            {result.adjustments.map((a, i) => {
              const p = paramById.get(a.paramId);
              if (!p) return null;
              const up = a.to > a.from;
              return (
                <li key={i} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                      up ? "bg-good/15 text-good" : "bg-sky/15 text-sky",
                    )}
                  >
                    {up ? "↑" : "↓"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {localize(p.name, locale)}:{" "}
                      <span className="telemetry text-muted line-through">{formatValue(p, a.from)}</span>{" "}
                      <span className="text-faint">→</span>{" "}
                      <span className="telemetry font-semibold text-fg">{formatValue(p, a.to)}</span>
                    </p>
                    <p className="text-xs leading-relaxed text-muted">
                      {localize(a.reason, locale)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Setup completo */}
      <div className="card p-5">
        <h3 className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {t("result.values")}
        </h3>
        <div className="flex flex-col gap-4">
          {GROUP_ORDER.map((group) => {
            const groupParams = params.filter((p) => p.group === group);
            if (groupParams.length === 0) return null;
            return (
              <div key={group}>
                <p className="mb-1.5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky">
                  {t(`group.${group}`)}
                </p>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {groupParams.map((p, idx) => {
                        const changed = changedIds.has(p.id);
                        return (
                          <tr
                            key={p.id}
                            className={cn(
                              idx > 0 && "border-t border-border/70",
                              changed && "bg-brand/[0.07]",
                            )}
                          >
                            <td className="relative px-3 py-2 text-muted">
                              {changed && (
                                <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-brand" />
                              )}
                              {localize(p.name, locale)}
                            </td>
                            <td className="telemetry px-3 py-2 text-right text-faint">
                              {formatValue(p, base[p.id])}
                            </td>
                            <td
                              className={cn(
                                "telemetry px-3 py-2 text-right font-semibold",
                                changed ? "text-brand" : "text-fg",
                              )}
                            >
                              {formatValue(p, result.values[p.id])}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 flex gap-4 text-[11px] text-muted">
          <span>{t("result.base")} = {t("result.baseLegend")}</span>
          <span className="font-semibold text-brand">
            {t("result.recommended")} = {t("result.recommendedLegend")}
          </span>
        </p>
      </div>

      {/* Explicaciones educativas */}
      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {t("result.explainTitle")}
          </h3>
          <div className="flex items-center rounded-lg border border-border bg-bg/50 p-0.5 text-xs font-semibold">
            {(["beginner", "advanced"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-2.5 py-1 transition-colors",
                  view === v ? "bg-brand text-white" : "text-muted hover:text-fg",
                )}
              >
                {v === "beginner" ? t("gen.viewBeginner") : t("gen.viewAdvanced")}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border/70">
          {explainParams.map((p) => (
            <details key={p.id} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                <span>
                  {localize(p.name, locale)}
                  {changedIds.has(p.id) && (
                    <span className="ml-2 rounded bg-brand/15 px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                      {t("result.changed")}
                    </span>
                  )}
                </span>
                <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-2 flex flex-col gap-2 text-xs leading-relaxed text-muted">
                <p>{localize(p.whatItDoes, locale)}</p>
                <p>
                  <span className="font-semibold text-good">{t("result.increase")}:</span>{" "}
                  {localize(p.increaseEffect, locale)}
                </p>
                <p>
                  <span className="font-semibold text-sky">{t("result.decrease")}:</span>{" "}
                  {localize(p.decreaseEffect, locale)}
                </p>
                <p className="telemetry text-faint">
                  {t("result.range")}: {formatValue(p, p.min)} – {formatValue(p, p.max)}
                  {" · "}
                  {t("result.stepLabel")} {p.step}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <SaveBar
        gameId={gameId}
        carId={carId}
        carName={carName}
        trackId={trackId}
        result={result}
      />
    </div>
  );
}

/* ---------- Guardar (favoritos / nota / vuelta) ---------- */

function SaveBar({
  gameId,
  carId,
  carName,
  trackId,
  result,
}: {
  gameId: string;
  carId: string;
  carName: string;
  trackId: string;
  result: SetupResult;
}) {
  const { t, locale } = useT();
  const [msg, setMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteBody, setNoteBody] = useState("");
  const [lapOpen, setLapOpen] = useState(false);
  const [lapInput, setLapInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [favSaved, setFavSaved] = useState(false);
  const msgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mensaje efímero (éxito o error) que se borra solo a los 4s. Antes el texto
  // "Guardado" quedaba fijo para siempre y los errores se pintaban en verde.
  function flash(text: string, error = false) {
    setMsg({ text, error });
    if (msgTimer.current) clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMsg(null), 4000);
  }
  useEffect(
    () => () => {
      if (msgTimer.current) clearTimeout(msgTimer.current);
    },
    [],
  );

  // Cada Generate produce un result nuevo: rehabilitamos el botón de favorito
  // para que se pueda guardar el setup recién generado (antes quedaba latcheado
  // en "Guardado" del setup anterior).
  useEffect(() => setFavSaved(false), [result]);

  async function saveFavorite() {
    setBusy(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId,
          carId,
          trackId: trackId || null,
          label: carName,
          payload: { values: result.values },
        }),
      });
      if (res.ok) {
        // Deshabilitamos el botón tras guardar: cada POST crea una fila nueva,
        // así evitamos favoritos duplicados por doble click.
        setFavSaved(true);
        flash(t("result.savedFav"));
      } else {
        flash(t("auth.errorGeneric"), true);
      }
    } catch {
      // Sin este catch un fallo de red dejaba el botón deshabilitado para
      // siempre y sin ningún mensaje.
      flash(t("auth.errorGeneric"), true);
    } finally {
      setBusy(false);
    }
  }

  async function saveNote() {
    if (!noteBody.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, carId, trackId: trackId || null, body: noteBody }),
      });
      if (res.ok) {
        setNoteBody("");
        setNoteOpen(false);
        flash(t("common.saved"));
      } else {
        flash(t("auth.errorGeneric"), true);
      }
    } catch {
      flash(t("auth.errorGeneric"), true);
    } finally {
      setBusy(false);
    }
  }

  async function saveLap() {
    const ms = parseLapToMs(lapInput);
    if (ms == null || !trackId) {
      flash(
        locale === "es"
          ? "Carga un tiempo válido (ej. 1:23.456) y elige una pista."
          : "Enter a valid time (e.g. 1:23.456) and pick a track.",
        true,
      );
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/laps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, carId, trackId, lapTimeMs: ms }),
      });
      if (res.ok) {
        setLapInput("");
        setLapOpen(false);
        flash(t("common.saved"));
      } else {
        flash(t("auth.errorGeneric"), true);
      }
    } catch {
      flash(t("auth.errorGeneric"), true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card p-4">
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={saveFavorite}
          disabled={busy || favSaved}
          className="btn-primary px-4 py-2 text-sm"
        >
          {favSaved ? `✓ ${t("common.saved")}` : `★ ${t("result.saveFav")}`}
        </button>
        <button
          onClick={() => {
            setNoteOpen((o) => !o);
            setLapOpen(false);
          }}
          className="btn-ghost px-4 py-2 text-sm"
        >
          {t("result.addNote")}
        </button>
        <button
          onClick={() => {
            setLapOpen((o) => !o);
            setNoteOpen(false);
          }}
          className="btn-ghost px-4 py-2 text-sm"
        >
          {t("result.addLap")}
        </button>
      </div>

      {noteOpen && (
        <div className="mt-3 flex flex-col gap-2">
          <textarea
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
            placeholder={t("garage.noteBody")}
            aria-label={t("garage.noteBody")}
            rows={3}
            className="field"
          />
          <button onClick={saveNote} disabled={busy} className="btn-primary self-start px-4 py-1.5 text-sm">
            {t("common.save")}
          </button>
        </div>
      )}

      {lapOpen && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={lapInput}
            onChange={(e) => setLapInput(e.target.value)}
            placeholder="1:23.456"
            aria-label={t("result.addLap")}
            className="field telemetry w-32"
          />
          <button onClick={saveLap} disabled={busy} className="btn-primary px-4 py-1.5 text-sm">
            {t("common.save")}
          </button>
        </div>
      )}

      {msg && (
        <p
          role="alert"
          className={cn(
            "mt-3 text-sm font-medium",
            msg.error ? "text-danger" : "text-good",
          )}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}

/* ---------- Primitivas de UI ---------- */

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-fg">
      {children}
    </p>
  );
}

let fieldGroupSeq = 0;

function Field({
  label,
  hint,
  groupLabel,
  children,
}: {
  label: string;
  hint?: string;
  // Cuando el control es un grupo de botones (Segmented) y no un input nativo
  // labelable, un <label> no nombra nada: usamos role="group" + aria-labelledby.
  groupLabel?: boolean;
  children: React.ReactNode;
}) {
  // id estable por instancia para enlazar el <span> con el role="group".
  const groupId = useMemo(() => `fld-${++fieldGroupSeq}`, []);
  const labelText = (
    <span className="flex items-center gap-2 text-sm font-medium text-muted">
      {label}
      {hint && (
        <span className="text-[10px] uppercase tracking-wide text-faint">{hint}</span>
      )}
    </span>
  );

  if (groupLabel) {
    return (
      <div className="flex flex-col gap-1.5">
        <span id={groupId}>{labelText}</span>
        <div role="group" aria-labelledby={groupId}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <label className="flex flex-col gap-1.5">
      {labelText}
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="field"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
            value === o.value
              ? "border-brand/60 bg-brand/15 text-brand shadow-[0_0_0_1px_rgba(46,139,255,0.25)]"
              : "border-border bg-bg/40 text-muted hover:border-border-strong hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

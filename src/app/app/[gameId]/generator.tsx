"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { loadGame } from "@/data/load-game";
import { generateSetup, baseFor, effectiveParams } from "@/lib/engine";
import { localize, useT } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";
import { FfbPanel } from "@/components/ffb-panel";
import type {
  ConditionInput,
  GameData,
  ParameterDef,
  ParameterGroup,
  SetupResult,
  Symptom,
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
  // catálogo de los 7), así que game arranca undefined hasta que resuelve.
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
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-xl font-semibold">{t("common.loading")}</h1>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-xl font-semibold">{t("games.title")}</h1>
        <p className="mt-2 text-sm text-muted">{t("games.noData")}</p>
        <Link href="/app" className="mt-6 inline-block text-sm font-semibold text-brand">
          ← {t("games.title")}
        </Link>
      </div>
    );
  }

  const isRally = game.meta.discipline === "rally";
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
      trackTempC: trackTempC === "" ? undefined : Number(trackTempC),
      grip: isRally ? undefined : grip,
      fuelLoad: isRally ? undefined : fuel,
      surface: isRally ? surface : undefined,
      roughness: isRally ? roughness : undefined,
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
    setShowError(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/app" className="text-xs font-medium text-muted hover:text-fg">
            ← {t("games.title")}
          </Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{game.meta.name}</h1>
        </div>
        <span
          className="rounded px-2 py-1 text-xs font-bold uppercase"
          style={{ background: `${game.meta.accent}22`, color: game.meta.accent }}
        >
          {isRally ? t("games.rally") : t("games.circuit")}
        </span>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Panel de selección */}
        <section className="flex flex-col gap-5 rounded-xl border border-border bg-surface/50 p-5">
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

          <div className="h-px bg-border" />

          {/* Condiciones */}
          <p className="text-sm font-semibold text-fg">{t("gen.conditions")}</p>

          <Field label={t("gen.weather")}>
            <Segmented
              value={weather}
              onChange={(v) => setWeather(v as Weather)}
              options={(["dry", "damp", "wet"] as const).map((w) => ({
                value: w,
                label: t(`weather.${w}`),
              }))}
            />
          </Field>

          {isRally ? (
            <>
              <Field label={t("gen.surface")}>
                <Segmented
                  value={surface}
                  onChange={(v) => setSurface(v as typeof surface)}
                  options={(["tarmac", "gravel", "snow", "mixed"] as const).map((s) => ({
                    value: s,
                    label: t(`surface.${s}`),
                  }))}
                />
              </Field>
              <Field label={t("gen.roughness")}>
                <Segmented
                  value={roughness}
                  onChange={(v) => setRoughness(v as typeof roughness)}
                  options={(["smooth", "medium", "rough"] as const).map((r) => ({
                    value: r,
                    label: t(`roughness.${r}`),
                  }))}
                />
              </Field>
            </>
          ) : (
            <>
              <Field label={t("gen.trackTemp")} hint={t("common.optional")}>
                <input
                  type="number"
                  value={trackTempC}
                  onChange={(e) => setTrackTempC(e.target.value)}
                  placeholder="25"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </Field>
              <Field label={t("gen.grip")}>
                <Segmented
                  value={grip}
                  onChange={(v) => setGrip(v as typeof grip)}
                  options={(["green", "medium", "rubbered"] as const).map((gr) => ({
                    value: gr,
                    label: t(`grip.${gr}`),
                  }))}
                />
              </Field>
              <Field label={t("gen.fuel")}>
                <Segmented
                  value={fuel}
                  onChange={(v) => setFuel(v as typeof fuel)}
                  options={(["low", "medium", "high"] as const).map((f) => ({
                    value: f,
                    label: t(`fuel.${f}`),
                  }))}
                />
              </Field>
            </>
          )}

          <div className="h-px bg-border" />

          {/* Problemas / síntomas */}
          <div>
            <p className="text-sm font-semibold text-fg">{t("gen.problems")}</p>
            <p className="mt-0.5 text-xs text-muted">{t("gen.problemsHint")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSymptoms.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={symptoms.has(s)}
                onClick={() => toggleSymptom(s)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  symptoms.has(s)
                    ? "border-brand bg-brand/15 text-brand"
                    : "border-border bg-surface text-muted hover:text-fg",
                )}
              >
                {t(`symptom.${s}`)}
              </button>
            ))}
          </div>

          {showError && (
            <p className="rounded-lg border border-warn/40 bg-warn/10 px-3 py-2 text-sm text-warn">
              {t("gen.pickCarFirst")}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={onGenerate}
              className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-brand-strong"
            >
              {t("gen.generate")}
            </button>
            <button
              onClick={onReset}
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
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
              view={view}
              setView={setView}
            />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
              {t("gen.emptyResult")}
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
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-border bg-surface/60 p-5">
        <h2 className="text-lg font-bold">
          {t("result.title")}
        </h2>
        <p className="text-sm text-muted">
          {carName}
          {trackName ? ` · ${trackName}` : ""}
        </p>
        <p className="mt-3 rounded-lg bg-surface-2 px-3 py-2 text-xs leading-relaxed text-muted">
          {t("result.disclaimer")}
        </p>
      </div>

      {result.notes.length > 0 && (
        <div className="rounded-xl border border-sky/30 bg-sky/5 p-4">
          <ul className="flex flex-col gap-2 text-xs leading-relaxed text-muted">
            {result.notes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden>ℹ️</span>
                <span>{localize(n, locale)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cambios aplicados */}
      <div className="rounded-xl border border-border bg-surface/60 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          {t("result.changed")}
        </h3>
        {result.adjustments.length === 0 ? (
          <p className="text-sm text-muted">{t("result.noChanges")}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {result.adjustments.map((a, i) => {
              const p = paramById.get(a.paramId);
              if (!p) return null;
              const up = a.to > a.from;
              return (
                <li key={i} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      up ? "bg-good/15 text-good" : "bg-sky/15 text-sky",
                    )}
                  >
                    {up ? "↑" : "↓"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {localize(p.name, locale)}:{" "}
                      <span className="text-muted line-through">{formatValue(p, a.from)}</span>{" "}
                      → <span className="font-semibold text-fg">{formatValue(p, a.to)}</span>
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
      <div className="rounded-xl border border-border bg-surface/60 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          {t("result.values")}
        </h3>
        <div className="flex flex-col gap-4">
          {GROUP_ORDER.map((group) => {
            const groupParams = params.filter((p) => p.group === group);
            if (groupParams.length === 0) return null;
            return (
              <div key={group}>
                <p className="mb-1.5 text-xs font-semibold text-brand">
                  {t(`group.${group}`)}
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {groupParams.map((p, idx) => {
                        const changed = changedIds.has(p.id);
                        return (
                          <tr
                            key={p.id}
                            className={cn(
                              idx > 0 && "border-t border-border",
                              changed && "bg-brand/5",
                            )}
                          >
                            <td className="px-3 py-2 text-muted">{localize(p.name, locale)}</td>
                            <td className="px-3 py-2 text-right tabular-nums text-muted/70">
                              {formatValue(p, base[p.id])}
                            </td>
                            <td
                              className={cn(
                                "px-3 py-2 text-right font-semibold tabular-nums",
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
      <div className="rounded-xl border border-border bg-surface/60 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {t("result.explainTitle")}
          </h3>
          <div className="flex items-center rounded-md border border-border bg-surface p-0.5 text-xs font-semibold">
            {(["beginner", "advanced"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded px-2 py-1 transition-colors",
                  view === v ? "bg-brand text-bg" : "text-muted hover:text-fg",
                )}
              >
                {v === "beginner" ? t("gen.viewBeginner") : t("gen.viewAdvanced")}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border">
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
                <p className="text-muted/70">
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
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={saveFavorite}
          disabled={busy || favSaved}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-brand-strong disabled:opacity-50"
        >
          {favSaved ? `✓ ${t("common.saved")}` : `★ ${t("result.saveFav")}`}
        </button>
        <button
          onClick={() => {
            setNoteOpen((o) => !o);
            setLapOpen(false);
          }}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
        >
          {t("result.addNote")}
        </button>
        <button
          onClick={() => {
            setLapOpen((o) => !o);
            setNoteOpen(false);
          }}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
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
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <button
            onClick={saveNote}
            disabled={busy}
            className="self-start rounded-lg bg-brand px-4 py-1.5 text-sm font-semibold text-bg disabled:opacity-50"
          >
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
            className="w-32 rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <button
            onClick={saveLap}
            disabled={busy}
            className="rounded-lg bg-brand px-4 py-1.5 text-sm font-semibold text-bg disabled:opacity-50"
          >
            {t("common.save")}
          </button>
        </div>
      )}

      {msg && (
        <p
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

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-2 text-sm font-medium text-muted">
        {label}
        {hint && <span className="text-[10px] uppercase tracking-wide text-muted/60">{hint}</span>}
      </span>
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
      className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
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
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
            value === o.value
              ? "border-brand bg-brand/15 text-brand"
              : "border-border bg-surface text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { localize, useT } from "@/lib/i18n/context";
import type { Locale } from "@/lib/types";

// Comparador de vueltas: agrupa los tiempos guardados por auto+pista y, por cada
// combinación, muestra la MEJOR vuelta, el gap de cada intento contra esa mejor,
// cuánto bajaste desde tu primer intento y tu constancia. Además:
//  · A/B de setups: si etiquetaste tus vueltas con el setup usado, dice cuál fue
//    más rápido (best por setup + delta).
//  · Tiempo-objetivo: fijás un objetivo por combinación (se guarda en el
//    navegador) y ves el gap y una barra de progreso desde tu primer intento.
// Todo es matemática sobre los datos PROPIOS del piloto: nada inventado, sin
// cambios de API ni de schema (LapRecord.setupRef ya existía).
// Strings locales (no tocan el diccionario global, igual que SetupExport/Coach).

type Lap = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string;
  lapTimeMs: number;
  setupRef: string | null;
  comboLabel: string;
  createdAt: string;
};

const L = {
  best: { es: "Mejor", en: "Best" },
  laps: { es: "vueltas", en: "laps" },
  lap1: { es: "vuelta", en: "lap" },
  bestTag: { es: "TU MEJOR", en: "YOUR BEST" },
  improved: {
    es: "más rápido que tu primer intento",
    en: "faster than your first attempt",
  },
  consistency: {
    es: "Constancia (rango entre tu mejor y tu peor)",
    en: "Consistency (spread best-to-worst)",
  },
  hintOneLap: {
    es: "Guardá otra vuelta en este auto y pista para empezar a comparar.",
    en: "Save another lap on this car and track to start comparing.",
  },
  abTitle: { es: "Qué setup fue más rápido", en: "Which setup was faster" },
  fastest: { es: "MÁS RÁPIDO", en: "FASTEST" },
  target: { es: "Tiempo objetivo", en: "Target time" },
  setTarget: { es: "Fijar", en: "Set" },
  clearTarget: { es: "Quitar", en: "Clear" },
  targetReached: { es: "✓ Objetivo alcanzado", en: "✓ Target reached" },
  toTarget: { es: "al objetivo", en: "to target" },
  targetBad: { es: "Formato inválido (ej. 1:30.000)", en: "Invalid format (e.g. 1:30.000)" },
  del: { es: "Borrar vuelta", en: "Delete lap" },
} as const;

function fmtLap(ms: number): string {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const mm = ms % 1000;
  return `${m}:${String(s).padStart(2, "0")}.${String(mm).padStart(3, "0")}`;
}

// Diferencia con signo en segundos (ej. "+0.842", "-1.230").
function fmtGap(ms: number): string {
  const sign = ms > 0 ? "+" : ms < 0 ? "-" : "";
  return `${sign}${(Math.abs(ms) / 1000).toFixed(3)}`;
}

// "1:23.456" | "83.456" | "1:23" → ms. Mismo formato que el input de vueltas.
function parseLapToMs(input: string): number | null {
  const m = input.trim().match(/^(?:(\d+):)?(\d{1,2})(?:[.,](\d{1,3}))?$/);
  if (!m) return null;
  const min = m[1] ? parseInt(m[1], 10) : 0;
  const sec = parseInt(m[2], 10);
  const ms = m[3] ? parseInt(m[3].padEnd(3, "0"), 10) : 0;
  // 60+ s sólo inválido con minutos (1:75). Sin minutos, "83.456" = 1:23.456 válido.
  if (m[1] && sec >= 60) return null;
  return (min * 60 + sec) * 1000 + ms;
}

type Group = {
  key: string;
  comboLabel: string;
  laps: Lap[]; // tal como llegan (más nuevas primero)
  best: number;
  worst: number;
  firstAttempt: number; // la cronológicamente más vieja
};

function groupLaps(laps: Lap[]): Group[] {
  const map = new Map<string, Lap[]>();
  for (const l of laps) {
    const key = `${l.gameId}|${l.carId}|${l.trackId}`;
    const arr = map.get(key);
    if (arr) arr.push(l);
    else map.set(key, [l]);
  }
  const groups: Group[] = [];
  for (const [key, arr] of map) {
    const times = arr.map((l) => l.lapTimeMs);
    groups.push({
      key,
      comboLabel: arr[0].comboLabel,
      laps: arr,
      best: Math.min(...times),
      worst: Math.max(...times),
      // El input viene ordenado por createdAt DESC: el primer intento es el último.
      firstAttempt: arr[arr.length - 1].lapTimeMs,
    });
  }
  // Combinaciones con más vueltas primero (las más trabajadas arriba).
  groups.sort((a, b) => b.laps.length - a.laps.length);
  return groups;
}

// Mejor vuelta por setup ETIQUETADO. Para el A/B "¿con qué setup fui más rápido?".
// Sólo cuenta vueltas con etiqueta: comparar contra un bucket "sin etiqueta" sería
// premiar una vuelta de setup DESCONOCIDO como si fuera un setup ganador (dato
// engañoso). Agrupa por clave normalizada (minúsculas + espacios colapsados) para
// que "Soft"/"soft" sean el mismo setup, pero muestra la etiqueta original.
function bestBySetup(g: Group): { label: string; best: number }[] {
  const m = new Map<string, { label: string; best: number }>();
  for (const l of g.laps) {
    const raw = l.setupRef?.trim();
    if (!raw) continue; // sin etiqueta → fuera del A/B
    const key = raw.toLowerCase().replace(/\s+/g, " ");
    const cur = m.get(key);
    if (cur === undefined || l.lapTimeMs < cur.best) m.set(key, { label: raw, best: l.lapTimeMs });
  }
  return [...m.values()].sort((a, b) => a.best - b.best);
}

export function LapComparator({
  laps,
  onDelete,
}: {
  laps: Lap[];
  onDelete: (id: string) => void;
}) {
  const { locale } = useT();
  const groups = groupLaps(laps);

  return (
    <ul className="flex flex-col gap-4">
      {groups.map((g) => (
        <ComboCard key={g.key} g={g} locale={locale} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function ComboCard({
  g,
  locale,
  onDelete,
}: {
  g: Group;
  locale: Locale;
  onDelete: (id: string) => void;
}) {
  const improvement = g.firstAttempt - g.best; // >0 = mejoraste
  const spread = g.worst - g.best;
  const multi = g.laps.length > 1;

  // A/B por setup: sólo si hay ≥2 setups ETIQUETADOS distintos (sin contar vueltas
  // sin etiqueta, que no son un setup comparable).
  const setups = bestBySetup(g);
  const showAB = setups.length >= 2;

  // Tiempo objetivo (persistido en el navegador, por combinación).
  const storeKey = `psr_target_${g.key}`;
  const [targetMs, setTargetMs] = useState<number | null>(null);
  const [targetInput, setTargetInput] = useState("");
  const [targetBad, setTargetBad] = useState(false);
  useEffect(() => {
    // Self-contained ante cambios de storeKey: el `else` resetea explícitamente,
    // así no dependemos del remount por key={g.key} para evitar objetivo "fantasma".
    try {
      const v = localStorage.getItem(storeKey);
      const n = v != null ? Number(v) : NaN;
      if (v != null && Number.isFinite(n) && n > 0) {
        setTargetMs(n);
        setTargetInput(fmtLap(n));
      } else {
        setTargetMs(null);
        setTargetInput("");
      }
    } catch {
      /* localStorage no disponible: el objetivo simplemente no persiste */
    }
  }, [storeKey]);

  function saveTarget() {
    const ms = parseLapToMs(targetInput);
    if (ms == null) {
      setTargetBad(true); // feedback en vez de fallar en silencio
      return;
    }
    setTargetBad(false);
    setTargetMs(ms);
    try {
      localStorage.setItem(storeKey, String(ms));
    } catch {
      /* sin persistencia, pero el objetivo igual aplica en esta sesión */
    }
  }
  function clearTarget() {
    setTargetMs(null);
    setTargetInput("");
    setTargetBad(false);
    try {
      localStorage.removeItem(storeKey);
    } catch {
      /* no-op */
    }
  }

  const gapToTarget = targetMs != null ? g.best - targetMs : null;
  const reached = gapToTarget != null && gapToTarget <= 0;
  // Progreso del primer intento hacia el objetivo (0..1).
  let progress = 0;
  if (targetMs != null) {
    if (reached) progress = 1;
    else if (g.firstAttempt > targetMs)
      progress = Math.min(1, Math.max(0, (g.firstAttempt - g.best) / (g.firstAttempt - targetMs)));
  }

  return (
    <li className="card overflow-hidden p-0">
      <div className="h-1 w-full bg-gradient-to-r from-good via-brand to-transparent" />
      <div className="p-4 lg:p-5">
        {/* Encabezado: combo + conteo */}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="min-w-0 truncate text-xs text-muted">{g.comboLabel}</p>
          <span className="text-[11px] text-faint">
            {g.laps.length} {localize(g.laps.length === 1 ? L.lap1 : L.laps, locale)}
          </span>
        </div>

        {/* Mejor vuelta grande */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-good">
            {localize(L.best, locale)}
          </span>
          <span className="telemetry text-2xl font-bold text-good">{fmtLap(g.best)}</span>
        </div>

        {/* Progreso vs primer intento */}
        {multi && improvement > 0 && (
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-good/10 px-2 py-1 text-xs font-semibold text-good">
            <span aria-hidden>↘</span>
            {(improvement / 1000).toFixed(3)} s {localize(L.improved, locale)}
          </p>
        )}

        {/* A/B de setups */}
        {showAB && (
          <div className="mt-3 rounded-xl border border-brand/25 bg-brand/[0.05] p-3">
            <p className="mb-2 font-display text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-brand">
              {localize(L.abTitle, locale)}
            </p>
            <ul className="flex flex-col gap-1.5">
              {setups.map((s, i) => (
                <li key={s.label} className="flex items-center justify-between gap-3 text-xs">
                  <span className="min-w-0 flex-1 truncate text-muted">{s.label}</span>
                  <span className="telemetry text-fg">{fmtLap(s.best)}</span>
                  {i === 0 ? (
                    <span className="rounded bg-good/15 px-1.5 py-0.5 text-[10px] font-semibold text-good">
                      {localize(L.fastest, locale)}
                    </span>
                  ) : (
                    <span className="telemetry w-14 text-right text-warn">
                      {fmtGap(s.best - setups[0].best)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lista de intentos con gap contra la mejor */}
        <ul className="mt-3 flex flex-col divide-y divide-border/60">
          {g.laps.map((l) => {
            const gap = l.lapTimeMs - g.best;
            const isBest = gap === 0;
            const tag = l.setupRef && l.setupRef.trim();
            return (
              <li key={l.id} className="flex items-center justify-between gap-3 py-2">
                <div className="flex min-w-0 items-baseline gap-3">
                  <span className="telemetry text-sm font-medium text-fg">{fmtLap(l.lapTimeMs)}</span>
                  {isBest ? (
                    <span className="rounded bg-good/15 px-1.5 py-0.5 text-[10px] font-semibold text-good">
                      {localize(L.bestTag, locale)}
                    </span>
                  ) : (
                    <span className="telemetry text-xs text-warn">{fmtGap(gap)}</span>
                  )}
                  {tag && <span className="truncate text-[11px] text-faint">· {tag}</span>}
                </div>
                <button
                  onClick={() => onDelete(l.id)}
                  className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-faint transition-colors hover:bg-danger/10 hover:text-danger"
                  aria-label={`${localize(L.del, locale)} ${fmtLap(l.lapTimeMs)}`}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>

        {/* Constancia */}
        {multi && spread > 0 && (
          <p className="mt-2 text-[11px] text-muted">
            {localize(L.consistency, locale)}:{" "}
            <span className="telemetry text-faint">{fmtGap(spread)} s</span>
          </p>
        )}
        {!multi && (
          <p className="mt-2 text-[11px] text-muted">{localize(L.hintOneLap, locale)}</p>
        )}

        {/* Tiempo objetivo */}
        <div className="mt-3 border-t border-border/60 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium text-muted">{localize(L.target, locale)}</span>
            <input
              value={targetInput}
              onChange={(e) => {
                setTargetInput(e.target.value);
                if (targetBad) setTargetBad(false);
              }}
              placeholder="1:30.000"
              maxLength={9}
              aria-label={localize(L.target, locale)}
              className="field telemetry h-8 w-28 px-2 py-1 text-xs"
            />
            <button onClick={saveTarget} className="btn-ghost px-3 py-1 text-xs">
              {localize(L.setTarget, locale)}
            </button>
            {targetMs != null && (
              <button onClick={clearTarget} className="px-2 py-1 text-xs text-faint hover:text-danger">
                {localize(L.clearTarget, locale)}
              </button>
            )}
          </div>
          {targetBad && (
            <p role="alert" className="mt-1 text-[11px] text-danger">
              {localize(L.targetBad, locale)}
            </p>
          )}
          {targetMs != null && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="telemetry text-faint">{fmtLap(targetMs)}</span>
                {reached ? (
                  <span className="font-semibold text-good">{localize(L.targetReached, locale)}</span>
                ) : (
                  <span className="telemetry font-semibold text-warn">
                    {fmtGap(gapToTarget!)} s {localize(L.toTarget, locale)}
                  </span>
                )}
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                aria-label={localize(L.target, locale)}
                className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg"
              >
                <div
                  className={`h-full rounded-full ${reached ? "bg-good" : "bg-brand"}`}
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

"use client";

import { localize, useT } from "@/lib/i18n/context";

// Comparador de vueltas: agrupa los tiempos guardados por auto+pista y muestra,
// por combinación, la MEJOR vuelta, el gap de cada intento contra esa mejor, y
// cuánto bajaste desde tu primer intento. Todo es matemática sobre los datos
// PROPIOS del piloto (sus vueltas guardadas): nada inventado. Cierra el loop de
// mejora: cambiás el setup, manejás, y acá ves si fuiste más rápido.
// Strings locales (no tocan el diccionario global, igual que SetupExport/Coach).

type Lap = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string;
  lapTimeMs: number;
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
} as const;

function fmtLap(ms: number): string {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const mm = ms % 1000;
  return `${m}:${String(s).padStart(2, "0")}.${String(mm).padStart(3, "0")}`;
}

// Diferencia con signo en segundos (ej. "+0.842", "-1.230"). Para el gap contra
// la mejor vuelta de la combinación.
function fmtGap(ms: number): string {
  const sign = ms > 0 ? "+" : ms < 0 ? "-" : "";
  return `${sign}${(Math.abs(ms) / 1000).toFixed(3)}`;
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
      {groups.map((g) => {
        const improvement = g.firstAttempt - g.best; // >0 = mejoraste
        const spread = g.worst - g.best;
        const multi = g.laps.length > 1;
        return (
          <li key={g.key} className="card overflow-hidden p-0">
            <div className="h-1 w-full bg-gradient-to-r from-good via-brand to-transparent" />
            <div className="p-4 lg:p-5">
              {/* Encabezado: combo + mejor vuelta grande */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="min-w-0 truncate text-xs text-muted">{g.comboLabel}</p>
                <span className="text-[11px] text-faint">
                  {g.laps.length} {localize(g.laps.length === 1 ? L.lap1 : L.laps, locale)}
                </span>
              </div>
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
                  {fmtGap(-improvement)} s {localize(L.improved, locale)}
                </p>
              )}

              {/* Lista de intentos con gap contra la mejor */}
              <ul className="mt-3 flex flex-col divide-y divide-border/60">
                {g.laps.map((l) => {
                  const gap = l.lapTimeMs - g.best;
                  const isBest = gap === 0;
                  return (
                    <li key={l.id} className="flex items-center justify-between gap-3 py-2">
                      <div className="flex items-baseline gap-3">
                        <span className="telemetry text-sm font-medium text-fg">
                          {fmtLap(l.lapTimeMs)}
                        </span>
                        {isBest ? (
                          <span className="rounded bg-good/15 px-1.5 py-0.5 text-[10px] font-semibold text-good">
                            {localize(L.bestTag, locale)}
                          </span>
                        ) : (
                          <span className="telemetry text-xs text-warn">{fmtGap(gap)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => onDelete(l.id)}
                        className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-faint transition-colors hover:bg-danger/10 hover:text-danger"
                        aria-label="✕"
                      >
                        ✕
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Constancia: spread mejor↔peor (sólo si hay varias) */}
              {multi && spread > 0 && (
                <p className="mt-2 text-[11px] text-muted">
                  {localize(L.consistency, locale)}:{" "}
                  <span className="telemetry text-faint">{fmtGap(spread)} s</span>
                </p>
              )}
              {!multi && (
                <p className="mt-2 text-[11px] text-muted">{localize(L.hintOneLap, locale)}</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

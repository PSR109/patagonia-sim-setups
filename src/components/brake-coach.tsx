"use client";

import { localize, useT } from "@/lib/i18n/context";
import {
  brakeForceRec,
  brakePedalNote,
  brakeTrackNote,
  brakeTuneNote,
} from "@/lib/brake-coach";
import type { Car, GameData, Track } from "@/lib/types";

// Etiquetas locales del panel (no van al diccionario global, igual que FfbPanel).
const L = {
  eyebrow: { es: "Frenada · célula de carga", en: "Braking · load cell" },
  title: { es: "Fuerza de freno (kg)", en: "Brake force (kg)" },
  intro: {
    es: "Cuánta fuerza para llegar al 100% de freno en tu célula de carga, según el auto y la superficie. Punto de partida: ajústalo a tu gusto.",
    en: "How much force to reach 100% braking on your load cell, by car and surface. A starting point: tune it to taste.",
  },
  classLabel: { es: "Clase", en: "Class" },
  tune: { es: "Cómo afinarlo", en: "How to tune it" },
  track: { es: "Por circuito / etapa", en: "Per track / stage" },
  pedal: { es: "Tu pedal", en: "Your pedal" },
} as const;

export function BrakeCoach({
  game,
  car,
  track,
}: {
  game: GameData;
  car: Car;
  track?: Track;
}) {
  const { locale } = useT();
  const rec = brakeForceRec(game, car, track);

  const rows: { label: { es: string; en: string }; body: { es: string; en: string } }[] = [
    { label: L.tune, body: brakeTuneNote },
    { label: L.track, body: brakeTrackNote },
    { label: L.pedal, body: brakePedalNote },
  ];

  return (
    <section className="card reveal reveal-3 overflow-hidden p-0">
      <div className="h-1 w-full bg-gradient-to-r from-warn via-brand to-transparent" />
      <div className="p-5 lg:p-6">
        <span className="eyebrow text-[0.6rem]">{localize(L.eyebrow, locale)}</span>
        <h2 className="mt-1 flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span aria-hidden>🛑</span> {localize(L.title, locale)}
        </h2>
        <p className="mt-1 text-sm text-muted">{localize(L.intro, locale)}</p>

        {/* Lectura grande de la fuerza recomendada */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-bg/40 p-4">
          <span className="telemetry text-3xl font-bold text-brand">
            {rec.kgMin}–{rec.kgMax}
            <span className="ml-1 text-lg text-muted">kg</span>
          </span>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wide text-muted">
            {localize(L.classLabel, locale)}: {localize(rec.className, locale)}
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {localize(rec.rationale, locale)}
        </p>

        {/* Notas de afinado / pista / pedal */}
        <div className="mt-4 flex flex-col divide-y divide-border/70 overflow-hidden rounded-xl border border-border">
          {rows.map((r, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm">
                <span className="font-display text-xs font-semibold uppercase tracking-wide text-fg">
                  {localize(r.label, locale)}
                </span>
                <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <p className="px-3 pb-3 text-xs leading-relaxed text-muted">
                {localize(r.body, locale)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

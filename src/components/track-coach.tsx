"use client";

import { localize, useT } from "@/lib/i18n/context";
import { drivingTipFor, trackPlaybook, practicePlan } from "@/lib/coach";
import type { Symptom, Track } from "@/lib/types";

// Etiquetas locales del panel (no van al diccionario global, igual que FfbPanel).
const L = {
  eyebrow: { es: "Ingeniero de pista", en: "Race engineer" },
  title: { es: "Cómo bajar tu tiempo", en: "How to lower your time" },
  intro: {
    es: "El tiempo sale del manejo más que del setup. Esto es lo que tienes que hacer arriba del auto.",
    en: "Lap time comes from driving more than setup. Here's what to do behind the wheel.",
  },
  technique: { es: "Técnica para tus problemas", en: "Technique for your issues" },
  playbook: { es: "Guía de esta pista", en: "This track's playbook" },
  practice: { es: "Plan para encontrar tiempo", en: "Plan to find time" },
  noSymptoms: {
    es: "Marca un problema arriba (subviraje, sobreviraje…) y aquí te digo cómo corregirlo MANEJANDO, no solo con el setup.",
    en: "Tick a problem above (understeer, oversteer…) and here I'll tell you how to fix it by DRIVING, not just with setup.",
  },
} as const;

export function TrackCoach({
  track,
  symptoms,
  isRally = false,
}: {
  track?: Track;
  symptoms: Symptom[];
  isRally?: boolean;
}) {
  const { t, locale } = useT();
  const playbook = trackPlaybook(track);

  return (
    <section className="card reveal reveal-2 overflow-hidden p-0">
      <div className="h-1 w-full bg-gradient-to-r from-good via-brand to-transparent" />
      <div className="p-5 lg:p-6">
        <span className="eyebrow text-[0.6rem]">{localize(L.eyebrow, locale)}</span>
        <h2 className="mt-1 flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span aria-hidden>🏁</span> {localize(L.title, locale)}
        </h2>
        <p className="mt-1 text-sm text-muted">{localize(L.intro, locale)}</p>

        <div className="mt-5 flex flex-col gap-5">
          {/* Técnica de manejo por síntoma seleccionado */}
          <div>
            <p className="mb-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-good">
              {localize(L.technique, locale)}
            </p>
            {symptoms.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border px-4 py-4 text-xs leading-relaxed text-muted">
                {localize(L.noSymptoms, locale)}
              </p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {symptoms.map((s) => (
                  <li key={s} className="rounded-xl border border-border bg-bg/40 p-3">
                    <p className="mb-1 font-display text-xs font-semibold uppercase tracking-wide text-brand">
                      {isRally && s === "kerb_instability"
                        ? t("symptom.kerb_instability_rally")
                        : t(`symptom.${s}`)}
                    </p>
                    <p className="text-xs leading-relaxed text-muted">
                      {localize(drivingTipFor(s, isRally), locale)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Guía por carácter de la pista elegida */}
          {playbook.length > 0 && (
            <div>
              <p className="mb-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky">
                {localize(L.playbook, locale)}
              </p>
              <ul className="flex flex-col gap-2.5">
                {playbook.map((tip, i) => (
                  <li key={i} className="rounded-xl border border-sky/25 bg-sky/[0.05] p-3">
                    <p className="mb-1 font-display text-xs font-semibold uppercase tracking-wide text-sky">
                      {localize(tip.title, locale)}
                    </p>
                    <p className="text-xs leading-relaxed text-muted">{localize(tip.body, locale)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Método universal para bajar tiempos */}
          <div>
            <p className="mb-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
              {localize(L.practice, locale)}
            </p>
            <ul className="flex flex-col gap-2.5">
              {practicePlan.map((tip, i) => (
                <li key={i} className="rounded-xl border border-border bg-bg/40 p-3">
                  <p className="mb-1 font-display text-xs font-semibold uppercase tracking-wide text-fg">
                    {localize(tip.title, locale)}
                  </p>
                  <p className="text-xs leading-relaxed text-muted">{localize(tip.body, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

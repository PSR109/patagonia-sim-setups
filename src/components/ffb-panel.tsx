"use client";

import { useState } from "react";
import { localize, useT } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";
import { fanatecBases, ffbTuningParamById } from "@/data/hardware/fanatec";
import type { GameData } from "@/lib/types";

// Etiquetas locales del panel (no van al diccionario global para no acoplar).
const L = {
  title: { es: "FFB / Fanatec", en: "FFB / Fanatec" },
  subtitle: {
    es: "Ajustes de force feedback para tu base Fanatec en este juego.",
    en: "Force feedback settings for your Fanatec base in this game.",
  },
  base: { es: "Tu base", en: "Your base" },
  controlPanel: {
    es: "Panel de control Fanatec (menú tuning)",
    en: "Fanatec Control Panel (tuning menu)",
  },
  inGame: { es: "FFB dentro del juego", en: "In-game FFB" },
  notes: { es: "Cómo usarlo", en: "How to use it" },
  value: { es: "Valor", en: "Value" },
  soon: {
    es: "Todavía estamos verificando los datos de FFB de este juego. Próximamente.",
    en: "We're still verifying this game's FFB data. Coming soon.",
  },
} as const;

export function FfbPanel({ game }: { game: GameData }) {
  const { locale } = useT();
  const [baseId, setBaseId] = useState("csl_dd");
  const ffb = game.ffb;

  return (
    <section className="rounded-xl border border-border bg-surface/50 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <span aria-hidden>🎮</span> {localize(L.title, locale)}
          </h2>
          <p className="mt-0.5 text-sm text-muted">{localize(L.subtitle, locale)}</p>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted">{localize(L.base, locale)}</span>
          <select
            value={baseId}
            onChange={(e) => setBaseId(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
          >
            {fanatecBases.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} · {b.boostTorqueNm ? `${b.maxTorqueNm}/${b.boostTorqueNm}` : b.maxTorqueNm} Nm
              </option>
            ))}
          </select>
        </label>
      </div>

      {!ffb ? (
        <p className="mt-4 rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
          {localize(L.soon, locale)}
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-5">
          {/* Panel de control de la base */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand">
              {localize(L.controlPanel, locale)}
            </p>
            <div className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
              {ffb.controlPanel.map((rec) => {
                const def = ffbTuningParamById.get(rec.paramId);
                const value = rec.perBase?.[baseId] ?? rec.value;
                return (
                  <details key={rec.paramId} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-bold text-muted">
                          {def?.label ?? rec.paramId}
                        </span>
                        <span className="text-muted">
                          {def ? localize(def.name, locale) : rec.paramId}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold tabular-nums text-brand">{value}</span>
                        <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
                      </span>
                    </summary>
                    {def && (
                      <div className="flex flex-col gap-1.5 px-3 pb-3 text-xs leading-relaxed text-muted">
                        <p>{localize(def.whatItDoes, locale)}</p>
                        {rec.note && <p className="text-muted/80">→ {localize(rec.note, locale)}</p>}
                      </div>
                    )}
                  </details>
                );
              })}
            </div>
          </div>

          {/* FFB dentro del juego */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky">
              {localize(L.inGame, locale)}
            </p>
            <div className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
              {ffb.inGame.map((s) => {
                const value = s.perBase?.[baseId] ?? s.value;
                return (
                  <details key={s.id} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm">
                      <span className="text-muted">{localize(s.name, locale)}</span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold tabular-nums text-sky">{value}</span>
                        <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
                      </span>
                    </summary>
                    <div className="flex flex-col gap-1.5 px-3 pb-3 text-xs leading-relaxed text-muted">
                      <p>{localize(s.whatItDoes, locale)}</p>
                      {s.note && <p className="text-muted/80">→ {localize(s.note, locale)}</p>}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>

          {/* Notas generales */}
          {ffb.notes.length > 0 && (
            <div className="rounded-lg bg-surface-2 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {localize(L.notes, locale)}
              </p>
              <ul className="flex flex-col gap-2 text-xs leading-relaxed text-muted">
                {ffb.notes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand">•</span>
                    <span>{localize(n, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

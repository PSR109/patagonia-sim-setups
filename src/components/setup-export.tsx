"use client";

import { useMemo, useRef, useState } from "react";
import { effectiveParams } from "@/lib/engine";
import { localize, useT } from "@/lib/i18n/context";
import type {
  GameData,
  ParameterDef,
  ParameterGroup,
  SetupResult,
} from "@/lib/types";

// Export del setup a una HOJA de texto plano: el setup completo en el orden de
// las pestañas del juego, con unidades, copiable y descargable. Mata el dolor de
// "copiar sliders a mano" sin fabricar el archivo binario del juego (.json/.svm):
// esos van codificados en clicks por-coche y, si un valor sale mal, el archivo no
// carga o aplica basura — exactamente lo que la política de datos prohíbe. Acá
// exportamos los MISMOS valores que el motor ya muestra, nada inventado.
// Strings locales (no tocan el diccionario global, igual que FfbPanel/TrackCoach).

// Mismo orden de grupos que usa la tabla del resultado, para que la hoja siga el
// recorrido visual del editor del juego.
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

const L = {
  eyebrow: { es: "Llevar al juego", en: "Take it to the game" },
  title: { es: "Exportar setup", en: "Export setup" },
  intro: {
    es: "Hoja con el setup completo en el orden de las pestañas del editor. Copiala o bajala y cargá los valores en el juego.",
    en: "Sheet with the full setup in the editor's tab order. Copy or download it and load the values in-game.",
  },
  copy: { es: "Copiar setup", en: "Copy setup" },
  copied: { es: "✓ Copiado", en: "✓ Copied" },
  download: { es: "Descargar .txt", en: "Download .txt" },
  // Nota de carga para juegos que NO importan archivo: hay que tipear a mano.
  manualNote: {
    es: "Este juego no importa archivos de setup: cargá estos valores a mano en el editor, en el mismo orden.",
    en: "This game can't import setup files: enter these values by hand in the editor, in the same order.",
  },
  header: { es: "Hoja de setup", en: "Setup sheet" },
  madeWith: {
    es: "Generado con Patagonia Sim Setups",
    en: "Generated with Patagonia Sim Setups",
  },
} as const;

function decimals(step: number): number {
  if (step >= 1) return 0;
  const s = String(step).split(".")[1];
  return s ? s.length : 1;
}

function formatValue(p: ParameterDef, v: number): string {
  const out = v.toFixed(decimals(p.step));
  return p.unit ? `${out} ${p.unit}` : out;
}

function sanitize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function SetupExport({
  game,
  carId,
  carName,
  trackName,
  result,
}: {
  game: GameData;
  carId: string;
  carName: string;
  trackName: string | null;
  result: SetupResult;
}) {
  const { t, locale } = useT();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const params = useMemo(() => effectiveParams(game, carId), [game, carId]);

  // Texto de la hoja: encabezado + cada grupo (en orden) con sus valores.
  const text = useMemo(() => {
    const lines: string[] = [];
    lines.push(`PATAGONIA SIM SETUPS — ${localize(L.header, locale)}`);
    lines.push(trackName ? `${carName} — ${trackName}` : carName);
    lines.push(game.meta.name);
    lines.push("");

    for (const group of GROUP_ORDER) {
      const groupParams = params.filter((p) => p.group === group);
      if (groupParams.length === 0) continue;
      lines.push(t(`group.${group}`).toUpperCase());
      for (const p of groupParams) {
        lines.push(`  ${localize(p.name, locale)}: ${formatValue(p, result.values[p.id])}`);
      }
      lines.push("");
    }

    // Dónde cargarlo: ACC/LMU traen la ruta real del archivo; el resto se tipea.
    const note =
      game.meta.hasImportableSetups && game.meta.setupFileNote
        ? localize(game.meta.setupFileNote, locale)
        : localize(L.manualNote, locale);
    lines.push(note);
    lines.push("");
    lines.push(localize(L.madeWith, locale));
    return lines.join("\n");
  }, [game, params, result, carName, trackName, locale, t]);

  function markCopied() {
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 3000);
  }

  // Fallback para navegadores/contextos donde la Clipboard API async está
  // bloqueada (origen no seguro, foco, Firefox): textarea oculto + execCommand.
  function legacyCopy() {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      if (document.execCommand("copy")) markCopied();
    } catch {
      /* sin más fallback: el usuario siempre puede usar Descargar .txt */
    }
    ta.remove();
  }

  function copy() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(markCopied, legacyCopy);
    } else {
      legacyCopy();
    }
  }

  function download() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const track = trackName ? `_${sanitize(trackName)}` : "";
    a.download = `PSR_${sanitize(carName)}${track}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const fileNote =
    game.meta.hasImportableSetups && game.meta.setupFileNote
      ? localize(game.meta.setupFileNote, locale)
      : localize(L.manualNote, locale);

  return (
    <section className="card overflow-hidden p-0">
      <div className="h-1 w-full bg-gradient-to-r from-sky via-brand to-transparent" />
      <div className="p-5">
        <span className="eyebrow text-[0.6rem]">{localize(L.eyebrow, locale)}</span>
        <h3 className="mt-1 flex items-center gap-2 font-display text-base font-bold tracking-tight">
          <span aria-hidden>📋</span> {localize(L.title, locale)}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{localize(L.intro, locale)}</p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button onClick={copy} className="btn-primary px-4 py-2 text-sm">
            {copied ? localize(L.copied, locale) : localize(L.copy, locale)}
          </button>
          <button onClick={download} className="btn-ghost px-4 py-2 text-sm">
            ⬇ {localize(L.download, locale)}
          </button>
        </div>

        <p className="mt-3 rounded-lg border border-border/60 bg-bg/40 px-3 py-2 text-[11px] leading-relaxed text-muted">
          {fileNote}
        </p>
      </div>
    </section>
  );
}

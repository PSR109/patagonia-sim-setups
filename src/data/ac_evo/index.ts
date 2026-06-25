import type { GameData } from "@/lib/types";
import { ac_evoParameters } from "./parameters";
import { ac_evoCars, ac_evoCategories, ac_evoBaseSetups } from "./cars";
import { ac_evoTracks } from "./tracks";
import { ac_evoConditionRules, ac_evoSymptomRules, ac_evoStyleRules } from "./rules";
import { ac_evoFfb } from "./ffb";

export const ac_evo: GameData = {
  meta: {
    id: "ac_evo",
    name: "Assetto Corsa EVO",
    shortName: "AC EVO",
    developer: "Kunos Simulazioni",
    publisher: "505 Games",
    discipline: "circuit",
    accent: "#ef4444",
    // A junio de 2026 AC EVO NO tiene función nativa de importar/exportar/compartir
    // setups como archivo: es una petición abierta de la comunidad. La app muestra
    // valores numéricos para copiar a mano en el editor del juego.
    hasImportableSetups: false,
    status: "early-access",
    setupFileNote: {
      es: "AC EVO (Early Access) guarda los setups dentro del juego como 'Setup Presets' (crear/nombrar/guardar), en la carpeta Documents/ACEvo, pero a junio de 2026 NO tiene importar/exportar de setups como archivo: copia los valores a mano en el editor del juego.",
      en: "AC EVO (Early Access) saves setups in-game as 'Setup Presets' (create/name/save), under Documents/ACEvo, but as of June 2026 it has no file import/export for setups: copy the values by hand into the in-game editor.",
    },
  },
  categories: ac_evoCategories,
  cars: ac_evoCars,
  tracks: ac_evoTracks,
  parameters: ac_evoParameters,
  baseSetups: ac_evoBaseSetups,
  conditionRules: ac_evoConditionRules,
  symptomRules: ac_evoSymptomRules,
  styleRules: ac_evoStyleRules,
  conditionFields: ["weather", "trackTemp", "grip", "fuel"],
  ffb: ac_evoFfb,
};

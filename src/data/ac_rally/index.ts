import type { GameData } from "@/lib/types";
import { ac_rallyParameters } from "./parameters";
import { ac_rallyCars, ac_rallyCategories, ac_rallyBaseSetups } from "./cars";
import { ac_rallyTracks } from "./tracks";
import { ac_rallyConditionRules, ac_rallySymptomRules } from "./rules";
import { ac_rallyFfb } from "./ffb";

export const ac_rally: GameData = {
  meta: {
    id: "ac_rally",
    name: "Assetto Corsa Rally",
    shortName: "AC Rally",
    developer: "Supernova Games Studios",
    publisher: "505 Games",
    discipline: "rally",
    accent: "#d97706",
    hasImportableSetups: false,
    status: "early-access",
    setupFileNote: {
      es: "Assetto Corsa Rally guarda los setups localmente con nombre propio (ej. 'i20 N Gravel Soft'). A junio 2026 no hay una función nativa verificada de importar/exportar setups por archivo: la comunidad los comparte por foros (OverTake.gg) describiendo los valores. La ubicación en disco no está documentada oficialmente.",
      en: "Assetto Corsa Rally saves setups locally with custom names (e.g. 'i20 N Gravel Soft'). As of June 2026 there is no verified native import/export by file: the community shares them via forums (OverTake.gg) by describing the values. The on-disk location is not officially documented.",
    },
  },
  categories: ac_rallyCategories,
  cars: ac_rallyCars,
  tracks: ac_rallyTracks,
  parameters: ac_rallyParameters,
  baseSetups: ac_rallyBaseSetups,
  conditionRules: ac_rallyConditionRules,
  symptomRules: ac_rallySymptomRules,
  ffb: ac_rallyFfb,
};

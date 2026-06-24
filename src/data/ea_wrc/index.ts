import type { GameData } from "@/lib/types";
import { ea_wrcParameters } from "./parameters";
import { ea_wrcCars, ea_wrcCategories, ea_wrcBaseSetups } from "./cars";
import { ea_wrcTracks } from "./tracks";
import { ea_wrcConditionRules, ea_wrcSymptomRules } from "./rules";
import { ea_wrcFfb } from "./ffb";

export const ea_wrc: GameData = {
  meta: {
    id: "ea_wrc",
    name: "EA Sports WRC",
    shortName: "EA WRC",
    developer: "Codemasters",
    publisher: "EA Sports",
    discipline: "rally",
    accent: "#0b6e4f",
    hasImportableSetups: false,
    status: "released",
    setupFileNote: {
      es: "EA Sports WRC NO permite importar/exportar ni compartir setups por archivo dentro del juego. Los ajustes se guardan dentro de la partida (savegame) por coche y por superficie/condición. Para 'compartir' setups, la comunidad copia los valores a mano desde sitios externos (p.ej. WRCsetups.com). Ubicación local en PC: AppData\\LocalLow\\Codemasters\\EA SPORTS WRC.",
      en: "EA Sports WRC does NOT support importing/exporting or sharing setups by file in-game. Settings are saved inside the savegame per car and per surface/condition. To 'share' setups the community copies values by hand from external sites (e.g. WRCsetups.com). Local PC location: AppData\\LocalLow\\Codemasters\\EA SPORTS WRC.",
    },
  },
  categories: ea_wrcCategories,
  cars: ea_wrcCars,
  tracks: ea_wrcTracks,
  parameters: ea_wrcParameters,
  baseSetups: ea_wrcBaseSetups,
  conditionRules: ea_wrcConditionRules,
  symptomRules: ea_wrcSymptomRules,
  ffb: ea_wrcFfb,
};

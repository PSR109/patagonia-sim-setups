import type { GameData } from "@/lib/types";
import { f1_25Parameters } from "./parameters";
import { f1_25Cars, f1_25Categories, f1_25BaseSetups } from "./cars";
import { f1_25Tracks } from "./tracks";
import { f1_25ConditionRules, f1_25SymptomRules } from "./rules";
import { f1_25Ffb } from "./ffb";

export const f1_25: GameData = {
  meta: {
    id: "f1_25",
    name: "F1 25",
    shortName: "F1 25",
    developer: "Codemasters",
    publisher: "EA Sports",
    discipline: "circuit",
    accent: "#e10600",
    hasImportableSetups: false,
    status: "released",
    setupFileNote: {
      es: "F1 25 NO permite importar/exportar setups por archivo ni por código. Los setups se guardan como presets dentro del juego (varios slots por pista). Para compartir, se cargan los valores a mano; en PC también existe el Steam Workshop y se puede descargar el setup de otro piloto desde el leaderboard de Time Trial.",
      en: "F1 25 does NOT allow importing/exporting setups via file or code. Setups are saved as in-game presets (several slots per track). To share them you enter the values by hand; on PC there's also Steam Workshop, and you can download another driver's setup from the Time Trial leaderboard.",
    },
  },
  categories: f1_25Categories,
  cars: f1_25Cars,
  tracks: f1_25Tracks,
  parameters: f1_25Parameters,
  baseSetups: f1_25BaseSetups,
  conditionRules: f1_25ConditionRules,
  symptomRules: f1_25SymptomRules,
  ffb: f1_25Ffb,
};

import type { GameData } from "@/lib/types";
import { accParameters } from "./parameters";
import { accCars, accCategories, accBaseSetups } from "./cars";
import { accTracks } from "./tracks";
import { accConditionRules, accSymptomRules, accStyleRules } from "./rules";
import { accFfb } from "./ffb";

export const acc: GameData = {
  meta: {
    id: "acc",
    name: "Assetto Corsa Competizione",
    shortName: "ACC",
    developer: "Kunos Simulazioni",
    publisher: "505 Games",
    discipline: "circuit",
    accent: "#34d399",
    hasImportableSetups: true,
    status: "released",
    setupFileNote: {
      es: "ACC guarda los setups como archivos .json en Documentos/Assetto Corsa Competizione/Setups/<auto>/<pista>. Puedes copiar el setup ahí para importarlo en el juego.",
      en: "ACC stores setups as .json files in Documents/Assetto Corsa Competizione/Setups/<car>/<track>. You can drop the setup there to import it in-game.",
    },
  },
  categories: accCategories,
  cars: accCars,
  tracks: accTracks,
  parameters: accParameters,
  baseSetups: accBaseSetups,
  conditionRules: accConditionRules,
  symptomRules: accSymptomRules,
  styleRules: accStyleRules,
  conditionFields: ["weather", "trackTemp", "grip", "fuel", "timeOfDay"],
  ffb: accFfb,
};

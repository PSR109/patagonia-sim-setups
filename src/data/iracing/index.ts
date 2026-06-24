import type { GameData } from "@/lib/types";
import { iracingParameters } from "./parameters";
import { iracingCars, iracingCategories, iracingBaseSetups } from "./cars";
import { iracingTracks } from "./tracks";
import { iracingConditionRules, iracingSymptomRules } from "./rules";
import { iracingFfb } from "./ffb";

export const iracing: GameData = {
  meta: {
    id: "iracing",
    name: "iRacing",
    shortName: "iRacing",
    developer: "iRacing.com Motorsport Simulations",
    discipline: "circuit",
    accent: "#1d8fe1",
    hasImportableSetups: true,
    status: "released",
    setupFileNote: {
      es: "iRacing guarda los setups como archivos .sto en Documentos/iRacing/setups/<auto>/ (una subcarpeta por auto, creada al conducirlo). Copia el .sto ahí y lo cargas desde Garage > My Setups. También puedes compartirlo con el botón 'Share' del garage.",
      en: "iRacing stores setups as .sto files in Documents/iRacing/setups/<car>/ (one subfolder per car, created when you drive it). Drop the .sto there and load it from Garage > My Setups. You can also share it via the garage 'Share' button.",
    },
  },
  categories: iracingCategories,
  cars: iracingCars,
  tracks: iracingTracks,
  parameters: iracingParameters,
  baseSetups: iracingBaseSetups,
  conditionRules: iracingConditionRules,
  symptomRules: iracingSymptomRules,
  ffb: iracingFfb,
};

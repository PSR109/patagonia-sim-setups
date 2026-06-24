import type { GameData } from "@/lib/types";
import { lmuParameters } from "./parameters";
import { lmuCars, lmuCategories, lmuBaseSetups } from "./cars";
import { lmuTracks } from "./tracks";
import { lmuConditionRules, lmuSymptomRules } from "./rules";
import { lmuFfb } from "./ffb";

export const lmu: GameData = {
  meta: {
    id: "lmu",
    name: "Le Mans Ultimate",
    shortName: "LMU",
    developer: "Studio 397",
    publisher: "Motorsport Games",
    discipline: "circuit",
    accent: "#c8102e",
    hasImportableSetups: true,
    status: "released",
    setupFileNote: {
      es: "LMU guarda los setups como archivos .svm en [Steam]\\steamapps\\common\\Le Mans Ultimate\\UserData\\player\\Settings\\<pista>\\ (una carpeta por circuito). Para importar uno de la comunidad copias el .svm en la carpeta de la pista correspondiente y lo cargas desde la pantalla Setup Area. Hereda el sistema de rFactor 2.",
      en: "LMU stores setups as .svm files in [Steam]\\steamapps\\common\\Le Mans Ultimate\\UserData\\player\\Settings\\<track>\\ (one folder per circuit). To import a community setup you drop the .svm into the matching track folder and load it from the Setup Area screen. It inherits the rFactor 2 system.",
    },
  },
  categories: lmuCategories,
  cars: lmuCars,
  tracks: lmuTracks,
  parameters: lmuParameters,
  baseSetups: lmuBaseSetups,
  conditionRules: lmuConditionRules,
  symptomRules: lmuSymptomRules,
  ffb: lmuFfb,
};

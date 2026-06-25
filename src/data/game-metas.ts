import type { GameMeta } from "@/lib/types";

// Catálogo de metadatos SOLO (id/name/shortName/developer/publisher/discipline/
// accent/hasImportableSetups/status/setupFileNote). Es una copia literal de los
// `meta` de cada juego, DESACOPLADA de los módulos de datos por-juego: este
// archivo NO importa ninguna GameData (cars/tracks/parameters/rules/ffb), así un
// componente 'use client' puede mostrar la grilla de juegos sin arrastrar el
// barrel pesado de @/data/registry al bundle del cliente.
//
// IMPORTANTE: mantener en sincronía con los `meta` de cada src/data/<juego>/index.ts
// y con el orden de registry.ts (implementedGames). registry.ts sigue siendo la
// fuente para los consumidores de servidor (que sí necesitan los datos completos).
export const gameMetas: GameMeta[] = [
  {
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
  {
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
  {
    id: "ac_evo",
    name: "Assetto Corsa EVO",
    shortName: "AC EVO",
    developer: "Kunos Simulazioni",
    publisher: "505 Games",
    discipline: "circuit",
    accent: "#ef4444",
    hasImportableSetups: false,
    status: "early-access",
    setupFileNote: {
      es: "AC EVO (Early Access) guarda los setups dentro del juego como 'Setup Presets' (crear/nombrar/guardar), en la carpeta Documents/ACEvo, pero a junio de 2026 NO tiene importar/exportar de setups como archivo: copia los valores a mano en el editor del juego.",
      en: "AC EVO (Early Access) saves setups in-game as 'Setup Presets' (create/name/save), under Documents/ACEvo, but as of June 2026 it has no file import/export for setups: copy the values by hand into the in-game editor.",
    },
  },
  {
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
  {
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
];

// Ids con datos completos implementados (motor de reglas + FFB). Coincide con
// registry.ts → implementedGames. Si en el futuro se suma un GameMeta sin datos
// completos, agregar su meta arriba pero NO su id acá.
export const implementedGameIds: ReadonlySet<string> = new Set([
  "acc",
  "lmu",
  "ac_evo",
  "ac_rally",
  "ea_wrc",
]);

import type { GameData } from "@/lib/types";

// Carga perezosa por juego. Cada import() genera un chunk separado, así la ruta
// /app/[gameId] solo descarga los datos del simulador pedido y no el catálogo
// completo de los 7 juegos (~100 KB gzip) como ocurría con el barrel estático
// de registry.ts. Las claves coinciden con los GameMeta.id de cada juego.
const loaders: Record<string, () => Promise<GameData>> = {
  acc: () => import("./acc").then((m) => m.acc),
  f1_25: () => import("./f1_25").then((m) => m.f1_25),
  lmu: () => import("./lmu").then((m) => m.lmu),
  ac_evo: () => import("./ac_evo").then((m) => m.ac_evo),
  ac_rally: () => import("./ac_rally").then((m) => m.ac_rally),
  ea_wrc: () => import("./ea_wrc").then((m) => m.ea_wrc),
  iracing: () => import("./iracing").then((m) => m.iracing),
};

export async function loadGame(id: string): Promise<GameData | undefined> {
  const loader = loaders[id];
  return loader ? loader() : undefined;
}

export function isImplemented(id: string): boolean {
  return id in loaders;
}

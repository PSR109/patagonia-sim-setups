import type { GameData, GameMeta } from "@/lib/types";
import { acc } from "./acc";
import { lmu } from "./lmu";
import { ac_evo } from "./ac_evo";
import { ac_rally } from "./ac_rally";
import { ea_wrc } from "./ea_wrc";

// Juegos con datos completos (motor de reglas + FFB funcionando). Los 5 sims.
export const implementedGames: GameData[] = [
  acc,
  lmu,
  ac_evo,
  ac_rally,
  ea_wrc,
];

const implementedById = new Map(
  implementedGames.map((g) => [g.meta.id, g] as const),
);

export function getGame(id: string): GameData | undefined {
  return implementedById.get(id);
}

export function isImplemented(id: string): boolean {
  return implementedById.has(id);
}

// Catálogo para la grilla. Los 5 ya tienen datos; si en el futuro se suma un
// juego sin datos completos todavía, agregar su GameMeta a upcomingMetas.
const upcomingMetas: GameMeta[] = [];

export const gameCatalog: GameMeta[] = [
  ...implementedGames.map((g) => g.meta),
  ...upcomingMetas,
];

import type { Car, Category, SetupValues } from "@/lib/types";

// Categorías de F1 25 = clases de monoplazas del juego. La parrilla F1 2025 son
// 10 equipos x 2 = 20 monoplazas; F2 es chasis único (Dallara F2 2024) con las
// 11 liveas de los equipos; y hay equipos ficticios (APXGP de la película F1 y
// Konnersport del modo Braking Point) usables como 11vo equipo en Career.
export const f1_25Categories: Category[] = [
  { id: "f1_2025", gameId: "f1_25", name: "F1 2025" },
  { id: "f2_2025", gameId: "f1_25", name: "F2" },
  { id: "fictional", gameId: "f1_25", name: "Equipos ficticios" },
];

// Autos verificados en la investigación. F1: ejemplos de los 10 equipos 2025
// (parrilla = 20 monoplazas). F2: comparten el chasis Dallara F2 2024, listamos
// los equipos como entradas. Ficticios: APXGP y Konnersport.
export const f1_25Cars: Car[] = [
  // F1 2025 (monoplazas actuales) — 10 equipos x 2 autos = 20 en el juego
  { id: "f1_25_mclaren_mcl39", gameId: "f1_25", categoryId: "f1_2025", name: "McLaren MCL39", brand: "McLaren", year: 2025 },
  { id: "f1_25_red_bull_rb21", gameId: "f1_25", categoryId: "f1_2025", name: "Red Bull RB21", brand: "Red Bull", year: 2025 },
  { id: "f1_25_ferrari_sf25", gameId: "f1_25", categoryId: "f1_2025", name: "Ferrari SF-25", brand: "Ferrari", year: 2025 },
  { id: "f1_25_mercedes_w16", gameId: "f1_25", categoryId: "f1_2025", name: "Mercedes W16", brand: "Mercedes", year: 2025 },
  { id: "f1_25_aston_martin_amr25", gameId: "f1_25", categoryId: "f1_2025", name: "Aston Martin AMR25", brand: "Aston Martin", year: 2025 },
  { id: "f1_25_williams_fw47", gameId: "f1_25", categoryId: "f1_2025", name: "Williams FW47", brand: "Williams", year: 2025 },
  { id: "f1_25_alpine_a525", gameId: "f1_25", categoryId: "f1_2025", name: "Alpine A525", brand: "Alpine", year: 2025 },
  { id: "f1_25_haas_vf25", gameId: "f1_25", categoryId: "f1_2025", name: "Haas VF-25", brand: "Haas", year: 2025 },
  { id: "f1_25_racing_bulls_vcarb02", gameId: "f1_25", categoryId: "f1_2025", name: "Racing Bulls VCARB 02", brand: "Racing Bulls", year: 2025 },
  { id: "f1_25_kick_sauber_c45", gameId: "f1_25", categoryId: "f1_2025", name: "Kick Sauber C45", brand: "Kick Sauber", year: 2025 },

  // F2 — chasis único Dallara F2 2024, liveas de los 11 equipos de la categoría
  { id: "f1_25_f2_invicta_racing", gameId: "f1_25", categoryId: "f2_2025", name: "Invicta Racing (Dallara F2 2024)", brand: "Invicta Racing" },
  { id: "f1_25_f2_hitech_tgr", gameId: "f1_25", categoryId: "f2_2025", name: "Hitech TGR (Dallara F2 2024)", brand: "Hitech TGR" },
  { id: "f1_25_f2_campos_racing", gameId: "f1_25", categoryId: "f2_2025", name: "Campos Racing (Dallara F2 2024)", brand: "Campos Racing" },
  { id: "f1_25_f2_dams_lucas_oil", gameId: "f1_25", categoryId: "f2_2025", name: "DAMS Lucas Oil (Dallara F2 2024)", brand: "DAMS Lucas Oil" },
  { id: "f1_25_f2_mp_motorsport", gameId: "f1_25", categoryId: "f2_2025", name: "MP Motorsport (Dallara F2 2024)", brand: "MP Motorsport" },
  { id: "f1_25_f2_prema_racing", gameId: "f1_25", categoryId: "f2_2025", name: "PREMA Racing (Dallara F2 2024)", brand: "PREMA Racing" },
  { id: "f1_25_f2_rodin_motorsport", gameId: "f1_25", categoryId: "f2_2025", name: "Rodin Motorsport (Dallara F2 2024)", brand: "Rodin Motorsport" },
  { id: "f1_25_f2_art_grand_prix", gameId: "f1_25", categoryId: "f2_2025", name: "ART Grand Prix (Dallara F2 2024)", brand: "ART Grand Prix" },
  { id: "f1_25_f2_aix_racing", gameId: "f1_25", categoryId: "f2_2025", name: "AIX Racing (Dallara F2 2024)", brand: "AIX Racing" },
  { id: "f1_25_f2_van_amersfoort_racing", gameId: "f1_25", categoryId: "f2_2025", name: "Van Amersfoort Racing (Dallara F2 2024)", brand: "Van Amersfoort Racing" },
  { id: "f1_25_f2_trident", gameId: "f1_25", categoryId: "f2_2025", name: "TRIDENT (Dallara F2 2024)", brand: "TRIDENT" },

  // Equipos ficticios usables como 11vo equipo en Career
  { id: "f1_25_apxgp", gameId: "f1_25", categoryId: "fictional", name: "APXGP", brand: "APXGP", year: 2025 },
  { id: "f1_25_konnersport", gameId: "f1_25", categoryId: "fictional", name: "Konnersport", brand: "Konnersport" },
];

// Pequeños ajustes de base por auto. Los monoplazas F1 25 comparten físicas muy
// similares y el setup se centra en pista/condición más que en el auto, así que
// dejamos overrides vacíos; el resto usa los defaults de los parámetros.
export const f1_25BaseSetups: Record<string, SetupValues> = {};

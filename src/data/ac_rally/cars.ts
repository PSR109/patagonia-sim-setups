import type { Car, Category, SetupValues } from "@/lib/types";

// Clases de Assetto Corsa Rally (Early Access). El conteo total ronda ~12 autos
// en la versión actual (0.4). La lista de abajo cubre todos los exampleCars
// verificados por clase; es parcial respecto al objetivo de 30+ autos en 1.0.
export const ac_rallyCategories: Category[] = [
  { id: "gr2", gameId: "ac_rally", name: "Group 2" },
  { id: "gr4", gameId: "ac_rally", name: "Group 4" },
  { id: "grb", gameId: "ac_rally", name: "Group B" },
  { id: "gra", gameId: "ac_rally", name: "Group A" },
  { id: "wrc", gameId: "ac_rally", name: "WRC (clásico)" },
  { id: "kitcar", gameId: "ac_rally", name: "F2 Kit Car" },
  { id: "rally2", gameId: "ac_rally", name: "Rally2" },
  { id: "rally4", gameId: "ac_rally", name: "Rally4" },
];

// Autos verificados de la investigación (exampleCars por clase). Lista parcial:
// el juego apunta a 30+ autos en 1.0 y suma contenido en cada versión de EA.
export const ac_rallyCars: Car[] = [
  // Group 2
  { id: "alfa-romeo-gta-1300-junior-gr2", gameId: "ac_rally", categoryId: "gr2", name: "Alfa Romeo GTA 1300 Junior Gr.2", brand: "Alfa Romeo", year: 1972 },
  { id: "mini-cooper-s-gr2", gameId: "ac_rally", categoryId: "gr2", name: "Mini Cooper S Gr.2", brand: "Mini", year: 1964, drivetrain: "fwd" },
  // Group 4
  { id: "fiat-131-abarth-gr4", gameId: "ac_rally", categoryId: "gr4", name: "Fiat 131 Abarth Gr.4", brand: "Fiat", year: 1976 },
  { id: "fiat-124-abarth-rally-16v-gr4", gameId: "ac_rally", categoryId: "gr4", name: "Fiat 124 Sport Abarth Rally 16V Gr.4", brand: "Fiat", year: 1973 },
  { id: "lancia-stratos-gr4", gameId: "ac_rally", categoryId: "gr4", name: "Lancia Stratos Gr.4", brand: "Lancia", year: 1976 },
  // Group B
  { id: "lancia-037-evo2-grb", gameId: "ac_rally", categoryId: "grb", name: "Lancia Rally 037 EVO 2 Gr.B", brand: "Lancia", year: 1984 },
  // Group A
  { id: "lancia-delta-hf-integrale-evo-gra", gameId: "ac_rally", categoryId: "gra", name: "Lancia Delta HF Integrale EVO Gr.A", brand: "Lancia", year: 1992 },
  { id: "subaru-impreza-s3-gra", gameId: "ac_rally", categoryId: "gra", name: "Subaru Impreza S3 Group A", brand: "Subaru", year: 1993 },
  // WRC clásico
  { id: "citroen-xsara-wrc", gameId: "ac_rally", categoryId: "wrc", name: "Citroën Xsara WRC", brand: "Citroën", year: 2001 },
  // F2 Kit Car
  { id: "peugeot-306-maxi-kitcar", gameId: "ac_rally", categoryId: "kitcar", name: "Peugeot 306 Maxi Kit Car", brand: "Peugeot", year: 1996, drivetrain: "fwd" },
  // Rally2
  { id: "hyundai-i20n-rally2", gameId: "ac_rally", categoryId: "rally2", name: "Hyundai i20 N Rally2", brand: "Hyundai", year: 2021 },
  { id: "skoda-fabia-rs-rally2", gameId: "ac_rally", categoryId: "rally2", name: "Škoda Fabia RS Rally2", brand: "Škoda", year: 2022 }, // EA v0.3
  // Rally4
  { id: "peugeot-208-rally4", gameId: "ac_rally", categoryId: "rally4", name: "Peugeot 208 Rally4", brand: "Peugeot", year: 2020, drivetrain: "fwd" },
  // Group 4 agregados (EA v0.2/v0.3, workflow wf_891905b9-f55). El Fulvia es FWD.
  { id: "alpine-a110-gr4", gameId: "ac_rally", categoryId: "gr4", name: "Alpine A110 Gr.4", brand: "Alpine", year: 1973 },
  { id: "lancia-fulvia-16hf-gr4", gameId: "ac_rally", categoryId: "gr4", name: "Lancia Fulvia Coupé 1.6 HF Gr.4", brand: "Lancia", year: 1970, drivetrain: "fwd" },
];

// Ajustes de base por auto. Tras la reconstrucción 2026-06-25, los parámetros
// reflejan la UI REAL del juego (LSD frontal+trasero, anillo de ajuste en m,
// balance de freno 0-1, amortiguadores Ns/m, etc.) y los `default` de
// parameters.ts YA son los valores VERIFICADOS del preset "Equilibrado" del
// Hyundai i20 N Rally2 (captura in-game de Patricio). Por eso el i20 no necesita
// override: hereda los defaults exactos.
//
// El editor del juego es UNIFORME: todos los autos exponen los MISMOS parámetros
// (el i20 es solo el ejemplo de la captura). Lo único que falta es el VALOR del
// preset por-auto: el resto de los coches hereda hoy los defaults del i20 y queda
// PENDIENTE de capturar su garaje in-game (los números difieren auto a auto). No
// inventamos valores por-auto sin fuente.
export const ac_rallyBaseSetups: Record<string, SetupValues> = {
  // Hyundai i20 N Rally2 — VERIFICADO. Sus valores = defaults de parameters.ts,
  // así que hereda sin override (no hace falta listarlo).

  // Group B RWD clásico (Lancia 037): sin electrónica real; balance de freno algo
  // más al frente que el neutro del i20. (Representativo; confirmar in-game.)
  "lancia-037-evo2-grb": { brake_bias: 0.55 },
};

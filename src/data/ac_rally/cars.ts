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

// Ajustes de base por auto. Los clásicos exponen menos parámetros (aero fija,
// sin electrónica); los modernos 4WD suman diferencial central, TC/ABS y ala.
// El resto de los parámetros usa los defaults de parameters.ts.
export const ac_rallyBaseSetups: Record<string, SetupValues> = {
  // Group A 4WD: diff central con leve sesgo trasero para rotación
  "subaru-impreza-s3-gra": { diff_center: 45, rear_wing: 5, toe_front: -0.20 },
  "lancia-delta-hf-integrale-evo-gra": { diff_center: 50, rear_wing: 4, toe_front: -0.18 },
  // WRC clásico 4WD: muy ajustable, ala activa. TC/ABS al mapa mínimo (1) —
  // estos autos corren con la mínima asistencia (la escala del juego es 1-3).
  "citroen-xsara-wrc": { diff_center: 45, rear_wing: 6, tc: 1, abs: 1 },
  // Rally2 moderno 4WD con electrónica ajustable
  "hyundai-i20n-rally2": { diff_center: 45, rear_wing: 6, tc: 3, abs: 3 },
  // Rally4 tracción delantera: nada de diff central, ala chica
  "peugeot-208-rally4": { rear_wing: 2, tc: 2, abs: 2 },
  // Group B trasera/4WD ligera: cola viva
  "lancia-037-evo2-grb": { rear_wing: 5, brake_bias: 58.0 },
};

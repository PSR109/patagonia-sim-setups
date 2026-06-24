import type { Car, Category } from "@/lib/types";

export const accCategories: Category[] = [
  { id: "gt3", gameId: "acc", name: "GT3" },
  {
    id: "gt4",
    gameId: "acc",
    name: "GT4",
    // Rango por clase verificado (workflow de exactitud, 2.ª fuente: Coach Dave
    // Academy + setups reales de simracingsetup): las barras estabilizadoras de
    // los GT4 de ACC tienen SOLO 3 posiciones (0-2), a diferencia de los GT3.
    // Default al centro (1).
    paramOverrides: {
      arb_front: { max: 2, default: 1 },
      arb_rear: { max: 2, default: 1 },
    },
  },
];

// Selección representativa de autos. Se expande con datos verificados por juego.
export const accCars: Car[] = [
  { id: "acc_ferrari_296_gt3", gameId: "acc", categoryId: "gt3", name: "Ferrari 296 GT3", brand: "Ferrari", year: 2023 },
  { id: "acc_porsche_992_gt3r", gameId: "acc", categoryId: "gt3", name: "Porsche 992 GT3 R", brand: "Porsche", year: 2023 },
  // Ala verificada 0-8 (3 setups independientes en simracingsetup; el global 0-12 sobrestima el tope).
  { id: "acc_bmw_m4_gt3", gameId: "acc", categoryId: "gt3", name: "BMW M4 GT3", brand: "BMW", year: 2021, paramOverrides: { rear_wing: { max: 8 } } },
  { id: "acc_audi_r8_evo2", gameId: "acc", categoryId: "gt3", name: "Audi R8 LMS Evo II", brand: "Audi", year: 2022 },
  // Ala 0-8 verificada (2 setups de alta carga independientes, Imola y Suzuka, en 8).
  { id: "acc_mercedes_amg_gt3evo", gameId: "acc", categoryId: "gt3", name: "Mercedes-AMG GT3 Evo", brand: "Mercedes-AMG", year: 2020, paramOverrides: { rear_wing: { max: 8 } } },
  { id: "acc_lamborghini_huracan_evo2", gameId: "acc", categoryId: "gt3", name: "Lamborghini Huracán GT3 Evo2", brand: "Lamborghini", year: 2023 },
  // El 720S GT3 Evo es el único de la parrilla con DOBLE control de tracción (TC1 + TC2).
  // El slider "Control de tracción (TC)" de arriba actúa como TC1 (lo ajustan las reglas);
  // TC2 es un segundo nivel propio de este auto, que se muestra y explica aparte.
  {
    id: "acc_mclaren_720s_evo",
    gameId: "acc",
    categoryId: "gt3",
    name: "McLaren 720S GT3 Evo",
    brand: "McLaren",
    year: 2023,
    extraParams: [
      {
        id: "tc2",
        group: "electronics",
        name: { es: "Control de tracción 2 (TC2)", en: "Traction Control 2 (TC2)" },
        unit: "",
        min: 0,
        max: 11,
        step: 1,
        default: 4,
        whatItDoes: {
          es: "Segundo control de tracción, exclusivo del McLaren 720S GT3 Evo. Trabaja junto al TC principal (que en este auto hace de TC1): el TC1 fija el nivel general de intervención y el TC2 ajusta una segunda capa de corte cuando el patinaje supera el umbral del TC1. Más alto = más intervención.",
          en: "Second traction control, exclusive to the McLaren 720S GT3 Evo. Works alongside the main TC (which acts as TC1 on this car): TC1 sets the general intervention level and TC2 adds a second cut layer once slip exceeds TC1's threshold. Higher = more intervention.",
        },
        increaseEffect: {
          es: "Más TC2 = más red de seguridad sobre el TC1 (sobre todo en mojado o baja adherencia), a costa de algo de aceleración.",
          en: "More TC2 = a bigger safety net on top of TC1 (especially in the wet or low grip), at the cost of some acceleration.",
        },
        decreaseEffect: {
          es: "Menos TC2 = la segunda capa interviene menos: más aceleración pura si el TC1 ya te alcanza, con más riesgo de patinar.",
          en: "Less TC2 = the second layer intervenes less: more raw acceleration if TC1 is enough for you, with more wheelspin risk.",
        },
      },
    ],
  },
  { id: "acc_aston_v8_vantage", gameId: "acc", categoryId: "gt3", name: "Aston Martin V8 Vantage GT3", brand: "Aston Martin", year: 2019 },
  { id: "acc_bentley_continental", gameId: "acc", categoryId: "gt3", name: "Bentley Continental GT3", brand: "Bentley", year: 2018 },
  { id: "acc_ford_mustang_gt3", gameId: "acc", categoryId: "gt3", name: "Ford Mustang GT3", brand: "Ford", year: 2024 },
  { id: "acc_nissan_gtr_nismo_gt3", gameId: "acc", categoryId: "gt3", name: "Nissan GT-R Nismo GT3", brand: "Nissan", year: 2018 },
  { id: "acc_porsche_718_gt4", gameId: "acc", categoryId: "gt4", name: "Porsche 718 Cayman GT4", brand: "Porsche", year: 2019 },
  // Ala verificada 0-7 (setup real de simracingsetup llega a 7; Coach Dave: 8 posiciones).
  { id: "acc_amg_gt4", gameId: "acc", categoryId: "gt4", name: "Mercedes-AMG GT4", brand: "Mercedes-AMG", year: 2016, paramOverrides: { rear_wing: { max: 7 } } },
  // Roster GT3 completo (investigación + verificación adversarial 2.ª fuente: Coach Dave Academy + simracingsetup, 2026-06-24).
  { id: "acc_ferrari_488_gt3_evo", gameId: "acc", categoryId: "gt3", name: "Ferrari 488 GT3 Evo", brand: "Ferrari", year: 2020 },
  { id: "acc_ferrari_488_gt3", gameId: "acc", categoryId: "gt3", name: "Ferrari 488 GT3", brand: "Ferrari", year: 2018 },
  { id: "acc_honda_nsx_gt3_evo", gameId: "acc", categoryId: "gt3", name: "Honda NSX GT3 Evo", brand: "Honda", year: 2019 },
  { id: "acc_honda_nsx_gt3", gameId: "acc", categoryId: "gt3", name: "Honda NSX GT3", brand: "Honda", year: 2017 },
  { id: "acc_lamborghini_huracan_gt3_evo", gameId: "acc", categoryId: "gt3", name: "Lamborghini Huracán GT3 Evo", brand: "Lamborghini", year: 2019, paramOverrides: { rear_wing: { max: 8 } } },
  { id: "acc_lamborghini_huracan_gt3", gameId: "acc", categoryId: "gt3", name: "Lamborghini Huracán GT3", brand: "Lamborghini", year: 2015 },
  // Coach Dave: '0-8 for the original 720s GT3' (vs 0-12 del Evo).
  { id: "acc_mclaren_720s_gt3", gameId: "acc", categoryId: "gt3", name: "McLaren 720S GT3", brand: "McLaren", year: 2019, paramOverrides: { rear_wing: { max: 8 } } },
  { id: "acc_mclaren_650s_gt3", gameId: "acc", categoryId: "gt3", name: "McLaren 650S GT3", brand: "McLaren", year: 2015 },
  { id: "acc_porsche_991ii_gt3r", gameId: "acc", categoryId: "gt3", name: "Porsche 991 II GT3 R", brand: "Porsche", year: 2019 },
  { id: "acc_porsche_991_gt3r", gameId: "acc", categoryId: "gt3", name: "Porsche 991 GT3 R", brand: "Porsche", year: 2018 },
  { id: "acc_audi_r8_lms_evo", gameId: "acc", categoryId: "gt3", name: "Audi R8 LMS Evo", brand: "Audi", year: 2019 },
  { id: "acc_audi_r8_lms_gt3", gameId: "acc", categoryId: "gt3", name: "Audi R8 LMS GT3", brand: "Audi", year: 2015 },
  { id: "acc_lexus_rcf_gt3", gameId: "acc", categoryId: "gt3", name: "Lexus RC F GT3", brand: "Lexus", year: 2016 },
  { id: "acc_bmw_m6_gt3", gameId: "acc", categoryId: "gt3", name: "BMW M6 GT3", brand: "BMW", year: 2017 },
  { id: "acc_aston_v12_vantage", gameId: "acc", categoryId: "gt3", name: "Aston Martin V12 Vantage GT3", brand: "Aston Martin", year: 2013 },
  { id: "acc_mercedes_amg_gt3", gameId: "acc", categoryId: "gt3", name: "Mercedes-AMG GT3", brand: "Mercedes-AMG", year: 2015 },
  { id: "acc_nissan_gtr_nismo_gt3_2015", gameId: "acc", categoryId: "gt3", name: "Nissan GT-R Nismo GT3 (2015)", brand: "Nissan", year: 2015 },
  { id: "acc_bentley_continental_2015", gameId: "acc", categoryId: "gt3", name: "Bentley Continental GT3 (2015)", brand: "Bentley", year: 2015 },
  { id: "acc_jaguar_emil_frey_g3", gameId: "acc", categoryId: "gt3", name: "Emil Frey Jaguar G3", brand: "Jaguar", year: 2012 },
  { id: "acc_reiter_engineering_rex_gt3", gameId: "acc", categoryId: "gt3", name: "Reiter Engineering R-EX GT3", brand: "Reiter Engineering", year: 2017 },
  // Roster GT4 completo (mismas fuentes). Heredan el override de barras 0-2 de la clase GT4.
  // Coach Dave: 'five angles of attack' = 0-4.
  { id: "acc_alpine_a110_gt4", gameId: "acc", categoryId: "gt4", name: "Alpine A110 GT4", brand: "Alpine", year: 2018, paramOverrides: { rear_wing: { max: 4 } } },
  { id: "acc_aston_v8_vantage_gt4", gameId: "acc", categoryId: "gt4", name: "Aston Martin V8 Vantage GT4", brand: "Aston Martin", year: 2018 },
  { id: "acc_audi_r8_lms_gt4", gameId: "acc", categoryId: "gt4", name: "Audi R8 LMS GT4", brand: "Audi", year: 2018 },
  // Coach Dave: 'six options instead of nine' (M4 GT4 vs M4 GT3) = 0-5.
  { id: "acc_bmw_m4_gt4", gameId: "acc", categoryId: "gt4", name: "BMW M4 GT4", brand: "BMW", year: 2018, paramOverrides: { rear_wing: { max: 5 } } },
  { id: "acc_chevrolet_camaro_gt4r", gameId: "acc", categoryId: "gt4", name: "Chevrolet Camaro GT4.R", brand: "Chevrolet", year: 2017 },
  { id: "acc_ginetta_g55_gt4", gameId: "acc", categoryId: "gt4", name: "Ginetta G55 GT4", brand: "Ginetta", year: 2012 },
  { id: "acc_ktm_xbow_gt4", gameId: "acc", categoryId: "gt4", name: "KTM X-Bow GT4", brand: "KTM", year: 2016 },
  { id: "acc_maserati_granturismo_mc_gt4", gameId: "acc", categoryId: "gt4", name: "Maserati GranTurismo MC GT4", brand: "Maserati", year: 2016 },
  // Coach Dave: 'five positions instead of 12 on the GT3 car' = 0-4.
  { id: "acc_mclaren_570s_gt4", gameId: "acc", categoryId: "gt4", name: "McLaren 570S GT4", brand: "McLaren", year: 2016, paramOverrides: { rear_wing: { max: 4 } } },
];

// Pequeños ajustes de base por auto (el resto usa los defaults de los parámetros).
export const accBaseSetups: Record<string, Record<string, number>> = {
  acc_porsche_992_gt3r: { rear_wing: 7, ride_height_rear: 66, brake_bias: 56.4 }, // motor atrás: más estable con algo más de ala
  acc_lamborghini_huracan_evo2: { rear_wing: 5, brake_bias: 57.6 },
  acc_ford_mustang_gt3: { rear_wing: 8, diff_preload: 90 },
  acc_porsche_718_gt4: { rear_wing: 3, tc: 5, abs: 3, ride_height_front: 58, ride_height_rear: 70 },
  acc_amg_gt4: { rear_wing: 3, tc: 5, abs: 3, ride_height_front: 58, ride_height_rear: 70 },
};

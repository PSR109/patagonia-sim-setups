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
  { id: "acc_mercedes_amg_gt3evo", gameId: "acc", categoryId: "gt3", name: "Mercedes-AMG GT3 Evo", brand: "Mercedes-AMG", year: 2020 },
  { id: "acc_lamborghini_huracan_evo2", gameId: "acc", categoryId: "gt3", name: "Lamborghini Huracán GT3 Evo2", brand: "Lamborghini", year: 2023 },
  { id: "acc_mclaren_720s_evo", gameId: "acc", categoryId: "gt3", name: "McLaren 720S GT3 Evo", brand: "McLaren", year: 2023 },
  { id: "acc_aston_v8_vantage", gameId: "acc", categoryId: "gt3", name: "Aston Martin V8 Vantage GT3", brand: "Aston Martin", year: 2019 },
  { id: "acc_bentley_continental", gameId: "acc", categoryId: "gt3", name: "Bentley Continental GT3", brand: "Bentley", year: 2018 },
  { id: "acc_ford_mustang_gt3", gameId: "acc", categoryId: "gt3", name: "Ford Mustang GT3", brand: "Ford", year: 2024 },
  { id: "acc_nissan_gtr_nismo_gt3", gameId: "acc", categoryId: "gt3", name: "Nissan GT-R Nismo GT3", brand: "Nissan", year: 2018 },
  { id: "acc_porsche_718_gt4", gameId: "acc", categoryId: "gt4", name: "Porsche 718 Cayman GT4", brand: "Porsche", year: 2019 },
  // Ala verificada 0-7 (setup real de simracingsetup llega a 7; Coach Dave: 8 posiciones).
  { id: "acc_amg_gt4", gameId: "acc", categoryId: "gt4", name: "Mercedes-AMG GT4", brand: "Mercedes-AMG", year: 2016, paramOverrides: { rear_wing: { max: 7 } } },
];

// Pequeños ajustes de base por auto (el resto usa los defaults de los parámetros).
export const accBaseSetups: Record<string, Record<string, number>> = {
  acc_porsche_992_gt3r: { rear_wing: 7, ride_height_rear: 66, brake_bias: 56.4 }, // motor atrás: más estable con algo más de ala
  acc_lamborghini_huracan_evo2: { rear_wing: 5, brake_bias: 57.6 },
  acc_ford_mustang_gt3: { rear_wing: 8, diff_preload: 90 },
  acc_porsche_718_gt4: { rear_wing: 3, tc: 5, abs: 3, ride_height_front: 58, ride_height_rear: 70 },
  acc_amg_gt4: { rear_wing: 3, tc: 5, abs: 3, ride_height_front: 58, ride_height_rear: 70 },
};

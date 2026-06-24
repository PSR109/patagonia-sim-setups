import type { Car, Category, SetupValues } from "@/lib/types";

// Categorías = clases de iRacing en road racing multi-clase y disciplinas
// relacionadas. iRacing vende cada auto por separado; la lista es PARCIAL
// (ejemplos verificados por clase), no el catálogo completo (~130-200 autos
// según cómo se cuente).
export const iracingCategories: Category[] = [
  { id: "gtp", gameId: "iracing", name: "GTP / LMDh" },
  { id: "lmp2", gameId: "iracing", name: "LMP2" },
  { id: "lmp3", gameId: "iracing", name: "LMP3" },
  { id: "gt3", gameId: "iracing", name: "GT3 / GTD" },
  { id: "gte", gameId: "iracing", name: "GTE" },
  { id: "gt4", gameId: "iracing", name: "GT4" },
  { id: "tcr", gameId: "iracing", name: "TCR / Touring" },
  { id: "formula", gameId: "iracing", name: "Fórmula / Open-wheel" },
  { id: "sportscar", gameId: "iracing", name: "Sportscars / One-make" },
];

// Selección representativa (exampleCars de la investigación). Lista PARCIAL.
export const iracingCars: Car[] = [
  // GTP / LMDh (prototipos híbridos, clase tope road)
  { id: "iracing_porsche_963_gtp", gameId: "iracing", categoryId: "gtp", name: "Porsche 963 GTP", brand: "Porsche", year: 2023 },
  { id: "iracing_cadillac_vseriesr_gtp", gameId: "iracing", categoryId: "gtp", name: "Cadillac V-Series.R GTP", brand: "Cadillac", year: 2023 },
  { id: "iracing_acura_arx06_gtp", gameId: "iracing", categoryId: "gtp", name: "Acura ARX-06 GTP", brand: "Acura", year: 2023 },
  { id: "iracing_bmw_m_hybrid_v8", gameId: "iracing", categoryId: "gtp", name: "BMW M Hybrid V8", brand: "BMW", year: 2023 },
  { id: "iracing_ferrari_499p", gameId: "iracing", categoryId: "gtp", name: "Ferrari 499P", brand: "Ferrari", year: 2023 },

  // LMP2 (clase real con un solo modelo en iRacing)
  { id: "iracing_dallara_p217_lmp2", gameId: "iracing", categoryId: "lmp2", name: "Dallara P217 LMP2", brand: "Dallara", year: 2017 },

  // LMP3 (clase separada; única máquina: Ligier JS P320)
  { id: "iracing_ligier_js_p320_lmp3", gameId: "iracing", categoryId: "lmp3", name: "Ligier JS P320", brand: "Ligier", year: 2020 },

  // GT3 / GTD
  { id: "iracing_bmw_m4_gt3", gameId: "iracing", categoryId: "gt3", name: "BMW M4 GT3", brand: "BMW", year: 2022 },
  { id: "iracing_ferrari_296_gt3", gameId: "iracing", categoryId: "gt3", name: "Ferrari 296 GT3", brand: "Ferrari", year: 2023 },
  { id: "iracing_porsche_911_gt3r_992", gameId: "iracing", categoryId: "gt3", name: "Porsche 911 GT3 R (992)", brand: "Porsche", year: 2023 },
  { id: "iracing_mercedes_amg_gt3_2020", gameId: "iracing", categoryId: "gt3", name: "Mercedes-AMG GT3 2020", brand: "Mercedes-AMG", year: 2020 },
  { id: "iracing_audi_r8_lms_gt3_evo2", gameId: "iracing", categoryId: "gt3", name: "Audi R8 LMS GT3 EVO 2", brand: "Audi", year: 2022 },
  { id: "iracing_lamborghini_huracan_gt3_evo", gameId: "iracing", categoryId: "gt3", name: "Lamborghini Huracán GT3 EVO", brand: "Lamborghini", year: 2019 },
  { id: "iracing_mclaren_720s_gt3_evo", gameId: "iracing", categoryId: "gt3", name: "McLaren 720S GT3 EVO", brand: "McLaren", year: 2023 },
  { id: "iracing_corvette_z06_gt3r", gameId: "iracing", categoryId: "gt3", name: "Chevrolet Corvette Z06 GT3.R", brand: "Chevrolet", year: 2024 },
  { id: "iracing_ford_mustang_gt3", gameId: "iracing", categoryId: "gt3", name: "Ford Mustang GT3", brand: "Ford", year: 2024 },
  { id: "iracing_aston_vantage_gt3_evo", gameId: "iracing", categoryId: "gt3", name: "Aston Martin Vantage GT3 EVO", brand: "Aston Martin", year: 2019 },
  { id: "iracing_acura_nsx_gt3_evo22", gameId: "iracing", categoryId: "gt3", name: "Acura NSX GT3 EVO 22", brand: "Acura", year: 2022 },

  // GTE (legacy)
  { id: "iracing_corvette_c8r_gte", gameId: "iracing", categoryId: "gte", name: "Chevrolet Corvette C8.R GTE", brand: "Chevrolet", year: 2020 },
  { id: "iracing_porsche_911_rsr", gameId: "iracing", categoryId: "gte", name: "Porsche 911 RSR", brand: "Porsche", year: 2019 },
  { id: "iracing_ferrari_488_gte", gameId: "iracing", categoryId: "gte", name: "Ferrari 488 GTE", brand: "Ferrari", year: 2018 },
  { id: "iracing_bmw_m8_gte", gameId: "iracing", categoryId: "gte", name: "BMW M8 GTE", brand: "BMW", year: 2018 },
  { id: "iracing_ford_gte", gameId: "iracing", categoryId: "gte", name: "Ford GT GTE", brand: "Ford", year: 2016 },

  // GT4
  { id: "iracing_bmw_m4_gt4_g82", gameId: "iracing", categoryId: "gt4", name: "BMW M4 GT4 (G82)", brand: "BMW", year: 2023 },
  { id: "iracing_porsche_718_cayman_gt4", gameId: "iracing", categoryId: "gt4", name: "Porsche 718 Cayman GT4 Clubsport", brand: "Porsche", year: 2019 },
  { id: "iracing_mclaren_570s_gt4", gameId: "iracing", categoryId: "gt4", name: "McLaren 570S GT4", brand: "McLaren", year: 2017 },
  { id: "iracing_ford_mustang_gt4", gameId: "iracing", categoryId: "gt4", name: "Ford Mustang GT4", brand: "Ford", year: 2020 },
  { id: "iracing_aston_vantage_gt4", gameId: "iracing", categoryId: "gt4", name: "Aston Martin Vantage GT4", brand: "Aston Martin", year: 2019 },
  { id: "iracing_mercedes_amg_gt4", gameId: "iracing", categoryId: "gt4", name: "Mercedes-AMG GT4", brand: "Mercedes-AMG", year: 2019 },

  // TCR / Touring (tracción delantera)
  { id: "iracing_audi_rs3_lms_tcr", gameId: "iracing", categoryId: "tcr", name: "Audi RS3 LMS TCR", brand: "Audi", year: 2021, drivetrain: "fwd" },
  { id: "iracing_honda_civic_type_r_tcr", gameId: "iracing", categoryId: "tcr", name: "Honda Civic Type R TCR", brand: "Honda", year: 2018, drivetrain: "fwd" },
  { id: "iracing_hyundai_elantra_n_tcr", gameId: "iracing", categoryId: "tcr", name: "Hyundai Elantra N TCR", brand: "Hyundai", year: 2021, drivetrain: "fwd" },

  // Fórmula / Open-wheel
  { id: "iracing_dallara_ir18_indycar", gameId: "iracing", categoryId: "formula", name: "Dallara IR-18 (IndyCar)", brand: "Dallara", year: 2018 },
  { id: "iracing_super_formula_sf23", gameId: "iracing", categoryId: "formula", name: "Super Formula SF23", brand: "Dallara", year: 2023 },
  { id: "iracing_dallara_f3", gameId: "iracing", categoryId: "formula", name: "Dallara F3", brand: "Dallara", year: 2019 },
  { id: "iracing_fia_f4", gameId: "iracing", categoryId: "formula", name: "FIA F4", brand: "Tatuus", year: 2022 },
  { id: "iracing_formula_renault_20", gameId: "iracing", categoryId: "formula", name: "Formula Renault 2.0", brand: "Renault" },
  { id: "iracing_skip_barber_f2000", gameId: "iracing", categoryId: "formula", name: "Skip Barber Formula 2000", brand: "Skip Barber" },
  { id: "iracing_ray_ff1600", gameId: "iracing", categoryId: "formula", name: "Ray FF1600", brand: "Ray" },

  // Otros sportscars / one-make / prototipos ligeros (road)
  { id: "iracing_radical_sr8", gameId: "iracing", categoryId: "sportscar", name: "Radical SR8", brand: "Radical" },
  { id: "iracing_radical_sr10", gameId: "iracing", categoryId: "sportscar", name: "Radical SR10", brand: "Radical" },
  { id: "iracing_porsche_911_gt3_cup_992", gameId: "iracing", categoryId: "sportscar", name: "Porsche 911 GT3 Cup (992)", brand: "Porsche", year: 2021 },
  { id: "iracing_ferrari_296_challenge", gameId: "iracing", categoryId: "sportscar", name: "Ferrari 296 Challenge", brand: "Ferrari", year: 2024 },
  { id: "iracing_bmw_m2_cs_racing", gameId: "iracing", categoryId: "sportscar", name: "BMW M2 CS Racing", brand: "BMW", year: 2020 },
  { id: "iracing_mazda_mx5_global", gameId: "iracing", categoryId: "sportscar", name: "Mazda MX-5 (Global)", brand: "Mazda" },
  { id: "iracing_renault_clio", gameId: "iracing", categoryId: "sportscar", name: "Renault Clio R.S. V", brand: "Renault", year: 2020, drivetrain: "fwd" },
];

// Pequeños ajustes de base por auto (el resto usa los defaults de los parámetros).
// Motor atrás / mucho par aero piden algo más de ala y altura trasera; los GTP
// llevan más carga; los TCR de tracción delantera no usan diferencial trasero.
export const iracingBaseSetups: Record<string, SetupValues> = {
  iracing_porsche_911_gt3r_992: { rear_wing: 8, ride_height_rear: 78, brake_bias: 53.0 }, // motor atrás: más estable con algo más de ala
  iracing_lamborghini_huracan_gt3_evo: { rear_wing: 6, brake_bias: 54.5 },
  iracing_ford_mustang_gt3: { rear_wing: 9, diff_preload: 70 },
  iracing_porsche_963_gtp: { rear_wing: 9, front_splitter: 6, ride_height_rear: 80, brake_bias: 52.0, tc: 5 },
  iracing_cadillac_vseriesr_gtp: { rear_wing: 9, front_splitter: 6, brake_bias: 52.0, tc: 5 },
  iracing_dallara_p217_lmp2: { rear_wing: 8, front_splitter: 5, brake_bias: 53.0 },
  iracing_porsche_718_cayman_gt4: { rear_wing: 4, ride_height_front: 58, ride_height_rear: 80 },
  iracing_audi_rs3_lms_tcr: { brake_bias: 60.0 }, // tracción delantera: bias más adelante. NO se asigna diff_preload: los TCR son FWD y los textos/reglas del diferencial razonan sobre la cola trasera (sobreviraje/rotación), efecto físicamente incorrecto en FWD (ahí el LSD delantero afecta subviraje de salida y torque steer).
};

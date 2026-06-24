import type { Car, Category, SetupValues } from "@/lib/types";

// Categorías = clases del juego (Early Access 0.7). AC EVO mezcla autos de calle
// y de carrera; las clases siguen las "licencias" y grupos del juego.
export const ac_evoCategories: Category[] = [
  { id: "road_entry", gameId: "ac_evo", name: "Road - Entry / Hot Hatch" },
  { id: "road_sport", gameId: "ac_evo", name: "Road - Sportscar" },
  { id: "road_supercar", gameId: "ac_evo", name: "Road - Supercar / Muscle" },
  { id: "road_hypercar", gameId: "ac_evo", name: "Road - Hypercar" },
  { id: "race_spec", gameId: "ac_evo", name: "Race - Spec / Cup / Challenge" },
  { id: "race_gt3", gameId: "ac_evo", name: "Race - GT3" },
  { id: "race_gt2", gameId: "ac_evo", name: "Race - GT2 / Track" },
  { id: "race_vintage", gameId: "ac_evo", name: "Race - Vintage / Touring" },
  { id: "formula", gameId: "ac_evo", name: "Formula" },
];

// Autos verificados de la investigación (ejemplos por clase de la build 0.7).
// La lista es PARCIAL: AC EVO es Early Access y crece por roadmap (~37 jugables
// hoy, ~120 previstos para 1.0). Se cargan los exampleCars confirmados por clase.
export const ac_evoCars: Car[] = [
  // Road - Entry / Hot Hatch
  { id: "ac_evo_abarth_695_biposto", gameId: "ac_evo", categoryId: "road_entry", name: "Abarth 695 Biposto", brand: "Abarth" },
  { id: "ac_evo_vw_golf8_gti_clubsport", gameId: "ac_evo", categoryId: "road_entry", name: "VW Golf 8 GTI Clubsport", brand: "Volkswagen" },
  { id: "ac_evo_honda_s2000_ap1", gameId: "ac_evo", categoryId: "road_entry", name: "Honda S2000 AP1", brand: "Honda" },
  { id: "ac_evo_hyundai_i30_n", gameId: "ac_evo", categoryId: "road_entry", name: "Hyundai i30 N", brand: "Hyundai" },
  { id: "ac_evo_ford_escort_rs_cosworth", gameId: "ac_evo", categoryId: "road_entry", name: "Ford Escort RS Cosworth", brand: "Ford" },
  { id: "ac_evo_alfa_romeo_junior", gameId: "ac_evo", categoryId: "road_entry", name: "Alfa Romeo Junior (Veloce/Elettrica)", brand: "Alfa Romeo" },
  { id: "ac_evo_mazda_mx5_nd", gameId: "ac_evo", categoryId: "road_entry", name: "Mazda MX-5 ND", brand: "Mazda" },

  // Road - Sportscar
  { id: "ac_evo_alpine_a110_s", gameId: "ac_evo", categoryId: "road_sport", name: "Alpine A110 S", brand: "Alpine" },
  { id: "ac_evo_toyota_gr86", gameId: "ac_evo", categoryId: "road_sport", name: "Toyota GR86", brand: "Toyota" },
  { id: "ac_evo_audi_rs3_sportback", gameId: "ac_evo", categoryId: "road_sport", name: "Audi RS3 Sportback", brand: "Audi" },
  { id: "ac_evo_lancia_delta_hf_integrale", gameId: "ac_evo", categoryId: "road_sport", name: "Lancia Delta HF Integrale", brand: "Lancia" },
  { id: "ac_evo_alpine_a290_beta", gameId: "ac_evo", categoryId: "road_sport", name: "Alpine A290 Beta", brand: "Alpine" },
  { id: "ac_evo_toyota_ae86", gameId: "ac_evo", categoryId: "road_sport", name: "Toyota AE86", brand: "Toyota" },

  // Road - Supercar / Muscle
  { id: "ac_evo_bmw_m4_csl", gameId: "ac_evo", categoryId: "road_supercar", name: "BMW M4 CSL", brand: "BMW" },
  { id: "ac_evo_alfa_romeo_giulia_gtam", gameId: "ac_evo", categoryId: "road_supercar", name: "Alfa Romeo Giulia GTAm", brand: "Alfa Romeo" },
  { id: "ac_evo_chevrolet_camaro_zl1", gameId: "ac_evo", categoryId: "road_supercar", name: "Chevrolet Camaro ZL1", brand: "Chevrolet" },
  { id: "ac_evo_lotus_emira", gameId: "ac_evo", categoryId: "road_supercar", name: "Lotus Emira", brand: "Lotus" },
  { id: "ac_evo_bmw_m2_cs", gameId: "ac_evo", categoryId: "road_supercar", name: "BMW M2 CS", brand: "BMW" },
  { id: "ac_evo_datsun_240z", gameId: "ac_evo", categoryId: "road_supercar", name: "Datsun 240Z / Fairlady Z", brand: "Datsun" },

  // Road - Hypercar
  { id: "ac_evo_ferrari_296_gtb", gameId: "ac_evo", categoryId: "road_hypercar", name: "Ferrari 296 GTB", brand: "Ferrari" },
  { id: "ac_evo_lamborghini_huracan_sto", gameId: "ac_evo", categoryId: "road_hypercar", name: "Lamborghini Huracán STO", brand: "Lamborghini" },
  { id: "ac_evo_ferrari_288_gto", gameId: "ac_evo", categoryId: "road_hypercar", name: "Ferrari 288 GTO", brand: "Ferrari" },

  // Race - Spec / Cup / Challenge
  { id: "ac_evo_mazda_mx5_nd_cup", gameId: "ac_evo", categoryId: "race_spec", name: "Mazda MX-5 ND Cup", brand: "Mazda" },
  { id: "ac_evo_bmw_m2_cs_racing", gameId: "ac_evo", categoryId: "race_spec", name: "BMW M2 CS Racing", brand: "BMW" },
  { id: "ac_evo_ferrari_488_challenge_evo", gameId: "ac_evo", categoryId: "race_spec", name: "Ferrari 488 Challenge Evo", brand: "Ferrari" },
  { id: "ac_evo_porsche_911_gt3_cup", gameId: "ac_evo", categoryId: "race_spec", name: "Porsche 911 GT3 Cup", brand: "Porsche" },

  // Race - GT3
  { id: "ac_evo_audi_r8_lms_gt3_evo2", gameId: "ac_evo", categoryId: "race_gt3", name: "Audi R8 LMS GT3 Evo II", brand: "Audi" },
  { id: "ac_evo_porsche_992_gt3r", gameId: "ac_evo", categoryId: "race_gt3", name: "Porsche 992 GT3 R", brand: "Porsche" },
  { id: "ac_evo_ferrari_296_gt3", gameId: "ac_evo", categoryId: "race_gt3", name: "Ferrari 296 GT3", brand: "Ferrari" },
  { id: "ac_evo_mercedes_amg_gt3", gameId: "ac_evo", categoryId: "race_gt3", name: "Mercedes-AMG GT3", brand: "Mercedes-AMG" },

  // Race - GT2 / Track
  { id: "ac_evo_mercedes_amg_gt2", gameId: "ac_evo", categoryId: "race_gt2", name: "Mercedes-AMG GT2", brand: "Mercedes-AMG" },
  { id: "ac_evo_porsche_911_gt2rs_cs_evo", gameId: "ac_evo", categoryId: "race_gt2", name: "Porsche 911 GT2 RS Clubsport Evo Kit", brand: "Porsche" },
  { id: "ac_evo_porsche_935", gameId: "ac_evo", categoryId: "race_gt2", name: "Porsche 935 (2018)", brand: "Porsche", year: 2018 },

  // Race - Vintage / Touring
  { id: "ac_evo_bmw_m3_e30", gameId: "ac_evo", categoryId: "race_vintage", name: "BMW M3 E30", brand: "BMW" },
  { id: "ac_evo_mercedes_190e", gameId: "ac_evo", categoryId: "race_vintage", name: "Mercedes-Benz 190E", brand: "Mercedes-Benz" },

  // Formula (confirmados/anunciados; verificar disponibilidad jugable in-game)
  { id: "ac_evo_ferrari_f2004", gameId: "ac_evo", categoryId: "formula", name: "Ferrari F2004", brand: "Ferrari", year: 2004 },
  { id: "ac_evo_ferrari_sf25", gameId: "ac_evo", categoryId: "formula", name: "Ferrari SF-25", brand: "Ferrari", year: 2025 },
];

// Pequeños ajustes de base por auto. La mayoría usa los defaults de los parámetros;
// estos overrides reflejan rasgos conocidos (autos de calle con menos aero/electrónica,
// motor trasero más estable con algo más de ala, hypercars con más carga).
export const ac_evoBaseSetups: Record<string, SetupValues> = {
  // Autos de calle: aero mínima o nula, electrónica baja
  ac_evo_mazda_mx5_nd: { front_wing: 0, rear_wing: 0, tc: 1, abs: 2, diff_power: 0, diff_coast: 0 },
  ac_evo_honda_s2000_ap1: { front_wing: 0, rear_wing: 0, tc: 0, abs: 1 },
  ac_evo_toyota_ae86: { front_wing: 0, rear_wing: 0, tc: 0, abs: 0, diff_power: 0, diff_coast: 0 },
  ac_evo_vw_golf8_gti_clubsport: { front_wing: 0, rear_wing: 0, tc: 3, abs: 4 },
  // GT3 con motor trasero: algo más de ala y bias más atrás
  ac_evo_porsche_992_gt3r: { rear_wing: 7, ride_height_rear: 78, brake_bias: 56.8 },
  ac_evo_ferrari_296_gt3: { rear_wing: 6, brake_bias: 58.0 },
  // Hypercar de calle: más carga y electrónica intermedia
  ac_evo_lamborghini_huracan_sto: { front_wing: 5, rear_wing: 8, tc: 3, abs: 3 },
  ac_evo_ferrari_296_gtb: { front_wing: 3, rear_wing: 5, tc: 4, abs: 3 },
  // Cup / Challenge: aero de serie, electrónica de carrera
  ac_evo_porsche_911_gt3_cup: { rear_wing: 8, tc: 2, abs: 3, brake_bias: 56.4 },
};

import type { Car, Category, ParameterDef } from "@/lib/types";

// 3.er canal de control de tracción de LMU (Power Cut). Existe en las clases con
// TC (Hypercar/LMGT3/GTE) y NO en los prototipos LMP2/LMP3 (que corren sin TC).
// Se modela como extraParam de clase: se muestra y explica en la tabla; las reglas
// no lo tocan (aparece en su valor por defecto). Completa el trío TC + Slip Angle.
const lmuTcPowerCut: ParameterDef = {
  id: "tc_power_cut",
  group: "electronics",
  name: { es: "Corte de potencia del TC (Power Cut)", en: "TC Power Cut" },
  unit: "",
  min: 1,
  max: 11,
  step: 1,
  default: 4,
  whatItDoes: {
    es: "Tercer canal del control de tracción de LMU: cuánta potencia corta el sistema cuando el patinaje supera el umbral del Slip Angle (escala 1-11). Junto con el nivel de TC y el Slip Angle completa la electrónica de tracción. Más alto = corta más potencia (más conservador).",
    en: "LMU's third traction-control channel: how much power the system cuts once slip exceeds the Slip Angle threshold (1-11 scale). With the TC level and Slip Angle it completes the traction electronics. Higher = cuts more power (more conservative).",
  },
  increaseEffect: {
    es: "Más Power Cut = corte más agresivo: más seguro en baja adherencia, a costa de aceleración.",
    en: "More Power Cut = more aggressive cut: safer on low grip, at the cost of acceleration.",
  },
  decreaseEffect: {
    es: "Menos Power Cut = corta menos al patinar: más aceleración y rotación, con más riesgo de patinar.",
    en: "Less Power Cut = cuts less on slip: more acceleration and rotation, with more wheelspin risk.",
  },
};

// Clases jugables de Le Mans Ultimate (temporada 2026). Hypercar y LMGT3 son las
// principales; LMP2/LMP3 vienen de la European Le Mans Series y GTE es contenido
// heredado del juego base 2023 (ya fuera del WEC actual).
export const lmuCategories: Category[] = [
  { id: "hypercar", gameId: "lmu", name: "Hypercar", extraParams: [lmuTcPowerCut] },
  { id: "lmgt3", gameId: "lmu", name: "LMGT3", extraParams: [lmuTcPowerCut] },
  { id: "lmp2", gameId: "lmu", name: "LMP2" },
  { id: "lmp3", gameId: "lmu", name: "LMP3" },
  { id: "gte", gameId: "lmu", name: "GTE", extraParams: [lmuTcPowerCut] },
];

// Autos de la investigación (exampleCars de cada clase). La lista es PARCIAL:
// son los ejemplos verificados, no la grilla completa (~31 autos en total). Los
// conteos por clase varían según parche/BoP, así que se cargan los confirmados.
export const lmuCars: Car[] = [
  // ── Hypercar (LMH + LMDh) ──────────────────────────────────────────────────
  { id: "lmu_ferrari_499p", gameId: "lmu", categoryId: "hypercar", name: "Ferrari 499P", brand: "Ferrari", year: 2023 },
  { id: "lmu_toyota_gr010", gameId: "lmu", categoryId: "hypercar", name: "Toyota GR010 Hybrid", brand: "Toyota", year: 2021 },
  { id: "lmu_porsche_963", gameId: "lmu", categoryId: "hypercar", name: "Porsche 963", brand: "Porsche", year: 2023 },
  { id: "lmu_cadillac_vseriesr", gameId: "lmu", categoryId: "hypercar", name: "Cadillac V-Series.R", brand: "Cadillac", year: 2023 },
  { id: "lmu_bmw_m_hybrid_v8", gameId: "lmu", categoryId: "hypercar", name: "BMW M Hybrid V8", brand: "BMW", year: 2024 },
  { id: "lmu_peugeot_9x8_2023", gameId: "lmu", categoryId: "hypercar", name: "Peugeot 9X8 (2023)", brand: "Peugeot", year: 2023 },
  { id: "lmu_peugeot_9x8_2024", gameId: "lmu", categoryId: "hypercar", name: "Peugeot 9X8 (2024)", brand: "Peugeot", year: 2024 },
  { id: "lmu_alpine_a424", gameId: "lmu", categoryId: "hypercar", name: "Alpine A424", brand: "Alpine", year: 2024 },
  { id: "lmu_aston_valkyrie_lmh", gameId: "lmu", categoryId: "hypercar", name: "Aston Martin Valkyrie AMR-LMH", brand: "Aston Martin", year: 2025 },
  { id: "lmu_lamborghini_sc63", gameId: "lmu", categoryId: "hypercar", name: "Lamborghini SC63", brand: "Lamborghini", year: 2024 },
  { id: "lmu_glickenhaus_007", gameId: "lmu", categoryId: "hypercar", name: "Glickenhaus SCG 007", brand: "Glickenhaus", year: 2021 },
  { id: "lmu_isotta_fraschini_tipo6", gameId: "lmu", categoryId: "hypercar", name: "Isotta Fraschini Tipo 6", brand: "Isotta Fraschini", year: 2024 },
  { id: "lmu_vanwall_vandervell_680", gameId: "lmu", categoryId: "hypercar", name: "Vanwall Vandervell 680", brand: "Vanwall", year: 2023 },
  { id: "lmu_genesis_gmr001", gameId: "lmu", categoryId: "hypercar", name: "Genesis GMR-001", brand: "Genesis", year: 2026 },
  // ── LMGT3 ──────────────────────────────────────────────────────────────────
  { id: "lmu_ferrari_296_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Ferrari 296 LMGT3", brand: "Ferrari", year: 2024 },
  { id: "lmu_porsche_911_gt3r", gameId: "lmu", categoryId: "lmgt3", name: "Porsche 911 GT3 R", brand: "Porsche", year: 2023 },
  { id: "lmu_bmw_m4_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "BMW M4 LMGT3", brand: "BMW", year: 2024 },
  { id: "lmu_aston_vantage_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Aston Martin Vantage AMR LMGT3", brand: "Aston Martin", year: 2024 },
  { id: "lmu_corvette_z06_lmgt3r", gameId: "lmu", categoryId: "lmgt3", name: "Corvette Z06 LMGT3.R", brand: "Chevrolet", year: 2024 },
  { id: "lmu_ford_mustang_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Ford Mustang LMGT3", brand: "Ford", year: 2024 },
  { id: "lmu_lamborghini_huracan_lmgt3_evo2", gameId: "lmu", categoryId: "lmgt3", name: "Lamborghini Huracán LMGT3 Evo2", brand: "Lamborghini", year: 2024 },
  { id: "lmu_lexus_rcf_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Lexus RC F LMGT3", brand: "Lexus", year: 2024 },
  { id: "lmu_mclaren_720s_lmgt3_evo", gameId: "lmu", categoryId: "lmgt3", name: "McLaren 720S LMGT3 Evo", brand: "McLaren", year: 2024 },
  { id: "lmu_mercedes_amg_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Mercedes-AMG LMGT3", brand: "Mercedes-AMG", year: 2023 },
  // ── LMP2 ───────────────────────────────────────────────────────────────────
  { id: "lmu_oreca_07_gibson_2023", gameId: "lmu", categoryId: "lmp2", name: "ORECA 07 Gibson (2023)", brand: "ORECA", year: 2023 },
  { id: "lmu_oreca_07_gibson_2024", gameId: "lmu", categoryId: "lmp2", name: "ORECA 07 Gibson (2024)", brand: "ORECA", year: 2024 },
  // ── LMP3 ───────────────────────────────────────────────────────────────────
  { id: "lmu_ginetta_g61_p325", gameId: "lmu", categoryId: "lmp3", name: "Ginetta G61-LT-P325 Evo", brand: "Ginetta", year: 2025 },
  { id: "lmu_ligier_js_p325", gameId: "lmu", categoryId: "lmp3", name: "Ligier JS P325", brand: "Ligier", year: 2025 },
  { id: "lmu_adess_ad25", gameId: "lmu", categoryId: "lmp3", name: "Adess AD25", brand: "Adess", year: 2026 },
  // ── GTE (contenido heredado, fuera del WEC actual) ─────────────────────────
  { id: "lmu_ferrari_488_gte_evo", gameId: "lmu", categoryId: "gte", name: "Ferrari 488 GTE Evo", brand: "Ferrari", year: 2019 },
  { id: "lmu_porsche_911_rsr19", gameId: "lmu", categoryId: "gte", name: "Porsche 911 RSR-19", brand: "Porsche", year: 2019 },
  { id: "lmu_corvette_c8r", gameId: "lmu", categoryId: "gte", name: "Chevrolet Corvette C8.R", brand: "Chevrolet", year: 2020 },
  { id: "lmu_aston_vantage_gte", gameId: "lmu", categoryId: "gte", name: "Aston Martin Vantage AMR GTE", brand: "Aston Martin", year: 2018 },
  // Agregados verificados (workflow wf_891905b9-f55, 2026-06-24): LMP3 (V1.3) y Hypercar 2026 (V1.3.3).
  { id: "lmu_duqueine_d09", gameId: "lmu", categoryId: "lmp3", name: "Duqueine D09", brand: "Duqueine", year: 2025 },
  { id: "lmu_toyota_tr010", gameId: "lmu", categoryId: "hypercar", name: "Toyota TR010 Hybrid (2026)", brand: "Toyota", year: 2026 },
];

// Pequeños overrides de base por auto. La mayoría usa los defaults de los
// parámetros; aquí solo se ajusta lo que diferencia a cada clase a grandes rasgos.
// Hypercar: muy sensible al aero (alturas bajas, energía virtual). LMGT3/GTE:
// más mecánico, con electrónica (TC/ABS) más presente.
export const lmuBaseSetups: Record<string, Record<string, number>> = {
  // Hypercar: plataforma baja, más ala, gestión híbrida/energía propia.
  lmu_ferrari_499p: { rear_wing: 7, ride_height_front: 48, ride_height_rear: 58, brake_migration: 2.5 },
  lmu_toyota_gr010: { rear_wing: 7, ride_height_front: 48, ride_height_rear: 58, brake_migration: 2.5 },
  lmu_porsche_963: { rear_wing: 7, ride_height_front: 48, ride_height_rear: 58, brake_migration: 2.5, deployment_map: 4 },
  // LMP2: muy aerodinámico y liviano, sin híbrido ni electrónica de asistencia.
  lmu_oreca_07_gibson_2024: { rear_wing: 8, ride_height_front: 45, ride_height_rear: 55, tc: 0, abs: 0 },
  lmu_oreca_07_gibson_2023: { rear_wing: 8, ride_height_front: 45, ride_height_rear: 55, tc: 0, abs: 0 },
  // LMP3: menos downforce, motor de serie; punto de partida más conservador.
  lmu_adess_ad25: { rear_wing: 5, ride_height_front: 50, ride_height_rear: 62, tc: 0, abs: 0 },
  // LMGT3: más mecánico, electrónica presente, ala moderada.
  lmu_ferrari_296_lmgt3: { rear_wing: 6, tc: 4, abs: 3, ride_height_front: 55, ride_height_rear: 68 },
  lmu_porsche_911_gt3r: { rear_wing: 7, tc: 4, abs: 3, ride_height_front: 55, ride_height_rear: 70, brake_bias: 54.0 },
  // GTE: motor atrás/medio según auto; base mecánica clásica.
  lmu_porsche_911_rsr19: { rear_wing: 6, tc: 3, abs: 2, ride_height_front: 52, ride_height_rear: 64 },
};

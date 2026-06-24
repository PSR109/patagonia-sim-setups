import type { Car, Category, SetupValues } from "@/lib/types";

// Categorías = clases de EA Sports WRC. El juego tiene ~21 clases y ~100 coches;
// aquí cargamos las clases y los coches de ejemplo verificados de cada una.
// La lista de coches es PARCIAL (ver gaps): faltan coches que la investigación
// no listó por nombre dentro de cada clase.
// Rangos de muelle por clase (workflow de exactitud, 2.ª fuente independiente
// takegaki-drive.com + WRCsetups): el global 40-130 N/mm es muy bajo para las
// clases modernas, que en asfalto llegan a ~186-260 N/mm (verificado: 306 Maxi
// 186, C3 Rally2 260). Se ensancha el tope por clase. La agrupación es
// representativa; el cap exacto del slider sigue siendo best-effort por-clase.
const springsKit: Record<string, { min: number; max: number; step: number; default: number }> = {
  spring_front: { min: 30, max: 250, step: 5, default: 120 },
  spring_rear: { min: 30, max: 250, step: 5, default: 120 },
};
const springsModern: Record<string, { min: number; max: number; step: number; default: number }> = {
  spring_front: { min: 45, max: 260, step: 5, default: 90 },
  spring_rear: { min: 45, max: 260, step: 5, default: 90 },
};

export const ea_wrcCategories: Category[] = [
  { id: "h1_fwd", gameId: "ea_wrc", name: "H1 FWD" },
  { id: "h2_fwd", gameId: "ea_wrc", name: "H2 FWD" },
  { id: "h2_rwd", gameId: "ea_wrc", name: "H2 RWD" },
  { id: "h3_rwd", gameId: "ea_wrc", name: "H3 RWD" },
  { id: "group_b_rwd", gameId: "ea_wrc", name: "Group B RWD" },
  { id: "group_b_4wd", gameId: "ea_wrc", name: "Group B 4WD" },
  { id: "group_a", gameId: "ea_wrc", name: "Group A" },
  // Kit Car / S1600 / S2000: muelles de asfalto duros (verificado 306 Maxi ~186 N/mm).
  { id: "f2_kit_car", gameId: "ea_wrc", name: "F2 Kit Car", paramOverrides: springsKit },
  { id: "s1600", gameId: "ea_wrc", name: "S1600", paramOverrides: springsKit },
  { id: "s2000", gameId: "ea_wrc", name: "S2000", paramOverrides: springsKit },
  // Customer moderno (Rally4→WRC2): asfalto hasta ~260 N/mm, grava desde ~45.
  { id: "nr4_r4", gameId: "ea_wrc", name: "NR4/R4", paramOverrides: springsModern },
  { id: "rally4", gameId: "ea_wrc", name: "Rally4", paramOverrides: springsModern },
  { id: "rally3", gameId: "ea_wrc", name: "Rally3", paramOverrides: springsModern },
  { id: "rally2", gameId: "ea_wrc", name: "Rally2", paramOverrides: springsModern },
  { id: "junior_wrc", gameId: "ea_wrc", name: "Junior WRC", paramOverrides: springsModern },
  { id: "wrc2", gameId: "ea_wrc", name: "WRC2 (Rally2 actual)", paramOverrides: springsModern },
  { id: "wrc_rally1", gameId: "ea_wrc", name: "WRC (Rally1 Hybrid)" },
  { id: "wrc_1997_2011", gameId: "ea_wrc", name: "WRC 1997-2011" },
  { id: "wrc_2012_2016", gameId: "ea_wrc", name: "WRC 2012-2016" },
  { id: "wrc_2017_2021", gameId: "ea_wrc", name: "WRC 2017-2021" },
];

// Coches verificados de la investigación (exampleCars de cada clase).
export const ea_wrcCars: Car[] = [
  // H1 FWD
  { id: "ea_wrc_lancia_fulvia_hf", gameId: "ea_wrc", categoryId: "h1_fwd", name: "Lancia Fulvia HF", brand: "Lancia", drivetrain: "fwd" },
  { id: "ea_wrc_mini_cooper_s", gameId: "ea_wrc", categoryId: "h1_fwd", name: "Mini Cooper S", brand: "Mini", drivetrain: "fwd" },
  { id: "ea_wrc_vauxhall_nova_sport", gameId: "ea_wrc", categoryId: "h1_fwd", name: "Vauxhall Nova Sport", brand: "Vauxhall", drivetrain: "fwd" },
  // H2 FWD
  { id: "ea_wrc_peugeot_205_gti", gameId: "ea_wrc", categoryId: "h2_fwd", name: "Peugeot 205 GTI", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_peugeot_309_gti", gameId: "ea_wrc", categoryId: "h2_fwd", name: "Peugeot 309 GTI", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_volkswagen_golf_gti", gameId: "ea_wrc", categoryId: "h2_fwd", name: "Volkswagen Golf GTI", brand: "Volkswagen", drivetrain: "fwd" },
  // H2 RWD
  { id: "ea_wrc_alpine_a110_1600s", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Alpine A110 1600 S", brand: "Alpine" },
  { id: "ea_wrc_fiat_131_abarth", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Fiat 131 Abarth Rally", brand: "Fiat" },
  { id: "ea_wrc_opel_kadett_c_gte", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Opel Kadett C GT/E", brand: "Opel" },
  // H3 RWD
  { id: "ea_wrc_bmw_m3_evo_rally", gameId: "ea_wrc", categoryId: "h3_rwd", name: "BMW M3 Evo Rally", brand: "BMW" },
  { id: "ea_wrc_ford_sierra_cosworth_rs500", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Ford Sierra Cosworth RS500", brand: "Ford" },
  { id: "ea_wrc_lancia_stratos", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Lancia Stratos", brand: "Lancia" },
  // Group B RWD
  { id: "ea_wrc_lancia_037_evo2", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "Lancia 037 Evo 2", brand: "Lancia" },
  { id: "ea_wrc_bmw_m1_procar_rally", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "BMW M1 Procar Rally", brand: "BMW" },
  { id: "ea_wrc_opel_manta_400", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "Opel Manta 400", brand: "Opel" },
  // Group B 4WD
  { id: "ea_wrc_audi_sport_quattro_s1", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Audi Sport quattro S1", brand: "Audi" },
  { id: "ea_wrc_peugeot_205_t16_evo2", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Peugeot 205 T16 Evo 2", brand: "Peugeot" },
  { id: "ea_wrc_lancia_delta_s4", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Lancia Delta S4", brand: "Lancia" },
  // Group A
  { id: "ea_wrc_lancia_delta_hf_integrale", gameId: "ea_wrc", categoryId: "group_a", name: "Lancia Delta HF Integrale", brand: "Lancia" },
  { id: "ea_wrc_ford_escort_rs_cosworth", gameId: "ea_wrc", categoryId: "group_a", name: "Ford Escort RS Cosworth", brand: "Ford" },
  { id: "ea_wrc_subaru_impreza", gameId: "ea_wrc", categoryId: "group_a", name: "Subaru Impreza", brand: "Subaru" },
  // F2 Kit Car
  { id: "ea_wrc_peugeot_306_maxi", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Peugeot 306 Maxi", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_ford_escort_mk6_maxi", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Ford Escort Mk6 Maxi", brand: "Ford", drivetrain: "fwd" },
  { id: "ea_wrc_seat_ibiza_kit_car", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "SEAT Ibiza Kit Car", brand: "SEAT", drivetrain: "fwd" },
  // S1600
  { id: "ea_wrc_citroen_saxo_s1600", gameId: "ea_wrc", categoryId: "s1600", name: "Citroën Saxo Super 1600", brand: "Citroën", drivetrain: "fwd" },
  { id: "ea_wrc_citroen_c2_s1600", gameId: "ea_wrc", categoryId: "s1600", name: "Citroën C2 Super 1600", brand: "Citroën", drivetrain: "fwd" },
  { id: "ea_wrc_renault_clio_s1600", gameId: "ea_wrc", categoryId: "s1600", name: "Renault Clio S1600", brand: "Renault", drivetrain: "fwd" },
  // S2000
  { id: "ea_wrc_peugeot_207_s2000", gameId: "ea_wrc", categoryId: "s2000", name: "Peugeot 207 S2000", brand: "Peugeot" },
  { id: "ea_wrc_fiat_grande_punto_s2000", gameId: "ea_wrc", categoryId: "s2000", name: "Fiat Grande Punto S2000", brand: "Fiat" },
  { id: "ea_wrc_opel_corsa_s2000", gameId: "ea_wrc", categoryId: "s2000", name: "Opel Corsa S2000", brand: "Opel" },
  // NR4/R4
  { id: "ea_wrc_mitsubishi_lancer_evo_x", gameId: "ea_wrc", categoryId: "nr4_r4", name: "Mitsubishi Lancer Evolution X", brand: "Mitsubishi" },
  { id: "ea_wrc_djm_mcrae_r4", gameId: "ea_wrc", categoryId: "nr4_r4", name: "DJM Motorsport McRae R4", brand: "DJM Motorsport" },
  // Rally4
  { id: "ea_wrc_ford_fiesta_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Ford Fiesta Rally4", brand: "Ford", drivetrain: "fwd" },
  { id: "ea_wrc_peugeot_208_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Peugeot 208 Rally4", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_opel_corsa_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Opel Corsa Rally4", brand: "Opel", drivetrain: "fwd" },
  // Rally3
  { id: "ea_wrc_ford_fiesta_rally3", gameId: "ea_wrc", categoryId: "rally3", name: "Ford Fiesta Rally3", brand: "Ford" },
  { id: "ea_wrc_renault_clio_rally3", gameId: "ea_wrc", categoryId: "rally3", name: "Renault Clio Rally3", brand: "Renault" },
  // Rally2
  { id: "ea_wrc_ford_fiesta_r5_mk7_evo2", gameId: "ea_wrc", categoryId: "rally2", name: "Ford Fiesta R5 Mk7 Evo 2", brand: "Ford" },
  { id: "ea_wrc_skoda_fabia_rs_rally2", gameId: "ea_wrc", categoryId: "rally2", name: "Škoda Fabia RS Rally2", brand: "Škoda" },
  { id: "ea_wrc_volkswagen_polo_gti_r5", gameId: "ea_wrc", categoryId: "rally2", name: "Volkswagen Polo GTI R5", brand: "Volkswagen" },
  // Junior WRC
  { id: "ea_wrc_ford_fiesta_rally3_junior_2022", gameId: "ea_wrc", categoryId: "junior_wrc", name: "Ford Fiesta Rally3 (Junior 2022)", brand: "Ford", year: 2022 },
  { id: "ea_wrc_ford_fiesta_rally3_junior_2024", gameId: "ea_wrc", categoryId: "junior_wrc", name: "Ford Fiesta Rally3 (Junior 2024)", brand: "Ford", year: 2024 },
  // WRC2 (Rally2 actual)
  { id: "ea_wrc_citroen_c3_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "Citroën C3 Rally2", brand: "Citroën" },
  { id: "ea_wrc_toyota_gr_yaris_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "Toyota GR Yaris Rally2", brand: "Toyota" },
  { id: "ea_wrc_skoda_fabia_rs_rally2_wrc2", gameId: "ea_wrc", categoryId: "wrc2", name: "Škoda Fabia RS Rally2", brand: "Škoda" },
  // WRC (Rally1 Hybrid)
  { id: "ea_wrc_toyota_gr_yaris_rally1", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Toyota GR Yaris Rally1", brand: "Toyota" },
  { id: "ea_wrc_ford_puma_rally1", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Ford Puma Rally1", brand: "Ford" },
  { id: "ea_wrc_hyundai_i20_n_rally1", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Hyundai i20 N Rally1", brand: "Hyundai" },
  // WRC 1997-2011
  { id: "ea_wrc_citroen_xsara_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Citroën Xsara WRC", brand: "Citroën" },
  { id: "ea_wrc_subaru_impreza_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Subaru Impreza WRC", brand: "Subaru" },
  { id: "ea_wrc_ford_focus_rs_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Ford Focus RS WRC", brand: "Ford" },
  // WRC 2012-2016
  { id: "ea_wrc_mini_jcw_wrc", gameId: "ea_wrc", categoryId: "wrc_2012_2016", name: "Mini John Cooper Works WRC", brand: "Mini" },
  { id: "ea_wrc_vw_polo_r_wrc", gameId: "ea_wrc", categoryId: "wrc_2012_2016", name: "VW Polo R WRC", brand: "Volkswagen" },
  { id: "ea_wrc_citroen_ds3_wrc", gameId: "ea_wrc", categoryId: "wrc_2012_2016", name: "Citroën DS3 WRC", brand: "Citroën" },
  // WRC 2017-2021
  { id: "ea_wrc_ford_fiesta_wrc", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "Ford Fiesta WRC", brand: "Ford" },
  { id: "ea_wrc_vw_polo_gti_r5_wrc", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "VW Polo GTI R5/WRC", brand: "Volkswagen" },
  { id: "ea_wrc_hyundai_i20_coupe_wrc", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "Hyundai i20 Coupe WRC", brand: "Hyundai" },
];

// Pequeños ajustes de base por auto. El juego ajusta setups por superficie, no
// por archivo importable; los overrides reflejan tendencias por tipo de tracción.
// El resto de los coches usa los defaults de los parámetros.
export const ea_wrcBaseSetups: Record<string, SetupValues> = {
  // Tracción trasera clásica: cola viva, conviene algo más de toe-in trasero y
  // el reparto de frenada algo adelantado para domarla.
  ea_wrc_lancia_stratos: { toe_rear: 0.15, brake_bias: 60.0 },
  // Rally1 híbrido 4WD: mucha tracción, más bloqueo en aceleración y final más larga.
  ea_wrc_toyota_gr_yaris_rally1: { diff_power: 55, final_drive: 12 },
  ea_wrc_ford_puma_rally1: { diff_power: 55, final_drive: 12 },
  ea_wrc_hyundai_i20_n_rally1: { diff_power: 55, final_drive: 12 },
  // FWD de época: balance hacia subviraje, conviene endurecer la barra trasera
  // para soltar la cola y rotar (default 18 N/mm → 24, un escalón firme y seguro).
  ea_wrc_peugeot_205_gti: { arb_rear: 24, brake_bias: 60.0 },
};

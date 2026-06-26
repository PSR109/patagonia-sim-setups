import type { Car, Category, SetupValues } from "@/lib/types";

// Categorías = clases de EA Sports WRC. El juego tiene ~21 clases y ~100 coches;
// aquí cargamos las clases y los coches de ejemplo verificados de cada una.
// La lista de coches es PARCIAL (ver gaps): faltan coches que la investigación
// no listó por nombre dentro de cada clase.
// Rangos de muelle por clase: el global de la REFERENCIA (Puma Rally1, 60-200 N/mm)
// se queda corto para clases modernas de asfalto (verificado 2.ª fuente: 306 Maxi
// ~186, C3 Rally2 ~260 N/mm). Por eso se ensancha el tope por clase. step alineado a
// 1 N/mm (igual que el global nuevo) para que los deltas de las reglas escalen igual.
const springsKit: Record<string, { min: number; max: number; step: number; default: number }> = {
  spring_front: { min: 30, max: 250, step: 1, default: 120 },
  spring_rear: { min: 30, max: 250, step: 1, default: 120 },
};
const springsModern: Record<string, { min: number; max: number; step: number; default: number }> = {
  spring_front: { min: 45, max: 260, step: 1, default: 90 },
  spring_rear: { min: 45, max: 260, step: 1, default: 90 },
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

// Roster COMPLETO y VERIFICADO (100 autos jugables) extraído del propio juego:
// Documents/My Games/WRC/telemetry/readme/ids.json → vehicles[103] (se omiten 3
// "Vehículo del creador"). class→category y marca derivada del nombre. Es la
// grilla real del juego a jun 2026, no una selección.
export const ea_wrcCars: Car[] = [
  // H1 FWD (3)
  { id: "ea_wrc_lancia_fulvia_hf", gameId: "ea_wrc", categoryId: "h1_fwd", name: "Lancia Fulvia HF", brand: "Lancia", drivetrain: "fwd" },
  { id: "ea_wrc_mini_cooper_s", gameId: "ea_wrc", categoryId: "h1_fwd", name: "MINI Cooper S", brand: "Mini", drivetrain: "fwd" },
  { id: "ea_wrc_vauxhall_nova_sport", gameId: "ea_wrc", categoryId: "h1_fwd", name: "Vauxhall Nova Sport", brand: "Vauxhall", drivetrain: "fwd" },
  // H2 FWD (3)
  { id: "ea_wrc_peugeot_205_gti", gameId: "ea_wrc", categoryId: "h2_fwd", name: "Peugeot 205 GTI", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_peugeot_309_gti", gameId: "ea_wrc", categoryId: "h2_fwd", name: "Peugeot 309 GTI", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_volkswagen_golf_gti", gameId: "ea_wrc", categoryId: "h2_fwd", name: "Volkswagen Golf GTI", brand: "Volkswagen", drivetrain: "fwd" },
  // H2 RWD (7)
  { id: "ea_wrc_alpine_renault_a110_1600_s", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Alpine Renault A110 1600 S", brand: "Alpine", drivetrain: "rwd" },
  { id: "ea_wrc_fiat_131_abarth_rally", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Fiat 131 Abarth Rally", brand: "Fiat", drivetrain: "rwd" },
  { id: "ea_wrc_ford_escort_mk2", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Ford Escort MK2", brand: "Ford", drivetrain: "rwd" },
  { id: "ea_wrc_ford_escort_rs_1600_mk1", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Ford Escort RS 1600 MK1", brand: "Ford", drivetrain: "rwd" },
  { id: "ea_wrc_hillman_avenger", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Hillman Avenger", brand: "Hillman", drivetrain: "rwd" },
  { id: "ea_wrc_opel_kadett_c_gt_e", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Opel Kadett C GT/E", brand: "Opel", drivetrain: "rwd" },
  { id: "ea_wrc_talbot_sunbeam_lotus", gameId: "ea_wrc", categoryId: "h2_rwd", name: "Talbot Sunbeam Lotus", brand: "Talbot", drivetrain: "rwd" },
  // H3 RWD (6)
  { id: "ea_wrc_bmw_m3_evo_rally", gameId: "ea_wrc", categoryId: "h3_rwd", name: "BMW M3 Evo Rally", brand: "BMW", drivetrain: "rwd" },
  { id: "ea_wrc_ford_escort_mk2_mcrae_motorsport", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Ford Escort MK2 McRae Motorsport", brand: "Ford", drivetrain: "rwd" },
  { id: "ea_wrc_ford_sierra_cosworth_rs500", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Ford Sierra Cosworth RS500", brand: "Ford", drivetrain: "rwd" },
  { id: "ea_wrc_lancia_stratos", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Lancia Stratos", brand: "Lancia", drivetrain: "rwd" },
  { id: "ea_wrc_opel_ascona_400", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Opel Ascona 400", brand: "Opel", drivetrain: "rwd" },
  { id: "ea_wrc_renault_5_turbo", gameId: "ea_wrc", categoryId: "h3_rwd", name: "Renault 5 Turbo", brand: "Renault", drivetrain: "rwd" },
  // Group B RWD (4)
  { id: "ea_wrc_bmw_m1_procar_rally", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "BMW M1 Procar Rally", brand: "BMW", drivetrain: "rwd" },
  { id: "ea_wrc_lancia_037_evo_2", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "Lancia 037 Evo 2", brand: "Lancia", drivetrain: "rwd" },
  { id: "ea_wrc_opel_manta_400", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "Opel Manta 400", brand: "Opel", drivetrain: "rwd" },
  { id: "ea_wrc_porsche_911_sc_rs", gameId: "ea_wrc", categoryId: "group_b_rwd", name: "Porsche 911 SC RS", brand: "Porsche", drivetrain: "rwd" },
  // Group B 4WD (5)
  { id: "ea_wrc_audi_sport_quattro_s1_e2", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Audi Sport quattro S1 (E2)", brand: "Audi" },
  { id: "ea_wrc_ford_rs200", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Ford RS200", brand: "Ford" },
  { id: "ea_wrc_lancia_delta_s4", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Lancia Delta S4", brand: "Lancia" },
  { id: "ea_wrc_mg_metro_6r4", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "MG Metro 6R4", brand: "MG" },
  { id: "ea_wrc_peugeot_205_t16_evo_2", gameId: "ea_wrc", categoryId: "group_b_4wd", name: "Peugeot 205 T16 Evo 2", brand: "Peugeot" },
  // NR4/R4 (3)
  { id: "ea_wrc_mcrae_r4", gameId: "ea_wrc", categoryId: "nr4_r4", name: "McRae R4", brand: "DJM Motorsport" },
  { id: "ea_wrc_mitsubishi_lancer_evolution_x", gameId: "ea_wrc", categoryId: "nr4_r4", name: "Mitsubishi Lancer Evolution X", brand: "Mitsubishi" },
  { id: "ea_wrc_subaru_wrx_sti_nr4", gameId: "ea_wrc", categoryId: "nr4_r4", name: "SUBARU WRX STI NR4", brand: "Subaru" },
  // Rally4 (7)
  { id: "ea_wrc_citroen_c2_r2_max", gameId: "ea_wrc", categoryId: "rally4", name: "Citroën C2 R2 Max", brand: "Citroën", drivetrain: "fwd" },
  { id: "ea_wrc_ford_fiesta_mk8_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Ford Fiesta MK8 Rally4", brand: "Ford", drivetrain: "fwd" },
  { id: "ea_wrc_opel_adam_r2", gameId: "ea_wrc", categoryId: "rally4", name: "Opel Adam R2", brand: "Opel", drivetrain: "fwd" },
  { id: "ea_wrc_opel_corsa_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Opel Corsa Rally4", brand: "Opel", drivetrain: "fwd" },
  { id: "ea_wrc_peugeot_208_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Peugeot 208 Rally4", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_renault_clio_rally4", gameId: "ea_wrc", categoryId: "rally4", name: "Renault Clio Rally4", brand: "Renault", drivetrain: "fwd" },
  { id: "ea_wrc_renault_twingo_ii", gameId: "ea_wrc", categoryId: "rally4", name: "Renault Twingo II", brand: "Renault", drivetrain: "fwd" },
  // S1600 (5)
  { id: "ea_wrc_citroen_c2_super_1600", gameId: "ea_wrc", categoryId: "s1600", name: "Citroën C2 Super 1600", brand: "Citroën", drivetrain: "fwd" },
  { id: "ea_wrc_citroen_saxo_super_1600", gameId: "ea_wrc", categoryId: "s1600", name: "Citroën Saxo Super 1600", brand: "Citroën", drivetrain: "fwd" },
  { id: "ea_wrc_ford_puma_s1600", gameId: "ea_wrc", categoryId: "s1600", name: "Ford Puma S1600", brand: "Ford", drivetrain: "fwd" },
  { id: "ea_wrc_peugeot_206_s1600", gameId: "ea_wrc", categoryId: "s1600", name: "Peugeot 206 S1600", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_renault_clio_s1600", gameId: "ea_wrc", categoryId: "s1600", name: "Renault Clio S1600", brand: "Renault", drivetrain: "fwd" },
  // S2000 (3)
  { id: "ea_wrc_fiat_grande_punto_abarth_s2000", gameId: "ea_wrc", categoryId: "s2000", name: "Fiat Grande Punto Abarth S2000", brand: "Fiat" },
  { id: "ea_wrc_opel_corsa_s2000", gameId: "ea_wrc", categoryId: "s2000", name: "Opel Corsa S2000", brand: "Opel" },
  { id: "ea_wrc_peugeot_207_s2000", gameId: "ea_wrc", categoryId: "s2000", name: "Peugeot 207 S2000", brand: "Peugeot" },
  // F2 Kit Car (7)
  { id: "ea_wrc_citroen_xsara_kit_car", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Citroën Xsara Kit Car", brand: "Citroën", drivetrain: "fwd" },
  { id: "ea_wrc_ford_escort_mk_6_maxi", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Ford Escort Mk 6 Maxi", brand: "Ford", drivetrain: "fwd" },
  { id: "ea_wrc_peugeot_306_maxi", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Peugeot 306 Maxi", brand: "Peugeot", drivetrain: "fwd" },
  { id: "ea_wrc_renault_maxi_megane", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Renault Maxi Mégane", brand: "Renault", drivetrain: "fwd" },
  { id: "ea_wrc_seat_ibiza_kit_car", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "SEAT Ibiza Kit Car", brand: "SEAT", drivetrain: "fwd" },
  { id: "ea_wrc_vauxhall_astra_rally_car", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Vauxhall Astra Rally Car", brand: "Vauxhall", drivetrain: "fwd" },
  { id: "ea_wrc_volkswagen_golf_iv_kit_car", gameId: "ea_wrc", categoryId: "f2_kit_car", name: "Volkswagen Golf IV Kit Car", brand: "Volkswagen", drivetrain: "fwd" },
  // Group A (5)
  { id: "ea_wrc_ford_escort_rs_cosworth", gameId: "ea_wrc", categoryId: "group_a", name: "Ford Escort RS Cosworth", brand: "Ford" },
  { id: "ea_wrc_lancia_delta_hf_integrale", gameId: "ea_wrc", categoryId: "group_a", name: "Lancia Delta HF Integrale", brand: "Lancia" },
  { id: "ea_wrc_mitsubishi_galant_vr4", gameId: "ea_wrc", categoryId: "group_a", name: "Mitsubishi Galant VR4", brand: "Mitsubishi" },
  { id: "ea_wrc_subaru_impreza_1995", gameId: "ea_wrc", categoryId: "group_a", name: "SUBARU Impreza 1995", brand: "Subaru" },
  { id: "ea_wrc_subaru_legacy_rs", gameId: "ea_wrc", categoryId: "group_a", name: "SUBARU Legacy RS", brand: "Subaru" },
  // WRC 1997-2011 (13)
  { id: "ea_wrc_citroen_c4_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Citroën C4 WRC", brand: "Citroën" },
  { id: "ea_wrc_citroen_xsara_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Citroën Xsara WRC", brand: "Citroën" },
  { id: "ea_wrc_ford_focus_rs_rally_2001", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Ford Focus RS Rally 2001", brand: "Ford" },
  { id: "ea_wrc_ford_focus_rs_rally_2008", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Ford Focus RS Rally 2008", brand: "Ford" },
  { id: "ea_wrc_ford_focus_wrc_99", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Ford Focus WRC '99", brand: "Ford" },
  { id: "ea_wrc_mini_countryman_rally_edition", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "MINI Countryman Rally Edition", brand: "Mini" },
  { id: "ea_wrc_mitsubishi_lancer_evolution_vi", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Mitsubishi Lancer Evolution VI", brand: "Mitsubishi" },
  { id: "ea_wrc_peugeot_206_rally", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "Peugeot 206 Rally", brand: "Peugeot" },
  { id: "ea_wrc_seat_cordoba_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "SEAT Córdoba WRC", brand: "SEAT" },
  { id: "ea_wrc_skoda_fabia_wrc", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "ŠKODA Fabia WRC", brand: "Škoda" },
  { id: "ea_wrc_subaru_impreza_1998", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "SUBARU Impreza 1998", brand: "Subaru" },
  { id: "ea_wrc_subaru_impreza_2001", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "SUBARU Impreza 2001", brand: "Subaru" },
  { id: "ea_wrc_subaru_impreza_2008", gameId: "ea_wrc", categoryId: "wrc_1997_2011", name: "SUBARU Impreza 2008", brand: "Subaru" },
  // Rally2 (5)
  { id: "ea_wrc_ford_fiesta_r5_mk7_evo_2", gameId: "ea_wrc", categoryId: "rally2", name: "Ford Fiesta R5 MK7 Evo 2", brand: "Ford" },
  { id: "ea_wrc_peugeot_208_t16_r5", gameId: "ea_wrc", categoryId: "rally2", name: "Peugeot 208 T16 R5", brand: "Peugeot" },
  { id: "ea_wrc_skoda_fabia_rally2_evo_rally2", gameId: "ea_wrc", categoryId: "rally2", name: "ŠKODA Fabia Rally2 Evo", brand: "Škoda" },
  { id: "ea_wrc_skoda_fabia_rs_rally2_rally2", gameId: "ea_wrc", categoryId: "rally2", name: "ŠKODA Fabia RS Rally2", brand: "Škoda" },
  { id: "ea_wrc_volkswagen_polo_gti_r5_rally2", gameId: "ea_wrc", categoryId: "rally2", name: "Volkswagen Polo GTI R5", brand: "Volkswagen" },
  // WRC 2017-2021 (4)
  { id: "ea_wrc_citroen_c3_wrc", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "Citroën C3 WRC", brand: "Citroën" },
  { id: "ea_wrc_ford_fiesta_wrc", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "Ford Fiesta WRC", brand: "Ford" },
  { id: "ea_wrc_hyundai_i20_coupe_wrc_21", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "Hyundai i20 Coupe WRC '21", brand: "Hyundai" },
  { id: "ea_wrc_volkswagen_polo_2017", gameId: "ea_wrc", categoryId: "wrc_2017_2021", name: "Volkswagen Polo 2017", brand: "Volkswagen" },
  // WRC (Rally1 Hybrid) (6)
  { id: "ea_wrc_ford_puma_rally1_hybrid", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Ford Puma Rally1 HYBRID", brand: "Ford" },
  { id: "ea_wrc_ford_puma_rally1_hybrid_wrc_rally1", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Ford Puma Rally1 HYBRID", brand: "Ford" },
  { id: "ea_wrc_hyundai_i20_n_rally1_hybrid", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Hyundai i20 N Rally1 HYBRID", brand: "Hyundai" },
  { id: "ea_wrc_hyundai_i20_n_rally1_hybrid_wrc_rally1", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Hyundai i20 N Rally1 HYBRID", brand: "Hyundai" },
  { id: "ea_wrc_toyota_gr_yaris_rally1_hybrid", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Toyota GR Yaris Rally1 HYBRID", brand: "Toyota" },
  { id: "ea_wrc_toyota_gr_yaris_rally1_hybrid_wrc_rally1", gameId: "ea_wrc", categoryId: "wrc_rally1", name: "Toyota GR Yaris Rally1 HYBRID", brand: "Toyota" },
  // Junior WRC (2)
  { id: "ea_wrc_ford_fiesta_rally3", gameId: "ea_wrc", categoryId: "junior_wrc", name: "Ford Fiesta Rally3", brand: "Ford" },
  { id: "ea_wrc_ford_fiesta_rally3_evo", gameId: "ea_wrc", categoryId: "junior_wrc", name: "Ford Fiesta Rally3 Evo", brand: "Ford" },
  // WRC2 (7)
  { id: "ea_wrc_citroen_c3_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "Citroën C3 Rally2", brand: "Citroën" },
  { id: "ea_wrc_ford_fiesta_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "Ford Fiesta Rally2", brand: "Ford" },
  { id: "ea_wrc_hyundai_i20_n_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "Hyundai i20 N Rally2", brand: "Hyundai" },
  { id: "ea_wrc_skoda_fabia_rally2_evo", gameId: "ea_wrc", categoryId: "wrc2", name: "ŠKODA Fabia Rally2 Evo", brand: "Škoda" },
  { id: "ea_wrc_skoda_fabia_rs_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "ŠKODA Fabia RS Rally2", brand: "Škoda" },
  { id: "ea_wrc_toyota_gr_yaris_rally2", gameId: "ea_wrc", categoryId: "wrc2", name: "Toyota GR Yaris Rally2", brand: "Toyota" },
  { id: "ea_wrc_volkswagen_polo_gti_r5", gameId: "ea_wrc", categoryId: "wrc2", name: "Volkswagen Polo GTI R5", brand: "Volkswagen" },
  // Rally3 (2)
  { id: "ea_wrc_ford_fiesta_rally3_rally3", gameId: "ea_wrc", categoryId: "rally3", name: "Ford Fiesta Rally3", brand: "Ford" },
  { id: "ea_wrc_renault_clio_rally3", gameId: "ea_wrc", categoryId: "rally3", name: "Renault Clio Rally3", brand: "Renault" },
  // WRC 2012-2016 (3)
  { id: "ea_wrc_citroen_ds3_wrc_12", gameId: "ea_wrc", categoryId: "wrc_2012_2016", name: "Citroën DS3 WRC (12)", brand: "Citroën" },
  { id: "ea_wrc_mini_john_cooper_works_wrc", gameId: "ea_wrc", categoryId: "wrc_2012_2016", name: "MINI John Cooper Works WRC", brand: "Mini" },
  { id: "ea_wrc_volkswagen_polo_r_wrc_2013", gameId: "ea_wrc", categoryId: "wrc_2012_2016", name: "Volkswagen Polo R WRC 2013", brand: "Volkswagen" },
];

export const ea_wrcBaseSetups: Record<string, SetupValues> = {
  // Lancia Stratos (H3 RWD): cola muy viva; algo de toe-in trasero (0.15°) y reparto
  // de frenada algo adelantado (60%) para domarla. (Representativo; confirmar in-game.)
  ea_wrc_lancia_stratos: { toe_rear: 0.15, brake_bias: 60 },
};

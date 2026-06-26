import type { Track } from "@/lib/types";

// Etapas de rally de Assetto Corsa Rally (EA). 5 locaciones láser-escaneadas
// (Alsacia, Gales, Livigno, Monte Carlo, Grecia) con 30+ variantes en total —
// contenido del EA al día (jun 2026, verificado Traxion/RacingGames/OverTake).
// Superficies: Alsacia = asfalto; Gales y Grecia = grava; Livigno = hielo/nieve;
// Monte Carlo = asfalto con tramos mixtos de nieve/hielo. Los largos exactos por
// variante quedan fuera (el motor ajusta por superficie/rugosidad, no por largo).
export const ac_rallyTracks: Track[] = [
  {
    id: "alsace-vallee-de-munster",
    gameId: "ac_rally",
    name: "Rally Alsace - Vallée de Munster",
    country: "Francia",
    kind: "stage",
    surface: "tarmac",
    roughness: "smooth",
    notes: {
      es: "Asfalto de montaña con 6 variantes. Etapa rápida y técnica; pide setup rígido y bajo.",
      en: "Mountain tarmac with 6 variants. Fast, technical stage; calls for a stiff, low setup.",
    },
  },
  {
    id: "alsace-saverne",
    gameId: "ac_rally",
    name: "Rally Alsace - Saverne",
    country: "Francia",
    kind: "stage",
    surface: "tarmac",
    roughness: "smooth",
    notes: {
      es: "Asfalto con 4 variantes. Superficie de alto agarre: camber negativo y resortes firmes.",
      en: "Tarmac with 4 variants. High-grip surface: negative camber and firm springs.",
    },
  },
  {
    id: "wales-hafren-north",
    gameId: "ac_rally",
    name: "Rally Wales - Hafren North",
    country: "Reino Unido",
    kind: "stage",
    surface: "gravel",
    roughness: "rough",
    notes: {
      es: "Grava galesa con 6 variantes. Superficie suelta e irregular: suspensión blanda, altura alta.",
      en: "Welsh gravel with 6 variants. Loose, rough surface: soft suspension, high ride height.",
    },
  },
  {
    id: "wales-hafren-south",
    gameId: "ac_rally",
    name: "Rally Wales - Hafren South",
    country: "Reino Unido",
    kind: "stage",
    surface: "gravel",
    roughness: "rough",
    notes: {
      es: "Grava con 2 variantes. Igual que Hafren North: prioridad a la tracción sobre piso suelto.",
      en: "Gravel with 2 variants. Like Hafren North: prioritise traction on loose ground.",
    },
  },
  {
    id: "livigno-ghiacciodromo",
    gameId: "ac_rally",
    name: "Ghiacciodromo Livigno",
    country: "Italia",
    kind: "stage",
    surface: "snow",
    roughness: "medium",
    notes: {
      es: "Pista de hielo/nieve con 1 variante. Muy baja adherencia: presiones bajas, coast lock alto y mucho toe-in.",
      en: "Ice/snow track with 1 variant. Very low grip: low pressures, high coast lock and plenty of toe-in.",
    },
  },
  // Monte Carlo (EA v0.3): el juego trae estos DOS tramos por separado, no uno combinado.
  {
    id: "monte-carlo-la-bollene-col-de-turini",
    gameId: "ac_rally",
    name: "Rally Monte Carlo - La Bollène-Vésubie / Col de Turini",
    country: "Mónaco",
    kind: "stage",
    surface: "mixed",
    roughness: "medium",
    notes: {
      es: "Asfalto alpino (~18 km) con tramos mixtos de nieve/hielo en el Col de Turini. Adherencia variable: setup de compromiso.",
      en: "Alpine tarmac (~18 km) with mixed snow/ice sections over the Col de Turini. Variable grip: a compromise setup.",
    },
  },
  {
    id: "monte-carlo-sisteron",
    gameId: "ac_rally",
    name: "Rally Monte Carlo - Sisteron",
    country: "Mónaco",
    kind: "stage",
    surface: "tarmac",
    roughness: "smooth",
    notes: {
      es: "Asfalto rápido y fluido (~13 km) con curvas amplias y clima dinámico; pide un setup más bajo y rígido que Turini.",
      en: "Fast, flowing tarmac (~13 km) with wide corners and dynamic weather; wants a lower, stiffer setup than Turini.",
    },
  },
  // Rally Grecia (agregado tras 0.3, jun 2026): 2 tramos de grava, 12 variantes,
  // ~22 km láser-escaneados con 509 m de desnivel (verificado Traxion/RacingGames).
  {
    id: "greece-elatia",
    gameId: "ac_rally",
    name: "Rally Grecia - Elatia",
    country: "Grecia",
    kind: "stage",
    surface: "gravel",
    roughness: "rough",
    notes: {
      es: "Grava griega rugosa y pedregosa con calor y grandes desniveles. Pide altura alta, suspensión blanda y un setup resistente.",
      en: "Rough, rocky Greek gravel with heat and big elevation changes. Wants high ride height, soft suspension and a durable setup.",
    },
  },
  {
    id: "greece-loutraki",
    gameId: "ac_rally",
    name: "Rally Grecia - Loutraki",
    country: "Grecia",
    kind: "stage",
    surface: "gravel",
    roughness: "rough",
    notes: {
      es: "Tramo de grava suelta y rota, técnico y castigador. Prioridad a la tracción sobre piso suelto y a proteger los bajos.",
      en: "Loose, broken gravel stage, technical and punishing. Prioritise traction on loose ground and protecting the underbody.",
    },
  },
  // ── Variantes de etapa (verificadas de los assets .umap del juego, IoStore TOC) ──
  // base × {Completo/Corte} × {adelante/inverso}. Heredan superficie de su rally.
  // Munster (Vallée de Munster) — Rally Alsace (6)
  { id: "acr_munster_full_fwd", gameId: "ac_rally", name: "Munster (Vallée de Munster) — Completo (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_munster_full_rev", gameId: "ac_rally", name: "Munster (Vallée de Munster) — Completo (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_munster_cut1_fwd", gameId: "ac_rally", name: "Munster (Vallée de Munster) — Corte 1 (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_munster_cut1_rev", gameId: "ac_rally", name: "Munster (Vallée de Munster) — Corte 1 (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_munster_cut2_fwd", gameId: "ac_rally", name: "Munster (Vallée de Munster) — Corte 2 (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_munster_cut2_rev", gameId: "ac_rally", name: "Munster (Vallée de Munster) — Corte 2 (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  // Saverne — Rally Alsace (4)
  { id: "acr_saverne_full_fwd", gameId: "ac_rally", name: "Saverne — Completo (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_saverne_full_rev", gameId: "ac_rally", name: "Saverne — Completo (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_saverne_cut1_fwd", gameId: "ac_rally", name: "Saverne — Corte 1 (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_saverne_cut1_rev", gameId: "ac_rally", name: "Saverne — Corte 1 (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  // Charbonnière — Rally Alsace (4)
  { id: "acr_charbonniere_full_fwd", gameId: "ac_rally", name: "Charbonnière — Completo (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_charbonniere_full_rev", gameId: "ac_rally", name: "Charbonnière — Completo (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_charbonniere_cut1_fwd", gameId: "ac_rally", name: "Charbonnière — Corte 1 (adelante)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  { id: "acr_charbonniere_cut1_rev", gameId: "ac_rally", name: "Charbonnière — Corte 1 (inverso)", country: "Francia", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Alsace" },
  // Hafren North — Rally Wales (6)
  { id: "acr_hafren_north_full_fwd", gameId: "ac_rally", name: "Hafren North — Completo (adelante)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  { id: "acr_hafren_north_full_rev", gameId: "ac_rally", name: "Hafren North — Completo (inverso)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  { id: "acr_hafren_north_cut1_fwd", gameId: "ac_rally", name: "Hafren North — Corte 1 (adelante)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  { id: "acr_hafren_north_cut1_rev", gameId: "ac_rally", name: "Hafren North — Corte 1 (inverso)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  { id: "acr_hafren_north_cut2_fwd", gameId: "ac_rally", name: "Hafren North — Corte 2 (adelante)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  { id: "acr_hafren_north_cut2_rev", gameId: "ac_rally", name: "Hafren North — Corte 2 (inverso)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  // Hafren South — Rally Wales (2)
  { id: "acr_hafren_south_full_fwd", gameId: "ac_rally", name: "Hafren South — Completo (adelante)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  { id: "acr_hafren_south_full_rev", gameId: "ac_rally", name: "Hafren South — Completo (inverso)", country: "Reino Unido", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Wales" },
  // La Bollène-Vésubie / Col de Turini — Rally Monte Carlo (8)
  { id: "acr_bollene_full_fwd", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Completo (adelante)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_full_rev", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Completo (inverso)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_cut1_fwd", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Corte 1 (adelante)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_cut1_rev", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Corte 1 (inverso)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_cut2_fwd", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Corte 2 (adelante)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_cut2_rev", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Corte 2 (inverso)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_cut3_fwd", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Corte 3 (adelante)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  { id: "acr_bollene_cut3_rev", gameId: "ac_rally", name: "La Bollène-Vésubie / Col de Turini — Corte 3 (inverso)", country: "Mónaco", kind: "stage", surface: "mixed", roughness: "medium", region: "Rally Monte Carlo" },
  // Sisteron — Rally Monte Carlo (6)
  { id: "acr_sisteron_full_fwd", gameId: "ac_rally", name: "Sisteron — Completo (adelante)", country: "Mónaco", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Monte Carlo" },
  { id: "acr_sisteron_full_rev", gameId: "ac_rally", name: "Sisteron — Completo (inverso)", country: "Mónaco", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Monte Carlo" },
  { id: "acr_sisteron_cut1_fwd", gameId: "ac_rally", name: "Sisteron — Corte 1 (adelante)", country: "Mónaco", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Monte Carlo" },
  { id: "acr_sisteron_cut1_rev", gameId: "ac_rally", name: "Sisteron — Corte 1 (inverso)", country: "Mónaco", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Monte Carlo" },
  { id: "acr_sisteron_cut2_fwd", gameId: "ac_rally", name: "Sisteron — Corte 2 (adelante)", country: "Mónaco", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Monte Carlo" },
  { id: "acr_sisteron_cut2_rev", gameId: "ac_rally", name: "Sisteron — Corte 2 (inverso)", country: "Mónaco", kind: "stage", surface: "tarmac", roughness: "smooth", region: "Rally Monte Carlo" },
  // Elatia — Rally Grecia (6)
  { id: "acr_elatia_full_fwd", gameId: "ac_rally", name: "Elatia — Completo (adelante)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_elatia_full_rev", gameId: "ac_rally", name: "Elatia — Completo (inverso)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_elatia_cut1_fwd", gameId: "ac_rally", name: "Elatia — Corte 1 (adelante)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_elatia_cut1_rev", gameId: "ac_rally", name: "Elatia — Corte 1 (inverso)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_elatia_cut2_fwd", gameId: "ac_rally", name: "Elatia — Corte 2 (adelante)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_elatia_cut2_rev", gameId: "ac_rally", name: "Elatia — Corte 2 (inverso)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  // Loutraki — Rally Grecia (6)
  { id: "acr_loutraki_full_fwd", gameId: "ac_rally", name: "Loutraki — Completo (adelante)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_loutraki_full_rev", gameId: "ac_rally", name: "Loutraki — Completo (inverso)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_loutraki_cut1_fwd", gameId: "ac_rally", name: "Loutraki — Corte 1 (adelante)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_loutraki_cut1_rev", gameId: "ac_rally", name: "Loutraki — Corte 1 (inverso)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_loutraki_cut2_fwd", gameId: "ac_rally", name: "Loutraki — Corte 2 (adelante)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  { id: "acr_loutraki_cut2_rev", gameId: "ac_rally", name: "Loutraki — Corte 2 (inverso)", country: "Grecia", kind: "stage", surface: "gravel", roughness: "rough", region: "Rally Grecia" },
  // Ghiacciodromo Livigno — Rally Livigno (2)
  { id: "acr_livigno_full_fwd", gameId: "ac_rally", name: "Ghiacciodromo Livigno — Completo (adelante)", country: "Italia", kind: "stage", surface: "snow", roughness: "medium", region: "Rally Livigno" },
  { id: "acr_livigno_full_rev", gameId: "ac_rally", name: "Ghiacciodromo Livigno — Completo (inverso)", country: "Italia", kind: "stage", surface: "snow", roughness: "medium", region: "Rally Livigno" },
];

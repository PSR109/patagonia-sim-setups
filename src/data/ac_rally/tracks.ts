import type { Track } from "@/lib/types";

// Etapas de rally de Assetto Corsa Rally (EA). 6 locaciones láser-escaneadas
// con 20+ variantes en total. Superficies verificadas: Alsacia y Monte Carlo =
// asfalto (Monte con tramos mixtos de nieve/hielo); Gales = grava; Livigno =
// hielo/nieve. Lista parcial: faltan los largos exactos por variante.
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
];

import type { Track } from "@/lib/types";

// Circuitos de iRacing (selección verificada; lista PARCIAL: el juego tiene
// más de 150 pistas con más de 425 configuraciones). Foco en trazados de road
// racing; Daytona e Indianapolis incluyen también óvalos pero acá se cargan
// como sus configuraciones de circuito (road course).
export const iracingTracks: Track[] = [
  { id: "iracing_spa", gameId: "iracing", name: "Spa-Francorchamps", country: "Bélgica", kind: "circuit", lengthKm: 7.0, cornerProfile: "high-speed" },
  { id: "iracing_monza", gameId: "iracing", name: "Monza", country: "Italia", kind: "circuit", lengthKm: 5.79, cornerProfile: "high-speed" },
  { id: "iracing_silverstone", gameId: "iracing", name: "Silverstone", country: "Reino Unido", kind: "circuit", lengthKm: 5.89, cornerProfile: "high-speed" },
  { id: "iracing_nurburgring_nordschleife", gameId: "iracing", name: "Nürburgring Nordschleife", country: "Alemania", kind: "circuit", lengthKm: 20.83, cornerProfile: "mixed" },
  { id: "iracing_nurburgring_gp", gameId: "iracing", name: "Nürburgring GP", country: "Alemania", kind: "circuit", lengthKm: 5.15, cornerProfile: "mixed" },
  { id: "iracing_cota", gameId: "iracing", name: "Circuit of the Americas", country: "Estados Unidos", kind: "circuit", lengthKm: 5.51, cornerProfile: "mixed" },
  { id: "iracing_road_america", gameId: "iracing", name: "Road America", country: "Estados Unidos", kind: "circuit", lengthKm: 6.51, cornerProfile: "high-speed" },
  { id: "iracing_suzuka", gameId: "iracing", name: "Suzuka", country: "Japón", kind: "circuit", lengthKm: 5.81, cornerProfile: "high-speed" },
  { id: "iracing_bathurst", gameId: "iracing", name: "Mount Panorama (Bathurst)", country: "Australia", kind: "circuit", lengthKm: 6.21, cornerProfile: "mixed" },
  { id: "iracing_daytona_road", gameId: "iracing", name: "Daytona International Speedway (Road Course)", country: "Estados Unidos", kind: "circuit", lengthKm: 5.73, cornerProfile: "mixed" },
  { id: "iracing_le_mans", gameId: "iracing", name: "Le Mans (Circuit de la Sarthe)", country: "Francia", kind: "circuit", lengthKm: 13.63, cornerProfile: "high-speed" },
  { id: "iracing_indianapolis_road", gameId: "iracing", name: "Indianapolis Motor Speedway (Road Course)", country: "Estados Unidos", kind: "circuit", lengthKm: 3.93, cornerProfile: "mixed" },
  { id: "iracing_laguna_seca", gameId: "iracing", name: "WeatherTech Raceway Laguna Seca", country: "Estados Unidos", kind: "circuit", lengthKm: 3.60, cornerProfile: "mixed" },
];

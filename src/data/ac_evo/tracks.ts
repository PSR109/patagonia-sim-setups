import type { Track } from "@/lib/types";

// Circuitos de Assetto Corsa EVO (Early Access). 19 trazados = todo el contenido
// del EA al día (jun 2026, verificado RacingGames/Traxion); el roadmap suma más
// hacia la 1.0. El Nürburgring está como GP, Nordschleife y 24h (Gesamtstrecke).
// cornerProfile asignado por el carácter del trazado. Todos láser-escaneados (tarmac).
export const ac_evoTracks: Track[] = [
  { id: "ac_evo_imola", gameId: "ac_evo", name: "Imola", country: "Italia", kind: "circuit", lengthKm: 4.91, cornerProfile: "mixed" },
  { id: "ac_evo_monza", gameId: "ac_evo", name: "Monza", country: "Italia", kind: "circuit", lengthKm: 5.79, cornerProfile: "high-speed" },
  { id: "ac_evo_spa", gameId: "ac_evo", name: "Spa-Francorchamps", country: "Bélgica", kind: "circuit", lengthKm: 7.0, cornerProfile: "high-speed" },
  { id: "ac_evo_nurburgring_gp", gameId: "ac_evo", name: "Nürburgring GP", country: "Alemania", kind: "circuit", lengthKm: 5.15, cornerProfile: "mixed" },
  { id: "ac_evo_nordschleife", gameId: "ac_evo", name: "Nürburgring Nordschleife", country: "Alemania", kind: "circuit", lengthKm: 20.83, cornerProfile: "mixed" },
  { id: "ac_evo_suzuka", gameId: "ac_evo", name: "Suzuka", country: "Japón", kind: "circuit", lengthKm: 5.81, cornerProfile: "high-speed" },
  { id: "ac_evo_fuji", gameId: "ac_evo", name: "Fuji Speedway", country: "Japón", kind: "circuit", lengthKm: 4.56, cornerProfile: "mixed" },
  { id: "ac_evo_brands_hatch", gameId: "ac_evo", name: "Brands Hatch", country: "Reino Unido", kind: "circuit", lengthKm: 3.91, cornerProfile: "mixed" },
  { id: "ac_evo_donington", gameId: "ac_evo", name: "Donington Park", country: "Reino Unido", kind: "circuit", lengthKm: 4.02, cornerProfile: "mixed" },
  { id: "ac_evo_oulton_park", gameId: "ac_evo", name: "Oulton Park", country: "Reino Unido", kind: "circuit", lengthKm: 4.31, cornerProfile: "mixed" },
  { id: "ac_evo_bathurst", gameId: "ac_evo", name: "Mount Panorama (Bathurst)", country: "Australia", kind: "circuit", lengthKm: 6.21, cornerProfile: "high-speed" },
  { id: "ac_evo_cota", gameId: "ac_evo", name: "Circuit of the Americas", country: "Estados Unidos", kind: "circuit", lengthKm: 5.51, cornerProfile: "mixed" },
  { id: "ac_evo_laguna_seca", gameId: "ac_evo", name: "Laguna Seca", country: "Estados Unidos", kind: "circuit", lengthKm: 3.6, cornerProfile: "mixed" },
  { id: "ac_evo_road_atlanta", gameId: "ac_evo", name: "Road Atlanta", country: "Estados Unidos", kind: "circuit", lengthKm: 4.09, cornerProfile: "high-speed" },
  { id: "ac_evo_sebring", gameId: "ac_evo", name: "Sebring", country: "Estados Unidos", kind: "circuit", lengthKm: 6.02, cornerProfile: "mixed" },
  { id: "ac_evo_watkins_glen", gameId: "ac_evo", name: "Watkins Glen", country: "Estados Unidos", kind: "circuit", lengthKm: 5.43, cornerProfile: "high-speed" },
  { id: "ac_evo_red_bull_ring", gameId: "ac_evo", name: "Red Bull Ring", country: "Austria", kind: "circuit", lengthKm: 4.32, cornerProfile: "mixed" },
  { id: "ac_evo_paul_ricard", gameId: "ac_evo", name: "Paul Ricard", country: "Francia", kind: "circuit", lengthKm: 5.79, cornerProfile: "mixed" },
  // Gesamtstrecke (GP + Nordschleife unidos, ~25 km): trazado de resistencia. El compromiso de setup lo domina el Nordschleife.
  { id: "ac_evo_nurburgring_24h", gameId: "ac_evo", name: "Nürburgring 24h (Gesamtstrecke)", country: "Alemania", kind: "circuit", lengthKm: 25.38, cornerProfile: "high-speed" },
];

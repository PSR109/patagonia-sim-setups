import type { Track } from "@/lib/types";

// Circuitos de Le Mans Ultimate (14 verificados: 7 base + 7 DLC). Todos asfalto,
// láser-escaneados; 100% circuito (LMU no tiene rally ni superficies de tierra).
export const lmuTracks: Track[] = [
  { id: "lmu_le_mans", gameId: "lmu", name: "Circuit de la Sarthe (Le Mans)", country: "Francia", kind: "circuit", lengthKm: 13.63, cornerProfile: "high-speed" },
  { id: "lmu_spa", gameId: "lmu", name: "Spa-Francorchamps", country: "Bélgica", kind: "circuit", lengthKm: 7.0, cornerProfile: "high-speed" },
  { id: "lmu_monza", gameId: "lmu", name: "Monza", country: "Italia", kind: "circuit", lengthKm: 5.79, cornerProfile: "high-speed" },
  { id: "lmu_bahrain", gameId: "lmu", name: "Bahrain International Circuit (Sakhir)", country: "Baréin", kind: "circuit", lengthKm: 5.41, cornerProfile: "mixed" },
  { id: "lmu_fuji", gameId: "lmu", name: "Fuji International Speedway", country: "Japón", kind: "circuit", lengthKm: 4.56, cornerProfile: "mixed" },
  { id: "lmu_sebring", gameId: "lmu", name: "Sebring International Raceway", country: "Estados Unidos", kind: "circuit", lengthKm: 6.02, cornerProfile: "mixed" },
  { id: "lmu_portimao", gameId: "lmu", name: "Algarve (Portimão)", country: "Portugal", kind: "circuit", lengthKm: 4.65, cornerProfile: "mixed" },
  { id: "lmu_silverstone", gameId: "lmu", name: "Silverstone", country: "Reino Unido", kind: "circuit", lengthKm: 5.89, cornerProfile: "high-speed" },
  { id: "lmu_paul_ricard", gameId: "lmu", name: "Paul Ricard", country: "Francia", kind: "circuit", lengthKm: 5.79, cornerProfile: "mixed" },
  { id: "lmu_barcelona", gameId: "lmu", name: "Barcelona-Catalunya", country: "España", kind: "circuit", lengthKm: 4.66, cornerProfile: "mixed" },
  { id: "lmu_imola", gameId: "lmu", name: "Imola", country: "Italia", kind: "circuit", lengthKm: 4.91, cornerProfile: "mixed" },
  { id: "lmu_cota", gameId: "lmu", name: "Circuit of the Americas (COTA)", country: "Estados Unidos", kind: "circuit", lengthKm: 5.51, cornerProfile: "mixed" },
  { id: "lmu_interlagos", gameId: "lmu", name: "Interlagos (José Carlos Pace)", country: "Brasil", kind: "circuit", lengthKm: 4.31, cornerProfile: "mixed" },
  { id: "lmu_lusail", gameId: "lmu", name: "Lusail International Circuit", country: "Catar", kind: "circuit", lengthKm: 5.42, cornerProfile: "high-speed" },
];

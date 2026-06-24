import type { Track } from "@/lib/types";

// Circuitos de F1 25: 27 configuraciones = las 24 sedes del calendario 2025 más
// 3 layouts invertidos (Red Bull Ring, Silverstone y Zandvoort), primicia de la
// era EA. El cornerProfile orienta las reglas de carga aerodinámica.
export const f1_25Tracks: Track[] = [
  { id: "f1_25_bahrein", gameId: "f1_25", name: "Bahrein (Sakhir)", country: "Baréin", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_jeddah", gameId: "f1_25", name: "Yeda (Jeddah)", country: "Arabia Saudita", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_melbourne", gameId: "f1_25", name: "Melbourne (Albert Park)", country: "Australia", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_suzuka", gameId: "f1_25", name: "Suzuka", country: "Japón", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_shanghai", gameId: "f1_25", name: "Shanghái", country: "China", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_miami", gameId: "f1_25", name: "Miami", country: "Estados Unidos", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_imola", gameId: "f1_25", name: "Imola", country: "Italia", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_monaco", gameId: "f1_25", name: "Mónaco", country: "Mónaco", kind: "circuit", cornerProfile: "low-speed" },
  { id: "f1_25_montreal", gameId: "f1_25", name: "Montreal (Gilles Villeneuve)", country: "Canadá", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_barcelona", gameId: "f1_25", name: "Barcelona-Catalunya", country: "España", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_red_bull_ring", gameId: "f1_25", name: "Red Bull Ring", country: "Austria", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_red_bull_ring_reverse", gameId: "f1_25", name: "Red Bull Ring (invertido)", country: "Austria", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_silverstone", gameId: "f1_25", name: "Silverstone", country: "Reino Unido", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_silverstone_reverse", gameId: "f1_25", name: "Silverstone (invertido)", country: "Reino Unido", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_zandvoort", gameId: "f1_25", name: "Zandvoort", country: "Países Bajos", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_zandvoort_reverse", gameId: "f1_25", name: "Zandvoort (invertido)", country: "Países Bajos", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_spa", gameId: "f1_25", name: "Spa-Francorchamps", country: "Bélgica", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_hungaroring", gameId: "f1_25", name: "Hungaroring", country: "Hungría", kind: "circuit", cornerProfile: "low-speed" },
  { id: "f1_25_monza", gameId: "f1_25", name: "Monza", country: "Italia", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_baku", gameId: "f1_25", name: "Baku", country: "Azerbaiyán", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_singapur", gameId: "f1_25", name: "Singapur (Marina Bay)", country: "Singapur", kind: "circuit", cornerProfile: "low-speed" },
  { id: "f1_25_cota", gameId: "f1_25", name: "Austin (COTA)", country: "Estados Unidos", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_mexico", gameId: "f1_25", name: "Ciudad de México", country: "México", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_interlagos", gameId: "f1_25", name: "Interlagos", country: "Brasil", kind: "circuit", cornerProfile: "mixed" },
  { id: "f1_25_las_vegas", gameId: "f1_25", name: "Las Vegas", country: "Estados Unidos", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_losail", gameId: "f1_25", name: "Losail", country: "Catar", kind: "circuit", cornerProfile: "high-speed" },
  { id: "f1_25_yas_marina", gameId: "f1_25", name: "Yas Marina", country: "Abu Dabi", kind: "circuit", cornerProfile: "mixed" },
];

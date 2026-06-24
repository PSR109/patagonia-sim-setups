// Tipos del dominio. Son el contrato que comparten el catálogo de datos
// (src/data) y el motor de reglas (src/lib/engine). Cada juego implementa
// la interfaz GameData con sus autos, pistas, parámetros y reglas.

export type Locale = "es" | "en";

export interface LocalizedText {
  es: string;
  en: string;
}

export type Discipline = "circuit" | "rally";

export type Surface = "tarmac" | "gravel" | "snow" | "mixed";

// Tracción del auto. Importa porque el diferencial actúa sobre el eje motriz:
// en un FWD el LSD está en el tren DELANTERO (afecta subviraje de salida y
// torque steer), no en la cola, así que las reglas de diferencial pensadas para
// tracción trasera no aplican.
export type Drivetrain = "fwd" | "rwd" | "awd";

export interface GameMeta {
  id: string; // "acc"
  name: string; // "Assetto Corsa Competizione"
  shortName: string; // "ACC"
  developer: string;
  publisher?: string; // editora, si difiere del desarrollador
  discipline: Discipline;
  accent: string; // color de acento para la tarjeta del juego (hex)
  hasImportableSetups: boolean;
  setupFileNote?: LocalizedText;
  status?: "released" | "early-access";
}

// Override de rango/valor de un parámetro para una clase o un auto concretos.
// En muchos juegos el slider de un MISMO parámetro tiene distinto mínimo/máximo/
// paso/default según el coche o la clase: en ACC el rango de ARB, altura y ala
// varía por auto; en EA WRC los muelles y barras (en N/mm) varían por clase.
// Estos overrides permiten que el rango mostrado y el clamp sean exactos sin
// duplicar el ParameterDef completo. Solo se listan los campos que cambian.
export type ParamRangeOverride = Partial<
  Pick<ParameterDef, "min" | "max" | "step" | "default">
>;

export interface Category {
  id: string; // "gt3"
  gameId: string;
  name: string; // "GT3"
  // Overrides de rango/valor que aplican a TODOS los autos de la clase. Se usan
  // cuando un parámetro tiene rangos distintos por clase (ej. muelles en EA WRC).
  paramOverrides?: Record<string, ParamRangeOverride>; // paramId -> override
}

export interface Car {
  id: string;
  gameId: string;
  categoryId: string;
  name: string;
  brand?: string;
  year?: number;
  drivetrain?: Drivetrain; // si se omite, se trata como tracción al eje trasero/integral
  // Overrides de rango/valor específicos de ESTE auto. Ganan sobre los de la
  // clase. Se usan cuando el rango real del slider difiere coche a coche.
  paramOverrides?: Record<string, ParamRangeOverride>; // paramId -> override
}

export interface Track {
  id: string;
  gameId: string;
  name: string;
  country?: string;
  kind: "circuit" | "stage";
  lengthKm?: number;
  cornerProfile?: "low-speed" | "high-speed" | "mixed";
  surface?: Surface; // rally
  roughness?: "smooth" | "medium" | "rough"; // rally
  notes?: LocalizedText;
}

export type ParameterGroup =
  | "tyres"
  | "aero"
  | "suspension"
  | "dampers"
  | "differential"
  | "brakes"
  | "gearing"
  | "alignment"
  | "electronics"
  | "other";

export interface ParameterDef {
  id: string; // "rear_wing"
  group: ParameterGroup;
  name: LocalizedText;
  unit?: string;
  min: number;
  max: number;
  step: number;
  default: number; // valor base si el auto no define uno
  // Capa educativa: qué hace y qué pasa al subir/bajar el valor.
  whatItDoes: LocalizedText;
  increaseEffect: LocalizedText;
  decreaseEffect: LocalizedText;
}

export type SetupValues = Record<string, number>; // paramId -> valor

export type Weather = "dry" | "damp" | "wet";

export interface ConditionInput {
  weather: Weather;
  airTempC?: number;
  trackTempC?: number;
  timeOfDay?: "day" | "dusk" | "night";
  grip?: "green" | "medium" | "rubbered";
  fuelLoad?: "low" | "medium" | "high"; // proxy de duración de carrera
  surface?: Surface; // rally
  roughness?: "smooth" | "medium" | "rough"; // rally
}

export type Symptom =
  | "understeer_entry"
  | "understeer_mid"
  | "understeer_exit"
  | "oversteer_entry"
  | "oversteer_mid"
  | "oversteer_exit"
  | "braking_instability"
  | "poor_traction"
  | "tyres_overheat"
  | "tyres_cold"
  | "bouncing"
  | "kerb_instability";

export interface ParamDelta {
  paramId: string;
  delta: number; // en pasos (se multiplica por param.step al aplicar)
  // Si se setea, este ajuste NO se aplica a autos con esa tracción. Se usa para
  // que los ajustes de diferencial trasero no se apliquen a autos FWD.
  excludeDrivetrains?: Drivetrain[];
}

export interface ConditionRule {
  id: string;
  when: (c: ConditionInput) => boolean;
  adjust: ParamDelta[];
  reason: LocalizedText;
}

export interface SymptomRule {
  symptom: Symptom;
  adjust: ParamDelta[];
  reason: LocalizedText;
}

export interface Adjustment {
  paramId: string;
  from: number;
  to: number;
  reason: LocalizedText;
}

export interface SetupResult {
  values: SetupValues;
  adjustments: Adjustment[];
  notes: LocalizedText[];
}

// ── Fanatec / Force Feedback ───────────────────────────────────────────────
// El setup del auto define cómo se comporta el coche; el FFB define cuánto de
// eso siente el piloto en el volante. Las recomendaciones dependen de DOS cosas:
// lo que el juego entrega por FFB y lo que la base Fanatec es capaz de dar.

export interface FanatecBase {
  id: string; // "csl_dd"
  name: string; // "CSL DD"
  maxTorqueNm: number; // par máximo de fábrica
  boostTorqueNm?: number; // par con Boost Kit (si aplica)
  note?: LocalizedText;
}

// Parámetro del menú tuning de la base (firmware Fanatec, igual en todos los
// juegos). La capa educativa explica qué hace y qué pasa al subir/bajar.
export interface FfbTuningParam {
  id: string; // "FFB", "SEN", "NDP", "NFR", "NIN", "FEI", "FFS", "BRF"
  label: string; // sigla que se ve en la base
  name: LocalizedText;
  unit?: string;
  whatItDoes: LocalizedText;
  increaseEffect: LocalizedText;
  decreaseEffect: LocalizedText;
}

// Valor recomendado para un parámetro del menú tuning, por juego. Casi todos son
// independientes de la base; perBase permite ajustar los que sí dependen del par.
export interface FfbControlPanelRec {
  paramId: string; // refiere a FfbTuningParam.id
  value: string; // valor recomendado (string para admitir rangos y "AUTO")
  perBase?: Record<string, string>; // override por base cuando difiere
  note?: LocalizedText;
}

// Setting de FFB dentro del juego (cada sim tiene los suyos).
export interface FfbInGameSetting {
  id: string;
  name: LocalizedText;
  value: string;
  perBase?: Record<string, string>; // ej. el gain depende del par de la base
  whatItDoes: LocalizedText;
  note?: LocalizedText;
}

export interface GameFfb {
  controlPanel: FfbControlPanelRec[]; // menú tuning de la base
  inGame: FfbInGameSetting[]; // FFB dentro del juego
  notes: LocalizedText[]; // cómo interactúan + recomendaciones generales
}

export interface GameData {
  meta: GameMeta;
  categories: Category[];
  cars: Car[];
  tracks: Track[];
  parameters: ParameterDef[];
  baseSetups: Record<string, SetupValues>; // carId -> valores base (parcial ok)
  conditionRules: ConditionRule[];
  symptomRules: SymptomRule[];
  ffb?: GameFfb; // recomendaciones Fanatec + FFB del juego (opcional por ahora)
}

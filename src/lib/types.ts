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
  // Parámetros que SOLO tienen los autos de esta clase, además de los del juego.
  // Para ajustes presentes en una clase y no en otra (ej. el 3.er canal de TC
  // "Power Cut" de LMU existe en Hypercar/LMGT3/GTE pero no en los prototipos
  // LMP2/LMP3). Se muestran y explican; las reglas del juego no los tocan.
  extraParams?: ParameterDef[];
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
  // Parámetros que SOLO tiene este auto, además de los del juego. Para coches con
  // ajustes que el resto de la clase no expone (ej. el McLaren 720S GT3 Evo de ACC
  // tiene un segundo control de tracción, TC2). Se muestran y explican en la tabla,
  // pero las reglas del juego no los tocan (aparecen en su valor por defecto).
  extraParams?: ParameterDef[];
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
  // Rally/ubicación a la que pertenece una ETAPA individual (ej. "Rallye
  // Monte-Carlo"). Permite agrupar las etapas bajo su rally en el selector
  // (optgroup) y en el comparador de vueltas. Las ubicaciones-rally en sí no lo
  // llevan; solo las etapas hijas. Hereda la superficie/rugosidad de su rally.
  region?: string;
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

export type TimeOfDay = "day" | "dusk" | "night";

// ── Estilo de manejo (cómo le gusta el auto al piloto) ─────────────────────
// Tres ejes independientes que sesgan el setup hacia el gusto del piloto, además
// de las condiciones de pista. El NIVEL enmarca: cuánta ayuda/seguridad metemos
// (electrónica, freno). BALANCE: reparto de agarre frente↔cola (estable=más
// subviraje y perdona; ágil=más rotación). SUAVIDAD: qué tan reactivo quieres el
// coche en transiciones (suave=amortiguación más blanda; agresivo=más firme).
// El valor "neutral"/"intermediate" no aplica ninguna regla (setup base).
export type DriverLevel = "beginner" | "intermediate" | "pro";
export type BalancePref = "stable" | "neutral" | "agile";
export type SmoothnessPref = "smooth" | "neutral" | "aggressive";

export interface ConditionInput {
  weather: Weather;
  airTempC?: number;
  trackTempC?: number;
  timeOfDay?: TimeOfDay;
  grip?: "green" | "medium" | "rubbered";
  fuelLoad?: "low" | "medium" | "high"; // proxy de duración de carrera
  surface?: Surface; // rally
  roughness?: "smooth" | "medium" | "rough"; // rally
  // Estilo de manejo (opcional). Si faltan o están en su valor neutro, no mueven
  // nada: el setup queda en base + condiciones.
  driverLevel?: DriverLevel;
  balance?: BalancePref;
  smoothness?: SmoothnessPref;
}

// Campos de condición que un juego expone en el formulario. Permite que cada
// simulador muestre SOLO las palancas que aplican a su disciplina (ej. circuito
// pide clima/temp/agarre/combustible y, en endurance, hora del día; rally pide
// superficie/rugosidad). El motor ignora cualquier valor de un campo que el
// juego no declare.
export type ConditionFieldId =
  | "weather"
  | "trackTemp"
  | "grip"
  | "fuel"
  | "timeOfDay"
  | "surface"
  | "roughness";

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
  // Campos de condición que el formulario muestra para este juego. Si se omite,
  // la UI usa un set por defecto según la disciplina (circuito vs rally).
  conditionFields?: ConditionFieldId[];
  // Reglas por ESTILO de manejo (nivel/balance/suavidad). Mismo shape que las de
  // condiciones; el motor las aplica después de las condiciones de pista.
  styleRules?: ConditionRule[];
  ffb?: GameFfb; // recomendaciones Fanatec + FFB del juego (opcional por ahora)
}

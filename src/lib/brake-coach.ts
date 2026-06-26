import type { Car, GameData, LocalizedText, Track } from "@/lib/types";

// ── Coach de frenada: fuerza de la célula de carga (load cell) en KG ──────────
// Recomienda cuántos KILOS de fuerza en el pedal deberían equivaler al 100% de
// freno en una célula de carga Fanatec (pedales CSL/ClubSport, usados con la CSL
// DD o la ClubSport DD+). NO es un dato del juego: es ergonomía + física de
// frenado (energía de frenada, carga aerodinámica, ABS, modulación, izquierda en
// rally), así que se da como RANGO de punto de partida y se afina a gusto. Rangos
// consensuados de investigación verificada (2026-06-26): mundo real + práctica de
// la comunidad de células de carga (Heusinkveld ~120 kg fórmula; iRacers 40-65 kg;
// célula CSL cómoda hasta ~60 kg, ClubSport V3 hasta 90 kg).

export type BrakeClassKey =
  | "gt3"
  | "gt4"
  | "hypercar_lmp"
  | "formula"
  | "road_sports"
  | "touring_tcr"
  | "rally_tarmac"
  | "rally_loose";

export interface BrakeForceRec {
  classKey: BrakeClassKey;
  kgMin: number;
  kgMax: number;
  className: LocalizedText;
  rationale: LocalizedText;
}

interface BrakeClassRow {
  kgMin: number;
  kgMax: number;
  className: LocalizedText;
  rationale: LocalizedText;
}

const TABLE: Record<BrakeClassKey, BrakeClassRow> = {
  gt3: {
    kgMin: 50,
    kgMax: 70,
    className: { es: "GT3 / LMGT3 / GTE", en: "GT3 / LMGT3 / GTE" },
    rationale: {
      es: "Autos pesados de mucha carga aerodinámica con frenos fuertes y ABS. Pedal firme: la frenada en apoyo (trail braking) se modula con la fuerza del pie, no con el recorrido. Apunta a tocar el 100% solo en la frenada más dura.",
      en: "Heavy, high-downforce cars with strong brakes and ABS. A firm pedal lets you modulate trail braking with foot pressure, not travel. Aim to hit 100% only on the hardest stop.",
    },
  },
  gt4: {
    kgMin: 40,
    kgMax: 58,
    className: { es: "GT4 / Cup / Spec", en: "GT4 / Cup / Spec" },
    rationale: {
      es: "Menos carga y menor energía de frenada que un GT3, con ABS. Pedal medio-firme: fácil de modular en trail braking sin el esfuerzo de un GT3, dentro del rango cómodo de la célula CSL.",
      en: "Less downforce and braking energy than a GT3, with ABS. A medium-firm pedal is easy to modulate in trail braking without the GT3 effort, within the CSL load cell's comfortable range.",
    },
  },
  hypercar_lmp: {
    kgMin: 60,
    kgMax: 80,
    className: { es: "Hypercar / LMP (prototipos)", en: "Hypercar / LMP (prototypes)" },
    rationale: {
      es: "La mayor energía de frenada y muchísima carga aerodinámica. Se pega un golpe fuerte al inicio y se va soltando a medida que cae la carga, así que el pedal más firme da la mejor modulación a alta presión. Célula CSL: queda más cerca de 60 kg por límite del pedal.",
      en: "The highest braking energy and very high downforce. You hit hard on initial bite and bleed off as downforce falls, so the firmest pedal gives the best high-pressure modulation. On a CSL load cell you'll sit nearer 60 kg due to the pedal's ceiling.",
    },
  },
  formula: {
    kgMin: 65,
    kgMax: 85,
    className: { es: "Fórmula / monoplaza", en: "Formula / open-wheel" },
    rationale: {
      es: "Sin ABS ni servo y con efecto suelo: los picos de frenada son los más altos (hasta ~6 g; el estándar real ronda ~95 kg de pedal). La técnica es pisar casi al máximo y soltar progresivo, lo que premia el pedal más firme. Curva lineal. Con célula CSL quedarás limitado por la fuerza del pedal.",
      en: "No ABS, no servo, ground-effect downforce: the highest braking peaks (up to ~6 g; real standard is ~95 kg of pedal force). The technique is near-max stomp then progressive bleed-off, which rewards the firmest pedal. Use a linear curve. On a CSL load cell you'll be force-limited.",
    },
  },
  road_sports: {
    kgMin: 25,
    kgMax: 45,
    className: { es: "Calle / deportivo / hot hatch", en: "Road / sports / hot hatch" },
    rationale: {
      es: "Frenos con servo y ABS: en la realidad llegan al máximo con ~10-20 kg. Pedal suave a medio: acompaña la sensación asistida y la modulación progresiva, sin un muro de fuerza poco realista. Extremo alto para deportivos clásicos sin asistencia.",
      en: "Servo-assisted, ABS-equipped brakes: in reality they reach max with ~10-20 kg. A soft-to-medium pedal matches the assisted feel and progressive modulation without an unrealistic firm wall. Upper end for unassisted classic performance cars.",
    },
  },
  touring_tcr: {
    kgMin: 40,
    kgMax: 58,
    className: { es: "Turismo / TCR / vintage", en: "Touring / TCR / vintage" },
    rationale: {
      es: "Peso moderado, poca carga y ABS, con mucho uso de trail braking y freno con el pie izquierdo para rotar el auto. Pedal medio-firme para una frenada al límite repetible y modulación fina con el izquierdo.",
      en: "Moderate weight, low downforce and ABS, with heavy trail braking and left-foot braking to rotate the car. A medium-firm pedal gives repeatable threshold braking and fine left-foot modulation.",
    },
  },
  rally_tarmac: {
    kgMin: 35,
    kgMax: 52,
    className: { es: "Rally — asfalto", en: "Rally — tarmac" },
    rationale: {
      es: "El asfalto tiene más agarre que la grava pero igual pide modular constante, trail braking y freno izquierdo. Pedal medio: firme para frenar con confianza en asfalto agarrado, pero blando para los microajustes que pide el rally. Busca el bloqueo cerca del 85-90% del pedal.",
      en: "Tarmac has more grip than gravel but still demands constant modulation, trail braking and left-foot braking. A medium pedal: firm enough for confident braking on grippy asphalt, soft enough for the micro-adjustments rally needs. Aim for lock-up around 85-90% of pedal travel.",
    },
  },
  rally_loose: {
    kgMin: 25,
    kgMax: 42,
    className: { es: "Rally — grava / nieve / tierra", en: "Rally — gravel / snow / dirt" },
    rationale: {
      es: "Poco agarre: el bloqueo llega con muy poca fuerza, así que el pedal más blando maximiza la finura y la ventana de modulación para el freno izquierdo y la transferencia de peso. Demasiado firme y un toque chico se pasa a bloqueo en piso suelto.",
      en: "Low grip: lock-up arrives at very low force, so the softest pedal maximizes finesse and the modulation window for left-foot braking and weight transfer. Too firm and a small input overshoots into lock-up on the loose surface.",
    },
  },
};

// Resuelve la clase de frenada de un auto. En rally depende de la SUPERFICIE de la
// etapa (asfalto vs suelto); en circuito, de la categoría del auto.
export function resolveBrakeClass(
  game: GameData,
  car: Car,
  track?: Track,
): BrakeClassKey {
  if (game.meta.discipline === "rally") {
    const surface = track?.surface; // sin pista elegida, default suelto
    return surface === "tarmac" ? "rally_tarmac" : "rally_loose";
  }
  const cat = game.categories.find((c) => c.id === car.categoryId);
  const hay = `${car.categoryId} ${cat?.name ?? ""} ${car.name}`.toLowerCase();
  // Los autos de CALLE primero: "road_hypercar" lleva "hypercar" pero es de calle.
  if (/road|calle|street|hot.?hatch|supercar|muscle/.test(hay)) return "road_sports";
  if (/gt4/.test(hay)) return "gt4";
  if (/gt3|lmgt3|gte|gt2/.test(hay)) return "gt3";
  if (/hypercar|lmp|lmh|lmdh|prototyp|proto/.test(hay)) return "hypercar_lmp";
  if (/formula|f1|single|monoplaza|open.?wheel/.test(hay)) return "formula";
  if (/tcr|touring|turismo|vintage/.test(hay)) return "touring_tcr";
  if (/spec|cup|challenge/.test(hay)) return "gt4";
  return "gt3"; // default circuito
}

export function brakeForceRec(
  game: GameData,
  car: Car,
  track?: Track,
): BrakeForceRec {
  const classKey = resolveBrakeClass(game, car, track);
  const row = TABLE[classKey];
  return {
    classKey,
    kgMin: row.kgMin,
    kgMax: row.kgMax,
    className: row.className,
    rationale: row.rationale,
  };
}

// Nota de afinado universal (cómo ajustar la fuerza a tu gusto, sin inventar un
// número por pista no verificable).
export const brakeTuneNote: LocalizedText = {
  es: "Punto de partida en KG = fuerza para llegar al 100% de freno en tu célula de carga (BRF / software del pedal). Afínalo en pasos de ~5 kg: si BLOQUEAS seguido o llegas al 100% muy fácil, SUBE los kg; si NO llegas al 100% o te quedas largo, BÁJALOS. Apunta a tocar 90-95% en la frenada más dura y 100% solo a propósito.",
  en: "Starting KG = force to reach 100% braking on your load cell (BRF / pedal software). Tune in ~5 kg steps: if you LOCK UP often or hit 100% too easily, RAISE the kg; if you CANNOT reach 100% or run long, LOWER them. Aim to hit 90-95% on the hardest stop and 100% only deliberately.",
};

export const brakeTrackNote: LocalizedText = {
  es: "Por circuito/etapa: en pistas de frenada fuerte (Monza, Spa, Red Bull Ring) apunta al extremo ALTO del rango; en trazados fluidos, al bajo. En rally, grava suelta y nieve van al extremo bajo; el asfalto admite algo más de firmeza.",
  en: "Per track/stage: on heavy-braking circuits (Monza, Spa, Red Bull Ring) aim for the HIGH end of the range; on flowing tracks, the low end. In rally, loose gravel and snow go to the low end; tarmac allows a touch more firmness.",
};

export const brakePedalNote: LocalizedText = {
  es: "Tu hardware: la célula del CSL Pedals es cómoda hasta ~60 kg (limita ahí las clases más firmes); los ClubSport V3 llegan a 90 kg. El número es la fuerza al 100%, no el recorrido; calibra a TU pedal y a tu rig (un rig que flexa pide menos kg).",
  en: "Your hardware: the CSL Pedals load cell is comfortable to ~60 kg (cap the firmest classes there); ClubSport V3 reaches 90 kg. The number is the force at 100%, not travel; calibrate to YOUR pedal and rig (a flexy rig wants fewer kg).",
};

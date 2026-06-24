import type {
  Adjustment,
  ConditionInput,
  GameData,
  LocalizedText,
  ParamDelta,
  ParameterDef,
  ParamRangeOverride,
  SetupResult,
  SetupValues,
  Symptom,
} from "@/lib/types";

// Ajusta un valor a los límites del parámetro y lo "encaja" al paso (step).
export function clampToParam(value: number, p: ParameterDef): number {
  const clamped = Math.min(p.max, Math.max(p.min, value));
  const steps = Math.round((clamped - p.min) / p.step);
  const snapped = p.min + steps * p.step;
  return Number(snapped.toFixed(4));
}

// Fusiona un ParameterDef global con los overrides de clase y de auto (el del
// auto gana). Tras mover el rango, encaja el default dentro de [min, max] por si
// el default global quedó fuera del nuevo rango.
function mergeParam(
  p: ParameterDef,
  catOv?: ParamRangeOverride,
  carOv?: ParamRangeOverride,
): ParameterDef {
  if (!catOv && !carOv) return p;
  const merged: ParameterDef = { ...p, ...catOv, ...carOv };
  merged.default = Math.min(merged.max, Math.max(merged.min, merged.default));
  return merged;
}

// Parámetros EFECTIVOS de un auto: el ParameterDef global con los overrides de
// su clase y luego los del auto aplicados. Si no hay overrides, devuelve la
// lista global tal cual (misma referencia, sin costo). Todo el motor y la UI
// usan esto para que un mismo parámetro pueda tener distinto rango/paso/default
// según el coche o la clase.
export function effectiveParams(game: GameData, carId: string): ParameterDef[] {
  const car = game.cars.find((c) => c.id === carId);
  const catOv = car
    ? game.categories.find((c) => c.id === car.categoryId)?.paramOverrides
    : undefined;
  const carOv = car?.paramOverrides;
  const extra = car?.extraParams;
  if (!catOv && !carOv && !(extra && extra.length)) return game.parameters;
  const base =
    catOv || carOv
      ? game.parameters.map((p) => mergeParam(p, catOv?.[p.id], carOv?.[p.id]))
      : game.parameters;
  return extra && extra.length ? [...base, ...extra] : base;
}

// Parámetro efectivo único para un auto (conveniencia para validación/UI).
export function effectiveParam(
  game: GameData,
  carId: string,
  paramId: string,
): ParameterDef | undefined {
  return effectiveParams(game, carId).find((p) => p.id === paramId);
}

// Setup base de un auto: arranca de los defaults EFECTIVOS de cada parámetro y
// aplica los valores específicos del auto si existen, encajándolos al rango
// efectivo (un valor base nunca debe caer fuera del slider real del auto).
export function baseFor(game: GameData, carId: string): SetupValues {
  const params = effectiveParams(game, carId);
  const base: SetupValues = {};
  for (const p of params) base[p.id] = p.default;
  const carBase = game.baseSetups[carId];
  if (carBase) {
    const byId = new Map(params.map((p) => [p.id, p]));
    for (const [k, v] of Object.entries(carBase)) {
      const p = byId.get(k);
      base[k] = p ? clampToParam(v, p) : v;
    }
  }
  return base;
}

export interface GenerateInput {
  carId: string;
  trackId?: string;
  conditions: ConditionInput;
  symptoms: Symptom[];
}

// Corazón de la app: a partir del setup base aplica las reglas de condiciones
// y las reglas por síntoma, dejando una traza educativa de cada cambio (de qué
// valor a qué valor y por qué).
export function generateSetup(game: GameData, input: GenerateInput): SetupResult {
  const paramById = new Map(
    effectiveParams(game, input.carId).map((p) => [p.id, p]),
  );
  const values = baseFor(game, input.carId);
  const adjustments: Adjustment[] = [];
  const notes: LocalizedText[] = [];

  const carDrivetrain = game.cars.find((c) => c.id === input.carId)?.drivetrain;
  let skippedForDrivetrain = false;

  const apply = (paramId: string, deltaSteps: number, reason: LocalizedText) => {
    const p = paramById.get(paramId);
    if (!p) return;
    const before = values[paramId] ?? p.default;
    const after = clampToParam(before + deltaSteps * p.step, p);
    if (after === before) return;
    values[paramId] = after;
    adjustments.push({ paramId, from: before, to: after, reason });
  };

  // Aplica un delta salvo que esté excluido para la tracción de este auto (ej.
  // ajustes de diferencial trasero en un FWD).
  const applyDelta = (d: ParamDelta, reason: LocalizedText) => {
    if (carDrivetrain && d.excludeDrivetrains?.includes(carDrivetrain)) {
      skippedForDrivetrain = true;
      return;
    }
    apply(d.paramId, d.delta, reason);
  };

  for (const rule of game.conditionRules) {
    if (rule.when(input.conditions)) {
      for (const d of rule.adjust) applyDelta(d, rule.reason);
    }
  }

  for (const symptom of input.symptoms) {
    for (const rule of game.symptomRules) {
      if (rule.symptom === symptom) {
        for (const d of rule.adjust) applyDelta(d, rule.reason);
      }
    }
  }

  if (carDrivetrain === "fwd" && skippedForDrivetrain) {
    notes.push({
      es: "Auto de tracción delantera (FWD): omitimos los ajustes de diferencial pensados para el eje trasero. En un FWD el diferencial autoblocante está en el tren delantero (afecta el subviraje de salida y el torque steer), no la rotación de la cola. Si alguna explicación de abajo menciona el diferencial, ese ajuste NO se aplicó a tu auto.",
      en: "Front-wheel-drive car (FWD): we skip the differential tweaks meant for the rear axle. On a FWD the limited-slip diff sits on the front axle (affecting corner-exit understeer and torque steer), not rear rotation. If any explanation below mentions the differential, that adjustment was NOT applied to your car.",
    });
  }

  return { values, adjustments, notes };
}

// Resumen neto por parámetro (valor base -> valor final) para mostrar la tabla.
export function netChanges(
  game: GameData,
  carId: string,
  result: SetupResult,
): { paramId: string; base: number; final: number }[] {
  const base = baseFor(game, carId);
  return effectiveParams(game, carId)
    .map((p) => ({ paramId: p.id, base: base[p.id], final: result.values[p.id] }))
    .filter((r) => r.base !== r.final);
}

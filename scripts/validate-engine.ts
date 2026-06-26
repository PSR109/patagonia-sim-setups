// Validación de integridad del motor sobre los 7 juegos. Chequea que las reglas
// y baseSetups referencien paramIds que existen, que las categorías/autos cuadren,
// que min<=default<=max, que el FFB use ids de base válidos, y que generateSetup
// no rompa ni produzca NaN para ningún auto. Correr: npx tsx scripts/validate-engine.ts
import { implementedGames } from "@/data/registry";
import { generateSetup, baseFor, effectiveParams } from "@/lib/engine";
import { fanatecBases } from "@/data/hardware/fanatec";
import type { Symptom } from "@/lib/types";

const ALL_SYMPTOMS: Symptom[] = [
  "understeer_entry",
  "understeer_mid",
  "understeer_exit",
  "oversteer_entry",
  "oversteer_mid",
  "oversteer_exit",
  "braking_instability",
  "poor_traction",
  "tyres_overheat",
  "tyres_cold",
  "bouncing",
  "kerb_instability",
];

// Derivado del catálogo real de bases (hoy: csl_dd + clubsport_dd_plus). Así el
// validador caza cualquier key de perBase que apunte a una base que ya no existe.
const BASE_IDS = new Set(fanatecBases.map((b) => b.id));

let problems = 0;
const log = (m: string) => {
  problems++;
  console.log("  ✗ " + m);
};

for (const game of implementedGames) {
  const id = game.meta.id;
  const paramIds = new Set(game.parameters.map((p) => p.id));
  const catIds = new Set(game.categories.map((c) => c.id));

  for (const r of game.conditionRules)
    for (const a of r.adjust)
      if (!paramIds.has(a.paramId))
        log(`[${id}] conditionRule "${r.id}" → paramId inexistente "${a.paramId}"`);

  for (const r of game.symptomRules)
    for (const a of r.adjust)
      if (!paramIds.has(a.paramId))
        log(`[${id}] symptomRule "${r.symptom}" → paramId inexistente "${a.paramId}"`);

  for (const r of game.styleRules ?? [])
    for (const a of r.adjust)
      if (!paramIds.has(a.paramId))
        log(`[${id}] styleRule "${r.id}" → paramId inexistente "${a.paramId}"`);

  for (const c of game.cars)
    if (!catIds.has(c.categoryId))
      log(`[${id}] auto "${c.id}" → categoryId inexistente "${c.categoryId}"`);

  // Guarda de calibración: los parámetros tipo MAPA (entero, ≤3 posiciones, p. ej.
  // TC/ABS 1-3 de AC Rally) sólo tienen sentido con saltos de 1 click. Un |delta|≥2
  // satura el mapa (salta la posición intermedia y se clava al extremo al apilar),
  // que el clamp esconde. Caza la regresión de la auditoría de deltas (2026-06-24).
  const mapParamIds = new Set(
    game.parameters.filter((p) => p.step === 1 && p.max - p.min <= 2).map((p) => p.id),
  );
  const checkMapDeltas = (ctx: string, adjust: { paramId: string; delta: number }[]) => {
    for (const a of adjust)
      if (mapParamIds.has(a.paramId) && Math.abs(a.delta) >= 2)
        log(
          `[${id}] ${ctx} → delta ${a.delta} en param-mapa "${a.paramId}" (≤3 posiciones); usá |delta|=1`,
        );
  };
  for (const r of game.conditionRules) checkMapDeltas(`conditionRule "${r.id}"`, r.adjust);
  for (const r of game.symptomRules) checkMapDeltas(`symptomRule "${r.symptom}"`, r.adjust);
  for (const r of game.styleRules ?? []) checkMapDeltas(`styleRule "${r.id}"`, r.adjust);

  for (const p of game.parameters)
    if (!(p.min <= p.default && p.default <= p.max))
      log(`[${id}] param "${p.id}" default ${p.default} fuera de [${p.min}, ${p.max}]`);

  for (const [carId, sv] of Object.entries(game.baseSetups))
    for (const pid of Object.keys(sv))
      if (!paramIds.has(pid))
        log(`[${id}] baseSetup "${carId}" → paramId inexistente "${pid}"`);

  // Overrides de rango por clase/auto: el paramId debe existir, y tras fusionar
  // el rango efectivo debe ser coherente (min < max, min <= default <= max).
  const checkOverrides = (
    ctx: string,
    ov: Record<string, { min?: number; max?: number; step?: number; default?: number }> | undefined,
  ) => {
    if (!ov) return;
    for (const [pid, o] of Object.entries(ov)) {
      if (!paramIds.has(pid)) {
        log(`[${id}] ${ctx} → override de paramId inexistente "${pid}"`);
        continue;
      }
      if (o.step !== undefined && o.step <= 0)
        log(`[${id}] ${ctx} param "${pid}" step ${o.step} debe ser > 0`);
    }
  };
  for (const cat of game.categories) checkOverrides(`clase "${cat.id}"`, cat.paramOverrides);
  for (const car of game.cars) checkOverrides(`auto "${car.id}"`, car.paramOverrides);

  // extraParams (por clase y por auto): su id NO debe chocar con un parámetro
  // global del juego (sería ambiguo cuál gana) ni repetirse en el mismo contexto.
  const checkExtra = (ctx: string, extra: { id: string }[] | undefined) => {
    if (!extra) return;
    const seen = new Set<string>();
    for (const ep of extra) {
      if (paramIds.has(ep.id))
        log(`[${id}] ${ctx} extraParam "${ep.id}" choca con un parámetro global`);
      if (seen.has(ep.id)) log(`[${id}] ${ctx} extraParam "${ep.id}" duplicado`);
      seen.add(ep.id);
    }
  };
  for (const cat of game.categories) checkExtra(`clase "${cat.id}"`, cat.extraParams);
  for (const car of game.cars) checkExtra(`auto "${car.id}"`, car.extraParams);

  // Rango efectivo por auto: coherente y con el valor base dentro del slider real
  // del auto (validamos el valor CRUDO de baseSetups, antes del clamp del motor).
  for (const car of game.cars) {
    const eff = effectiveParams(game, car.id);
    const effById = new Map(eff.map((p) => [p.id, p]));
    for (const p of eff) {
      if (!(p.min < p.max))
        log(`[${id}] auto "${car.id}" param efectivo "${p.id}" rango inválido [${p.min}, ${p.max}]`);
      if (!(p.min <= p.default && p.default <= p.max))
        log(`[${id}] auto "${car.id}" param efectivo "${p.id}" default ${p.default} fuera de [${p.min}, ${p.max}]`);
    }
    const raw = game.baseSetups[car.id];
    if (raw)
      for (const [pid, v] of Object.entries(raw)) {
        const p = effById.get(pid);
        if (p && !(p.min <= v && v <= p.max))
          log(`[${id}] auto "${car.id}" baseSetup "${pid}" = ${v} fuera del rango efectivo [${p.min}, ${p.max}]`);
      }
  }

  if (game.ffb) {
    for (const s of game.ffb.inGame)
      if (s.perBase)
        for (const k of Object.keys(s.perBase))
          if (!BASE_IDS.has(k)) log(`[${id}] ffb inGame "${s.id}" perBase base desconocida "${k}"`);
    for (const c of game.ffb.controlPanel)
      if (c.perBase)
        for (const k of Object.keys(c.perBase))
          if (!BASE_IDS.has(k)) log(`[${id}] ffb controlPanel "${c.paramId}" perBase base desconocida "${k}"`);
  } else {
    log(`[${id}] sin datos de FFB (game.ffb undefined)`);
  }

  // Ejercitar el motor con condiciones extremas + todos los síntomas por auto.
  for (const car of game.cars) {
    try {
      baseFor(game, car.id);
      const res = generateSetup(game, {
        carId: car.id,
        conditions: {
          weather: "wet",
          trackTempC: 8,
          grip: "green",
          fuelLoad: "high",
          surface: "gravel",
          roughness: "rough",
          timeOfDay: "night",
          driverLevel: "beginner",
          balance: "agile",
          smoothness: "aggressive",
        },
        symptoms: ALL_SYMPTOMS,
      });
      for (const [pid, v] of Object.entries(res.values))
        if (typeof v !== "number" || Number.isNaN(v))
          log(`[${id}] auto "${car.id}" param "${pid}" = ${v}`);
    } catch (e) {
      log(`[${id}] auto "${car.id}" generateSetup LANZÓ: ${(e as Error).message}`);
    }
  }

  console.log(
    `• ${id}: ${game.cars.length} autos, ${game.tracks.length} pistas, ${game.parameters.length} params, FFB ${game.ffb ? "sí" : "NO"}`,
  );
}

console.log(
  problems === 0
    ? "\nVALIDACIÓN DEL MOTOR: OK (0 problemas)"
    : `\nVALIDACIÓN DEL MOTOR: ${problems} problema(s)`,
);
process.exit(problems === 0 ? 0 : 1);

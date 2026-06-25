import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES. `delta` está en pasos (se multiplica por el step del
// parámetro). Cada regla lleva su explicación educativa.
export const accConditionRules: ConditionRule[] = [
  {
    id: "wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "rear_wing", delta: 2 },
      { paramId: "tc", delta: 3 },
      { paramId: "abs", delta: 2 },
      { paramId: "tyre_pressure_front", delta: 38 },
      { paramId: "tyre_pressure_rear", delta: 38 },
    ],
    reason: {
      es: "Mojado: subimos el auto para evitar aquaplaning, sumamos ala y electrónica para estabilidad, y SUBIMOS las presiones al rango wet (~30-31 psi en caliente), que es donde el neumático de lluvia genera mejor agarre.",
      en: "Wet: raise the car to avoid aquaplaning, add wing and electronics for stability, and RAISE pressures into the wet window (~30-31 psi hot), where the wet tyre generates the most grip.",
    },
  },
  {
    id: "damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "tc", delta: 2 },
      { paramId: "abs", delta: 1 },
      { paramId: "rear_wing", delta: 1 },
      { paramId: "ride_height_front", delta: 1 },
      { paramId: "ride_height_rear", delta: 1 },
    ],
    reason: {
      es: "Húmedo: agarre intermedio. Sumamos algo de TC/ABS y ala para un margen de seguridad sin sacrificar todo el ritmo de seco.",
      en: "Damp: in-between grip. Add a little TC/ABS and wing for a safety margin without giving up all the dry pace.",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 35,
    adjust: [
      { paramId: "tyre_pressure_front", delta: -5 },
      { paramId: "tyre_pressure_rear", delta: -5 },
    ],
    reason: {
      es: "Pista caliente: la presión sube sola con el calor, así que arrancamos con presiones en frío más bajas para llegar al objetivo en caliente.",
      en: "Hot track: pressure rises on its own with heat, so we start with lower cold pressures to hit the hot target.",
    },
  },
  {
    id: "track_temp_low",
    when: (c) => c.trackTempC != null && c.trackTempC <= 18,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 5 },
      { paramId: "tyre_pressure_rear", delta: 5 },
    ],
    reason: {
      es: "Pista fría: cuesta llegar a la presión objetivo, así que arrancamos con presiones en frío más altas.",
      en: "Cold track: harder to reach target pressure, so we start with higher cold pressures.",
    },
  },
  {
    id: "grip_green",
    when: (c) => c.grip === "green",
    adjust: [
      { paramId: "tc", delta: 1 },
    ],
    reason: {
      es: "Pista verde (sin goma): hay menos agarre, sumamos un punto de TC para no patinar al acelerar.",
      en: "Green track (no rubber): less grip, add one TC step to avoid wheelspin on power.",
    },
  },
  {
    id: "fuel_high",
    when: (c) => c.fuelLoad === "high",
    adjust: [
      { paramId: "ride_height_rear", delta: 1 },
      { paramId: "tyre_pressure_rear", delta: 1 },
    ],
    reason: {
      es: "Carrera larga (mucho combustible): el peso extra hunde la cola; subimos un poco la altura trasera y la presión para compensar.",
      en: "Long race (heavy fuel): the extra weight squats the rear; raise rear height and pressure slightly to compensate.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista).
export const accSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "arb_front", delta: -1 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco la frenada para que la cola ayude a girar y ablandamos la barra delantera para dar más agarre al frente.",
      en: "Entry understeer: move brake bias slightly rearward so the rear helps rotate, and soften the front bar for more front grip.",
    },
  },
  {
    symptom: "understeer_mid",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: 1 },
      { paramId: "camber_front", delta: -2 },
    ],
    reason: {
      es: "Subviraje en el medio: pasamos balance al frente (barra delantera más blanda, trasera más dura) y agregamos caída delantera para más agarre lateral.",
      en: "Mid-corner understeer: shift balance forward (softer front bar, stiffer rear) and add front camber for more lateral grip.",
    },
  },
  {
    symptom: "understeer_exit",
    adjust: [
      { paramId: "diff_preload", delta: 2 },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: subimos la precarga del diferencial para que ambas ruedas traccionen juntas antes y el auto no se vaya de frente al acelerar, y endurecemos algo la barra trasera.",
      en: "Exit understeer: raise diff preload so both rear wheels drive together sooner and the car doesn't push wide on power, and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos la frenada para calmar la cola y sumamos convergencia trasera para más estabilidad.",
      en: "Entry oversteer: move brake bias forward to calm the rear and add rear toe-in for stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra trasera (más agarre atrás) y sumamos ala para estabilizar.",
      en: "Mid-corner oversteer: soften the rear bar (more rear grip) and add wing to stabilise.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "toe_rear", delta: 2 },
      { paramId: "diff_preload", delta: -2 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC y convergencia trasera, y bajamos la precarga del diferencial (en ACC una precarga alta tiende a soltar la cola de golpe al acelerar).",
      en: "Exit oversteer (on power): add TC and rear toe-in, and lower diff preload (in ACC high preload tends to snap the rear loose on throttle).",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "abs", delta: 1 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada y subimos un punto de ABS para que la cola no se cruce.",
      en: "Unstable braking: move brake bias forward and add one ABS step so the rear stays in line.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "tc", delta: 1 },
      { paramId: "toe_rear", delta: 1 },
    ],
    reason: {
      es: "Falta de tracción: ablandamos la barra trasera para que las ruedas copien mejor el piso, y sumamos algo de TC y convergencia trasera.",
      en: "Poor traction: soften the rear bar so the wheels follow the road better, and add some TC and rear toe-in.",
    },
  },
  {
    symptom: "tyres_overheat",
    adjust: [
      { paramId: "tyre_pressure_front", delta: -6 },
      { paramId: "tyre_pressure_rear", delta: -6 },
      { paramId: "camber_front", delta: 1 },
      { paramId: "camber_rear", delta: 1 },
    ],
    reason: {
      es: "Neumáticos sobrecalentados: bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída para repartir mejor el calor.",
      en: "Overheating tyres: lower pressures to reduce core temperature and reduce camber slightly to spread the heat.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 6 },
      { paramId: "tyre_pressure_rear", delta: 6 },
    ],
    reason: {
      es: "Neumáticos fríos: subimos presiones para que entren más rápido en temperatura.",
      en: "Cold tyres: raise pressures so they come up to temperature faster.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura para darle recorrido y que el piso no golpee el asfalto.",
      en: "The car bounces / bottoms out: raise ride height to give travel so the floor doesn't hit the track.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "ride_height_front", delta: 2 },
      { paramId: "ride_height_rear", delta: 2 },
      { paramId: "fast_bump_front", delta: -2 },
      { paramId: "fast_bump_rear", delta: -2 },
    ],
    reason: {
      es: "Inestable en los pianos: ablandamos las barras, subimos la altura y bajamos la compresión rápida de los amortiguadores para que el auto absorba el impacto del piano en vez de saltar.",
      en: "Unstable over kerbs: soften the bars, raise ride height and lower the dampers' fast bump so the car absorbs the kerb hit instead of jumping.",
    },
  },
];

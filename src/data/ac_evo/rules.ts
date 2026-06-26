import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES para AC EVO. `delta` está en pasos (se multiplica por el
// step del parámetro). Reconstruidas para el set REAL del editor (6 pestañas, sin
// caja de cambios ni diff power/coast ni amortiguación rápida): sólo referencian
// parámetros que el juego expone. AC EVO tiene clima dinámico y localizado por
// sectores y un modelo de neumáticos avanzado con guía de presión por color en el
// HUD. Cada regla lleva su explicación educativa bilingüe.
export const ac_evoConditionRules: ConditionRule[] = [
  {
    id: "wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "ride_height_front", delta: 4 },
      { paramId: "ride_height_rear", delta: 4 },
      { paramId: "rear_wing", delta: 2 },
      { paramId: "tc", delta: 3 },
      { paramId: "abs", delta: 2 },
      { paramId: "brake_bias", delta: -3 },
      { paramId: "tyre_pressure_front", delta: 6 },
      { paramId: "tyre_pressure_rear", delta: 6 },
    ],
    reason: {
      es: "Mojado: subimos el auto para evitar aquaplaning, sumamos ala y electrónica (TC/ABS) para estabilidad, atrasamos un poco la frenada y SUBIMOS presiones porque el agua enfría el neumático y baja la presión de rodaje; compensamos inflando más en frío. Usa compuesto Wet.",
      en: "Wet: raise the car to avoid aquaplaning, add wing and electronics (TC/ABS) for stability, move brake bias slightly rearward and RAISE pressures since water cools the tyre and drops running pressure; inflate higher cold to compensate. Use the Wet compound.",
    },
  },
  // AC EVO no expone un estado intermedio "húmedo/damp" (clima por presets
  // Clear/Cloudy/Rain/Heavy rain) ni un valor de TEMPERATURA DE PISTA ajustable en
  // la UI del jugador (verificado 2026-06-26). Por eso no hay reglas de damp ni de
  // temperatura de pista: el clima sólo distingue seco vs mojado.
  {
    id: "grip_green",
    when: (c) => c.grip === "green",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "tyre_pressure_front", delta: -1 },
      { paramId: "tyre_pressure_rear", delta: -1 },
    ],
    reason: {
      es: "Pista verde (sin goma): hay menos agarre. Sumamos un punto de TC para no patinar al acelerar y bajamos un toque las presiones para ganar huella.",
      en: "Green track (no rubber): less grip. Add one TC step to avoid wheelspin on power and drop pressures slightly for more contact patch.",
    },
  },
  {
    id: "fuel_high",
    when: (c) => c.fuelLoad === "high",
    adjust: [
      { paramId: "ride_height_rear", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 1 },
    ],
    reason: {
      es: "Carrera larga (mucho combustible): el peso extra del tanque lleno hunde la cola; subimos un poco la altura trasera y la presión para compensar el balance inicial.",
      en: "Long race (heavy fuel): the extra weight of a full tank squats the rear; raise rear height and pressure slightly to compensate the early balance.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista). Calibradas para AC EVO y
// limitadas al set real del editor: el único ajuste de diferencial es la PRECARGA
// (no hay power/coast), así que la rotación bajo gas/freno motor se trabaja con la
// precarga, las barras y la convergencia.
export const ac_evoSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "arb_front", delta: -1 },
      { paramId: "diff_preload", delta: -2, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco la frenada para que la cola ayude a girar, ablandamos la barra delantera para dar más agarre al frente y bajamos la precarga del diferencial para liberar rotación al levantar gas.",
      en: "Entry understeer: move brake bias slightly rearward so the rear helps rotate, soften the front bar for more front grip and lower diff preload to free off-throttle rotation.",
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
      { paramId: "diff_preload", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: bajamos la precarga del diferencial para liberar rotación al poner gas y endurecemos algo la barra trasera.",
      en: "Exit understeer: lower diff preload to free rotation on throttle and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "toe_rear", delta: 2 },
      { paramId: "diff_preload", delta: 2, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos la frenada para calmar la cola, sumamos convergencia trasera y subimos la precarga del diferencial para estabilizar bajo freno motor.",
      en: "Entry oversteer: move brake bias forward to calm the rear, add rear toe-in and raise diff preload to stabilise under engine braking.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
      { paramId: "spring_rate_rear", delta: -12 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra y el muelle traseros (más agarre atrás) y sumamos ala para estabilizar.",
      en: "Mid-corner oversteer: soften the rear bar and spring (more rear grip) and add wing to stabilise.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "toe_rear", delta: 2 },
      { paramId: "diff_preload", delta: 2, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC y convergencia trasera, y subimos la precarga del diferencial para dejar la cola más bloqueada y plantada al poner gas, de modo que no se suelte de golpe.",
      en: "Exit oversteer (on power): add TC and rear toe-in, and raise diff preload for a more locked and planted rear on throttle so it doesn't snap loose.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "abs", delta: 1 },
      { paramId: "diff_preload", delta: 2, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada, subimos un punto de ABS y aumentamos la precarga del diferencial para que la cola no se cruce bajo freno motor.",
      en: "Unstable braking: move brake bias forward, add one ABS step and raise diff preload so the rear stays in line under engine braking.",
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
      es: "Neumáticos sobrecalentados (HUD en naranja/rojo): bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída para repartir mejor el calor.",
      en: "Overheating tyres (HUD orange/red): lower pressures to reduce core temperature and reduce camber slightly to spread the heat.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 6 },
      { paramId: "tyre_pressure_rear", delta: 6 },
    ],
    reason: {
      es: "Neumáticos fríos (HUD en azul): subimos presiones para que entren más rápido en temperatura y caigan en la zona verde.",
      en: "Cold tyres (HUD blue): raise pressures so they come up to temperature faster and land in the green zone.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "bumpstop_range_front", delta: 3 },
      { paramId: "bumpstop_range_rear", delta: 3 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura para darle recorrido y abrimos el rango de los topes para que el piso no golpee el asfalto.",
      en: "The car bounces / bottoms out: raise ride height to give travel and open the bumpstop range so the floor doesn't hit the track.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "damper_slow_bump_front", delta: -2 },
      { paramId: "damper_slow_bump_rear", delta: -2 },
      { paramId: "damper_slow_rebound_front", delta: -1 },
      { paramId: "damper_slow_rebound_rear", delta: -1 },
      { paramId: "ride_height_front", delta: 2 },
      { paramId: "ride_height_rear", delta: 2 },
    ],
    reason: {
      es: "Inestable en los pianos: ablandamos las barras y la amortiguación lenta (compresión y extensión) y subimos la altura para que el auto absorba el piano en vez de saltar. (AC EVO no expone canales rápidos de amortiguador.)",
      en: "Unstable over kerbs: soften the bars and the slow damping (compression and rebound) and raise ride height so the car absorbs the kerb instead of jumping. (AC EVO doesn't expose fast damper channels.)",
    },
  },
];

// Reglas por ESTILO de manejo. BALANCE = barras + ala + precarga de diferencial;
// SUAVIDAD = compresión LENTA del amortiguador (AC EVO no expone canal rápido);
// NIVEL = electrónica + freno. Los ajustes de diferencial excluyen FWD.
export const ac_evoStyleRules: ConditionRule[] = [
  {
    id: "balance_stable",
    when: (c) => c.balance === "stable",
    adjust: [
      { paramId: "arb_front", delta: 1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
    ],
    reason: {
      es: "Balance estable: endurecemos la barra delantera y ablandamos la trasera (más agarre atrás) y sumamos ala. El auto subvira un poco más y perdona, ideal para ganar confianza.",
      en: "Stable balance: stiffen the front bar and soften the rear (more rear grip) and add wing. The car understeers a touch more and forgives, ideal to build confidence.",
    },
  },
  {
    id: "balance_agile",
    when: (c) => c.balance === "agile",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: 1 },
      { paramId: "diff_preload", delta: -1, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Balance ágil: ablandamos la barra delantera, endurecemos la trasera y bajamos la precarga del diferencial para liberar rotación. El auto entra más vivo y gira más al levantar gas.",
      en: "Agile balance: soften the front bar, stiffen the rear and lower diff preload to free rotation. The car turns in livelier and rotates more off-throttle.",
    },
  },
  {
    id: "smoothness_smooth",
    when: (c) => c.smoothness === "smooth",
    adjust: [
      { paramId: "damper_slow_bump_front", delta: -1 },
      { paramId: "damper_slow_bump_rear", delta: -1 },
    ],
    reason: {
      es: "Respuesta suave: bajamos la compresión lenta para que la carrocería se asiente con calma en apoyos y frenadas. Menos reactivo, más progresivo.",
      en: "Smooth response: lower slow bump so the body settles calmly under load and braking. Less reactive, more progressive.",
    },
  },
  {
    id: "smoothness_aggressive",
    when: (c) => c.smoothness === "aggressive",
    adjust: [
      { paramId: "damper_slow_bump_front", delta: 1 },
      { paramId: "damper_slow_bump_rear", delta: 1 },
    ],
    reason: {
      es: "Respuesta agresiva: subimos la compresión lenta para que el auto se apoye rápido y responda inmediato al volante, a cambio de un tren más nervioso.",
      en: "Aggressive response: raise slow bump so the car loads up quickly and responds instantly to steering, at the cost of a more nervous platform.",
    },
  },
  {
    id: "level_beginner",
    when: (c) => c.driverLevel === "beginner",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "abs", delta: 1 },
      { paramId: "brake_bias", delta: 1 },
    ],
    reason: {
      es: "Nivel principiante: sumamos un punto de TC y ABS y adelantamos un poco la frenada. Más red de seguridad mientras aprendés a leer el auto.",
      en: "Beginner level: add one TC and ABS step and move brake bias slightly forward. More safety net while you learn to read the car.",
    },
  },
  {
    id: "level_pro",
    when: (c) => c.driverLevel === "pro",
    adjust: [
      { paramId: "tc", delta: -1 },
      { paramId: "abs", delta: -1 },
    ],
    reason: {
      es: "Nivel pro: bajamos un punto de TC y ABS para que la electrónica intervenga menos y puedas exprimir el agarre. Exige manos finas con gas y freno.",
      en: "Pro level: lower TC and ABS by one so the electronics intervene less and you can extract more grip. Demands fine throttle and brake control.",
    },
  },
];

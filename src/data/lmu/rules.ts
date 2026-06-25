import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES para Le Mans Ultimate. `delta` está en pasos (se
// multiplica por el step del parámetro). Reconstruidas contra el set REAL del
// editor (capturas Hypercar Alpine A424 + LMGT3 McLaren 720S, Bahrain). LMU tiene
// clima dinámico y ciclo día/noche, así que estas reglas reflejan la gestión
// típica de endurance. Algunos ajustes son específicos de clase (ABS solo LMGT3;
// regen/diff_power solo Hypercar): el motor los aplica SOLO si el auto los tiene
// (apply() ignora un paramId ausente), así que una misma regla sirve para ambas
// clases sin romper nada.
export const lmuConditionRules: ConditionRule[] = [
  {
    id: "wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "ride_height_front", delta: 4 },
      { paramId: "ride_height_rear", delta: 4 },
      { paramId: "rear_wing", delta: 2 },
      { paramId: "tc", delta: 3 },
      { paramId: "brake_bias", delta: -3 },
      { paramId: "tyre_pressure_front", delta: -5 },
      { paramId: "tyre_pressure_rear", delta: -5 },
    ],
    reason: {
      es: "Mojado: subimos el auto para evitar aquaplaning, agregamos ala y TC para estabilidad, atrasamos un poco la frenada para no bloquear y bajamos presiones (necesitas compuesto Wet). En LMU el secado es dinámico, así que reevalúa al avanzar la sesión. En LMGT3 conviene además subir el ABS un par de puntos.",
      en: "Wet: raise the car to avoid aquaplaning, add wing and TC for stability, move brake bias slightly rearward to avoid locking, and lower pressures (you need the Wet compound). In LMU drying is dynamic, so reassess as the session goes on. On LMGT3 it's also worth raising ABS a couple of steps.",
    },
  },
  {
    id: "damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "tc", delta: 2 },
      { paramId: "rear_wing", delta: 1 },
      { paramId: "ride_height_front", delta: 1 },
      { paramId: "ride_height_rear", delta: 1 },
    ],
    reason: {
      es: "Húmedo: agarre intermedio en transición hacia seco. Sumamos algo de TC y ala para un margen de seguridad sin sacrificar todo el ritmo de seco. (En LMGT3 puedes sumar un punto de ABS.)",
      en: "Damp: in-between grip in the transition toward dry. Add a little TC and wing for a safety margin without giving up all the dry pace. (On LMGT3 you can add one ABS step.)",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 35,
    adjust: [
      { paramId: "tyre_pressure_front", delta: -5 },
      { paramId: "tyre_pressure_rear", delta: -5 },
      { paramId: "brake_duct_front", delta: -1 },
      { paramId: "brake_duct_rear", delta: -1 },
    ],
    reason: {
      es: "Pista caliente: la presión sube sola con el calor, así que arrancamos con presiones en frío más bajas para llegar al objetivo en caliente, y abrimos los ductos (menos obturación) para mantener los frenos consistentes.",
      en: "Hot track: pressure rises on its own with heat, so we start with lower cold pressures to hit the hot target, and open the ducts (less blanking) to keep the brakes consistent.",
    },
  },
  {
    id: "track_temp_low",
    when: (c) => c.trackTempC != null && c.trackTempC <= 18,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 5 },
      { paramId: "tyre_pressure_rear", delta: 5 },
      { paramId: "brake_duct_front", delta: 1 },
      { paramId: "brake_duct_rear", delta: 1 },
    ],
    reason: {
      es: "Pista fría (típico en stints nocturnos): cuesta llegar a la presión y temperatura objetivo, así que arrancamos con presiones más altas y cerramos un poco los ductos para retener calor de freno.",
      en: "Cold track (typical in night stints): harder to reach target pressure and temperature, so we start with higher pressures and close the ducts a touch to retain brake heat.",
    },
  },
  {
    id: "grip_green",
    when: (c) => c.grip === "green",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "tc_slip", delta: -1 },
    ],
    reason: {
      es: "Pista verde (sin goma): hay menos agarre, sumamos un punto de TC y bajamos el ángulo de patinaje (Slip Angle) para que el TC intervenga antes y no nos vayamos de cola al acelerar.",
      en: "Green track (no rubber): less grip, add one TC step and lower the Slip Angle so TC intervenes sooner and the rear doesn't step out on power.",
    },
  },
  {
    id: "fuel_high",
    when: (c) => c.fuelLoad === "high",
    adjust: [
      { paramId: "fuel", delta: 30 },
      { paramId: "ride_height_rear", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 1 },
      { paramId: "spring_rate_rear", delta: 1 },
    ],
    reason: {
      es: "Stint largo (mucho combustible): el peso extra hunde la cola y carga la plataforma; subimos la altura y la presión trasera y endurecemos un poco el muelle trasero para proteger el piso hasta que se queme el combustible.",
      en: "Long stint (heavy fuel): the extra weight squats the rear and loads the platform; raise rear height and pressure and stiffen the rear spring a touch to protect the floor until the fuel burns off.",
    },
  },
  {
    id: "night",
    when: (c) => c.timeOfDay === "night",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 5 },
      { paramId: "tyre_pressure_rear", delta: 5 },
      { paramId: "brake_duct_front", delta: 1 },
      { paramId: "brake_duct_rear", delta: 1 },
    ],
    reason: {
      es: "Noche (stint nocturno de endurance): la pista se enfría; subimos presiones en frío para alcanzar la ventana y cerramos un poco los ductos para retener calor de freno y de neumático.",
      en: "Night (endurance night stint): the track cools; raise cold pressures to reach the window and close the ducts a touch to retain brake and tyre heat.",
    },
  },
  {
    id: "dusk",
    when: (c) => c.timeOfDay === "dusk",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 2 },
    ],
    reason: {
      es: "Atardecer: la temperatura cae de a poco; subimos algo las presiones en frío para acompañar la pista que se enfría hacia la noche.",
      en: "Dusk: temperature drops gradually; raise cold pressures slightly to follow the track cooling toward night.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista). Cubren los 12 valores
// del contrato Symptom. Solo el diferencial de PRECARGA es universal; el bloqueo
// en aceleración (diff_power) existe únicamente en Hypercar, así que las reglas
// que lo tocan hacen no-op en LMGT3 (y al revés con ABS). Los amortiguadores
// están divididos en lenta/rápida por eje, igual que en el editor real.
export const lmuSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "arb_front", delta: -1 },
      { paramId: "diff_preload", delta: -2 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco la frenada y bajamos la precarga del diferencial para que la cola ayude a girar, y ablandamos la barra delantera para dar más agarre al frente.",
      en: "Entry understeer: move brake bias slightly rearward and lower diff preload so the rear helps rotate, and soften the front bar for more front grip.",
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
      { paramId: "diff_preload", delta: -2 },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: bajamos la precarga del diferencial para liberar rotación al poner gas y endurecemos algo la barra trasera. En Hypercar también puedes bajar el bloqueo en aceleración (Power) un par de puntos.",
      en: "Exit understeer: lower diff preload to free rotation on throttle and stiffen the rear bar a touch. On Hypercar you can also lower the power lock a couple of points.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "diff_preload", delta: 2 },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos la frenada y subimos la precarga del diferencial para calmar la cola al levantar gas, y sumamos convergencia trasera para más estabilidad.",
      en: "Entry oversteer: move brake bias forward and raise diff preload to calm the rear off-throttle, and add rear toe-in for stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
      { paramId: "spring_rate_rear", delta: -2 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra y el muelle traseros (más agarre atrás) y sumamos ala para estabilizar la cola en apoyo.",
      en: "Mid-corner oversteer: soften the rear bar and spring (more rear grip) and add wing to stabilise the rear while loaded.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC y convergencia trasera para que la cola no se suelte al poner gas. En Hypercar también ayuda subir el bloqueo en aceleración (Power) para repartir mejor el par.",
      en: "Exit oversteer (on power): add TC and rear toe-in so the rear doesn't snap on throttle. On Hypercar it also helps to raise the power lock to split torque better.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "brake_migration", delta: 1 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada y subimos la migración de freno para sumar bias delantero al pisar fuerte, así la cola no se cruza. En LMGT3 sumá además un punto de ABS.",
      en: "Unstable braking: move brake bias forward and raise brake migration to add front bias under heavy pedal so the rear stays in line. On LMGT3, also add one ABS step.",
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
      es: "Falta de tracción: ablandamos la barra trasera para que las ruedas copien mejor el piso y sumamos TC y convergencia trasera. En Hypercar también puedes bajar un poco el bloqueo en aceleración (Power).",
      en: "Poor traction: soften the rear bar so the wheels follow the road better and add some TC and rear toe-in. On Hypercar you can also ease the power lock a bit.",
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
      es: "Neumáticos sobrecalentados: bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída para repartir mejor el calor en stints largos.",
      en: "Overheating tyres: lower pressures to reduce core temperature and reduce camber slightly to spread the heat over long stints.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 6 },
      { paramId: "tyre_pressure_rear", delta: 6 },
    ],
    reason: {
      es: "Neumáticos fríos (típico en out-laps y stints nocturnos): subimos presiones para que entren más rápido en su ventana de temperatura.",
      en: "Cold tyres (typical on out-laps and night stints): raise pressures so they reach their temperature window faster.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "bumpstop_front", delta: 2 },
      { paramId: "bumpstop_rear", delta: 2 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura y agregamos packer (tope) para limitar el recorrido, clave en Hypercar por la sensibilidad aero del piso.",
      en: "The car bounces / bottoms out: raise ride height and add packer (bumpstop) to limit travel, key on Hypercar due to the floor's aero sensitivity.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "damper_fast_bump_front", delta: -2 },
      { paramId: "damper_fast_bump_rear", delta: -2 },
      { paramId: "ride_height_front", delta: 2 },
    ],
    reason: {
      es: "Inestable en los pianos: ablandamos las barras, bajamos la compresión RÁPIDA de los amortiguadores (la que actúa sobre pianos y baches bruscos) y subimos algo la altura para que el auto absorba el piano en vez de saltar.",
      en: "Unstable over kerbs: soften the bars, lower the FAST damper compression (the channel that acts on kerbs and sharp bumps) and raise ride height a touch so the car absorbs the kerb instead of jumping.",
    },
  },
];

// Reglas por ESTILO de manejo. BALANCE = barras + ala + precarga de diferencial;
// SUAVIDAD = compresión rápida del amortiguador; NIVEL = electrónica + freno.
// (El ABS solo existe en LMGT3: apply() lo ignora en los prototipos.)
export const lmuStyleRules: ConditionRule[] = [
  {
    id: "balance_stable",
    when: (c) => c.balance === "stable",
    adjust: [
      { paramId: "arb_front", delta: 1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
    ],
    reason: {
      es: "Balance estable: endurecemos la barra delantera y ablandamos la trasera (más agarre atrás) y sumamos ala. El prototipo queda plantado y perdona, clave en stints largos.",
      en: "Stable balance: stiffen the front bar and soften the rear (more rear grip) and add wing. The car stays planted and forgiving, key over long stints.",
    },
  },
  {
    id: "balance_agile",
    when: (c) => c.balance === "agile",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: 1 },
      { paramId: "diff_preload", delta: -1 },
    ],
    reason: {
      es: "Balance ágil: ablandamos la barra delantera, endurecemos la trasera y bajamos la precarga del diferencial para liberar rotación. Más vivo de entrada y en medio de curva.",
      en: "Agile balance: soften the front bar, stiffen the rear and lower diff preload to free rotation. Livelier on entry and mid-corner.",
    },
  },
  {
    id: "smoothness_smooth",
    when: (c) => c.smoothness === "smooth",
    adjust: [
      { paramId: "damper_fast_bump_front", delta: -1 },
      { paramId: "damper_fast_bump_rear", delta: -1 },
    ],
    reason: {
      es: "Respuesta suave: bajamos la compresión rápida para que el auto absorba pianos y baches con calma. Más estable en transiciones, más fácil de mantener.",
      en: "Smooth response: lower fast bump so the car absorbs kerbs and bumps calmly. More stable in transitions, easier to hold.",
    },
  },
  {
    id: "smoothness_aggressive",
    when: (c) => c.smoothness === "aggressive",
    adjust: [
      { paramId: "damper_fast_bump_front", delta: 1 },
      { paramId: "damper_fast_bump_rear", delta: 1 },
    ],
    reason: {
      es: "Respuesta agresiva: subimos la compresión rápida para una plataforma firme y reactiva que responde inmediato, a cambio de menos perdón sobre pianos.",
      en: "Aggressive response: raise fast bump for a firm, reactive platform that responds instantly, at the cost of less forgiveness over kerbs.",
    },
  },
  {
    id: "level_beginner",
    when: (c) => c.driverLevel === "beginner",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "brake_bias", delta: 1 },
    ],
    reason: {
      es: "Nivel principiante: sumamos un punto de TC y adelantamos un poco la frenada. Más margen para que el auto no se vaya de cola mientras aprendés a manejarlo (en LMGT3 conviene subir también el ABS a mano).",
      en: "Beginner level: add one TC step and move brake bias slightly forward. More margin so the rear doesn't step out while you learn the car (on LMGT3 it's worth raising ABS by hand too).",
    },
  },
  {
    id: "level_pro",
    when: (c) => c.driverLevel === "pro",
    adjust: [
      { paramId: "tc", delta: -1 },
    ],
    reason: {
      es: "Nivel pro: bajamos un punto de TC para que la electrónica intervenga menos y puedas sacarle todo el agarre al tren trasero. Exige gas progresivo.",
      en: "Pro level: lower TC by one so the electronics intervene less and you can extract all the rear grip. Demands progressive throttle.",
    },
  },
];

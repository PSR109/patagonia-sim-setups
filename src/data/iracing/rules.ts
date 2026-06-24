import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES. `delta` está en pasos (se multiplica por el step del
// parámetro). iRacing usa el clima dinámico Tempest (lluvia, charcos, spray,
// aquaplaning, línea seca/mojada). Cada regla lleva su explicación educativa.
export const iracingConditionRules: ConditionRule[] = [
  {
    id: "wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "rear_wing", delta: 2 },
      { paramId: "front_splitter", delta: 1 },
      { paramId: "tc", delta: 3 },
      { paramId: "abs", delta: 3 },
      { paramId: "tyre_pressure_front", delta: -5 },
      { paramId: "tyre_pressure_rear", delta: -5 },
      { paramId: "brake_bias", delta: -5 },
    ],
    reason: {
      es: "Mojado (Tempest): subimos el auto para evitar aquaplaning sobre los charcos, agregamos ala y carga delantera y subimos TC/ABS para estabilidad. Bajamos presiones porque el agua enfría la goma, y atrasamos algo el reparto de frenada para no bloquear las delanteras.",
      en: "Wet (Tempest): raise the car to avoid aquaplaning over puddles, add wing and front load and raise TC/ABS for stability. Lower pressures since water cools the tyre, and move brake bias slightly rearward to avoid locking the fronts.",
    },
  },
  {
    id: "damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "tc", delta: 2 },
      { paramId: "abs", delta: 2 },
      { paramId: "rear_wing", delta: 1 },
      { paramId: "ride_height_front", delta: 1 },
      { paramId: "ride_height_rear", delta: 1 },
    ],
    reason: {
      es: "Húmedo: agarre intermedio (línea seca/mojada). Sumamos algo de TC/ABS y ala para un margen de seguridad sin sacrificar todo el ritmo de seco.",
      en: "Damp: in-between grip (dry/wet line). Add a little TC/ABS and wing for a safety margin without giving up all the dry pace.",
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
      es: "Pista caliente: la presión sube sola con el calor, así que arrancamos con presiones en frío más bajas para llegar al objetivo en caliente y no salirnos de la ventana térmica.",
      en: "Hot track: pressure rises on its own with heat, so we start with lower cold pressures to hit the hot target and stay in the thermal window.",
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
      es: "Pista fría: cuesta llegar a la presión y temperatura objetivo, así que arrancamos con presiones en frío más altas.",
      en: "Cold track: harder to reach target pressure and temperature, so we start with higher cold pressures.",
    },
  },
  {
    id: "grip_green",
    when: (c) => c.grip === "green",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "abs", delta: 1 },
    ],
    reason: {
      es: "Pista verde (sin goma): hay menos agarre, sumamos un punto de TC para no patinar al acelerar y uno de ABS para no bloquear al frenar.",
      en: "Green track (no rubber): less grip, add one TC step to avoid wheelspin and one ABS step to avoid locking under braking.",
    },
  },
  {
    id: "fuel_high",
    when: (c) => c.fuelLoad === "high",
    adjust: [
      { paramId: "fuel_level", delta: 40 },
      { paramId: "ride_height_rear", delta: 1 },
      { paramId: "tyre_pressure_rear", delta: -2 },
    ],
    reason: {
      es: "Carrera larga (mucho combustible): cargamos más litros y el peso extra hunde la cola, así que subimos un poco la altura trasera. Con más peso la goma genera más calor y la presión sube más durante el stint, por eso arrancamos con presión trasera en frío más baja para no pasarnos del objetivo en caliente.",
      en: "Long race (heavy fuel): load more litres and the extra weight squats the rear, so we raise rear ride height a little. With more weight the tyre builds more heat and pressure rises more during the stint, so we start with lower cold rear pressure to avoid overshooting the hot target.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista).
export const iracingSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "arb_front", delta: -2 },
      { paramId: "diff_coast_ramp", delta: 1, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco la frenada para que la cola ayude a girar, ablandamos la barra delantera para dar más agarre al frente y abrimos la rampa de coast para liberar rotación al soltar gas.",
      en: "Entry understeer: move brake bias slightly rearward so the rear helps rotate, soften the front bar for more front grip and open the coast ramp to free rotation off-throttle.",
    },
  },
  {
    symptom: "understeer_mid",
    adjust: [
      { paramId: "arb_front", delta: -2 },
      { paramId: "arb_rear", delta: 1 },
      { paramId: "camber_front", delta: -2 },
      { paramId: "front_splitter", delta: 1 },
    ],
    reason: {
      es: "Subviraje en el medio: pasamos balance al frente (barra delantera más blanda, trasera más dura), agregamos caída delantera para más agarre lateral y algo de carga delantera.",
      en: "Mid-corner understeer: shift balance forward (softer front bar, stiffer rear), add front camber for more lateral grip and a touch of front downforce.",
    },
  },
  {
    symptom: "understeer_exit",
    adjust: [
      { paramId: "diff_drive_ramp", delta: 1, excludeDrivetrains: ["fwd"] },
      { paramId: "diff_preload", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: abrimos la rampa de drive y bajamos la precarga para que el diferencial bloquee menos al acelerar (más rotación a la salida) y endurecemos algo la barra trasera.",
      en: "Exit understeer: open the drive ramp and lower preload so the diff locks less on power (more exit rotation) and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "toe_rear", delta: 2 },
      { paramId: "diff_coast_ramp", delta: -1, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos la frenada para calmar la cola, sumamos convergencia trasera para estabilidad y cerramos la rampa de coast para que el diferencial bloquee más al soltar gas.",
      en: "Entry oversteer: move brake bias forward to calm the rear, add rear toe-in for stability and close the coast ramp so the diff locks more off-throttle.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
      { paramId: "spring_rate_rear", delta: -1 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra y el resorte traseros (más agarre mecánico atrás) y sumamos ala para estabilizar.",
      en: "Mid-corner oversteer: soften the rear bar and spring (more rear mechanical grip) and add wing to stabilise.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "toe_rear", delta: 2 },
      { paramId: "diff_drive_ramp", delta: -1, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC y convergencia trasera, y cerramos la rampa de drive para que el diferencial bloquee más y la cola no se suelte al poner gas.",
      en: "Exit oversteer (on power): add TC and rear toe-in, and close the drive ramp so the diff locks more and the rear doesn't snap on throttle.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "abs", delta: 1 },
      { paramId: "rebound_front", delta: 1 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada, subimos un punto de ABS y agregamos algo de rebound delantero para que la cola no se cruce.",
      en: "Unstable braking: move brake bias forward, add one ABS step and add some front rebound so the rear stays in line.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "tc", delta: 1 },
      { paramId: "diff_drive_ramp", delta: -1, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 1 },
    ],
    reason: {
      es: "Falta de tracción: ablandamos la barra trasera para que las ruedas copien mejor el piso, sumamos TC, cerramos la rampa de drive (más bloqueo a la salida) y algo de convergencia trasera.",
      en: "Poor traction: soften the rear bar so the wheels follow the road better, add TC, close the drive ramp (more locking on exit) and some rear toe-in.",
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
      es: "Neumáticos sobrecalentados: bajamos presiones para reducir la temperatura del centro de la banda y reducimos un poco la caída para repartir mejor el calor a lo ancho.",
      en: "Overheating tyres: lower pressures to reduce centre-tread temperature and reduce camber slightly to spread the heat across the width.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 6 },
      { paramId: "tyre_pressure_rear", delta: 6 },
    ],
    reason: {
      es: "Neumáticos fríos: subimos presiones para que entren más rápido en temperatura y lleguen a la ventana óptima.",
      en: "Cold tyres: raise pressures so they come up to temperature faster and reach the optimal window.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "bump_front", delta: -1 },
      { paramId: "bump_rear", delta: -1 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura para darle recorrido y ablandamos la compresión para que el piso no golpee el asfalto.",
      en: "The car bounces / bottoms out: raise ride height to give travel and soften compression so the floor doesn't hit the track.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -2 },
      { paramId: "arb_rear", delta: -2 },
      { paramId: "bump_front", delta: -1 },
      { paramId: "bump_rear", delta: -1 },
      { paramId: "ride_height_front", delta: 2 },
      { paramId: "ride_height_rear", delta: 2 },
    ],
    reason: {
      es: "Inestable en los pianos: ablandamos las barras y la compresión y subimos la altura para que el auto absorba el piano en vez de saltar.",
      en: "Unstable over kerbs: soften the bars and compression and raise ride height so the car absorbs the kerb instead of jumping.",
    },
  },
];

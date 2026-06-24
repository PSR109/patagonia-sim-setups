import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES. `delta` está en pasos (se multiplica por el step del
// parámetro). LMU tiene clima dinámico y ciclo día/noche; estas reglas reflejan
// la gestión típica de endurance (clima, temperatura, grip y carga de combustible).
export const lmuConditionRules: ConditionRule[] = [
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
      { paramId: "tyre_pressure_front", delta: -5 },
      { paramId: "tyre_pressure_rear", delta: -5 },
    ],
    reason: {
      es: "Mojado: subimos el auto para evitar aquaplaning, agregamos ala y electrónica para estabilidad, atrasamos un poco la frenada para no bloquear y bajamos presiones (necesitás compuesto Wet). En LMU el secado de pista es dinámico, así que reevaluá al avanzar la sesión.",
      en: "Wet: raise the car to avoid aquaplaning, add wing and electronics for stability, move brake bias slightly rearward to avoid locking, and lower pressures (you need the Wet compound). In LMU the track dries dynamically, so reassess as the session goes on.",
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
      es: "Húmedo: agarre intermedio en transición hacia seco. Sumamos algo de TC/ABS y ala para un margen de seguridad sin sacrificar todo el ritmo de seco.",
      en: "Damp: in-between grip in the transition toward dry. Add a little TC/ABS and wing for a safety margin without giving up all the dry pace.",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 35,
    adjust: [
      { paramId: "tyre_pressure_front", delta: -5 },
      { paramId: "tyre_pressure_rear", delta: -5 },
      { paramId: "brake_ducts", delta: 1 },
    ],
    reason: {
      es: "Pista caliente: la presión sube sola con el calor, así que arrancamos con presiones en frío más bajas para llegar al objetivo en caliente, y abrimos un poco los ductos para mantener los frenos consistentes.",
      en: "Hot track: pressure rises on its own with heat, so we start with lower cold pressures to hit the hot target, and open the ducts a touch to keep the brakes consistent.",
    },
  },
  {
    id: "track_temp_low",
    when: (c) => c.trackTempC != null && c.trackTempC <= 18,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 5 },
      { paramId: "tyre_pressure_rear", delta: 5 },
      { paramId: "brake_ducts", delta: -1 },
    ],
    reason: {
      es: "Pista fría (típico en stints nocturnos): cuesta llegar a la presión y temperatura objetivo, así que arrancamos con presiones más altas y cerramos ductos para retener calor de freno.",
      en: "Cold track (typical in night stints): harder to reach target pressure and temperature, so we start with higher pressures and close the ducts to retain brake heat.",
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
      es: "Pista verde (sin goma): hay menos agarre, sumamos un punto de TC y bajamos el umbral de patinaje para no irnos de cola al acelerar.",
      en: "Green track (no rubber): less grip, add one TC step and lower the slip threshold to avoid the rear stepping out on power.",
    },
  },
  {
    id: "fuel_high",
    when: (c) => c.fuelLoad === "high",
    adjust: [
      { paramId: "fuel_level", delta: 30 },
      { paramId: "ride_height_rear", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 1 },
      { paramId: "spring_rear", delta: 2 },
    ],
    reason: {
      es: "Stint largo (mucho combustible): el peso extra hunde la cola y carga la plataforma; subimos la altura y la presión trasera y endurecemos un poco el resorte trasero para proteger el piso hasta que se queme el combustible.",
      en: "Long stint (heavy fuel): the extra weight squats the rear and loads the platform; raise rear height and pressure and stiffen the rear spring a touch to protect the floor until the fuel burns off.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista). Cubren los 12 valores
// del contrato Symptom. Usan los paramId definidos en parameters.ts.
export const lmuSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "diff_coast", delta: -2 },
      { paramId: "arb_front", delta: -1 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco la frenada y bajamos el bloqueo en retención para que la cola ayude a girar, y ablandamos la barra delantera para dar más agarre al frente.",
      en: "Entry understeer: move brake bias slightly rearward and lower coast lock so the rear helps rotate, and soften the front bar for more front grip.",
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
      { paramId: "diff_power", delta: -2 },
      { paramId: "diff_preload", delta: -2 },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: bajamos el bloqueo en aceleración y la precarga del diferencial para liberar rotación al poner gas, y endurecemos algo la barra trasera.",
      en: "Exit understeer: lower the power lock and diff preload to free rotation on throttle, and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "diff_coast", delta: 2 },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos la frenada y subimos el bloqueo en retención para calmar la cola al levantar gas, y sumamos convergencia trasera para más estabilidad.",
      en: "Entry oversteer: move brake bias forward and raise coast lock to calm the rear off-throttle, and add rear toe-in for stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "rear_wing", delta: 1 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra trasera (más agarre atrás) y sumamos ala para estabilizar la cola en apoyo.",
      en: "Mid-corner oversteer: soften the rear bar (more rear grip) and add wing to stabilise the rear while loaded.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "diff_power", delta: 2 },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC, subimos el bloqueo en aceleración para repartir mejor el par y agregamos convergencia trasera para que la cola no se suelte al poner gas.",
      en: "Exit oversteer (on power): add TC, raise the power lock to split torque better and add rear toe-in so the rear doesn't snap on throttle.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "abs", delta: 1 },
      { paramId: "brake_migration", delta: 1 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada, subimos un punto de ABS y subimos la migración de freno (en Hypercar) para sumar bias delantero al pisar fuerte, así la cola no se cruza.",
      en: "Unstable braking: move brake bias forward, add one ABS step and raise brake migration (on Hypercar) to add front bias under heavy pedal so the rear stays in line.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "diff_power", delta: -1 },
      { paramId: "tc", delta: 1 },
      { paramId: "toe_rear", delta: 1 },
    ],
    reason: {
      es: "Falta de tracción: ablandamos la barra trasera para que las ruedas copien mejor el piso, bajamos algo el bloqueo en aceleración y sumamos TC y convergencia trasera.",
      en: "Poor traction: soften the rear bar so the wheels follow the road better, ease the power lock a bit, and add some TC and rear toe-in.",
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
      es: "Neumáticos fríos (típico en out-laps y stints nocturnos): subimos presiones para que entren más rápido en su ventana de temperatura (~85-95 °C).",
      en: "Cold tyres (typical on out-laps and night stints): raise pressures so they reach their temperature window faster (~85-95 °C).",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "packers", delta: 2 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura y agregamos packer para darle un tope al recorrido, clave en Hypercar por la sensibilidad aero del piso.",
      en: "The car bounces / bottoms out: raise ride height and add packer to limit travel, key on Hypercar due to the floor's aero sensitivity.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "bump", delta: -2 },
      { paramId: "ride_height_front", delta: 2 },
    ],
    reason: {
      es: "Inestable en los pianos: ablandamos las barras, bajamos la compresión de los amortiguadores y subimos algo la altura para que el auto absorba el piano en vez de saltar.",
      en: "Unstable over kerbs: soften the bars, lower damper compression and raise ride height a touch so the car absorbs the kerb instead of jumping.",
    },
  },
];

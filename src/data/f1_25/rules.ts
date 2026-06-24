import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES para F1 25. `delta` está en pasos (se multiplica por el
// step del parámetro). Cada regla lleva su explicación educativa. En F1 25 el
// mojado es dinámico (charcos, línea seca emergente): se prioriza estabilidad y
// menos riesgo de bloqueo/patinaje, y se baja la presión de neumáticos para ganar
// huella de contacto y reducir el riesgo de aquaplaning.
export const f1_25ConditionRules: ConditionRule[] = [
  {
    id: "wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "front_wing", delta: 4 },
      { paramId: "rear_wing", delta: 5 },
      { paramId: "diff_on_throttle", delta: -8 },
      { paramId: "diff_off_throttle", delta: 3 },
      { paramId: "front_suspension", delta: -2 },
      { paramId: "rear_suspension", delta: -2 },
      { paramId: "front_ride_height", delta: 2 },
      { paramId: "rear_ride_height", delta: 2 },
      { paramId: "brake_pressure", delta: -10 },
      { paramId: "tyre_pressure_front_right", delta: -8 },
      { paramId: "tyre_pressure_front_left", delta: -8 },
      { paramId: "tyre_pressure_rear_right", delta: -8 },
      { paramId: "tyre_pressure_rear_left", delta: -8 },
    ],
    reason: {
      es: "Mojado: subimos las alas para más carga y agarre, abrimos el diferencial con acelerador para no patinar al acelerar y cerramos un poco el de levantar para más estabilidad en la entrada, ablandamos y elevamos el auto para más agarre mecánico y evitar aquaplaning, bajamos la presión de freno para no bloquear y reducimos presiones para ganar huella de contacto y reducir el riesgo de aquaplaning.",
      en: "Wet: add wing for more downforce and grip, open the on-throttle diff so it doesn't spin on power and close the off-throttle diff a touch for more entry stability, soften and raise the car for more mechanical grip and to avoid aquaplaning, lower brake pressure to prevent locking, and drop tyre pressures for a larger contact patch and less aquaplaning risk.",
    },
  },
  {
    id: "damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "rear_wing", delta: 2 },
      { paramId: "diff_on_throttle", delta: -4 },
      { paramId: "brake_pressure", delta: -5 },
      { paramId: "brake_bias", delta: 2 },
    ],
    reason: {
      es: "Húmedo: agarre intermedio. Sumamos algo de ala trasera, abrimos un poco el diferencial y bajamos la presión de freno con algo más de reparto adelante para un margen de seguridad sin perder todo el ritmo de seco.",
      en: "Damp: in-between grip. Add some rear wing, open the diff a touch and lower brake pressure with a bit more front bias for a safety margin without giving up all the dry pace.",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 40,
    adjust: [
      { paramId: "tyre_pressure_front_right", delta: -5 },
      { paramId: "tyre_pressure_front_left", delta: -5 },
      { paramId: "tyre_pressure_rear_right", delta: -5 },
      { paramId: "tyre_pressure_rear_left", delta: -5 },
    ],
    reason: {
      es: "Pista caliente: la presión y la temperatura suben solas con el calor, así que arrancamos con presiones más bajas para no salirnos de la ventana óptima del neumático.",
      en: "Hot track: pressure and temperature rise on their own in the heat, so we start with lower pressures to stay inside the tyre's optimal window.",
    },
  },
  {
    id: "track_temp_low",
    when: (c) => c.trackTempC != null && c.trackTempC <= 20,
    adjust: [
      { paramId: "tyre_pressure_front_right", delta: 4 },
      { paramId: "tyre_pressure_front_left", delta: 4 },
      { paramId: "tyre_pressure_rear_right", delta: 4 },
      { paramId: "tyre_pressure_rear_left", delta: 4 },
    ],
    reason: {
      es: "Pista fría: cuesta llevar el neumático a temperatura, así que arrancamos con presiones algo más altas para ayudarlo a entrar en ventana.",
      en: "Cold track: harder to bring the tyre up to temperature, so we start with slightly higher pressures to help it reach its window.",
    },
  },
  {
    id: "grip_green",
    when: (c) => c.grip === "green",
    adjust: [
      { paramId: "diff_on_throttle", delta: -3 },
      { paramId: "brake_pressure", delta: -3 },
    ],
    reason: {
      es: "Pista verde (sin goma): hay menos agarre, abrimos un poco el diferencial al acelerar y bajamos algo la presión de freno para no patinar ni bloquear.",
      en: "Green track (no rubber): less grip, so open the on-throttle diff a touch and lower brake pressure slightly to avoid wheelspin and lockups.",
    },
  },
  {
    id: "fuel_high",
    when: (c) => c.fuelLoad === "high",
    adjust: [
      { paramId: "front_wing", delta: -1 },
      { paramId: "rear_wing", delta: -1 },
      { paramId: "rear_ride_height", delta: 1 },
    ],
    reason: {
      es: "Carrera larga (mucho combustible): el peso extra carga el eje trasero y baja la velocidad punta; quitamos un poco de ala para recuperar recta y subimos algo la altura trasera para compensar el hundimiento.",
      en: "Long race (heavy fuel): the extra weight loads the rear and cuts top speed; trim a little wing to recover straight-line speed and raise the rear slightly to offset the squat.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista) para los 12 valores del
// contrato. `delta` en pasos. Ajustes con sentido físico para un monoplaza con
// mucha carga aerodinámica y diferencial ajustable on/off-throttle.
export const f1_25SymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "front_wing", delta: 2 },
      { paramId: "brake_bias", delta: -2 },
      { paramId: "diff_off_throttle", delta: -5 },
    ],
    reason: {
      es: "Subviraje al entrar: sumamos ala delantera para más agarre del frente, atrasamos un poco la frenada para que la cola ayude a girar y abrimos el diferencial al levantar para más rotación en la entrada.",
      en: "Entry understeer: add front wing for more front grip, move brake bias slightly rearward so the rear helps rotate, and open the off-throttle diff for more entry rotation.",
    },
  },
  {
    symptom: "understeer_mid",
    adjust: [
      { paramId: "front_arb", delta: -1 },
      { paramId: "rear_arb", delta: 1 },
      { paramId: "front_camber", delta: -2 },
    ],
    reason: {
      es: "Subviraje en el medio: pasamos balance al frente (barra delantera más blanda, trasera más dura) y agregamos caída delantera negativa para más agarre lateral del frente.",
      en: "Mid-corner understeer: shift balance forward (softer front bar, stiffer rear) and add front negative camber for more front lateral grip.",
    },
  },
  {
    symptom: "understeer_exit",
    adjust: [
      { paramId: "diff_on_throttle", delta: -8 },
      { paramId: "rear_arb", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir (al acelerar): bajamos el diferencial con acelerador para que el auto rote mejor al poner gas y endurecemos algo la barra trasera.",
      en: "Exit understeer (on throttle): lower the on-throttle diff so the car rotates better on power and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 2 },
      { paramId: "diff_off_throttle", delta: 5 },
      { paramId: "rear_toe", delta: 3 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos el reparto de frenada para calmar la cola, subimos el diferencial al levantar para más estabilidad y sumamos convergencia trasera (toe-in).",
      en: "Entry oversteer: move brake bias forward to calm the rear, raise the off-throttle diff for more stability and add rear toe-in.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "rear_arb", delta: -1 },
      { paramId: "rear_wing", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra trasera para más agarre mecánico atrás y sumamos ala trasera para estabilizar la cola.",
      en: "Mid-corner oversteer: soften the rear bar for more rear mechanical grip and add rear wing to stabilise the rear.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "diff_on_throttle", delta: 8 },
      { paramId: "rear_toe", delta: 3 },
      { paramId: "rear_wing", delta: 1 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): subimos el diferencial con acelerador para repartir mejor la tracción, sumamos convergencia trasera y algo de ala para que la cola no se suelte al poner gas.",
      en: "Exit oversteer (on power): raise the on-throttle diff to better share traction, add rear toe-in and a touch of wing so the rear doesn't snap on throttle.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "brake_pressure", delta: -5 },
      { paramId: "diff_off_throttle", delta: 5 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada, bajamos algo la presión de freno para no bloquear la cola y subimos el diferencial al levantar para que la zaga se mantenga en línea.",
      en: "Unstable braking: move brake bias forward, lower brake pressure a bit so the rear doesn't lock, and raise the off-throttle diff so the rear stays in line.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "rear_arb", delta: -1 },
      { paramId: "diff_on_throttle", delta: 5 },
      { paramId: "rear_toe", delta: 2 },
    ],
    reason: {
      es: "Falta de tracción: ablandamos la barra trasera para que las ruedas copien mejor el piso, cerramos el diferencial con acelerador para más tracción en la salida y sumamos convergencia trasera para estabilizarla.",
      en: "Poor traction: soften the rear bar so the wheels follow the road better, close the on-throttle diff for more traction on exit and add rear toe-in to steady it.",
    },
  },
  {
    symptom: "tyres_overheat",
    adjust: [
      { paramId: "tyre_pressure_front_right", delta: -6 },
      { paramId: "tyre_pressure_front_left", delta: -6 },
      { paramId: "tyre_pressure_rear_right", delta: -6 },
      { paramId: "tyre_pressure_rear_left", delta: -6 },
      { paramId: "front_camber", delta: 1 },
      { paramId: "rear_camber", delta: 1 },
    ],
    reason: {
      es: "Neumáticos sobrecalentados: bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída para repartir mejor el calor por la huella.",
      en: "Overheating tyres: lower pressures to reduce core temperature and reduce camber slightly to spread the heat across the contact patch.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front_right", delta: 6 },
      { paramId: "tyre_pressure_front_left", delta: 6 },
      { paramId: "tyre_pressure_rear_right", delta: 6 },
      { paramId: "tyre_pressure_rear_left", delta: 6 },
    ],
    reason: {
      es: "Neumáticos fríos: subimos presiones para que entren más rápido en temperatura y lleguen a la ventana óptima.",
      en: "Cold tyres: raise pressures so they come up to temperature faster and reach the optimal window.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "front_ride_height", delta: 2 },
      { paramId: "rear_ride_height", delta: 2 },
      { paramId: "front_suspension", delta: -1 },
      { paramId: "rear_suspension", delta: -1 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura para darle recorrido y ablandamos un poco la suspensión para que el piso no golpee el asfalto.",
      en: "The car bounces / bottoms out: raise ride height to give travel and soften the suspension a touch so the floor doesn't hit the track.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "front_arb", delta: -1 },
      { paramId: "rear_arb", delta: -1 },
      { paramId: "front_suspension", delta: -2 },
      { paramId: "rear_suspension", delta: -2 },
    ],
    reason: {
      es: "Inestable en los pianos: ablandamos las barras y la suspensión para que el auto absorba el piano en vez de saltar y desestabilizarse.",
      en: "Unstable over kerbs: soften the bars and suspension so the car absorbs the kerb instead of jumping and destabilising.",
    },
  },
];

import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES de EA Sports WRC. `delta` está en pasos (se multiplica
// por el step del parámetro). En rally la SUPERFICIE manda: tierra y nieve piden
// un coche alto, blando y suave; el tarmac pide bajo y firme. Cada regla lleva su
// explicación educativa.
export const ea_wrcConditionRules: ConditionRule[] = [
  {
    id: "surface_gravel",
    when: (c) => c.surface === "gravel",
    adjust: [
      { paramId: "ride_height_front", delta: 4 },
      { paramId: "ride_height_rear", delta: 4 },
      { paramId: "spring_front", delta: -2 },
      { paramId: "spring_rear", delta: -2 },
      { paramId: "tyre_pressure_front", delta: -4 },
      { paramId: "tyre_pressure_rear", delta: -4 },
    ],
    reason: {
      es: "Tierra: subimos el coche para tener recorrido sobre baches y piedras, ablandamos los muelles para que las ruedas copien el terreno suelto y bajamos presiones para ganar huella y agarre mecánico.",
      en: "Gravel: raise the car for travel over bumps and rocks, soften the springs so the wheels follow the loose terrain, and lower pressures to gain contact patch and mechanical grip.",
    },
  },
  {
    id: "surface_snow",
    when: (c) => c.surface === "snow",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "spring_front", delta: -3 },
      { paramId: "spring_rear", delta: -3 },
      { paramId: "diff_power", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "brake_force", delta: -4 },
      { paramId: "tyre_pressure_front", delta: -3 },
      { paramId: "tyre_pressure_rear", delta: -3 },
    ],
    reason: {
      es: "Nieve/hielo: agarre muy bajo. Ablandamos todo y subimos el coche para máxima tracción mecánica, bajamos el bloqueo en aceleración y la fuerza de freno para no bloquear, y reducimos presiones para más huella sobre la nieve.",
      en: "Snow/ice: very low grip. Soften everything and raise the car for maximum mechanical traction, lower the power lock and brake force to avoid locking up, and reduce pressures for more contact patch on the snow.",
    },
  },
  {
    id: "surface_tarmac",
    when: (c) => c.surface === "tarmac",
    adjust: [
      { paramId: "ride_height_front", delta: -4 },
      { paramId: "ride_height_rear", delta: -4 },
      { paramId: "spring_front", delta: 3 },
      { paramId: "spring_rear", delta: 3 },
      { paramId: "arb_front", delta: 4 },
      { paramId: "arb_rear", delta: 4 },
      { paramId: "caster_front", delta: 2 },
      { paramId: "tyre_pressure_front", delta: 3 },
      { paramId: "tyre_pressure_rear", delta: 3 },
    ],
    reason: {
      es: "Asfalto: hay mucho agarre. Bajamos el coche y endurecemos muelles y barras para reducir el balanceo y mejorar la respuesta, subimos el caster para estabilidad direccional y subimos presiones para menos resistencia y mejor tacto.",
      en: "Tarmac: lots of grip. Lower the car and stiffen springs and bars to reduce roll and sharpen response, raise caster for directional stability, and raise pressures for less resistance and better feel.",
    },
  },
  {
    id: "roughness_rough",
    when: (c) => c.roughness === "rough",
    adjust: [
      { paramId: "ride_height_front", delta: 3 },
      { paramId: "ride_height_rear", delta: 3 },
      { paramId: "bump_fast", delta: -2 },
      { paramId: "rebound_fast", delta: -2 },
    ],
    reason: {
      es: "Etapa muy rugosa (Kenia, Grecia, Cerdeña): subimos aún más la altura para no tocar fondo y ablandamos la compresión y el rebote rápidos para que la suspensión absorba los baches bruscos sin llegar al tope.",
      en: "Very rough stage (Kenya, Greece, Sardinia): raise ride height further to avoid bottoming and soften fast bump and rebound so the suspension absorbs sharp hits without hitting the bump stop.",
    },
  },
  {
    id: "roughness_smooth",
    when: (c) => c.roughness === "smooth" && c.surface !== "snow",
    adjust: [
      { paramId: "ride_height_front", delta: -2 },
      { paramId: "ride_height_rear", delta: -2 },
      { paramId: "bump_fast", delta: 1 },
    ],
    reason: {
      es: "Superficie lisa (asfalto rápido): bajamos un poco el coche y firmamos la compresión rápida para una plataforma más estable y reactiva, ya que no hay baches grandes que absorber.",
      en: "Smooth surface (fast tarmac): lower the car slightly and firm up fast bump for a more stable, reactive platform, since there are no big bumps to absorb.",
    },
  },
  {
    id: "wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "spring_front", delta: -1 },
      { paramId: "spring_rear", delta: -1 },
      { paramId: "diff_power", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "brake_force", delta: -3 },
      { paramId: "brake_bias", delta: 2 },
      { paramId: "tyre_pressure_front", delta: -2 },
      { paramId: "tyre_pressure_rear", delta: -2 },
    ],
    reason: {
      es: "Mojado/barro: el agarre cae. Ablandamos los muelles para que las ruedas se claven mejor, bajamos el bloqueo en aceleración y la fuerza de freno para no patinar ni bloquear, adelantamos algo el reparto de frenada y bajamos presiones para más huella.",
      en: "Wet/mud: grip drops. Soften the springs so the wheels dig in better, lower power lock and brake force to avoid spinning or locking, move brake bias slightly forward, and lower pressures for more contact patch.",
    },
  },
  {
    id: "damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "diff_power", delta: -1, excludeDrivetrains: ["fwd"] },
      { paramId: "brake_force", delta: -1 },
      { paramId: "tyre_pressure_front", delta: -1 },
      { paramId: "tyre_pressure_rear", delta: -1 },
    ],
    reason: {
      es: "Húmedo: agarre intermedio. Bajamos un punto el bloqueo en aceleración y la fuerza de freno y las presiones para un margen de seguridad sin sacrificar todo el ritmo de seco.",
      en: "Damp: in-between grip. Lower power lock, brake force and pressures a notch for a safety margin without giving up all the dry pace.",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 30,
    adjust: [
      { paramId: "tyre_pressure_front", delta: -2 },
      { paramId: "tyre_pressure_rear", delta: -2 },
    ],
    reason: {
      es: "Calor (Grecia, Kenia, Cerdeña): la presión sube sola con el calor de la etapa, así que arrancamos con presiones más bajas para no perder huella ni recalentar.",
      en: "Heat (Greece, Kenya, Sardinia): pressure rises on its own with stage heat, so we start with lower pressures to keep contact patch and avoid overheating.",
    },
  },
  {
    id: "track_temp_low",
    when: (c) => c.trackTempC != null && c.trackTempC <= 5,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 2 },
    ],
    reason: {
      es: "Frío (Suecia, Monte-Carlo): cuesta meter temperatura en el neumático, así que arrancamos con presiones algo más altas para que trabaje antes.",
      en: "Cold (Sweden, Monte-Carlo): hard to get heat into the tyre, so we start with slightly higher pressures so it works sooner.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en la etapa). En rally se prioriza
// el balance mecánico (muelles, barras, diferencial) y el freno de mano.
export const ea_wrcSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -2 },
      { paramId: "diff_brake", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_front", delta: -1 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco el reparto de frenada y bajamos el bloqueo en frenada para que la cola ayude a girar, y ablandamos la barra delantera para dar más agarre al frente.",
      en: "Entry understeer: move brake bias slightly rearward and lower the braking lock so the rear helps rotate, and soften the front bar for more front grip.",
    },
  },
  {
    symptom: "understeer_mid",
    adjust: [
      { paramId: "spring_front", delta: -2 },
      { paramId: "arb_front", delta: -1 },
      { paramId: "diff_preload", delta: -1, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Subviraje en el medio: ablandamos el muelle y la barra delanteros para dar más agarre al frente y bajamos la precarga del diferencial para liberar rotación.",
      en: "Mid-corner understeer: soften the front spring and bar for more front grip and lower diff preload to free rotation.",
    },
  },
  {
    symptom: "understeer_exit",
    adjust: [
      { paramId: "diff_power", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: bajamos el bloqueo en aceleración para que el coche gire al poner gas y endurecemos algo la barra trasera para sumar rotación.",
      en: "Exit understeer: lower the power lock so the car turns on throttle and stiffen the rear bar a touch to add rotation.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 2 },
      { paramId: "diff_brake", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos el reparto de frenada y subimos el bloqueo en frenada para calmar la cola, y sumamos convergencia trasera (toe-in) para más estabilidad.",
      en: "Entry oversteer: move brake bias forward and raise the braking lock to calm the rear, and add rear toe-in for stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "spring_rear", delta: -2 },
      { paramId: "arb_rear", delta: -1 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos el muelle y la barra traseros para dar más agarre a la cola y desplazar el balance hacia el subviraje.",
      en: "Mid-corner oversteer: soften the rear spring and bar for more rear grip and shift the balance toward understeer.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "diff_power", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): subimos el bloqueo en aceleración para repartir mejor la tracción y sumamos convergencia trasera para que la cola no se suelte al poner gas.",
      en: "Exit oversteer (on power): raise the power lock to share traction better and add rear toe-in so the rear doesn't snap on throttle.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 2 },
      { paramId: "diff_brake", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "brake_force", delta: -2 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada y subimos el bloqueo en frenada para alinear la cola, y bajamos algo la fuerza de freno para reducir los bloqueos.",
      en: "Unstable braking: move brake bias forward and raise the braking lock to keep the rear in line, and lower brake force a bit to reduce lock-ups.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "spring_rear", delta: -1 },
      { paramId: "diff_power", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "ride_height_rear", delta: 1 },
    ],
    reason: {
      es: "Falta de tracción: ablandamos el muelle trasero para que la rueda copie mejor el terreno, subimos el bloqueo en aceleración para repartir el par y subimos un poco la altura trasera para más recorrido.",
      en: "Poor traction: soften the rear spring so the wheel follows the terrain better, raise the power lock to share torque, and raise the rear ride height slightly for more travel.",
    },
  },
  {
    symptom: "tyres_overheat",
    adjust: [
      { paramId: "tyre_pressure_front", delta: -3 },
      { paramId: "tyre_pressure_rear", delta: -3 },
      { paramId: "camber_front", delta: 1 },
      { paramId: "camber_rear", delta: 1 },
    ],
    reason: {
      es: "Neumáticos sobrecalentados: bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída (camber) para repartir mejor el calor por toda la banda.",
      en: "Overheating tyres: lower pressures to reduce core temperature and reduce camber slightly to spread the heat across the tread.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 3 },
      { paramId: "tyre_pressure_rear", delta: 3 },
    ],
    reason: {
      es: "Neumáticos fríos (Suecia, Monte-Carlo): subimos presiones para que entren más rápido en temperatura y trabajen antes.",
      en: "Cold tyres (Sweden, Monte-Carlo): raise pressures so they come up to temperature and work sooner.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "bump_fast", delta: 2 },
      { paramId: "ride_height_front", delta: 2 },
      { paramId: "ride_height_rear", delta: 2 },
    ],
    reason: {
      es: "El coche rebota / toca fondo: endurecemos la compresión rápida para que no llegue al tope y subimos la altura para darle recorrido y que el piso no golpee el terreno.",
      en: "The car bounces / bottoms out: firm up fast bump so it doesn't hit the bump stop and raise ride height to give travel so the floor doesn't slam the terrain.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "bump_fast", delta: -2 },
      { paramId: "rebound_fast", delta: -2 },
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
    ],
    reason: {
      es: "Inestable en cortes, saltos y baches bruscos: ablandamos la compresión y el rebote rápidos y las barras para que el coche absorba el golpe y recupere contacto con el suelo en vez de saltar.",
      en: "Unstable over cuts, jumps and sharp bumps: soften fast bump and rebound and the bars so the car absorbs the hit and regains contact with the ground instead of jumping.",
    },
  },
];

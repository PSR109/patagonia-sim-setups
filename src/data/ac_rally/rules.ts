import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES para Assetto Corsa Rally. `delta` está en pasos (se
// multiplica por el step del parámetro). En rally la superficie manda el setup:
// grava y nieve piden auto alto y blando; asfalto pide bajo y rígido. Cada
// regla lleva su explicación educativa.
//
// DECISIÓN DE PRESIÓN (fuente única de verdad): la build EA tiene un bug de PSI
// invertido confirmado (más presión = más grip IN-GAME, al revés de la física
// real; ver parameters.ts > tyre_pressure_*). Modelamos el COMPORTAMIENTO DEL
// JUEGO, no la física real: cuando una condición pide MÁS grip (nieve, mojado,
// pista caliente) SUBIMOS la presión, no la bajamos. Si Kunos corrige el bug,
// hay que invertir de nuevo el signo de estos deltas de presión.
export const ac_rallyConditionRules: ConditionRule[] = [
  {
    id: "surface_gravel",
    when: (c) => c.surface === "gravel",
    adjust: [
      { paramId: "ride_height_front", delta: 30 },
      { paramId: "ride_height_rear", delta: 30 },
      { paramId: "spring_rate_front", delta: -10 },
      { paramId: "spring_rate_rear", delta: -8 },
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "damper_fast_bump", delta: -3 },
      { paramId: "brake_bias", delta: -3 },
      { paramId: "toe_front", delta: -5 },
    ],
    reason: {
      es: "Grava: subimos mucho el auto para no tocar fondo y damos recorrido, ablandamos resortes y barras para que las ruedas copien el piso suelto, suavizamos la compresión rápida ante baches/piedras, atrasamos la frenada para no bloquear y abrimos el toe delantero para que entre mejor.",
      en: "Gravel: raise the car a lot to avoid bottoming and give travel, soften springs and bars so the wheels follow the loose ground, soften fast bump for rocks/bumps, move brake bias rearward to avoid locking, and add front toe-out for sharper turn-in.",
    },
  },
  {
    id: "surface_snow",
    when: (c) => c.surface === "snow",
    adjust: [
      { paramId: "ride_height_front", delta: 30 },
      { paramId: "ride_height_rear", delta: 30 },
      { paramId: "spring_rate_front", delta: -12 },
      { paramId: "spring_rate_rear", delta: -10 },
      { paramId: "tyre_pressure_front", delta: 20 },
      { paramId: "tyre_pressure_rear", delta: 20 },
      { paramId: "diff_coast", delta: 4, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 6 },
      { paramId: "brake_pressure", delta: -10 },
      { paramId: "tc", delta: 2 },
      { paramId: "abs", delta: 2 },
    ],
    reason: {
      es: "Nieve/hielo: adherencia bajísima. Subimos y ablandamos el auto, y por el bug de PSI invertido de la build EA SUBIMOS presiones para ganar grip in-game (al revés de la física real); subimos el coast lock y el toe-in trasero para que la cola no se cruce al levantar/frenar, bajamos la presión de freno para no bloquear y sumamos TC/ABS donde existan.",
      en: "Snow/ice: very low grip. Raise and soften the car, and because of the EA build's inverted-PSI bug we RAISE pressures to gain grip in-game (opposite to real physics); raise coast lock and rear toe-in so the rear doesn't snap on lift/brake, lower brake pressure to avoid locking, and add TC/ABS where available.",
    },
  },
  {
    id: "surface_tarmac",
    when: (c) => c.surface === "tarmac",
    adjust: [
      { paramId: "ride_height_front", delta: -30 },
      { paramId: "ride_height_rear", delta: -30 },
      { paramId: "spring_rate_front", delta: 15 },
      { paramId: "spring_rate_rear", delta: 12 },
      { paramId: "arb_front", delta: 2 },
      { paramId: "arb_rear", delta: 1 },
      { paramId: "camber_front", delta: -8 },
      { paramId: "damper_slow_bump", delta: 3 },
      { paramId: "brake_bias", delta: 3 },
    ],
    reason: {
      es: "Asfalto: alto agarre. Bajamos el auto para reducir el centro de gravedad, endurecemos resortes/barras para controlar la carrocería, agregamos camber negativo delantero para más agarre lateral, firmamos la compresión lenta para precisión y adelantamos la frenada porque podemos frenar más fuerte.",
      en: "Tarmac: high grip. Lower the car to drop the centre of gravity, stiffen springs/bars to control the body, add front negative camber for lateral grip, firm slow bump for precision, and move brake bias forward since we can brake harder.",
    },
  },
  {
    id: "roughness_rough",
    when: (c) => c.roughness === "rough",
    adjust: [
      { paramId: "ride_height_front", delta: 10 },
      { paramId: "ride_height_rear", delta: 10 },
      { paramId: "damper_fast_bump", delta: -2 },
      { paramId: "damper_fast_rebound", delta: -2 },
    ],
    reason: {
      es: "Etapa muy rota: subimos un poco más la altura y ablandamos la amortiguación rápida para que la rueda absorba baches grandes y recupere contacto rápido.",
      en: "Very rough stage: raise ride height a bit more and soften fast damping so the wheel absorbs big bumps and regains contact quickly.",
    },
  },
  {
    id: "weather_wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "tc", delta: 2 },
      { paramId: "abs", delta: 2 },
      { paramId: "brake_pressure", delta: -5 },
      { paramId: "diff_power", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "tyre_pressure_front", delta: 10 },
      { paramId: "tyre_pressure_rear", delta: 10 },
    ],
    reason: {
      es: "Mojado/lluvia: sumamos TC/ABS donde existan, bajamos presión de freno para no bloquear, cerramos un poco el power lock para no patinar (más bloqueo manda par a ambas ruedas en piso resbaladizo) y, por el bug de PSI invertido de la build EA, SUBIMOS presiones para ganar grip in-game (al revés de la física real).",
      en: "Wet/rain: add TC/ABS where available, lower brake pressure to avoid locking, close the power lock slightly to reduce wheelspin (more lock sends torque to both wheels on slippery ground), and, because of the EA build's inverted-PSI bug, RAISE pressures to gain grip in-game (opposite to real physics).",
    },
  },
  {
    id: "weather_damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "abs", delta: 1 },
      { paramId: "brake_pressure", delta: -2 },
    ],
    reason: {
      es: "Húmedo: adherencia intermedia. Sumamos un punto de TC/ABS y bajamos apenas la presión de freno como margen de seguridad sin perder ritmo.",
      en: "Damp: in-between grip. Add one TC/ABS step and lower brake pressure a touch for a safety margin without losing pace.",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 35,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 5 },
      { paramId: "tyre_pressure_rear", delta: 5 },
    ],
    reason: {
      es: "Pista caliente: en la física real bajaríamos la presión en frío porque sube sola con el calor, pero por el bug de PSI invertido de la build EA SUBIMOS presión para mantener el grip in-game (al revés de lo realista). Cuando se corrija el bug, volver a bajar.",
      en: "Hot track: in real physics we'd lower cold pressure because it rises with heat, but due to the EA build's inverted-PSI bug we RAISE pressure to keep grip in-game (opposite to reality). Revert to lowering once the bug is fixed.",
    },
  },
  {
    id: "track_temp_low",
    when: (c) => c.trackTempC != null && c.trackTempC <= 5,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 5 },
      { paramId: "tyre_pressure_rear", delta: 5 },
    ],
    reason: {
      es: "Pista muy fría (alpina/invernal): cuesta llegar a la presión objetivo, así que arrancamos con presiones en frío más altas.",
      en: "Very cold track (alpine/winter): harder to reach target pressure, so we start with higher cold pressures.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista). Cubren los 12 valores
// del tipo Symptom del contrato, adaptados a la física de rally.
export const ac_rallySymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "diff_coast", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_front", delta: -3 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos la frenada para que la cola ayude a girar, bajamos el coast lock para liberar rotación al levantar y abrimos el toe delantero para una entrada más viva.",
      en: "Entry understeer: move brake bias rearward so the rear helps rotate, lower coast lock to free off-throttle rotation, and add front toe-out for a sharper entry.",
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
      { paramId: "diff_power", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_rear", delta: 1 },
    ],
    reason: {
      es: "Subviraje al salir: bajamos el power lock para liberar rotación al acelerar y endurecemos algo la barra trasera.",
      en: "Exit understeer: lower power lock to free rotation on throttle and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "diff_coast", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos la frenada para calmar la cola, subimos el coast lock para evitar el sobreviraje de levantada y sumamos toe-in trasero para estabilidad.",
      en: "Entry oversteer: move brake bias forward to calm the rear, raise coast lock to prevent lift-off oversteer, and add rear toe-in for stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -1 },
      { paramId: "spring_rate_rear", delta: -4 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra y el resorte traseros para dar más agarre a la cola en apoyo.",
      en: "Mid-corner oversteer: soften the rear bar and spring to give the rear more grip while loaded.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "diff_power", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC donde exista, subimos el power lock para que ambas ruedas traccionen parejo y agregamos toe-in trasero para que la cola no se suelte.",
      en: "Exit oversteer (on power): add TC where available, raise power lock so both rear wheels pull evenly, and add rear toe-in so the rear doesn't snap.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "brake_pressure", delta: -3 },
      { paramId: "abs", delta: 1 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada, bajamos la presión de freno para que no se bloquee la cola en baja adherencia y sumamos un punto de ABS donde exista.",
      en: "Unstable braking: move brake bias forward, lower brake pressure so the rear doesn't lock on low grip, and add one ABS step where available.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "diff_power", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "spring_rate_rear", delta: -4 },
      { paramId: "tc", delta: 1 },
    ],
    reason: {
      es: "Falta de tracción: subimos el power lock para enviar par a ambas ruedas, ablandamos el resorte trasero para que copie el piso y sumamos algo de TC en superficie suelta.",
      en: "Poor traction: raise power lock to send torque to both wheels, soften the rear spring so it follows the ground, and add some TC on loose surfaces.",
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
      es: "Neumáticos sobrecalentados (sobre todo en asfalto): bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída para repartir mejor el calor.",
      en: "Overheating tyres (mainly on tarmac): lower pressures to reduce core temperature and reduce camber slightly to spread the heat.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 6 },
      { paramId: "tyre_pressure_rear", delta: 6 },
    ],
    reason: {
      es: "Neumáticos fríos (etapas alpinas/de nieve): subimos presiones para que entren más rápido en temperatura.",
      en: "Cold tyres (alpine/snow stages): raise pressures so they come up to temperature faster.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 15 },
      { paramId: "ride_height_rear", delta: 15 },
      { paramId: "damper_fast_bump", delta: -2 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura para darle recorrido y ablandamos la compresión rápida para que el piso no golpee tras baches o saltos.",
      en: "The car bounces / bottoms out: raise ride height for travel and soften fast bump so the floor doesn't slam after bumps or jumps.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -1 },
      { paramId: "arb_rear", delta: -1 },
      { paramId: "damper_fast_bump", delta: -2 },
      { paramId: "damper_fast_rebound", delta: -2 },
    ],
    reason: {
      es: "Inestable en pianos/baches grandes: ablandamos las barras y la amortiguación rápida para que el auto absorba el impacto en vez de saltar.",
      en: "Unstable over kerbs/big bumps: soften the bars and fast damping so the car absorbs the impact instead of jumping.",
    },
  },
];

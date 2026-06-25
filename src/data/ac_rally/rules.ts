import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES y por SÍNTOMA para Assetto Corsa Rally. `delta` está en
// PASOS (se multiplica por el `step` real del parámetro). Tras la reconstrucción
// 2026-06-25 (captura in-game del i20 N Rally2), los deltas están en las unidades
// reales del juego: muelles N/m (step 500), amortiguadores Ns/m (step 125), barras
// N/m (step 500), altura "anillo" m (step 0.001), diferencial por LSD (rampa °
// step 5 / precarga Nm step 5), balance de freno fracción (step 0.005), presión
// psi (step 0.5), camber ° (step 0.1), toe m (step 0.0001), ABS/TC/pastilla mapas.
//
// DIFERENCIAL (clave): AC Rally usa LSD mecánico, no "% de bloqueo". MENOR ángulo
// de rampa = MÁS bloqueo. Las reglas tocan el LSD TRASERO (rotación/tracción de la
// cola); el delantero se deja en base. Los deltas de diff llevan
// excludeDrivetrains:["fwd"] (un FWD no tiene LSD trasero).
//
// DECISIÓN DE PRESIÓN (fuente única de verdad): la build EA tiene un bug de PSI
// invertido confirmado (más presión = más grip IN-GAME, al revés de la física
// real). Modelamos el COMPORTAMIENTO DEL JUEGO: cuando una condición pide MÁS grip
// (nieve, mojado, pista caliente) SUBIMOS la presión. Si Kunos/Supernova corrigen
// el bug, invertir el signo de estos deltas de presión.
export const ac_rallyConditionRules: ConditionRule[] = [
  {
    id: "surface_gravel",
    when: (c) => c.surface === "gravel",
    adjust: [
      { paramId: "ride_height_front", delta: 25 },
      { paramId: "ride_height_rear", delta: 25 },
      { paramId: "spring_rate_front", delta: -6 },
      { paramId: "spring_rate_rear", delta: -5 },
      { paramId: "arb_front", delta: -2 },
      { paramId: "arb_rear", delta: -3 },
      { paramId: "damper_fast_bump_front", delta: -4 },
      { paramId: "damper_fast_bump_rear", delta: -4 },
      { paramId: "brake_bias", delta: -3 },
      { paramId: "toe_front", delta: -5 },
    ],
    reason: {
      es: "Grava: subimos el auto con el anillo de ajuste (~+25 mm) para no tocar fondo y dar recorrido, ablandamos muelles y barras para que las ruedas copien el piso suelto, suavizamos la compresión rápida ante baches/piedras, atrasamos el balance de freno para no bloquear y abrimos el toe delantero para una entrada más viva.",
      en: "Gravel: raise the car with the ride-height ring (~+25 mm) to avoid bottoming and give travel, soften springs and bars so the wheels follow the loose ground, soften fast bump for rocks/bumps, move brake balance rearward to avoid locking, and add front toe-out for sharper turn-in.",
    },
  },
  {
    id: "surface_snow",
    when: (c) => c.surface === "snow",
    adjust: [
      { paramId: "ride_height_front", delta: 25 },
      { paramId: "ride_height_rear", delta: 25 },
      { paramId: "spring_rate_front", delta: -8 },
      { paramId: "spring_rate_rear", delta: -7 },
      { paramId: "tyre_pressure_front", delta: 4 },
      { paramId: "tyre_pressure_rear", delta: 4 },
      { paramId: "diff_rear_coast_ramp", delta: -3, excludeDrivetrains: ["fwd"] },
      { paramId: "diff_rear_preload", delta: 4, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 6 },
      { paramId: "brake_bias", delta: -2 },
      { paramId: "brake_pad", delta: -1 },
      { paramId: "tc", delta: 1 },
      { paramId: "abs", delta: 1 },
    ],
    reason: {
      es: "Nieve/hielo: adherencia bajísima. Subimos y ablandamos el auto; por el bug de PSI invertido de la build EA SUBIMOS presiones para ganar grip in-game (al revés de la física real); bajamos la rampa de inercia trasera y subimos la precarga del LSD trasero para que la cola no se cruce al levantar/frenar; sumamos toe-in trasero, atrasamos un poco la frenada, bajamos el compuesto de pastilla para que no bloquee y sumamos TC/ABS donde existan.",
      en: "Snow/ice: very low grip. Raise and soften the car; due to the EA build's inverted-PSI bug we RAISE pressures to gain grip in-game (opposite to real physics); lower the rear coast ramp and raise rear LSD preload so the rear doesn't snap on lift/brake; add rear toe-in, move brake balance slightly rearward, drop the pad compound so it won't lock, and add TC/ABS where available.",
    },
  },
  {
    id: "surface_tarmac",
    when: (c) => c.surface === "tarmac",
    adjust: [
      { paramId: "ride_height_front", delta: -25 },
      { paramId: "ride_height_rear", delta: -25 },
      { paramId: "spring_rate_front", delta: 8 },
      { paramId: "spring_rate_rear", delta: 6 },
      { paramId: "arb_front", delta: 4 },
      { paramId: "arb_rear", delta: 2 },
      { paramId: "camber_front", delta: -8 },
      { paramId: "damper_slow_bump_front", delta: 3 },
      { paramId: "damper_slow_bump_rear", delta: 3 },
      { paramId: "brake_bias", delta: 3 },
    ],
    reason: {
      es: "Asfalto: alto agarre. Bajamos el auto con el anillo (~−25 mm) para reducir el centro de gravedad, endurecemos muelles/barras para controlar la carrocería, agregamos camber negativo delantero (−0.8°) para más agarre lateral, firmamos la compresión lenta para precisión y adelantamos el balance de freno porque podemos frenar más fuerte.",
      en: "Tarmac: high grip. Lower the car with the ring (~−25 mm) to drop the centre of gravity, stiffen springs/bars to control the body, add front negative camber (−0.8°) for lateral grip, firm slow bump for precision, and move brake balance forward since we can brake harder.",
    },
  },
  {
    id: "roughness_rough",
    when: (c) => c.roughness === "rough",
    adjust: [
      { paramId: "ride_height_front", delta: 10 },
      { paramId: "ride_height_rear", delta: 10 },
      { paramId: "damper_fast_bump_front", delta: -3 },
      { paramId: "damper_fast_bump_rear", delta: -3 },
      { paramId: "damper_fast_rebound_front", delta: -3 },
      { paramId: "damper_fast_rebound_rear", delta: -3 },
    ],
    reason: {
      es: "Etapa muy rota: subimos un poco más la altura y ablandamos la amortiguación rápida (compresión y extensión, ambos ejes) para que la rueda absorba baches grandes y recupere contacto rápido.",
      en: "Very rough stage: raise ride height a bit more and soften fast damping (bump and rebound, both axles) so the wheel absorbs big bumps and regains contact quickly.",
    },
  },
  {
    id: "weather_wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "abs", delta: 1 },
      { paramId: "diff_rear_power_ramp", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "tyre_pressure_front", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 2 },
      { paramId: "brake_bias", delta: -1 },
    ],
    reason: {
      es: "Mojado/lluvia: sumamos TC/ABS donde existan, bajamos la rampa de potencia trasera (más bloqueo al acelerar para no patinar en piso resbaladizo), atrasamos apenas la frenada y, por el bug de PSI invertido de la build EA, SUBIMOS presiones para ganar grip in-game (al revés de la física real).",
      en: "Wet/rain: add TC/ABS where available, lower the rear power ramp (more lock on throttle to reduce wheelspin on slippery ground), move brake balance slightly rearward and, due to the EA build's inverted-PSI bug, RAISE pressures to gain grip in-game (opposite to real physics).",
    },
  },
  {
    id: "weather_damp",
    when: (c) => c.weather === "damp",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "abs", delta: 1 },
    ],
    reason: {
      es: "Húmedo: adherencia intermedia. Sumamos un punto de TC/ABS como margen de seguridad sin perder ritmo; el resto del setup se mantiene cerca del de seco.",
      en: "Damp: in-between grip. Add one TC/ABS step as a safety margin without losing pace; the rest of the setup stays close to the dry one.",
    },
  },
  {
    id: "track_temp_high",
    when: (c) => c.trackTempC != null && c.trackTempC >= 35,
    adjust: [
      { paramId: "tyre_pressure_front", delta: 1 },
      { paramId: "tyre_pressure_rear", delta: 1 },
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
      { paramId: "tyre_pressure_front", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 2 },
    ],
    reason: {
      es: "Pista muy fría (alpina/invernal): cuesta llegar a la presión objetivo, así que arrancamos con presiones en frío más altas.",
      en: "Very cold track (alpine/winter): harder to reach target pressure, so we start with higher cold pressures.",
    },
  },
];

// Reglas por SÍNTOMA (lo que el piloto siente en pista). Cubren los 12 valores
// del tipo Symptom del contrato, adaptados a la física de rally y al LSD de AC.
export const ac_rallySymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -3 },
      { paramId: "diff_rear_coast_ramp", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_front", delta: -3 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos el balance de freno para que la cola ayude a girar, subimos la rampa de inercia trasera (menos bloqueo al levantar = más rotación de entrada) y abrimos el toe delantero para una entrada más viva.",
      en: "Entry understeer: move brake balance rearward so the rear helps rotate, raise the rear coast ramp (less lock on lift-off = more entry rotation) and add front toe-out for a sharper entry.",
    },
  },
  {
    symptom: "understeer_mid",
    adjust: [
      { paramId: "arb_front", delta: -2 },
      { paramId: "arb_rear", delta: 3 },
      { paramId: "camber_front", delta: -2 },
    ],
    reason: {
      es: "Subviraje en el medio: pasamos balance al frente (barra delantera más blanda, trasera más dura) y agregamos caída delantera (−0.2°) para más agarre lateral.",
      en: "Mid-corner understeer: shift balance forward (softer front bar, stiffer rear) and add front camber (−0.2°) for more lateral grip.",
    },
  },
  {
    symptom: "understeer_exit",
    adjust: [
      { paramId: "diff_rear_power_ramp", delta: 2, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_rear", delta: 2 },
    ],
    reason: {
      es: "Subviraje al salir: subimos la rampa de potencia trasera (menos bloqueo al acelerar = más rotación de salida) y endurecemos algo la barra trasera.",
      en: "Exit understeer: raise the rear power ramp (less lock on throttle = more exit rotation) and stiffen the rear bar a touch.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "diff_rear_coast_ramp", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos el balance de freno para calmar la cola, bajamos la rampa de inercia trasera (más bloqueo al levantar = evita el sobreviraje de levantada) y sumamos toe-in trasero para estabilidad.",
      en: "Entry oversteer: move brake balance forward to calm the rear, lower the rear coast ramp (more lock on lift-off = prevents lift-off oversteer) and add rear toe-in for stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "arb_rear", delta: -3 },
      { paramId: "spring_rate_rear", delta: -3 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos la barra y el muelle traseros para dar más agarre a la cola en apoyo.",
      en: "Mid-corner oversteer: soften the rear bar and spring to give the rear more grip while loaded.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "tc", delta: 1 },
      { paramId: "diff_rear_power_ramp", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 2 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): sumamos TC donde exista, bajamos la rampa de potencia trasera (más bloqueo al acelerar = ambas ruedas traccionan parejo y la cola no se suelta) y agregamos toe-in trasero.",
      en: "Exit oversteer (on power): add TC where available, lower the rear power ramp (more lock on throttle = both rear wheels pull evenly and the rear doesn't snap) and add rear toe-in.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 3 },
      { paramId: "brake_pad", delta: -1 },
      { paramId: "abs", delta: 1 },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el balance de freno, bajamos el compuesto de pastilla para que no se bloquee la cola en baja adherencia y sumamos un punto de ABS donde exista.",
      en: "Unstable braking: move brake balance forward, drop the pad compound so the rear doesn't lock on low grip, and add one ABS step where available.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "diff_rear_power_ramp", delta: -2, excludeDrivetrains: ["fwd"] },
      { paramId: "spring_rate_rear", delta: -3 },
      { paramId: "tc", delta: 1 },
    ],
    reason: {
      es: "Falta de tracción: bajamos la rampa de potencia trasera (más bloqueo = enviar par a ambas ruedas), ablandamos el muelle trasero para que copie el piso y sumamos algo de TC en superficie suelta.",
      en: "Poor traction: lower the rear power ramp (more lock = send torque to both wheels), soften the rear spring so it follows the ground, and add some TC on loose surfaces.",
    },
  },
  {
    symptom: "tyres_overheat",
    adjust: [
      { paramId: "tyre_pressure_front", delta: -2 },
      { paramId: "tyre_pressure_rear", delta: -2 },
      { paramId: "camber_front", delta: 1 },
      { paramId: "camber_rear", delta: 1 },
    ],
    reason: {
      es: "Neumáticos sobrecalentados (sobre todo en asfalto): bajamos presiones para reducir la temperatura del centro y reducimos un poco la caída para repartir mejor el calor por la huella.",
      en: "Overheating tyres (mainly on tarmac): lower pressures to reduce core temperature and reduce camber slightly to spread the heat across the contact patch.",
    },
  },
  {
    symptom: "tyres_cold",
    adjust: [
      { paramId: "tyre_pressure_front", delta: 2 },
      { paramId: "tyre_pressure_rear", delta: 2 },
    ],
    reason: {
      es: "Neumáticos fríos (etapas alpinas/de nieve): subimos presiones para que entren más rápido en temperatura.",
      en: "Cold tyres (alpine/snow stages): raise pressures so they come up to temperature faster.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "ride_height_front", delta: 12 },
      { paramId: "ride_height_rear", delta: 12 },
      { paramId: "damper_fast_bump_front", delta: -3 },
      { paramId: "damper_fast_bump_rear", delta: -3 },
    ],
    reason: {
      es: "El auto rebota / toca fondo: subimos la altura con el anillo para darle recorrido y ablandamos la compresión rápida (ambos ejes) para que el piso no golpee tras baches o saltos.",
      en: "The car bounces / bottoms out: raise ride height with the ring for travel and soften fast bump (both axles) so the floor doesn't slam after bumps or jumps.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "arb_front", delta: -2 },
      { paramId: "arb_rear", delta: -3 },
      { paramId: "damper_fast_bump_front", delta: -2 },
      { paramId: "damper_fast_bump_rear", delta: -2 },
      { paramId: "damper_fast_rebound_front", delta: -2 },
      { paramId: "damper_fast_rebound_rear", delta: -2 },
    ],
    reason: {
      es: "Inestable en pianos/baches grandes: ablandamos las barras y la amortiguación rápida (compresión y extensión, ambos ejes) para que el auto absorba el impacto en vez de saltar.",
      en: "Unstable over kerbs/big bumps: soften the bars and fast damping (bump and rebound, both axles) so the car absorbs the impact instead of jumping.",
    },
  },
];

import type { ConditionRule, SymptomRule } from "@/lib/types";

// Reglas por CONDICIONES y por SÍNTOMA para EA SPORTS WRC. `delta` está en PASOS
// (se multiplica por el `step` real del parámetro). Tras la reconstrucción
// 2026-06-25 (captura in-game del Ford Puma Rally1, 6 pestañas reales), los deltas
// están en las unidades reales del juego: altura mm (step 1), muelle N/mm (step 1),
// barra N/mm (step 0.3), amortiguadores en clicks (step 0.5), diff conducción/frenada
// % (step 1) / precarga N·m (step 1), frenos N·m (step 1), reparto % (step 1),
// camber/toe ° (step 0.05).
//
// DIFERENCIAL: EA WRC tiene LSD FRONTAL y TRASERO. Las reglas tocan SOLO el TRASERO
// (rotación/tracción de la cola); el frontal queda en base. Convención del juego
// (tooltip in-game): bloqueo de conducción/frenada ALTO = más tracción/estabilidad,
// posible subviraje; BAJO = más giro en curva, menos estabilidad. Los deltas de diff
// llevan excludeDrivetrains:["fwd"] (un FWD no tiene LSD trasero).
//
// SIN NEUMÁTICOS: EA WRC no expone presión en el setup, así que NO hay reglas de
// presión ni de temperatura de pista (no existe lever). La superficie/clima se
// modela con altura, muelles, barras, amortiguadores, diferencial trasero y frenos.
export const ea_wrcConditionRules: ConditionRule[] = [
  {
    id: "surface_gravel",
    when: (c) => c.surface === "gravel",
    adjust: [
      { paramId: "ride_height_front", delta: 12 },
      { paramId: "ride_height_rear", delta: 12 },
      { paramId: "spring_front", delta: -20 },
      { paramId: "spring_rear", delta: -20 },
      { paramId: "arb_front", delta: -20 },
      { paramId: "arb_rear", delta: -20 },
      { paramId: "damper_fast_bump_front", delta: -4 },
      { paramId: "damper_fast_bump_rear", delta: -4 },
      { paramId: "brake_bias", delta: -4 },
      { paramId: "diff_rear_power", delta: 6, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_front", delta: -4 },
    ],
    reason: {
      es: "Tierra: subimos el coche (~+12 mm) para tener recorrido sobre baches y piedras, ablandamos muelles y barras para que las ruedas copien el terreno suelto, suavizamos la compresión rápida ante impactos, atrasamos el reparto de frenada para no bloquear, subimos el bloqueo de conducción trasero para más tracción mecánica y abrimos el toe delantero para una entrada más viva.",
      en: "Gravel: raise the car (~+12 mm) for travel over bumps and rocks, soften springs and bars so the wheels follow the loose terrain, soften fast bump for impacts, move brake bias rearward to avoid locking, raise the rear power lock for more mechanical traction, and add front toe-out for sharper turn-in.",
    },
  },
  {
    id: "surface_snow",
    when: (c) => c.surface === "snow",
    adjust: [
      { paramId: "ride_height_front", delta: 12 },
      { paramId: "ride_height_rear", delta: 12 },
      { paramId: "spring_front", delta: -28 },
      { paramId: "spring_rear", delta: -28 },
      { paramId: "arb_front", delta: -25 },
      { paramId: "arb_rear", delta: -25 },
      { paramId: "brake_force", delta: -300 },
      { paramId: "brake_bias", delta: -2 },
      { paramId: "diff_rear_coast", delta: 4, excludeDrivetrains: ["fwd"] },
      { paramId: "diff_rear_preload", delta: 10, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 4 },
    ],
    reason: {
      es: "Nieve/hielo: agarre bajísimo. Subimos y ablandamos todo para máxima tracción mecánica, bajamos la fuerza de freno y atrasamos un poco el reparto para no bloquear, subimos el bloqueo de frenada y la precarga del LSD trasero para que la cola no se cruce al levantar/frenar, y sumamos toe-in trasero para estabilidad.",
      en: "Snow/ice: very low grip. Raise and soften everything for maximum mechanical traction, lower brake force and move bias slightly rearward to avoid locking, raise the rear coast lock and preload so the rear doesn't snap on lift/brake, and add rear toe-in for stability.",
    },
  },
  {
    id: "surface_tarmac",
    when: (c) => c.surface === "tarmac",
    adjust: [
      { paramId: "ride_height_front", delta: -15 },
      { paramId: "ride_height_rear", delta: -15 },
      { paramId: "spring_front", delta: 30 },
      { paramId: "spring_rear", delta: 24 },
      { paramId: "arb_front", delta: 25 },
      { paramId: "arb_rear", delta: 12 },
      { paramId: "camber_front", delta: -10 },
      { paramId: "camber_rear", delta: -5 },
      { paramId: "damper_slow_bump_front", delta: 4 },
      { paramId: "damper_slow_bump_rear", delta: 4 },
      { paramId: "brake_bias", delta: 3 },
      { paramId: "brake_force", delta: 200 },
    ],
    reason: {
      es: "Asfalto: mucho agarre. Bajamos el coche (~−15 mm) para reducir el centro de gravedad, endurecemos muelles y barras para controlar el balanceo, agregamos camber negativo (−0.5° del / −0.25° tras) para más agarre lateral, firmamos la compresión lenta para precisión y subimos fuerza y reparto de freno hacia adelante porque podemos frenar más fuerte.",
      en: "Tarmac: lots of grip. Lower the car (~−15 mm) to drop the centre of gravity, stiffen springs and bars to control roll, add negative camber (−0.5° front / −0.25° rear) for lateral grip, firm slow bump for precision, and raise brake force and forward bias since we can brake harder.",
    },
  },
  {
    id: "roughness_rough",
    when: (c) => c.roughness === "rough",
    adjust: [
      { paramId: "ride_height_front", delta: 8 },
      { paramId: "ride_height_rear", delta: 8 },
      { paramId: "damper_fast_bump_front", delta: -4 },
      { paramId: "damper_fast_bump_rear", delta: -4 },
      { paramId: "damper_slow_rebound_front", delta: -2 },
      { paramId: "damper_slow_rebound_rear", delta: -2 },
    ],
    reason: {
      es: "Etapa muy rugosa (Kenia, Grecia, Cerdeña): subimos más la altura para no tocar fondo, ablandamos la compresión rápida para absorber los baches bruscos y suavizamos el rebote (único canal de extensión en EA WRC) para que la rueda recupere contacto rápido.",
      en: "Very rough stage (Kenya, Greece, Sardinia): raise ride height more to avoid bottoming, soften fast bump to absorb sharp hits and soften rebound (the only extension channel in EA WRC) so the wheel regains contact quickly.",
    },
  },
  {
    id: "roughness_smooth",
    when: (c) => c.roughness === "smooth" && c.surface !== "snow",
    adjust: [
      { paramId: "ride_height_front", delta: -6 },
      { paramId: "ride_height_rear", delta: -6 },
      { paramId: "damper_fast_bump_front", delta: 2 },
      { paramId: "damper_fast_bump_rear", delta: 2 },
    ],
    reason: {
      es: "Superficie lisa (asfalto rápido): bajamos un poco el coche y firmamos la compresión rápida para una plataforma más estable y reactiva, ya que no hay baches grandes que absorber.",
      en: "Smooth surface (fast tarmac): lower the car slightly and firm up fast bump for a more stable, reactive platform, since there are no big bumps to absorb.",
    },
  },
  {
    id: "weather_wet",
    when: (c) => c.weather === "wet",
    adjust: [
      { paramId: "spring_front", delta: -8 },
      { paramId: "spring_rear", delta: -8 },
      { paramId: "brake_force", delta: -200 },
      { paramId: "brake_bias", delta: -2 },
      { paramId: "diff_rear_power", delta: 4, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Mojado/barro: el agarre cae. Ablandamos los muelles para que las ruedas se claven mejor, bajamos la fuerza de freno y atrasamos algo el reparto para no bloquear las delanteras, y subimos el bloqueo de conducción trasero para poner la potencia sin patinar.",
      en: "Wet/mud: grip drops. Soften the springs so the wheels dig in, lower brake force and move bias slightly rearward to avoid locking the fronts, and raise the rear power lock to put the power down without spinning.",
    },
  },
  // EA Sports WRC no tiene un estado de clima intermedio "húmedo/damp": el clima
  // distingue seco vs lluvia (y nieve via superficie). Verificado 2026-06-26.
];

// Reglas por SÍNTOMA (lo que el piloto siente en la etapa). En rally se prioriza el
// balance mecánico (muelles, barras, diferencial trasero) y el freno. No hay reglas
// de neumáticos frío/caliente: EA WRC no tiene presión ajustable (solo camber para
// sobrecalentamiento, y "tyres_cold" no tiene lever de setup → se omite a propósito).
export const ea_wrcSymptomRules: SymptomRule[] = [
  {
    symptom: "understeer_entry",
    adjust: [
      { paramId: "brake_bias", delta: -2 },
      { paramId: "diff_rear_coast", delta: -4, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_front", delta: -10 },
      { paramId: "toe_front", delta: -3 },
    ],
    reason: {
      es: "Subviraje al entrar: atrasamos un poco el reparto de frenada y bajamos el bloqueo de frenada trasero (menos bloqueo = más rotación de entrada), ablandamos la barra delantera para dar más agarre al frente y abrimos el toe delantero.",
      en: "Entry understeer: move brake bias slightly rearward and lower the rear coast lock (less lock = more entry rotation), soften the front bar for more front grip and add front toe-out.",
    },
  },
  {
    symptom: "understeer_mid",
    adjust: [
      { paramId: "spring_front", delta: -15 },
      { paramId: "arb_front", delta: -12 },
      { paramId: "camber_front", delta: -5 },
    ],
    reason: {
      es: "Subviraje en el medio: ablandamos el muelle y la barra delanteros para dar más agarre al frente y agregamos algo de camber negativo (−0.25°) para más mordida lateral.",
      en: "Mid-corner understeer: soften the front spring and bar for more front grip and add a little negative camber (−0.25°) for more lateral bite.",
    },
  },
  {
    symptom: "understeer_exit",
    adjust: [
      { paramId: "diff_rear_power", delta: -4, excludeDrivetrains: ["fwd"] },
      { paramId: "arb_rear", delta: 6 },
    ],
    reason: {
      es: "Subviraje al salir: bajamos el bloqueo de conducción trasero (menos bloqueo = el coche gira más al poner gas) y endurecemos algo la barra trasera para sumar rotación.",
      en: "Exit understeer: lower the rear power lock (less lock = the car turns more on throttle) and stiffen the rear bar a touch to add rotation.",
    },
  },
  {
    symptom: "oversteer_entry",
    adjust: [
      { paramId: "brake_bias", delta: 2 },
      { paramId: "diff_rear_coast", delta: 4, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 3 },
    ],
    reason: {
      es: "Sobreviraje al entrar: adelantamos el reparto de frenada y subimos el bloqueo de frenada trasero (más bloqueo = cola estable al levantar/frenar) y sumamos toe-in trasero para más estabilidad.",
      en: "Entry oversteer: move brake bias forward and raise the rear coast lock (more lock = a stable rear on lift/brake) and add rear toe-in for more stability.",
    },
  },
  {
    symptom: "oversteer_mid",
    adjust: [
      { paramId: "spring_rear", delta: -15 },
      { paramId: "arb_rear", delta: -12 },
    ],
    reason: {
      es: "Sobreviraje en el medio: ablandamos el muelle y la barra traseros para dar más agarre a la cola y desplazar el balance hacia el subviraje.",
      en: "Mid-corner oversteer: soften the rear spring and bar for more rear grip and shift the balance toward understeer.",
    },
  },
  {
    symptom: "oversteer_exit",
    adjust: [
      { paramId: "diff_rear_power", delta: 4, excludeDrivetrains: ["fwd"] },
      { paramId: "toe_rear", delta: 3 },
    ],
    reason: {
      es: "Sobreviraje al salir (al acelerar): subimos el bloqueo de conducción trasero (más bloqueo = ambas ruedas traccionan parejo y la cola no se suelta) y sumamos toe-in trasero.",
      en: "Exit oversteer (on power): raise the rear power lock (more lock = both wheels pull evenly and the rear doesn't snap) and add rear toe-in.",
    },
  },
  {
    symptom: "braking_instability",
    adjust: [
      { paramId: "brake_bias", delta: 2 },
      { paramId: "brake_force", delta: -150 },
      { paramId: "diff_rear_coast", delta: 4, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Inestable al frenar: adelantamos el reparto de frenada, bajamos algo la fuerza de freno para reducir los bloqueos y subimos el bloqueo de frenada trasero para mantener la cola en línea.",
      en: "Unstable braking: move brake bias forward, lower brake force a bit to reduce lock-ups and raise the rear coast lock to keep the rear in line.",
    },
  },
  {
    symptom: "poor_traction",
    adjust: [
      { paramId: "diff_rear_power", delta: 4, excludeDrivetrains: ["fwd"] },
      { paramId: "spring_rear", delta: -10 },
      { paramId: "ride_height_rear", delta: 4 },
    ],
    reason: {
      es: "Falta de tracción: subimos el bloqueo de conducción trasero para repartir el par entre ambas ruedas, ablandamos el muelle trasero para que copie mejor el terreno y subimos un poco la altura trasera para más recorrido.",
      en: "Poor traction: raise the rear power lock to share torque between both wheels, soften the rear spring so it follows the terrain better, and raise the rear ride height slightly for more travel.",
    },
  },
  {
    symptom: "tyres_overheat",
    adjust: [
      { paramId: "camber_front", delta: 5 },
      { paramId: "camber_rear", delta: 5 },
    ],
    reason: {
      es: "Neumáticos sobrecalentados: como EA WRC no permite ajustar presión, reducimos un poco la caída (camber, +0.25° hacia 0) para repartir mejor el calor por toda la banda de rodadura.",
      en: "Overheating tyres: since EA WRC doesn't allow pressure adjustment, reduce camber slightly (+0.25° toward 0) to spread heat across the tread.",
    },
  },
  {
    symptom: "bouncing",
    adjust: [
      { paramId: "damper_fast_bump_front", delta: 4 },
      { paramId: "damper_fast_bump_rear", delta: 4 },
      { paramId: "ride_height_front", delta: 6 },
      { paramId: "ride_height_rear", delta: 6 },
    ],
    reason: {
      es: "El coche rebota / toca fondo: endurecemos la compresión rápida para que no llegue al tope y subimos la altura para darle recorrido y que el piso no golpee el terreno.",
      en: "The car bounces / bottoms out: firm up fast bump so it doesn't hit the bump stop and raise ride height to give travel so the floor doesn't slam the terrain.",
    },
  },
  {
    symptom: "kerb_instability",
    adjust: [
      { paramId: "damper_fast_bump_front", delta: -4 },
      { paramId: "damper_fast_bump_rear", delta: -4 },
      { paramId: "damper_slow_rebound_front", delta: -2 },
      { paramId: "damper_slow_rebound_rear", delta: -2 },
      { paramId: "arb_front", delta: -8 },
      { paramId: "arb_rear", delta: -8 },
    ],
    reason: {
      es: "Inestable en cortes, saltos y baches bruscos: ablandamos la compresión rápida, el rebote y las barras para que el coche absorba el golpe y recupere contacto con el suelo en vez de saltar.",
      en: "Unstable over cuts, jumps and sharp bumps: soften fast bump, rebound and the bars so the car absorbs the hit and regains contact with the ground instead of jumping.",
    },
  },
];

// Reglas por ESTILO de manejo (rally). BALANCE = barras + toe + LSD trasero de
// frenada; SUAVIDAD = compresión rápida del amortiguador; NIVEL = freno + LSD de
// conducción (EA WRC no tiene TC/ABS ni presión en el setup, así que la "ayuda"
// se da por freno y diferencial). Los ajustes de diferencial trasero excluyen FWD.
export const ea_wrcStyleRules: ConditionRule[] = [
  {
    id: "balance_stable",
    when: (c) => c.balance === "stable",
    adjust: [
      { paramId: "arb_front", delta: 10 },
      { paramId: "arb_rear", delta: -10 },
      { paramId: "toe_rear", delta: 3 },
    ],
    reason: {
      es: "Balance estable: endurecemos la barra delantera, ablandamos la trasera (más agarre atrás) y sumamos toe-in trasero. La cola queda plantada y previsible: clave para no perderla en tierra rápida.",
      en: "Stable balance: stiffen the front bar, soften the rear (more rear grip) and add rear toe-in. The rear stays planted and predictable: key to keep it in line on fast gravel.",
    },
  },
  {
    id: "balance_agile",
    when: (c) => c.balance === "agile",
    adjust: [
      { paramId: "arb_front", delta: -10 },
      { paramId: "arb_rear", delta: 10 },
      { paramId: "diff_rear_coast", delta: -4, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Balance ágil: ablandamos la barra delantera, endurecemos la trasera y bajamos el bloqueo de frenada trasero (menos bloqueo al levantar = más rotación de entrada). El coche gira más al soltar gas, para llevarlo cruzado.",
      en: "Agile balance: soften the front bar, stiffen the rear and lower the rear coast lock (less lock on lift = more entry rotation). The car rotates more off-throttle, to carry it sideways.",
    },
  },
  {
    id: "smoothness_smooth",
    when: (c) => c.smoothness === "smooth",
    adjust: [
      { paramId: "damper_fast_bump_front", delta: -4 },
      { paramId: "damper_fast_bump_rear", delta: -4 },
    ],
    reason: {
      es: "Respuesta suave: bajamos la compresión rápida para que las ruedas copien baches y cortes con calma. El coche flota más sobre el terreno roto, menos nervioso.",
      en: "Smooth response: lower fast bump so the wheels follow bumps and cuts calmly. The car floats more over rough terrain, less nervous.",
    },
  },
  {
    id: "smoothness_aggressive",
    when: (c) => c.smoothness === "aggressive",
    adjust: [
      { paramId: "damper_fast_bump_front", delta: 4 },
      { paramId: "damper_fast_bump_rear", delta: 4 },
    ],
    reason: {
      es: "Respuesta agresiva: subimos la compresión rápida para una plataforma firme y directa que responde inmediato a los cambios de dirección, a cambio de saltar más en baches.",
      en: "Aggressive response: raise fast bump for a firm, direct platform that responds instantly to direction changes, at the cost of skipping more over bumps.",
    },
  },
  {
    id: "level_beginner",
    when: (c) => c.driverLevel === "beginner",
    adjust: [
      { paramId: "brake_force", delta: -150 },
      { paramId: "brake_bias", delta: 2 },
      { paramId: "diff_rear_power", delta: 4, excludeDrivetrains: ["fwd"] },
    ],
    reason: {
      es: "Nivel principiante: bajamos la fuerza de freno y adelantamos un poco el reparto para reducir bloqueos, y subimos el bloqueo de conducción trasero para más tracción estable. Más fácil de frenar y acelerar sin sustos.",
      en: "Beginner level: lower brake force and move bias slightly forward to reduce lock-ups, and raise the rear power lock for more stable traction. Easier to brake and accelerate without scares.",
    },
  },
  {
    id: "level_pro",
    when: (c) => c.driverLevel === "pro",
    adjust: [
      { paramId: "brake_force", delta: 100 },
    ],
    reason: {
      es: "Nivel pro: subimos la fuerza de freno para frenadas más mordientes y tardías. Exige dosificar el pedal con el pie para no bloquear en superficie suelta.",
      en: "Pro level: raise brake force for sharper, later braking. Demands modulating the pedal by foot to avoid locking on loose surfaces.",
    },
  },
];

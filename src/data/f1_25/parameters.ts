import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de F1 25 (EA Sports / Codemasters) con su capa educativa.
// Cada parámetro explica qué hace y qué pasa al subir/bajar el valor. Rangos
// representativos del juego según las guías de la comunidad (F1Laps, SimRacingSetup,
// Traxion). Ojo: F1 25 ELIMINÓ el ajuste de Engine Braking que existía en F1 24, y
// no expone relaciones de marchas ajustables. La altura usa pasos numéricos del
// juego (no mm reales). Valores y límites ajustables/expandibles sin tocar el motor.
//
// Escalas verificadas (auditoría 2026-06-23, corrige la escala vieja estilo F1 22):
//   ARB delantera/trasera = 1-21 · Suspensión delantera/trasera = 1-41
//   Altura delantera ≈ 10-40 (típico ~20) · Altura trasera ≈ 40-55 (típico ~45)
//   Diferencial on-throttle 0-100 · off-throttle 10-100
//   Presión delantera máx ~29.5 psi · trasera máx ~26.5 psi
// PENDIENTE: los `default` de suspensión (21) y altura son baselines de mitad de
// escala; confirmar el valor exacto del garaje del juego.
// CALIBRACIÓN DE DELTAS (revisada 2026-06-24): las magnitudes de delta de rules.ts
// se recalibraron a estas escalas nuevas. Suspensión 1-41: los deltas de mojado se
// llevaron a -6 (15% del rango) y los de bouncing/kerb a -4 (10%), porque -1/-2
// sobre un rango de 40 era imperceptible (~2-5%). Ver auditoría adversarial del
// pendiente #2 del HANDOFF.
export const f1_25Parameters: ParameterDef[] = [
  {
    id: "front_wing",
    group: "aero",
    name: { es: "Ala delantera", en: "Front wing" },
    unit: "",
    min: 0,
    max: 50,
    step: 1,
    default: 25,
    whatItDoes: {
      es: "Ángulo del ala delantera: genera carga aerodinámica en el tren delantero. Más ala = más agarre adelante y mejor giro/entrada de curva, pero más resistencia (drag) y menos velocidad punta.",
      en: "Front wing angle: makes downforce on the front axle. More wing = more front grip and better turn-in, but more drag and less top speed.",
    },
    increaseEffect: {
      es: "Más carga delantera: el auto entra y gira mejor (menos subviraje), a costa de más drag y menor velocidad en recta.",
      en: "More front load: the car turns in better (less understeer), at the cost of more drag and lower straight-line speed.",
    },
    decreaseEffect: {
      es: "Menos carga delantera: más velocidad punta, pero el frente agarra menos y aparece subviraje.",
      en: "Less front load: more top speed, but the front grips less and understeer appears.",
    },
  },
  {
    id: "rear_wing",
    group: "aero",
    name: { es: "Ala trasera", en: "Rear wing" },
    unit: "",
    min: 0,
    max: 50,
    step: 1,
    default: 25,
    whatItDoes: {
      es: "Ángulo del ala trasera: genera carga aerodinámica atrás. Es el ajuste que más impacta en la velocidad máxima. Más ala = cola más estable; menos ala = más punta pero zaga nerviosa.",
      en: "Rear wing angle: makes downforce at the rear. It's the setting that most affects top speed. More wing = more stable rear; less wing = more top speed but a nervous rear.",
    },
    increaseEffect: {
      es: "Más carga trasera: cola más estable y menos sobreviraje en curvas rápidas y frenada, a costa de drag y velocidad punta.",
      en: "More rear load: more stable rear and less oversteer in fast corners and braking, at the cost of drag and top speed.",
    },
    decreaseEffect: {
      es: "Menos carga trasera: mucha más velocidad en recta, pero la cola se vuelve nerviosa e inestable a alta velocidad.",
      en: "Less rear load: much more straight-line speed, but the rear gets nervous and unstable at high speed.",
    },
  },
  {
    id: "diff_on_throttle",
    group: "differential",
    name: { es: "Diferencial con acelerador (on-throttle)", en: "On-throttle differential" },
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    default: 75,
    whatItDoes: {
      es: "Cuánto se bloquea el diferencial al acelerar. Más alto = las ruedas traseras giran más juntas: más tracción en recta, pero más subviraje al pisar el gas en curva.",
      en: "How much the diff locks under throttle. Higher = the rear wheels turn more together: more straight-line traction, but more understeer when getting on the power in a corner.",
    },
    increaseEffect: {
      es: "Más bloqueo: más tracción y mejor salida de curva en recta, a costa de subviraje al acelerar dentro de la curva.",
      en: "More lock: more traction and better corner exit onto a straight, at the cost of understeer when accelerating mid-corner.",
    },
    decreaseEffect: {
      es: "Menos bloqueo: el auto rota mejor al acelerar y reduce el riesgo de trompo, pero pierde tracción pura.",
      en: "Less lock: the car rotates better on throttle and reduces spin risk, but loses pure traction.",
    },
  },
  {
    id: "diff_off_throttle",
    group: "differential",
    name: { es: "Diferencial sin acelerador (off-throttle)", en: "Off-throttle differential" },
    unit: "%",
    min: 10,
    max: 100,
    step: 1,
    default: 60,
    whatItDoes: {
      es: "Cuánto se bloquea el diferencial al levantar el gas o frenar. Más alto = más estabilidad en la entrada y frenada (menos sobreviraje), pero menos rotación; más bajo = más agilidad al entrar.",
      en: "How much the diff locks when lifting off or braking. Higher = more entry and braking stability (less oversteer), but less rotation; lower = more agility on entry.",
    },
    increaseEffect: {
      es: "Más bloqueo al levantar: la cola queda más estable al frenar y entrar, pero el auto rota menos.",
      en: "More off-throttle lock: the rear stays more stable when braking and entering, but the car rotates less.",
    },
    decreaseEffect: {
      es: "Menos bloqueo al levantar: más rotación y agilidad en la entrada de curva, pero la zaga queda menos estable.",
      en: "Less off-throttle lock: more rotation and agility on corner entry, but the rear is less stable.",
    },
  },
  {
    id: "front_camber",
    group: "alignment",
    name: { es: "Caída (camber) delantera", en: "Front camber" },
    unit: "°",
    min: -3.5,
    max: -2.5,
    step: 0.1,
    default: -3.0,
    whatItDoes: {
      es: "Inclinación de la rueda delantera vista de frente. Más negativo = mejor contacto bajo carga lateral, más agarre en curva, pero menos tracción/frenada en recta y más desgaste del borde interno.",
      en: "Front wheel lean seen from the front. More negative = better contact under lateral load, more cornering grip, but less traction/braking in a straight line and more inner-edge wear.",
    },
    increaseEffect: {
      es: "Hacia 0 (menos negativo): mejor frenada y comportamiento en recta, pero menos agarre lateral en curva.",
      en: "Toward 0 (less negative): better braking and straight-line behaviour, but less lateral grip in corners.",
    },
    decreaseEffect: {
      es: "Más negativo: más agarre lateral en apoyo (en el juego suele convenir camber casi máximo), a costa de frenada y desgaste interno.",
      en: "More negative: more lateral grip while loaded (near-max camber is often best in-game), at the cost of braking and inner wear.",
    },
  },
  {
    id: "rear_camber",
    group: "alignment",
    name: { es: "Caída (camber) trasera", en: "Rear camber" },
    unit: "°",
    min: -2.0,
    max: -1.0,
    step: 0.1,
    default: -1.5,
    whatItDoes: {
      es: "Caída del tren trasero. Más negativo = más agarre lateral de la cola en curva, pero menos tracción pura y más desgaste del borde interno del neumático.",
      en: "Rear axle camber. More negative = more lateral rear grip in corners, but less pure traction and more inner-edge tyre wear.",
    },
    increaseEffect: {
      es: "Hacia 0 (menos negativo): mejor tracción en recta, pero la cola agarra menos de costado en curva.",
      en: "Toward 0 (less negative): better straight-line traction, but the rear grips less laterally in corners.",
    },
    decreaseEffect: {
      es: "Más negativo: más agarre lateral trasero en apoyo, restando algo de tracción y aumentando el desgaste interno.",
      en: "More negative: more lateral rear grip while loaded, costing some traction and increasing inner wear.",
    },
  },
  {
    id: "front_toe",
    group: "alignment",
    name: { es: "Convergencia (toe) delantera", en: "Front toe" },
    unit: "°",
    min: 0.0,
    max: 0.15,
    step: 0.01,
    default: 0.08,
    whatItDoes: {
      es: "Apertura de las ruedas delanteras (toe-out) vista desde arriba. Más valor = giro inicial más agresivo (entra más rápido), pero más drag, menor punta y más desgaste. Conviene mantenerlo conservador (cerca del mínimo).",
      en: "Front wheel splay (toe-out) seen from above. More value = sharper initial turn-in, but more drag, lower top speed and more wear. Best kept conservative (near the minimum).",
    },
    increaseEffect: {
      es: "Más toe-out: respuesta de giro más agresiva al entrar, a costa de drag, velocidad punta y desgaste.",
      en: "More toe-out: more aggressive turn-in response, at the cost of drag, top speed and wear.",
    },
    decreaseEffect: {
      es: "Menos toe-out (cerca de 0): más estable y mejor en recta, con una entrada un poco más perezosa.",
      en: "Less toe-out (near 0): more stable and better in a straight line, with slightly lazier turn-in.",
    },
  },
  {
    id: "rear_toe",
    group: "alignment",
    name: { es: "Convergencia (toe) trasera", en: "Rear toe" },
    unit: "°",
    min: 0.06,
    max: 0.5,
    step: 0.01,
    default: 0.1,
    whatItDoes: {
      es: "Convergencia del tren trasero (toe-in). Más valor = más estabilidad en aceleración/frenada y más tracción, pero más drag, desgaste y menor velocidad punta.",
      en: "Rear axle toe-in. More value = more stability under acceleration/braking and more traction, but more drag, wear and lower top speed.",
    },
    increaseEffect: {
      es: "Más toe-in: la cola queda muy estable al acelerar y frenar, a costa de drag, desgaste y algo de punta.",
      en: "More toe-in: the rear stays very stable under power and braking, at the cost of drag, wear and some top speed.",
    },
    decreaseEffect: {
      es: "Menos toe-in: más velocidad en recta y algo más de rotación, pero la zaga queda menos estable.",
      en: "Less toe-in: more straight-line speed and a bit more rotation, but a less stable rear.",
    },
  },
  {
    id: "front_arb",
    group: "suspension",
    name: { es: "Barra estabilizadora delantera", en: "Front anti-roll bar" },
    unit: "",
    min: 1,
    max: 21,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Cuánto se resiste el eje delantero a balancearse. Más rígida = respuesta más directa y menos balanceo, pero menos agarre mecánico y más subviraje si queda muy dura respecto a la trasera.",
      en: "How much the front axle resists roll. Stiffer = more direct response and less roll, but less mechanical grip and more understeer if too stiff relative to the rear.",
    },
    increaseEffect: {
      es: "Más rígida adelante: respuesta más directa pero más subviraje y menos agarre mecánico en el frente.",
      en: "Stiffer front: more direct response but more understeer and less front mechanical grip.",
    },
    decreaseEffect: {
      es: "Más blanda adelante: más agarre mecánico y mejor comportamiento sobre pianos; corrige subviraje.",
      en: "Softer front: more mechanical grip and better behaviour over kerbs; fixes understeer.",
    },
  },
  {
    id: "rear_arb",
    group: "suspension",
    name: { es: "Barra estabilizadora trasera", en: "Rear anti-roll bar" },
    unit: "",
    min: 1,
    max: 21,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero. Más rígida = más agilidad pero tendencia al sobreviraje y menos tracción. El balance delantera-trasera define el subviraje/sobreviraje mecánico.",
      en: "Rear axle roll resistance. Stiffer = more agility but a tendency to oversteer and less traction. The front-rear balance sets mechanical understeer/oversteer.",
    },
    increaseEffect: {
      es: "Más rígida atrás: más agilidad y rotación, pero la cola se suelta más y pierde tracción.",
      en: "Stiffer rear: more agility and rotation, but the rear steps out more and loses traction.",
    },
    decreaseEffect: {
      es: "Más blanda atrás: más tracción y estabilidad de la cola; corrige sobreviraje.",
      en: "Softer rear: more traction and rear stability; fixes oversteer.",
    },
  },
  {
    id: "front_suspension",
    group: "suspension",
    name: { es: "Rigidez de suspensión delantera", en: "Front suspension stiffness" },
    unit: "",
    min: 1,
    max: 41,
    step: 1,
    default: 21,
    whatItDoes: {
      es: "Dureza del resorte/suspensión delantera. Más dura = respuesta más rápida y menos hundimiento aerodinámico, pero rebota sobre baches y pianos. Circuitos lisos y rápidos piden dura; lentos y bacheados (Mónaco) piden blanda.",
      en: "Front spring/suspension stiffness. Stiffer = quicker response and less aero squat, but bounces over bumps and kerbs. Smooth, fast tracks want stiff; slow, bumpy ones (Monaco) want soft.",
    },
    increaseEffect: {
      es: "Más dura adelante: respuesta más afilada y plataforma aero más estable, pero peor sobre baches y pianos.",
      en: "Stiffer front: sharper response and a more stable aero platform, but worse over bumps and kerbs.",
    },
    decreaseEffect: {
      es: "Más blanda adelante: absorbe mejor baches y pianos y da más agarre mecánico, pero más balanceo y riesgo de tocar fondo.",
      en: "Softer front: absorbs bumps and kerbs better and gives more mechanical grip, but more roll and bottoming risk.",
    },
  },
  {
    id: "rear_suspension",
    group: "suspension",
    name: { es: "Rigidez de suspensión trasera", en: "Rear suspension stiffness" },
    unit: "",
    min: 1,
    max: 41,
    step: 1,
    default: 21,
    whatItDoes: {
      es: "Dureza de la suspensión trasera. Igual que la delantera pero en el tren trasero: afecta la tracción sobre superficies irregulares y la transferencia de peso.",
      en: "Rear suspension stiffness. Same as the front but on the rear axle: it affects traction over uneven surfaces and weight transfer.",
    },
    increaseEffect: {
      es: "Más dura atrás: respuesta más directa y plataforma estable, pero menos tracción sobre baches y pianos.",
      en: "Stiffer rear: more direct response and a stable platform, but less traction over bumps and kerbs.",
    },
    decreaseEffect: {
      es: "Más blanda atrás: mejor tracción sobre superficies irregulares, a costa de más balanceo y respuesta más vaga.",
      en: "Softer rear: better traction over uneven surfaces, at the cost of more roll and vaguer response.",
    },
  },
  {
    id: "front_ride_height",
    group: "suspension",
    name: { es: "Altura delantera", en: "Front ride height" },
    unit: "",
    min: 10,
    max: 40,
    step: 1,
    default: 20,
    whatItDoes: {
      es: "Altura del tren delantero al piso. Más baja = más carga aerodinámica y velocidad, pero riesgo de tocar fondo (bottoming) en baches y compresiones. Más alta = más segura sobre pianos pero menos eficiente.",
      en: "Front floor-to-ground height. Lower = more aero load and speed, but risk of bottoming out over bumps and compressions. Higher = safer over kerbs but less efficient.",
    },
    increaseEffect: {
      es: "Subir adelante: más recorrido para baches y pianos y menos riesgo de tocar fondo, restando algo de carga aero.",
      en: "Raising the front: more travel for bumps and kerbs and less bottoming risk, costing some aero load.",
    },
    decreaseEffect: {
      es: "Bajar adelante: más carga aerodinámica y velocidad, pero arriesga tocar fondo y rebotar.",
      en: "Lowering the front: more aero load and speed, but risks bottoming out and bouncing.",
    },
  },
  {
    id: "rear_ride_height",
    group: "suspension",
    name: { es: "Altura trasera", en: "Rear ride height" },
    unit: "",
    min: 40,
    max: 55,
    step: 1,
    default: 45,
    whatItDoes: {
      es: "Altura del tren trasero. Junto con la delantera define el 'rake' (inclinación). Más rake (trasera más alta) tiende a dar más rotación y carga al difusor.",
      en: "Rear ride height. With the front it sets the 'rake' (attitude). More rake (higher rear) tends to give more rotation and load to the diffuser.",
    },
    increaseEffect: {
      es: "Subir atrás: aumenta el rake, da más rotación y carga aero, hasta volverse inestable si te pasás; también más recorrido sobre baches.",
      en: "Raising the rear: increases rake, adds rotation and aero load, until it gets unstable if overdone; also more travel over bumps.",
    },
    decreaseEffect: {
      es: "Bajar atrás: estabiliza la cola a alta velocidad y baja el centro de gravedad, restando algo de rotación.",
      en: "Lowering the rear: stabilises the rear at high speed and lowers the centre of gravity, costing some rotation.",
    },
  },
  {
    id: "brake_pressure",
    group: "brakes",
    name: { es: "Presión de freno", en: "Brake pressure" },
    unit: "%",
    min: 50,
    max: 100,
    step: 1,
    default: 100,
    whatItDoes: {
      es: "Cuánta fuerza de frenado aplica el sistema. Más alta = más potencia de frenada y menor distancia, pero más riesgo de bloquear ruedas (lock-up). Más baja = frenadas más suaves y controlables pero más largas.",
      en: "How much braking force the system applies. Higher = more braking power and shorter distance, but more risk of locking up. Lower = smoother, more controllable braking but longer.",
    },
    increaseEffect: {
      es: "Más presión: frenadas más cortas y potentes, pero más fácil bloquear las ruedas y hacer planos.",
      en: "More pressure: shorter, more powerful braking, but easier to lock the wheels and flat-spot them.",
    },
    decreaseEffect: {
      es: "Menos presión: frenada más larga pero más fácil de modular sin bloquear, útil en baja adherencia.",
      en: "Less pressure: longer braking but easier to modulate without locking, useful in low grip.",
    },
  },
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Reparto de frenada", en: "Brake bias" },
    unit: "%",
    min: 50,
    max: 70,
    step: 0.5,
    default: 54,
    whatItDoes: {
      es: "Porcentaje de freno enviado al eje delantero. Más adelante = más mordida delantera y protección contra trompos, pero tendencia a subviraje y bloqueo de las delanteras. Compromiso típico ~53-55%.",
      en: "Percentage of braking sent to the front axle. More forward = more front bite and spin protection, but a tendency to understeer and lock the fronts. Typical compromise ~53-55%.",
    },
    increaseEffect: {
      es: "Más adelante: frenada más estable y menos riesgo de trompo, pero más subviraje al frenar y riesgo de bloquear las delanteras.",
      en: "More forward: more stable braking and less spin risk, but more understeer on the brakes and risk of locking the fronts.",
    },
    decreaseEffect: {
      es: "Más atrás: ayuda a rotar al frenar, con riesgo de bloquear la cola y sobreviraje en la entrada.",
      en: "More rearward: helps rotation on the brakes, with risk of locking the rear and entry oversteer.",
    },
  },
  {
    id: "tyre_pressure_front_right",
    group: "tyres",
    name: { es: "Presión neumático delantero derecho", en: "Front-right tyre pressure" },
    unit: "psi",
    min: 21.0,
    max: 29.5,
    step: 0.1,
    default: 23.0,
    whatItDoes: {
      es: "Presión de la rueda delantera derecha. Más baja = más huella y agarre y menos desgaste, pero menos respuesta y más riesgo de sobrecalentar; más alta = más respuesta pero menos agarre. Se busca la mínima dentro de la ventana óptima (~85-105 °C).",
      en: "Front-right tyre pressure. Lower = more contact patch and grip and less wear, but less response and more overheating risk; higher = more response but less grip. Aim for the lowest within the optimal window (~85-105 °C).",
    },
    increaseEffect: {
      es: "Más alta: respuesta más rápida y menos resistencia a la rodadura, pero menos agarre mecánico.",
      en: "Higher: quicker response and less rolling resistance, but less mechanical grip.",
    },
    decreaseEffect: {
      es: "Más baja: más huella y agarre y menor desgaste, hasta que la presión cae tanto que recalienta por flexión.",
      en: "Lower: more contact patch and grip and less wear, until pressure drops so low it overheats from flex.",
    },
  },
  {
    id: "tyre_pressure_front_left",
    group: "tyres",
    name: { es: "Presión neumático delantero izquierdo", en: "Front-left tyre pressure" },
    unit: "psi",
    min: 21.0,
    max: 29.5,
    step: 0.1,
    default: 23.0,
    whatItDoes: {
      es: "Igual que la delantera derecha pero en la rueda delantera izquierda. Suele ajustarse junto con su par para mantener el eje delantero equilibrado.",
      en: "Same as the front-right but on the front-left wheel. Usually adjusted together with its pair to keep the front axle balanced.",
    },
    increaseEffect: {
      es: "Más alta: respuesta más rápida pero menos agarre mecánico en la delantera izquierda.",
      en: "Higher: quicker response but less mechanical grip on the front-left.",
    },
    decreaseEffect: {
      es: "Más baja: más huella y agarre, con riesgo de sobrecalentar si baja demasiado.",
      en: "Lower: more contact patch and grip, with overheating risk if it drops too far.",
    },
  },
  {
    id: "tyre_pressure_rear_right",
    group: "tyres",
    name: { es: "Presión neumático trasero derecho", en: "Rear-right tyre pressure" },
    unit: "psi",
    min: 19.5,
    max: 26.5,
    step: 0.1,
    default: 21.5,
    whatItDoes: {
      es: "Presión de la rueda trasera derecha; afecta directamente la tracción. Mismo principio que adelante, con una ventana de presión algo más baja que el tren delantero.",
      en: "Rear-right tyre pressure; directly affects traction. Same principle as the front, with a slightly lower pressure window than the front axle.",
    },
    increaseEffect: {
      es: "Más alta: respuesta más viva pero menos tracción y agarre atrás; la cola puede soltarse al acelerar.",
      en: "Higher: livelier response but less rear traction and grip; the rear can step out on power.",
    },
    decreaseEffect: {
      es: "Más baja: más tracción y agarre trasero, hasta que la presión cae tanto que recalienta.",
      en: "Lower: more rear traction and grip, until pressure drops so low it overheats.",
    },
  },
  {
    id: "tyre_pressure_rear_left",
    group: "tyres",
    name: { es: "Presión neumático trasero izquierdo", en: "Rear-left tyre pressure" },
    unit: "psi",
    min: 19.5,
    max: 26.5,
    step: 0.1,
    default: 21.5,
    whatItDoes: {
      es: "Igual que la trasera derecha pero en la rueda trasera izquierda. Suele ajustarse junto con su par para mantener el eje trasero equilibrado.",
      en: "Same as the rear-right but on the rear-left wheel. Usually adjusted together with its pair to keep the rear axle balanced.",
    },
    increaseEffect: {
      es: "Más alta: respuesta más viva pero menos tracción en la trasera izquierda.",
      en: "Higher: livelier response but less traction on the rear-left.",
    },
    decreaseEffect: {
      es: "Más baja: más tracción y agarre trasero, con riesgo de sobrecalentar si baja demasiado.",
      en: "Lower: more rear traction and grip, with overheating risk if it drops too far.",
    },
  },
];

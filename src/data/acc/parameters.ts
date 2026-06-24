import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de ACC (GT3) con su capa educativa. Cada parámetro
// explica qué hace y qué pasa al subir/bajar el valor. Valores y rangos
// representativos del juego; ajustables/expandibles sin tocar el motor.
export const accParameters: ParameterDef[] = [
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión neumáticos delanteros", en: "Front tyre pressure" },
    unit: "psi",
    min: 20.3,
    max: 35,
    step: 0.1,
    default: 26.0,
    whatItDoes: {
      es: "Define cuánta huella del neumático toca el piso. En ACC (post-v1.9) la ventana de presión en caliente óptima para GT3 ronda los 26.0-27.0 psi. El mínimo del slider en seco es 20.3 psi (changelog oficial v1.0.8, ajuste pedido por Pirelli).",
      en: "Sets how much of the tyre contacts the road. In ACC (post-v1.9) the optimal hot-pressure window for GT3 is around 26.0-27.0 psi. The dry slider minimum is 20.3 psi (official v1.0.8 changelog, per Pirelli request).",
    },
    increaseEffect: {
      es: "Respuesta más rápida pero menos agarre y más temperatura; si te pasás, el neumático se 'globea' y patina.",
      en: "Sharper response but less grip and more heat; too high and the tyre balloons and slides.",
    },
    decreaseEffect: {
      es: "Más huella y agarre mecánico, pero respuesta más vaga y riesgo de sobrecalentar por flexión.",
      en: "More contact patch and mechanical grip, but vaguer response and risk of overheating from flex.",
    },
  },
  {
    id: "tyre_pressure_rear",
    group: "tyres",
    name: { es: "Presión neumáticos traseros", en: "Rear tyre pressure" },
    unit: "psi",
    min: 20.5,
    max: 35,
    step: 0.1,
    default: 26.0,
    whatItDoes: {
      es: "Igual que adelante pero en el tren trasero: afecta tracción y estabilidad de la cola.",
      en: "Same as front but on the rear axle: affects traction and rear stability.",
    },
    increaseEffect: {
      es: "Cola más nerviosa y con menos agarre; puede soltar al acelerar.",
      en: "Twitchier rear with less grip; can step out on power.",
    },
    decreaseEffect: {
      es: "Más tracción y estabilidad atrás, hasta que la presión cae tanto que recalienta.",
      en: "More traction and rear stability, until pressure drops so low it overheats.",
    },
  },
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Caída (camber) delantera", en: "Front camber" },
    unit: "°",
    min: -4.0,
    max: -1.0,
    step: 0.1,
    default: -3.4,
    whatItDoes: {
      es: "Inclinación de la rueda vista de frente. Más negativo = más agarre en curva, menos en recta/frenada.",
      en: "Wheel lean seen from the front. More negative = more cornering grip, less under braking/straights.",
    },
    increaseEffect: {
      es: "Subir hacia 0 (menos negativo) mejora frenada y desgaste parejo, pero baja el agarre en apoyo.",
      en: "Toward 0 (less negative) improves braking and even wear, but lowers grip while loaded.",
    },
    decreaseEffect: {
      es: "Más negativo da más agarre lateral en curva, a costa de frenada y temperatura del borde interno.",
      en: "More negative gives more lateral grip in corners, costing braking and inner-edge temps.",
    },
  },
  {
    id: "camber_rear",
    group: "alignment",
    name: { es: "Caída (camber) trasera", en: "Rear camber" },
    unit: "°",
    min: -3.5,
    max: -1.0,
    step: 0.1,
    default: -2.6,
    whatItDoes: {
      es: "Caída del tren trasero: controla cuánto agarre lateral tiene la cola en curva.",
      en: "Rear axle camber: controls how much lateral grip the rear has in corners.",
    },
    increaseEffect: {
      es: "Hacia 0 mejora tracción en recta pero la cola agarra menos de costado.",
      en: "Toward 0 improves straight-line traction but the rear grips less laterally.",
    },
    decreaseEffect: {
      es: "Más negativo estabiliza la cola en apoyo, restando algo de tracción pura.",
      en: "More negative stabilises the rear when loaded, costing some pure traction.",
    },
  },
  {
    id: "toe_front",
    group: "alignment",
    name: { es: "Convergencia (toe) delantera", en: "Front toe" },
    unit: "°",
    min: -0.4,
    max: 0.3,
    step: 0.01,
    default: -0.08,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas vistas desde arriba. Negativo (toe-out) = más reactivo al doblar.",
      en: "Where the wheels point seen from above. Negative (toe-out) = sharper turn-in.",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo) da más estabilidad en recta pero entra más perezoso.",
      en: "Toward toe-in (positive) adds straight-line stability but lazier turn-in.",
    },
    decreaseEffect: {
      es: "Más toe-out agiliza la entrada, con algo más de nerviosismo y desgaste.",
      en: "More toe-out sharpens entry, with a bit more nervousness and wear.",
    },
  },
  {
    id: "toe_rear",
    group: "alignment",
    name: { es: "Convergencia (toe) trasera", en: "Rear toe" },
    unit: "°",
    min: 0.0,
    max: 0.5,
    step: 0.01,
    default: 0.18,
    whatItDoes: {
      es: "Convergencia del tren trasero. Más toe-in = más estabilidad de la cola.",
      en: "Rear axle toe. More toe-in = more rear stability.",
    },
    increaseEffect: {
      es: "Más toe-in estabiliza muchísimo la cola al acelerar, a costa de un pelín de velocidad punta.",
      en: "More toe-in greatly stabilises the rear on power, costing a touch of top speed.",
    },
    decreaseEffect: {
      es: "Menos toe-in libera la cola y da más rotación, pero con menos estabilidad.",
      en: "Less toe-in frees the rear for more rotation, but less stability.",
    },
  },
  {
    id: "arb_front",
    group: "suspension",
    name: { es: "Barra estabilizadora delantera", en: "Front anti-roll bar" },
    unit: "",
    min: 0,
    max: 10,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Cuánto se resiste el eje delantero a balancearse. Más dura = menos agarre delantero relativo.",
      en: "How much the front axle resists roll. Stiffer = less relative front grip.",
    },
    increaseEffect: {
      es: "Más dura adelante = más subviraje (el frente desliza antes). Útil si la cola está suelta.",
      en: "Stiffer front = more understeer (front slides first). Useful if the rear is loose.",
    },
    decreaseEffect: {
      es: "Más blanda adelante = más agarre y rotación en el frente; corrige subviraje.",
      en: "Softer front = more front grip and rotation; fixes understeer.",
    },
  },
  {
    id: "arb_rear",
    group: "suspension",
    name: { es: "Barra estabilizadora trasera", en: "Rear anti-roll bar" },
    unit: "",
    min: 0,
    max: 10,
    step: 1,
    default: 3,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero. Más dura = cola más reactiva y menos agarre atrás.",
      en: "Rear axle roll resistance. Stiffer = sharper rear and less rear grip.",
    },
    increaseEffect: {
      es: "Más dura atrás = más rotación/sobreviraje; ayuda contra el subviraje pero suelta la cola.",
      en: "Stiffer rear = more rotation/oversteer; helps understeer but loosens the rear.",
    },
    decreaseEffect: {
      es: "Más blanda atrás = más tracción y estabilidad de la cola; corrige sobreviraje.",
      en: "Softer rear = more traction and rear stability; fixes oversteer.",
    },
  },
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Altura delantera", en: "Front ride height" },
    unit: "mm",
    min: 50,
    max: 82,
    step: 1,
    default: 55,
    whatItDoes: {
      es: "Distancia del piso al suelo adelante. Más baja = más carga aerodinámica y centro de gravedad bajo.",
      en: "Front floor-to-ground distance. Lower = more aero load and lower centre of gravity.",
    },
    increaseEffect: {
      es: "Subir da más recorrido para pianos/baches y menos riesgo de tocar fondo, restando algo de agarre.",
      en: "Raising gives more travel for kerbs/bumps and less bottoming, costing some grip.",
    },
    decreaseEffect: {
      es: "Bajar aumenta el agarre aerodinámico y la respuesta, pero arriesga tocar fondo y rebotar.",
      en: "Lowering increases aero grip and response, but risks bottoming out and bouncing.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Altura trasera", en: "Rear ride height" },
    unit: "mm",
    min: 50,
    max: 95,
    step: 1,
    default: 64,
    whatItDoes: {
      es: "Altura del tren trasero. Junto con la delantera define el 'rake' (inclinación) que carga el difusor.",
      en: "Rear ride height. With the front it sets the 'rake' that loads the diffuser.",
    },
    increaseEffect: {
      es: "Subir atrás aumenta el rake: más carga aero y rotación, hasta volverse inestable si te pasás.",
      en: "Raising the rear adds rake: more aero load and rotation, until it gets unstable if overdone.",
    },
    decreaseEffect: {
      es: "Bajar atrás estabiliza la cola en alta velocidad, restando algo de rotación.",
      en: "Lowering the rear stabilises the car at high speed, costing some rotation.",
    },
  },
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Reparto de frenada", en: "Brake bias" },
    unit: "%",
    min: 50,
    max: 70,
    step: 0.2,
    default: 57.0,
    whatItDoes: {
      es: "Porcentaje de freno que va al eje delantero. Más alto = más freno adelante.",
      en: "Percentage of braking sent to the front axle. Higher = more front brake.",
    },
    increaseEffect: {
      es: "Más adelante = frenada más estable, pero más riesgo de bloquear las delanteras y subvirar al frenar.",
      en: "More forward = more stable braking, but more risk of locking the fronts and understeering.",
    },
    decreaseEffect: {
      es: "Más atrás ayuda a rotar al frenar, con riesgo de bloquear la cola e inestabilidad.",
      en: "More rearward helps rotation on the brakes, with risk of locking the rear and instability.",
    },
  },
  {
    id: "rear_wing",
    group: "aero",
    name: { es: "Ala trasera", en: "Rear wing" },
    unit: "",
    min: 0,
    max: 12,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Ángulo del alerón trasero: genera carga aerodinámica atrás. Más ala = más agarre, menos punta.",
      en: "Rear wing angle: makes downforce at the rear. More wing = more grip, less top speed.",
    },
    increaseEffect: {
      es: "Más ala estabiliza la cola en curvas rápidas y frenada, a costa de velocidad en recta.",
      en: "More wing stabilises the rear in fast corners and braking, costing straight-line speed.",
    },
    decreaseEffect: {
      es: "Menos ala da más velocidad punta pero la cola se vuelve nerviosa en alta velocidad.",
      en: "Less wing gives more top speed but the rear gets nervous at high speed.",
    },
  },
  {
    id: "diff_preload",
    group: "differential",
    name: { es: "Precarga del diferencial", en: "Differential preload" },
    unit: "Nm",
    min: 20,
    max: 300,
    step: 10,
    default: 80,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial ante cambios suaves de acelerador. En ACC, una precarga alta da tracción y estabilidad de salida pero puede sobrevirar al acelerar fuerte; una baja libera rotación pero puede subvirar en la salida.",
      en: "How much the diff locks under gentle throttle changes. In ACC, high preload gives exit traction and stability but can oversteer under hard throttle; low preload frees rotation but can understeer on exit.",
    },
    increaseEffect: {
      es: "Más precarga = más bloqueo: mejor tracción y estabilidad de salida, pero demasiada tiende a soltar la cola de golpe al acelerar fuerte.",
      en: "More preload = more locking: better exit traction and stability, but too much tends to snap the rear loose under hard throttle.",
    },
    decreaseEffect: {
      es: "Menos precarga libera la rotación, pero si es muy baja la cola 'no engancha' y aparece subviraje al salir con gas.",
      en: "Less preload frees rotation, but if it's too low the rear won't hook up and you get understeer on power-down.",
    },
  },
  {
    id: "tc",
    group: "electronics",
    name: { es: "Control de tracción (TC)", en: "Traction control (TC)" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Cuánto corta el motor para evitar que patinen las ruedas al acelerar. Más alto = interviene antes.",
      en: "How much it cuts power to stop wheelspin on throttle. Higher = intervenes earlier.",
    },
    increaseEffect: {
      es: "Más TC = más seguro en mojado o baja adherencia, pero limita la aceleración en seco.",
      en: "More TC = safer in the wet or low grip, but limits acceleration in the dry.",
    },
    decreaseEffect: {
      es: "Menos TC = más aceleración pura si sabes dosificar; más riesgo de irte de cola.",
      en: "Less TC = more raw acceleration if you can modulate; more risk of the rear stepping out.",
    },
  },
  {
    id: "abs",
    group: "electronics",
    name: { es: "ABS", en: "ABS" },
    unit: "",
    min: 0,
    max: 6,
    step: 1,
    default: 3,
    whatItDoes: {
      es: "Cuánto evita el bloqueo de ruedas al frenar. Más alto = más intervención.",
      en: "How much it prevents wheel lock under braking. Higher = more intervention.",
    },
    increaseEffect: {
      es: "Más ABS = frenadas más seguras y menos planos, sobre todo en mojado; frenada un poco más larga.",
      en: "More ABS = safer braking and fewer flat-spots, especially in the wet; slightly longer braking.",
    },
    decreaseEffect: {
      es: "Menos ABS = frenada más corta y con más tacto, pero más riesgo de bloquear.",
      en: "Less ABS = shorter, more tactile braking, but more risk of locking up.",
    },
  },
];

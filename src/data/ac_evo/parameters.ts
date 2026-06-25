import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de Assetto Corsa EVO (Early Access v0.7.1) con su capa
// educativa. RECONSTRUIDO 1:1 contra una captura in-game del editor real (modo
// Carrera, Porsche 992 GT3 R, preset de fábrica). El editor de AC EVO tiene SOLO
// 6 pestañas: Neumáticos, Electrónica, Combustible y Estrategia, Suspensión,
// Amortiguadores y Aero. NO hay pestaña de caja de cambios ni de frenos aparte
// (la frenada vive en Suspensión como "Distribución de Frenada"). Por eso este
// set NO incluye final drive, diff power/coast, presión/ductos de freno ni
// splitter delantero: ese coche/juego no los expone. Los amortiguadores son SOLO
// lentos (compresión/extensión), sin canales rápidos. Defaults = valores exactos
// de la captura. Los min/max son ESTIMADOS (el editor no muestra los topes en
// pantalla), elegidos para dejar el default holgado, ser plausibles para la clase
// y no recortar los deltas de las reglas. Unidades exactas del juego: muelle en
// N/m, índice de tope en N, amplitud de tope en mm, presión en psi, ángulos en °.
export const ac_evoParameters: ParameterDef[] = [
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión neumáticos delanteros", en: "Front tyre pressure" },
    unit: "psi",
    min: 18.0,
    max: 35.0,
    step: 0.1,
    default: 26.0,
    whatItDoes: {
      es: "Define cuánta huella del neumático toca el piso. En AC EVO el HUD marca con color la presión: azul (frío), verde (óptimo) y naranja/rojo (caliente). Apuntá a la zona verde en caliente.",
      en: "Sets how much of the tyre contacts the road. In AC EVO the HUD colour-codes pressure: blue (cold), green (optimal) and orange/red (hot). Aim for the green zone when hot.",
    },
    increaseEffect: {
      es: "Respuesta más directa y menos resistencia, pero menos huella de contacto y menos agarre si te pasás; el neumático se 'globea' y patina.",
      en: "Sharper response and less drag, but smaller contact patch and less grip if overdone; the tyre balloons and slides.",
    },
    decreaseEffect: {
      es: "Más huella y agarre mecánico y absorbe mejor los baches, pero genera más calor por flexión y la respuesta se vuelve vaga.",
      en: "More contact patch and mechanical grip, absorbs bumps better, but builds more heat from flex and the response gets vague.",
    },
  },
  {
    id: "tyre_pressure_rear",
    group: "tyres",
    name: { es: "Presión neumáticos traseros", en: "Rear tyre pressure" },
    unit: "psi",
    min: 18.0,
    max: 35.0,
    step: 0.1,
    default: 25.5,
    whatItDoes: {
      es: "Igual que adelante pero en el tren trasero: afecta tracción y estabilidad de la cola. Usa la guía de color del HUD para llegar al objetivo en caliente.",
      en: "Same as front but on the rear axle: affects traction and rear stability. Use the HUD colour guide to hit the hot target.",
    },
    increaseEffect: {
      es: "Cola más nerviosa y con menos agarre; puede soltar al acelerar.",
      en: "Twitchier rear with less grip; can step out on power.",
    },
    decreaseEffect: {
      es: "Más tracción y estabilidad atrás, hasta que la presión cae tanto que recalienta y la respuesta se enchicla.",
      en: "More traction and rear stability, until pressure drops so low it overheats and the response gets mushy.",
    },
  },
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Caída (camber) delantera", en: "Front camber" },
    unit: "°",
    min: -5.0,
    max: -1.0,
    step: 0.1,
    default: -4.0,
    whatItDoes: {
      es: "Inclinación de la rueda vista de frente. Más negativo apoya mejor el neumático cuando el auto rola en curva, dando más agarre lateral.",
      en: "Wheel lean seen from the front. More negative loads the tyre better as the car rolls in a corner, giving more lateral grip.",
    },
    increaseEffect: {
      es: "Subir hacia 0 (menos negativo) mejora frenada, tracción en recta y desgaste parejo, pero baja el agarre en apoyo.",
      en: "Toward 0 (less negative) improves braking, straight-line traction and even wear, but lowers grip while loaded.",
    },
    decreaseEffect: {
      es: "Más negativo da más agarre lateral en curva, a costa de frenada/tracción y de recalentar el borde interno.",
      en: "More negative gives more lateral cornering grip, costing braking/traction and overheating the inner edge.",
    },
  },
  {
    id: "camber_rear",
    group: "alignment",
    name: { es: "Caída (camber) trasera", en: "Rear camber" },
    unit: "°",
    min: -4.5,
    max: -1.0,
    step: 0.1,
    default: -3.5,
    whatItDoes: {
      es: "Caída del tren trasero: controla cuánto agarre lateral tiene la cola en curva. El balance entre caída delantera y trasera afecta el sub/sobreviraje.",
      en: "Rear axle camber: controls how much lateral grip the rear has in corners. The front/rear camber balance affects under/oversteer.",
    },
    increaseEffect: {
      es: "Hacia 0 mejora tracción en aceleración pero la cola agarra menos de costado.",
      en: "Toward 0 improves acceleration traction but the rear grips less laterally.",
    },
    decreaseEffect: {
      es: "Más negativo estabiliza la cola en apoyo, restando algo de tracción pura.",
      en: "More negative stabilises the rear when loaded, costing some pure traction.",
    },
  },
  {
    id: "caster",
    group: "alignment",
    name: { es: "Avance (caster)", en: "Caster" },
    unit: "°",
    min: 1.0,
    max: 9.0,
    step: 0.5,
    default: 3.0,
    whatItDoes: {
      es: "Inclinación del eje de dirección (en el editor: 'Ángulo de avance'). Más caster genera más caída dinámica al girar (más agarre en curva) y mejora el autocentrado y el feedback del volante.",
      en: "Steering-axis tilt (in the editor: 'caster angle'). More caster generates more dynamic camber when turning (more cornering grip) and improves self-centering and wheel feedback.",
    },
    increaseEffect: {
      es: "Más agarre en apoyo y dirección más estable con mejor feedback, a costa de un volante más pesado.",
      en: "More grip while loaded and steadier steering with better feedback, at the cost of a heavier wheel.",
    },
    decreaseEffect: {
      es: "Volante más liviano y rápido, pero con menos caída dinámica y menos autocentrado.",
      en: "Lighter, quicker wheel, but less dynamic camber and less self-centering.",
    },
  },
  {
    id: "toe_front",
    group: "alignment",
    name: { es: "Convergencia (toe) delantera", en: "Front toe" },
    unit: "°",
    min: -0.5,
    max: 0.5,
    step: 0.05,
    default: -0.10,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas vistas desde arriba (en el editor: 'Alineación'). Negativo (toe-out) = más reactivo al doblar; positivo (toe-in) = más estable.",
      en: "Where the wheels point seen from above (in the editor: 'alignment'). Negative (toe-out) = sharper turn-in; positive (toe-in) = more stable.",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo) da más estabilidad en recta pero entra más perezoso a la curva.",
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
    min: -0.3,
    max: 0.5,
    step: 0.05,
    default: 0.10,
    whatItDoes: {
      es: "Convergencia del tren trasero. Más toe-in da mucha estabilidad y tracción en salida; toe-out trasero vuelve el auto muy nervioso.",
      en: "Rear axle toe. More toe-in gives strong stability and exit traction; rear toe-out makes the car very twitchy.",
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
    max: 15,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Cuánto se resiste el eje delantero a balancearse. Más dura = menos balanceo pero menos agarre delantero relativo.",
      en: "How much the front axle resists roll. Stiffer = less roll but less relative front grip.",
    },
    increaseEffect: {
      es: "Más dura adelante = más subviraje en entrada (el frente desliza antes). Útil si la cola está suelta.",
      en: "Stiffer front = more entry understeer (front slides first). Useful if the rear is loose.",
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
    max: 15,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero. Se usa junto con la delantera para ajustar el balance lateral del auto.",
      en: "Rear axle roll resistance. Used together with the front to tune the car's lateral balance.",
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
    id: "spring_rate_front",
    group: "suspension",
    name: { es: "Dureza de muelle delantero", en: "Front spring rate" },
    unit: "N/m",
    min: 120000,
    max: 420000,
    step: 1000,
    default: 340000,
    whatItDoes: {
      es: "Rigidez del resorte delantero (en el editor: 'Tasa de suspensión'). Muelles más duros dan menos balanceo y respuesta más directa, pero menos agarre mecánico sobre baches y pianos.",
      en: "Front spring stiffness (in the editor: 'suspension rate'). Stiffer springs give less roll and a more direct response, but less mechanical grip over bumps and kerbs.",
    },
    increaseEffect: {
      es: "Más duro adelante = plataforma más firme y respuesta más rápida, pero tiende a subviraje y copia peor el piso.",
      en: "Stiffer front = firmer platform and quicker response, but tends to understeer and follows the road worse.",
    },
    decreaseEffect: {
      es: "Más blando adelante = más agarre mecánico y rotación en el frente, con más balanceo y hundimiento en frenada.",
      en: "Softer front = more mechanical grip and front rotation, with more roll and dive under braking.",
    },
  },
  {
    id: "spring_rate_rear",
    group: "suspension",
    name: { es: "Dureza de muelle trasero", en: "Rear spring rate" },
    unit: "N/m",
    min: 120000,
    max: 420000,
    step: 1000,
    default: 360000,
    whatItDoes: {
      es: "Rigidez del resorte trasero. Define cuánto trabaja el tren trasero y cómo se reparte el peso en transiciones.",
      en: "Rear spring stiffness. Sets how much the rear axle works and how weight transfers in transitions.",
    },
    increaseEffect: {
      es: "Más duro atrás = más rotación/sobreviraje y mejor respuesta, pero menos tracción sobre superficies irregulares.",
      en: "Stiffer rear = more rotation/oversteer and sharper response, but less traction over uneven surfaces.",
    },
    decreaseEffect: {
      es: "Más blando atrás = más agarre y tracción de la cola, con más balanceo y cuclillas en aceleración.",
      en: "Softer rear = more rear grip and traction, with more roll and squat on acceleration.",
    },
  },
  {
    id: "bumpstop_rate_front",
    group: "suspension",
    name: { es: "Dureza del tope delantero", en: "Front bumpstop rate" },
    unit: "N",
    min: 0,
    max: 8000,
    step: 100,
    default: 4000,
    whatItDoes: {
      es: "Rigidez al final del recorrido de la suspensión delantera (en el editor: 'Índice del tope'). Controla qué tan brusca es la transición cuando la suspensión toca el tope; clave para autos con efecto suelo.",
      en: "Front suspension end-of-travel stiffness (in the editor: 'bumpstop index'). Controls how abrupt the transition is when the suspension hits the stop; key for ground-effect cars.",
    },
    increaseEffect: {
      es: "Tope más duro = plataforma más firme cerca del tope, pero golpe más brusco que puede desestabilizar.",
      en: "Stiffer stop = firmer platform near the limit, but a harsher hit that can unsettle the car.",
    },
    decreaseEffect: {
      es: "Tope más blando = transición más suave al final del recorrido, pero menos control de la plataforma.",
      en: "Softer stop = smoother transition at the end of travel, but less platform control.",
    },
  },
  {
    id: "bumpstop_rate_rear",
    group: "suspension",
    name: { es: "Dureza del tope trasero", en: "Rear bumpstop rate" },
    unit: "N",
    min: 0,
    max: 8000,
    step: 100,
    default: 4000,
    whatItDoes: {
      es: "Igual que el tope delantero pero en el tren trasero: rigidez al final del recorrido de la suspensión trasera.",
      en: "Same as the front bumpstop but on the rear axle: end-of-travel stiffness of the rear suspension.",
    },
    increaseEffect: {
      es: "Tope más duro = plataforma trasera más firme cerca del tope, con golpe más brusco.",
      en: "Stiffer stop = firmer rear platform near the limit, with a harsher hit.",
    },
    decreaseEffect: {
      es: "Tope más blando = transición trasera más suave al final del recorrido, con menos control de plataforma.",
      en: "Softer stop = smoother rear transition at the end of travel, with less platform control.",
    },
  },
  {
    id: "bumpstop_range_front",
    group: "suspension",
    name: { es: "Recorrido hasta el tope delantero", en: "Front bumpstop range" },
    unit: "mm",
    min: 0,
    max: 50,
    step: 1,
    default: 15,
    whatItDoes: {
      es: "Cuánto comprime la suspensión delantera antes de tocar el tope (en el editor: 'Amplitud del tope'). Menos rango = el auto 'aterriza' antes sobre el tope (plataforma más firme); más rango = más viaje libre.",
      en: "How far the front suspension compresses before hitting the stop (in the editor: 'bumpstop range'). Less range = the car 'lands' on the stop sooner (firmer platform); more range = more free travel.",
    },
    increaseEffect: {
      es: "Más rango = más recorrido libre y suspensión que trabaja más antes del tope; mejor sobre baches.",
      en: "More range = more free travel and suspension working longer before the stop; better over bumps.",
    },
    decreaseEffect: {
      es: "Menos rango = el frente se apoya antes en el tope, dando plataforma firme para cargar aero, con riesgo de brusquedad.",
      en: "Less range = the front rests on the stop sooner, giving a firm platform to load aero, with a risk of harshness.",
    },
  },
  {
    id: "bumpstop_range_rear",
    group: "suspension",
    name: { es: "Recorrido hasta el tope trasero", en: "Rear bumpstop range" },
    unit: "mm",
    min: 0,
    max: 50,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Cuánto comprime la suspensión trasera antes de tocar el tope. Menos rango fija antes la plataforma trasera; más rango da más viaje libre atrás.",
      en: "How far the rear suspension compresses before hitting the stop. Less range fixes the rear platform sooner; more range gives more free rear travel.",
    },
    increaseEffect: {
      es: "Más rango = más recorrido libre atrás; mejor sobre baches y pianos.",
      en: "More range = more free rear travel; better over bumps and kerbs.",
    },
    decreaseEffect: {
      es: "Menos rango = la cola se apoya antes en el tope, dando plataforma firme para cargar aero, con riesgo de brusquedad.",
      en: "Less range = the rear rests on the stop sooner, giving a firm platform to load aero, with a risk of harshness.",
    },
  },
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Altura delantera", en: "Front ride height" },
    unit: "mm",
    min: 40,
    max: 100,
    step: 1,
    default: 60,
    whatItDoes: {
      es: "Distancia del piso al suelo adelante. Más baja = centro de gravedad más bajo y más carga aerodinámica/efecto suelo. Junto con la trasera define el 'rake' (inclinación).",
      en: "Front floor-to-ground distance. Lower = lower centre of gravity and more aero load/ground effect. With the rear it sets the 'rake'.",
    },
    increaseEffect: {
      es: "Subir da más recorrido para pianos/baches y menos riesgo de tocar fondo, restando algo de agarre aero.",
      en: "Raising gives more travel for kerbs/bumps and less bottoming, costing some aero grip.",
    },
    decreaseEffect: {
      es: "Bajar aumenta el agarre aerodinámico y la respuesta, pero arriesga rozar el piso (bottoming) e inestabilidad.",
      en: "Lowering increases aero grip and response, but risks bottoming out and instability.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Altura trasera", en: "Rear ride height" },
    unit: "mm",
    min: 50,
    max: 120,
    step: 1,
    default: 75,
    whatItDoes: {
      es: "Altura del tren trasero. Debería ser mayor que la delantera (rake positivo). Más rake = más rotación y carga aero; reducir el offset estabiliza.",
      en: "Rear ride height. It should be higher than the front (positive rake). More rake = more rotation and aero load; reducing the offset stabilises.",
    },
    increaseEffect: {
      es: "Subir atrás aumenta el rake: más carga aero y rotación, hasta volverse inestable si te pasás.",
      en: "Raising the rear adds rake: more aero load and rotation, until it gets unstable if overdone.",
    },
    decreaseEffect: {
      es: "Bajar atrás reduce el rake y estabiliza la cola en alta velocidad, restando algo de rotación.",
      en: "Lowering the rear reduces rake and stabilises the car at high speed, costing some rotation.",
    },
  },
  {
    id: "steering_ratio",
    group: "suspension",
    name: { es: "Relación de giro del volante", en: "Steering ratio" },
    unit: "",
    min: 8,
    max: 20,
    step: 1,
    default: 15,
    whatItDoes: {
      es: "Relación entre el giro del volante y el giro de las ruedas. Ratio más bajo = dirección más rápida y directa; más alto = más lenta y suave.",
      en: "Ratio between wheel rotation and the wheels turning. A lower ratio = quicker, more direct steering; higher = slower and smoother.",
    },
    increaseEffect: {
      es: "Ratio más alto = dirección más lenta; útil con poco ángulo de giro en el volante físico.",
      en: "Higher ratio = slower steering; useful with limited physical wheel rotation.",
    },
    decreaseEffect: {
      es: "Ratio más bajo = dirección más rápida y nerviosa; cuidado con sobrecorregir.",
      en: "Lower ratio = quicker, twitchier steering; watch out for over-correcting.",
    },
  },
  {
    id: "damper_slow_bump_front",
    group: "dampers",
    name: { es: "Compresión lenta delantera", en: "Front slow bump" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Velocidad de compresión del amortiguador delantero en movimientos lentos: transferencia de peso en frenada, aceleración y giro. (AC EVO sólo expone amortiguación lenta.)",
      en: "Front damper compression speed in slow movements: weight transfer under braking, acceleration and cornering. (AC EVO only exposes slow damping.)",
    },
    increaseEffect: {
      es: "Más firme = respuesta más inmediata en transiciones, pero menos agarre y plataforma más nerviosa adelante.",
      en: "Stiffer = more immediate response in transitions, but less front grip and a twitchier platform.",
    },
    decreaseEffect: {
      es: "Más blando = transferencia de peso más progresiva y más agarre adelante, pero el auto se siente más perezoso.",
      en: "Softer = smoother weight transfer and more front grip, but the car feels lazier.",
    },
  },
  {
    id: "damper_slow_bump_rear",
    group: "dampers",
    name: { es: "Compresión lenta trasera", en: "Rear slow bump" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Velocidad de compresión del amortiguador trasero en movimientos lentos: gobierna la transferencia de peso a la cola y la tracción en salida.",
      en: "Rear damper compression speed in slow movements: governs weight transfer onto the rear and exit traction.",
    },
    increaseEffect: {
      es: "Más firme atrás = respuesta más inmediata, pero menos tracción y cola más nerviosa en transiciones.",
      en: "Stiffer rear = more immediate response, but less traction and a twitchier rear in transitions.",
    },
    decreaseEffect: {
      es: "Más blando atrás = más tracción y agarre de la cola, con respuesta más lenta.",
      en: "Softer rear = more rear traction and grip, with a slower response.",
    },
  },
  {
    id: "damper_slow_rebound_front",
    group: "dampers",
    name: { es: "Extensión lenta delantera", en: "Front slow rebound" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Velocidad de extensión del amortiguador delantero tras comprimir. Controla cómo el frente recupera la plataforma al soltar carga.",
      en: "Front damper extension speed after compressing. Controls how the front recovers its platform when load is released.",
    },
    increaseEffect: {
      es: "Más firme retiene la transferencia de peso más tiempo: frente más estable pero puede dar nerviosismo si te pasás.",
      en: "Stiffer holds the weight transfer longer: more stable front but can get nervous if overdone.",
    },
    decreaseEffect: {
      es: "Más blando deja que el frente recupere rápido; puede 'flotar' y perder control de la plataforma.",
      en: "Softer lets the front recover quickly; it can 'float' and lose platform control.",
    },
  },
  {
    id: "damper_slow_rebound_rear",
    group: "dampers",
    name: { es: "Extensión lenta trasera", en: "Rear slow rebound" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Velocidad de extensión del amortiguador trasero tras comprimir. Controla cómo la cola recupera la plataforma al soltar carga; clave para la tracción en salida.",
      en: "Rear damper extension speed after compressing. Controls how the rear recovers its platform when load is released; key for exit traction.",
    },
    increaseEffect: {
      es: "Más firme retiene la carga atrás más tiempo: cola más estable, con riesgo de nerviosismo si te pasás.",
      en: "Stiffer holds rear load longer: more stable rear, with a risk of nervousness if overdone.",
    },
    decreaseEffect: {
      es: "Más blando deja que la cola recupere rápido; puede 'flotar' y perder tracción tras baches.",
      en: "Softer lets the rear recover quickly; it can 'float' and lose traction after bumps.",
    },
  },
  {
    id: "rear_wing",
    group: "aero",
    name: { es: "Ala trasera", en: "Rear wing" },
    unit: "",
    min: 0,
    max: 14,
    step: 1,
    default: 11,
    whatItDoes: {
      es: "Ángulo del alerón trasero (en el editor: 'Ángulo del alerón trasero'): genera carga aerodinámica atrás. Es la herramienta principal de balance aero. Más ala = más agarre, menos punta. En autos de calle sin alerón ajustable, ponelo en 0.",
      en: "Rear wing angle (in the editor: 'rear wing angle'): makes downforce at the rear. It's the main aero-balance tool. More wing = more grip, less top speed. On road cars without an adjustable wing, set it to 0.",
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
    id: "brake_bias",
    group: "brakes",
    name: { es: "Distribución de frenada (delantero)", en: "Brake bias (front)" },
    unit: "%",
    min: 50,
    max: 70,
    step: 0.2,
    default: 60.0,
    whatItDoes: {
      es: "Porcentaje de freno que va al eje delantero (en el editor vive en la pestaña Suspensión como 'Distribución de Frenada Delantero'). Más alto = más freno adelante. Ajuste clave para la entrada de curva.",
      en: "Percentage of braking sent to the front axle (in the editor it lives in the Suspension tab as 'front brake distribution'). Higher = more front brake. Key adjustment for corner entry.",
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
    id: "diff_preload",
    group: "differential",
    name: { es: "Precarga del diferencial", en: "Differential preload" },
    unit: "Nm",
    min: 0,
    max: 300,
    step: 5,
    default: 100,
    whatItDoes: {
      es: "Cuánto se resisten a girar diferente las dos ruedas motrices antes de que actúe el LSD (en el editor: 'Precarga del Diferencial', en la pestaña Suspensión). Afecta cómo reacciona la cola en transiciones suaves de acelerador.",
      en: "How much the two driven wheels resist turning at different speeds before the LSD acts (in the editor: 'differential preload', in the Suspension tab). Affects how the rear reacts in gentle throttle transitions.",
    },
    increaseEffect: {
      es: "Más precarga = comportamiento más bloqueado y estable, pero menos ágil en entrada (algo de subviraje).",
      en: "More preload = more locked, stable behaviour, but less agile on entry (some understeer).",
    },
    decreaseEffect: {
      es: "Menos precarga = más libre, mejor rotación a baja velocidad y al levantar gas, con cola más viva.",
      en: "Less preload = freer, better low-speed rotation and off-throttle rotation, with a livelier rear.",
    },
  },
  {
    id: "tc",
    group: "electronics",
    name: { es: "Control de tracción 1 (TC1)", en: "Traction control 1 (TC1)" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Cuánto limita el patinaje de las ruedas al acelerar (TC1, el control principal). Más alto = interviene antes. Muchos GT dependen de él.",
      en: "How much it limits wheelspin on throttle (TC1, the main control). Higher = intervenes earlier. Many GT cars rely on it.",
    },
    increaseEffect: {
      es: "Más TC = más seguro y estable en salida (sobre todo en mojado), pero limita la aceleración en seco.",
      en: "More TC = safer and more stable on exit (especially in the wet), but limits acceleration in the dry.",
    },
    decreaseEffect: {
      es: "Menos TC = más aceleración pura si sabes dosificar; más riesgo de irte de cola.",
      en: "Less TC = more raw acceleration if you can modulate; more risk of the rear stepping out.",
    },
  },
  {
    id: "tc2",
    group: "electronics",
    name: { es: "Control de tracción 2 (TC2)", en: "Traction control 2 (TC2)" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 3,
    whatItDoes: {
      es: "Segundo control de tracción (TC2): gestiona el deslizamiento más fino / la fase de corte tras el TC1. Ajusta cuán agresivo es el sistema una vez que ya detectó patinaje.",
      en: "Second traction-control stage (TC2): manages finer slip / the cut phase after TC1. Tunes how aggressive the system is once it has already detected wheelspin.",
    },
    increaseEffect: {
      es: "Más TC2 = corte más suave y progresivo del patinaje; más seguro pero limita un poco más la salida.",
      en: "More TC2 = smoother, more progressive slip cut; safer but limits exit a touch more.",
    },
    decreaseEffect: {
      es: "Menos TC2 = corte más permisivo; más libertad para acelerar al límite con algo más de riesgo.",
      en: "Less TC2 = more permissive cut; more freedom to accelerate at the limit with a bit more risk.",
    },
  },
  {
    id: "abs",
    group: "electronics",
    name: { es: "ABS", en: "ABS" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Cuánto evita el bloqueo de ruedas al frenar. Más alto = interviene antes. Ponerlo en 0 no siempre es más rápido.",
      en: "How much it prevents wheel lock under braking. Higher = intervenes earlier. Setting it to 0 isn't always faster.",
    },
    increaseEffect: {
      es: "Más ABS = frenadas más seguras y menos planos, sobre todo en mojado; la distancia de frenado se alarga un poco.",
      en: "More ABS = safer braking and fewer flat-spots, especially in the wet; braking distance lengthens slightly.",
    },
    decreaseEffect: {
      es: "Menos ABS = más potencia de frenada al límite y más tacto, pero más riesgo de bloquear; exige más técnica.",
      en: "Less ABS = more braking power at the limit and more feel, but more risk of locking; demands more technique.",
    },
  },
  {
    id: "engine_map",
    group: "electronics",
    name: { es: "Mapa de motor", en: "Engine map" },
    unit: "",
    min: 1,
    max: 8,
    step: 1,
    default: 3,
    whatItDoes: {
      es: "Cambia la entrega de potencia y el consumo (en el editor: 'Mapa Motor'). Mapas más suaves ahorran combustible y dan mejor tracción en mojado.",
      en: "Changes power delivery and fuel consumption (in the editor: 'engine map'). Softer maps save fuel and give better wet traction.",
    },
    increaseEffect: {
      es: "Mapa más agresivo = más potencia y respuesta, a costa de más consumo y entrega más brusca.",
      en: "More aggressive map = more power and response, at the cost of higher consumption and harsher delivery.",
    },
    decreaseEffect: {
      es: "Mapa más suave = menos consumo y entrega más manejable; útil en mojado o para estirar el combustible.",
      en: "Softer map = lower consumption and more manageable delivery; useful in the wet or to stretch fuel.",
    },
  },
];

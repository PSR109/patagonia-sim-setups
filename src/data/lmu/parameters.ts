import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de Le Mans Ultimate (Hypercar / LMGT3 / LMP2 / LMP3 / GTE)
// con su capa educativa. Cada parámetro explica qué hace y qué pasa al subir/bajar
// el valor. LMU hereda el motor de rFactor 2 (isiMotor): los rangos exactos varían
// por auto y por BoP, así que estos min/max/step son representativos y ajustables
// sin tocar el motor de reglas. Verificado contra el wiki oficial y Coach Dave Academy.
export const lmuParameters: ParameterDef[] = [
  // ── Neumáticos / Presiones ────────────────────────────────────────────────
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión neumáticos delanteros", en: "Front tyre pressure" },
    unit: "psi",
    min: 19.0,
    max: 30.0,
    step: 0.1,
    default: 21.0,
    whatItDoes: {
      es: "Define cuánta huella del neumático toca el piso. En LMU se suele correr cerca del mínimo permitido, apuntando a una temperatura en ventana de ~85-95 °C. La presión sube con la temperatura, por eso se parte por debajo del objetivo en caliente.",
      en: "Sets how much of the tyre contacts the road. In LMU you usually run near the allowed minimum, targeting a temperature window of ~85-95 °C. Pressure rises with temperature, so you start below the hot target.",
    },
    increaseEffect: {
      es: "Calentamiento más rápido y respuesta más alerta, pero menos agarre de pico y más inestable en recta; si te pasás, el neumático se 'globea' y patina.",
      en: "Faster warm-up and sharper response, but less peak grip and more nervous on straights; too high and the tyre balloons and slides.",
    },
    decreaseEffect: {
      es: "Más huella de contacto y agarre predecible, pero calienta más lento y la respuesta es más vaga.",
      en: "More contact patch and predictable grip, but slower to warm up and vaguer response.",
    },
  },
  {
    id: "tyre_pressure_rear",
    group: "tyres",
    name: { es: "Presión neumáticos traseros", en: "Rear tyre pressure" },
    unit: "psi",
    min: 19.0,
    max: 30.0,
    step: 0.1,
    default: 21.0,
    whatItDoes: {
      es: "Igual que adelante pero en el tren trasero: afecta tracción y estabilidad de la cola. Misma ventana objetivo de temperatura (~85-95 °C).",
      en: "Same as front but on the rear axle: affects traction and rear stability. Same temperature window target (~85-95 °C).",
    },
    increaseEffect: {
      es: "Cola más nerviosa y con menos agarre de pico; puede soltar al acelerar.",
      en: "Twitchier rear with less peak grip; can step out on power.",
    },
    decreaseEffect: {
      es: "Más tracción y estabilidad atrás, hasta que la presión cae tanto que el neumático calienta de más por flexión.",
      en: "More traction and rear stability, until pressure drops so low the tyre overheats from flex.",
    },
  },
  // ── Alineación (Camber / Toe / Caster) ────────────────────────────────────
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Caída (camber) delantera", en: "Front camber" },
    unit: "°",
    min: -4.5,
    max: -1.5,
    step: 0.1,
    default: -3.0,
    whatItDoes: {
      es: "Inclinación de la rueda vista de frente. En LMU el rango útil delantero ronda -2.4 a -3.0°. Más negativo = más agarre en curva (mejor huella al rolar), menos en recta y frenada.",
      en: "Wheel lean seen from the front. In LMU the useful front range is around -2.4 to -3.0°. More negative = more cornering grip (better patch while rolling), less under braking/on straights.",
    },
    increaseEffect: {
      es: "Subir hacia 0 (menos negativo) mejora tracción en salida y frenada en recta, pero baja el agarre lateral en apoyo.",
      en: "Toward 0 (less negative) improves on-throttle traction and straight-line braking, but lowers lateral grip while loaded.",
    },
    decreaseEffect: {
      es: "Más negativo da más agarre lateral en curva, a costa de tracción, frenada y desgaste del borde interno.",
      en: "More negative gives more lateral grip in corners, costing traction, braking and inner-edge wear.",
    },
  },
  {
    id: "camber_rear",
    group: "alignment",
    name: { es: "Caída (camber) trasera", en: "Rear camber" },
    unit: "°",
    min: -4.0,
    max: -1.0,
    step: 0.1,
    default: -2.4,
    whatItDoes: {
      es: "Caída del tren trasero: controla cuánto agarre lateral tiene la cola en curva sin perder demasiada tracción.",
      en: "Rear axle camber: controls how much lateral grip the rear has in corners without losing too much traction.",
    },
    increaseEffect: {
      es: "Hacia 0 mejora tracción en recta y salida, pero la cola agarra menos de costado.",
      en: "Toward 0 improves straight-line and exit traction, but the rear grips less laterally.",
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
    min: -0.30,
    max: 0.20,
    step: 0.01,
    default: -0.06,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas vistas desde arriba. Negativo (toe-out) = más reactivo y mejor rotación al doblar.",
      en: "Where the wheels point seen from above. Negative (toe-out) = sharper turn-in and better rotation.",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo) da más estabilidad en recta y bajo frenada, pero entra más perezoso y calienta más el neumático.",
      en: "Toward toe-in (positive) adds straight-line and braking stability, but lazier turn-in and more tyre heat.",
    },
    decreaseEffect: {
      es: "Más toe-out agiliza la entrada y la rotación, con algo más de nerviosismo y desgaste.",
      en: "More toe-out sharpens entry and rotation, with a bit more nervousness and wear.",
    },
  },
  {
    id: "toe_rear",
    group: "alignment",
    name: { es: "Convergencia (toe) trasera", en: "Rear toe" },
    unit: "°",
    min: 0.0,
    max: 0.40,
    step: 0.01,
    default: 0.12,
    whatItDoes: {
      es: "Convergencia del tren trasero. En LMU casi siempre se deja en toe-in para estabilidad de tracción.",
      en: "Rear axle toe. In LMU it's almost always left in toe-in for traction stability.",
    },
    increaseEffect: {
      es: "Más toe-in estabiliza mucho la cola al acelerar, a costa de un poco de velocidad punta y más calor.",
      en: "More toe-in greatly stabilises the rear on power, costing a touch of top speed and more heat.",
    },
    decreaseEffect: {
      es: "Menos toe-in libera la cola y da más rotación, pero con menos estabilidad de tracción.",
      en: "Less toe-in frees the rear for more rotation, but less traction stability.",
    },
  },
  {
    id: "caster",
    group: "alignment",
    name: { es: "Caster (avance)", en: "Caster" },
    unit: "°",
    min: 4.0,
    max: 12.0,
    step: 0.1,
    default: 7.0,
    whatItDoes: {
      es: "Inclinación del eje de dirección vista de lado. Más caster genera más camber dinámico al girar y más auto-centrado del volante.",
      en: "Steering axis lean seen from the side. More caster generates more dynamic camber when turning and stronger self-centering of the wheel.",
    },
    increaseEffect: {
      es: "Más agarre delantero en curva y mejor sensación/peso del volante, pero la dirección se endurece.",
      en: "More front cornering grip and better wheel weight/feel, but heavier steering.",
    },
    decreaseEffect: {
      es: "Dirección más liviana y fácil de mover, con algo menos de agarre delantero dinámico.",
      en: "Lighter, easier steering, with slightly less dynamic front grip.",
    },
  },
  // ── Aerodinámica / Alas ───────────────────────────────────────────────────
  {
    id: "rear_wing",
    group: "aero",
    name: { es: "Ala trasera", en: "Rear wing" },
    unit: "",
    min: 0,
    max: 14,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Ángulo del alerón trasero (escala de clicks): genera carga aerodinámica atrás. Se equilibra junto al rake. Más ala = más agarre, menos punta.",
      en: "Rear wing angle (click scale): makes downforce at the rear. Balanced together with rake. More wing = more grip, less top speed.",
    },
    increaseEffect: {
      es: "Más ala estabiliza la cola en curvas rápidas y frenada, a costa de velocidad en recta y más resistencia aero.",
      en: "More wing stabilises the rear in fast corners and braking, costing straight-line speed and adding drag.",
    },
    decreaseEffect: {
      es: "Menos ala da más velocidad punta pero la cola se vuelve nerviosa/sobreviradora en alta velocidad.",
      en: "Less wing gives more top speed but the rear gets nervous/oversteery at high speed.",
    },
  },
  {
    id: "front_aero",
    group: "aero",
    name: { es: "Carga aerodinámica delantera (splitter)", en: "Front aero (splitter)" },
    unit: "",
    min: 0,
    max: 10,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Carga aero delantera (splitter/ala delantera según auto; en Hypercar/GT3 a veces fija por BoP). Define el balance aero delantero/trasero a alta velocidad.",
      en: "Front aero load (splitter/front wing depending on car; sometimes fixed by BoP in Hypercar/GT3). Sets the front/rear aero balance at high speed.",
    },
    increaseEffect: {
      es: "Más carga delantera = mejor giro de entrada a alta velocidad, pero puede reducir la estabilidad trasera.",
      en: "More front load = better high-speed turn-in, but can reduce rear stability.",
    },
    decreaseEffect: {
      es: "Menos carga delantera = frente más estable pero con tendencia al subviraje en curvas rápidas.",
      en: "Less front load = more stable front but a tendency to understeer in fast corners.",
    },
  },
  // ── Suspensión / Resortes / Barras / Alturas ──────────────────────────────
  {
    id: "spring_front",
    group: "suspension",
    name: { es: "Rigidez de resorte delantero", en: "Front spring rate" },
    unit: "N/mm",
    min: 80,
    max: 300,
    step: 5,
    default: 150,
    whatItDoes: {
      es: "Dureza del resorte delantero. Controla cuánto se hunde el frente y la estabilidad de la plataforma aero. Varía mucho por clase y auto.",
      en: "Front spring stiffness. Controls how much the front dives and the stability of the aero platform. Varies a lot by class and car.",
    },
    increaseEffect: {
      es: "Más duro = giro más afilado y mejor control de la plataforma aero, pero menos agarre mecánico en pianos y baches.",
      en: "Stiffer = sharper turn-in and better aero platform control, but less mechanical grip over kerbs and bumps.",
    },
    decreaseEffect: {
      es: "Más blando = más agarre mecánico en piso bacheado, pero respuesta más perezosa y mayores cambios de altura.",
      en: "Softer = more mechanical grip on bumpy surfaces, but lazier response and bigger ride-height changes.",
    },
  },
  {
    id: "spring_rear",
    group: "suspension",
    name: { es: "Rigidez de resorte trasero", en: "Rear spring rate" },
    unit: "N/mm",
    min: 80,
    max: 320,
    step: 5,
    default: 160,
    whatItDoes: {
      es: "Dureza del resorte trasero. Afecta tracción, estabilidad de la cola y cuánto se hunde atrás al acelerar y cargar combustible.",
      en: "Rear spring stiffness. Affects traction, rear stability and how much the rear squats on power and with fuel load.",
    },
    increaseEffect: {
      es: "Más duro = cola más reactiva y plataforma aero más estable, pero menos tracción mecánica.",
      en: "Stiffer = sharper rear and a more stable aero platform, but less mechanical traction.",
    },
    decreaseEffect: {
      es: "Más blando = más tracción y agarre en piso irregular, con la cola hundiéndose más al acelerar.",
      en: "Softer = more traction and grip on uneven surfaces, with the rear squatting more on power.",
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
      es: "Cuánto se resiste el eje delantero a balancearse. Es la herramienta principal para balancear el auto en curva sin tocar los resortes. Más dura = menos agarre delantero relativo.",
      en: "How much the front axle resists roll. The main tool to balance the car in corners without touching springs. Stiffer = less relative front grip.",
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
    min: 40,
    max: 90,
    step: 1,
    default: 50,
    whatItDoes: {
      es: "Distancia del piso al suelo adelante (altura estática sin combustible). En Hypercar es crítico por la sensibilidad aero. Junto con la trasera define el rake.",
      en: "Front floor-to-ground distance (static height without fuel). Critical in Hypercar due to aero sensitivity. With the rear it sets the rake.",
    },
    increaseEffect: {
      es: "Subir da más recorrido para pianos/baches y menos riesgo de tocar fondo, restando downforce y eficiencia.",
      en: "Raising gives more travel for kerbs/bumps and less bottoming, costing downforce and efficiency.",
    },
    decreaseEffect: {
      es: "Bajar aumenta downforce y eficiencia aero, pero arriesga tocar fondo y desestabilizar la plataforma.",
      en: "Lowering increases downforce and aero efficiency, but risks bottoming out and unsettling the platform.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Altura trasera", en: "Rear ride height" },
    unit: "mm",
    min: 40,
    max: 110,
    step: 1,
    default: 60,
    whatItDoes: {
      es: "Altura del tren trasero. Junto con la delantera define el 'rake' (inclinación): más rake hace el frente más punzante y el auto más sobrevirador en entrada.",
      en: "Rear ride height. With the front it sets the 'rake': more rake makes the front sharper and the car more oversteery on entry.",
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
    id: "packers",
    group: "suspension",
    name: { es: "Topes / Packers (bump rubbers)", en: "Packers / bump rubbers" },
    unit: "mm",
    min: 0,
    max: 30,
    step: 1,
    default: 10,
    whatItDoes: {
      es: "Limitan el recorrido de la suspensión para evitar que el auto toque fondo en zonas rápidas sin cambiar la altura estática; protegen la plataforma aero.",
      en: "Limit suspension travel to keep the car from bottoming out in fast sections without changing static ride height; protect the aero platform.",
    },
    increaseEffect: {
      es: "Más packer (más grueso) = menos recorrido disponible: la suspensión topa antes, plataforma más estable pero más dura sobre baches grandes.",
      en: "More packer (thicker) = less travel available: suspension bottoms sooner, more stable platform but harsher over big bumps.",
    },
    decreaseEffect: {
      es: "Menos packer = más recorrido y absorción, pero más riesgo de tocar fondo en compresiones rápidas.",
      en: "Less packer = more travel and absorption, but more risk of bottoming in fast compressions.",
    },
  },
  // ── Amortiguadores (Dampers) ──────────────────────────────────────────────
  {
    id: "bump",
    group: "dampers",
    name: { es: "Compresión (Bump)", en: "Bump (compression)" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Resistencia del amortiguador al comprimirse (escala de clicks). Controla cómo reacciona el auto a transferencias de peso y pianos.",
      en: "Damper resistance to compression (click scale). Controls how the car reacts to weight transfers and kerbs.",
    },
    increaseEffect: {
      es: "Más bump = el auto reacciona más firme a transferencias y pianos, pero puede saltar y perder agarre sobre superficies bruscas.",
      en: "More bump = the car reacts more firmly to transfers and kerbs, but can skip and lose grip over harsh surfaces.",
    },
    decreaseEffect: {
      es: "Menos bump = más absorción y agarre mecánico, con la plataforma moviéndose más bajo carga.",
      en: "Less bump = more absorption and mechanical grip, with the platform moving more under load.",
    },
  },
  {
    id: "rebound",
    group: "dampers",
    name: { es: "Extensión (Rebound)", en: "Rebound (extension)" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 10,
    whatItDoes: {
      es: "Resistencia del amortiguador al extenderse: controla la velocidad de retorno del resorte. Afecta estabilidad y comportamiento sobre pianos.",
      en: "Damper resistance to extension: controls how fast the spring returns. Affects stability and behaviour over kerbs.",
    },
    increaseEffect: {
      es: "Más rebound mantiene el peso transferido más tiempo (más estable en transiciones), pero puede 'enganchar' la rueda sobre baches.",
      en: "More rebound keeps weight transferred longer (more stable in transitions), but can 'pack down' the wheel over bumps.",
    },
    decreaseEffect: {
      es: "Menos rebound = retorno más rápido del resorte; la rueda vuelve antes al piso pero el auto se siente más suelto.",
      en: "Less rebound = faster spring return; the wheel returns to the road sooner but the car feels looser.",
    },
  },
  // ── Diferencial ───────────────────────────────────────────────────────────
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
      es: "Fuerza mínima a vencer antes de que el diferencial desbloquee. Afecta cómo reacciona la cola en transiciones suaves de acelerador.",
      en: "Minimum force to overcome before the diff unlocks. Affects how the rear reacts in gentle throttle transitions.",
    },
    increaseEffect: {
      es: "Más precarga = el diff queda bloqueado más tiempo: más estabilidad, pero rotación más difícil en curvas lentas.",
      en: "More preload = the diff stays locked longer: more stability, but harder rotation in slow corners.",
    },
    decreaseEffect: {
      es: "Menos precarga = diff más reactivo y mejor rotación en entrada, con cola más viva (y nerviosa).",
      en: "Less preload = a more reactive diff and better entry rotation, with a livelier (and twitchier) rear.",
    },
  },
  {
    id: "diff_power",
    group: "differential",
    name: { es: "Bloqueo en aceleración (Power)", en: "Power lock (on-throttle)" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 40,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial con el acelerador apretado (rampa de aceleración). Controla tracción y rotación a la salida de curva.",
      en: "How much the diff locks under throttle (power ramp). Controls traction and rotation on corner exit.",
    },
    increaseEffect: {
      es: "Más bloqueo = más estable y con más tracción en salida, pero más subviraje al poner gas.",
      en: "More lock = more stable with more exit traction, but more understeer on power.",
    },
    decreaseEffect: {
      es: "Menos bloqueo = más rotación a la salida, pero puede patinar la rueda interior y ponerse inestable.",
      en: "Less lock = more exit rotation, but the inner wheel can spin and the car gets unstable.",
    },
  },
  {
    id: "diff_coast",
    group: "differential",
    name: { es: "Bloqueo en retención (Coast)", en: "Coast lock (off-throttle)" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 30,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial sin acelerador (al levantar gas o frenar con freno motor). Controla la estabilidad en entrada.",
      en: "How much the diff locks off-throttle (lifting or engine-braking). Controls entry stability.",
    },
    increaseEffect: {
      es: "Más bloqueo en retención = más estable al levantar/frenar, pero más subviraje en entrada.",
      en: "More coast lock = more stable when lifting/braking, but more entry understeer.",
    },
    decreaseEffect: {
      es: "Menos bloqueo en retención = más rotación al soltar el gas, pero la cola se vuelve menos estable.",
      en: "Less coast lock = more rotation off-throttle, but the rear becomes less stable.",
    },
  },
  // ── Frenos ────────────────────────────────────────────────────────────────
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Reparto de frenada", en: "Brake bias" },
    unit: "%",
    min: 48,
    max: 64,
    step: 0.2,
    default: 55.0,
    whatItDoes: {
      es: "Porcentaje de freno que va al eje delantero (típicamente ~50-60% en LMU). Más alto = más freno adelante.",
      en: "Percentage of braking sent to the front axle (typically ~50-60% in LMU). Higher = more front brake.",
    },
    increaseEffect: {
      es: "Más adelante = frenada muy estable, pero subviraje de entrada y riesgo de bloquear las delanteras.",
      en: "More forward = very stable braking, but entry understeer and risk of locking the fronts.",
    },
    decreaseEffect: {
      es: "Más atrás ayuda a rotar al frenar, con riesgo de bloquear la cola e inestabilidad.",
      en: "More rearward helps rotation under braking, with risk of locking the rear and instability.",
    },
  },
  {
    id: "brake_migration",
    group: "brakes",
    name: { es: "Migración de freno (Hypercar)", en: "Brake migration (Hypercar)" },
    unit: "%",
    min: 0,
    max: 2.5,
    step: 0.5,
    default: 2.5,
    whatItDoes: {
      es: "Solo Hypercar: mueve el reparto hacia adelante a medida que SUBE la presión del pedal (pedal a fondo, alta velocidad). Da más estabilidad y frenada más corta al inicio, y devuelve rotación al final, al soltar hacia el apex. Óptimo ~2.5F.",
      en: "Hypercar only: shifts brake bias forward as pedal pressure rises (full pedal, high speed). Gives more stability and shorter braking at the start, returning rotation at the end as you release toward the apex. Optimum ~2.5F.",
    },
    increaseEffect: {
      es: "Más migración = más bias delantero al pisar fuerte: más estabilidad y frenada más corta al inicio, devolviendo rotación al soltar el pedal.",
      en: "More migration = more front bias under heavy pedal: more stability and shorter braking at the start, returning rotation as you release.",
    },
    decreaseEffect: {
      es: "Menos migración = menos bias delantero a fondo de pedal: reparto más plano y menos estable en frenada dura.",
      en: "Less migration = less front bias under heavy pedal: a flatter bias and less stability under hard braking.",
    },
  },
  {
    id: "brake_pressure",
    group: "brakes",
    name: { es: "Presión máxima de freno", en: "Max brake pressure" },
    unit: "%",
    min: 70,
    max: 100,
    step: 1,
    default: 88,
    whatItDoes: {
      es: "Fuerza máxima de frenado a fondo del pedal (típico ~80-91% según auto y pedalera). Se calibra a la pedalera del piloto.",
      en: "Maximum braking force at full pedal (typically ~80-91% depending on car and pedals). Calibrated to the driver's pedal set.",
    },
    increaseEffect: {
      es: "Más presión = mordida más fuerte y respuesta más agresiva, pero más fácil de bloquear.",
      en: "More pressure = stronger bite and more aggressive response, but easier to lock up.",
    },
    decreaseEffect: {
      es: "Menos presión = frenada más modulable y difícil de bloquear, pero puede quedarse corta de potencia de freno.",
      en: "Less pressure = more modulated braking that's harder to lock, but can run short of stopping power.",
    },
  },
  {
    id: "brake_ducts",
    group: "brakes",
    name: { es: "Ductos de freno", en: "Brake ducts" },
    unit: "",
    min: 0,
    max: 6,
    step: 1,
    default: 3,
    whatItDoes: {
      es: "Refrigeración de los frenos (cerrado-abierto). Más abierto enfría mejor; más cerrado retiene temperatura y reduce algo de resistencia aero.",
      en: "Brake cooling (closed-open). More open cools better; more closed retains heat and reduces a little aero drag.",
    },
    increaseEffect: {
      es: "Más abierto = frenos más fríos y consistentes en carrera larga/calor, con algo de penalización aero.",
      en: "More open = cooler, more consistent brakes in long races/heat, with a small aero penalty.",
    },
    decreaseEffect: {
      es: "Más cerrado = retiene temperatura de freno (útil en frío) y reduce resistencia, con riesgo de sobrecalentar en calor.",
      en: "More closed = retains brake temperature (useful when cold) and cuts drag, with overheating risk in the heat.",
    },
  },
  // ── Cambios / Relaciones ──────────────────────────────────────────────────
  {
    id: "final_drive",
    group: "gearing",
    name: { es: "Relación final", en: "Final drive ratio" },
    unit: "",
    min: 0,
    max: 12,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Relación general de la transmisión (muchos autos tienen relaciones fijas por reglamento). Se adapta a la recta más larga del circuito (ej. Mulsanne en Le Mans).",
      en: "Overall transmission ratio (many cars have ratios fixed by regulation). Adapted to the longest straight of the circuit (e.g. the Mulsanne at Le Mans).",
    },
    increaseEffect: {
      es: "Relación más larga = más velocidad punta pero menos aceleración; ideal en circuitos de rectas largas.",
      en: "Longer ratio = more top speed but less acceleration; ideal on high-top-speed tracks.",
    },
    decreaseEffect: {
      es: "Relación más corta = más aceleración y mejor salida de curvas lentas, pero menos punta.",
      en: "Shorter ratio = more acceleration and better drive out of slow corners, but less top speed.",
    },
  },
  // ── Electrónica (TC / ABS) ────────────────────────────────────────────────
  {
    id: "tc",
    group: "electronics",
    name: { es: "Control de tracción (TC)", en: "Traction Control (TC)" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Nivel base del control de tracción en autos equipados (GT3/Hypercar): escala 1-11 (más alto = interviene antes para frenar el patinaje). Es uno de los canales de TC de LMU, junto con el ángulo de patinaje (Slip Angle). En prototipos sin TC (LMP2/LMP3) se deja en 0.",
      en: "Base traction control level on TC-equipped cars (GT3/Hypercar): 1-11 scale (higher = intervenes earlier to stop wheelspin). One of LMU's TC channels, alongside the Slip Angle. On prototypes without TC (LMP2/LMP3) it stays at 0.",
    },
    increaseEffect: {
      es: "Más TC = más seguro en mojado o baja adherencia, pero más lento (corta potencia antes) en seco.",
      en: "More TC = safer in the wet or low grip, but slower (cuts power earlier) in the dry.",
    },
    decreaseEffect: {
      es: "Menos TC = más aceleración pura si sabes dosificar; castiga los errores con patinaje.",
      en: "Less TC = more raw acceleration if you can modulate; punishes mistakes with wheelspin.",
    },
  },
  {
    id: "tc_slip",
    group: "electronics",
    name: { es: "Ángulo de patinaje del TC (Slip Angle)", en: "TC Slip Angle" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Segundo canal del control de tracción de LMU (escala 1-11 en autos equipados): fija cuánto patinaje se permite antes de que el TC intervenga. Más bajo = interviene antes (más conservador). En prototipos sin TC (LMP2/LMP3) se deja en 0. El tercer canal, Power Cut, aparece aparte en los autos con TC.",
      en: "LMU's second traction-control channel (1-11 on equipped cars): sets how much wheelspin is allowed before TC intervenes. Lower = intervenes sooner (more conservative). On prototypes without TC (LMP2/LMP3) it stays at 0. The third channel, Power Cut, is shown separately on TC-equipped cars.",
    },
    increaseEffect: {
      es: "Más slip permitido = el TC deja patinar más antes de actuar: más potencia disponible pero menos red de seguridad.",
      en: "More slip allowed = TC lets the wheels spin more before acting: more power available but less safety net.",
    },
    decreaseEffect: {
      es: "Menos slip = el TC actúa antes ante el menor patinaje: más seguro pero más conservador.",
      en: "Less slip = TC acts at the slightest spin: safer but more conservative.",
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
    default: 3,
    whatItDoes: {
      es: "Cuánto evita el bloqueo de ruedas al frenar (ajustable sobre la marcha; disponibilidad según clase y BoP). Más alto = más intervención.",
      en: "How much it prevents wheel lock under braking (adjustable on the fly; availability per class and BoP). Higher = more intervention.",
    },
    increaseEffect: {
      es: "Más ABS = frenadas más estables y sin planos, sobre todo en mojado; frenada un poco más larga.",
      en: "More ABS = more stable braking without flat-spots, especially in the wet; slightly longer braking.",
    },
    decreaseEffect: {
      es: "Menos ABS = frenada más corta y con más tacto, pero más riesgo de bloquear.",
      en: "Less ABS = shorter, more tactile braking, but more risk of locking up.",
    },
  },
  // ── Híbrido / Energía (solo Hypercar) ─────────────────────────────────────
  {
    id: "deployment_map",
    group: "electronics",
    name: { es: "Mapa de despliegue híbrido (Hypercar)", en: "Hybrid deployment map (Hypercar)" },
    unit: "",
    min: 1,
    max: 8,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Solo Hypercar: define cómo y cuándo se despliega la energía del motor eléctrico. Óptimo ~50 kW en LMDh / 60 kW en LMH. Sujeto a las reglas de energía del WEC.",
      en: "Hypercar only: defines how and when the electric motor energy is deployed. Optimum ~50 kW in LMDh / 60 kW in LMH. Subject to WEC energy rules.",
    },
    increaseEffect: {
      es: "Mapa más agresivo = más empuje y aceleración, pero gasta la energía virtual más rápido.",
      en: "More aggressive map = more push and acceleration, but burns virtual energy faster.",
    },
    decreaseEffect: {
      es: "Mapa más conservador = ahorra energía para el final del stint, con menos empuje instantáneo.",
      en: "More conservative map = saves energy for the end of the stint, with less instant push.",
    },
  },
  {
    id: "regen_level",
    group: "electronics",
    name: { es: "Nivel de regeneración (Hypercar)", en: "Regen level (Hypercar)" },
    unit: "",
    min: 1,
    max: 8,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Solo Hypercar: cuánta energía se recupera al frenar. Forma parte del balance entre estabilidad de entrada y recarga de la batería.",
      en: "Hypercar only: how much energy is recovered under braking. Part of the trade-off between entry stability and recharging the battery.",
    },
    increaseEffect: {
      es: "Más regen = más freno motor y recuperación de energía, pero puede afectar la estabilidad de entrada.",
      en: "More regen = more engine braking and energy recovery, but can affect entry stability.",
    },
    decreaseEffect: {
      es: "Menos regen = entrada más limpia y predecible, pero se recupera menos energía.",
      en: "Less regen = cleaner, more predictable entry, but less energy recovered.",
    },
  },
  // ── Combustible / Estrategia ──────────────────────────────────────────────
  {
    id: "fuel_level",
    group: "other",
    name: { es: "Nivel de combustible inicial", en: "Initial fuel level" },
    unit: "L",
    min: 5,
    max: 120,
    step: 1,
    default: 60,
    whatItDoes: {
      es: "Litros de combustible al salir a pista. Define peso y paradas, y va cambiando la altura estática/plataforma aero a medida que se quema.",
      en: "Litres of fuel at the start of a run. Sets weight and pit stops, and changes the static ride height/aero platform as it burns.",
    },
    increaseEffect: {
      es: "Más combustible = más peso (más lento y más desgaste) pero menos paradas en carrera larga.",
      en: "More fuel = more weight (slower, more wear) but fewer stops in a long race.",
    },
    decreaseEffect: {
      es: "Menos combustible = auto más liviano y rápido, pero requiere parar antes a repostar.",
      en: "Less fuel = a lighter, faster car, but you have to pit to refuel sooner.",
    },
  },
  {
    id: "virtual_energy",
    group: "other",
    name: { es: "Energía virtual (Hypercar)", en: "Virtual energy (Hypercar)" },
    unit: "%",
    min: 50,
    max: 100,
    step: 1,
    default: 100,
    whatItDoes: {
      es: "Solo Hypercar: límite de energía total (combustible + híbrido) por stint según el reglamento WEC. Default 100%. Es central en la estrategia de LMU.",
      en: "Hypercar only: total energy limit (fuel + hybrid) per stint under WEC rules. Default 100%. Central to LMU strategy.",
    },
    increaseEffect: {
      es: "Más energía virtual = más rendimiento disponible por stint, pero menos margen para estirar la autonomía.",
      en: "More virtual energy = more performance available per stint, but less margin to stretch range.",
    },
    decreaseEffect: {
      es: "Menos energía virtual = ritmo más conservador para alargar el stint y ahorrar una parada.",
      en: "Less virtual energy = a more conservative pace to extend the stint and save a stop.",
    },
  },
];

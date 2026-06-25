import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de Le Mans Ultimate reconstruidos 1:1 contra el editor
// IN-GAME (Bahrain, 2026-06-25) con DOS capturas de referencia:
//   • Hypercar = Alpine A424 #35  → define los DEFAULTS GLOBALES de este archivo.
//   • LMGT3    = McLaren 720S LMGT3 Evo #59 (Racing Spirit of Léman) → se aplica
//     como paramOverrides de la clase `lmgt3` en cars.ts (defaults + rangos).
//
// El editor real tiene 6 pestañas (Básica, Transmisión, Ruedas y Frenos,
// Suspensión, Amortiguadores, Chasis y Aerodinámica) y el MISMO template para
// ambas clases, pero varios ajustes cambian por clase. Lo que SOLO tiene una
// clase se modela como extraParams en cars.ts (no acá):
//   • Hypercar: 3.er resorte (heave), muelle de goma, regen, mapa eléctrico,
//     diff power/inercia y diff delantero (híbrido AWD).
//   • LMGT3: ABS (los Hypercar corren SIN ABS → "N/A" en su editor).
//
// Unidades EXACTAS del juego: presión kPa, camber/toe en grados, altura y disco
// de freno en cm, ala/barras/dampers/muelles en índice/clicks, precarga en Nm.
// Los DEFAULTS salen exactos de la captura; los min/max/step son ESTIMADOS
// (el editor no muestra los topes) — marcados "(rango estimado)" — eligiéndolos
// para dejar el default holgado, ser plausibles por clase y no recortar las
// reglas. Solo Hypercar y LMGT3 están verificados con captura; LMP2/LMP3/GTE
// heredan estos globales hasta tener su propia captura.
export const lmuParameters: ParameterDef[] = [
  // ── Neumáticos / Presiones (Ruedas y Frenos) ──────────────────────────────
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión neumáticos delanteros", en: "Front tyre pressure" },
    unit: "kPa",
    min: 110,
    max: 180,
    step: 1,
    default: 131,
    whatItDoes: {
      es: "Presión en frío del tren delantero (kPa). LMU apunta a una ventana de temperatura/presión en caliente; se parte por debajo del objetivo porque la presión sube con el calor. (rango estimado)",
      en: "Cold front pressure (kPa). LMU targets a hot temperature/pressure window; you start below target because pressure rises with heat. (estimated range)",
    },
    increaseEffect: {
      es: "Calienta más rápido y respuesta más alerta, pero menos huella y agarre de pico; si te pasas, patina.",
      en: "Faster warm-up and sharper response, but less contact patch and peak grip; too high and it slides.",
    },
    decreaseEffect: {
      es: "Más huella y agarre predecible, pero calienta más lento y la goma flexiona de más si bajas demasiado.",
      en: "More contact patch and predictable grip, but slower warm-up and the tyre flexes too much if too low.",
    },
  },
  {
    id: "tyre_pressure_rear",
    group: "tyres",
    name: { es: "Presión neumáticos traseros", en: "Rear tyre pressure" },
    unit: "kPa",
    min: 110,
    max: 180,
    step: 1,
    default: 131,
    whatItDoes: {
      es: "Presión en frío del tren trasero (kPa): afecta tracción y estabilidad de la cola. Misma ventana objetivo que adelante. (rango estimado)",
      en: "Cold rear pressure (kPa): affects traction and rear stability. Same target window as the front. (estimated range)",
    },
    increaseEffect: {
      es: "Cola más nerviosa y con menos agarre de pico; puede soltar al acelerar.",
      en: "Twitchier rear with less peak grip; can step out on power.",
    },
    decreaseEffect: {
      es: "Más tracción y estabilidad atrás, hasta que la presión cae tanto que recalienta por flexión.",
      en: "More traction and rear stability, until pressure drops so low it overheats from flex.",
    },
  },
  // ── Alineación (Caída / Convergencia) ──────────────────────────────────────
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Caída (camber) delantera", en: "Front camber" },
    unit: "°",
    min: -4.5,
    max: -0.5,
    step: 0.1,
    default: -1.3,
    whatItDoes: {
      es: "Inclinación de la rueda vista de frente. Más negativo = más agarre lateral en curva (mejor huella al rolar), menos en recta y frenada. (rango estimado)",
      en: "Wheel lean seen from the front. More negative = more cornering grip (better patch while rolling), less under braking/on straights. (estimated range)",
    },
    increaseEffect: {
      es: "Hacia 0 mejora tracción de salida y frenada en recta, pero baja el agarre lateral en apoyo.",
      en: "Toward 0 improves on-throttle traction and straight-line braking, but lowers lateral grip while loaded.",
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
    max: -0.5,
    step: 0.1,
    default: -1.2,
    whatItDoes: {
      es: "Caída del tren trasero: cuánto agarre lateral tiene la cola en curva sin perder demasiada tracción. (rango estimado)",
      en: "Rear axle camber: how much lateral grip the rear has in corners without losing too much traction. (estimated range)",
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
    min: -0.5,
    max: 0.5,
    step: 0.01,
    default: -0.18,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas vistas desde arriba. Negativo (toe-out) = más reactivo y mejor rotación al doblar. (rango estimado)",
      en: "Where the wheels point seen from above. Negative (toe-out) = sharper turn-in and better rotation. (estimated range)",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo) da estabilidad en recta y frenada, pero entra más perezoso y calienta más la goma.",
      en: "Toward toe-in (positive) adds straight-line and braking stability, but lazier turn-in and more tyre heat.",
    },
    decreaseEffect: {
      es: "Más toe-out agiliza entrada y rotación, con algo más de nerviosismo y desgaste.",
      en: "More toe-out sharpens entry and rotation, with a bit more nervousness and wear.",
    },
  },
  {
    id: "toe_rear",
    group: "alignment",
    name: { es: "Convergencia (toe) trasera", en: "Rear toe" },
    unit: "°",
    min: -0.1,
    max: 0.6,
    step: 0.01,
    default: 0.18,
    whatItDoes: {
      es: "Convergencia del tren trasero. Casi siempre en toe-in para estabilidad de tracción. (rango estimado)",
      en: "Rear axle toe. Almost always left in toe-in for traction stability. (estimated range)",
    },
    increaseEffect: {
      es: "Más toe-in estabiliza mucho la cola al acelerar, a costa de algo de punta y más calor.",
      en: "More toe-in greatly stabilises the rear on power, costing a touch of top speed and more heat.",
    },
    decreaseEffect: {
      es: "Menos toe-in libera la cola y da más rotación, con menos estabilidad de tracción.",
      en: "Less toe-in frees the rear for more rotation, with less traction stability.",
    },
  },
  // ── Aerodinámica ───────────────────────────────────────────────────────────
  {
    id: "rear_wing",
    group: "aero",
    name: { es: "Ala trasera", en: "Rear wing" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 13,
    whatItDoes: {
      es: "Ángulo del alerón trasero: genera carga aerodinámica atrás y equilibra con el rake. OJO: en Hypercar es una escala de pasos (P1-P20, acá P13); en LMGT3 el editor lo muestra en GRADOS (rango 0-15°, default 10.0°). (rango estimado)",
      en: "Rear wing angle: makes rear downforce and balances with rake. NOTE: in Hypercar it's a step scale (P1-P20, here P13); in LMGT3 the editor shows DEGREES (0-15° range, default 10.0°). (estimated range)",
    },
    increaseEffect: {
      es: "Más ala estabiliza la cola en curvas rápidas y frenada, a costa de velocidad punta y más resistencia.",
      en: "More wing stabilises the rear in fast corners and braking, costing top speed and adding drag.",
    },
    decreaseEffect: {
      es: "Menos ala da más punta pero la cola se vuelve nerviosa/sobreviradora en alta velocidad.",
      en: "Less wing gives more top speed but the rear gets nervous/oversteery at high speed.",
    },
  },
  {
    id: "front_diffuser",
    group: "aero",
    name: { es: "Difusor delantero", en: "Front diffuser" },
    unit: "",
    min: 0,
    max: 2,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Selector del difusor/carga aero delantera (Estándar por defecto). Define el balance aero delantero/trasero a alta velocidad. En muchos autos viene fijo por BoP. (rango estimado)",
      en: "Front diffuser/aero selector (Standard by default). Sets the front/rear aero balance at high speed. On many cars it's fixed by BoP. (estimated range)",
    },
    increaseEffect: {
      es: "Más carga delantera = mejor giro a alta velocidad, pero puede reducir la estabilidad trasera.",
      en: "More front load = better high-speed turn-in, but can reduce rear stability.",
    },
    decreaseEffect: {
      es: "Menos carga delantera = frente más estable pero con tendencia al subviraje en curvas rápidas.",
      en: "Less front load = more stable front but a tendency to understeer in fast corners.",
    },
  },
  // ── Suspensión (resortes / barras / alturas) ──────────────────────────────
  {
    id: "spring_rate_front",
    group: "suspension",
    name: { es: "Índice de muelles delantero", en: "Front spring rate" },
    unit: "",
    min: 1,
    max: 15,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Dureza del resorte delantero (índice). Controla cuánto se hunde el frente y la estabilidad de la plataforma aero. (rango estimado)",
      en: "Front spring stiffness (index). Controls how much the front dives and the aero platform stability. (estimated range)",
    },
    increaseEffect: {
      es: "Más duro = giro más afilado y mejor control de la plataforma aero, pero menos agarre mecánico en pianos.",
      en: "Stiffer = sharper turn-in and better aero platform control, but less mechanical grip over kerbs.",
    },
    decreaseEffect: {
      es: "Más blando = más agarre mecánico en piso bacheado, con respuesta más perezosa y más cambio de altura.",
      en: "Softer = more mechanical grip on bumpy surfaces, with lazier response and bigger ride-height changes.",
    },
  },
  {
    id: "spring_rate_rear",
    group: "suspension",
    name: { es: "Índice de muelles trasero", en: "Rear spring rate" },
    unit: "",
    min: 1,
    max: 15,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Dureza del resorte trasero (índice). Afecta tracción, estabilidad de la cola y cuánto se hunde al acelerar y con combustible. (rango estimado)",
      en: "Rear spring stiffness (index). Affects traction, rear stability and how much it squats on power and with fuel. (estimated range)",
    },
    increaseEffect: {
      es: "Más duro = cola más reactiva y plataforma más estable, pero menos tracción mecánica.",
      en: "Stiffer = sharper rear and a more stable platform, but less mechanical traction.",
    },
    decreaseEffect: {
      es: "Más blando = más tracción y agarre en piso irregular, con la cola hundiéndose más al acelerar.",
      en: "Softer = more traction and grip on uneven surfaces, with the rear squatting more on power.",
    },
  },
  {
    id: "tender_spring_front",
    group: "suspension",
    name: { es: "Muelle tender delantero", en: "Front tender spring" },
    unit: "",
    min: 0,
    max: 15,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Resorte auxiliar (tender) en serie con el principal: suaviza el primer tramo de recorrido. 0 = Desacoplada (sin tender), como en ambas capturas. (rango estimado)",
      en: "Helper (tender) spring in series with the main spring: softens the first part of travel. 0 = Decoupled (no tender), as in both captures. (estimated range)",
    },
    increaseEffect: {
      es: "Acoplar/endurecer el tender cambia la rigidez inicial: más control de plataforma a costa de confort inicial.",
      en: "Coupling/stiffening the tender changes initial rate: more platform control at the cost of initial compliance.",
    },
    decreaseEffect: {
      es: "Desacoplar (0) deja actuar solo el resorte principal: respuesta más lineal.",
      en: "Decoupling (0) leaves only the main spring acting: more linear response.",
    },
  },
  {
    id: "tender_spring_rear",
    group: "suspension",
    name: { es: "Muelle tender trasero", en: "Rear tender spring" },
    unit: "",
    min: 0,
    max: 15,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Resorte auxiliar (tender) trasero en serie con el principal. 0 = Desacoplada, como en ambas capturas. (rango estimado)",
      en: "Rear helper (tender) spring in series with the main spring. 0 = Decoupled, as in both captures. (estimated range)",
    },
    increaseEffect: {
      es: "Acoplar/endurecer el tender trasero rigidiza el primer tramo: más control de cola en transiciones.",
      en: "Coupling/stiffening the rear tender stiffens the first part: more rear control in transitions.",
    },
    decreaseEffect: {
      es: "Desacoplar (0) deja solo el resorte principal trasero.",
      en: "Decoupling (0) leaves only the main rear spring.",
    },
  },
  {
    id: "bumpstop_front",
    group: "suspension",
    name: { es: "Topes / Packers delanteros", en: "Front bumpstops / packers" },
    unit: "cm",
    min: 0,
    max: 5,
    step: 0.1,
    default: 0.0,
    whatItDoes: {
      es: "Limitan el recorrido de la suspensión delantera para que el auto no toque fondo en zonas rápidas sin cambiar la altura estática; protegen la plataforma aero. (rango estimado)",
      en: "Limit front suspension travel so the car doesn't bottom out in fast sections without changing static ride height; protect the aero platform. (estimated range)",
    },
    increaseEffect: {
      es: "Más packer = la suspensión topa antes: plataforma más estable pero más dura sobre baches grandes.",
      en: "More packer = suspension bottoms sooner: more stable platform but harsher over big bumps.",
    },
    decreaseEffect: {
      es: "Menos packer = más recorrido y absorción, con más riesgo de tocar fondo en compresiones rápidas.",
      en: "Less packer = more travel and absorption, with more risk of bottoming in fast compressions.",
    },
  },
  {
    id: "bumpstop_rear",
    group: "suspension",
    name: { es: "Topes / Packers traseros", en: "Rear bumpstops / packers" },
    unit: "cm",
    min: 0,
    max: 5,
    step: 0.1,
    default: 0.0,
    whatItDoes: {
      es: "Topes del tren trasero: limitan el recorrido para proteger el piso y la plataforma aero atrás. (rango estimado)",
      en: "Rear bumpstops: limit travel to protect the floor and the rear aero platform. (estimated range)",
    },
    increaseEffect: {
      es: "Más packer = topa antes atrás: cola más estable en compresión, más dura sobre baches.",
      en: "More packer = rear bottoms sooner: more stable rear under compression, harsher over bumps.",
    },
    decreaseEffect: {
      es: "Menos packer = más recorrido trasero, con más riesgo de tocar fondo.",
      en: "Less packer = more rear travel, with more bottoming risk.",
    },
  },
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Altura delantera", en: "Front ride height" },
    unit: "cm",
    min: 3.0,
    max: 9.0,
    step: 0.1,
    default: 4.2,
    whatItDoes: {
      es: "Altura estática del piso adelante (cm, sin combustible). Crítica por la sensibilidad aero. Junto con la trasera define el rake. (rango estimado)",
      en: "Static front floor height (cm, no fuel). Critical due to aero sensitivity. With the rear it sets the rake. (estimated range)",
    },
    increaseEffect: {
      es: "Subir da recorrido para pianos/baches y menos riesgo de fondo, restando downforce y eficiencia.",
      en: "Raising gives travel for kerbs/bumps and less bottoming, costing downforce and efficiency.",
    },
    decreaseEffect: {
      es: "Bajar aumenta downforce y eficiencia aero, pero arriesga tocar fondo y desestabilizar la plataforma.",
      en: "Lowering increases downforce and aero efficiency, but risks bottoming and unsettling the platform.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Altura trasera", en: "Rear ride height" },
    unit: "cm",
    min: 4.0,
    max: 11.0,
    step: 0.1,
    default: 6.3,
    whatItDoes: {
      es: "Altura del tren trasero (cm). Junto con la delantera define el rake: más rake = frente más punzante y más sobreviraje de entrada. (rango estimado)",
      en: "Rear ride height (cm). With the front it sets the rake: more rake = sharper front and more entry oversteer. (estimated range)",
    },
    increaseEffect: {
      es: "Subir atrás aumenta el rake: más carga aero y rotación, hasta volverse inestable si te pasas.",
      en: "Raising the rear adds rake: more aero load and rotation, until it gets unstable if overdone.",
    },
    decreaseEffect: {
      es: "Bajar atrás reduce el rake y estabiliza la cola en alta velocidad, restando algo de rotación.",
      en: "Lowering the rear reduces rake and stabilises the car at high speed, costing some rotation.",
    },
  },
  {
    id: "arb_front",
    group: "suspension",
    name: { es: "Barra estabilizadora delantera", en: "Front anti-roll bar" },
    unit: "",
    min: 1,
    max: 11,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Resistencia al balanceo del eje delantero (escala P1-P11). Herramienta principal para balancear el auto sin tocar resortes. Más dura = menos agarre delantero relativo. (rango estimado)",
      en: "Front axle roll resistance (P1-P11 scale). The main tool to balance the car without touching springs. Stiffer = less relative front grip. (estimated range)",
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
    min: 1,
    max: 11,
    step: 1,
    default: 2,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero (escala P1-P11). Más dura = cola más reactiva y menos agarre atrás. (rango estimado)",
      en: "Rear axle roll resistance (P1-P11 scale). Stiffer = sharper rear and less rear grip. (estimated range)",
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
    id: "steering_lock",
    group: "other",
    name: { es: "Radio de giro (bloqueo)", en: "Steering lock" },
    unit: "°",
    min: 8.0,
    max: 30.0,
    step: 0.1,
    default: 13.3,
    whatItDoes: {
      es: "Ángulo máximo de giro de las ruedas (el editor lo muestra como giro total del volante y, entre paréntesis, el ángulo de rueda). Se adapta al circuito y al gusto del piloto. (rango estimado)",
      en: "Maximum steering angle of the wheels (the editor shows total wheel rotation and, in parentheses, the road-wheel angle). Adapted to the track and driver preference. (estimated range)",
    },
    increaseEffect: {
      es: "Más bloqueo = giro más cerrado para horquillas, pero la dirección se vuelve más sensible en alta velocidad.",
      en: "More lock = tighter turning for hairpins, but steering gets more sensitive at high speed.",
    },
    decreaseEffect: {
      es: "Menos bloqueo = dirección más precisa en alta velocidad, pero puede quedar corto en curvas muy lentas.",
      en: "Less lock = more precise steering at high speed, but can run short in very slow corners.",
    },
  },
  // ── Amortiguadores (lenta + rápida, por eje) ───────────────────────────────
  {
    id: "damper_slow_bump_front",
    group: "dampers",
    name: { es: "Compresión lenta delantera", en: "Front slow bump" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 10,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero a comprimirse a baja velocidad de vástago (transferencias de peso al frenar/doblar). En LMGT3 el editor lo muestra como 'B##' con rango mayor. (rango estimado)",
      en: "Front damper resistance to low-speed compression (weight transfers when braking/turning). In LMGT3 the editor shows it as 'B##' with a larger range. (estimated range)",
    },
    increaseEffect: {
      es: "Más compresión lenta = frente más firme en transferencias, pero menos absorción y agarre mecánico.",
      en: "More slow bump = firmer front in transfers, but less absorption and mechanical grip.",
    },
    decreaseEffect: {
      es: "Menos compresión lenta = más absorción y agarre, con la plataforma moviéndose más bajo carga.",
      en: "Less slow bump = more absorption and grip, with the platform moving more under load.",
    },
  },
  {
    id: "damper_slow_rebound_front",
    group: "dampers",
    name: { es: "Extensión lenta delantera", en: "Front slow rebound" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 10,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero a extenderse a baja velocidad: controla cuánto retiene el peso transferido. En LMGT3 se muestra como 'R##'. (rango estimado)",
      en: "Front damper resistance to low-speed extension: controls how long it holds transferred weight. In LMGT3 shown as 'R##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más extensión lenta mantiene el peso adelante más tiempo (más estable en transiciones), pero puede 'enganchar' la rueda.",
      en: "More slow rebound keeps weight forward longer (more stable in transitions), but can 'pack down' the wheel.",
    },
    decreaseEffect: {
      es: "Menos extensión lenta = retorno más rápido del resorte; frente más suelto pero más vivo.",
      en: "Less slow rebound = faster spring return; looser but livelier front.",
    },
  },
  {
    id: "damper_fast_bump_front",
    group: "dampers",
    name: { es: "Compresión rápida delantera", en: "Front fast bump" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero a comprimirse a ALTA velocidad de vástago (pianos y baches bruscos). En LMGT3 se muestra como 'B##'. (rango estimado)",
      en: "Front damper resistance to HIGH-speed compression (kerbs and sharp bumps). In LMGT3 shown as 'B##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más compresión rápida = el auto reacciona más firme a pianos, pero puede saltar y perder agarre.",
      en: "More fast bump = firmer reaction to kerbs, but can skip and lose grip.",
    },
    decreaseEffect: {
      es: "Menos compresión rápida = absorbe mejor pianos y baches, manteniendo la rueda en el piso.",
      en: "Less fast bump = better kerb/bump absorption, keeping the wheel on the road.",
    },
  },
  {
    id: "damper_fast_rebound_front",
    group: "dampers",
    name: { es: "Extensión rápida delantera", en: "Front fast rebound" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero a extenderse a ALTA velocidad: cómo vuelve la rueda tras un piano. En LMGT3 se muestra como 'R##'. (rango estimado)",
      en: "Front damper resistance to HIGH-speed extension: how the wheel returns after a kerb. In LMGT3 shown as 'R##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más extensión rápida = la rueda vuelve más controlada tras un piano, pero puede quedar 'colgada'.",
      en: "More fast rebound = the wheel returns more controlled after a kerb, but can stay 'hung up'.",
    },
    decreaseEffect: {
      es: "Menos extensión rápida = la rueda vuelve antes al piso tras un golpe; más agarre sobre piso irregular.",
      en: "Less fast rebound = the wheel returns to the road sooner after a hit; more grip on uneven ground.",
    },
  },
  {
    id: "damper_slow_bump_rear",
    group: "dampers",
    name: { es: "Compresión lenta trasera", en: "Rear slow bump" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 2,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero a comprimirse a baja velocidad (transferencia al acelerar/cargar). En LMGT3 se muestra como 'B##'. (rango estimado)",
      en: "Rear damper resistance to low-speed compression (transfer on power/load). In LMGT3 shown as 'B##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más compresión lenta atrás = cola más firme en transferencias, menos absorción.",
      en: "More rear slow bump = firmer rear in transfers, less absorption.",
    },
    decreaseEffect: {
      es: "Menos compresión lenta atrás = más tracción y absorción al cargar la cola.",
      en: "Less rear slow bump = more traction and absorption as the rear loads.",
    },
  },
  {
    id: "damper_slow_rebound_rear",
    group: "dampers",
    name: { es: "Extensión lenta trasera", en: "Rear slow rebound" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero a extenderse a baja velocidad: cuánto retiene el peso atrás. En LMGT3 se muestra como 'R##'. (rango estimado)",
      en: "Rear damper resistance to low-speed extension: how long it holds rear weight. In LMGT3 shown as 'R##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más extensión lenta atrás = más estable en transiciones, pero puede 'enganchar' la cola.",
      en: "More rear slow rebound = more stable in transitions, but can 'pack down' the rear.",
    },
    decreaseEffect: {
      es: "Menos extensión lenta atrás = cola con retorno más rápido; más viva y con más tracción mecánica.",
      en: "Less rear slow rebound = faster rear return; livelier with more mechanical traction.",
    },
  },
  {
    id: "damper_fast_bump_rear",
    group: "dampers",
    name: { es: "Compresión rápida trasera", en: "Rear fast bump" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero a comprimirse a ALTA velocidad (pianos/baches). En LMGT3 se muestra como 'B##'. (rango estimado)",
      en: "Rear damper resistance to HIGH-speed compression (kerbs/bumps). In LMGT3 shown as 'B##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más compresión rápida atrás = cola más firme en pianos, pero puede saltar y soltar.",
      en: "More rear fast bump = firmer rear over kerbs, but can skip and step out.",
    },
    decreaseEffect: {
      es: "Menos compresión rápida atrás = absorbe mejor pianos, manteniendo tracción.",
      en: "Less rear fast bump = better kerb absorption, keeping traction.",
    },
  },
  {
    id: "damper_fast_rebound_rear",
    group: "dampers",
    name: { es: "Extensión rápida trasera", en: "Rear fast rebound" },
    unit: "",
    min: 0,
    max: 25,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero a extenderse a ALTA velocidad: cómo vuelve la cola tras un piano. En LMGT3 se muestra como 'R##'. (rango estimado)",
      en: "Rear damper resistance to HIGH-speed extension: how the rear returns after a kerb. In LMGT3 shown as 'R##'. (estimated range)",
    },
    increaseEffect: {
      es: "Más extensión rápida atrás = cola más controlada tras un piano, con riesgo de quedar 'colgada'.",
      en: "More rear fast rebound = more controlled rear after a kerb, with risk of staying 'hung up'.",
    },
    decreaseEffect: {
      es: "Menos extensión rápida atrás = la cola vuelve antes al piso; más agarre sobre piso irregular.",
      en: "Less rear fast rebound = the rear returns sooner; more grip on uneven ground.",
    },
  },
  // ── Diferencial ───────────────────────────────────────────────────────────
  {
    id: "diff_preload",
    group: "differential",
    name: { es: "Precarga del diferencial", en: "Differential preload" },
    unit: "Nm",
    min: 0,
    max: 300,
    step: 5,
    default: 60,
    whatItDoes: {
      es: "Fuerza mínima a vencer antes de que el diferencial desbloquee (Nm). Afecta cómo reacciona la cola en transiciones suaves de acelerador. (rango estimado)",
      en: "Minimum force to overcome before the diff unlocks (Nm). Affects how the rear reacts in gentle throttle transitions. (estimated range)",
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
  // ── Frenos ────────────────────────────────────────────────────────────────
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Reparto de frenada", en: "Brake bias" },
    unit: "%",
    min: 45.0,
    max: 65.0,
    step: 0.2,
    default: 56.0,
    whatItDoes: {
      es: "Porcentaje de freno al eje delantero (~50-60% típico en LMU). Más alto = más freno adelante. (rango estimado)",
      en: "Percentage of braking to the front axle (~50-60% typical in LMU). Higher = more front brake. (estimated range)",
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
    name: { es: "Migración de frenada", en: "Brake migration" },
    unit: "%",
    min: 0.0,
    max: 5.0,
    step: 0.5,
    default: 1.0,
    whatItDoes: {
      es: "Mueve el reparto hacia adelante a medida que SUBE la presión del pedal (frenada fuerte): más estabilidad al inicio y devuelve rotación al soltar hacia el apex. (rango estimado)",
      en: "Shifts brake bias forward as pedal pressure RISES (hard braking): more stability at the start, returning rotation as you release toward the apex. (estimated range)",
    },
    increaseEffect: {
      es: "Más migración = más bias delantero al pisar fuerte: más estabilidad y frenada más corta al inicio.",
      en: "More migration = more front bias under heavy pedal: more stability and shorter braking at the start.",
    },
    decreaseEffect: {
      es: "Menos migración = reparto más plano y menos estable en frenada dura.",
      en: "Less migration = a flatter bias and less stability under hard braking.",
    },
  },
  {
    id: "brake_pedal_force",
    group: "brakes",
    name: { es: "Fuerza máxima del pedal", en: "Max pedal force" },
    unit: "%",
    min: 70,
    max: 100,
    step: 1,
    default: 96,
    whatItDoes: {
      es: "Fuerza de frenado a fondo del pedal (%, el editor también muestra el kgf equivalente). Se calibra a la pedalera del piloto. (rango estimado)",
      en: "Braking force at full pedal (%, the editor also shows the equivalent kgf). Calibrated to the driver's pedals. (estimated range)",
    },
    increaseEffect: {
      es: "Más fuerza = mordida más fuerte y respuesta más agresiva, pero más fácil de bloquear.",
      en: "More force = stronger bite and more aggressive response, but easier to lock up.",
    },
    decreaseEffect: {
      es: "Menos fuerza = frenada más modulable y difícil de bloquear, pero puede quedarse corta de potencia.",
      en: "Less force = more modulated braking that's harder to lock, but can run short of stopping power.",
    },
  },
  {
    id: "brake_disc_front",
    group: "brakes",
    name: { es: "Disco de freno delantero", en: "Front brake disc" },
    unit: "cm",
    min: 2.5,
    max: 4.0,
    step: 0.01,
    default: 3.70,
    whatItDoes: {
      es: "Grosor/diámetro del disco delantero (cm). Un disco más grueso aguanta más temperatura y dura más en carrera larga, sumando algo de peso. (rango estimado)",
      en: "Front disc thickness/diameter (cm). A thicker disc holds more temperature and lasts longer in long races, adding a little weight. (estimated range)",
    },
    increaseEffect: {
      es: "Disco más grueso = más masa térmica: frenos más consistentes en stints largos, con algo más de peso.",
      en: "Thicker disc = more thermal mass: more consistent brakes over long stints, with a bit more weight.",
    },
    decreaseEffect: {
      es: "Disco más fino = menos peso y calienta antes (útil en frío), pero se desgasta más rápido.",
      en: "Thinner disc = less weight and heats sooner (useful when cold), but wears faster.",
    },
  },
  {
    id: "brake_disc_rear",
    group: "brakes",
    name: { es: "Disco de freno trasero", en: "Rear brake disc" },
    unit: "cm",
    min: 2.5,
    max: 4.0,
    step: 0.01,
    default: 3.20,
    whatItDoes: {
      es: "Grosor/diámetro del disco trasero (cm). Mismo concepto que el delantero, en el eje trasero. (rango estimado)",
      en: "Rear disc thickness/diameter (cm). Same concept as the front, on the rear axle. (estimated range)",
    },
    increaseEffect: {
      es: "Disco más grueso atrás = más consistencia térmica en carrera larga, con algo más de peso.",
      en: "Thicker rear disc = more thermal consistency in long races, with a bit more weight.",
    },
    decreaseEffect: {
      es: "Disco más fino atrás = menos peso y entra antes en temperatura, con más desgaste.",
      en: "Thinner rear disc = less weight and reaches temperature sooner, with more wear.",
    },
  },
  {
    id: "brake_duct_front",
    group: "brakes",
    name: { es: "Ducto de freno delantero", en: "Front brake duct" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 0,
    whatItDoes: {
      es: "Obturación del ducto de freno delantero: 0% = Abierto (máxima refrigeración); valores altos = más cerrado (retiene calor y reduce algo de resistencia aero). (rango estimado)",
      en: "Front brake duct blanking: 0% = Open (max cooling); higher = more closed (retains heat and cuts a little aero drag). (estimated range)",
    },
    increaseEffect: {
      es: "Más cerrado = retiene temperatura de freno (útil en frío) y reduce resistencia, con riesgo de sobrecalentar en calor.",
      en: "More closed = retains brake heat (useful when cold) and cuts drag, with overheating risk in the heat.",
    },
    decreaseEffect: {
      es: "Más abierto = frenos más fríos y consistentes en calor/carrera larga, con algo de penalización aero.",
      en: "More open = cooler, more consistent brakes in heat/long races, with a small aero penalty.",
    },
  },
  {
    id: "brake_duct_rear",
    group: "brakes",
    name: { es: "Ducto de freno trasero", en: "Rear brake duct" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 0,
    whatItDoes: {
      es: "Obturación del ducto de freno trasero: 0% = Abierto; valores altos = más cerrado. Mismo criterio que el delantero. (rango estimado)",
      en: "Rear brake duct blanking: 0% = Open; higher = more closed. Same criterion as the front. (estimated range)",
    },
    increaseEffect: {
      es: "Más cerrado atrás = retiene calor de freno y reduce resistencia, con riesgo de sobrecalentar.",
      en: "More closed rear = retains brake heat and cuts drag, with overheating risk.",
    },
    decreaseEffect: {
      es: "Más abierto atrás = frenos traseros más fríos y consistentes, con algo de penalización aero.",
      en: "More open rear = cooler, more consistent rear brakes, with a small aero penalty.",
    },
  },
  // ── Transmisión / Motor ────────────────────────────────────────────────────
  {
    id: "gear_ratio",
    group: "gearing",
    name: { es: "Relación de cambio", en: "Gear ratio set" },
    unit: "",
    min: 0,
    max: 2,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Selector del juego de relaciones: 0 = Short (corta), 1 = Standard, 2 = Long (larga). Se adapta a la recta más larga del circuito. (rango estimado)",
      en: "Gear set selector: 0 = Short, 1 = Standard, 2 = Long. Adapted to the longest straight of the circuit. (estimated range)",
    },
    increaseEffect: {
      es: "Hacia Long = más velocidad punta pero menos aceleración; ideal en circuitos de rectas largas.",
      en: "Toward Long = more top speed but less acceleration; ideal on high-top-speed tracks.",
    },
    decreaseEffect: {
      es: "Hacia Short = más aceleración y mejor salida de curvas lentas, pero menos punta.",
      en: "Toward Short = more acceleration and better drive out of slow corners, but less top speed.",
    },
  },
  {
    id: "rev_limiter",
    group: "other",
    name: { es: "Limitador de revoluciones", en: "Rev limiter" },
    unit: "rpm",
    min: 5000,
    max: 12000,
    step: 100,
    default: 9000,
    whatItDoes: {
      es: "Régimen máximo permitido del motor (rpm). Bajarlo protege el motor y ahorra combustible; subirlo da algo más de punta donde el reglamento lo permite. (rango estimado)",
      en: "Maximum allowed engine speed (rpm). Lowering protects the engine and saves fuel; raising gives a bit more top end where regulations allow. (estimated range)",
    },
    increaseEffect: {
      es: "Más rpm = más potencia/punta donde se permita, a costa de consumo y desgaste de motor.",
      en: "More rpm = more power/top end where allowed, at the cost of fuel and engine wear.",
    },
    decreaseEffect: {
      es: "Menos rpm = motor más conservador y menor consumo, con algo menos de punta.",
      en: "Fewer rpm = a more conservative engine and lower consumption, with slightly less top end.",
    },
  },
  {
    id: "engine_mixture",
    group: "other",
    name: { es: "Mezcla del motor", en: "Engine mixture" },
    unit: "",
    min: 1,
    max: 6,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Mapa de mezcla/potencia del motor (selector: p. ej. Lean / Race / Full). Más alto = más potencia y consumo; más bajo = ahorra combustible. (rango estimado)",
      en: "Engine mixture/power map (selector: e.g. Lean / Race / Full). Higher = more power and consumption; lower = saves fuel. (estimated range)",
    },
    increaseEffect: {
      es: "Mezcla más rica = más potencia y respuesta, gastando más combustible por vuelta.",
      en: "Richer mixture = more power and response, burning more fuel per lap.",
    },
    decreaseEffect: {
      es: "Mezcla más pobre = ahorra combustible para alargar el stint, con menos potencia.",
      en: "Leaner mixture = saves fuel to extend the stint, with less power.",
    },
  },
  {
    id: "radiator_water",
    group: "other",
    name: { es: "Tapa del radiador de agua", en: "Water radiator tape" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 0,
    whatItDoes: {
      es: "Obturación del radiador de agua: 0% = sin tapa (máxima refrigeración del motor); más alto = más tapado (motor más caliente, menos resistencia aero). (rango estimado)",
      en: "Water radiator blanking: 0% = no tape (max engine cooling); higher = more taped (hotter engine, less aero drag). (estimated range)",
    },
    increaseEffect: {
      es: "Más tapa = motor más caliente y menos resistencia (útil en frío), con riesgo de sobrecalentar en calor.",
      en: "More tape = hotter engine and less drag (useful when cold), with overheating risk in the heat.",
    },
    decreaseEffect: {
      es: "Menos tapa = motor más fresco y seguro en calor, con algo más de resistencia aero.",
      en: "Less tape = cooler, safer engine in the heat, with a bit more aero drag.",
    },
  },
  {
    id: "radiator_oil",
    group: "other",
    name: { es: "Tapa del radiador de aceite", en: "Oil radiator tape" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 0,
    whatItDoes: {
      es: "Obturación del radiador de aceite: 0% = sin tapa; más alto = más tapado. Mismo criterio que el de agua. (rango estimado)",
      en: "Oil radiator blanking: 0% = no tape; higher = more taped. Same criterion as the water one. (estimated range)",
    },
    increaseEffect: {
      es: "Más tapa = aceite más caliente y menos resistencia, con riesgo térmico en calor.",
      en: "More tape = hotter oil and less drag, with thermal risk in the heat.",
    },
    decreaseEffect: {
      es: "Menos tapa = aceite más fresco y seguro, con algo más de resistencia aero.",
      en: "Less tape = cooler, safer oil, with a bit more aero drag.",
    },
  },
  // ── Electrónica (TC, 3 canales — universal en autos con TC) ─────────────────
  {
    id: "tc",
    group: "electronics",
    name: { es: "Control de tracción (TC)", en: "Traction Control (TC)" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Nivel base del control de tracción (1-11). Más alto = interviene antes para frenar el patinaje. Primer canal de los tres (TC + Menor potencia + Ángulo de patinaje). En prototipos sin TC (LMP2/LMP3) queda en 0. (rango estimado)",
      en: "Base traction control level (1-11). Higher = intervenes earlier to stop wheelspin. First of three channels (TC + Power cut + Slip angle). On prototypes without TC (LMP2/LMP3) it stays at 0. (estimated range)",
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
    id: "tc_power",
    group: "electronics",
    name: { es: "Menor potencia del CT (Power Cut)", en: "TC Power Cut" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Segundo canal del TC: cuánta potencia corta el sistema cuando detecta patinaje (1-11). Más alto = corte más agresivo. En prototipos sin TC queda en 0. (rango estimado)",
      en: "Second TC channel: how much power the system cuts when it detects slip (1-11). Higher = more aggressive cut. On prototypes without TC it stays at 0. (estimated range)",
    },
    increaseEffect: {
      es: "Más corte = más seguro en baja adherencia, a costa de aceleración.",
      en: "More cut = safer on low grip, at the cost of acceleration.",
    },
    decreaseEffect: {
      es: "Menos corte = más aceleración y rotación, con más riesgo de patinar.",
      en: "Less cut = more acceleration and rotation, with more wheelspin risk.",
    },
  },
  {
    id: "tc_slip",
    group: "electronics",
    name: { es: "Ángulo de patinaje del CT (Slip Angle)", en: "TC Slip Angle" },
    unit: "",
    min: 0,
    max: 11,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Tercer canal del TC: cuánto patinaje se permite antes de intervenir (1-11). Más bajo = interviene antes (más conservador). En prototipos sin TC queda en 0. (rango estimado)",
      en: "Third TC channel: how much slip is allowed before it intervenes (1-11). Lower = intervenes sooner (more conservative). On prototypes without TC it stays at 0. (estimated range)",
    },
    increaseEffect: {
      es: "Más slip permitido = deja patinar más antes de actuar: más potencia disponible, menos red de seguridad.",
      en: "More slip allowed = lets the wheels spin more before acting: more power available, less safety net.",
    },
    decreaseEffect: {
      es: "Menos slip = el TC actúa al menor patinaje: más seguro pero más conservador.",
      en: "Less slip = TC acts at the slightest spin: safer but more conservative.",
    },
  },
  // ── Combustible / Energía (universal) ──────────────────────────────────────
  {
    id: "virtual_energy",
    group: "other",
    name: { es: "Energía virtual", en: "Virtual energy" },
    unit: "%",
    min: 50,
    max: 100,
    step: 1,
    default: 100,
    whatItDoes: {
      es: "Límite de energía total (combustible + híbrido) por stint según el reglamento WEC. Default 100%. Central en la estrategia de LMU; aplica también a LMGT3. (rango estimado)",
      en: "Total energy limit (fuel + hybrid) per stint under WEC rules. Default 100%. Central to LMU strategy; applies to LMGT3 too. (estimated range)",
    },
    increaseEffect: {
      es: "Más energía = más rendimiento por stint, pero menos margen para estirar la autonomía.",
      en: "More energy = more performance per stint, but less margin to stretch range.",
    },
    decreaseEffect: {
      es: "Menos energía = ritmo más conservador para alargar el stint y ahorrar una parada.",
      en: "Less energy = a more conservative pace to extend the stint and save a stop.",
    },
  },
  {
    id: "fuel",
    group: "other",
    name: { es: "Combustible cargado", en: "Fuel load" },
    unit: "L",
    min: 5,
    max: 120,
    step: 1,
    default: 91,
    whatItDoes: {
      es: "Litros de combustible al salir a pista. Define peso y paradas, y va cambiando la plataforma aero a medida que se quema. (rango estimado)",
      en: "Litres of fuel at the start of a run. Sets weight and pit stops, and shifts the aero platform as it burns. (estimated range)",
    },
    increaseEffect: {
      es: "Más combustible = más peso (más lento y más desgaste) pero menos paradas en carrera larga.",
      en: "More fuel = more weight (slower, more wear) but fewer stops in a long race.",
    },
    decreaseEffect: {
      es: "Menos combustible = auto más liviano y rápido, pero hay que parar antes a repostar.",
      en: "Less fuel = a lighter, faster car, but you have to pit to refuel sooner.",
    },
  },
];

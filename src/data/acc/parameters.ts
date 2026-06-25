import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de ACC (GT3) reconstruidos 1:1 contra el editor REAL del
// juego (captura in-game 2026-06-25: Ferrari 296 GT3, preset "Preajuste de
// seguridad", las 6 pestañas: Neumáticos, Electrónica, Combustible y Estrategia,
// Agarre Mecánico, Amortiguadores, Aero). Los `default` son los valores EXACTOS
// de ese preset. Donde el editor NO muestra el tope del slider, el rango está
// marcado "(rango estimado)" y se infiere de la física del coche + esa captura
// (mismo criterio que AC Rally / EA WRC). Lo que el juego maneja por RUEDA pero
// el preset deja simétrico izq/der se modela por EJE (front/rear), que es como
// se razona un setup. NO se incluyen acá la estrategia de carrera (combustible,
// juego de neumáticos, presiones de boxes, paradas): son estrategia, no reglaje
// de manejo.
export const accParameters: ParameterDef[] = [
  // ── NEUMÁTICOS ───────────────────────────────────────────────────────────
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión neumáticos delanteros", en: "Front tyre pressure" },
    unit: "psi",
    min: 20.3,
    max: 35,
    step: 0.1,
    default: 24.8,
    whatItDoes: {
      es: "Presión en frío que cargás al neumático delantero. En ACC (Pirelli) la ventana en CALIENTE óptima para GT3 ronda 26.0-27.0 psi; arrancás más bajo en frío para llegar ahí rodando. El mínimo en seco del slider es 20.3 psi (changelog oficial v1.0.8).",
      en: "Cold pressure you set on the front tyre. In ACC (Pirelli) the optimal HOT window for GT3 is around 26.0-27.0 psi; you start lower cold to reach it once rolling. The dry slider minimum is 20.3 psi (official v1.0.8 changelog).",
    },
    increaseEffect: {
      es: "Respuesta más rápida pero menos huella y más temperatura; si te pasás, el neumático se 'globea' y patina.",
      en: "Sharper response but less contact patch and more heat; too high and the tyre balloons and slides.",
    },
    decreaseEffect: {
      es: "Más huella y agarre mecánico, pero respuesta más vaga y riesgo de recalentar por flexión.",
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
    default: 24.4,
    whatItDoes: {
      es: "Igual que adelante pero en el tren trasero: afecta tracción y estabilidad de la cola. Misma ventana caliente ~26-27 psi.",
      en: "Same as front but on the rear axle: affects traction and rear stability. Same hot window ~26-27 psi.",
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
    // En el editor: "caída". Rango estimado; ACC GT3 ronda -4.5 a -1.5.
    min: -4.5,
    max: -1.0,
    step: 0.1,
    default: -3.2,
    whatItDoes: {
      es: "Inclinación de la rueda vista de frente. Más negativo = más agarre en curva, menos en recta/frenada.",
      en: "Wheel lean seen from the front. More negative = more cornering grip, less under braking/straights.",
    },
    increaseEffect: {
      es: "Hacia 0 (menos negativo) mejora frenada y desgaste parejo, pero baja el agarre en apoyo.",
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
    // Rango estimado.
    min: -4.0,
    max: -0.5,
    step: 0.1,
    default: -3.0,
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
    // En el editor: "alineación". Negativo = toe-out. Rango estimado.
    min: -0.4,
    max: 0.2,
    step: 0.01,
    default: -0.19,
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
    // Rango estimado. Positivo = toe-in (estabiliza la cola).
    min: -0.1,
    max: 0.5,
    step: 0.01,
    default: 0.12,
    whatItDoes: {
      es: "Convergencia del tren trasero. Más toe-in (positivo) = más estabilidad de la cola.",
      en: "Rear axle toe. More toe-in (positive) = more rear stability.",
    },
    increaseEffect: {
      es: "Más toe-in estabiliza mucho la cola al acelerar, a costa de un pelín de velocidad punta.",
      en: "More toe-in greatly stabilises the rear on power, costing a touch of top speed.",
    },
    decreaseEffect: {
      es: "Menos toe-in libera la cola y da más rotación, pero con menos estabilidad.",
      en: "Less toe-in frees the rear for more rotation, but less stability.",
    },
  },
  {
    id: "caster_front",
    group: "alignment",
    name: { es: "Ángulo de avance (caster)", en: "Caster" },
    unit: "°",
    // En el editor: "ángulo de avance" (solo eje delantero). Rango estimado.
    min: 5.0,
    max: 16.0,
    step: 0.5,
    default: 11.0,
    whatItDoes: {
      es: "Inclinación del eje de dirección vista de lado. Más caster = más auto-centrado del volante, más caída dinámica al doblar (mejor agarre en curva) y más peso de dirección.",
      en: "Tilt of the steering axis seen from the side. More caster = stronger steering self-centring, more dynamic camber when turning (better cornering grip) and heavier steering.",
    },
    increaseEffect: {
      es: "Más caster mejora la estabilidad en recta y el agarre en apoyo, pero endurece la dirección y carga el tren delantero al frenar.",
      en: "More caster improves straight-line stability and loaded grip, but heavies the steering and loads the front under braking.",
    },
    decreaseEffect: {
      es: "Menos caster aliviana la dirección y reduce el auto-centrado, a costa de algo de estabilidad y de caída dinámica.",
      en: "Less caster lightens the steering and reduces self-centring, costing some stability and dynamic camber.",
    },
  },
  {
    id: "steering_ratio",
    group: "alignment",
    name: { es: "Relación de giro del volante", en: "Steering ratio" },
    unit: "",
    // Rango estimado.
    min: 10,
    max: 18,
    step: 1,
    default: 14,
    whatItDoes: {
      es: "Cuántos grados de rueda obtenés por grado de volante. Más alto = la rueda gira más por el mismo giro de volante (dirección más directa/rápida).",
      en: "How many degrees of road wheel you get per degree of steering wheel. Higher = the wheel turns more for the same input (quicker, more direct steering).",
    },
    increaseEffect: {
      es: "Dirección más directa y reactiva en curvas cerradas, pero más nerviosa en alta velocidad.",
      en: "More direct, reactive steering in tight corners, but twitchier at high speed.",
    },
    decreaseEffect: {
      es: "Dirección más calmada y precisa en alta velocidad, pero hay que girar más el volante en horquillas.",
      en: "Calmer, more precise steering at high speed, but you turn the wheel more in hairpins.",
    },
  },
  // ── AGARRE MECÁNICO: barras, muelles, topes ──────────────────────────────
  {
    id: "arb_front",
    group: "suspension",
    name: { es: "Barra estabilizadora delantera", en: "Front anti-roll bar" },
    unit: "",
    // Rango estimado (los GT4 lo recortan a 0-2 vía override de clase).
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
    // Rango estimado; default estimado (el preset tapa el valor exacto).
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
    id: "spring_rate_front",
    group: "suspension",
    name: { es: "Índice del muelle delantero", en: "Front wheel rate" },
    unit: "N/m",
    // En el editor: "índice del volante" (= wheel rate). Son pasos discretos por
    // coche; rango estimado, step grueso para que el delta sea perceptible.
    min: 100000,
    max: 300000,
    step: 1000,
    default: 188964,
    whatItDoes: {
      es: "Rigidez del muelle delantero (ACC lo muestra como 'índice del volante'/wheel rate). Más rígido = la carrocería se hunde menos y la respuesta es más directa, a costa de copiar peor el piso.",
      en: "Front spring stiffness (ACC shows it as 'wheel rate'). Stiffer = the body dives/squats less and response is sharper, at the cost of following the road less well.",
    },
    increaseEffect: {
      es: "Más rígido adelante = plataforma más estable y reactiva, pero menos agarre mecánico y más subviraje en piso roto.",
      en: "Stiffer front = a more stable, reactive platform, but less mechanical grip and more understeer over bumps.",
    },
    decreaseEffect: {
      es: "Más blando adelante = más agarre mecánico y mejor en baches, pero más cabeceo y respuesta más vaga.",
      en: "Softer front = more mechanical grip and better over bumps, but more pitch and vaguer response.",
    },
  },
  {
    id: "spring_rate_rear",
    group: "suspension",
    name: { es: "Índice del muelle trasero", en: "Rear wheel rate" },
    unit: "N/m",
    // Rango estimado.
    min: 80000,
    max: 280000,
    step: 1000,
    default: 136455,
    whatItDoes: {
      es: "Rigidez del muelle trasero. Junto con el delantero define el balance de rigidez (y por ende sub/sobreviraje) y cuánto trabaja la aero.",
      en: "Rear spring stiffness. With the front it sets the stiffness balance (hence under/oversteer) and how the aero platform works.",
    },
    increaseEffect: {
      es: "Más rígido atrás = más rotación y respuesta, pero menos tracción y cola más nerviosa en baches.",
      en: "Stiffer rear = more rotation and response, but less traction and a twitchier rear over bumps.",
    },
    decreaseEffect: {
      es: "Más blando atrás = más tracción y estabilidad, pero más cabeceo y la cola se hunde al acelerar.",
      en: "Softer rear = more traction and stability, but more pitch and the rear squats on power.",
    },
  },
  {
    id: "bump_stop_rate_front",
    group: "suspension",
    name: { es: "Índice del tope de suspensión delantero", en: "Front bump stop rate" },
    unit: "N",
    // Rango estimado.
    min: 100,
    max: 2500,
    step: 100,
    default: 500,
    whatItDoes: {
      es: "Dureza del tope hidráulico que frena el final del recorrido de la suspensión delantera. Más alto = el tope es más duro y el coche 'rebota' antes de tocar fondo.",
      en: "Stiffness of the bump stop that catches the end of front suspension travel. Higher = a harder stop, so the car rebounds before bottoming out.",
    },
    increaseEffect: {
      es: "Más rígido = protege mejor el piso a costa de un golpe más brusco al llegar al tope.",
      en: "Stiffer = protects the floor better, at the cost of a harsher hit when reaching the stop.",
    },
    decreaseEffect: {
      es: "Más blando = transición más suave al tope, pero más riesgo de tocar fondo con mucha carga.",
      en: "Softer = a smoother transition into the stop, but more risk of bottoming under high load.",
    },
  },
  {
    id: "bump_stop_rate_rear",
    group: "suspension",
    name: { es: "Índice del tope de suspensión trasero", en: "Rear bump stop rate" },
    unit: "N",
    // Rango estimado.
    min: 100,
    max: 5000,
    step: 100,
    default: 2400,
    whatItDoes: {
      es: "Igual que adelante pero en el eje trasero: dureza del tope al final del recorrido.",
      en: "Same as front but on the rear axle: stiffness of the stop at the end of travel.",
    },
    increaseEffect: {
      es: "Más rígido = cola más protegida contra tocar fondo, con golpe más seco en el tope.",
      en: "Stiffer = rear better protected from bottoming, with a sharper hit at the stop.",
    },
    decreaseEffect: {
      es: "Más blando = transición más suave, con más riesgo de tocar fondo atrás.",
      en: "Softer = smoother transition, with more risk of bottoming at the rear.",
    },
  },
  {
    id: "bump_stop_range_front",
    group: "suspension",
    name: { es: "Amplitud del tope de suspensión delantero", en: "Front bump stop range" },
    unit: "mm",
    // En el editor: "amplitud del tope de la suspensión". Rango estimado.
    min: 0,
    max: 30,
    step: 1,
    default: 1,
    whatItDoes: {
      es: "Cuánto recorrido libre tiene la suspensión delantera antes de tocar el tope. Más amplitud = el coche puede comprimirse más antes de chocar el tope.",
      en: "How much free travel the front suspension has before it hits the bump stop. More range = the car can compress further before reaching the stop.",
    },
    increaseEffect: {
      es: "Más amplitud = más recorrido útil (mejor en baches/pianos), pero el piso puede bajar más y rozar.",
      en: "More range = more usable travel (better over bumps/kerbs), but the floor can drop more and rub.",
    },
    decreaseEffect: {
      es: "Menos amplitud = la suspensión llega antes al tope, manteniendo la altura aero más constante.",
      en: "Less range = the suspension reaches the stop sooner, keeping the aero ride height more constant.",
    },
  },
  {
    id: "bump_stop_range_rear",
    group: "suspension",
    name: { es: "Amplitud del tope de suspensión trasero", en: "Rear bump stop range" },
    unit: "mm",
    // Rango estimado.
    min: 0,
    max: 50,
    step: 1,
    default: 20,
    whatItDoes: {
      es: "Recorrido libre de la suspensión trasera antes del tope. Clave para la tracción: demasiado poco y la cola queda 'colgada' del tope al acelerar.",
      en: "Free travel of the rear suspension before the stop. Key for traction: too little and the rear hangs on the stop under power.",
    },
    increaseEffect: {
      es: "Más amplitud = la cola puede comprimirse más (más tracción y mejor en baches), bajando algo el piso.",
      en: "More range = the rear can compress further (more traction and better over bumps), dropping the floor a bit.",
    },
    decreaseEffect: {
      es: "Menos amplitud = altura trasera más constante para la aero, pero menos recorrido para traccionar.",
      en: "Less range = a more constant rear ride height for the aero, but less travel to put power down.",
    },
  },
  // ── AMORTIGUADORES (4 canales × eje) ─────────────────────────────────────
  {
    id: "bump_front",
    group: "dampers",
    name: { es: "Compresión lenta delantera (badén)", en: "Front slow bump" },
    unit: "",
    // Rango estimado para los 8 canales de amortiguador.
    min: 0,
    max: 30,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero al COMPRIMIRSE despacio (transferencias de peso al frenar/doblar). Controla cuánto cabecea el frente.",
      en: "Front damper resistance to slow COMPRESSION (weight transfer under braking/turning). Controls how much the front dives.",
    },
    increaseEffect: {
      es: "Más alto = el frente se hunde más despacio (plataforma más firme), pero copia peor el piso.",
      en: "Higher = the front dives more slowly (firmer platform), but follows the road less well.",
    },
    decreaseEffect: {
      es: "Más bajo = el frente se hunde más libre (más agarre mecánico), con más cabeceo.",
      en: "Lower = the front dives more freely (more mechanical grip), with more pitch.",
    },
  },
  {
    id: "bump_rear",
    group: "dampers",
    name: { es: "Compresión lenta trasera (badén)", en: "Rear slow bump" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero al comprimirse despacio. Afecta cómo se sienta la cola al acelerar.",
      en: "Rear damper resistance to slow compression. Affects how the rear squats on power.",
    },
    increaseEffect: {
      es: "Más alto = la cola se sienta más despacio (más reactiva), con algo menos de tracción inicial.",
      en: "Higher = the rear squats more slowly (more reactive), with slightly less initial traction.",
    },
    decreaseEffect: {
      es: "Más bajo = la cola se sienta más libre (más tracción de salida), con más movimiento.",
      en: "Lower = the rear squats more freely (more exit traction), with more movement.",
    },
  },
  {
    id: "fast_bump_front",
    group: "dampers",
    name: { es: "Compresión rápida delantera", en: "Front fast bump" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero a compresiones RÁPIDAS (pianos, baches, juntas). Controla la reacción ante impactos cortos.",
      en: "Front damper resistance to FAST compressions (kerbs, bumps, joints). Controls the reaction to sharp impacts.",
    },
    increaseEffect: {
      es: "Más alto = más firme sobre pianos, pero el golpe se transmite más y puede saltar.",
      en: "Higher = firmer over kerbs, but the hit transmits more and it can skip.",
    },
    decreaseEffect: {
      es: "Más bajo = absorbe mejor pianos y baches (más estable sobre ellos).",
      en: "Lower = absorbs kerbs and bumps better (more stable over them).",
    },
  },
  {
    id: "fast_bump_rear",
    group: "dampers",
    name: { es: "Compresión rápida trasera", en: "Rear fast bump" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero a compresiones rápidas. Clave para la estabilidad de la cola sobre pianos.",
      en: "Rear damper resistance to fast compressions. Key for rear stability over kerbs.",
    },
    increaseEffect: {
      es: "Más alto = cola más firme sobre pianos, con más riesgo de que rebote.",
      en: "Higher = firmer rear over kerbs, with more risk of it bouncing.",
    },
    decreaseEffect: {
      es: "Más bajo = la cola absorbe mejor los pianos, manteniendo la tracción.",
      en: "Lower = the rear absorbs kerbs better, keeping traction.",
    },
  },
  {
    id: "rebound_front",
    group: "dampers",
    name: { es: "Extensión lenta delantera", en: "Front slow rebound" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero al EXTENDERSE despacio (cuando el frente vuelve a subir). Controla cuánto rebota el frente tras una compresión.",
      en: "Front damper resistance to slow EXTENSION (as the front rises again). Controls how the front rebounds after compressing.",
    },
    increaseEffect: {
      es: "Más alto = el frente vuelve más despacio (mantiene la carga más tiempo), pero puede quedar 'colgado'.",
      en: "Higher = the front returns more slowly (holds load longer), but can stay 'hung'.",
    },
    decreaseEffect: {
      es: "Más bajo = el frente se recupera más rápido (mejor en baches seguidos), con menos control del rebote.",
      en: "Lower = the front recovers faster (better over repeated bumps), with less rebound control.",
    },
  },
  {
    id: "rebound_rear",
    group: "dampers",
    name: { es: "Extensión lenta trasera", en: "Rear slow rebound" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero al extenderse despacio. Afecta cómo recupera altura la cola y cuánta carga mantiene.",
      en: "Rear damper resistance to slow extension. Affects how the rear recovers ride height and how much load it holds.",
    },
    increaseEffect: {
      es: "Más alto = la cola vuelve más despacio (más estable), con riesgo de perder tracción si queda baja.",
      en: "Higher = the rear returns more slowly (more stable), risking lost traction if it stays low.",
    },
    decreaseEffect: {
      es: "Más bajo = la cola se recupera más rápido (más tracción en baches), con más movimiento.",
      en: "Lower = the rear recovers faster (more traction over bumps), with more movement.",
    },
  },
  {
    id: "fast_rebound_front",
    group: "dampers",
    name: { es: "Extensión rápida delantera", en: "Front fast rebound" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Resistencia del amortiguador delantero a extensiones RÁPIDAS (al bajar de un piano o bache). Controla cómo se reasienta la rueda tras el impacto.",
      en: "Front damper resistance to FAST extension (coming off a kerb or bump). Controls how the wheel resettles after the impact.",
    },
    increaseEffect: {
      es: "Más alto = la rueda vuelve más controlada tras el piano, pero puede despegarse del piso.",
      en: "Higher = the wheel returns more controlled after the kerb, but can lift off the road.",
    },
    decreaseEffect: {
      es: "Más bajo = la rueda recupera contacto más rápido tras el impacto (más agarre sobre pianos).",
      en: "Lower = the wheel regains contact faster after the impact (more grip over kerbs).",
    },
  },
  {
    id: "fast_rebound_rear",
    group: "dampers",
    name: { es: "Extensión rápida trasera", en: "Rear fast rebound" },
    unit: "",
    min: 0,
    max: 30,
    step: 1,
    default: 7,
    whatItDoes: {
      es: "Resistencia del amortiguador trasero a extensiones rápidas. Clave para que la cola no se despegue al bajar de pianos.",
      en: "Rear damper resistance to fast extension. Key so the rear doesn't lift coming off kerbs.",
    },
    increaseEffect: {
      es: "Más alto = cola más controlada tras el piano, con riesgo de despegar la rueda.",
      en: "Higher = rear more controlled after the kerb, risking the wheel lifting.",
    },
    decreaseEffect: {
      es: "Más bajo = la cola reasienta más rápido (más tracción sobre pianos).",
      en: "Lower = the rear resettles faster (more traction over kerbs).",
    },
  },
  // ── AERO ─────────────────────────────────────────────────────────────────
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Altura delantera", en: "Front ride height" },
    unit: "mm",
    // En el editor está en la pestaña Aero. Rango estimado.
    min: 50,
    max: 90,
    step: 1,
    default: 70,
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
    // Rango estimado.
    min: 50,
    max: 100,
    step: 1,
    default: 70,
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
    id: "rear_wing",
    group: "aero",
    name: { es: "Ala trasera", en: "Rear wing" },
    unit: "",
    min: 0,
    max: 12,
    step: 1,
    default: 12,
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
    id: "splitter_front",
    group: "aero",
    name: { es: "Splitter delantero", en: "Front splitter" },
    unit: "",
    // Rango estimado; varios GT3 traen el splitter fijo (solo posición 0).
    min: 0,
    max: 5,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Posición del splitter delantero: regula la carga aerodinámica del frente. Más alto = más carga adelante (más equilibrio aero hacia el tren delantero).",
      en: "Front splitter position: regulates front downforce. Higher = more front load (shifts the aero balance forward).",
    },
    increaseEffect: {
      es: "Más splitter = más agarre aerodinámico adelante (menos subviraje en alta), restando algo de punta.",
      en: "More splitter = more front aero grip (less high-speed understeer), costing a little top speed.",
    },
    decreaseEffect: {
      es: "Menos splitter = menos carga adelante (balance aero hacia atrás), con frente más liviano en alta.",
      en: "Less splitter = less front load (aero balance rearward), with a lighter front at speed.",
    },
  },
  // ── FRENOS ───────────────────────────────────────────────────────────────
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Reparto de frenada", en: "Brake bias" },
    unit: "%",
    min: 50,
    max: 70,
    step: 0.2,
    default: 59.0,
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
    id: "brake_power",
    group: "brakes",
    name: { es: "Potencia de frenada", en: "Brake power" },
    unit: "%",
    // Rango estimado.
    min: 80,
    max: 100,
    step: 1,
    default: 100,
    whatItDoes: {
      es: "Presión máxima de freno disponible a fondo de pedal. Más alta = más fuerza de frenada pico (más fácil bloquear).",
      en: "Maximum brake pressure available at full pedal. Higher = more peak braking force (easier to lock).",
    },
    increaseEffect: {
      es: "Más potencia = frenadas más cortas pero más fáciles de bloquear; exige más tacto de pedal.",
      en: "More power = shorter braking but easier to lock; demands more pedal feel.",
    },
    decreaseEffect: {
      es: "Menos potencia = más difícil bloquear y más modulable, a costa de frenadas algo más largas.",
      en: "Less power = harder to lock and more modulable, at the cost of slightly longer braking.",
    },
  },
  {
    id: "brake_duct_front",
    group: "brakes",
    name: { es: "Conductos de freno delanteros", en: "Front brake ducts" },
    unit: "",
    // En el editor está en la pestaña Aero. Rango estimado 0-6.
    min: 0,
    max: 6,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Cuánto aire entra a refrigerar los frenos delanteros. Más alto = frenos más fríos, pero algo más de resistencia aerodinámica.",
      en: "How much air cools the front brakes. Higher = cooler brakes, but a bit more aero drag.",
    },
    increaseEffect: {
      es: "Más conducto = frenos y neumáticos delanteros más fríos (mejor en carreras largas/calor), restando un pelín de punta.",
      en: "More duct = cooler front brakes and tyres (better in long races/heat), costing a touch of top speed.",
    },
    decreaseEffect: {
      es: "Menos conducto = frenos más calientes (mejor en frío o vueltas sueltas) y un poco menos de resistencia.",
      en: "Less duct = hotter brakes (better in the cold or single laps) and a bit less drag.",
    },
  },
  {
    id: "brake_duct_rear",
    group: "brakes",
    name: { es: "Conductos de freno traseros", en: "Rear brake ducts" },
    unit: "",
    min: 0,
    max: 6,
    step: 1,
    default: 4,
    whatItDoes: {
      es: "Igual que adelante pero en el eje trasero: refrigeración de los frenos traseros (y, de paso, temperatura de los neumáticos traseros).",
      en: "Same as front but on the rear axle: rear brake cooling (and, in turn, rear tyre temperature).",
    },
    increaseEffect: {
      es: "Más conducto = frenos y gomas traseras más frías; útil si la cola recalienta en tandas largas.",
      en: "More duct = cooler rear brakes and tyres; useful if the rear overheats in long stints.",
    },
    decreaseEffect: {
      es: "Menos conducto = más temperatura atrás (mejor en frío), con un poco menos de resistencia.",
      en: "Less duct = more rear heat (better in the cold), with a little less drag.",
    },
  },
  {
    id: "brake_pad_front",
    group: "brakes",
    name: { es: "Pastilla de freno delantera", en: "Front brake pad" },
    unit: "",
    // Compuesto de pastilla 1-4 (no es una escala continua, son compuestos).
    min: 1,
    max: 4,
    step: 1,
    default: 2,
    whatItDoes: {
      es: "Compuesto de la pastilla delantera (1-4). Cada compuesto tiene distinta mordida, ventana de temperatura y desgaste. El 2 es el de uso general en GT3.",
      en: "Front brake pad compound (1-4). Each compound has different bite, temperature window and wear. Compound 2 is the GT3 all-round choice.",
    },
    increaseEffect: {
      es: "Compuestos más altos cambian la mordida y la resistencia al fundido; algunos duran más pero muerden distinto.",
      en: "Higher compounds change bite and fade resistance; some last longer but bite differently.",
    },
    decreaseEffect: {
      es: "Compuestos más bajos suelen morder distinto y tener otra ventana de temperatura; elegí según carrera.",
      en: "Lower compounds bite differently and have another temperature window; pick per race length.",
    },
  },
  {
    id: "brake_pad_rear",
    group: "brakes",
    name: { es: "Pastilla de freno trasera", en: "Rear brake pad" },
    unit: "",
    min: 1,
    max: 4,
    step: 1,
    default: 2,
    whatItDoes: {
      es: "Compuesto de la pastilla trasera (1-4). Normalmente se empareja con la delantera; cambiarlo mueve el reparto efectivo y la mordida atrás.",
      en: "Rear brake pad compound (1-4). Usually matched to the front; changing it shifts the effective bias and rear bite.",
    },
    increaseEffect: {
      es: "Compuestos más altos cambian la mordida trasera y la resistencia al fundido.",
      en: "Higher compounds change rear bite and fade resistance.",
    },
    decreaseEffect: {
      es: "Compuestos más bajos cambian la ventana de temperatura y la mordida trasera.",
      en: "Lower compounds change the temperature window and rear bite.",
    },
  },
  // ── DIFERENCIAL ──────────────────────────────────────────────────────────
  {
    id: "diff_preload",
    group: "differential",
    name: { es: "Precarga del diferencial", en: "Differential preload" },
    unit: "Nm",
    min: 20,
    max: 300,
    step: 10,
    default: 70,
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
  // ── ELECTRÓNICA ──────────────────────────────────────────────────────────
  {
    id: "tc",
    group: "electronics",
    name: { es: "Control de tracción (TC)", en: "Traction control (TC)" },
    unit: "",
    // Rango exacto de la tabla en pantalla: 1-8.
    min: 1,
    max: 8,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Cuánto corta el motor para evitar que patinen las ruedas al acelerar. Más alto = interviene antes. La tabla del juego va de 1 a 8.",
      en: "How much it cuts power to stop wheelspin on throttle. Higher = intervenes earlier. The in-game table runs 1 to 8.",
    },
    increaseEffect: {
      es: "Más TC = más seguro en mojado o baja adherencia, pero limita la aceleración en seco.",
      en: "More TC = safer in the wet or low grip, but limits acceleration in the dry.",
    },
    decreaseEffect: {
      es: "Menos TC = más aceleración pura si sabés dosificar; más riesgo de irte de cola.",
      en: "Less TC = more raw acceleration if you can modulate; more risk of the rear stepping out.",
    },
  },
  {
    id: "abs",
    group: "electronics",
    name: { es: "ABS", en: "ABS" },
    unit: "",
    // Rango exacto de la tabla en pantalla: 1-12.
    min: 1,
    max: 12,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Cuánto evita el bloqueo de ruedas al frenar. Más alto = más intervención. La tabla del juego va de 1 a 12.",
      en: "How much it prevents wheel lock under braking. Higher = more intervention. The in-game table runs 1 to 12.",
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
  {
    id: "ecu_map",
    group: "electronics",
    name: { es: "Mapa del motor (ECU)", en: "Engine map (ECU)" },
    unit: "",
    // Rango estimado (el editor muestra el valor, no el tope).
    min: 1,
    max: 8,
    step: 1,
    default: 3,
    whatItDoes: {
      es: "Mapa de entrega del motor: cambia la curva de potencia, la respuesta del acelerador y el consumo/temperaturas. No siempre 'más alto = más potencia'; cada mapa tiene un fin (clasificación, carrera, ahorro, lluvia).",
      en: "Engine delivery map: changes the power curve, throttle response and fuel/temperatures. Higher isn't always 'more power'; each map targets a use (qualifying, race, fuel-save, rain).",
    },
    increaseEffect: {
      es: "Subir de mapa cambia la entrega (a veces más agresiva, a veces más de ahorro): probá cuál te da mejor tacto y consumo.",
      en: "Changing up the map alters delivery (sometimes more aggressive, sometimes fuel-saving): test which gives the best feel and consumption.",
    },
    decreaseEffect: {
      es: "Bajar de mapa suele suavizar la entrega o ahorrar combustible; útil en lluvia o tandas largas.",
      en: "Changing down the map usually softens delivery or saves fuel; useful in rain or long stints.",
    },
  },
  {
    id: "tc2",
    group: "electronics",
    name: { es: "Control de tracción 2 (TC2)", en: "Traction Control 2 (TC2)" },
    unit: "",
    // Rango estimado. TC2 es una segunda capa de control de tracción presente en
    // varios GT3 de ACC (el preset capturado del 296 lo trae en 5).
    min: 0,
    max: 11,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Segundo control de tracción que trabaja junto al TC principal: el TC fija el nivel general y el TC2 ajusta cuán bruscamente se corta el patinaje cuando supera el umbral. Más alto = corte más suave/progresivo.",
      en: "A second traction control working alongside the main TC: TC sets the general level and TC2 tunes how abruptly wheelspin is cut once it crosses the threshold. Higher = a smoother/more progressive cut.",
    },
    increaseEffect: {
      es: "Más TC2 = corte de tracción más suave y progresivo (más manejable en mojado/baja adherencia).",
      en: "More TC2 = a smoother, more progressive traction cut (more manageable in the wet/low grip).",
    },
    decreaseEffect: {
      es: "Menos TC2 = corte más brusco y directo: más reactivo, con menos red de seguridad.",
      en: "Less TC2 = a sharper, more direct cut: more reactive, with less safety net.",
    },
  },
];

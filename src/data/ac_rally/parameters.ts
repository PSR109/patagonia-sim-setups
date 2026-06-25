import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de Assetto Corsa Rally con su capa educativa.
//
// FUENTE (importante): esta lista está construida a partir de la CAPTURA IN-GAME
// de Patricio (auto Hyundai i20 N Rally2, preset "Equilibrado", junio 2026). Por
// eso los nombres, las UNIDADES y los valores `default` son los REALES del juego,
// no índices abstractos. AC Rally usa el motor de Assetto Corsa clásico: muelles
// en N/m, amortiguadores en Ns/m (4 canales: lento/rápido × compresión/extensión),
// barras en N/m, diferenciales por LSD mecánico (rampa °, precarga Nm, placas),
// altura vía "anillo de ajuste" en metros, balance de freno como FRACCIÓN 0-1,
// cilindros maestros en mm, convergencia (toe) en METROS, ABS/TC por mapas.
//
// RANGOS (min/max/step): los `default` son exactos (preset Equilibrado del i20 N
// Rally2). Los min/max marcados "(rango estimado)" están ESTIMADOS a partir de la
// física del motor AC clásico + la captura del i20 (decisión de Patricio 2026-06-25:
// NO va a capturar los topes de cada slider; el resto se estima desde esa única
// referencia, y se hará igual para cada juego). Se eligieron para: (a) dejar el
// `default` holgado adentro, (b) ser plausibles para la clase Rally2 y (c) NO recortar
// los deltas de las reglas en condiciones normales. Se usan para el clamp y el
// "Rango:" educativo. El `step` respeta el incremento real del juego (ej.
// amortiguadores en múltiplos de 125 Ns/m, balance 0.005).
//
// CONFIRMADO por Patricio (2026-06-25): el editor del juego es UNIFORME — TODOS los
// autos muestran las MISMAS pestañas y parámetros (el i20 N Rally2 aparece solo como
// ejemplo en la captura). Lo que cambia entre autos son los VALORES del preset, no
// QUÉ parámetros hay. Por eso esta lista única vale para todo el roster; los valores
// reales por-auto se modelan con baseSetups/paramOverrides en cars.ts cuando se
// capturen in-game.
export const ac_rallyParameters: ParameterDef[] = [
  // ── CAJA DE CAMBIOS ───────────────────────────────────────────────────────
  {
    id: "gear_set",
    group: "gearing",
    name: { es: "Conjunto de cambios", en: "Gear set" },
    unit: "",
    min: 1,
    max: 4, // (rango estimado: cantidad real de sets sin confirmar)
    step: 1,
    default: 2,
    whatItDoes: {
      es: "AC Rally no deja editar marcha por marcha: ofrece 'conjuntos de cambios' precalculados (relaciones cortas o largas en bloque). Un set más corto da más aceleración para tramos lentos/técnicos; uno más largo da más velocidad punta para tramos rápidos.",
      en: "AC Rally doesn't let you edit gear by gear: it offers preset 'gear sets' (short or long ratios as a block). A shorter set gives more acceleration for slow/technical stages; a longer one gives more top speed for fast stages.",
    },
    increaseEffect: {
      es: "Sets más altos suelen ser relaciones más largas: más punta, menos respuesta saliendo de curvas lentas.",
      en: "Higher sets are usually longer ratios: more top speed, less response out of slow corners.",
    },
    decreaseEffect: {
      es: "Sets más bajos suelen ser relaciones más cortas: más aceleración y freno motor en tramos técnicos, menos punta.",
      en: "Lower sets are usually shorter ratios: more acceleration and engine braking on technical stages, less top speed.",
    },
  },

  // ── SUSPENSIONES ──────────────────────────────────────────────────────────
  {
    id: "spring_rate_front",
    group: "suspension",
    name: { es: "Rigidez de los muelles (del.)", en: "Front spring rate" },
    unit: "N/m",
    min: 15000,
    max: 65000, // (rango estimado)
    step: 500,
    default: 23000,
    whatItDoes: {
      es: "Dureza del muelle delantero, en N/m (OJO: el juego muestra N/m, no N/mm; 23000 N/m = 23 N/mm). Blando mantiene la rueda pegada al piso en grava/nieve; rígido controla la carrocería y la transferencia de peso en asfalto.",
      en: "Front spring stiffness, in N/m (note: the game shows N/m, not N/mm; 23000 N/m = 23 N/mm). Soft keeps the wheel on the ground on gravel/snow; stiff controls the body and weight transfer on tarmac.",
    },
    increaseEffect: {
      es: "Más rígido = plataforma más controlada y precisa en asfalto, pero rebota sobre baches y pierde agarre en superficie suelta.",
      en: "Stiffer = a more controlled, precise platform on tarmac, but it skips over bumps and loses grip on loose surfaces.",
    },
    decreaseEffect: {
      es: "Más blando = la rueda copia mejor el terreno irregular (grava/nieve), a costa de balanceo y precisión en asfalto.",
      en: "Softer = the wheel follows rough terrain better (gravel/snow), at the cost of body roll and tarmac precision.",
    },
  },
  {
    id: "spring_rate_rear",
    group: "suspension",
    name: { es: "Rigidez de los muelles (tras.)", en: "Rear spring rate" },
    unit: "N/m",
    min: 15000,
    max: 65000, // (rango estimado)
    step: 500,
    default: 21000,
    whatItDoes: {
      es: "Dureza del muelle trasero, en N/m. En grava suele dejarse parejo o algo más blando que el delantero para tracción y para que la cola copie el piso bajo aceleración.",
      en: "Rear spring stiffness, in N/m. On gravel it's usually set even with or slightly softer than the front for traction and so the rear follows the ground under power.",
    },
    increaseEffect: {
      es: "Más rígido atrás = más estabilidad de plataforma y respuesta en asfalto, pero menos tracción sobre baches y cola más nerviosa en suelto.",
      en: "Stiffer rear = more platform stability and response on tarmac, but less traction over bumps and a twitchier rear on loose ground.",
    },
    decreaseEffect: {
      es: "Más blando atrás = la cola copia el terreno y gana tracción en grava/nieve, perdiendo algo de control de carrocería.",
      en: "Softer rear = the rear follows the terrain and gains traction on gravel/snow, losing some body control.",
    },
  },
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Anillo de ajuste (del.)", en: "Front ride-height ring" },
    unit: "m",
    min: 0.12,
    max: 0.26, // (rango estimado)
    step: 0.001,
    default: 0.196,
    whatItDoes: {
      es: "El 'anillo de ajuste' regula la altura de marcha delantera (posición del platillo del muelle), expresada en metros. Más alto en grava/nieve para no tocar fondo y dar recorrido; más bajo en asfalto para bajar el centro de gravedad.",
      en: "The 'adjustment ring' sets front ride height (spring-platform position), in metres. Higher on gravel/snow to avoid bottoming and give travel; lower on tarmac to drop the centre of gravity.",
    },
    increaseEffect: {
      es: "Subir (valor mayor) da recorrido y evita golpear fondo en terreno irregular, restando agilidad y un poco de agarre en asfalto.",
      en: "Raising (higher value) gives travel and avoids bottoming on rough terrain, costing agility and a little tarmac grip.",
    },
    decreaseEffect: {
      es: "Bajar (valor menor) reduce el centro de gravedad y mejora la respuesta en asfalto, pero arriesga tocar fondo en baches o saltos.",
      en: "Lowering (lower value) reduces the centre of gravity and improves tarmac response, but risks bottoming out on bumps or jumps.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Anillo de ajuste (tras.)", en: "Rear ride-height ring" },
    unit: "m",
    min: 0.12,
    max: 0.26, // (rango estimado)
    step: 0.001,
    default: 0.180,
    whatItDoes: {
      es: "Altura de marcha trasera vía anillo de ajuste, en metros. Junto con la delantera define la actitud del auto: una cola algo más baja que el frente (como el preset Equilibrado) estabiliza; subirla da recorrido en grava.",
      en: "Rear ride height via the adjustment ring, in metres. With the front it sets the car's attitude: a slightly lower rear than the front (like the Balanced preset) stabilises; raising it gives gravel travel.",
    },
    increaseEffect: {
      es: "Subir atrás da recorrido y algo más de rotación, pero eleva el centro de gravedad de la cola.",
      en: "Raising the rear gives travel and a bit more rotation, but lifts the rear centre of gravity.",
    },
    decreaseEffect: {
      es: "Bajar atrás estabiliza el auto en alta velocidad/asfalto, restando algo de rotación y recorrido para baches.",
      en: "Lowering the rear stabilises the car at high speed/on tarmac, costing some rotation and bump travel.",
    },
  },

  // ── AMORTIGUADORES (Ns/m, 4 canales × 2 ejes) ─────────────────────────────
  {
    id: "damper_slow_bump_front",
    group: "dampers",
    name: { es: "Tope lento (del.)", en: "Front slow bump" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 3875,
    whatItDoes: {
      es: "Amortiguación de COMPRESIÓN a baja velocidad de la rueda delantera (transferencias de peso sostenidas: frenadas, apoyos). Alta = transferencia controlada y precisión en asfalto; media en grava.",
      en: "Front low-speed COMPRESSION damping (sustained weight transfer: braking, cornering loads). High = controlled transfer and tarmac precision; medium on gravel.",
    },
    increaseEffect: {
      es: "Más firme = transferencia de peso más controlada y respuesta precisa en asfalto; demasiado, y el auto se vuelve duro y subvira en apoyo.",
      en: "Firmer = more controlled weight transfer and precise response on tarmac; too much and the car gets harsh and pushes in loaded corners.",
    },
    decreaseEffect: {
      es: "Más blando = transiciones más suaves y mejor agarre en suelto, a costa de precisión en frenada y apoyo.",
      en: "Softer = smoother transitions and better grip on loose ground, at the cost of braking and cornering precision.",
    },
  },
  {
    id: "damper_slow_rebound_front",
    group: "dampers",
    name: { es: "Rebote lento (del.)", en: "Front slow rebound" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 4875,
    whatItDoes: {
      es: "Amortiguación de EXTENSIÓN a baja velocidad de la rueda delantera (cuán rápido se recupera la carrocería al soltar freno o salir del apoyo). Controla la actitud del auto en transiciones largas.",
      en: "Front low-speed EXTENSION damping (how fast the body recovers when releasing the brake or unloading after a corner). Controls attitude in long transitions.",
    },
    increaseEffect: {
      es: "Más firme = la carrocería se recupera más lento; estabilidad en asfalto pero menos copiado del terreno.",
      en: "Firmer = the body recovers more slowly; stability on tarmac but less terrain compliance.",
    },
    decreaseEffect: {
      es: "Más blando = recuperación rápida del frente; mejor en grava/nieve, más mecedora en asfalto.",
      en: "Softer = quick front recovery; better on gravel/snow, more wallowy on tarmac.",
    },
  },
  {
    id: "damper_fast_bump_front",
    group: "dampers",
    name: { es: "Tope rápido (del.)", en: "Front fast bump" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 2750,
    whatItDoes: {
      es: "Compresión a ALTA velocidad de la rueda delantera (impactos bruscos: baches, piedras, pianos). Blando deja que la rueda suba rápido en grava; medio gestiona impactos en asfalto.",
      en: "Front high-speed COMPRESSION (sharp impacts: bumps, rocks, kerbs). Soft lets the wheel move up quickly on gravel; medium manages impacts on tarmac.",
    },
    increaseEffect: {
      es: "Más firme = controla más los impactos secos en asfalto, pero en grava la rueda no sube a tiempo y rebota.",
      en: "Firmer = better control of sharp impacts on tarmac, but on gravel the wheel can't react in time and skips.",
    },
    decreaseEffect: {
      es: "Más blando = la rueda absorbe baches y piedras sin desestabilizar el auto; ideal en grava/nieve.",
      en: "Softer = the wheel absorbs bumps and rocks without upsetting the car; ideal on gravel/snow.",
    },
  },
  {
    id: "damper_fast_rebound_front",
    group: "dampers",
    name: { es: "Rebote rápido (del.)", en: "Front fast rebound" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 3500,
    whatItDoes: {
      es: "Extensión a ALTA velocidad de la rueda delantera (cuán rápido vuelve al piso tras un bache/salto). Muy alto y la rueda queda 'colgada' tras el impacto y pierde agarre.",
      en: "Front high-speed EXTENSION (how fast it returns to the ground after a bump/jump). Too high and the wheel stays 'hung' after the hit and loses grip.",
    },
    increaseEffect: {
      es: "Más firme = la rueda vuelve más lento al piso; puede quedar colgada tras baches grandes (packing).",
      en: "Firmer = the wheel returns to the ground more slowly; it can stay hung after big bumps (packing).",
    },
    decreaseEffect: {
      es: "Más blando = la rueda recupera contacto rápido tras un bache, manteniendo agarre en terreno irregular.",
      en: "Softer = the wheel regains contact quickly after a bump, keeping grip on rough terrain.",
    },
  },
  {
    id: "damper_slow_bump_rear",
    group: "dampers",
    name: { es: "Tope lento (tras.)", en: "Rear slow bump" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 4375,
    whatItDoes: {
      es: "Compresión a baja velocidad de la rueda trasera. Gestiona la transferencia de peso atrás bajo aceleración y en apoyo; clave para la tracción y la estabilidad de la cola.",
      en: "Rear low-speed compression. Manages rear weight transfer under power and in corners; key for traction and rear stability.",
    },
    increaseEffect: {
      es: "Más firme atrás = plataforma trasera más controlada en asfalto, pero menos tracción sobre baches.",
      en: "Firmer rear = a more controlled rear platform on tarmac, but less traction over bumps.",
    },
    decreaseEffect: {
      es: "Más blando atrás = más agarre y tracción en suelto, con algo más de balanceo de la cola.",
      en: "Softer rear = more grip and traction on loose ground, with a bit more rear roll.",
    },
  },
  {
    id: "damper_slow_rebound_rear",
    group: "dampers",
    name: { es: "Rebote lento (tras.)", en: "Rear slow rebound" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 4375,
    whatItDoes: {
      es: "Extensión a baja velocidad de la rueda trasera. Controla cuán rápido se recupera la cola al soltar gas/freno; afecta el sobreviraje de levantada.",
      en: "Rear low-speed extension. Controls how fast the rear recovers when lifting off the throttle/brake; affects lift-off oversteer.",
    },
    increaseEffect: {
      es: "Más firme = la cola se recupera más lento; estabilidad pero puede 'empaquetar' la trasera en baches encadenados.",
      en: "Firmer = the rear recovers more slowly; stability but it can 'pack' the rear over successive bumps.",
    },
    decreaseEffect: {
      es: "Más blando = recuperación rápida de la cola; mejor copiado en grava, algo más nervioso en asfalto.",
      en: "Softer = quick rear recovery; better compliance on gravel, a touch twitchier on tarmac.",
    },
  },
  {
    id: "damper_fast_bump_rear",
    group: "dampers",
    name: { es: "Tope rápido (tras.)", en: "Rear fast bump" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 3000,
    whatItDoes: {
      es: "Compresión a alta velocidad de la rueda trasera (impactos bruscos atrás). Blando deja que la cola absorba baches y mantenga tracción en grava.",
      en: "Rear high-speed compression (sharp rear impacts). Soft lets the rear absorb bumps and keep traction on gravel.",
    },
    increaseEffect: {
      es: "Más firme = más control de impactos en asfalto, pero la cola rebota en grava.",
      en: "Firmer = more impact control on tarmac, but the rear skips on gravel.",
    },
    decreaseEffect: {
      es: "Más blando = la cola absorbe baches y piedras manteniendo tracción; ideal en suelto.",
      en: "Softer = the rear absorbs bumps and rocks while keeping traction; ideal on loose ground.",
    },
  },
  {
    id: "damper_fast_rebound_rear",
    group: "dampers",
    name: { es: "Rebote rápido (tras.)", en: "Rear fast rebound" },
    unit: "Ns/m",
    min: 1000,
    max: 8000, // (rango estimado)
    step: 125,
    default: 3250,
    whatItDoes: {
      es: "Extensión a alta velocidad de la rueda trasera. Si está muy alto, la cola queda en el aire tras un bache/salto y pierde tracción al aterrizar.",
      en: "Rear high-speed extension. Set too high, the rear stays in the air after a bump/jump and loses traction on landing.",
    },
    increaseEffect: {
      es: "Más firme = la cola vuelve más lento al piso tras un impacto; riesgo de packing en baches encadenados.",
      en: "Firmer = the rear returns to the ground more slowly after a hit; risk of packing over successive bumps.",
    },
    decreaseEffect: {
      es: "Más blando = la cola recupera contacto rápido tras baches/saltos, manteniendo tracción.",
      en: "Softer = the rear regains contact quickly after bumps/jumps, keeping traction.",
    },
  },

  // ── EJES (barras estabilizadoras, N/m) ────────────────────────────────────
  {
    id: "arb_front",
    group: "suspension",
    name: { es: "Barra estabilizadora (frontal)", en: "Front anti-roll bar" },
    unit: "N/m",
    min: 0,
    max: 30000, // (rango estimado)
    step: 500,
    default: 2500,
    whatItDoes: {
      es: "Cuánto se resiste el eje delantero a balancearse, en N/m. Blanda permite movimiento independiente de las ruedas (grava); rígida da estabilidad de plataforma en alto agarre (asfalto). En el i20 viene MUY blanda adelante (2500) frente a la trasera para favorecer la rotación.",
      en: "How much the front axle resists roll, in N/m. Soft allows independent wheel movement (gravel); stiff gives platform stability on high grip (tarmac). On the i20 it's set VERY soft at the front (2500) vs the rear to aid rotation.",
    },
    increaseEffect: {
      es: "Más dura adelante = más subviraje (el frente desliza antes); plataforma estable en asfalto.",
      en: "Stiffer front = more understeer (front slides first); stable platform on tarmac.",
    },
    decreaseEffect: {
      es: "Más blanda adelante = menos subviraje y mejor copiado del terreno irregular.",
      en: "Softer front = less understeer and better compliance over rough terrain.",
    },
  },
  {
    id: "arb_rear",
    group: "suspension",
    name: { es: "Barra estabilizadora (trasero)", en: "Rear anti-roll bar" },
    unit: "N/m",
    min: 0,
    max: 30000, // (rango estimado)
    step: 500,
    default: 14500,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero, en N/m. Lógica inversa a la delantera: endurecer atrás aumenta la rotación; ablandar atrás estabiliza la cola. El preset Equilibrado del i20 trae la trasera mucho más dura (14500) que la delantera.",
      en: "Rear axle roll resistance, in N/m. Inverse logic to the front: stiffening the rear increases rotation; softening it stabilises the rear. The i20 Balanced preset runs the rear much stiffer (14500) than the front.",
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

  // ── DIFERENCIALES (LSD mecánico: rampa °, precarga Nm, placas) ─────────────
  // En AWD hay DOS LSD (frontal y trasero). En el LSD, MENOR ángulo de rampa =
  // MÁS bloqueo. La rampa de potencia gobierna el bloqueo al acelerar; la de
  // inercia (coast), al levantar/frenar. La precarga es el bloqueo de base.
  {
    id: "diff_front_power_ramp",
    group: "differential",
    name: { es: "Rampa de potencia (frontal)", en: "Front power ramp" },
    unit: "°",
    min: 20,
    max: 90, // (rango estimado)
    step: 5,
    default: 50,
    whatItDoes: {
      es: "Ángulo de la rampa de aceleración del LSD DELANTERO (solo 4WD/FWD). Menor ángulo = más bloqueo al acelerar = más tracción adelante pero más subviraje de salida; mayor ángulo = menos bloqueo, frente más libre para girar.",
      en: "Acceleration-ramp angle of the FRONT LSD (4WD/FWD only). Lower angle = more lock on power = more front traction but more exit understeer; higher angle = less lock, freer front to turn.",
    },
    increaseEffect: {
      es: "Subir el ángulo = menos bloqueo delantero al acelerar; frente más suelto para rotar, menos torque steer.",
      en: "Raising the angle = less front lock on power; freer front to rotate, less torque steer.",
    },
    decreaseEffect: {
      es: "Bajar el ángulo = más bloqueo delantero; más tracción de salida pero el frente empuja (subvira).",
      en: "Lowering the angle = more front lock; more exit traction but the front pushes (understeers).",
    },
  },
  {
    id: "diff_front_coast_ramp",
    group: "differential",
    name: { es: "Rampa de inercia (frontal)", en: "Front coast ramp" },
    unit: "°",
    min: 20,
    max: 90, // (rango estimado)
    step: 5,
    default: 70,
    whatItDoes: {
      es: "Ángulo de la rampa de retención (al levantar gas/frenar) del LSD DELANTERO. Menor ángulo = más bloqueo en freno motor = más estabilidad de entrada pero más subviraje al soltar gas.",
      en: "Coast-ramp angle (off-throttle/braking) of the FRONT LSD. Lower angle = more lock under engine braking = more entry stability but more lift-off understeer.",
    },
    increaseEffect: {
      es: "Subir el ángulo = menos bloqueo al levantar; frente más libre para rotar entrando, menos estable.",
      en: "Raising the angle = less lock on lift-off; freer front to rotate on entry, less stable.",
    },
    decreaseEffect: {
      es: "Bajar el ángulo = más bloqueo al levantar; entrada más estable, algo más de subviraje.",
      en: "Lowering the angle = more lock on lift-off; more stable entry, a bit more understeer.",
    },
  },
  {
    id: "diff_front_preload",
    group: "differential",
    name: { es: "Precarga del LSD (frontal)", en: "Front LSD preload" },
    unit: "Nm",
    min: 0,
    max: 300, // (rango estimado)
    step: 5,
    default: 135,
    whatItDoes: {
      es: "Bloqueo de base del LSD delantero ante cambios suaves de acelerador. Más precarga = el frente reacciona más como eje rígido (estable pero subvirador); menos = más rotación y reacción al gas.",
      en: "Baseline lock of the front LSD under gentle throttle changes. More preload = the front behaves more like a locked axle (stable but understeery); less = more rotation and throttle response.",
    },
    increaseEffect: {
      es: "Más precarga adelante estabiliza el frente en transiciones, pero agrega subviraje.",
      en: "More front preload stabilises the front in transitions, but adds understeer.",
    },
    decreaseEffect: {
      es: "Menos precarga libera el frente para girar, con más reacción (y nerviosismo) al gas.",
      en: "Less preload frees the front to turn, with more (and twitchier) throttle reaction.",
    },
  },
  {
    id: "diff_front_plates",
    group: "differential",
    name: { es: "Número de placas (frontal)", en: "Front plate count" },
    unit: "",
    min: 2,
    max: 10, // (rango estimado)
    step: 2,
    default: 6,
    whatItDoes: {
      es: "Cantidad de placas de embrague del LSD delantero: más placas = más capacidad de bloqueo (la rampa actúa con más fuerza). Es un ajuste fino/avanzado; se suele dejar de fábrica salvo que busques cambiar el carácter del bloqueo.",
      en: "Clutch plate count of the front LSD: more plates = more locking capacity (the ramp acts more strongly). A fine/advanced tweak; usually left stock unless you want to change the lock character.",
    },
    increaseEffect: {
      es: "Más placas = bloqueo delantero más fuerte y progresivo.",
      en: "More plates = stronger, more progressive front lock.",
    },
    decreaseEffect: {
      es: "Menos placas = bloqueo delantero más débil y suave.",
      en: "Fewer plates = weaker, softer front lock.",
    },
  },
  {
    id: "diff_rear_power_ramp",
    group: "differential",
    name: { es: "Rampa de potencia (trasero)", en: "Rear power ramp" },
    unit: "°",
    min: 20,
    max: 90, // (rango estimado)
    step: 5,
    default: 55,
    whatItDoes: {
      es: "Ángulo de la rampa de aceleración del LSD TRASERO. Menor ángulo = más bloqueo al acelerar = más tracción de salida y estabilidad, pero tiende a subvirar al poner gas; mayor ángulo = más rotación de salida.",
      en: "Acceleration-ramp angle of the REAR LSD. Lower angle = more lock on power = more exit traction and stability, but tends to understeer on throttle; higher angle = more exit rotation.",
    },
    increaseEffect: {
      es: "Subir el ángulo = menos bloqueo trasero al acelerar; más rotación de salida, menos tracción.",
      en: "Raising the angle = less rear lock on power; more exit rotation, less traction.",
    },
    decreaseEffect: {
      es: "Bajar el ángulo = más bloqueo trasero; más tracción y estabilidad de salida, algo de subviraje al gas.",
      en: "Lowering the angle = more rear lock; more exit traction and stability, some throttle understeer.",
    },
  },
  {
    id: "diff_rear_coast_ramp",
    group: "differential",
    name: { es: "Rampa de inercia (trasero)", en: "Rear coast ramp" },
    unit: "°",
    min: 20,
    max: 90, // (rango estimado)
    step: 5,
    default: 75,
    whatItDoes: {
      es: "Ángulo de la rampa de retención del LSD TRASERO. Menor ángulo = más bloqueo al levantar/frenar = cola más estable en la entrada (evita el sobreviraje de levantada, clave en nieve); mayor ángulo = más rotación de entrada.",
      en: "Coast-ramp angle of the REAR LSD. Lower angle = more lock on lift-off/braking = a more stable rear on entry (prevents lift-off oversteer, key on snow); higher angle = more entry rotation.",
    },
    increaseEffect: {
      es: "Subir el ángulo = menos bloqueo al levantar; cola más libre para rotar entrando, menos estable.",
      en: "Raising the angle = less lock on lift-off; freer rear to rotate on entry, less stable.",
    },
    decreaseEffect: {
      es: "Bajar el ángulo = más bloqueo al levantar; entrada más estable, evita que la cola se cruce.",
      en: "Lowering the angle = more lock on lift-off; more stable entry, stops the rear stepping out.",
    },
  },
  {
    id: "diff_rear_preload",
    group: "differential",
    name: { es: "Precarga del LSD (trasero)", en: "Rear LSD preload" },
    unit: "Nm",
    min: 0,
    max: 300, // (rango estimado)
    step: 5,
    default: 150,
    whatItDoes: {
      es: "Bloqueo de base del LSD trasero. Más precarga = cola más estable bajo cambios de gas y más tracción de base, pero algo de subviraje al entrar; menos = más rotación y cola más viva.",
      en: "Baseline lock of the rear LSD. More preload = a more stable rear under throttle changes and more baseline traction, but some entry understeer; less = more rotation and a livelier rear.",
    },
    increaseEffect: {
      es: "Más precarga atrás estabiliza la cola y da tracción de base, agregando algo de subviraje de entrada.",
      en: "More rear preload stabilises the rear and gives baseline traction, adding some entry understeer.",
    },
    decreaseEffect: {
      es: "Menos precarga libera la rotación, con una cola más viva (y nerviosa) en transiciones.",
      en: "Less preload frees rotation, with a livelier (and twitchier) rear in transitions.",
    },
  },
  {
    id: "diff_rear_plates",
    group: "differential",
    name: { es: "Número de placas (trasero)", en: "Rear plate count" },
    unit: "",
    min: 2,
    max: 10, // (rango estimado)
    step: 2,
    default: 6,
    whatItDoes: {
      es: "Cantidad de placas de embrague del LSD trasero: más placas = más capacidad de bloqueo. Ajuste fino/avanzado; normalmente de fábrica.",
      en: "Clutch plate count of the rear LSD: more plates = more locking capacity. A fine/advanced tweak; normally left stock.",
    },
    increaseEffect: {
      es: "Más placas = bloqueo trasero más fuerte y progresivo.",
      en: "More plates = stronger, more progressive rear lock.",
    },
    decreaseEffect: {
      es: "Menos placas = bloqueo trasero más débil y suave.",
      en: "Fewer plates = weaker, softer rear lock.",
    },
  },

  // ── RUEDAS (presión + alineación) ─────────────────────────────────────────
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión (del.)", en: "Front tyre pressure" },
    unit: "psi",
    min: 18,
    max: 40, // (rango estimado)
    step: 0.5,
    default: 32.0,
    whatItDoes: {
      es: "Presión del neumático delantero. En asfalto la referencia es media-alta; en grava/nieve se baja para ganar huella de contacto y tracción. OJO: la build EA tiene un bug de PSI invertido (más presión da más grip in-game, al revés de lo realista).",
      en: "Front tyre pressure. On tarmac the reference is medium-high; on gravel/snow you drop it for more contact patch and traction. NOTE: the EA build has an inverted-PSI bug (more pressure gives more grip in-game, opposite to reality).",
    },
    increaseEffect: {
      es: "Respuesta más rápida y menos resistencia (en teoría menos huella). Por el bug actual, subir presión está dando más grip.",
      en: "Sharper response and less rolling resistance (in theory a smaller patch). Due to the current bug, raising pressure is giving more grip.",
    },
    decreaseEffect: {
      es: "Más huella y calor; ablanda el auto sobre baches. Útil en grava/nieve (salvo por el bug de PSI invertido).",
      en: "More patch and heat; softens the car over bumps. Useful on gravel/snow (except for the inverted-PSI bug).",
    },
  },
  {
    id: "tyre_pressure_rear",
    group: "tyres",
    name: { es: "Presión (tras.)", en: "Rear tyre pressure" },
    unit: "psi",
    min: 18,
    max: 40, // (rango estimado)
    step: 0.5,
    default: 32.0,
    whatItDoes: {
      es: "Presión del neumático trasero: afecta tracción de salida y estabilidad de la cola. Misma lógica y mismo bug de PSI invertido que el delantero en la build EA.",
      en: "Rear tyre pressure: affects exit traction and rear stability. Same logic and same inverted-PSI bug as the front in the EA build.",
    },
    increaseEffect: {
      es: "Cola más reactiva, menos huella (en teoría). Por el bug actual puede dar más tracción.",
      en: "Twitchier rear, less patch (in theory). Due to the current bug it can give more traction.",
    },
    decreaseEffect: {
      es: "Más huella y calor atrás; mejora tracción en suelto, ablandando la cola sobre baches.",
      en: "More rear patch and heat; improves traction on loose ground, softening the rear over bumps.",
    },
  },
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Ángulo de caída (del.)", en: "Front camber" },
    unit: "°",
    min: -5.0,
    max: 0.0, // (rango estimado)
    step: 0.1,
    default: -3.5,
    whatItDoes: {
      es: "Inclinación de la rueda delantera vista de frente. Más caída negativa maximiza el agarre lateral en apoyo (sobre todo en asfalto). En grava se usa algo menos negativo para repartir carga sobre piso irregular.",
      en: "Front wheel lean seen from the front. More negative camber maximises lateral grip while loaded (especially on tarmac). On gravel slightly less negative is used to spread load over rough ground.",
    },
    increaseEffect: {
      es: "Hacia 0 (menos negativo) mejora frenada en recta y tracción, bajando el agarre lateral en apoyo.",
      en: "Toward 0 (less negative) improves straight-line braking and traction, lowering loaded lateral grip.",
    },
    decreaseEffect: {
      es: "Más negativo da más agarre lateral en curva (ideal en asfalto), a costa de frenada y tracción en recta.",
      en: "More negative gives more cornering grip (ideal on tarmac), at the cost of straight-line braking and traction.",
    },
  },
  {
    id: "camber_rear",
    group: "alignment",
    name: { es: "Ángulo de caída (tras.)", en: "Rear camber" },
    unit: "°",
    min: -5.0,
    max: 0.0, // (rango estimado)
    step: 0.1,
    default: -3.1,
    whatItDoes: {
      es: "Caída del tren trasero: ajusta el agarre lateral de la cola y el equilibrio en curva.",
      en: "Rear axle camber: adjusts the rear's lateral grip and cornering balance.",
    },
    increaseEffect: {
      es: "Hacia 0 mejora la tracción en recta pero la cola agarra menos de costado.",
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
    name: { es: "Convergencia (del.)", en: "Front toe" },
    unit: "m",
    min: -0.002,
    max: 0.002, // (rango estimado; AC mide el toe como offset lineal en metros)
    step: 0.0001,
    default: 0.0001,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas delanteras vistas desde arriba. AC Rally mide el toe como un offset en METROS (valores chicos). Toe-out (negativo) agiliza la entrada y contrarresta el subviraje; toe-in (positivo) estabiliza la recta. (Convención de signo: confirmar in-game.)",
      en: "Where the front wheels point seen from above. AC Rally measures toe as a linear offset in METRES (small values). Toe-out (negative) sharpens entry and counters understeer; toe-in (positive) stabilises straight-line. (Sign convention: confirm in-game.)",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo) da más estabilidad en recta pero entrada más perezosa.",
      en: "Toward toe-in (positive) adds straight-line stability but lazier turn-in.",
    },
    decreaseEffect: {
      es: "Más toe-out (negativo) agiliza la entrada y la respuesta de dirección, con más nerviosismo y desgaste.",
      en: "More toe-out (negative) sharpens entry and steering response, with more nervousness and wear.",
    },
  },
  {
    id: "toe_rear",
    group: "alignment",
    name: { es: "Convergencia (tras.)", en: "Rear toe" },
    unit: "m",
    min: -0.002,
    max: 0.002, // (rango estimado)
    step: 0.0001,
    default: 0.0000,
    whatItDoes: {
      es: "Convergencia del tren trasero (offset en metros). Toe-in (positivo) estabiliza el eje trasero al acelerar y frenar; se usa más toe-in en nieve para estabilidad. (Convención de signo: confirmar in-game.)",
      en: "Rear axle toe (offset in metres). Toe-in (positive) stabilises the rear under power and braking; more toe-in is used on snow for stability. (Sign convention: confirm in-game.)",
    },
    increaseEffect: {
      es: "Más toe-in estabiliza la cola al acelerar y frenar, a costa de un pelín de punta y rotación.",
      en: "More toe-in stabilises the rear on power and braking, costing a touch of top speed and rotation.",
    },
    decreaseEffect: {
      es: "Menos toe-in (hacia toe-out) libera la cola y da más rotación, con menos estabilidad en baja adherencia.",
      en: "Less toe-in (toward toe-out) frees the rear for more rotation, with less stability on low grip.",
    },
  },

  // ── FRENOS ────────────────────────────────────────────────────────────────
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Balance frontal", en: "Front brake balance" },
    unit: "",
    min: 0.40,
    max: 0.65, // (rango estimado)
    step: 0.005,
    default: 0.500,
    whatItDoes: {
      es: "Fracción del freno que va al eje delantero (0-1; 0.500 = 50% adelante). Más adelante (valor mayor) permite frenar más fuerte en asfalto; neutro/atrás (valor menor) evita bloqueo en grava/nieve y ayuda a rotar con el freno.",
      en: "Fraction of braking sent to the front axle (0-1; 0.500 = 50% front). More forward (higher value) lets you brake harder on tarmac; neutral/rearward (lower value) avoids locking on gravel/snow and helps brake-rotation.",
    },
    increaseEffect: {
      es: "Más adelante = frenada más estable y potente en asfalto, pero más riesgo de bloquear las delanteras y subvirar.",
      en: "More forward = more stable, powerful braking on tarmac, but more risk of locking the fronts and understeering.",
    },
    decreaseEffect: {
      es: "Más atrás ayuda a rotar con el freno y evita bloqueo en grava/nieve, con riesgo de soltar la cola.",
      en: "More rearward helps brake-rotation and avoids locking on gravel/snow, with risk of the rear stepping out.",
    },
  },
  {
    id: "brake_cylinder_front",
    group: "brakes",
    name: { es: "Cilindro delantero", en: "Front master cylinder" },
    unit: "mm",
    min: 15.0,
    max: 26.0, // (rango estimado; suelen ser diámetros discretos)
    step: 0.05,
    default: 19.05,
    whatItDoes: {
      es: "Diámetro del cilindro maestro delantero (mm). Junto con el trasero define la fuerza y el reparto reales de frenada: un cilindro más chico adelante baja la fuerza delantera (corre el balance hacia atrás). Es un ajuste 'duro' que normalmente se deja salvo afinado fino.",
      en: "Front master-cylinder diameter (mm). With the rear it sets the real braking force and split: a smaller front cylinder lowers front force (shifts balance rearward). A 'hard' tweak usually left stock except for fine tuning.",
    },
    increaseEffect: {
      es: "Cilindro delantero más grande = más fuerza de freno adelante (balance efectivo hacia el frente).",
      en: "Larger front cylinder = more front braking force (effective balance forward).",
    },
    decreaseEffect: {
      es: "Cilindro delantero más chico = menos fuerza adelante (balance efectivo hacia atrás), menos bloqueo delantero.",
      en: "Smaller front cylinder = less front force (effective balance rearward), less front locking.",
    },
  },
  {
    id: "brake_cylinder_rear",
    group: "brakes",
    name: { es: "Cilindro trasero", en: "Rear master cylinder" },
    unit: "mm",
    min: 15.0,
    max: 26.0, // (rango estimado)
    step: 0.05,
    default: 20.64,
    whatItDoes: {
      es: "Diámetro del cilindro maestro trasero (mm). Un cilindro más grande atrás sube la fuerza trasera (corre el balance hacia atrás). Se combina con el delantero y el balance frontal para el reparto final.",
      en: "Rear master-cylinder diameter (mm). A larger rear cylinder raises rear force (shifts balance rearward). Combines with the front cylinder and front balance for the final split.",
    },
    increaseEffect: {
      es: "Cilindro trasero más grande = más fuerza de freno atrás (más rotación con freno, riesgo de bloquear la cola).",
      en: "Larger rear cylinder = more rear braking force (more brake-rotation, risk of rear locking).",
    },
    decreaseEffect: {
      es: "Cilindro trasero más chico = menos fuerza atrás (cola más estable al frenar).",
      en: "Smaller rear cylinder = less rear force (a more stable rear under braking).",
    },
  },
  {
    id: "brake_pad",
    group: "brakes",
    name: { es: "Pastillas/zapatos", en: "Brake pads/shoes" },
    unit: "",
    min: 1,
    max: 3,
    step: 1,
    default: 2, // 1 = Bajo, 2 = Medio, 3 = Alto
    whatItDoes: {
      es: "Compuesto de pastilla/zapata: 1 = Bajo, 2 = Medio, 3 = Alto. Más alto muerde más fuerte y aguanta más temperatura (asfalto/frenadas duras); más bajo es más progresivo y bloquea menos en baja adherencia (grava/nieve/hielo).",
      en: "Pad/shoe compound: 1 = Low, 2 = Medium, 3 = High. Higher bites harder and takes more heat (tarmac/hard braking); lower is more progressive and locks less on low grip (gravel/snow/ice).",
    },
    increaseEffect: {
      es: "Compuesto más alto = más mordida y aguante térmico; ideal en asfalto, pero más fácil de bloquear en suelto.",
      en: "Higher compound = more bite and heat tolerance; ideal on tarmac, but easier to lock on loose ground.",
    },
    decreaseEffect: {
      es: "Compuesto más bajo = frenada más progresiva y menos bloqueo en grava/nieve, con menos mordida pico.",
      en: "Lower compound = more progressive braking and less locking on gravel/snow, with less peak bite.",
    },
  },
  {
    id: "handbrake_force",
    group: "brakes",
    name: { es: "Fuerza del freno de mano", en: "Handbrake force" },
    unit: "",
    min: 0.0,
    max: 1.0,
    step: 0.05,
    default: 1.00,
    whatItDoes: {
      es: "Cuánta fuerza aplica el freno de mano (0-1). En 4WD el freno de mano suele desacoplar la transmisión; más fuerza bloquea la cola más fácil para tumbar el auto en horquillas; menos fuerza da un giro más medido.",
      en: "How much force the handbrake applies (0-1). On 4WD the handbrake usually decouples the drivetrain; more force locks the rear more easily to swing the car in hairpins; less force gives a more measured rotation.",
    },
    increaseEffect: {
      es: "Más fuerza = la cola se traba más fácil con el freno de mano (giros cerrados, horquillas).",
      en: "More force = the rear locks more easily with the handbrake (tight turns, hairpins).",
    },
    decreaseEffect: {
      es: "Menos fuerza = freno de mano más suave y dosificable, menos riesgo de pasarte de rotación.",
      en: "Less force = a softer, more modulable handbrake, less risk of over-rotating.",
    },
  },

  // ── ELECTRÓNICA ───────────────────────────────────────────────────────────
  {
    id: "abs",
    group: "electronics",
    name: { es: "Sistema de ABS", en: "ABS system" },
    unit: "",
    min: 1,
    max: 3, // (rango estimado: el preset muestra 1; cantidad de mapas sin confirmar)
    step: 1,
    default: 1,
    whatItDoes: {
      es: "Mapa de ABS (solo autos modernos como el Rally2; ajustable in-game). El preset Equilibrado del i20 viene en 1. Mapas más altos previenen más el bloqueo (útil en baja adherencia) a costa de algo de frenada; apagarlo del todo se hace en el menú de Asistencias.",
      en: "ABS map (modern cars like the Rally2 only; adjustable in-game). The i20 Balanced preset is on 1. Higher maps prevent locking more (useful on low grip) at the cost of some braking; turning it fully off is done in the Assists menu.",
    },
    increaseEffect: {
      es: "Mapa más alto = frenadas más seguras y menos planos en grava/nieve/hielo; frenada un poco más larga.",
      en: "Higher map = safer braking and fewer flat-spots on gravel/snow/ice; slightly longer braking.",
    },
    decreaseEffect: {
      es: "Mapa más bajo = frenada más corta y con más tacto, pero más riesgo de bloquear en baja adherencia.",
      en: "Lower map = shorter, more tactile braking, but more risk of locking on low grip.",
    },
  },
  {
    id: "tc",
    group: "electronics",
    name: { es: "Control de tracción", en: "Traction control" },
    unit: "",
    min: 1,
    max: 3, // (rango estimado: el preset muestra 1; cantidad de mapas sin confirmar)
    step: 1,
    default: 1,
    whatItDoes: {
      es: "Mapa de control de tracción (solo autos modernos; ajustable in-game). El preset Equilibrado del i20 viene en 1. Mapas más altos limitan más el patinaje al acelerar (seguro en mojado/nieve), pero recortan la aceleración pura.",
      en: "Traction-control map (modern cars only; adjustable in-game). The i20 Balanced preset is on 1. Higher maps limit wheelspin more on throttle (safe in the wet/snow), but cut raw acceleration.",
    },
    increaseEffect: {
      es: "Mapa más alto = más seguro en mojado/nieve o baja adherencia, pero limita la aceleración.",
      en: "Higher map = safer in the wet/snow or low grip, but limits acceleration.",
    },
    decreaseEffect: {
      es: "Mapa más bajo = más aceleración si sabes dosificar; más riesgo de patinar e irte de cola.",
      en: "Lower map = more acceleration if you can modulate; more risk of wheelspin and the rear stepping out.",
    },
  },
];

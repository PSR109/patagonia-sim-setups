import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de EA SPORTS WRC con su capa educativa.
//
// FUENTE: CAPTURA IN-GAME de Patricio (Ford Puma Rally1, modo Contrarreloj, junio
// 2026), 6 pestañas reales: Marchas, Alineación, Muelles, Amortiguación,
// Diferenciales, Frenada. Los nombres, UNIDADES, valores `default` Y los rangos
// min/max son los REALES que muestra el juego en pantalla (EA WRC sí muestra el
// rango de cada slider, a diferencia de AC Rally). Para el Puma Rally1 esto es
// EXACTO, no estimado.
//
// NO ES UNIFORME ENTRE CLASES (a diferencia de AC Rally): los rangos de muelle,
// barra y diferencial VARÍAN por clase/coche. El Puma Rally1 es la REFERENCIA;
// para otras clases se refina con paramOverrides en cars.ts (hoy: muelles por
// clase kit/moderno). Sin captura por-clase, el resto hereda la referencia Rally1.
//
// PARTICULARIDADES DE EA WRC vs AC Rally:
//  - Muelles en N/mm (no N/m); altura de marcha ABSOLUTA en mm (no offset, no m).
//  - Toe y camber en GRADOS (no metros).
//  - Amortiguadores en CLICKS relativos -5..+5 (no Ns/m) + "división de
//    amortiguación" (velocidad de cruce slow/fast en m/s). NO existe rebote rápido.
//  - Frenos: fuerza y freno de mano en N·m; reparto en %.
//  - Marchas: 5 relaciones individuales (0.2-1.2) + transmisión final (0.1-0.3).
//  - Diferencial: LSD FRONTAL + TRASERO (bloqueo de conducción/power %, bloqueo de
//    frenada/coast %, precarga N·m). El frontal solo existe en 4WD/FWD; el trasero
//    en 4WD/RWD. Las reglas tocan SOLO el LSD trasero (rotación/tracción de la cola)
//    con excludeDrivetrains:["fwd"]; el frontal y la "división de amortiguación"
//    quedan como capa educativa (no los mueve ninguna regla).
//  - NO hay pestaña de neumáticos: la presión NO es ajustable en el setup de EA WRC
//    (se elige compuesto, no presión). Por eso no hay params de presión.
//
// STEP: cuando el incremento del slider no es visible se ESTIMA (marcado abajo) de
// forma que el `default` quede como múltiplo exacto. delta de las reglas = pasos × step.
export const ea_wrcParameters: ParameterDef[] = [
  // ── MARCHAS ───────────────────────────────────────────────────────────────
  {
    id: "gear_1",
    group: "gearing",
    name: { es: "1.ª marcha", en: "1st gear" },
    unit: "",
    min: 0.200,
    max: 1.200,
    step: 0.005, // (step estimado)
    default: 0.250,
    whatItDoes: {
      es: "Relación de la 1.ª marcha (valor normalizado). Relación corta (valor bajo) mejora la aceleración a costa de la velocidad punta; demasiado corta dificulta dosificar la potencia.",
      en: "1st-gear ratio (normalised value). A short ratio (low value) improves acceleration at the cost of top speed; too short makes the power hard to modulate.",
    },
    increaseEffect: {
      es: "Más larga: menos aceleración inicial, más velocidad antes de cambiar.",
      en: "Longer: less initial acceleration, more speed before shifting.",
    },
    decreaseEffect: {
      es: "Más corta: más aceleración para horquillas y salidas lentas, menos punta.",
      en: "Shorter: more acceleration for hairpins and slow exits, less top speed.",
    },
  },
  {
    id: "gear_2",
    group: "gearing",
    name: { es: "2.ª marcha", en: "2nd gear" },
    unit: "",
    min: 0.200,
    max: 1.200,
    step: 0.005, // (step estimado)
    default: 0.375,
    whatItDoes: {
      es: "Relación de la 2.ª marcha. Define el escalón entre la salida de curva lenta y la velocidad media; conviene un reparto parejo entre marchas para no dejar 'huecos' de par.",
      en: "2nd-gear ratio. Sets the step between slow-corner exit and mid speed; keep the spacing between gears even to avoid torque holes.",
    },
    increaseEffect: {
      es: "Más larga: alarga el tramo útil de 2.ª, menos aceleración entre 1.ª y 2.ª.",
      en: "Longer: extends the useful range of 2nd, less acceleration between 1st and 2nd.",
    },
    decreaseEffect: {
      es: "Más corta: más aceleración saliendo de curvas, pero cambias antes a 3.ª.",
      en: "Shorter: more acceleration out of corners, but you shift to 3rd sooner.",
    },
  },
  {
    id: "gear_3",
    group: "gearing",
    name: { es: "3.ª marcha", en: "3rd gear" },
    unit: "",
    min: 0.200,
    max: 1.200,
    step: 0.005, // (step estimado)
    default: 0.530,
    whatItDoes: {
      es: "Relación de la 3.ª marcha. Marcha de curvas medias-rápidas: clave para el ritmo en la mayoría de tramos.",
      en: "3rd-gear ratio. The medium-fast corner gear: key to pace on most stages.",
    },
    increaseEffect: {
      es: "Más larga: más velocidad punta en 3.ª, respuesta algo más perezosa.",
      en: "Longer: more top speed in 3rd, slightly lazier response.",
    },
    decreaseEffect: {
      es: "Más corta: mejor reprise al salir de curvas medias, menos punta.",
      en: "Shorter: better pull out of medium corners, less top speed.",
    },
  },
  {
    id: "gear_4",
    group: "gearing",
    name: { es: "4.ª marcha", en: "4th gear" },
    unit: "",
    min: 0.200,
    max: 1.200,
    step: 0.005, // (step estimado)
    default: 0.715,
    whatItDoes: {
      es: "Relación de la 4.ª marcha. Tramos rápidos: equilibra aceleración y velocidad sostenida.",
      en: "4th-gear ratio. Fast sections: balances acceleration and sustained speed.",
    },
    increaseEffect: {
      es: "Más larga: más velocidad punta en rectas largas, menos empuje.",
      en: "Longer: more top speed on long straights, less push.",
    },
    decreaseEffect: {
      es: "Más corta: más empuje en zonas rápidas onduladas, llegas antes al corte.",
      en: "Shorter: more push on fast rolling sections, you hit the limiter sooner.",
    },
  },
  {
    id: "gear_5",
    group: "gearing",
    name: { es: "5.ª marcha", en: "5th gear" },
    unit: "",
    min: 0.200,
    max: 1.200,
    step: 0.005, // (step estimado)
    default: 0.930,
    whatItDoes: {
      es: "Relación de la 5.ª marcha (la más larga). Define la velocidad máxima en las rectas más rápidas del rally.",
      en: "5th-gear ratio (the longest). Sets top speed on the fastest straights of the rally.",
    },
    increaseEffect: {
      es: "Más larga: mayor velocidad punta; si es excesiva, no llegas al máximo de revoluciones.",
      en: "Longer: higher top speed; if excessive, you never reach max revs.",
    },
    decreaseEffect: {
      es: "Más corta: alcanzas el corte antes en recta, útil en rallies lentos y revirados.",
      en: "Shorter: you hit the limiter sooner on straights, useful on slow, twisty rallies.",
    },
  },
  {
    id: "final_drive",
    group: "gearing",
    name: { es: "Transmisión final", en: "Final drive" },
    unit: "",
    min: 0.100,
    max: 0.300,
    step: 0.005, // (step estimado)
    default: 0.200,
    whatItDoes: {
      es: "Relación final: escala TODAS las marchas a la vez (valor normalizado). Es el ajuste global más práctico: corta para etapas lentas/montaña, larga para rallies rápidos y abiertos.",
      en: "Final drive: scales ALL gears at once (normalised value). The most practical global tweak: short for slow/mountain stages, long for fast, open rallies.",
    },
    increaseEffect: {
      es: "Más larga (valor mayor): sube la velocidad punta de todas las marchas, a costa de aceleración.",
      en: "Longer (higher value): raises top speed in every gear, at the cost of acceleration.",
    },
    decreaseEffect: {
      es: "Más corta (valor menor): más aceleración y freno motor en todas las marchas, menos punta.",
      en: "Shorter (lower value): more acceleration and engine braking in every gear, less top speed.",
    },
  },

  // ── ALINEACIÓN (toe/camber en grados) ─────────────────────────────────────
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Ángulo de inclinación (del.)", en: "Front camber" },
    unit: "°",
    min: -2.50,
    max: 0.00,
    step: 0.05, // (step estimado)
    default: -1.00,
    whatItDoes: {
      es: "Inclinación de la rueda delantera vista de frente (siempre negativa o 0). Más negativa = más agarre lateral en curva; hacia 0 = mejor frenada y tracción en recta.",
      en: "Front wheel lean seen head-on (always negative or 0). More negative = more cornering grip; toward 0 = better braking and straight-line traction.",
    },
    increaseEffect: {
      es: "Hacia 0 (menos negativa): mejora frenada y tracción en recta y reparte el desgaste, pierde mordida al doblar.",
      en: "Toward 0 (less negative): improves braking and straight-line traction and evens wear, loses bite when turning.",
    },
    decreaseEffect: {
      es: "Más negativa: más agarre lateral delantero en apoyo (ideal en asfalto), a costa de recta.",
      en: "More negative: more front lateral grip when loaded (ideal on tarmac), at the cost of straight-line.",
    },
  },
  {
    id: "camber_rear",
    group: "alignment",
    name: { es: "Ángulo de inclinación (tras.)", en: "Rear camber" },
    unit: "°",
    min: -2.25,
    max: 0.00,
    step: 0.05, // (step estimado)
    default: -0.75,
    whatItDoes: {
      es: "Caída del tren trasero (negativa o 0). Negativa = mejor agarre lateral de la cola en curva; hacia 0 = más tracción en recta.",
      en: "Rear axle camber (negative or 0). Negative = more rear lateral grip in corners; toward 0 = more straight-line traction.",
    },
    increaseEffect: {
      es: "Hacia 0: favorece la tracción en recta, la cola agarra menos de costado.",
      en: "Toward 0: favours straight-line traction, the rear grips less laterally.",
    },
    decreaseEffect: {
      es: "Más negativa: estabiliza la cola en apoyo, restando algo de tracción pura.",
      en: "More negative: stabilises the rear when loaded, costing some pure traction.",
    },
  },
  {
    id: "toe_front",
    group: "alignment",
    name: { es: "Ángulo de convergencia (del.)", en: "Front toe" },
    unit: "°",
    min: -2.00,
    max: 2.00,
    step: 0.05, // (step estimado)
    default: 0.00,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas delanteras vistas desde arriba, en grados. Toe-out (negativo) = entrada más reactiva; toe-in (positivo) = más estabilidad en recta.",
      en: "Where the front wheels point seen from above, in degrees. Toe-out (negative) = sharper turn-in; toe-in (positive) = more straight-line stability.",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo): más estabilidad, respuesta más perezosa y tendencia al subviraje.",
      en: "Toward toe-in (positive): more stability, lazier response and a tendency to understeer.",
    },
    decreaseEffect: {
      es: "Más toe-out (negativo): agiliza la entrada y la dirección, con un tacto más nervioso.",
      en: "More toe-out (negative): sharpens turn-in and steering, with a twitchier feel.",
    },
  },
  {
    id: "toe_rear",
    group: "alignment",
    name: { es: "Ángulo de convergencia (tras.)", en: "Rear toe" },
    unit: "°",
    min: -2.00,
    max: 2.00,
    step: 0.05, // (step estimado)
    default: 0.00,
    whatItDoes: {
      es: "Convergencia del tren trasero, en grados. Toe-in (positivo) = estabilidad y tracción a la salida; toe-out (negativo) = más rotación de la cola.",
      en: "Rear axle toe, in degrees. Toe-in (positive) = stability and exit traction; toe-out (negative) = more rear rotation.",
    },
    increaseEffect: {
      es: "Más toe-in (positivo): estabiliza la cola al acelerar y frenar, restando algo de rotación.",
      en: "More toe-in (positive): stabilises the rear on power and braking, costing some rotation.",
    },
    decreaseEffect: {
      es: "Hacia toe-out (negativo): la cola rota más; en exceso provoca sobreviraje.",
      en: "Toward toe-out (negative): the rear rotates more; too much causes oversteer.",
    },
  },

  // ── MUELLES (altura mm, muelle N/mm, barra N/mm) ──────────────────────────
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Altura de marcha (del.)", en: "Front ride height" },
    unit: "mm",
    min: 40,
    max: 80,
    step: 1,
    default: 60,
    whatItDoes: {
      es: "Altura de marcha delantera ABSOLUTA, en mm (no es un offset). Baja = mejor estabilidad y menor centro de gravedad (asfalto); alta = más recorrido de suspensión para terreno complicado (grava/nieve).",
      en: "ABSOLUTE front ride height, in mm (not an offset). Low = better stability and lower centre of gravity (tarmac); high = more suspension travel for rough terrain (gravel/snow).",
    },
    increaseEffect: {
      es: "Subir: más recorrido y evita tocar fondo en etapas rugosas, con más balanceo.",
      en: "Raising: more travel and avoids bottoming on rough stages, with more body roll.",
    },
    decreaseEffect: {
      es: "Bajar: menos balanceo y más estabilidad en asfalto, arriesga tocar fondo en suelto.",
      en: "Lowering: less roll and more tarmac stability, risks bottoming on loose ground.",
    },
  },
  {
    id: "spring_front",
    group: "suspension",
    name: { es: "Capacidad del muelle (del.)", en: "Front spring rate" },
    unit: "N/mm",
    min: 60,
    max: 200,
    step: 1,
    default: 116,
    whatItDoes: {
      es: "Rigidez del muelle delantero, en N/mm reales. El rango VARÍA por clase (este es el del Rally1; kit cars y customer modernos difieren). Blando absorbe baches y da agarre; duro mejora la respuesta pero copia peor el terreno.",
      en: "Front spring stiffness, in real N/mm. The range VARIES by class (this is the Rally1's; kit cars and modern customer cars differ). Soft absorbs bumps and adds grip; stiff sharpens response but follows terrain worse.",
    },
    increaseEffect: {
      es: "Más duro adelante: mejor respuesta y handling, peor sobre baches y tiende al subviraje.",
      en: "Stiffer front: better response and handling, worse over bumps and tends to understeer.",
    },
    decreaseEffect: {
      es: "Más blando adelante: copia mejor el terreno y suma agarre; más blando que atrás reduce el subviraje.",
      en: "Softer front: follows the terrain better and adds grip; softer than the rear reduces understeer.",
    },
  },
  {
    id: "arb_front",
    group: "suspension",
    name: { es: "Barra estabilizadora (del.)", en: "Front anti-roll bar" },
    unit: "N/mm",
    min: 0.0,
    max: 66.0,
    step: 0.3, // (step estimado; encaja 26.4 y 42.9 como múltiplos exactos)
    default: 26.4,
    whatItDoes: {
      es: "Cuánto se resiste el eje delantero a balancearse, en N/mm. Más dura = balance hacia subviraje y plataforma más estable; más blanda = más agarre y copiado del frente.",
      en: "How much the front axle resists roll, in N/mm. Stiffer = balance toward understeer and a more stable platform; softer = more front grip and compliance.",
    },
    increaseEffect: {
      es: "Más dura adelante: desplaza el balance al subviraje y da estabilidad, copia peor los baches.",
      en: "Stiffer front: shifts balance toward understeer and adds stability, follows bumps worse.",
    },
    decreaseEffect: {
      es: "Más blanda adelante: más agarre del frente y 'compliance' en frenada; corrige subviraje.",
      en: "Softer front: more front grip and compliance under braking; fixes understeer.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Altura de marcha (tras.)", en: "Rear ride height" },
    unit: "mm",
    min: 40,
    max: 80,
    step: 1,
    default: 60,
    whatItDoes: {
      es: "Altura de marcha trasera ABSOLUTA, en mm. La diferencia con la delantera define el 'rake': una cola algo más alta ayuda a rotar y entrar; más baja estabiliza en alta velocidad.",
      en: "ABSOLUTE rear ride height, in mm. The difference vs the front sets the 'rake': a slightly higher rear helps rotation and turn-in; lower stabilises at high speed.",
    },
    increaseEffect: {
      es: "Subir atrás: más rake y rotación, más recorrido sobre baches grandes.",
      en: "Raising the rear: more rake and rotation, more travel over big bumps.",
    },
    decreaseEffect: {
      es: "Bajar atrás: menos rake, cola más estable en alta velocidad, algo menos de rotación.",
      en: "Lowering the rear: less rake, a more stable rear at high speed, a bit less rotation.",
    },
  },
  {
    id: "spring_rear",
    group: "suspension",
    name: { es: "Capacidad del muelle (tras.)", en: "Rear spring rate" },
    unit: "N/mm",
    min: 60,
    max: 200,
    step: 1,
    default: 116,
    whatItDoes: {
      es: "Rigidez del muelle trasero, en N/mm reales (varía por clase). Define cuánta rotación tiene la cola y cómo copia el terreno el tren trasero.",
      en: "Rear spring stiffness, in real N/mm (varies by class). Sets how much the rear rotates and how the rear axle follows the terrain.",
    },
    increaseEffect: {
      es: "Más duro atrás: más rotación y respuesta, con riesgo de sobreviraje y peor sobre baches.",
      en: "Stiffer rear: more rotation and response, with risk of oversteer and worse over bumps.",
    },
    decreaseEffect: {
      es: "Más blando atrás: desplaza el balance al subviraje y mejora la tracción sobre terreno irregular.",
      en: "Softer rear: shifts balance toward understeer and improves traction over rough ground.",
    },
  },
  {
    id: "arb_rear",
    group: "suspension",
    name: { es: "Barra estabilizadora (tras.)", en: "Rear anti-roll bar" },
    unit: "N/mm",
    min: 0.0,
    max: 66.0,
    step: 0.3, // (step estimado; encaja 26.4 y 42.9 como múltiplos exactos)
    default: 42.9,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero, en N/mm. Más dura = más rotación/sobreviraje; más blanda = más tracción y estabilidad de la cola.",
      en: "Rear axle roll resistance, in N/mm. Stiffer = more rotation/oversteer; softer = more rear traction and stability.",
    },
    increaseEffect: {
      es: "Más dura atrás: más rotación y sobreviraje; ayuda contra el subviraje pero suelta la cola.",
      en: "Stiffer rear: more rotation and oversteer; helps understeer but loosens the rear.",
    },
    decreaseEffect: {
      es: "Más blanda atrás: desplaza el balance al subviraje y suma tracción trasera sobre baches.",
      en: "Softer rear: shifts balance toward understeer and adds rear traction over bumps.",
    },
  },

  // ── AMORTIGUACIÓN (clicks -5..+5; sin rebote rápido; + división m/s) ───────
  {
    id: "damper_slow_bump_front",
    group: "dampers",
    name: { es: "Bache lento (del.)", en: "Front slow bump" },
    unit: "",
    min: -5.0,
    max: 5.0,
    step: 0.5, // (step estimado)
    default: 0.0,
    whatItDoes: {
      es: "Factor de compresión a baja velocidad del amortiguador delantero (transferencias sostenidas: frenadas, apoyos). Valor firme (+) ayuda a la estabilidad; suave (-) absorbe mejor los golpes lentos.",
      en: "Front low-speed compression factor (sustained transfers: braking, cornering loads). A firm value (+) aids stability; a soft value (-) absorbs slow hits better.",
    },
    increaseEffect: {
      es: "Más firme (+): transferencia de peso más controlada y precisión en asfalto, menos absorción.",
      en: "Firmer (+): more controlled weight transfer and tarmac precision, less absorption.",
    },
    decreaseEffect: {
      es: "Más suave (-): transiciones más suaves y mejor agarre en suelto, plataforma menos estable.",
      en: "Softer (-): smoother transitions and better grip on loose ground, a less stable platform.",
    },
  },
  {
    id: "damper_fast_bump_front",
    group: "dampers",
    name: { es: "Bache rápido (del.)", en: "Front fast bump" },
    unit: "",
    min: -5.0,
    max: 5.0,
    step: 0.5, // (step estimado)
    default: 0.0,
    whatItDoes: {
      es: "Factor de compresión a alta velocidad del amortiguador delantero (impactos bruscos: baches, piedras, pianos). Suave (-) deja que la rueda suba rápido en grava; firme (+) controla impactos en asfalto.",
      en: "Front high-speed compression factor (sharp impacts: bumps, rocks, kerbs). Soft (-) lets the wheel move up quickly on gravel; firm (+) controls impacts on tarmac.",
    },
    increaseEffect: {
      es: "Más firme (+): evita llegar al tope en baches grandes, pero la rueda rebota en grava.",
      en: "Firmer (+): keeps it off the bump stops on big hits, but the wheel skips on gravel.",
    },
    decreaseEffect: {
      es: "Más suave (-): la rueda absorbe baches y piedras sin desestabilizar; ideal en grava/nieve.",
      en: "Softer (-): the wheel absorbs bumps and rocks without upsetting the car; ideal on gravel/snow.",
    },
  },
  {
    id: "damper_split_front",
    group: "dampers",
    name: { es: "División de amortiguación (del.)", en: "Front damping split" },
    unit: "m/s",
    min: 0.00,
    max: 1.30,
    step: 0.05, // (step estimado)
    default: 0.65,
    whatItDoes: {
      es: "Velocidad de la rueda (m/s) a la que el amortiguador delantero pasa de la curva 'lenta' a la 'rápida'. Más baja = la amortiguación rápida entra antes (mejor ante impactos secos); más alta = más rango bajo la curva lenta. Ajuste avanzado; las reglas lo dejan de base.",
      en: "Wheel speed (m/s) at which the front damper crosses from the 'slow' to the 'fast' curve. Lower = fast damping engages sooner (better for sharp impacts); higher = more range under the slow curve. Advanced tweak; the rules leave it at base.",
    },
    increaseEffect: {
      es: "Más alta: más eventos quedan bajo la curva lenta (más control sostenido).",
      en: "Higher: more events stay under the slow curve (more sustained control).",
    },
    decreaseEffect: {
      es: "Más baja: la curva rápida entra antes, mejor reacción a baches secos.",
      en: "Lower: the fast curve engages sooner, better reaction to sharp bumps.",
    },
  },
  {
    id: "damper_slow_rebound_front",
    group: "dampers",
    name: { es: "Rebote lento (del.)", en: "Front slow rebound" },
    unit: "",
    min: -5.0,
    max: 5.0,
    step: 0.5, // (step estimado)
    default: 0.0,
    whatItDoes: {
      es: "Factor de extensión a baja velocidad del amortiguador delantero (cuán rápido se recupera la carrocería al soltar freno/apoyo). EA WRC no separa rebote rápido: este canal gobierna la recuperación.",
      en: "Front low-speed extension factor (how fast the body recovers when releasing brake/load). EA WRC has no separate fast rebound: this channel governs recovery.",
    },
    increaseEffect: {
      es: "Más firme (+): la carrocería se recupera más lento; estabilidad, pero la rueda tarda en volver al suelo.",
      en: "Firmer (+): the body recovers more slowly; stability, but the wheel is slow to return to the ground.",
    },
    decreaseEffect: {
      es: "Más suave (-): recuperación rápida del frente; más agarre en terreno roto, plataforma menos controlada.",
      en: "Softer (-): quick front recovery; more grip on broken ground, a less controlled platform.",
    },
  },
  {
    id: "damper_slow_bump_rear",
    group: "dampers",
    name: { es: "Bache lento (tras.)", en: "Rear slow bump" },
    unit: "",
    min: -5.0,
    max: 5.0,
    step: 0.5, // (step estimado)
    default: 0.0,
    whatItDoes: {
      es: "Factor de compresión a baja velocidad del amortiguador trasero. Gestiona la transferencia de peso atrás bajo aceleración y apoyo; clave para tracción y estabilidad de la cola.",
      en: "Rear low-speed compression factor. Manages rear weight transfer under power and load; key for traction and rear stability.",
    },
    increaseEffect: {
      es: "Más firme (+): plataforma trasera más controlada en asfalto, menos tracción sobre baches.",
      en: "Firmer (+): a more controlled rear platform on tarmac, less traction over bumps.",
    },
    decreaseEffect: {
      es: "Más suave (-): más agarre y tracción en suelto, con algo más de balanceo de la cola.",
      en: "Softer (-): more grip and traction on loose ground, with a bit more rear roll.",
    },
  },
  {
    id: "damper_fast_bump_rear",
    group: "dampers",
    name: { es: "Bache rápido (tras.)", en: "Rear fast bump" },
    unit: "",
    min: -5.0,
    max: 5.0,
    step: 0.5, // (step estimado)
    default: 0.0,
    whatItDoes: {
      es: "Factor de compresión a alta velocidad del amortiguador trasero (impactos bruscos atrás). Suave (-) deja que la cola absorba baches y mantenga tracción en grava.",
      en: "Rear high-speed compression factor (sharp rear impacts). Soft (-) lets the rear absorb bumps and keep traction on gravel.",
    },
    increaseEffect: {
      es: "Más firme (+): más control de impactos en asfalto, pero la cola rebota en grava.",
      en: "Firmer (+): more impact control on tarmac, but the rear skips on gravel.",
    },
    decreaseEffect: {
      es: "Más suave (-): la cola absorbe baches y piedras manteniendo tracción; ideal en suelto.",
      en: "Softer (-): the rear absorbs bumps and rocks while keeping traction; ideal on loose ground.",
    },
  },
  {
    id: "damper_split_rear",
    group: "dampers",
    name: { es: "División de amortiguación (tras.)", en: "Rear damping split" },
    unit: "m/s",
    min: 0.00,
    max: 1.30,
    step: 0.05, // (step estimado)
    default: 0.65,
    whatItDoes: {
      es: "Velocidad de la rueda (m/s) a la que el amortiguador trasero pasa de la curva 'lenta' a la 'rápida'. Mismo concepto que el delantero. Ajuste avanzado; las reglas lo dejan de base.",
      en: "Wheel speed (m/s) at which the rear damper crosses from the 'slow' to the 'fast' curve. Same concept as the front. Advanced tweak; the rules leave it at base.",
    },
    increaseEffect: {
      es: "Más alta: más eventos bajo la curva lenta trasera (más control sostenido).",
      en: "Higher: more events under the rear slow curve (more sustained control).",
    },
    decreaseEffect: {
      es: "Más baja: la curva rápida trasera entra antes, mejor ante baches secos.",
      en: "Lower: the rear fast curve engages sooner, better for sharp bumps.",
    },
  },
  {
    id: "damper_slow_rebound_rear",
    group: "dampers",
    name: { es: "Rebote lento (tras.)", en: "Rear slow rebound" },
    unit: "",
    min: -5.0,
    max: 5.0,
    step: 0.5, // (step estimado)
    default: 0.0,
    whatItDoes: {
      es: "Factor de extensión a baja velocidad del amortiguador trasero (cuán rápido se recupera la cola al soltar gas/freno). Afecta el sobreviraje de levantada.",
      en: "Rear low-speed extension factor (how fast the rear recovers off throttle/brake). Affects lift-off oversteer.",
    },
    increaseEffect: {
      es: "Más firme (+): la cola se recupera más lento; estabilidad, pero tarda en devolver la rueda al suelo.",
      en: "Firmer (+): the rear recovers more slowly; stability, but slow to return the wheel to the ground.",
    },
    decreaseEffect: {
      es: "Más suave (-): recuperación rápida de la cola; mejor copiado en grava, algo más nervioso en asfalto.",
      en: "Softer (-): quick rear recovery; better compliance on gravel, a touch twitchier on tarmac.",
    },
  },

  // ── DIFERENCIALES (LSD frontal + trasero; conducción/frenada %, precarga N·m)
  {
    id: "diff_front_power",
    group: "differential",
    name: { es: "Bloqueo de conducción DDL (del.)", en: "Front diff power lock" },
    unit: "%",
    min: 0,
    max: 37,
    step: 1,
    default: 30,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial DELANTERO al acelerar (solo 4WD/FWD). Alto = mejor tracción en línea recta, con posible subviraje en poco agarre; bajo = mejor control en curva, menos estabilidad en recta. Capa educativa: las reglas no lo tocan.",
      en: "How much the FRONT diff locks on power (4WD/FWD only). High = better straight-line traction, with possible understeer on low grip; low = better cornering, less straight-line stability. Educational: the rules leave it at base.",
    },
    increaseEffect: {
      es: "Más alto: más tracción y estabilidad en recta, con riesgo de subviraje en baja adherencia.",
      en: "Higher: more traction and straight-line stability, with risk of understeer on low grip.",
    },
    decreaseEffect: {
      es: "Más bajo: mejor giro en curva, con menos estabilidad en recta.",
      en: "Lower: better cornering, with less straight-line stability.",
    },
  },
  {
    id: "diff_front_coast",
    group: "differential",
    name: { es: "Bloqueo de frenada DDL (del.)", en: "Front diff coast lock" },
    unit: "%",
    min: 0,
    max: 40,
    step: 1,
    default: 20,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial DELANTERO al levantar el gas y frenar (solo 4WD/FWD). Alto = más estabilidad de entrada; bajo = más rotación al soltar gas. Capa educativa: las reglas no lo tocan.",
      en: "How much the FRONT diff locks off-throttle and braking (4WD/FWD only). High = more entry stability; low = more rotation on lift. Educational: the rules leave it at base.",
    },
    increaseEffect: {
      es: "Más alto: entrada más estable, algo más de subviraje al levantar.",
      en: "Higher: more stable entry, a bit more lift-off understeer.",
    },
    decreaseEffect: {
      es: "Más bajo: más rotación de entrada al soltar gas, menos estable.",
      en: "Lower: more entry rotation on lift, less stable.",
    },
  },
  {
    id: "diff_front_preload",
    group: "differential",
    name: { es: "Precarga DDL (del.)", en: "Front diff preload" },
    unit: "N·m",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    whatItDoes: {
      es: "Bloqueo de base del diferencial delantero ante cambios suaves de gas (solo 4WD/FWD). Más precarga = el frente reacciona más como eje rígido (estable pero subvirador). Capa educativa: las reglas no lo tocan.",
      en: "Baseline lock of the front diff under gentle throttle changes (4WD/FWD only). More preload = the front behaves more like a locked axle (stable but understeery). Educational: the rules leave it at base.",
    },
    increaseEffect: {
      es: "Más precarga adelante: estabiliza el frente en transiciones, agrega subviraje.",
      en: "More front preload: stabilises the front in transitions, adds understeer.",
    },
    decreaseEffect: {
      es: "Menos precarga adelante: libera el frente para girar, con más reacción al gas.",
      en: "Less front preload: frees the front to turn, with more throttle reaction.",
    },
  },
  {
    id: "diff_rear_power",
    group: "differential",
    name: { es: "Bloqueo de conducción DDL (tras.)", en: "Rear diff power lock" },
    unit: "%",
    min: 0,
    max: 44,
    step: 1,
    default: 35,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial TRASERO al acelerar (solo 4WD/RWD). Alto = más tracción y estabilidad de salida (la cola no se suelta), con riesgo de subviraje al gas; bajo = más rotación de salida. Es el lever principal de las reglas para la cola.",
      en: "How much the REAR diff locks on power (4WD/RWD only). High = more exit traction and stability (the rear doesn't snap), with risk of throttle understeer; low = more exit rotation. The rules' main rear lever.",
    },
    increaseEffect: {
      es: "Más alto: más tracción y estabilidad de salida, ambas ruedas traccionan parejo; algo de subviraje al gas.",
      en: "Higher: more exit traction and stability, both wheels pull evenly; some throttle understeer.",
    },
    decreaseEffect: {
      es: "Más bajo: más rotación de salida y giro en curva, con menos estabilidad y tracción.",
      en: "Lower: more exit rotation and cornering, with less stability and traction.",
    },
  },
  {
    id: "diff_rear_coast",
    group: "differential",
    name: { es: "Bloqueo de frenada DDL (tras.)", en: "Rear diff coast lock" },
    unit: "%",
    min: 0,
    max: 44,
    step: 1,
    default: 28,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial TRASERO al levantar el gas y frenar (solo 4WD/RWD). Alto = cola más estable en la entrada (evita el sobreviraje de levantada); bajo = más rotación de entrada.",
      en: "How much the REAR diff locks off-throttle and braking (4WD/RWD only). High = a more stable rear on entry (prevents lift-off oversteer); low = more entry rotation.",
    },
    increaseEffect: {
      es: "Más alto: entrada más estable, evita que la cola se cruce al levantar/frenar; algo de subviraje.",
      en: "Higher: more stable entry, stops the rear stepping out on lift/brake; some understeer.",
    },
    decreaseEffect: {
      es: "Más bajo: más rotación al soltar gas entrando, menos estable.",
      en: "Lower: more rotation on lift into corners, less stable.",
    },
  },
  {
    id: "diff_rear_preload",
    group: "differential",
    name: { es: "Precarga DDL (tras.)", en: "Rear diff preload" },
    unit: "N·m",
    min: 0,
    max: 99,
    step: 1,
    default: 45,
    whatItDoes: {
      es: "Bloqueo de base del diferencial trasero ante cambios suaves de gas (solo 4WD/RWD). Más precarga = cola más estable y más tracción de base, con algo de subviraje de entrada; menos = más rotación y cola más viva.",
      en: "Baseline lock of the rear diff under gentle throttle changes (4WD/RWD only). More preload = a more stable rear and more baseline traction, with some entry understeer; less = more rotation and a livelier rear.",
    },
    increaseEffect: {
      es: "Más precarga atrás: estabiliza la cola y da tracción de base, agregando algo de subviraje de entrada.",
      en: "More rear preload: stabilises the rear and gives baseline traction, adding some entry understeer.",
    },
    decreaseEffect: {
      es: "Menos precarga atrás: libera la rotación, con una cola más viva en transiciones.",
      en: "Less rear preload: frees rotation, with a livelier rear in transitions.",
    },
  },

  // ── FRENADA (fuerza N·m, reparto %, freno de mano N·m) ────────────────────
  {
    id: "brake_force",
    group: "brakes",
    name: { es: "Fuerza de frenada", en: "Brake force" },
    unit: "N·m",
    min: 1230,
    max: 3690,
    step: 1,
    default: 2460,
    whatItDoes: {
      es: "Par de frenado máximo disponible, en N·m. Alta = frenada más fuerte y corta, con más riesgo de bloquear; baja = más tacto y menos bloqueos en baja adherencia (tierra/nieve).",
      en: "Maximum braking torque available, in N·m. High = stronger, shorter braking, with more locking risk; low = more modulation and fewer lock-ups on low grip (gravel/snow).",
    },
    increaseEffect: {
      es: "Más fuerza: frenada más responsiva y corta, mayor riesgo de bloquear las ruedas.",
      en: "More force: sharper, shorter braking, greater risk of locking the wheels.",
    },
    decreaseEffect: {
      es: "Menos fuerza: tacto más progresivo, menos bloqueos en superficie suelta.",
      en: "Less force: more progressive feel, fewer lock-ups on loose surfaces.",
    },
  },
  {
    id: "brake_bias",
    group: "brakes",
    name: { es: "Reparto de frenada", en: "Brake bias" },
    unit: "%",
    min: 30,
    max: 90,
    step: 1,
    default: 59,
    whatItDoes: {
      es: "Porcentaje del freno que va al eje delantero. Adelante (mayor %) = frenada estable y potente; atrás (menor %) = ayuda a rotar con el freno y evita bloqueo delantero en suelto. En rally suele convenir no irse muy atrás (la rotación se logra con el freno de mano).",
      en: "Percentage of braking sent to the front axle. Forward (higher %) = stable, powerful braking; rearward (lower %) = helps brake-rotation and avoids front locking on loose. In rally, don't go too far rearward (rotation comes from the handbrake).",
    },
    increaseEffect: {
      es: "Más adelante: frenada más estable, pero más riesgo de bloquear las delanteras y subvirar.",
      en: "More forward: more stable braking, but more risk of locking the fronts and understeering.",
    },
    decreaseEffect: {
      es: "Más atrás: ayuda a rotar con el freno y evita bloqueo en grava/nieve, con riesgo de soltar la cola.",
      en: "More rearward: helps brake-rotation and avoids locking on gravel/snow, with risk of the rear stepping out.",
    },
  },
  {
    id: "handbrake_force",
    group: "brakes",
    name: { es: "Fuerza del freno de mano", en: "Handbrake force" },
    unit: "N·m",
    min: 1107,
    max: 2747,
    step: 1,
    default: 1845,
    whatItDoes: {
      es: "Par del freno de mano, en N·m. A mayor fuerza, más rápido se bloquean las ruedas traseras, lo que permite girar de forma más pronunciada en horquillas y curvas cerradas.",
      en: "Handbrake torque, in N·m. More force locks the rear wheels sooner, allowing sharper rotation in hairpins and tight corners.",
    },
    increaseEffect: {
      es: "Más fuerza: la cola se traba más fácil con el freno de mano (giros cerrados, horquillas).",
      en: "More force: the rear locks more easily with the handbrake (tight turns, hairpins).",
    },
    decreaseEffect: {
      es: "Menos fuerza: freno de mano más progresivo y dosificable, menos rotación instantánea.",
      en: "Less force: a more progressive, modulable handbrake, less instant rotation.",
    },
  },
];

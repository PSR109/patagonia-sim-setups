import type { ParameterDef } from "@/lib/types";

// Parámetros de setup de EA Sports WRC (rally) con su capa educativa. Cada
// parámetro explica qué hace y qué pasa al subir/bajar el valor. Los rangos son
// representativos: el juego usa escalas relativas que varían por clase/coche, así
// que se cargan rangos típicos y ajustables sin tocar el motor de reglas.
export const ea_wrcParameters: ParameterDef[] = [
  // ── Alineación ──────────────────────────────────────────────────────────
  {
    id: "camber_front",
    group: "alignment",
    name: { es: "Caída (camber) delantera", en: "Front camber" },
    unit: "°",
    min: -3.0,
    max: 0.0,
    step: 0.1,
    default: -1.5,
    whatItDoes: {
      es: "Inclinación de la rueda delantera vista de frente. Más negativo = más agarre lateral en curva, menos en recta y frenada.",
      en: "Front wheel lean seen head-on. More negative = more cornering grip, less under braking and on straights.",
    },
    increaseEffect: {
      es: "Hacia 0 (menos negativo) mejora la tracción y la frenada en recta y reparte mejor el desgaste, pero pierde mordida al doblar.",
      en: "Toward 0 (less negative) improves straight-line traction and braking and evens out wear, but loses bite when turning.",
    },
    decreaseEffect: {
      es: "Más negativo da más agarre lateral delantero en curva, a costa de tracción y frenada en línea recta.",
      en: "More negative gives more front lateral grip in corners, costing straight-line traction and braking.",
    },
  },
  {
    id: "camber_rear",
    group: "alignment",
    name: { es: "Caída (camber) trasera", en: "Rear camber" },
    unit: "°",
    min: -2.5,
    max: 0.0,
    step: 0.1,
    default: -1.2,
    whatItDoes: {
      es: "Caída del tren trasero: controla cuánto agarre lateral tiene la cola en curva frente a la tracción en recta.",
      en: "Rear axle camber: trades rear lateral grip in corners against straight-line traction.",
    },
    increaseEffect: {
      es: "Hacia 0 favorece la tracción en recta, pero la cola agarra menos de costado.",
      en: "Toward 0 favours straight-line traction, but the rear grips less laterally.",
    },
    decreaseEffect: {
      es: "Más negativo mejora el agarre lateral trasero en apoyo, restando algo de tracción pura.",
      en: "More negative improves rear lateral grip when loaded, costing some pure traction.",
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
    default: -0.1,
    whatItDoes: {
      es: "Hacia dónde apuntan las ruedas delanteras vistas desde arriba. Negativo (toe-out) = entrada más reactiva.",
      en: "Where the front wheels point seen from above. Negative (toe-out) = sharper turn-in.",
    },
    increaseEffect: {
      es: "Hacia toe-in (positivo) da más estabilidad pero respuesta más perezosa y tendencia al subviraje.",
      en: "Toward toe-in (positive) adds stability but lazier response and a tendency to understeer.",
    },
    decreaseEffect: {
      es: "Más toe-out agiliza la entrada y la respuesta de giro, con dirección más nerviosa.",
      en: "More toe-out sharpens turn-in and steering response, with a twitchier feel.",
    },
  },
  {
    id: "toe_rear",
    group: "alignment",
    name: { es: "Convergencia (toe) trasera", en: "Rear toe" },
    unit: "°",
    min: -0.5,
    max: 0.5,
    step: 0.05,
    default: 0.1,
    whatItDoes: {
      es: "Convergencia del tren trasero. Toe-in = estabilidad y tracción a la salida; toe-out = más rotación.",
      en: "Rear axle toe. Toe-in = stability and exit traction; toe-out = more rotation.",
    },
    increaseEffect: {
      es: "Más toe-in estabiliza la cola y mejora la tracción al acelerar, restando algo de rotación.",
      en: "More toe-in stabilises the rear and improves traction on power, costing some rotation.",
    },
    decreaseEffect: {
      es: "Hacia toe-out la cola rota más en mitad de curva; en exceso provoca sobreviraje.",
      en: "Toward toe-out the rear rotates more mid-corner; too much causes oversteer.",
    },
  },
  {
    id: "caster_front",
    group: "alignment",
    name: { es: "Avance (caster) delantero", en: "Front caster" },
    unit: "°",
    min: 1.0,
    max: 9.0,
    step: 0.5,
    default: 5.0,
    whatItDoes: {
      es: "Inclinación del eje de dirección. Más caster da más estabilidad direccional y mejor auto-centrado del volante.",
      en: "Steering axis inclination. More caster gives more directional stability and stronger self-centering.",
    },
    increaseEffect: {
      es: "Más estabilidad en recta y mejor auto-centrado, pero dirección más pesada a baja velocidad.",
      en: "More straight-line stability and self-centering, but heavier steering at low speed.",
    },
    decreaseEffect: {
      es: "Dirección más ligera y rápida, a costa de estabilidad direccional.",
      en: "Lighter, quicker steering, at the cost of directional stability.",
    },
  },
  // ── Suspensión (muelles y altura) ───────────────────────────────────────
  {
    id: "spring_front",
    group: "suspension",
    name: { es: "Dureza muelle delantero", en: "Front spring rate" },
    unit: "N/mm",
    min: 40,
    max: 130,
    step: 5,
    default: 90,
    whatItDoes: {
      es: "Rigidez del muelle delantero, en N/mm reales (NO una escala abstracta). El rango exacto depende de la clase: un Rally2 ronda ~48-52 N/mm y un WRC ~95-123 N/mm. Más blando absorbe baches y da agarre; más duro mejora la respuesta pero copia peor el terreno.",
      en: "Front spring stiffness, in real N/mm (NOT an abstract scale). The exact range depends on class: a Rally2 sits around ~48-52 N/mm and a WRC ~95-123 N/mm. Softer absorbs bumps and adds grip; stiffer sharpens response but follows the terrain worse.",
    },
    increaseEffect: {
      es: "Más duro adelante mejora el handling y la respuesta, pero empeora sobre baches y tiende al subviraje.",
      en: "Stiffer front improves handling and response, but worsens over bumps and tends toward understeer.",
    },
    decreaseEffect: {
      es: "Más blando adelante absorbe mejor el terreno y suma agarre; muelles delanteros más blandos que los traseros reducen el subviraje.",
      en: "Softer front absorbs the terrain better and adds grip; front springs softer than rear reduce understeer.",
    },
  },
  {
    id: "spring_rear",
    group: "suspension",
    name: { es: "Dureza muelle trasero", en: "Rear spring rate" },
    unit: "N/mm",
    min: 40,
    max: 130,
    step: 5,
    default: 90,
    whatItDoes: {
      es: "Rigidez del muelle trasero, en N/mm reales (NO una escala abstracta). El rango exacto depende de la clase (Rally2 ~48 N/mm, WRC ~95-123 N/mm). Define cuánta rotación tiene la cola y cómo copia el terreno el tren trasero.",
      en: "Rear spring stiffness, in real N/mm (NOT an abstract scale). The exact range depends on class (Rally2 ~48 N/mm, WRC ~95-123 N/mm). Sets how much the rear rotates and how the rear axle follows the terrain.",
    },
    increaseEffect: {
      es: "Más duro atrás da más rotación y respuesta, con riesgo de sobreviraje y peor comportamiento sobre baches.",
      en: "Stiffer rear gives more rotation and response, with risk of oversteer and worse behaviour over bumps.",
    },
    decreaseEffect: {
      es: "Más blando atrás minimiza el sobreviraje (desplaza el balance hacia subviraje) y mejora la tracción sobre terreno irregular.",
      en: "Softer rear minimises oversteer (shifts balance toward understeer) and improves traction over rough ground.",
    },
  },
  {
    id: "ride_height_front",
    group: "suspension",
    name: { es: "Altura delantera", en: "Front ride height" },
    unit: "mm",
    min: -20,
    max: 20,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Ajuste de altura delantera como OFFSET relativo al baseline de cada auto (no una altura absoluta al suelo): rango aprox. -20 a +20 mm, 0 = baseline. Bajar = más estable y mejor en tarmac; subir = más recorrido para terreno rugoso.",
      en: "Front ride-height adjustment as an OFFSET relative to each car's baseline (not an absolute floor height): range about -20 to +20 mm, 0 = baseline. Lower = more stable and better on tarmac; higher = more travel for rough terrain.",
    },
    increaseEffect: {
      es: "Subir da más recorrido y protege de tocar fondo en etapas rugosas (Kenia, tierra), pero aumenta el balanceo.",
      en: "Raising gives more travel and avoids bottoming on rough stages (Kenya, gravel), but increases body roll.",
    },
    decreaseEffect: {
      es: "Bajar reduce el balanceo y mejora la estabilidad en tarmac, pero arriesga tocar fondo en superficies sueltas.",
      en: "Lowering reduces roll and improves tarmac stability, but risks bottoming out on loose surfaces.",
    },
  },
  {
    id: "ride_height_rear",
    group: "suspension",
    name: { es: "Altura trasera", en: "Rear ride height" },
    unit: "mm",
    min: -20,
    max: 20,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Altura trasera como OFFSET relativo al baseline del auto (rango aprox. -20 a +20 mm, 0 = baseline). El 'rake' surge de la diferencia entre el offset trasero y el delantero: atrás más alto ayuda a rotar y entrar.",
      en: "Rear ride height as an OFFSET relative to the car's baseline (range about -20 to +20 mm, 0 = baseline). The 'rake' comes from the difference between rear and front offsets: a higher rear helps rotation and turn-in.",
    },
    increaseEffect: {
      es: "Subir atrás aumenta el rake y la rotación, y da más recorrido sobre baches grandes.",
      en: "Raising the rear adds rake and rotation, and gives more travel over big bumps.",
    },
    decreaseEffect: {
      es: "Bajar atrás reduce el rake: cola más estable en alta velocidad, con algo menos de rotación.",
      en: "Lowering the rear reduces rake: a more stable rear at high speed, with a bit less rotation.",
    },
  },
  // ── Amortiguadores ──────────────────────────────────────────────────────
  {
    id: "bump_slow",
    group: "dampers",
    name: { es: "Compresión lenta (slow bump)", en: "Slow bump" },
    unit: "",
    min: 1,
    max: 20,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Controla la resistencia del amortiguador a las transferencias de peso y baches lentos (frenada, apoyo, lomas).",
      en: "Controls damper resistance to weight transfers and slow bumps (braking, loading, crests).",
    },
    increaseEffect: {
      es: "Más firme da más estabilidad y soporte en las transferencias, pero absorbe peor el terreno lento.",
      en: "Firmer gives more stability and support in transitions, but absorbs slow terrain worse.",
    },
    decreaseEffect: {
      es: "Más blando absorbe mejor las transferencias y baches lentos, con la plataforma menos estable.",
      en: "Softer absorbs transitions and slow bumps better, with a less stable platform.",
    },
  },
  {
    id: "bump_fast",
    group: "dampers",
    name: { es: "Compresión rápida (fast bump)", en: "Fast bump" },
    unit: "",
    min: 1,
    max: 20,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Resistencia a baches bruscos y rápidos. Clave en tierra y caminos rotos para que la rueda no llegue al tope.",
      en: "Resistance to sharp, fast bumps. Key on gravel and broken roads so the wheel doesn't hit the bump stop.",
    },
    increaseEffect: {
      es: "Más firme evita que el coche llegue al tope (bump stop) en baches grandes, pero absorbe menos.",
      en: "Firmer keeps the car off the bump stops on big hits, but absorbs less.",
    },
    decreaseEffect: {
      es: "Más blando copia mejor los baches rápidos, con riesgo de tocar el tope y perder estabilidad.",
      en: "Softer follows fast bumps better, with risk of hitting the bump stop and losing stability.",
    },
  },
  {
    id: "rebound_slow",
    group: "dampers",
    name: { es: "Rebote lento (slow rebound)", en: "Slow rebound" },
    unit: "",
    min: 1,
    max: 20,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Velocidad a la que el amortiguador se extiende tras una compresión lenta (carga/descarga de gas y frenos).",
      en: "Speed at which the damper extends after a slow compression (on/off throttle and brakes).",
    },
    increaseEffect: {
      es: "Más firme da más estabilidad; demasiado firme tarda en devolver la rueda al suelo y pierde agarre.",
      en: "Firmer adds stability; too firm and the wheel is slow to return to the ground, losing grip.",
    },
    decreaseEffect: {
      es: "Más blando devuelve la rueda al suelo más rápido (más agarre), con la plataforma menos controlada.",
      en: "Softer returns the wheel to the ground faster (more grip), with a less controlled platform.",
    },
  },
  {
    id: "rebound_fast",
    group: "dampers",
    name: { es: "Rebote rápido (fast rebound)", en: "Fast rebound" },
    unit: "",
    min: 1,
    max: 20,
    step: 1,
    default: 8,
    whatItDoes: {
      es: "Velocidad de extensión tras baches rápidos. Define cuán rápido recupera contacto la rueda tras un golpe brusco.",
      en: "Extension speed after fast bumps. Sets how quickly the wheel regains contact after a sharp hit.",
    },
    increaseEffect: {
      es: "Más firme da más estabilidad tras los baches, pero la rueda tarda en recontactar el suelo.",
      en: "Firmer gives more stability after bumps, but the wheel is slower to recontact the ground.",
    },
    decreaseEffect: {
      es: "Más blando recupera contacto más rápido sobre terreno roto, con menos estabilidad.",
      en: "Softer regains contact faster on broken ground, with less stability.",
    },
  },
  // ── Barras estabilizadoras ──────────────────────────────────────────────
  {
    id: "arb_front",
    group: "suspension",
    name: { es: "Barra estabilizadora delantera", en: "Front anti-roll bar" },
    unit: "N/mm",
    min: 5,
    max: 40,
    step: 1,
    default: 20,
    whatItDoes: {
      es: "Cuánto se resiste el eje delantero a balancearse, en N/mm reales (NO una escala abstracta; un Rally2 ronda ~21 N/mm adelante). El rango exacto varía por auto. Más dura = balance hacia subviraje y más estabilidad.",
      en: "How much the front axle resists roll, in real N/mm (NOT an abstract scale; a Rally2 sits around ~21 N/mm at the front). The exact range varies by car. Stiffer = balance toward understeer and more stability.",
    },
    increaseEffect: {
      es: "Más dura adelante desplaza el balance al subviraje y da estabilidad, pero copia peor los baches.",
      en: "Stiffer front shifts balance toward understeer and adds stability, but follows bumps worse.",
    },
    decreaseEffect: {
      es: "Más blanda adelante da más agarre y 'compliance' del frente en frenada; corrige subviraje.",
      en: "Softer front gives more front grip and compliance under braking; fixes understeer.",
    },
  },
  {
    id: "arb_rear",
    group: "suspension",
    name: { es: "Barra estabilizadora trasera", en: "Rear anti-roll bar" },
    unit: "N/mm",
    min: 5,
    max: 40,
    step: 1,
    default: 18,
    whatItDoes: {
      es: "Resistencia al balanceo del eje trasero, en N/mm reales (NO una escala abstracta; el rango exacto varía por auto). Más dura = más rotación; más blanda = más tracción atrás.",
      en: "Rear axle roll resistance, in real N/mm (NOT an abstract scale; the exact range varies by car). Stiffer = more rotation; softer = more rear traction.",
    },
    increaseEffect: {
      es: "Más dura atrás da más rotación y sobreviraje; ayuda contra el subviraje pero suelta la cola.",
      en: "Stiffer rear gives more rotation and oversteer; helps understeer but loosens the rear.",
    },
    decreaseEffect: {
      es: "Más blanda atrás desplaza el balance al subviraje y suma tracción trasera sobre baches.",
      en: "Softer rear shifts balance toward understeer and adds rear traction over bumps.",
    },
  },
  // ── Diferencial (LSD) ───────────────────────────────────────────────────
  {
    id: "diff_preload",
    group: "differential",
    name: { es: "Precarga del diferencial", en: "Differential preload" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 40,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial de base. Afecta la tracción en mitad de curva y cómo reacciona el coche al gas.",
      en: "How much the diff locks at rest. Affects mid-corner traction and how the car reacts to throttle.",
    },
    increaseEffect: {
      es: "Más precarga mejora la tracción en mitad de curva, pero demasiado alta induce subviraje.",
      en: "More preload improves mid-corner traction, but too high induces understeer.",
    },
    decreaseEffect: {
      es: "Menos precarga libera la rotación, con una cola más viva al jugar con el acelerador.",
      en: "Less preload frees rotation, with a livelier rear when working the throttle.",
    },
  },
  {
    id: "diff_power",
    group: "differential",
    name: { es: "Bloqueo en aceleración (power lock)", en: "Power (driving) lock" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 45,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial al acelerar. Reparte la tracción entre las ruedas a la salida de curva.",
      en: "How much the diff locks on throttle. Distributes traction between wheels on corner exit.",
    },
    increaseEffect: {
      es: "Alto da más tracción y estabilidad en recta, con riesgo de subviraje en baja adherencia.",
      en: "High gives more traction and straight-line stability, with risk of understeer on low grip.",
    },
    decreaseEffect: {
      es: "Bajo mejora el comportamiento en curva, con menos estabilidad en recta y más rotación al gas.",
      en: "Low improves cornering, with less straight-line stability and more rotation on throttle.",
    },
  },
  {
    id: "diff_brake",
    group: "differential",
    name: { es: "Bloqueo en deceleración (coast)", en: "Coast lock" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 35,
    whatItDoes: {
      es: "Tercer canal del diferencial en EA WRC (Power / Coast / Preload): cuánto bloquea al levantar el gas y frenar (off-throttle / coast). Controla la estabilidad y la rotación en la entrada de curva.",
      en: "The third differential channel in EA WRC (Power / Coast / Preload): how much it locks off-throttle when lifting and braking (coast). Controls stability and rotation on corner entry.",
    },
    increaseEffect: {
      es: "Alto da más estabilidad y tracción bajo frenada, pero induce subviraje en la entrada.",
      en: "High gives more stability and traction under braking, but induces entry understeer.",
    },
    decreaseEffect: {
      es: "Bajo reduce el subviraje en la entrada y suma rotación, con menos tracción al frenar.",
      en: "Low reduces entry understeer and adds rotation, with less traction under braking.",
    },
  },
  // ── Frenos ──────────────────────────────────────────────────────────────
  {
    id: "brake_force",
    group: "brakes",
    name: { es: "Fuerza de frenado", en: "Brake force" },
    unit: "%",
    min: 50,
    max: 100,
    step: 1,
    default: 85,
    whatItDoes: {
      es: "Potencia máxima de freno disponible. Más alta = frenada más fuerte y responsiva; más baja = más tacto.",
      en: "Maximum available brake power. Higher = stronger, sharper braking; lower = more modulation.",
    },
    increaseEffect: {
      es: "Más fuerza da una frenada más responsiva y corta, con mayor riesgo de bloquear las ruedas.",
      en: "More force gives sharper, shorter braking, with greater risk of locking the wheels.",
    },
    decreaseEffect: {
      es: "Menos fuerza da un tacto más vago pero reduce los bloqueos en baja adherencia (tierra/nieve).",
      en: "Less force feels vaguer but reduces lock-ups on low grip (gravel/snow).",
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
    default: 58.0,
    whatItDoes: {
      es: "Porcentaje de freno que va al eje delantero. En rally se recomienda no irse muy atrás (la rotación se logra con el freno de mano).",
      en: "Percentage of braking sent to the front axle. In rally, keep it forward (rotation comes from the handbrake).",
    },
    increaseEffect: {
      es: "Más adelante reduce el sobreviraje al frenar, pero induce subviraje en frenadas fuertes.",
      en: "More forward reduces braking oversteer, but induces understeer in heavy braking.",
    },
    decreaseEffect: {
      es: "Más atrás reduce el subviraje y ayuda a rotar, pero arriesga sobreviraje al frenar.",
      en: "More rearward reduces understeer and helps rotation, but risks braking oversteer.",
    },
  },
  {
    id: "handbrake_force",
    group: "brakes",
    name: { es: "Fuerza del freno de mano", en: "Handbrake force" },
    unit: "%",
    min: 50,
    max: 100,
    step: 5,
    default: 80,
    whatItDoes: {
      es: "Cuánto bloquea el freno de mano las ruedas traseras. Herramienta clave para rotar en horquillas y curvas cerradas.",
      en: "How much the handbrake locks the rear wheels. Key tool to rotate in hairpins and tight corners.",
    },
    increaseEffect: {
      es: "Más alta bloquea antes la cola, permitiendo más rotación y derrapes más fáciles en horquillas.",
      en: "Higher locks the rear sooner, allowing more rotation and easier slides in hairpins.",
    },
    decreaseEffect: {
      es: "Más baja hace el freno de mano más progresivo, con menos rotación instantánea.",
      en: "Lower makes the handbrake more progressive, with less instant rotation.",
    },
  },
  // ── Cambios ─────────────────────────────────────────────────────────────
  {
    id: "final_drive",
    group: "gearing",
    name: { es: "Relación final (final drive)", en: "Final drive" },
    unit: "",
    // PENDIENTE: confirmar in-game (Vehicle Setup > Tuning > Gears) el rango/unidad real
    // del final drive; el 0-20 de abajo es una escala representativa sin corroborar por fuente.
    min: 0,
    max: 20,
    step: 1,
    default: 10,
    whatItDoes: {
      es: "Ajuste global de marchas. El juego también permite tocar cada marcha por separado, pero conviene mover el final drive: corre todas las relaciones a la vez sin dejar 'huecos' de par. Corta = más aceleración; larga = más velocidad punta.",
      en: "Global gearing adjustment. The game also lets you tune each individual gear, but adjusting the final drive is preferred: it shifts all ratios at once without creating torque holes. Short = more acceleration; long = more top speed.",
    },
    increaseEffect: {
      es: "Más larga sube la velocidad punta, ideal en rallies rápidos y abiertos, a costa de aceleración.",
      en: "Longer raises top speed, ideal on fast, open rallies, at the cost of acceleration.",
    },
    decreaseEffect: {
      es: "Más corta mejora la aceleración y la respuesta, ideal en rallies de montaña y etapas lentas.",
      en: "Shorter improves acceleration and response, ideal on mountain rallies and slow stages.",
    },
  },
  // ── Neumáticos ──────────────────────────────────────────────────────────
  {
    id: "tyre_pressure_front",
    group: "tyres",
    name: { es: "Presión neumáticos delanteros", en: "Front tyre pressure" },
    unit: "psi",
    min: 18,
    max: 35,
    step: 0.5,
    default: 26.0,
    whatItDoes: {
      es: "Presión del eje delantero. Baja = más huella y agarre mecánico (útil en baja adherencia); alta = mejor respuesta en tarmac.",
      en: "Front axle pressure. Low = more contact patch and mechanical grip (good on low grip); high = better tarmac response.",
    },
    increaseEffect: {
      es: "Más presión reduce la resistencia y mejora la respuesta en tarmac, pero baja el agarre en superficie suelta.",
      en: "Higher pressure cuts rolling resistance and improves tarmac response, but lowers grip on loose surfaces.",
    },
    decreaseEffect: {
      es: "Menos presión aumenta la huella y el agarre mecánico en tierra/nieve, con más riesgo de pinchazo y recalentamiento.",
      en: "Lower pressure increases contact patch and mechanical grip on gravel/snow, with more puncture and overheating risk.",
    },
  },
  {
    id: "tyre_pressure_rear",
    group: "tyres",
    name: { es: "Presión neumáticos traseros", en: "Rear tyre pressure" },
    unit: "psi",
    min: 18,
    max: 35,
    step: 0.5,
    default: 26.0,
    whatItDoes: {
      es: "Igual que adelante pero en el tren trasero: afecta la tracción y la estabilidad de la cola según la superficie.",
      en: "Same as front but on the rear axle: affects traction and rear stability depending on the surface.",
    },
    increaseEffect: {
      es: "Más presión da mejor respuesta en tarmac, con menos agarre mecánico atrás en superficie suelta.",
      en: "Higher pressure gives better tarmac response, with less rear mechanical grip on loose surfaces.",
    },
    decreaseEffect: {
      es: "Menos presión suma huella y tracción trasera en tierra/nieve, con más riesgo de pinchazo y recalentamiento.",
      en: "Lower pressure adds contact patch and rear traction on gravel/snow, with more puncture and overheating risk.",
    },
  },
];

import type { Car, Category, ParameterDef, SetupValues } from "@/lib/types";

// ── Extras de clase HYPERCAR ────────────────────────────────────────────────
// Ajustes que SOLO expone el editor de Hypercar (verificado contra el Alpine
// A424 #35): 3.er resorte (heave) por eje, muelle de goma, el sistema híbrido
// (regen + mapa eléctrico), el bloqueo de diferencial power/inercia y el
// diferencial DELANTERO (despliegue AWD de los LMDh/LMH). En LMGT3 estos campos
// aparecen como "N/D" o "Non-adjustable", así que no van en el set universal.
// Las reglas del juego pueden tocar diff_power (hace no-op en clases sin él);
// el resto se muestra y explica pero las reglas no lo modifican.
const lmuHypercarExtras: ParameterDef[] = [
  {
    id: "heave_spring_front",
    group: "suspension",
    name: { es: "3.er resorte (heave) delantero", en: "Front heave (3rd) spring" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 5,
    whatItDoes: {
      es: "Resorte central delantero que actúa solo cuando ambas ruedas comprimen a la vez (frenada, alta velocidad): controla la altura/plataforma aero sin endurecer el balance en curva. Solo Hypercar. (rango estimado)",
      en: "Front central spring that acts only when both wheels compress together (braking, high speed): controls ride height/aero platform without stiffening the cornering balance. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más duro = plataforma aero delantera más estable en alta velocidad, con menos absorción vertical.",
      en: "Stiffer = more stable front aero platform at high speed, with less vertical absorption.",
    },
    decreaseEffect: {
      es: "Más blando = el frente baja más con la carga aero (más downforce), arriesgando tocar fondo.",
      en: "Softer = the front drops more under aero load (more downforce), risking bottoming.",
    },
  },
  {
    id: "heave_spring_rear",
    group: "suspension",
    name: { es: "3.er resorte (heave) trasero", en: "Rear heave (3rd) spring" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 6,
    whatItDoes: {
      es: "Resorte central trasero (heave): controla la altura/plataforma aero trasera en compresión simétrica sin afectar el balance en curva. Solo Hypercar. (rango estimado)",
      en: "Rear central (heave) spring: controls the rear ride height/aero platform under symmetric compression without affecting cornering balance. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más duro = plataforma trasera más estable en alta velocidad, con menos hundimiento aero.",
      en: "Stiffer = more stable rear platform at high speed, with less aero squat.",
    },
    decreaseEffect: {
      es: "Más blando = la cola baja más con la carga (más downforce trasero), arriesgando tocar fondo.",
      en: "Softer = the rear drops more under load (more rear downforce), risking bottoming.",
    },
  },
  {
    id: "rubber_spring_front",
    group: "suspension",
    name: { es: "Muelle de goma delantero", en: "Front rubber spring" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Elemento de goma progresivo que endurece el final del recorrido delantero. 0 = Desacoplada (como en la captura). Solo Hypercar. (rango estimado)",
      en: "Progressive rubber element that stiffens the end of front travel. 0 = Decoupled (as in the capture). Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Acoplarlo/endurecerlo frena el último tramo de compresión: protege el piso, con final de recorrido más brusco.",
      en: "Coupling/stiffening it checks the last part of compression: protects the floor, with a harsher end of travel.",
    },
    decreaseEffect: {
      es: "Desacoplar (0) deja el recorrido lineal hasta el tope mecánico.",
      en: "Decoupling (0) leaves travel linear up to the mechanical stop.",
    },
  },
  {
    id: "rubber_spring_rear",
    group: "suspension",
    name: { es: "Muelle de goma trasero", en: "Rear rubber spring" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 0,
    whatItDoes: {
      es: "Goma progresiva que endurece el final del recorrido trasero. 0 = Desacoplada. Solo Hypercar. (rango estimado)",
      en: "Progressive rubber that stiffens the end of rear travel. 0 = Decoupled. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Acoplarlo frena el final de compresión trasera: protege el piso, con final más brusco.",
      en: "Coupling it checks the end of rear compression: protects the floor, with a harsher end.",
    },
    decreaseEffect: {
      es: "Desacoplar (0) deja el recorrido trasero lineal hasta el tope.",
      en: "Decoupling (0) leaves rear travel linear up to the stop.",
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
    default: 30,
    whatItDoes: {
      es: "Cuánto bloquea el diferencial con el acelerador apretado. Controla tracción y rotación a la salida. En LMGT3 viene 'Non-adjustable'. Solo Hypercar. (rango estimado)",
      en: "How much the diff locks under throttle. Controls traction and exit rotation. In LMGT3 it's 'Non-adjustable'. Hypercar only. (estimated range)",
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
    id: "diff_inertia",
    group: "differential",
    name: { es: "Inercia del diferencial", en: "Differential inertia" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 60,
    whatItDoes: {
      es: "Controla la rampa/sensibilidad del diferencial ante cambios bruscos de par (transiciones gas/freno). En LMGT3 viene 'Non-adjustable'. Solo Hypercar. (rango estimado)",
      en: "Controls the diff ramp/sensitivity to sudden torque changes (throttle/brake transitions). In LMGT3 it's 'Non-adjustable'. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más inercia = el diff reacciona más suave/progresivo a los cambios de par: más predecible.",
      en: "More inertia = the diff reacts more smoothly/progressively to torque changes: more predictable.",
    },
    decreaseEffect: {
      es: "Menos inercia = respuesta más inmediata del diff, más reactiva pero menos suave.",
      en: "Less inertia = a more immediate diff response, sharper but less smooth.",
    },
  },
  {
    id: "front_diff_power",
    group: "differential",
    name: { es: "Bloqueo delantero en aceleración", en: "Front power lock" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 0,
    whatItDoes: {
      es: "Bloqueo del diferencial del eje DELANTERO (solo cuando el híbrido despliega a las ruedas delanteras, por encima de cierta velocidad). En el Alpine viene en 0. Solo Hypercar. (rango estimado)",
      en: "Lock of the FRONT axle differential (only when the hybrid deploys to the front wheels, above a certain speed). On the Alpine it's 0. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más bloqueo delantero = tracción AWD más estable al desplegar, con algo más de subviraje.",
      en: "More front lock = more stable AWD traction on deployment, with a bit more understeer.",
    },
    decreaseEffect: {
      es: "Menos bloqueo delantero = frente más libre al desplegar, con menos arrastre de tracción.",
      en: "Less front lock = a freer front on deployment, with less traction drag.",
    },
  },
  {
    id: "front_diff_inertia",
    group: "differential",
    name: { es: "Inercia del diferencial delantero", en: "Front differential inertia" },
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    default: 0,
    whatItDoes: {
      es: "Rampa/sensibilidad del diferencial delantero durante el despliegue híbrido AWD. En el Alpine viene en 0. Solo Hypercar. (rango estimado)",
      en: "Ramp/sensitivity of the front differential during AWD hybrid deployment. On the Alpine it's 0. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más inercia delantera = despliegue AWD más suave y predecible adelante.",
      en: "More front inertia = smoother, more predictable AWD deployment at the front.",
    },
    decreaseEffect: {
      es: "Menos inercia delantera = respuesta más inmediata del eje delantero al desplegar.",
      en: "Less front inertia = a more immediate front-axle response on deployment.",
    },
  },
  {
    id: "front_diff_preload",
    group: "differential",
    name: { es: "Precarga del diferencial delantero", en: "Front differential preload" },
    unit: "",
    min: 0,
    max: 20,
    step: 1,
    default: 1,
    whatItDoes: {
      es: "Precarga base del diferencial delantero (índice). Define cuánto bloquea de entrada el eje delantero al desplegar el híbrido. Solo Hypercar. (rango estimado)",
      en: "Base preload of the front differential (index). Sets how much the front axle locks from the start when the hybrid deploys. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más precarga delantera = eje delantero más bloqueado de entrada: más estable al desplegar.",
      en: "More front preload = a more locked front axle from the start: more stable on deployment.",
    },
    decreaseEffect: {
      es: "Menos precarga delantera = frente más libre y reactivo al desplegar el híbrido.",
      en: "Less front preload = a freer, more reactive front when the hybrid deploys.",
    },
  },
  {
    id: "regen_level",
    group: "electronics",
    name: { es: "Nivel de regeneración (híbrido)", en: "Regen level (hybrid)" },
    unit: "kW",
    min: 0,
    max: 200,
    step: 10,
    default: 170,
    whatItDoes: {
      es: "Cuánta energía recupera el sistema híbrido al frenar (kW). Forma parte del balance entre estabilidad de entrada (freno motor eléctrico) y recarga de la batería. En LMGT3 está en 0. Solo Hypercar. (rango estimado)",
      en: "How much energy the hybrid recovers under braking (kW). Part of the trade-off between entry stability (electric engine braking) and recharging the battery. In LMGT3 it's 0. Hypercar only. (estimated range)",
    },
    increaseEffect: {
      es: "Más regen = más freno motor eléctrico y recuperación, pero puede afectar la estabilidad de entrada.",
      en: "More regen = more electric engine braking and recovery, but can affect entry stability.",
    },
    decreaseEffect: {
      es: "Menos regen = entrada más limpia y predecible, pero se recupera menos energía.",
      en: "Less regen = cleaner, more predictable entry, but less energy recovered.",
    },
  },
  {
    id: "electric_map",
    group: "electronics",
    name: { es: "Mapa motor eléctrico (despliegue)", en: "Electric motor map (deploy)" },
    unit: "kW",
    min: 0,
    max: 200,
    step: 10,
    default: 50,
    whatItDoes: {
      es: "Potencia de despliegue del motor eléctrico (kW): cómo y cuánto empuja el híbrido al acelerar, sujeto a las reglas de energía del WEC. En LMGT3 está en 0. Solo Hypercar. (rango estimado)",
      en: "Electric motor deployment power (kW): how and how much the hybrid pushes on throttle, subject to WEC energy rules. In LMGT3 it's 0. Hypercar only. (estimated range)",
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
];

// ── Extras de clase LMGT3 ───────────────────────────────────────────────────
// El ABS solo existe en LMGT3 (verificado contra el McLaren 720S #59: "9
// (Understeer)"). Los Hypercar corren SIN ABS (su editor muestra "N/A"), así que
// no va en el set universal. La regla de mojado/inestabilidad lo toca; en
// Hypercar hace no-op.
const lmuGt3Abs: ParameterDef = {
  id: "abs",
  group: "electronics",
  name: { es: "ABS", en: "ABS" },
  unit: "",
  min: 0,
  max: 11,
  step: 1,
  default: 9,
  whatItDoes: {
    es: "Antibloqueo de frenos (solo LMGT3). Cuánto evita el bloqueo de ruedas al frenar; el editor también muestra el carácter del mapa (p. ej. 'Understeer'). Más alto = más intervención. (rango estimado)",
    en: "Anti-lock braking (LMGT3 only). How much it prevents wheel lock under braking; the editor also shows the map character (e.g. 'Understeer'). Higher = more intervention. (estimated range)",
  },
  increaseEffect: {
    es: "Más ABS = frenadas más estables y sin planos, sobre todo en mojado; frenada un poco más larga.",
    en: "More ABS = more stable braking without flat-spots, especially in the wet; slightly longer braking.",
  },
  decreaseEffect: {
    es: "Menos ABS = frenada más corta y con más tacto, pero más riesgo de bloquear.",
    en: "Less ABS = shorter, more tactile braking, but more risk of locking up.",
  },
};

// Overrides de rango/valor de la clase LMGT3 respecto del set GLOBAL (que toma
// los defaults del Hypercar Alpine A424). Verificado 1:1 contra el McLaren 720S
// LMGT3 Evo #59 (Racing Spirit of Léman, Bahrain): defaults exactos de la
// captura y, donde el slider cambia de escala, también min/max/step:
//   • Ala trasera: en LMGT3 el editor usa GRADOS (0-15°, def 10.0°), no pasos P.
//   • Amortiguadores: en LMGT3 el rango es mucho mayor (clicks "B##/R##" hasta ~50).
const lmuGt3Overrides: Category["paramOverrides"] = {
  tyre_pressure_front: { default: 136 },
  tyre_pressure_rear: { default: 136 },
  camber_front: { default: -2.0 },
  camber_rear: { default: -1.4 },
  toe_front: { default: -0.06 },
  toe_rear: { default: 0.25 },
  rear_wing: { min: 0, max: 15, step: 0.5, default: 10.0 },
  spring_rate_front: { default: 4 },
  spring_rate_rear: { default: 2 },
  ride_height_front: { default: 5.2 },
  ride_height_rear: { default: 6.6 },
  steering_lock: { default: 20.8 },
  damper_slow_bump_front: { max: 50, default: 19 },
  damper_slow_rebound_front: { max: 50, default: 18 },
  damper_fast_bump_front: { max: 50, default: 41 },
  damper_fast_rebound_front: { max: 50, default: 40 },
  damper_slow_bump_rear: { max: 50, default: 23 },
  damper_slow_rebound_rear: { max: 50, default: 17 },
  damper_fast_bump_rear: { max: 50, default: 41 },
  damper_fast_rebound_rear: { max: 50, default: 40 },
  diff_preload: { default: 90 },
  brake_bias: { default: 50.8 },
  brake_migration: { default: 0.0 },
  brake_pedal_force: { default: 100 },
  brake_disc_front: { default: 3.56 },
  brake_duct_rear: { default: 20 },
  gear_ratio: { default: 1 },
  rev_limiter: { default: 7200 },
  engine_mixture: { default: 4 },
  fuel: { default: 86 },
};

// Clases jugables de Le Mans Ultimate (temporada 2026). Hypercar y LMGT3 son las
// verificadas con captura in-game; LMP2/LMP3/GTE heredan el set global (defaults
// del Hypercar) hasta tener su propia captura — son prototipos/GT sin híbrido y
// sin los extras Hypercar, y los prototipos corren sin TC (ver baseSetups).
export const lmuCategories: Category[] = [
  { id: "hypercar", gameId: "lmu", name: "Hypercar", extraParams: lmuHypercarExtras },
  { id: "lmgt3", gameId: "lmu", name: "LMGT3", paramOverrides: lmuGt3Overrides, extraParams: [lmuGt3Abs] },
  { id: "lmp2", gameId: "lmu", name: "LMP2" },
  { id: "lmp3", gameId: "lmu", name: "LMP3" },
  { id: "gte", gameId: "lmu", name: "GTE" },
];

// Autos de la grilla. La lista es PARCIAL (ejemplos verificados, no la grilla
// completa). Autos de REFERENCIA de la reconstrucción 2026-06-25:
//   • Hypercar → Alpine A424 #35  (hereda los defaults globales = su captura).
//   • LMGT3    → McLaren 720S LMGT3 Evo #59 (hereda los overrides de la clase).
export const lmuCars: Car[] = [
  // ── Hypercar (LMH + LMDh) ──────────────────────────────────────────────────
  { id: "lmu_ferrari_499p", gameId: "lmu", categoryId: "hypercar", name: "Ferrari 499P", brand: "Ferrari", year: 2023 },
  { id: "lmu_toyota_gr010", gameId: "lmu", categoryId: "hypercar", name: "Toyota GR010 Hybrid", brand: "Toyota", year: 2021 },
  { id: "lmu_porsche_963", gameId: "lmu", categoryId: "hypercar", name: "Porsche 963", brand: "Porsche", year: 2023 },
  { id: "lmu_cadillac_vseriesr", gameId: "lmu", categoryId: "hypercar", name: "Cadillac V-Series.R", brand: "Cadillac", year: 2023 },
  { id: "lmu_bmw_m_hybrid_v8", gameId: "lmu", categoryId: "hypercar", name: "BMW M Hybrid V8", brand: "BMW", year: 2024 },
  { id: "lmu_peugeot_9x8_2023", gameId: "lmu", categoryId: "hypercar", name: "Peugeot 9X8 (2023)", brand: "Peugeot", year: 2023 },
  { id: "lmu_peugeot_9x8_2024", gameId: "lmu", categoryId: "hypercar", name: "Peugeot 9X8 (2024)", brand: "Peugeot", year: 2024 },
  // Auto de REFERENCIA Hypercar (captura in-game #35): hereda los defaults globales.
  { id: "lmu_alpine_a424", gameId: "lmu", categoryId: "hypercar", name: "Alpine A424", brand: "Alpine", year: 2024 },
  { id: "lmu_aston_valkyrie_lmh", gameId: "lmu", categoryId: "hypercar", name: "Aston Martin Valkyrie AMR-LMH", brand: "Aston Martin", year: 2025 },
  { id: "lmu_lamborghini_sc63", gameId: "lmu", categoryId: "hypercar", name: "Lamborghini SC63", brand: "Lamborghini", year: 2024 },
  { id: "lmu_glickenhaus_007", gameId: "lmu", categoryId: "hypercar", name: "Glickenhaus SCG 007", brand: "Glickenhaus", year: 2021 },
  { id: "lmu_isotta_fraschini_tipo6", gameId: "lmu", categoryId: "hypercar", name: "Isotta Fraschini Tipo 6", brand: "Isotta Fraschini", year: 2024 },
  { id: "lmu_vanwall_vandervell_680", gameId: "lmu", categoryId: "hypercar", name: "Vanwall Vandervell 680", brand: "Vanwall", year: 2023 },
  { id: "lmu_genesis_gmr001", gameId: "lmu", categoryId: "hypercar", name: "Genesis GMR-001", brand: "Genesis", year: 2026 },
  // ── LMGT3 ──────────────────────────────────────────────────────────────────
  { id: "lmu_ferrari_296_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Ferrari 296 LMGT3", brand: "Ferrari", year: 2024 },
  { id: "lmu_porsche_911_gt3r", gameId: "lmu", categoryId: "lmgt3", name: "Porsche 911 GT3 R", brand: "Porsche", year: 2023 },
  { id: "lmu_bmw_m4_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "BMW M4 LMGT3", brand: "BMW", year: 2024 },
  { id: "lmu_aston_vantage_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Aston Martin Vantage AMR LMGT3", brand: "Aston Martin", year: 2024 },
  { id: "lmu_corvette_z06_lmgt3r", gameId: "lmu", categoryId: "lmgt3", name: "Corvette Z06 LMGT3.R", brand: "Chevrolet", year: 2024 },
  { id: "lmu_ford_mustang_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Ford Mustang LMGT3", brand: "Ford", year: 2024 },
  { id: "lmu_lamborghini_huracan_lmgt3_evo2", gameId: "lmu", categoryId: "lmgt3", name: "Lamborghini Huracán LMGT3 Evo2", brand: "Lamborghini", year: 2024 },
  { id: "lmu_lexus_rcf_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Lexus RC F LMGT3", brand: "Lexus", year: 2024 },
  // Auto de REFERENCIA LMGT3 (captura in-game #59): hereda los overrides de clase.
  { id: "lmu_mclaren_720s_lmgt3_evo", gameId: "lmu", categoryId: "lmgt3", name: "McLaren 720S LMGT3 Evo", brand: "McLaren", year: 2024 },
  { id: "lmu_mercedes_amg_lmgt3", gameId: "lmu", categoryId: "lmgt3", name: "Mercedes-AMG LMGT3", brand: "Mercedes-AMG", year: 2023 },
  // ── LMP2 ───────────────────────────────────────────────────────────────────
  { id: "lmu_oreca_07_gibson_2023", gameId: "lmu", categoryId: "lmp2", name: "ORECA 07 Gibson (2023)", brand: "ORECA", year: 2023 },
  { id: "lmu_oreca_07_gibson_2024", gameId: "lmu", categoryId: "lmp2", name: "ORECA 07 Gibson (2024)", brand: "ORECA", year: 2024 },
  // ── LMP3 ───────────────────────────────────────────────────────────────────
  { id: "lmu_ginetta_g61_p325", gameId: "lmu", categoryId: "lmp3", name: "Ginetta G61-LT-P325 Evo", brand: "Ginetta", year: 2025 },
  { id: "lmu_ligier_js_p325", gameId: "lmu", categoryId: "lmp3", name: "Ligier JS P325", brand: "Ligier", year: 2025 },
  { id: "lmu_adess_ad25", gameId: "lmu", categoryId: "lmp3", name: "Adess AD25", brand: "Adess", year: 2026 },
  // ── GTE (contenido heredado, fuera del WEC actual) ─────────────────────────
  { id: "lmu_ferrari_488_gte_evo", gameId: "lmu", categoryId: "gte", name: "Ferrari 488 GTE Evo", brand: "Ferrari", year: 2019 },
  { id: "lmu_porsche_911_rsr19", gameId: "lmu", categoryId: "gte", name: "Porsche 911 RSR-19", brand: "Porsche", year: 2019 },
  { id: "lmu_corvette_c8r", gameId: "lmu", categoryId: "gte", name: "Chevrolet Corvette C8.R", brand: "Chevrolet", year: 2020 },
  { id: "lmu_aston_vantage_gte", gameId: "lmu", categoryId: "gte", name: "Aston Martin Vantage AMR GTE", brand: "Aston Martin", year: 2018 },
  // Agregados verificados (workflow wf_891905b9-f55, 2026-06-24): LMP3 (V1.3) y Hypercar 2026 (V1.3.3).
  { id: "lmu_duqueine_d09", gameId: "lmu", categoryId: "lmp3", name: "Duqueine D09", brand: "Duqueine", year: 2025 },
  { id: "lmu_toyota_tr010", gameId: "lmu", categoryId: "hypercar", name: "Toyota TR010 Hybrid (2026)", brand: "Toyota", year: 2026 },
];

// Overrides de base por auto. Hypercar y LMGT3 heredan los defaults de su clase
// (= sus capturas de referencia), así que no necesitan override. Los prototipos
// LMP2/LMP3 corren SIN control de tracción: dejamos los 3 canales de TC en 0 y
// un ala de partida más conservadora. (Los GTE sí tenían TC, así que heredan.)
export const lmuBaseSetups: Record<string, SetupValues> = {
  lmu_oreca_07_gibson_2023: { tc: 0, tc_power: 0, tc_slip: 0, rear_wing: 8 },
  lmu_oreca_07_gibson_2024: { tc: 0, tc_power: 0, tc_slip: 0, rear_wing: 8 },
  lmu_ginetta_g61_p325: { tc: 0, tc_power: 0, tc_slip: 0, rear_wing: 5 },
  lmu_ligier_js_p325: { tc: 0, tc_power: 0, tc_slip: 0, rear_wing: 5 },
  lmu_adess_ad25: { tc: 0, tc_power: 0, tc_slip: 0, rear_wing: 5 },
  lmu_duqueine_d09: { tc: 0, tc_power: 0, tc_slip: 0, rear_wing: 5 },
};

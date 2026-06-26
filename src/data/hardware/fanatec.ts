import type { FanatecBase, FfbTuningParam } from "@/lib/types";

// Bases Direct Drive de Fanatec del piloto (Patagonia Sim Racing). Solo se
// modelan las DOS bases que se usan: la CSL DD (con Boost Kit 180 = 8 Nm) y la
// ClubSport DD+ (18 Nm). El par máximo determina cuánta fuerza puede entregar la
// base: con más par hay que bajar el gain dentro del juego para no "clippear"
// (saturar) el FFB y perder detalle.
// Nota (firmware Fanatec App v1.4.2.3, abr-may 2026): el par de sujeción de la
// ClubSport DD+ subió de 15 a 18 Nm sin costo ni cambio de hardware.
export const fanatecBases: FanatecBase[] = [
  {
    id: "csl_dd",
    name: "CSL DD",
    maxTorqueNm: 5,
    boostTorqueNm: 8,
    note: {
      es: "Base de entrada para PC (y Xbox con volante compatible). 5 Nm de fábrica, 8 Nm con el Boost Kit 180. Si la corres a 8 Nm, baja un poco el gain del juego respecto a los 5 Nm.",
      en: "Entry PC base (and Xbox with a compatible wheel). 5 Nm stock, 8 Nm with the Boost Kit 180. If you run it at 8 Nm, lower the in-game gain a touch versus 5 Nm.",
    },
  },
  {
    id: "clubsport_dd_plus",
    name: "ClubSport DD+",
    maxTorqueNm: 18,
    note: {
      es: "Versión de más par de la ClubSport DD, 18 Nm (subió de 15 a 18 Nm vía firmware v1.4.2.3, 2026). Más par para autos pesados y de fórmula; usa un gain más bajo para no saturar.",
      en: "Higher-torque version of the ClubSport DD, 18 Nm (raised from 15 to 18 Nm via firmware v1.4.2.3, 2026). More torque for heavy and formula cars; use a lower gain to avoid clipping.",
    },
  },
];

export const fanatecBaseById = new Map(fanatecBases.map((b) => [b.id, b]));

// Parámetros del menú tuning de la base (firmware Fanatec). Son los mismos en
// todos los juegos; cada juego recomienda VALORES para estos parámetros.
export const ffbTuningParams: FfbTuningParam[] = [
  {
    id: "SEN",
    label: "SEN",
    name: { es: "Sensibilidad / ángulo de giro", en: "Sensitivity / steering angle" },
    unit: "°",
    whatItDoes: {
      es: "Define cuántos grados gira el volante de tope a tope (rango 90–1080° en la CSL DD y la ClubSport DD+; default AUTO). En AUTO, el juego fija el ángulo correcto para cada auto, que es lo ideal en sims modernos.",
      en: "Sets how many degrees the wheel turns lock to lock (range 90–1080° on the CSL DD and ClubSport DD+; default AUTO). On AUTO the game sets the correct angle per car, which is ideal in modern sims.",
    },
    increaseEffect: {
      es: "Más grados = volante más lento y suave, pero menos directo en curvas cerradas.",
      en: "More degrees = slower, smoother wheel, but less direct in tight corners.",
    },
    decreaseEffect: {
      es: "Menos grados = dirección más rápida y nerviosa; útil en monoplazas y rally.",
      en: "Fewer degrees = quicker, twitchier steering; useful in formula cars and rally.",
    },
  },
  {
    id: "FFB",
    label: "FFB",
    name: { es: "Fuerza del Force Feedback", en: "Force Feedback strength" },
    unit: "%",
    whatItDoes: {
      es: "Intensidad global del FFB de la base (rango 0-100%, paso 1%, default 100). Lo habitual es dejarlo al 100% y regular la fuerza con el gain dentro del juego. En el display de la base aparece como «FF» (displays de 7 segmentos) o «F.FEEDB.» (OLED), no como «FFB».",
      en: "Global FFB intensity of the base (range 0-100%, step 1%, default 100). Usually left at 100% and the force is dialed in with the in-game gain. On the base's display it shows as 'FF' (7-segment) or 'F.FEEDB.' (OLED), not as 'FFB'.",
    },
    increaseEffect: {
      es: "Más fuerza total en el volante.",
      en: "More overall force at the wheel.",
    },
    decreaseEffect: {
      es: "Volante más liviano; útil si la base es muy fuerte para ti.",
      en: "Lighter wheel; useful if the base is too strong for you.",
    },
  },
  {
    id: "FFS",
    label: "FFS",
    name: { es: "Escala del FFB (Peak/Linear)", en: "FFB Scale (Peak/Linear)" },
    whatItDoes: {
      es: "Cómo se escala la fuerza. En la CSL DD y la ClubSport DD+ el ajuste se llama «LIN»: apagado aprovecha todo el par (picos más fuertes) y activado da una respuesta más lineal y predecible (útil sobre todo en la ClubSport DD+ a 18 Nm). En las viejas Podium era «FFS» con valores PEAK/LINEAR.",
      en: "How force is scaled. On the CSL DD and ClubSport DD+ this setting is called 'LIN': off uses the full torque (stronger peaks), on gives a more linear, predictable response (most useful on the ClubSport DD+ at 18 Nm). On the older Podium bases it was 'FFS' with PEAK/LINEAR values.",
    },
    increaseEffect: {
      es: "PEAK: máximo par disponible, picos más fuertes.",
      en: "PEAK: maximum available torque, stronger peaks.",
    },
    decreaseEffect: {
      es: "LINEAR: fuerza más uniforme, más fácil de leer al límite.",
      en: "LINEAR: more uniform force, easier to read at the limit.",
    },
  },
  {
    id: "NDP",
    label: "NDP",
    name: { es: "Amortiguación natural (Natural Damper)", en: "Natural Damper" },
    unit: "%",
    whatItDoes: {
      es: "Agrega amortiguación al movimiento del volante (rango OFF/01–100, default de fábrica 50: la base aplica algo de amortiguación de fábrica). Ayuda a calmar oscilaciones cuando el juego no manda damper propio (como ACC).",
      en: "Adds damping to the wheel's motion (range OFF/01–100, factory default 50: the base applies some damping out of the box). Helps calm oscillations when the game sends no damper of its own (like ACC).",
    },
    increaseEffect: {
      es: "Volante más pesado y estable, pero pierde algo de detalle fino.",
      en: "Heavier, more stable wheel, but loses some fine detail.",
    },
    decreaseEffect: {
      es: "Volante más suelto y detallado, pero puede oscilar en rectas.",
      en: "Looser, more detailed wheel, but can oscillate on straights.",
    },
  },
  {
    id: "NFR",
    label: "NFR",
    name: { es: "Fricción natural (Natural Friction)", en: "Natural Friction" },
    unit: "%",
    whatItDoes: {
      es: "Simula la fricción mecánica de una columna de dirección real; da algo de cuerpo al volante (rango OFF–100, default de fábrica OFF).",
      en: "Simulates the mechanical friction of a real steering column; gives the wheel some body (range OFF–100, factory default OFF).",
    },
    increaseEffect: {
      es: "Más resistencia constante al girar; sensación más 'mecánica' pero menos viva.",
      en: "More constant resistance when turning; more 'mechanical' feel but less lively.",
    },
    decreaseEffect: {
      es: "Volante más libre y reactivo.",
      en: "Freer, more reactive wheel.",
    },
  },
  {
    id: "NIN",
    label: "NIN",
    name: { es: "Inercia natural (Natural Inertia)", en: "Natural Inertia" },
    unit: "%",
    whatItDoes: {
      es: "Agrega inercia simulada, haciendo que el volante se sienta más 'pesado' al cambiar de dirección (rango OFF–100, default de fábrica OFF).",
      en: "Adds simulated inertia, making the wheel feel 'heavier' when changing direction (range OFF–100, factory default OFF).",
    },
    increaseEffect: {
      es: "Sensación de más masa; suaviza cambios bruscos pero resta inmediatez.",
      en: "Sense of more mass; smooths abrupt changes but reduces immediacy.",
    },
    decreaseEffect: {
      es: "Respuesta más inmediata y ligera.",
      en: "More immediate, lighter response.",
    },
  },
  {
    id: "INT",
    label: "INT",
    name: { es: "Filtro de interpolación (Interpolation)", en: "Interpolation filter" },
    whatItDoes: {
      es: "Interpola/suaviza la señal de FFB entre actualizaciones para quitar asperezas sin perder definición. Rango «OFF», 1-20 (default de fábrica 6). Valores típicos por juego: 2 en AC Rally e iRacing, 1-3 en ACC.",
      en: "Interpolates/smooths the FFB signal between updates to remove rough edges without losing detail. Range 'OFF', 1-20 (factory default 6). Typical per-game values: 2 in AC Rally and iRacing, 1-3 in ACC.",
    },
    increaseEffect: {
      es: "Más interpolación = señal más suave, pero puede agregar algo de latencia y tapar microdetalle.",
      en: "More interpolation = smoother signal, but can add slight latency and mask micro-detail.",
    },
    decreaseEffect: {
      es: "Menos interpolación = señal más cruda y directa, con más aspereza en bases de menor frecuencia.",
      en: "Less interpolation = rawer, more direct signal, with more roughness on lower-frequency bases.",
    },
  },
  {
    id: "FEI",
    label: "FEI",
    name: { es: "Intensidad de efectos (Force Effect Intensity)", en: "Force Effect Intensity" },
    unit: "%",
    whatItDoes: {
      es: "Nitidez/filtrado de los efectos del FFB (rango 0-100 en pasos de 10, default 100; 0 u «OFF» = más suave/fluido). Más alto = efectos más definidos y secos; más bajo = más suavizado.",
      en: "Sharpness/filtering of FFB effects (range 0-100 in steps of 10, default 100; 0 or 'OFF' = smoothest/softest). Higher = crisper, sharper effects; lower = more smoothing.",
    },
    increaseEffect: {
      es: "Detalle más nítido y golpes más secos (pianos, baches).",
      en: "Crisper detail and sharper hits (kerbs, bumps).",
    },
    decreaseEffect: {
      es: "Sensación más suave y filtrada; útil si hay ruido o vibración molesta.",
      en: "Smoother, filtered feel; useful if there's noise or annoying vibration.",
    },
  },
  {
    id: "SPR",
    label: "SPR",
    name: { es: "Efecto resorte (Spring)", en: "Spring effect" },
    unit: "%",
    whatItDoes: {
      es: "Cuánto deja pasar la base el efecto de resorte (centrado) que manda el juego: en 100 pasa sin modificar, por debajo lo atenúa y por encima de 100 (hasta ~120) lo amplifica. DEPENDE DEL JUEGO: iRacing y los rally/AC lo quieren en 100; algunos sims que mandan su propio resorte piden bajarlo. Default de fábrica 100.",
      en: "How much of the game-sent spring (centering) effect the base lets through: at 100 it passes unchanged, below 100 it attenuates and above 100 (up to ~120) it amplifies. GAME-DEPENDENT: iRacing and the rally/AC titles want it at 100; some sims that send their own spring ask to lower it. Factory default 100.",
    },
    increaseEffect: {
      es: "Más centrado artificial del volante cuando el juego lo pide.",
      en: "More artificial wheel centering when the game requests it.",
    },
    decreaseEffect: {
      es: "Menos efecto resorte; útil si el sim ya manda su propio centrado.",
      en: "Less spring effect; useful if the sim already sends its own centering.",
    },
  },
  {
    id: "DPR",
    label: "DPR",
    name: { es: "Efecto amortiguador (Damper)", en: "Damper effect" },
    unit: "%",
    whatItDoes: {
      es: "Cuánto deja pasar la base el efecto de amortiguación que manda el juego: en 100 pasa sin modificar, por debajo lo atenúa y por encima de 100 (hasta ~120) lo amplifica. DEPENDE DEL JUEGO: iRacing y los rally/AC lo quieren en 100; otros sims piden bajarlo. Default de fábrica 100.",
      en: "How much of the game-sent damper effect the base lets through: at 100 it passes unchanged, below 100 it attenuates and above 100 (up to ~120) it amplifies. GAME-DEPENDENT: iRacing and the rally/AC titles want it at 100; other sims ask to lower it. Factory default 100.",
    },
    increaseEffect: {
      es: "Más amortiguación cuando el juego la pide; volante más calmo.",
      en: "More damping when the game requests it; calmer wheel.",
    },
    decreaseEffect: {
      es: "Menos amortiguación; volante más libre si el sim ya manda la suya.",
      en: "Less damping; freer wheel if the sim already sends its own.",
    },
  },
  {
    id: "BRF",
    label: "BRF",
    name: { es: "Fuerza de freno (pedales load cell)", en: "Brake Force (load cell pedals)" },
    unit: "%",
    whatItDoes: {
      es: "En pedales con celda de carga, fija cuánta fuerza física hay que hacer para llegar al 100% de freno (rango MIN..MAX ≈ 0-100, default de fábrica 50, se muestra como «050»). Es preferencia personal y no afecta el auto.",
      en: "On load-cell pedals, sets how much physical force is needed to reach 100% braking (range MIN..MAX ≈ 0-100, factory default 50, shown as '050'). It's personal preference and doesn't affect the car.",
    },
    increaseEffect: {
      es: "Hay que empujar más fuerte para frenar a fondo; más control en frenadas duras.",
      en: "You must push harder to fully brake; more control in heavy braking.",
    },
    decreaseEffect: {
      es: "Se llega al 100% con menos fuerza; freno más sensible.",
      en: "You reach 100% with less force; more sensitive brake.",
    },
  },
];

export const ffbTuningParamById = new Map(ffbTuningParams.map((p) => [p.id, p]));

import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para Assetto Corsa EVO en bases Fanatec Direct Drive.
// AC EVO hereda el FFB del linaje Assetto Corsa (puro, basado en física, sin
// muchos efectos artificiales). Punto de partida de consenso de la comunidad:
// el detalle fino se ajusta mirando que el volante no sature (clipping).
// NOTA: se usan los nombres reales del menú FFB in-game de AC EVO (Settings >
// Controls > Settings de la base). Pueden cambiar entre builds de Early Access.
export const ac_evoFfb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "AUTO",
      note: {
        es: "En AUTO, AC EVO fija el ángulo de giro correcto para cada auto (un GT3 y un hot hatch usan rotaciones distintas).",
        en: "On AUTO, AC EVO sets the correct steering angle per car (a GT3 and a hot hatch use different rotations).",
      },
    },
    { paramId: "FFB", value: "100" },
    {
      paramId: "FFS",
      value: "PEAK",
      note: {
        es: "Opcional. PEAK aprovecha todo el par de la base; LINEAR si se prefiere una respuesta más predecible al límite.",
        en: "Optional. PEAK uses the base's full torque; LINEAR if you prefer a more predictable response at the limit.",
      },
    },
    {
      paramId: "NDP",
      value: "15–25",
      note: {
        es: "El FFB de Assetto no manda mucha amortiguación propia; un poco de NDP evita que el volante oscile en recta y en reposo.",
        en: "Assetto's FFB sends little damper of its own; a bit of NDP keeps the wheel from oscillating on straights and at rest.",
      },
    },
    { paramId: "NFR", value: "0–5" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "INT",
      value: "2–6",
      note: {
        es: "Filtro de interpolación que suaviza los escalones de la señal sin perder fidelidad. La guía oficial de Fanatec para AC EVO recomienda un valor bajo en este rango.",
        en: "Interpolation filter that smooths the signal's steps without losing fidelity. Fanatec's official AC EVO guide recommends a low value in this range.",
      },
    },
    {
      paramId: "FEI",
      value: "100",
      note: {
        es: "Máximo detalle de pianos y baches (AC EVO es muy detallado). La fuerza total se regula bajando el FFB por base, no el FEI.",
        en: "Maximum kerb and bump detail (AC EVO is very detailed). Overall force is dialed in by lowering the per-base FFB, not the FEI.",
      },
    },
    {
      paramId: "BRF",
      value: "50–70",
      note: {
        es: "Preferencia personal del pedal de freno (load cell); no cambia el comportamiento del auto.",
        en: "Personal brake-pedal preference (load cell); doesn't change car behavior.",
      },
    },
  ],
  inGame: [
    {
      id: "steering_lock",
      name: { es: "Steering Lock (ángulo de giro)", en: "Steering Lock" },
      value: "AUTO",
      whatItDoes: {
        es: "Define la rotación del volante que usa el juego. Conviene dejarlo en AUTO para que AC EVO use el ángulo real de cada auto; con la base en SEN AUTO la dirección queda 1:1.",
        en: "Sets the steering rotation the game uses. Best left on AUTO so AC EVO uses each car's real angle; with the base on SEN AUTO the steering stays 1:1.",
      },
    },
    {
      id: "gain",
      name: { es: "FFB Gain (fuerza del FFB)", en: "FFB Gain" },
      value: "85",
      perBase: {
        gt_dd_pro: "90–100",
        csl_dd: "90–100",
        clubsport_dd: "75–85",
        clubsport_dd_plus: "70–80",
        podium_dd1: "60–70",
        podium_dd2: "52–62",
      },
      whatItDoes: {
        es: "Fuerza total del FFB dentro de AC EVO (escala 0–100). Es el ajuste más importante: súbelo hasta que en las curvas más cargadas el volante llegue al tope justo sin saturar (clipping), que hace perder detalle del agarre.",
        en: "Overall FFB force inside AC EVO (0–100 scale). The most important setting: raise it until the wheel just peaks in the most loaded corners without clipping, which makes you lose grip detail.",
      },
      note: {
        es: "Cuanta más fuerza tiene la base, más bajo va el gain. AC EVO suele necesitar gain algo más bajo que ACC porque entrega picos más fuertes.",
        en: "The more torque the base has, the lower the gain. AC EVO usually needs a slightly lower gain than ACC because it sends stronger peaks.",
      },
    },
    {
      id: "min_force",
      name: { es: "Min Force (fuerza mínima)", en: "Min Force" },
      value: "0",
      whatItDoes: {
        es: "Puente de zona muerta central para bases de correa o engranaje. En direct drive se deja en 0; súbelo apenas solo si no se siente el centro y los detalles pequeños.",
        en: "Bridges the central deadzone on belt or geared bases. On direct drive leave it at 0; raise it slightly only if you can't feel the center and small details.",
      },
      note: {
        es: "No confundir con Minimum Damper: Min Force rellena la zona muerta de dirección, Minimum Damper agrega amortiguación base constante.",
        en: "Not to be confused with Minimum Damper: Min Force fills the steering deadzone, while Minimum Damper adds constant base damping.",
      },
    },
    {
      id: "dynamic_damping",
      name: { es: "Dynamic Damping (amortiguación dinámica)", en: "Dynamic Damping" },
      value: "40",
      whatItDoes: {
        es: "Amortiguación que varía con la velocidad del auto; se nota sobre todo al subvirar en curva rápida. Un valor medio (~40%) da peso natural sin apagar el detalle.",
        en: "Damping that scales with car speed; most noticeable when understeering in fast corners. A medium value (~40%) gives natural weight without dulling detail.",
      },
    },
    {
      id: "damper_gain",
      name: { es: "Damper Gain (peso del volante)", en: "Damper Gain" },
      value: "20–30",
      whatItDoes: {
        es: "Amortiguación estática que agrega peso al volante. En direct drive conviene un valor bajo (~20–30%) para no tapar las señales finas del agarre.",
        en: "Static damping that adds weight to the wheel. On direct drive keep it low (~20–30%) so it doesn't mask the fine grip signals.",
      },
    },
    {
      id: "minimum_damper",
      name: { es: "Minimum Damper (amortiguación base)", en: "Minimum Damper" },
      value: "0",
      whatItDoes: {
        es: "Amortiguación base constante del volante. En direct drive se deja en 0; súbelo solo en bases de engranaje si hace falta calmar el centro.",
        en: "Constant base damping on the wheel. On direct drive leave it at 0; raise it only on geared bases if the center needs calming.",
      },
      note: {
        es: "Es distinto de Min Force: Minimum Damper agrega amortiguación constante, no rellena la zona muerta de dirección.",
        en: "Different from Min Force: Minimum Damper adds constant damping, it does not fill the steering deadzone.",
      },
    },
    {
      id: "speed_sensitivity",
      name: { es: "Speed Sensitivity (sensibilidad a la velocidad)", en: "Speed Sensitivity" },
      value: "70",
      whatItDoes: {
        es: "Ajusta cómo cambia la respuesta del FFB con la velocidad. Un valor medio-alto (~70%) mantiene buen tacto a baja velocidad sin que el volante se sienta nervioso en recta.",
        en: "Adjusts how the FFB response changes with speed. A medium-high value (~70%) keeps good feel at low speed without the wheel feeling nervous on straights.",
      },
    },
    {
      id: "ffb_smoothing",
      name: { es: "Steering Filter (filtro de dirección)", en: "Steering Filter" },
      value: "0–10",
      whatItDoes: {
        es: "Filtro de suavizado que reduce el ruido y el jitter de alta frecuencia. En direct drive conviene dejarlo bajo (0–10%); súbelo hacia ~20% solo si hay jitter con FFB alto.",
        en: "Smoothing filter that reduces high-frequency noise and jitter. On direct drive keep it low (0–10%); raise it toward ~20% only if there's jitter with high FFB.",
      },
    },
    {
      id: "vibrations",
      name: { es: "Vibrations (vibraciones)", en: "Vibrations" },
      value: "50–70",
      whatItDoes: {
        es: "Intensidad de la textura de la superficie (baches, pianos). AC EVO usa pistas láser-escaneadas muy detalladas: más alto = más textura, pero puede tapar el detalle del agarre.",
        en: "Strength of the surface texture (bumps, kerbs). AC EVO uses highly detailed laser-scanned tracks: higher = more texture, but can mask grip detail.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: la fuerza total se regula bajando el FFB por base (CSL DD ~100%; ClubSport/Podium DD 40–70%) y ajustando el FFB Gain del juego, no el FEI. Si el volante satura (clipping) en las curvas cargadas, se pierde información del agarre: baje el gain.",
      en: "Rule of thumb: overall force is dialed in by lowering the per-base FFB (CSL DD ~100%; ClubSport/Podium DD 40–70%) and tuning the in-game FFB Gain, not the FEI. If the wheel clips in loaded corners you're losing grip information: lower the gain.",
    },
    {
      es: "Suba el FFB Gain de a poco hasta que en las curvas más cargadas el volante llegue al tope justo sin quedarse saturado. AC EVO está en Early Access: revise el FFB tras cada actualización por si cambia el comportamiento.",
      en: "Raise the FFB Gain gradually until the wheel just reaches the top in the most loaded corners without staying saturated. AC EVO is in Early Access: re-check FFB after each update in case behaviour changes.",
    },
  ],
};

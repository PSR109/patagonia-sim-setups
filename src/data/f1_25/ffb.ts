import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para F1 25 en bases Fanatec Direct Drive.
// F1 25 tiene su propio menú de Force Feedback (Vibration & Force Feedback) con
// ajustes como Vibration & Force Feedback Strength, On Track Effects, Rumble Strip
// Effects, Off Track Effects, Wheel Damper y Understeer Enhance. Punto de partida
// de consenso de la comunidad: el detalle fino se ajusta para que el volante no
// sature (clipping) en las curvas más cargadas.
export const f1_25Ffb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "360",
      note: {
        es: "Los monoplazas usan poco ángulo de giro. F1 25 SÍ tiene su propia rotación in-game (Wheel Rotation): lo recomendado es poner SEN en 360 y alinear la rotación in-game también en 360 para tener dirección 1:1 (un F1 real gira ~360°). 380 es una alternativa con algo más de margen en horquillas.",
        en: "Formula cars use little steering angle. F1 25 DOES have its own in-game rotation (Wheel Rotation): the recommendation is to set SEN to 360 and match the in-game rotation at 360 for 1:1 steering (a real F1 turns ~360°). 380 is an alternative with a bit more margin in hairpins.",
      },
    },
    { paramId: "FFB", value: "100" },
    {
      paramId: "FFS",
      value: "PEAK",
      note: {
        es: "Opcional. PEAK aprovecha todo el par de la base.",
        en: "Optional. PEAK uses the base's full torque.",
      },
    },
    {
      paramId: "NDP",
      value: "10–25",
      note: {
        es: "F1 25 ya ofrece su propio Wheel Damper; con un poco de NDP alcanza para calmar oscilaciones en recta sin tapar el detalle.",
        en: "F1 25 has its own Wheel Damper; a little NDP is enough to calm straight-line oscillations without masking detail.",
      },
    },
    { paramId: "NFR", value: "OFF–5" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "FEI",
      value: "80–100",
      note: {
        es: "Detalle de pianos y baches. Bájalo si los pianos de F1 25 se sienten demasiado ásperos.",
        en: "Kerb and bump detail. Lower it if F1 25 kerbs feel too harsh.",
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
      id: "wheel_rotation",
      name: { es: "Wheel Rotation (rotación del volante)", en: "Wheel Rotation" },
      value: "360°",
      whatItDoes: {
        es: "Define los grados de giro que usa el juego (Configuración > Mandos, sección Vibration & Force Feedback). 360° es el default y replica la rotación real de un F1 (~360°); conviene igualar el SEN de la base a 360° para dirección 1:1. 380° es una alternativa con algo más de margen en horquillas.",
        en: "Sets the degrees of rotation the game uses (Settings > Controls, Vibration & Force Feedback section). 360° is the default and matches a real F1's rotation (~360°); it's best to match the base's SEN to 360° for 1:1 steering. 380° is an alternative with a bit more margin in hairpins.",
      },
      note: {
        es: "El nombre exacto varía según la versión: 'Wheel Rotation', 'Maximum Wheel Rotation' o 'Rotation'. Si se deja en AUTO el juego usa su propio valor; con un SEN fijo en la base, ese valor pasa a ser el efectivo.",
        en: "The exact name varies by version: 'Wheel Rotation', 'Maximum Wheel Rotation' or 'Rotation'. If left on AUTO the game uses its own value; with a fixed SEN on the base, that value becomes the effective one.",
      },
    },
    {
      id: "vibration_ffb_strength",
      name: { es: "Vibration & Force Feedback Strength (fuerza FFB)", en: "Vibration & Force Feedback Strength" },
      value: "75",
      perBase: {
        gt_dd_pro: "85–100",
        csl_dd: "85–100",
        clubsport_dd: "70–85",
        clubsport_dd_plus: "65–78",
        podium_dd1: "55–68",
        podium_dd2: "48–60",
      },
      whatItDoes: {
        es: "Fuerza total del FFB dentro de F1 25. Es el ajuste más importante: súbelo hasta sentir bien el agarre en las curvas más cargadas sin que el volante se sature y se aplane (clipping, pierdes detalle).",
        en: "Overall FFB force inside F1 25. The most important setting: raise it until you feel grip well in the most loaded corners without the wheel saturating and flattening out (clipping, you lose detail).",
      },
      note: {
        es: "Cuanta más fuerza tiene tu base, más bajo va este valor.",
        en: "The more torque your base has, the lower this value.",
      },
    },
    {
      id: "on_track_effects",
      name: { es: "On Track Effects (efectos en pista)", en: "On Track Effects" },
      value: "30–50",
      whatItDoes: {
        es: "Vibración de la superficie del asfalto. Más alto = más textura, pero puede tapar el detalle del agarre del neumático.",
        en: "Road surface vibration. Higher = more texture, but can mask tyre grip detail.",
      },
    },
    {
      id: "rumble_strip_effects",
      name: { es: "Rumble Strip Effects (efectos de pianos)", en: "Rumble Strip Effects" },
      value: "30–50",
      whatItDoes: {
        es: "Intensidad de la vibración al pisar pianos. Preferencia personal: más alto te avisa mejor de los límites, pero cansa la muñeca en bases fuertes.",
        en: "Intensity of the vibration when hitting kerbs. Personal preference: higher warns you of track limits better, but tires the wrist on strong bases.",
      },
    },
    {
      id: "off_track_effects",
      name: { es: "Off Track Effects (efectos fuera de pista)", en: "Off Track Effects" },
      value: "20–40",
      whatItDoes: {
        es: "Vibración al salirte a la grava o el pasto. Útil para sentir cuándo estás fuera de la pista; bájalo si te resulta excesivo.",
        en: "Vibration when running onto gravel or grass. Useful to feel when you're off track; lower it if it feels excessive.",
      },
    },
    {
      id: "wheel_damper",
      name: { es: "Wheel Damper (amortiguación del volante)", en: "Wheel Damper" },
      value: "0–20",
      whatItDoes: {
        es: "Agrega peso/amortiguación al volante. En direct drive conviene bajo o en 0 porque la base ya da peso propio; súbelo solo si el volante oscila.",
        en: "Adds weight/damping to the wheel. On direct drive keep it low or 0 since the base already provides weight; raise it only if the wheel oscillates.",
      },
    },
    {
      id: "understeer_enhance",
      name: { es: "Understeer Enhance (refuerzo de subviraje)", en: "Understeer Enhance" },
      value: "OFF",
      whatItDoes: {
        es: "Aligera artificialmente el volante cuando el frente subvira para 'avisarte'. Muchos pilotos lo apagan en direct drive porque enmascara el FFB natural del agarre.",
        en: "Artificially lightens the wheel when the front understeers to 'warn' you. Many drivers turn it off on direct drive because it masks the natural grip FFB.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: deja la base (FFB) al 100% y ajusta la fuerza con el Vibration & Force Feedback Strength del juego. Si el volante se siente 'aplanado' o pierde detalle al cargar la curva, estás saturando (clipping): baja la fuerza.",
      en: "Rule of thumb: leave the base (FFB) at 100% and dial in the force with the in-game Vibration & Force Feedback Strength. If the wheel feels 'flattened' or loses detail when loading a corner you're clipping: lower the force.",
    },
    {
      es: "Sube la fuerza de a poco hasta sentir bien el agarre en las curvas más cargadas sin que el volante se sature. Baja los efectos (pianos/pista) si tapan la información del agarre del neumático.",
      en: "Raise the force gradually until you feel grip well in the most loaded corners without saturating the wheel. Lower the effects (kerbs/road) if they mask tyre grip information.",
    },
  ],
};

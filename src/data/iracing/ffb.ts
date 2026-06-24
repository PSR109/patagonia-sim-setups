import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para iRacing en bases Fanatec Direct Drive.
// iRacing controla la fuerza con "Strength" (Max Force, en Nm) y tiene un botón
// "Auto" que calcula automáticamente la fuerza para que el auto NO sature
// (clipping). El medidor de FFB del juego (barra/numérico de wheel force) es la
// referencia para afinar a mano.
export const iracingFfb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "AUTO",
      note: {
        es: "iRacing fija la rotación correcta de cada auto cuando la base está en AUTO. Si tu base no tiene AUTO, pon 1080° y deja que el juego limite el ángulo por auto.",
        en: "iRacing sets the correct rotation per car when the base is on AUTO. If your base lacks AUTO, set 1080° and let the game limit the per-car angle.",
      },
    },
    { paramId: "FFB", value: "100" },
    {
      paramId: "FFS",
      value: "PEAK",
      note: {
        es: "Opcional. PEAK aprovecha todo el par de la base; la fuerza efectiva se controla con el Strength del juego.",
        en: "Optional. PEAK uses the base's full torque; effective force is controlled with the in-game Strength.",
      },
    },
    {
      paramId: "NDP",
      value: "OFF–20",
      note: {
        es: "iRacing puede mandar su propio damping; mantén NDP bajo para no duplicar amortiguación. Súbelo apenas solo si el volante oscila en recta.",
        en: "iRacing can send its own damping; keep NDP low to avoid doubling damping. Raise it slightly only if the wheel oscillates on straights.",
      },
    },
    { paramId: "NFR", value: "OFF–10" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "FEI",
      value: "100",
      note: {
        es: "Máximo detalle de pianos y baches. Bájalo si sientes vibración o ruido molesto.",
        en: "Maximum kerb and bump detail. Lower it if you feel annoying vibration or noise.",
      },
    },
    {
      paramId: "INT",
      value: "3",
      note: {
        es: "La señal de FFB de iRacing es algo tosca; un INT de 3 suaviza los escalones de la señal sin perder fidelidad.",
        en: "iRacing's FFB signal is somewhat coarse; an INT of 3 smooths the signal's steps without losing fidelity.",
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
      id: "strength",
      name: { es: "Strength / Max Force (fuerza máx.)", en: "Strength / Max Force" },
      value: "AUTO",
      perBase: {
        gt_dd_pro: "16–22 Nm",
        csl_dd: "16–22 Nm",
        clubsport_dd: "22–30 Nm",
        clubsport_dd_plus: "26–36 Nm",
        podium_dd1: "32–45 Nm",
        podium_dd2: "40–60 Nm",
      },
      whatItDoes: {
        es: "Es el ajuste de FFB más importante: define a cuántos Nm de fuerza del auto la base llega al 100% de su par. Número MÁS BAJO = volante más fuerte (satura antes); número MÁS ALTO = volante más liviano (más margen sin clipping). Pulsa el botón 'Auto' tras unas vueltas e iRacing calcula el valor para que el pico de la curva más cargada no sature.",
        en: "The most important FFB setting: it sets at how many Nm of car force the base reaches 100% of its torque. LOWER number = stronger wheel (clips sooner); HIGHER number = lighter wheel (more headroom without clipping). Hit the 'Auto' button after a few laps and iRacing computes the value so the peak of the most loaded corner doesn't clip.",
      },
      note: {
        es: "Cuanta más fuerza tiene tu base, más alto va el Strength en Nm (la base aguanta más par antes de saturar). 'Auto' es el punto de partida recomendado.",
        en: "The more torque your base has, the higher the Strength in Nm (the base handles more torque before clipping). 'Auto' is the recommended starting point.",
      },
    },
    {
      id: "min_force",
      name: { es: "Min Force (fuerza mínima)", en: "Min Force" },
      value: "0–3%",
      whatItDoes: {
        es: "Compensa la zona muerta de bases de engranaje para sentir el centro. En direct drive casi no hace falta: súbelo apenas (0-3%) solo si no sientes el detalle alrededor del centro.",
        en: "Compensates the deadzone of geared bases so you feel the centre. On direct drive it's barely needed: raise it slightly (0-3%) only if you can't feel the detail around centre.",
      },
    },
    {
      id: "damping",
      name: { es: "Damping (amortiguación)", en: "Damping" },
      value: "0–10%",
      whatItDoes: {
        es: "Agrega amortiguación al movimiento del volante. En direct drive se deja bajo o en 0 para no perder detalle; súbelo solo si el volante se siente nervioso u oscila.",
        en: "Adds damping to the wheel's motion. On direct drive keep it low or at 0 to avoid losing detail; raise it only if the wheel feels nervous or oscillates.",
      },
    },
    {
      id: "use_linear_mode",
      name: { es: "Use linear mode (modo lineal)", en: "Use linear mode" },
      value: "ON (marcado) para direct drive",
      whatItDoes: {
        es: "Para volantes direct drive conviene MARCARLO: la fuerza se entrega 1:1 con el auto, sin el refuerzo no lineal pensado para volantes de engranaje/correa de gama baja (G27/G29/G920/G923). Con la casilla desmarcada el FFB se comprime y se sienten menos los extremos.",
        en: "For direct drive wheels keep it CHECKED: force is delivered 1:1 with the car, without the non-linear boost meant for low-end gear/belt wheels (G27/G29/G920/G923). Unchecked, the FFB compresses and the extremes are felt less.",
      },
      note: {
        es: "Con el modo lineal marcado, el Strength se mide en Nm y el botón 'Auto' del Strength funciona con este modo.",
        en: "With linear mode checked, Strength is measured in Nm and the Strength's 'Auto' button works with this mode.",
      },
    },
    {
      id: "wheel_force",
      name: { es: "Wheel Force (Maximum Output Force)", en: "Wheel Force (Maximum Output Force)" },
      value: "= par pico de tu base (Nm)",
      perBase: {
        gt_dd_pro: "8",
        csl_dd: "8",
        clubsport_dd: "15",
        clubsport_dd_plus: "18",
        podium_dd1: "20",
        podium_dd2: "25",
      },
      whatItDoes: {
        es: "Le dice a iRacing el par máximo físico de la base para escalar el FFB correctamente. Se ingresa A MANO en Nm, igual al par pico de la base (NO tiene modo AUTO). No confundir con el Strength/Max Force, que es el punto de clipping en pista y es otra entrada distinta.",
        en: "Tells iRacing the base's physical max torque so it scales the FFB correctly. Enter it MANUALLY in Nm, equal to the base's peak torque (there is NO AUTO mode). Do not confuse it with Strength/Max Force, which is the in-track clipping point and a separate field.",
      },
      note: {
        es: "El CSL DD entrega 5 Nm sin el Boost Kit 180; con el Boost Kit (o la versión 8 Nm) llega a 8 Nm.",
        en: "The CSL DD delivers 5 Nm without the Boost Kit 180; with the Boost Kit (or the 8 Nm version) it reaches 8 Nm.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: deja la base (FFB) al 100% y ajusta la fuerza con el Strength del juego. Pulsa el botón 'Auto' después de unas vueltas rápidas para que iRacing calcule el valor que evita el clipping (saturación). Si el medidor de wheel force vive en rojo/tope, estás saturando y pierdes información del agarre.",
      en: "Rule of thumb: leave the base (FFB) at 100% and dial in force with the in-game Strength. Hit the 'Auto' button after a few quick laps so iRacing computes the value that avoids clipping. If the wheel-force meter lives in the red/at the top, you're clipping and losing grip information.",
    },
    {
      es: "Si quieres más fuerza que el 'Auto' (algunos lo prefieren un pelo más cargado), baja el Strength en Nm de a poco aceptando algo de clipping en los picos máximos. Para menos fuerza, sube el número.",
      en: "If you want more force than 'Auto' (some prefer it a touch heavier), lower the Strength in Nm gradually, accepting a little clipping on the highest peaks. For less force, raise the number.",
    },
  ],
};

import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para Assetto Corsa Rally en bases Fanatec Direct Drive.
// Punto de partida de consenso (guía oficial Fanatec "The Perfect Setup for
// Assetto Corsa Rally"); el detalle fino se ajusta mirando que el FFB no sature
// (clipping). En rally el volante trabaja MUCHO de tope a tope: conviene un SEN
// más bajo que en circuito para una dirección rápida.
export const ac_rallyFfb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "AUTO",
      note: {
        es: "AUTO deja que el juego fije la rotación real de cada auto. Varía mucho según el coche: desde ~450-540° en WRC/Rally2 modernos (ej. i20 Rally2, Xsara WRC) hasta 720-900° o más en clásicos y Grupo B (ej. Delta Integrale, 037), llegando a 1200°+ en autos históricos. Si se quiere contravolantear más fácil, se puede fijar un valor más alto manualmente.",
        en: "AUTO lets the game set each car's real rotation. It varies a lot by car: from ~450-540° on modern WRC/Rally2 cars (e.g. i20 Rally2, Xsara WRC) up to 720-900° or more on classics and Group B (e.g. Delta Integrale, 037), reaching 1200°+ on historic cars. If you want easier opposite-lock, you can set a higher value manually.",
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
      value: "15",
      note: {
        es: "Punto de partida oficial de Fanatec (rango razonable de la comunidad ~10-20). Algo de amortiguación ayuda a controlar las sacudidas del volante sobre grava y baches sin matar el detalle.",
        en: "Official Fanatec starting point (reasonable community range ~10-20). Some damping helps control wheel jolts over gravel and bumps without killing detail.",
      },
    },
    { paramId: "NFR", value: "OFF–10" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "INT",
      value: "2",
      note: {
        es: "La guía oficial de Fanatec para Assetto Corsa Rally pide INT 2: suaviza las asperezas de la señal sin sacrificar fidelidad.",
        en: "Fanatec's official Assetto Corsa Rally guide calls for INT 2: it smooths out rough edges of the signal without sacrificing fidelity.",
      },
    },
    {
      paramId: "FEI",
      value: "100",
      note: {
        es: "La guía oficial de Fanatec pide 100. Detalle de superficie (grava, baches, pianos). Si la vibración sobre grava se vuelve molesta o ruidosa, se puede bajar.",
        en: "Fanatec's official guide calls for 100. Surface detail (gravel, bumps, kerbs). Lower it if gravel vibration becomes annoying or noisy.",
      },
    },
    {
      paramId: "SPR",
      value: "100",
      note: {
        es: "Default de fábrica 100. En juegos con motor AC/AC Rally el efecto resorte del juego está prácticamente inactivo, así que da casi igual; alternativa OFF/0.",
        en: "Factory default 100. In AC/AC Rally engine titles the game's spring effect is practically inactive, so it barely matters; OFF/0 is an alternative.",
      },
    },
    {
      paramId: "DPR",
      value: "100",
      note: {
        es: "Default de fábrica 100. En juegos con motor AC/AC Rally el efecto amortiguador del juego está prácticamente inactivo, así que da casi igual; alternativa OFF/0.",
        en: "Factory default 100. In AC/AC Rally engine titles the game's damper effect is practically inactive, so it barely matters; OFF/0 is an alternative.",
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
      id: "gain",
      name: { es: "Gain (ganancia FFB)", en: "FFB Gain" },
      value: "85",
      perBase: {
        csl_dd: "88–100",
        clubsport_dd_plus: "70–80",
      },
      whatItDoes: {
        es: "Fuerza total del FFB dentro de Assetto Corsa Rally. Es el ajuste más importante. La escala del slider llega hasta 200% (no 100): súbelo hasta que en los apoyos más cargados el medidor de FFB llegue al tope sin quedarse clavado en rojo (eso es clipping y se pierde detalle del agarre).",
        en: "Overall FFB force inside Assetto Corsa Rally. The most important setting. The slider scale goes up to 200% (not 100): raise it until the FFB meter peaks in the most loaded corners without staying pinned in red (that's clipping and you lose grip detail).",
      },
      note: {
        es: "En rally hay que cuidar los golpes de grava/saltos: un gain alto que no clipea en curva sí puede saturar de golpe en un impacto. Cuanta más fuerza tiene la base, más bajo va el gain.",
        en: "In rally watch out for gravel hits/jumps: a gain that doesn't clip in corners can still spike on an impact. The more torque your base has, the lower the gain.",
      },
    },
    {
      id: "min_force",
      name: { es: "Minimum Force (fuerza mínima)", en: "Minimum Force" },
      value: "0–5",
      whatItDoes: {
        es: "Compensa la zona muerta de bases de engranaje. En direct drive casi no hace falta: súbelo apenas solo si no se siente el centro o los pequeños cambios de agarre en superficie suelta.",
        en: "Compensates the deadzone of geared bases. On direct drive it's barely needed: raise it slightly only if you can't feel the center or small grip changes on loose surfaces.",
      },
    },
    {
      id: "damper",
      name: { es: "Damper (amortiguación in-game)", en: "Damper" },
      value: "0",
      whatItDoes: {
        es: "Amortiguación del volante por software en Assetto Corsa Rally (uno de los tres ajustes centrales del FFB: Gain, Minimum Force y Damper). En direct drive conviene dejarlo bajo o en 0 (Fanatec recomienda 0) y calmar las oscilaciones con el NDP de la base; súbelo solo si el volante se sacude demasiado en grava.",
        en: "In-game software wheel damping in Assetto Corsa Rally (one of the three core FFB settings: Gain, Minimum Force and Damper). On direct drive keep it low or 0 (Fanatec recommends 0) and calm oscillations with the base's NDP; raise it only if the wheel shakes too much on gravel.",
      },
    },
    {
      id: "steering_lock",
      name: { es: "Steering Lock + Wheel Soft Lock", en: "Steering Lock + Wheel Soft Lock" },
      value: "900° + Soft Lock ON",
      whatItDoes: {
        es: "Fija la rotación máxima que usa el juego y el tope físico por software (Wheel Soft Lock). Con el SEN de la base en AUTO, deja el Steering Lock alto (p. ej. 900°) y el Soft Lock activado: así el juego aplica el ángulo real de cada auto y el volante no gira más allá del tope del coche.",
        en: "Sets the maximum rotation the game uses and the software end-stop (Wheel Soft Lock). With the base's SEN on AUTO, set Steering Lock high (e.g. 900°) and turn Soft Lock ON: the game then applies each car's real angle and the wheel can't turn past the car's limit.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: dejar la base (FFB) al 100% y ajustar la fuerza con el Gain del juego mirando el medidor de FFB. Si el medidor vive en rojo, está saturando (clipping) y se pierde información del agarre.",
      en: "Rule of thumb: leave the base (FFB) at 100% and dial in the force with the in-game Gain while watching the FFB meter. If the meter lives in the red you're clipping and losing grip information.",
    },
    {
      es: "En rally el peligro de clipping no está solo en las curvas sino en los impactos (saltos, piedras, pianos). Conviene subir el Gain hasta justo antes de saturar en los apoyos cargados y dejar un margen para que los golpes no claven el medidor en rojo.",
      en: "In rally the clipping risk isn't only in corners but in impacts (jumps, rocks, kerbs). Raise the Gain to just before clipping in loaded corners and leave headroom so impacts don't pin the meter in the red.",
    },
    {
      es: "Además del Gain global, cada auto tiene un multiplicador de FFB propio en su setup (service park, sección de volante) que escala la fuerza solo para ese coche. Sirve para emparejar autos con FFB flojo sin tocar el Gain global; déjalo en x1.00 salvo que un auto puntual se sienta débil.",
      en: "Besides the global Gain, each car has its own FFB multiplier in its setup (service park, wheel section) that scales force for that car only. Use it to even out cars with weak FFB without touching the global Gain; leave it at x1.00 unless a specific car feels weak.",
    },
  ],
};

import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para ACC en bases Fanatec Direct Drive.
// Punto de partida de consenso de la comunidad: el detalle fino se ajusta
// mirando el medidor de FFB del juego para que no sature (clipping).
export const accFfb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "AUTO",
      note: {
        es: "ACC fija la rotación correcta de cada GT3 cuando está en AUTO.",
        en: "ACC sets the correct rotation per GT3 car when on AUTO.",
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
      value: "20–35",
      note: {
        es: "ACC no manda amortiguación propia; un poco de NDP evita que el volante oscile en recta.",
        en: "ACC sends no damper of its own; a little NDP keeps the wheel from oscillating on straights.",
      },
    },
    { paramId: "NFR", value: "OFF–10" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "FEI",
      value: "100",
      note: {
        es: "Máximo detalle de pianos y baches. Bájalo si sientes vibración molesta.",
        en: "Maximum kerb and bump detail. Lower it if you feel annoying vibration.",
      },
    },
    {
      paramId: "INT",
      value: "1-3",
      note: {
        es: "Filtro de interpolación: suaviza apenas los bordes de la señal de FFB. En ACC un valor bajo (1–3) limpia sin perder fidelidad.",
        en: "Interpolation filter: lightly smooths the edges of the FFB signal. In ACC a low value (1–3) cleans it up without losing fidelity.",
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
      name: { es: "Gain (ganancia)", en: "Gain" },
      value: "88",
      perBase: {
        gt_dd_pro: "90–100",
        csl_dd: "90–100",
        clubsport_dd: "78–88",
        clubsport_dd_plus: "72–82",
        podium_dd1: "62–72",
        podium_dd2: "55–65",
      },
      whatItDoes: {
        es: "Fuerza total del FFB dentro de ACC, en escala 0–100. Es el ajuste más importante: súbelo hasta que en las curvas más cargadas el medidor de FFB toque el tope sin quedarse clavado en rojo (eso es clipping y hace perder detalle).",
        en: "Overall FFB force inside ACC, on a 0–100 scale. The most important setting: raise it until the FFB meter peaks in the most loaded corners without staying pinned in red (that's clipping and you lose detail).",
      },
      note: {
        es: "Cuanta más fuerza tiene la base, más bajo va el gain.",
        en: "The more torque your base has, the lower the gain.",
      },
    },
    {
      id: "min_force",
      name: { es: "Minimum Force (fuerza mínima)", en: "Minimum Force" },
      value: "0",
      whatItDoes: {
        es: "Compensa la zona muerta de bases de engranaje. En direct drive casi no hace falta: súbelo apenas solo si no se siente el centro.",
        en: "Compensates the deadzone of geared bases. On direct drive it's barely needed: raise it slightly only if you can't feel the center.",
      },
      note: {
        es: "La escala real del slider in-game es 0–100 (no 0–3). En direct drive déjalo en 0; subirlo solo provoca oscilación robótica del centro en recta. Volantes de correa o engranaje (G29/G920/G923, T300) suben a ~8–20 para compensar el centro muerto.",
        en: "The real in-game slider scale is 0–100 (not 0–3). On direct drive leave it at 0; raising it only causes robotic center oscillation on straights. Belt or gear wheels (G29/G920/G923, T300) raise it to ~8–20 to counter a dead center.",
      },
    },
    {
      id: "dynamic_damping",
      name: { es: "Dynamic Damping", en: "Dynamic Damping" },
      value: "100",
      whatItDoes: {
        es: "Agrega peso al volante según la velocidad y el agarre. Da una sensación más realista; en escala 0–100.",
        en: "Adds weight to the wheel based on speed and grip. Gives a more realistic feel; on a 0–100 scale.",
      },
      note: {
        es: "Recomendación estándar en direct drive: 100. Algunos usuarios DD lo bajan un poco por gusto, ya que tapa algo de detalle de alta frecuencia. Volantes de menor par lo bajan más (~22–35) para conservar peso y claridad a alta velocidad.",
        en: "Standard direct-drive recommendation: 100. Some DD users lower it slightly as personal preference, since it masks some high-frequency detail. Lower-torque wheels lower it more (~22–35) to keep weight and clarity at high speed.",
      },
    },
    {
      id: "road_effects",
      name: { es: "Road Effects (efectos de pista)", en: "Road Effects" },
      value: "0",
      whatItDoes: {
        es: "Vibración de la superficie (baches, pianos), en escala 0–100. Preferencia personal: más alto = más textura, pero puede tapar el detalle del agarre.",
        en: "Surface vibration (bumps, kerbs), on a 0–100 scale. Personal preference: higher = more texture, but can mask grip detail.",
      },
      note: {
        es: "Escala 0–100. DD de gama alta: 0 (hasta ~10–15 en DD de entrada). Volantes de correa o engranaje: 20–40 (más en pistas con baches). El número exacto depende del gusto; algunos pilotos DD lo suben porque en ACC amplifica telemetría real de suspensión y neumáticos.",
        en: "Scale 0–100. High-end DD: 0 (up to ~10–15 on entry DD). Belt or gear wheels: 20–40 (more on bumpy tracks). The exact number is taste-dependent; some DD drivers run it high because in ACC it amplifies real suspension and tyre telemetry.",
      },
    },
    {
      id: "frequency",
      name: { es: "Frequency (frecuencia)", en: "Frequency" },
      value: "333 Hz",
      whatItDoes: {
        es: "Tasa de actualización del FFB. Es un ajuste discreto (valores fijos seleccionables), no un slider continuo. Cuanto más alta, más fino el detalle. Usa el valor más alto que la base maneje sin problemas.",
        en: "FFB update rate. It is a discrete setting (a fixed set of selectable values), not a continuous slider. The higher it is, the finer the detail. Use the highest value your base handles cleanly.",
      },
      note: {
        es: "Valores seleccionables: 111 Hz (Logitech G25/G27), 333 Hz (correa: T300, CSL Elite original, G29/G920/G923) y 400 Hz (DD modernas: CSL DD y superiores). La física de ACC corre a 400 Hz, así que en direct drive conviene 400.",
        en: "Selectable values: 111 Hz (Logitech G25/G27), 333 Hz (belt: T300, original CSL Elite, G29/G920/G923) and 400 Hz (modern DD: CSL DD and up). ACC physics run at 400 Hz, so on direct drive 400 is preferable.",
      },
    },
    {
      id: "steer_lock",
      name: { es: "Steer Lock (rotación del volante)", en: "Steer Lock" },
      value: "900°",
      whatItDoes: {
        es: "Define la rotación total que usa el juego. En PC ACC aplica un soft-lock por auto: deja 900° y el juego limita la rotación al valor real de cada GT3 (por ejemplo Audi R8 LMS ~720°, Porsche 991 II GT3 R ~800°).",
        en: "Sets the total rotation the game uses. On PC ACC applies a per-car soft-lock: leave 900° and the game limits rotation to each GT3's real value (e.g. Audi R8 LMS ~720°, Porsche 991 II GT3 R ~800°).",
      },
      note: {
        es: "Ajuste del menú Controller (mandos/controles), no del menú FFB. En consola no hay autoajuste: hay que igualar la rotación al valor real de cada auto manualmente.",
        en: "A Controller (controls) menu setting, not an FFB-menu setting. On console there is no auto-adjust: rotation must be matched to each car's real value manually.",
      },
    },
    {
      id: "steer_linearity",
      name: { es: "Steer Linearity (linealidad de dirección)", en: "Steer Linearity" },
      value: "1.00",
      whatItDoes: {
        es: "Relación entre el giro físico del volante y el giro en el juego. 1.00 es respuesta lineal 1:1, sin curva.",
        en: "Ratio between the physical wheel rotation and the in-game steering. 1.00 is a linear 1:1 response, with no curve.",
      },
      note: {
        es: "Ajuste del menú Controller (mandos/controles), no del menú FFB. Valor probable: menos corroborado que el resto; 1.00 (lineal) es el punto de partida habitual.",
        en: "A Controller (controls) menu setting, not an FFB-menu setting. Likely value: less corroborated than the rest; 1.00 (linear) is the usual starting point.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: deja la base (FFB) al 100% y ajusta la fuerza con el Gain del juego mirando el medidor de FFB. Si el medidor vive en rojo, está saturando (clipping) y se pierde información del agarre.",
      en: "Rule of thumb: leave the base (FFB) at 100% and dial in the force with the in-game Gain while watching the FFB meter. If the meter lives in the red you're clipping and losing grip information.",
    },
    {
      es: "Sube el Gain de a poco hasta que en las curvas más cargadas el medidor llegue al tope justo sin quedarse saturado.",
      en: "Raise the Gain gradually until the meter just reaches the top in the most loaded corners without staying saturated.",
    },
  ],
};

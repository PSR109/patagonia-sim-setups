import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para EA Sports WRC en bases Fanatec Direct Drive.
// EA WRC tiene un menú de FFB propio con varios canales (Vibration & FFB Strength,
// Self-Aligning Torque, Wheel Friction, Tyre Friction, Tyre Slip, Suspension,
// Engine, Collision, Soft Lock, Steering Centre Force). Los canales usan una escala
// de 0 a ~150 donde 100 es el valor neutro/por defecto (se puede pasar de 100).
// Punto de partida de consenso; el detalle fino se ajusta sintiendo que el volante
// no sature (clipping) en los baches y curvas más cargadas.
export const ea_wrcFfb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "540",
      note: {
        es: "En rally conviene una rotación más corta que en circuito para reaccionar rápido a derrapes y horquillas. EA WRC tiene 'soft lock', así que se puede usar 540° o subir a 720° según preferencia. Algunos pilotos dejan SEN en AUTO.",
        en: "In rally a shorter rotation than circuit racing helps react quickly to slides and hairpins. EA WRC has soft lock, so you can run 540° or go up to 720° if you prefer. Some drivers leave SEN on AUTO.",
      },
    },
    { paramId: "FFB", value: "100" },
    {
      paramId: "FFS",
      value: "PEAK",
      note: {
        es: "Opcional. PEAK aprovecha todo el par de la base; LINEAR da una respuesta más predecible al límite.",
        en: "Optional. PEAK uses the base's full torque; LINEAR gives a more predictable response at the limit.",
      },
    },
    {
      paramId: "NDP",
      value: "10–25",
      note: {
        es: "Un poco de amortiguación ayuda a controlar el volante en los baches de la tierra sin matar el detalle. Bájalo si el volante se siente pesado.",
        en: "A little damping helps control the wheel over gravel bumps without killing detail. Lower it if the wheel feels heavy.",
      },
    },
    { paramId: "NFR", value: "OFF–10" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "FEI",
      value: "80–100",
      note: {
        es: "Detalle de baches, piedras y superficie. Bájalo si en tierra rugosa la vibración se vuelve molesta o ruidosa.",
        en: "Detail of bumps, rocks and surface. Lower it if vibration on rough gravel becomes annoying or noisy.",
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
      id: "overall_strength",
      name: {
        es: "Intensidad de vibración y FFB (Vibration & FFB Strength)",
        en: "Vibration & FFB Strength",
      },
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
        es: "Primer ítem del menú de FFB y ajuste maestro de la intensidad general. Súbelo hasta que en los baches y curvas más cargadas el volante esté fuerte pero sin saturar (cuando satura, los detalles finos desaparecen porque la base ya está al máximo). En la práctica el Self-Aligning Torque actúa como master de la fuerza de la dirección, así que ambos se ajustan juntos.",
        en: "First item in the FFB menu and the master control for overall intensity. Raise it until the wheel is strong over the biggest bumps and most loaded corners but without clipping (when it clips, fine detail vanishes because the base is already maxed out). In practice Self-Aligning Torque acts as the de-facto master of the steering force, so the two are tuned together.",
      },
      note: {
        es: "Cuanta más fuerza tiene la base, más bajo va este nivel.",
        en: "The more torque the base has, the lower this level.",
      },
    },
    {
      id: "self_aligning_torque",
      name: { es: "Self-Aligning Torque (par de autoalineación)", en: "Self-Aligning Torque" },
      value: "100–140",
      whatItDoes: {
        es: "Es la fuerza principal de la dirección y actúa como master de facto: el par que devuelve el volante al centro según el agarre del neumático delantero. Es la base de la información de la curva. 100 es el valor neutro; se puede subir hasta ~140 para más cuerpo en las curvas largas y rápidas. Bájalo solo si el conjunto satura.",
        en: "The main steering force and the de-facto master: the torque that returns the wheel to center based on front tyre grip. It's the core cornering information. 100 is the neutral value; it can be raised to ~140 for more body in long, fast corners. Only lower it if the overall feel clips.",
      },
      note: {
        es: "Escala 0 a ~150 (100 = neutro). No conviene pasar de ~150.",
        en: "Scale 0 to ~150 (100 = neutral). Best not to push past ~150.",
      },
    },
    {
      id: "wheel_friction",
      name: { es: "Wheel Friction (fricción del volante)", en: "Wheel Friction" },
      value: "20–34",
      whatItDoes: {
        es: "Agrega peso y fricción al volante en sí, haciendo la dirección más pesada y menos reactiva. Más alto = volante más pesado y puede tapar el detalle fino. Es distinto de Tyre Friction (que viene del neumático).",
        en: "Adds weight and friction to the wheel itself, making the steering heavier and less reactive. Higher = heavier wheel that can bury fine detail. It's distinct from Tyre Friction (which comes from the tyre).",
      },
      note: {
        es: "El rango se puede abrir a 20–50 según el gusto por un volante más o menos pesado.",
        en: "The range can open up to 20–50 depending on how heavy you want the wheel.",
      },
    },
    {
      id: "tyre_friction",
      name: { es: "Tyre Friction (fricción del neumático)", en: "Tyre Friction" },
      value: "45–65",
      whatItDoes: {
        es: "Agrega peso y amortiguación al volante a partir del neumático y acentúa la sensación de subviraje. Más alto = volante más pesado y subviraje más marcado; valores cercanos a 100 generan una pesadez de fondo constante que tapa las señales laterales.",
        en: "Adds weight and damping to the wheel from the tyre and accentuates the understeer feel. Higher = heavier wheel and more pronounced understeer; values near 100 create a constant background heaviness that masks the lateral signals.",
      },
      note: {
        es: "El slider usa la misma escala que el resto (0 a ~150, 100 = neutro). El rango ~6 a 65 es de valores recomendados, no el tope del slider: las guías de Fanatec rondan 45–65, y valores muy bajos como 6 son típicos de volantes de engranaje.",
        en: "The slider uses the same scale as the others (0 to ~150, 100 = neutral). The ~6 to 65 figure is a recommended value range, not the slider's ceiling: Fanatec guides sit around 45–65, and very low values like 6 are typical of geared wheels.",
      },
    },
    {
      id: "tyre_slip",
      name: { es: "Tyre Slip (deslizamiento del neumático)", en: "Tyre Slip" },
      value: "85–120",
      whatItDoes: {
        es: "Vibración cuando los neumáticos patinan o deslizan: wheelspin al acelerar y pérdida de agarre por sobreviraje o subviraje. Es la alerta de deslizamiento, distinta de Tyre Friction (que aporta peso). 85–90 es un punto de partida equilibrado.",
        en: "Vibration when the tyres spin or slide: wheelspin under acceleration and loss of grip from oversteer or understeer. It's the slip warning, distinct from Tyre Friction (which adds weight). 85–90 is a balanced starting point.",
      },
      note: {
        es: "Escala 0 a ~150 (100 = neutro). Se puede subir hasta ~120 para una alerta de deslizamiento más marcada.",
        en: "Scale 0 to ~150 (100 = neutral). Can be raised to ~120 for a more pronounced slip warning.",
      },
    },
    {
      id: "suspension",
      name: { es: "Suspension (suspensión)", en: "Suspension" },
      value: "90–130",
      whatItDoes: {
        es: "Transmite los baches y las transferencias de peso de la suspensión. Más alto = más textura del terreno; bájalo en tierra muy rugosa si tapa el detalle del agarre.",
        en: "Transmits suspension bumps and weight transfers. Higher = more terrain texture; lower it on very rough gravel if it masks grip detail.",
      },
      note: {
        es: "Escala 0 a ~150 (100 = neutro). No conviene pasar de ~150.",
        en: "Scale 0 to ~150 (100 = neutral). Best not to push past ~150.",
      },
    },
    {
      id: "engine",
      name: { es: "Engine (motor)", en: "Engine" },
      value: "95–100",
      whatItDoes: {
        es: "Vibración del motor en el volante. Aporta sensación de revoluciones y ritmo del motor; bájalo si prefieres que no tape la información del agarre y la superficie.",
        en: "Engine vibration in the wheel. Adds a sense of revs and engine rhythm; lower it if you'd rather it didn't mask grip and surface information.",
      },
      note: {
        es: "Escala 0 a ~150 (100 = neutro). No conviene pasar de ~150.",
        en: "Scale 0 to ~150 (100 = neutral). Best not to push past ~150.",
      },
    },
    {
      id: "collision",
      name: { es: "Collision (colisiones)", en: "Collision" },
      value: "60–120",
      whatItDoes: {
        es: "Fuerza de los golpes contra piedras, cunetas y obstáculos. Útil para sentir cuándo se salió de la línea; bájalo si los golpes son demasiado violentos para la base.",
        en: "Strength of impacts against rocks, ditches and obstacles. Useful to feel when you've left the line; lower it if hits are too violent for your base.",
      },
      note: {
        es: "Escala 0 a ~150 (100 = neutro). No conviene pasar de ~150.",
        en: "Scale 0 to ~150 (100 = neutral). Best not to push past ~150.",
      },
    },
    {
      id: "soft_lock",
      name: { es: "Soft Lock (tope virtual de dirección)", en: "Soft Lock" },
      value: "ON (100)",
      whatItDoes: {
        es: "Crea un tope de dirección por software que coincide con el ángulo real del coche, para que el volante no gire más allá del bloqueo del auto. Recomendado en bases direct drive.",
        en: "Creates a software steering stop matching the car's real lock, so the wheel can't turn beyond the car's limit. Recommended on direct drive bases.",
      },
      note: {
        es: "Su intensidad usa la misma escala 0 a ~150 (100 = neutro); algunas guías la dejan entre 75 y 150 según la dureza del tope.",
        en: "Its strength uses the same 0 to ~150 scale (100 = neutral); some guides leave it between 75 and 150 depending on how hard the stop should feel.",
      },
    },
    {
      id: "steering_centre_force",
      name: { es: "Steering Centre Force (fuerza de centrado)", en: "Steering Centre Force" },
      value: "ON u OFF (preferencia)",
      whatItDoes: {
        es: "Centra el volante en la largada y después de un reset o recuperación del coche. No afecta la conducción: es solo preferencia personal sobre cómo (o si) el volante se auto-centra cuando el auto está detenido. Algunas guías lo dejan ON con Scale 100; otras lo dejan OFF.",
        en: "Centers the wheel at the stage start and after a reset or car recovery. It doesn't affect driving: it's purely a personal preference about how (or whether) the wheel self-centers while the car is stationary. Some guides leave it ON with Scale 100; others leave it OFF.",
      },
    },
    {
      id: "steering_centre_force_scale",
      name: {
        es: "Steering Centre Force Scale (escala del centrado)",
        en: "Steering Centre Force Scale",
      },
      value: "0–100",
      whatItDoes: {
        es: "Regula la intensidad del centrado en la largada y tras un reset, cuando Steering Centre Force está activo. Con Steering Centre Force en ON, 100 da el centrado más firme. Tampoco afecta la conducción.",
        en: "Sets how strong the centering is at the start and after a reset, when Steering Centre Force is active. With Steering Centre Force ON, 100 gives the firmest centering. It doesn't affect driving either.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: deje la base (FFB) al 100% y ajuste la fuerza con Vibration & FFB Strength y Self-Aligning Torque dentro del juego. Si el volante se siente 'plano' en los picos (los baches y curvas fuertes ya no se notan más fuertes que el resto), está saturando (clipping) y se pierde información del agarre.",
      en: "Rule of thumb: leave the base (FFB) at 100% and dial in the force with Vibration & FFB Strength and Self-Aligning Torque in-game. If the wheel feels 'flat' at the peaks (big bumps and hard corners no longer feel stronger than the rest), you're clipping and losing grip information.",
    },
    {
      es: "Los canales del juego se muestran en porcentaje, con 100% como valor por defecto/neutro, y se pueden subir por encima de 100. Las guías y los usuarios suelen llegar hasta ~130–150 (p. ej. SAT 140, Suspension 130); ~150 es un límite práctico recomendado, no el tope oficial del slider.",
      en: "The in-game channels are shown as percentages, with 100% as the default/neutral value, and can be pushed above 100. Guides and users commonly go up to ~130–150 (e.g. SAT 140, Suspension 130); ~150 is a practical recommended limit, not the slider's official ceiling.",
    },
    {
      es: "Suba Vibration & FFB Strength y Self-Aligning Torque de a poco hasta que los baches grandes y las curvas más cargadas se sientan fuertes pero sigan teniendo detalle por encima.",
      en: "Raise Vibration & FFB Strength and Self-Aligning Torque gradually until big bumps and the most loaded corners feel strong but still have detail on top.",
    },
    {
      es: "En tierra rugosa, si el volante se vuelve violento o ruidoso, baje Suspension y Collision antes que la fuerza general: así conserva la fuerza del agarre sin que los golpes cansen.",
      en: "On rough gravel, if the wheel gets violent or noisy, lower Suspension and Collision before the overall force: that keeps grip force while making impacts less tiring.",
    },
  ],
};

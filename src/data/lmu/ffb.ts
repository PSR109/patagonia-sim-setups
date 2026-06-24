import type { GameFfb } from "@/lib/types";

// Recomendaciones de FFB para Le Mans Ultimate en bases Fanatec Direct Drive.
// LMU hereda el motor de FFB de rFactor 2: es muy detallado y "crudo" (manda
// poco o ningún efecto sintético), por lo que conviene poco filtrado en la base
// y ajustar la fuerza con el Force Feedback Strength mirando que no sature.
// El menú de FFB in-game de LMU es GLOBAL: no hay multiplicador por coche.
export const lmuFfb: GameFfb = {
  controlPanel: [
    {
      paramId: "SEN",
      value: "AUTO",
      note: {
        es: "LMU (motor rFactor 2) fija la rotación correcta de cada auto cuando SEN está en AUTO.",
        en: "LMU (rFactor 2 engine) sets the correct rotation per car when SEN is on AUTO.",
      },
    },
    { paramId: "FFB", value: "100" },
    {
      paramId: "FFS",
      value: "PEAK",
      note: {
        es: "Opcional. PEAK aprovecha todo el par de la base; usa LINEAR si quieres una respuesta más predecible al límite.",
        en: "Optional. PEAK uses the base's full torque; use LINEAR if you want a more predictable response at the limit.",
      },
    },
    {
      paramId: "NDP",
      value: "5–15",
      note: {
        es: "El FFB de rF2/LMU ya es muy detallado: poca amortiguación alcanza para calmar oscilaciones en recta sin tapar el detalle.",
        en: "The rF2/LMU FFB is already very detailed: a little damping is enough to calm straight-line oscillation without masking detail.",
      },
    },
    { paramId: "NFR", value: "OFF–5" },
    { paramId: "NIN", value: "OFF" },
    {
      paramId: "INT",
      value: "OFF–2",
      note: {
        es: "El motor rF2/LMU manda una señal muy detallada pero algo cruda; una interpolación leve (1–2) la suaviza sin tapar el detalle ni agregar latencia notable. Déjalo en OFF si tu base maneja bien la señal cruda.",
        en: "The rF2/LMU engine sends a very detailed but somewhat raw signal; light interpolation (1–2) smooths it without masking detail or adding noticeable latency. Leave it OFF if your base handles the raw signal well.",
      },
    },
    {
      paramId: "FEI",
      value: "90–100",
      note: {
        es: "LMU manda mucho detalle de pista; FEI alto lo deja pasar tal cual. Bájalo si sientes vibración o ruido molesto.",
        en: "LMU sends lots of road detail; high FEI lets it through as-is. Lower it if you feel annoying vibration or noise.",
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
      id: "ffb_strength",
      name: { es: "Force Feedback Strength (fuerza global)", en: "Force Feedback Strength" },
      value: "85–95%",
      perBase: {
        gt_dd_pro: "90%",
        csl_dd: "90%",
        clubsport_dd: "85–90%",
        clubsport_dd_plus: "80–90%",
        podium_dd1: "70–85%",
        podium_dd2: "60–75%",
      },
      whatItDoes: {
        es: "Ganancia global del FFB dentro de LMU (el menú es único para todos los coches). Es el slider que se baja para no saturar: ajústalo hasta que en las curvas más cargadas el medidor de FFB del juego llegue al tope sin quedarse pegado en rojo (eso es clipping y se pierde detalle del agarre).",
        en: "Global FFB gain inside LMU (the menu is the same for every car). This is the slider you lower to avoid clipping: set it so the in-game FFB meter peaks in the most loaded corners without staying pinned in red (that's clipping and you lose grip detail).",
      },
      note: {
        es: "Default 100%. En bases de menor par conviene ~85–95% (~90% por debajo de 10 Nm); en bases muy fuertes (más de 18–20 Nm) bajar hacia ~60% porque al 100% se siente excesivo.",
        en: "Default 100%. On lower-torque bases use ~85–95% (~90% under 10 Nm); on very strong bases (over 18–20 Nm) lower toward ~60%, since 100% feels excessive.",
      },
    },
    {
      id: "steering_torque_capability",
      name: { es: "Steering Torque Capability (par de la base)", en: "Steering Torque Capability" },
      value: "≈ par pico de su base",
      perBase: {
        gt_dd_pro: "8",
        csl_dd: "8",
        clubsport_dd: "15",
        clubsport_dd_plus: "18",
        podium_dd1: "20",
        podium_dd2: "25",
      },
      whatItDoes: {
        es: "Indica al juego el par pico (en Nm) que entrega su base. Es uno de los ajustes más importantes: bien fijado corrige las oscilaciones feas en recta y suaviza la base direct drive. Se setea igual al par pico de la base (base de 20 Nm → 20).",
        en: "Tells the game the peak torque (in Nm) your base delivers. One of the most important settings: set correctly it fixes the ugly straight-line oscillation and smooths the direct drive base. Set it equal to your base's peak torque (a 20 Nm base → 20).",
      },
      note: {
        es: "CSL DD: 5 sin Boost Kit (8 solo con Boost Kit 180 o la versión 8 Nm). Confianza media: el nombre exacto del ítem puede variar según el parche.",
        en: "CSL DD: 5 without the Boost Kit (8 only with the 180 Boost Kit or the 8 Nm version). Medium confidence: the exact item name may vary by patch.",
      },
    },
    {
      id: "ffb_smoothing",
      name: { es: "Smoothing (suavizado)", en: "Smoothing" },
      value: "0",
      whatItDoes: {
        es: "Filtra/suaviza la señal de FFB. En direct drive conviene dejarlo en 0 (rango seguro 0–2) para no perder el detalle que hace bueno al motor de rF2; súbelo apenas solo si sientes ruido o granulado molesto.",
        en: "Filters/smooths the FFB signal. On direct drive keep it at 0 (safe range 0–2) so you don't lose the detail that makes the rF2 engine good; raise it slightly only if you feel noise or notchiness.",
      },
    },
    {
      id: "ffb_minimum_torque",
      name: { es: "Minimum Steering Torque (fuerza mínima)", en: "Minimum Steering Torque" },
      value: "0%",
      whatItDoes: {
        es: "Compensa la zona muerta de bases de engranaje. En direct drive déjalo en 0%: el propio juego advierte que no conviene usarlo en bases direct drive (solo ayuda algo en bases muy débiles de 5 Nm o menos).",
        en: "Compensates the deadzone of geared bases. On direct drive leave it at 0%: the game itself warns against using it on direct drive bases (it only helps marginally on very weak bases of 5 Nm or less).",
      },
    },
    {
      id: "steering_torque_sensitivity",
      name: { es: "Steering Torque Sensitivity (sensibilidad)", en: "Steering Torque Sensitivity" },
      value: "100%",
      whatItDoes: {
        es: "Ajusta la sensibilidad de la respuesta de par. En direct drive déjalo en 100% para que el resto del FFB funcione correctamente.",
        en: "Adjusts the sensitivity of the torque response. On direct drive leave it at 100% so the rest of the FFB works correctly.",
      },
      note: {
        es: "Default 100%. Se puede subir por encima de 100% en bases de baja potencia (DD de menos de 8 Nm) para más fuerza a baja velocidad.",
        en: "Default 100%. It can be raised above 100% on low-power bases (DD under 8 Nm) for more force at low speed.",
      },
    },
    {
      id: "collision_strength",
      name: { es: "Collision Strength (fuerza de impactos)", en: "Collision Strength" },
      value: "100%",
      whatItDoes: {
        es: "Define con cuánta fuerza reacciona el volante ante choques e impactos. En direct drive Fanatec conviene 100%: reduce los tirones y el clipping en impactos fuertes.",
        en: "Sets how strongly the wheel reacts to collisions and impacts. On Fanatec direct drive use 100%: it reduces wheel yank and clipping on high-impact collisions.",
      },
      note: {
        es: "Default 150%. En bases de correa/engranaje de menor par suele dejarse en el default de 150%.",
        en: "Default 150%. On lower-torque belt/gear bases it's often left at the 150% default.",
      },
    },
    {
      id: "ffb_effects",
      name: { es: "Force Feedback Effects (interruptor maestro)", en: "Force Feedback Effects" },
      value: "ON",
      whatItDoes: {
        es: "Interruptor maestro del Force Feedback. Debe estar en ON: con OFF no sentirás ninguna fuerza en el volante. Es lo primero que conviene revisar si el FFB no funciona.",
        en: "Master Force Feedback switch. Must be ON: with it OFF you'll feel no force at the wheel. It's the first thing to check if FFB isn't working.",
      },
    },
    {
      id: "invert_ffb",
      name: { es: "Invert FFB (invertir FFB)", en: "Invert FFB" },
      value: "OFF",
      whatItDoes: {
        es: "Invierte la polaridad de la señal de FFB. En bases Fanatec Direct Drive déjalo en OFF: así el volante se centra y reacciona correctamente. Solo algunas direcciones de engranaje antiguas necesitan invertirlo.",
        en: "Inverts the FFB signal polarity. On Fanatec Direct Drive bases leave it OFF: the wheel then centers and reacts correctly. Only some older geared wheels need it inverted.",
      },
    },
    {
      id: "constant_steering_force",
      name: { es: "Use Constant Steering Force Effect", en: "Use Constant Steering Force Effect" },
      value: "OFF",
      whatItDoes: {
        es: "Activa un efecto de centrado constante pensado para volantes muy antiguos que no reproducen bien el FFB por telemetría. En bases Fanatec Direct Drive déjalo en OFF: el FFB físico de la base ya entrega esa información. No lo confundas con Invert FFB.",
        en: "Enables a constant centering-force effect meant for very old wheels that can't reproduce telemetry-based FFB well. On Fanatec Direct Drive bases leave it OFF: the base's physical FFB already delivers that information. Don't confuse it with Invert FFB.",
      },
    },
  ],
  notes: [
    {
      es: "Regla de oro: deje la base (FFB) al 100% y ajuste la fuerza con el Force Feedback Strength mirando el medidor de FFB del juego. Si el medidor vive en rojo, hay saturación (clipping) y se pierde información del agarre.",
      en: "Rule of thumb: leave the base (FFB) at 100% and dial in the force with Force Feedback Strength while watching the in-game FFB meter. If the meter lives in the red you're clipping and losing grip information.",
    },
    {
      es: "El menú de FFB de LMU es global (no hay multiplicador por coche). Lo más importante es fijar Steering Torque Capability al par pico de la base y luego ajustar Force Feedback Strength para no saturar.",
      en: "LMU's FFB menu is global (no per-car multiplier). The key is to set Steering Torque Capability to your base's peak torque and then dial in Force Feedback Strength to avoid clipping.",
    },
    {
      es: "El FFB de LMU/rF2 ya entrega mucho detalle natural: mantenga el suavizado y los efectos de la base al mínimo y deje que el motor del juego haga el trabajo.",
      en: "LMU/rF2 FFB already delivers lots of natural detail: keep smoothing and base effects to a minimum and let the game's engine do the work.",
    },
  ],
};

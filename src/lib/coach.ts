import type { LocalizedText, Symptom, Track } from "@/lib/types";

// ── Capa de coaching ────────────────────────────────────────────────────────
// El tiempo en pista sale del MANEJO, no del setup (el setup bueno vale ~1% de
// vuelta; la técnica y la consistencia, 5–15%). Por eso, además del cambio de
// setup que calcula el motor, cada síntoma trae su fix de TÉCNICA: física
// universal, verdadera para cualquier auto/juego. Nada de puntos de frenada
// inventados por pista (no se pueden verificar y, si están mal, hacen MÁS lento
// al piloto). Strings locales: no tocan el diccionario global (igual que FfbPanel).

// Qué hacer con el VOLANTE/PEDALES ante cada síntoma. Complementa el ajuste de
// setup; muchas veces el problema es de manejo y el setup solo lo tapa.
export const drivingTips: Record<Symptom, LocalizedText> = {
  understeer_entry: {
    es: "El frente no gira al entrar. Frena un toque antes y suelta el freno de forma PROGRESIVA mientras giras (trail-braking): eso carga el eje delantero y le da mordida. No metas toda la dirección de golpe.",
    en: "The front won't turn on entry. Brake a touch earlier and release the brake PROGRESSIVELY as you turn (trail-braking): it loads the front axle and gives it bite. Don't dump all the steering at once.",
  },
  understeer_mid: {
    es: "Subviraje en el medio: estás pidiendo más agarre del que hay. Baja la velocidad de entrada, espera a pasar el ápex y abre la dirección recién cuando el auto empieza a rotar. Mira más adelante, no a la trompa.",
    en: "Mid-corner understeer: you're asking for more grip than there is. Lower entry speed, wait past the apex and unwind the steering only once the car starts to rotate. Look further ahead, not at the nose.",
  },
  understeer_exit: {
    es: "Subviraje a la salida: abriste el acelerador muy temprano o muy brusco. Espera a tener el auto más derecho y dosifica el gas de forma progresiva.",
    en: "Corner-exit understeer: you got on the throttle too early or too abruptly. Wait until the car is straighter and feed the throttle in progressively.",
  },
  oversteer_entry: {
    es: "La cola se suelta al entrar: estás frenando muy tarde o soltando el freno de golpe con el auto girando. Libera el freno más suave y evita frenar fuerte mientras ya estás doblando.",
    en: "The rear steps out on entry: you're braking too late or releasing the brake abruptly while turning. Release the brake more smoothly and avoid heavy braking once you're already turning.",
  },
  oversteer_mid: {
    es: "Sobreviraje a media curva (lift-off): soltaste el acelerador de golpe y la carga se fue al frente. Mantén un hilo de gas estable en el medio; no levantes brusco.",
    en: "Mid-corner oversteer (lift-off): you lifted the throttle suddenly and load shifted forward. Keep a steady sliver of throttle through the middle; don't lift abruptly.",
  },
  oversteer_exit: {
    es: "La cola patina a la salida: demasiado acelerador con el auto todavía girando. Aplica el gas progresivo y espera a enderezar; cuidado con el golpe de turbo/torque.",
    en: "The rear spins on exit: too much throttle with the car still turning. Feed the throttle progressively and wait to straighten up; watch the turbo/torque hit.",
  },
  braking_instability: {
    es: "Inestable al frenar: frena en línea recta ANTES de girar y suelta progresivo. No mezcles freno fuerte con dirección. Si sigue, lleva un poco el reparto de frenos hacia adelante.",
    en: "Unstable under braking: brake in a straight line BEFORE turning and release progressively. Don't mix hard braking with steering. If it persists, move brake bias slightly forward.",
  },
  poor_traction: {
    es: "Patina al acelerar: gas más progresivo a la salida y espera a que el auto se enderece antes del full throttle. Si patina en 1.ª/2.ª, una marcha más larga ayuda.",
    en: "Spins up under power: feed the throttle more progressively on exit and wait for the car to straighten before full throttle. If it spins in 1st/2nd, a longer gear helps.",
  },
  tyres_overheat: {
    es: "Gomas recalentadas: casi siempre es sobreconducción — demasiado deslizamiento y correcciones. Maneja más limpio y suave, desliza menos. En carrera, gestiona el stint y no abuses temprano.",
    en: "Tyres overheating: it's almost always overdriving — too much sliding and correcting. Drive cleaner and smoother, slide less. In a race, manage the stint and don't abuse them early.",
  },
  tyres_cold: {
    es: "Gomas frías sin temperatura: en el out-lap haz zigzag y frena fuerte para meter calor; en clasi, una vuelta de preparación. No ataques con la goma fría.",
    en: "Cold tyres with no temperature: on the out-lap weave and brake hard to build heat; in qualifying, do a prep lap. Don't attack on cold rubber.",
  },
  bouncing: {
    es: "Rebote/porpoising en recta: es aerodinámico/altura, no de manejo (lo arregla el setup: más altura o más rigidez). Mientras tanto, evita pianos a alta velocidad.",
    en: "Bouncing/porpoising on straights: it's aero/ride-height, not driving (the setup fixes it: more ride height or stiffer). Meanwhile, avoid kerbs at high speed.",
  },
  kerb_instability: {
    es: "Inestable en los pianos: usa menos piano y tómalo más plano, con el auto ya estable. No cargues pianos en plena transición de peso.",
    en: "Unstable over kerbs: use less kerb and take it flatter, with the car already settled. Don't load kerbs mid weight-transfer.",
  },
};

// Variantes de RALLY para los tips que en circuito hablan de pianos/aero/box. En
// rally esos conceptos no existen (no hay pianos, no hay carga aero real, no hay
// out-lap): la física del consejo cambia. Solo se sobrescriben los síntomas cuya
// versión de circuito sería falsa en una etapa; el resto (subviraje, sobreviraje,
// frenada, tracción…) es universal y se hereda de `drivingTips`.
export const drivingTipsRally: Partial<Record<Symptom, LocalizedText>> = {
  bouncing: {
    es: "El auto rebota / toca fondo en compresiones, baches o aterrizajes (no es aero como en circuito). No lo ataques plano: levanta un toque antes de las crestas y los saltos grandes y deja que la suspensión se asiente antes de volver a cargar. Si rebota seguido, lo termina de arreglar el setup (más altura o más compresión rápida).",
    en: "The car bounces / bottoms out over compressions, bumps or landings (it's not aero like on a circuit). Don't attack them flat: lift a touch before crests and big jumps and let the suspension settle before loading again. If it keeps bouncing, the setup finishes the fix (more ride height or more fast bump).",
  },
  kerb_instability: {
    es: "Inestable en saltos y baches: aterriza con el auto lo más derecho posible y sin freno ni gas brusco. En terreno roto, manos suaves y deja que el auto flote — no metas dirección de golpe sobre un bache, te saca de línea.",
    en: "Unstable over jumps and bumps: land with the car as straight as possible and no abrupt brake or throttle. On broken ground, soft hands and let the car float — don't snap steering over a bump, it knocks you off line.",
  },
  tyres_cold: {
    es: "Gomas frías en tramos alpinos o de nieve: no ataques el primer kilómetro. La goma muerde menos de lo que parece hasta que toma temperatura — sube el ritmo poco a poco y deja margen en las primeras curvas.",
    en: "Cold tyres on alpine or snow stages: don't attack the first kilometre. The tyre bites less than it looks until it warms up — build pace gradually and leave margin in the first corners.",
  },
};

// Devuelve el tip de manejo para un síntoma, usando la variante de rally cuando
// existe y el juego es de rally. Mantiene un único punto de verdad por disciplina.
export function drivingTipFor(symptom: Symptom, isRally: boolean): LocalizedText {
  return (isRally && drivingTipsRally[symptom]) || drivingTips[symptom];
}

export interface CoachTip {
  title: LocalizedText;
  body: LocalizedText;
}

// Guía por CARÁCTER de pista. Para circuito usa cornerProfile; para rally, la
// superficie. Es estrategia general (dónde se gana el tiempo), no referencias
// puntuales: eso es defendible y verdadero sin telemetría por pista.
export function trackPlaybook(track?: Track): CoachTip[] {
  if (!track) return [];
  const tips: CoachTip[] = [];

  if (track.kind === "stage") {
    const surface = track.surface ?? "gravel";
    const bySurface: Record<string, CoachTip> = {
      gravel: {
        title: { es: "Grava", en: "Gravel" },
        body: {
          es: "La línea más limpia NO es la más rápida. Usa el peralte, deja que el auto se mueva y deslice un poco, y anticipa con las notas. Freno de mano en las horquillas cerradas.",
          en: "The cleanest line is NOT the fastest. Use the banking, let the car move and slide a little, and anticipate with the notes. Handbrake for tight hairpins.",
        },
      },
      snow: {
        title: { es: "Nieve / hielo", en: "Snow / ice" },
        body: {
          es: "Suavidad extrema: todo anticipado y progresivo, nada brusco. Con clavos la goma muerde más de lo que parece — confía, pero sin movimientos secos.",
          en: "Extreme smoothness: everything anticipated and progressive, nothing abrupt. With studs the tyre bites more than it looks — trust it, but no sharp inputs.",
        },
      },
      tarmac: {
        title: { es: "Asfalto (rally)", en: "Tarmac (rally)" },
        body: {
          es: "Manéjalo como circuito: preciso, frenadas más tardías y usa todo el ancho del camino. Hay más agarre que en grava, así que puedes ser más agresivo con la dirección.",
          en: "Drive it like a circuit: precise, later braking and use the full width of the road. There's more grip than gravel, so you can be more aggressive with steering.",
        },
      },
      mixed: {
        title: { es: "Superficie mixta", en: "Mixed surface" },
        body: {
          es: "El agarre cambia dentro del tramo. Deja margen, lee la superficie y adapta: lo que funciona en lo seco te tira en el parche de hielo o tierra.",
          en: "Grip changes within the stage. Leave margin, read the surface and adapt: what works on dry will catch you out on the ice or dirt patch.",
        },
      },
    };
    tips.push(bySurface[surface] ?? bySurface.gravel);
    return tips;
  }

  const profile = track.cornerProfile ?? "mixed";
  const byProfile: Record<string, CoachTip> = {
    "high-speed": {
      title: { es: "Trazado rápido", en: "Fast layout" },
      body: {
        es: "Aquí el tiempo se gana con COMPROMISO en las curvas rápidas: cuanto más confías, más rápido. Mínima corrección de dirección, entradas suaves, deja que el aero trabaje. Medio segundo de duda en una rápida cuesta más que cualquier lenta.",
        en: "Here time is won with COMMITMENT in the fast corners: the more you trust, the faster you go. Minimal steering correction, smooth entries, let the aero work. Half a second of hesitation in a fast corner costs more than any slow one.",
      },
    },
    "low-speed": {
      title: { es: "Trazado lento / técnico", en: "Slow / technical layout" },
      body: {
        es: "El tiempo está en TRACCIÓN y ROTACIÓN: frena fuerte y derecho, rota el auto en el punto de giro y abre el gas progresivo y temprano sin patinar. Las salidas de las lentas definen la vuelta.",
        en: "Time lives in TRACTION and ROTATION: brake hard and straight, rotate the car at the turn-in point and open the throttle early and progressively without spinning. Slow-corner exits define the lap.",
      },
    },
    mixed: {
      title: { es: "Trazado mixto", en: "Mixed layout" },
      body: {
        es: "Premia la CONSISTENCIA: no sobreconduzcas las lentas justo después de una rápida. Adapta el ritmo sector a sector y busca fluir, no atacar cada curva al máximo.",
        en: "Rewards CONSISTENCY: don't overdrive the slow corners right after a fast one. Adapt your pace sector by sector and aim to flow, not to attack every corner at the max.",
      },
    },
  };
  tips.push(byProfile[profile] ?? byProfile.mixed);

  if (track.lengthKm && track.lengthKm >= 7) {
    tips.push({
      title: { es: "Pista larga", en: "Long track" },
      body: {
        es: "Trazado largo: divídelo en sectores mentales y memoriza una referencia por curva. Un error temprano te cuesta toda la vuelta — prioridad a la limpieza sobre el ataque.",
        en: "Long layout: split it into mental sectors and memorise one reference per corner. An early mistake costs you the whole lap — prioritise cleanliness over attack.",
      },
    });
  }
  return tips;
}

// Método universal para BAJAR tiempos. No depende del juego ni del auto: es cómo
// se practica para encontrar tiempo de verdad (no una vuelta suelta irrepetible).
export const practicePlan: CoachTip[] = [
  {
    title: { es: "1 · Consistencia antes que velocidad", en: "1 · Consistency before speed" },
    body: {
      es: "Haz 8–10 vueltas dentro de 0.5 s entre sí ANTES de buscar el límite. El tiempo sale de repetir bien, no de una vuelta mágica que no puedes copiar.",
      en: "Do 8–10 laps within 0.5 s of each other BEFORE chasing the limit. Time comes from repeating well, not from a magic lap you can't reproduce.",
    },
  },
  {
    title: { es: "2 · Un sector por vez", en: "2 · One sector at a time" },
    body: {
      es: "Elige tu PEOR sector y trabaja solo ese. Mejorar todo a la vez no funciona: aísla una zona, encuentra la referencia y recién pasa a la siguiente.",
      en: "Pick your WORST sector and work only on that. Improving everything at once doesn't work: isolate one zone, find the reference, then move to the next.",
    },
  },
  {
    title: { es: "3 · Caza la frenada", en: "3 · Hunt the braking point" },
    body: {
      es: "La mayor parte del tiempo se pierde frenando de más o muy temprano. Prueba frenar 5 m más tarde cada vuelta hasta pasarte de largo; después retrocede un toque: ahí está tu punto.",
      en: "Most lap time is lost braking too much or too early. Try braking 5 m later each lap until you overshoot; then back off a touch: that's your point.",
    },
  },
];

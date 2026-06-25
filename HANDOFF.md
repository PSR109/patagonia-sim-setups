# HANDOFF — App de Setups Patagonia Sim Racing

> Documento para **retomar el trabajo en otra sesión** sin perder contexto.
> Última actualización: 2026-06-25 (cierre de sesión; ver ▶ PRÓXIMA SESIÓN. Iteración 19: estilo de manejo (nivel piloto + balance + suavidad, 3 ejes con palancas separadas: aids/freno · barras/ala/diff · amortiguador) + condiciones data-driven por juego (cada sim declara `conditionFields`; ACC/LMU suman hora del día; AC Rally suma temp pista) — nuevo `styleRules` en GameData + motor + form; tsc 0 / validate-engine 0 / verificado en vivo. PENDIENTE PRIORITARIO próxima sesión: completar TODAS las pistas/etapas (faltan en varios juegos). Iteración 18: auditoría multiagente full (13 dimensiones, 106 agentes, 30 hallazgos confirmados) + fixes aplicados y commiteados — física EA WRC `weather_wet` y AC EVO `oversteer_exit` (signos invertidos), bundle split (game-metas.ts, ningún cliente importa registry), lote a11y en generator.tsx, html lang en toggle, baseFor snap, FFB LMU torque, voseo+usted→tuteo (0 restantes), tsx devDep; verificado tsc 0 / validate-engine 0 / build verde; ver §3p. Iteración 17: F1 25 e iRacing ELIMINADOS de la app (fuera de alcance; quedan 5 sims; commit+push hechos; ver §3o). Iteración 16: LMU reconstruido contra DOS capturas in-game (Hypercar Alpine A424 #35 + LMGT3 McLaren 720S Evo #59, Bahrain) → modelo de 2 clases: 45 params universales + extras solo-Hypercar (heave, muelle de goma, diff power/inercia, híbrido regen/mapa eléctrico, diff delantero) + extra solo-LMGT3 (ABS) + paramOverrides de clase LMGT3 (ala en grados, dampers 0-50, defaults del McLaren); ver §3n. Iteración 15: AC EVO reconstruido contra captura in-game (Porsche 992 GT3 R, modo Carrera, v0.7.1, 6 pestañas → 29 params, era 35; el editor REAL no expone caja/diff power-coast/freno aparte/dampers rápidos/splitter → se eliminaron; ver §3m); iteración 14: ACC reconstruido contra captura in-game (Ferrari 296 GT3, preset Seguridad, 6 pestañas → 39 params, era 16; ver §3l); iteración 13: EA WRC reconstruido contra captura in-game (Ford Puma Rally1, 33 params, rangos exactos); iteración 12: AC Rally reconstruido (i20 N Rally2, 36 params, rangos estimados); iteración 11: 2º pase adversarial perf/errores/UX — 7 fixes, §3k; iteración 10: seguridad/a11y — 5 bugs, §3j; iteración 9: FFB en §3i). F1 25 e iRacing: ELIMINADOS de la app en iteración 17 (§3o).

---

## ▶ PRÓXIMA SESIÓN — empezar acá (actualizado 2026-06-25, cierre iteración 25)

> **North star (memoria product-north-star):** que los clientes **bajen tiempos**, no cobrar aún.
> El tiempo viene del MANEJO (~5–15% de una vuelta) mucho más que del setup (~1%). Por eso el valor
> es coaching + datos verificados, no visuales.
>
> **Regla dura:** nunca inventar datos por-pista/por-coche no verificables — una referencia errónea
> hace al piloto MÁS lento. Solo física universal o captura verificada in-game.
>
> **Bypass de auth (`DEV_NO_AUTH` en `src/lib/auth/current-user.ts` + `src/proxy.ts`):** SIEMPRE
> queda FUERA del repo público. Se modifica local para testear pero NUNCA se commitea (quedan como
> `M` en `git status` a propósito).

**Los 3 niveles del foso (moat) — COMPLETOS.** Loop de mejora cerrado punta a punta:
diagnosticar (síntoma→técnica) → generar setup → exportar al juego → manejar → medir progreso.

**Iteración 25 (HECHA 2026-06-25): A/B de setups + tiempo-objetivo, endurecido por review adversarial.**
commit `2df9705`, pusheado. Pedido de Patricio: *"hazlas"* (ideas post-trío #2 y #3).
- **A/B de setups** (`src/components/lap-comparator.tsx`): por combo, "qué setup fue más rápido" —
  mejor vuelta por setup ETIQUETADO, marca el más rápido + deltas. Vueltas sin etiqueta EXCLUIDAS
  del veredicto (comparar contra setup desconocido = dato engañoso). Etiquetas agrupadas insensibles
  a mayúsculas/espacios ("Soft"=="soft"). Usa `LapRecord.setupRef` ya existente — sin cambio schema/API.
- **Tiempo-objetivo**: objetivo por combo en localStorage (SSR-safe, leído en effect), gap + barra de
  progreso desde el primer intento, `role="alert"` en input inválido.
- **Endurecido por review multiagente adversarial (run wf_4319b333; 1 high + 3 med + 7 low, todos
  reales aplicados):** `setupRef` con `max(40)` **server-side** en `api/laps/route.ts` (antes solo el
  `maxLength` del cliente → hueco storage/DoS); orden de vueltas determinista
  (`[{createdAt:desc},{id:desc}]` en API y `garage/page.tsx`); `parseLapToMs` acepta segundos-solo ≥60s
  ("83.456"=1:23.456) según su contrato — el guard ≥60 solo aplica a formato con `:` (fix en AMBAS
  copias: comparator + `generator.tsx`); a11y (label localizado en botón borrar + `role="progressbar"`
  con aria); banner de mejora en magnitud positiva.
- **Verificado:** tsc 0 · validate-engine 0 · `next build` verde · HIGH probado en vivo (POST 60 chars
  → 400) · 8/8 checks de lógica pura PASS · datos de prueba limpiados de la DB.

**Iteración 24 (HECHA): comparador de vueltas.** commit `3747e37`. `<LapComparator>` en el garaje:
agrupa vueltas por juego+auto+pista; por combo muestra mejor vuelta, gap por intento, mejora vs primer
intento y constancia (rango mejor↔peor). Matemática pura sobre datos PROPIOS del piloto — cero fabricación.

**Iteración 23 (HECHA): hoja de setup exportable.** commit `d28c3ab`. `<SetupExport>` = hoja de texto
copiable/descargable (setup completo en orden del editor + unidades), NO archivo binario. Para ACC/LMU
muestra `meta.setupFileNote` (ruta real del archivo). **Decisión #1:** deliberadamente NO genera el
`.json` de ACC / `.svm` de LMU — guardan cada valor como ÍNDICE DE CLICK interno por-coche; un valor mal
= el archivo no carga o aplica basura → viola la regla dura. **Cómo se desbloquearía (Patricio preguntó
2026-06-25):** capturar la codificación del JUEGO REAL, no inventar. Protocolo por-coche (~5 min): mover
cada slider a MIN y MAX, leer el entero en el `.json` guardado, resolver `valor = base + click*step` (2
puntos → base/step/rango). Atajos: presión neumático ACC = misma fórmula todos los coches (base 20.3 psi,
0.1/click) → capturar 1 vez; LMU (`.svm`, motor rF2) tiene step/rango en los archivos de definición ya
instalados → parseable por programa. **Gate:** round-trip por coche (generar → cargar en juego → valores
coinciden → guardar → JSON idéntico); si no pasa, ese coche se queda con la hoja de texto. Recomendación:
NO los 77 coches — Pareto, los 5–10 más usados. (No arrancado: espera confirmación de Patricio.)

**Iteración 22 (HECHA): capa de coaching "Ingeniero de pista".** commit `d30fc82`. `src/lib/coach.ts` +
`<TrackCoach>`: traduce síntoma de manejo → fix de TÉCNICA, playbook de pista y plan de práctica. Primer
"time lever" real (manejo > setup).

**Iteración 20 (HECHA 2026-06-25): rediseño visual "$10k" — sistema de diseño "Pit Wall".**
Pedido de Patricio: *"deja el diseño de la app como una app del USD$ 10k"*. SOLO capa visual;
lógica intacta (motor/i18n/auth/datos/engine sin tocar). `tsc --noEmit` 0; verificado en vivo por
eval (la tool de screenshot del preview da timeout en este entorno — es la tool, no la CSS).
- **`src/app/globals.css` reescrito = el sistema de diseño**: paleta carbon-navy más profunda
  (`--color-bg #04070c`), escala de superficies/bordes, **atmósfera fija** (glows radiales + grilla
  técnica + viñeta vía `body::before/after`), scrollbar/selección/**focus-ring** branded, y **clases
  reutilizables**: `.card` / `.card-interactive`, `.btn-primary` / `.btn-ghost`, `.field`, `.eyebrow`,
  `.telemetry` (mono tabular), `.reveal*` (entrada escalonada). Re-brandeable desde los tokens `@theme`.
- **Tipografía**: + **Saira** (display motorsport) para titulares/números grandes (next/font); Inter
  sigue de cuerpo (marca); **Geist Mono para todo número de telemetría** (valores, vueltas, rangos).
- **Surfaces tocadas (solo className/JSX cosmético, sin cambiar handlers/estado/i18n/aria)**:
  `layout.tsx` (shell + fuente Saira + footer), `page.tsx` (hero con glow + chips de 5 sims + features
  01/02/03), `site-header.tsx` (glass + hairline de marca), `brand.tsx` (wordmark display), `games-grid`
  (cards con strip de acento + glow al hover), `generator.tsx` (panel sticky, segmented con glow, result
  como **data-readout**: filas cambiadas con barra de acento + valores en brand, flechas ↑/↓ en chips),
  `ffb-panel`, `garage-view` (vueltas en mono grande), `auth-form` (card con top-gradient).
- **Verificado en vivo (eval)**: 0 errores de consola en landing/grid/generator; `font-family` h1 =
  Saira; `.card` radius 16px; `.btn-primary` con gradiente brand; generar ACC Ferrari 296 con síntoma
  "subviraje en entrada" → 2 barras de acento + 2 valores en brand + 2 flechas ↑/↓ (cambios resaltados OK).
- **Cierre de esta iteración (HECHO)**: `npm run build` verde (Next 16.2.9, 16/16). Repaso AA: el token
  `--color-faint` daba 3.9:1 (bajo AA) → subido `#5f768c → #6a8195` = **4.58:1** sobre la superficie más
  oscura, sigue más tenue que `muted` (8.3:1). **Commiteado + pusheado** (commit `740cd0c`, 11 archivos de
  diseño; los 2 archivos del bypass `DEV_NO_AUTH` quedaron FUERA del commit → HEAD público limpio).

**Iteración 21 (HECHA 2026-06-25): pistas/etapas auditadas contra rosters reales — COMPLETO al contenido actual.**
Auditoría con WebSearch/WebFetch (Traxion/RacingGames/OverTake, jun 2026). Resultado: ACC/LMU/EA WRC ya
estaban al roster real completo (el "incompleto" del handoff previo era pesimista). Gaps reales corregidos:
- **AC Rally** + **Rally Grecia** (`greece-elatia`, `greece-loutraki`, grava, rough) — contenido agregado al
  EA tras 0.3. 7 → **9** etapas (5 locaciones: Alsacia, Gales, Livigno, Monte Carlo, Grecia).
- **AC EVO** + **Nürburgring 24h (Gesamtstrecke)** (`ac_evo_nurburgring_24h`, ~25 km) — el trazado de
  resistencia que faltaba. 18 → **19** (cubre los 19 del roster EA; el Nürburgring va como GP + Nordschleife + 24h).
- **EA WRC**: comentario "PARCIAL" era stale → las **18 ubicaciones = roster COMPLETO** del juego (corregido el comentario).
Conteo final: **ACC 25 · LMU 14 · AC EVO 19 · AC Rally 9 · EA WRC 18**. `build` verde, tsc 0, sin ids duplicados,
verificado en vivo (los 3 picker muestran las nuevas pistas, 0 errores de consola). Commiteado + pusheado.
Nota: las pistas restantes que faltan en AC EVO / AC Rally son contenido aún NO lanzado del Early Access
(llegan en updates futuros hacia 1.0), no datos faltantes del roster actual.

**Iteración 22 (HECHA 2026-06-25): capa de COACHING "Ingeniero de pista" — bajar tiempos, no solo setup.**
Pedido de Patricio: *"herramienta extremadamente potente para que mis clientes mejoren mucho sus tiempos"*.
Tesis: el tiempo sale del MANEJO (~5–15% de vuelta) más que del setup (~1%). Nuevo panel en el resultado:
- **`src/lib/coach.ts`** (módulo puro, strings `LocalizedText` locales — NO toca el diccionario global de 155
  claves): `drivingTips` (fix de TÉCNICA por cada uno de los 12 síntomas: ej. subviraje entrada → trail-braking),
  `trackPlaybook(track)` (guía por carácter: circuito por `cornerProfile` + bonus si ≥7 km; rally por `surface`),
  `practicePlan` (método universal: consistencia → un sector → cazar la frenada). Física universal, verdadera;
  CERO referencias de frenada inventadas por pista (no verificables → harían MÁS lento al piloto; política del proyecto).
- **`src/components/track-coach.tsx`** (`<TrackCoach track symptoms>`): card con franja `good→brand`, reusa las claves
  i18n `symptom.${s}` existentes. Muestra técnica por síntoma marcado + playbook de la pista + plan de práctica.
- **`generator.tsx`**: import + se pasa `track`/`symptoms` a `ResultPanel` y se renderiza `<TrackCoach>` arriba del
  resultado (placement de titular). +import de tipo `Track`. Sin tocar motor/estado/handlers.
- **Verificado**: build verde, tsc 0, validate-engine 0, 0 errores de consola. En vivo (ACC Ferrari 296 + Spa +
  síntoma "subviraje en entrada"): renderiza "Ingeniero de pista" + tip trail-braking + playbook "Trazado rápido"
  (Spa high-speed) + plan completo (consistencia / cazá la frenada). Commiteado + pusheado.
Próxima palanca de producto (NO hecha): export del setup AL juego (archivos .json/.sto/.svm por sim) y comparador
de vueltas guardadas vs objetivo. Eso + esta capa de coaching son el verdadero foso, no más CSS.

**Iteración 19 (HECHA 2026-06-25): estilo de manejo + condiciones data-driven por juego.**
Pedido de Patricio: "no puede ser que me muestre lo mismo para cada juego… debe adaptarse a los
requisitos de cada juego, además preguntarme cómo me gusta el auto para que se adapte a mi manejo".
- **Estilo de manejo** (los 5 juegos): sección "Tu estilo de manejo" con 3 ejes independientes —
  **Nivel** (Principiante/Intermedio/Pro → electrónica TC/ABS + freno; EA WRC, sin aids, usa freno+diff),
  **Balance** (Estable/Neutral/Ágil → barras + ala + diferencial), **Suavidad** (Suave/Neutral/Agresivo
  → compresión del amortiguador). Defaults neutros = NO mueven el setup. Nuevo `styleRules: ConditionRule[]`
  por juego (palancas separadas para no pisarse; magnitudes al `step` real de cada sim; diff excl FWD;
  mapas TC/ABS a |delta|=1). El motor aplica `styleRules` justo después de `conditionRules`.
- **Condiciones data-driven**: `GameData.conditionFields?: ConditionFieldId[]`; el form (`generator.tsx`)
  renderiza SOLO los campos que el juego declara. ACC/LMU: clima/temp/agarre/combustible + **hora del día**
  (reglas night/dusk → presiones; LMU además ductos). AC EVO: clima/temp/agarre/combustible. AC Rally:
  superficie/rugosidad/clima/**temp**. EA WRC: superficie/rugosidad/clima.
- **Tocado**: `types.ts` (DriverLevel/BalancePref/SmoothnessPref/TimeOfDay/ConditionFieldId + ConditionInput
  + GameData), `engine/index.ts`, `dictionaries.ts` (ES/EN), 5× `rules.ts` + 5× `index.ts`, `generator.tsx`,
  `validate-engine.ts` (chequea styleRules + ejercita estilo en el smoke test).
- **Verificado**: tsc 0 · validate-engine 0 · en vivo (formularios LMU vs EA WRC divergen; generar con
  Ágil+Principiante aplica deltas con razones correctas; FWD excluye el diferencial).
- **Nota dev/local (NO commiteado a propósito):** sigue activo el bypass `DEV_NO_AUTH=1` (en `.env`,
  gitignored) + el código guardado a no-prod en `src/proxy.ts` y `src/lib/auth/current-user.ts`. Esos 2
  archivos quedaron SIN commitear (no se publica un bypass de auth en repo público). Para volver al muro:
  `DEV_NO_AUTH=0` o borrar la línea. Admin de prueba: `admin@admin.cl` / `admin` (seed idempotente).

**ESTADO: los 5 sims en alcance están reconstruidos 1:1. NO hay juego pendiente.**
**Iteración 18 (2026-06-25): auditoría multiagente full + fixes — HECHO y commiteado (§3p).**
App auditada en 13 dimensiones con verificación adversarial; sin agujeros de seguridad/datos.
Pendientes recomendados (NO bugs): tests del motor (mayor ROI), no-op de saturación del ala
en ACC `oversteer_mid`, dedupe DB de favoritos, claves i18n huérfanas, polish a11y. Ver §3p.
F1 25 e iRacing se **ELIMINARON** de la app (iter 17, §3o). Si Patricio decide sumar un
juego nuevo, el patrón está establecido (ver iter 12–16): manda **UNA** captura in-game
de referencia por auto/clase (todas las pestañas del editor) → reconstruir
`parameters.ts` → `rules.ts` → `cars.ts` 1:1, estimando lo que no se vea, y verificar
(tsc 0 / `npx tsx scripts/validate-engine.ts` 0 / `npm run build` verde).
- **Pendiente de reconstruir:** ninguno (F1 25 e iRacing fuera de alcance, §3o).
- **Hechos:** AC Rally (i20 N Rally2, rangos estimados), EA WRC (Ford Puma Rally1, rangos exactos in-game), **ACC (Ferrari 296 GT3, rangos estimados salvo TC/ABS exactos de la tabla; ver §3l)**, **AC EVO (Porsche 992 GT3 R, 29 params; editor real solo 6 pestañas → se eliminaron caja/diff power-coast/freno-aparte/dampers rápidos/splitter; springs N/m; se agregó TC2; ver §3m)**, **LMU (DOS capturas: Hypercar Alpine A424 + LMGT3 McLaren 720S; 45 params universales + extras y overrides por clase; ver §3n)**.
- **Variante de captura (LMU):** cuando un juego varía params por CLASE, Patricio puede mandar una captura POR clase (LMU = 2). El template del editor puede ser idéntico pero con campos N/D / Non-adjustable según clase → modelo de 2 clases (global = una clase, paramOverrides + extraParams para la otra).
- **Opcional disponible:** workflow adversarial para auditar dirección física de reglas
  (AC Rally + EA WRC: dirección de bloqueo LSD trasero, signo del toe). Independiente de rangos.

**Iteración 12 (HECHA 2026-06-25): AC Rally reconstruido contra captura IN-GAME.**
Patricio pasó las **8 pestañas** del editor real del juego (auto **Hyundai i20 N
Rally2**, preset **"Equilibrado"**). Se descubrió que la data previa de AC Rally era
de investigación genérica y **NO coincidía con la UI real** (unidades, params y
rangos equivocados). Se reescribió de cero para espejar el juego 1:1. tsc 0 /
validate-engine 0 / build verde / verificado EN VIVO (tabla del i20 muestra los **36
params reales** y la columna base = preset Equilibrado **exacto**; generar en Grava
mueve los sliders correctos en magnitudes correctas).

**Qué cambió (iteración 12):**
- `ac_rally/parameters.ts` → **36 params con unidades REALES**: muelles **N/m**,
  amortiguadores **Ns/m** (4 canales × 2 ejes), barras **N/m**, **anillo de ajuste en
  m** (altura), **doble LSD** frontal+trasero (rampa °/precarga Nm/placas), **balance
  de freno fracción 0-1**, cilindros maestros **mm**, **pastilla** bajo/medio/alto,
  freno de mano, **conjunto de cambios** (selector), **toe en metros**, ABS/TC mapas.
- **ELIMINADOS** params inventados que NO existen en el juego: `brake_pressure %`,
  `final_drive`, `caster`, `rear_wing`, `diff_center %`.
- `rules.ts` → deltas en las unidades nuevas; **diff remapeado al LSD trasero**
  (rampas/precarga; **MENOR ángulo = MÁS bloqueo**); `brake_pressure` reemplazado por
  balance + ABS + compuesto de pastilla. 8 condition + 12 symptom rules.
- `cars.ts` baseSetups → el i20 hereda los defaults exactos (= sus valores
  Equilibrado); resto de autos pendiente de captura.

**Lo que FALTA para exactitud total en AC Rally:**
1. **Rangos min/max de cada slider — RESUELTO por decisión (2026-06-25).** Patricio
   NO va a capturar los topes de cada slider: el `default` (preset Equilibrado del i20)
   es la única referencia y el resto se **estima** desde la física del motor AC + esa
   captura. Mismo patrón para cada juego (una captura suya → yo completo). Hecho en
   `parameters.ts`: rangos relabelados "(rango estimado)" y afinados (muelles
   15000–65000, anillo 0.12–0.26 m, 8 amortiguadores 1000–8000 Ns/m, barras 0–30000,
   toe ±0.002 m, balance 0.40–0.65). Validados: tsc 0 / validate-engine 0 / build OK
   (el validador corre `generateSetup` sobre los 15 autos sin recortes indebidos).
2. **Convención de signo a confirmar in-game:** toe en metros (¿negativo = toe-out?) y
   rampas del LSD (asumido: subir ángulo = menos bloqueo).
3. **Valores de preset por-auto.** CONFIRMADO por Patricio (2026-06-25): el editor del
   juego es **UNIFORME** (todos los autos muestran los mismos params; el i20 es solo
   ejemplo) → **NO** hay que ocultar params por-auto (queda descartado). Lo que falta
   son los **VALORES** del preset de cada auto (hoy todos heredan los del i20). Capturar
   el garaje de cada auto cuando se pueda; estructura y direcciones ya están bien.
4. **Multiplicador de FFB por-auto** (pestaña Ruedas = 1.0000): confirmar rango.

**Opcional ya disponible:** correr un **workflow adversarial** que verifique la
dirección física de cada regla de AC Rally (sobre todo las rampas del LSD y el signo
del toe) — es independiente de los rangos. Pendiente de luz verde de Patricio.

**Iteración 13 (HECHA 2026-06-25): EA WRC reconstruido contra captura IN-GAME.**
Patricio pasó las **6 pestañas** reales (auto **Ford Puma Rally1**, modo Contrarreloj):
Marchas, Alineación, Muelles, Amortiguación, Diferenciales, Frenada. La data previa
estaba en unidades/estructura equivocadas. Reescrito 1:1. tsc 0 / validate-engine 0
(ea_wrc = **33 params**) / build verde. EA WRC **muestra los rangos en pantalla**, así
que defaults Y min/max del Puma Rally1 son **exactos** (no estimados).

**Qué cambió (iteración 13):**
- `ea_wrc/parameters.ts` → **33 params reales**: muelle **N/mm**, altura **absoluta mm**
  (no offset), barra **N/mm**, toe/camber **grados**, amortiguadores en **clicks −5..+5**
  + **"división de amortiguación" m/s** (sin rebote rápido), **5 marchas** + transmisión
  final 0.1–0.3, diff **frontal+trasero** (conducción/frenada % + precarga N·m), frenos
  fuerza/freno de mano en **N·m**, reparto %.
- **ELIMINADOS** inventados que no existen: `caster_front`, `tyre_pressure_front/rear`
  (EA WRC **no tiene pestaña de neumáticos** ni presión ajustable).
- `rules.ts` → deltas en unidades nuevas; superficie/clima sin presión (usan altura/
  muelle/barra/damper/diff trasero/freno); diff toca **solo el LSD trasero** (excl fwd);
  **sin reglas de temperatura** (no hay lever); `tyres_cold` omitido a propósito.
- `cars.ts` → **Puma Rally1 = referencia** (hereda defaults); overrides de muelle por
  clase con `step` alineado a 1 N/mm; baseSetups limpiados (solo Lancia Stratos).

**EA WRC NO es uniforme:** rangos de muelle/barra/diff varían por clase. Puma Rally1 =
exacto para Rally1; otras clases heredan la referencia (+ overrides de muelle ya
existentes). Falta: captura del garaje de otras clases para refinar. Igual que AC Rally,
queda disponible el **workflow adversarial** para auditar dirección física de las reglas.

**Otros sims (ACC, F1 25, LMU, AC EVO, iRacing):** sin cambios; pendientes en §3.

---

## 0. Repositorio (GitHub)

- **Repo:** https://github.com/PSR109/patagonia-sim-setups — **público** (cuenta `PSR109`).
- **Rama principal:** `main` · remoto `origin` ya configurado · credenciales vía `git credential.helper store` (push directo, sin pasos extra).
- **Subido el 2026-06-23** (commit `5cdced4`, "feat: app generadora y educativa de setups para 7 sims"). Quedó toda la app: motor, datos de los 7 juegos, auth, i18n, FFB, validador, seed.
- **NO versionado** (por `.gitignore`): `.env` (tiene `AUTH_SECRET` real), `prisma/dev.db` y cualquier `*.db` (la regenera `scripts/seed-admin.ts`), `node_modules`, `.next`, `*.tsbuildinfo`.
- **Sí versionado:** `.env.example` (plantilla sin secretos, forzada con `git add -f`).
- Para retomar: `git clone https://github.com/PSR109/patagonia-sim-setups.git`, luego ver §7 (instalar, `.env`, `prisma db push`, `npm run dev`).
- Visibilidad **pública** desde 2026-06-23. El repo se revisó y no contiene secretos (`.env`/`*.db` excluidos), por eso es seguro tenerlo público. Para volver a **privado**: GitHub → Settings → General → Danger Zone → Change visibility (o avisar y lo hago).

---

## 1. Qué es esto

Web app para **Patagonia Sim Racing** (escuela de simracing, ~100 clientes) que
**genera y explica** setups de auto para 7 simuladores, y ahora también recomienda
los **ajustes de FFB / Fanatec** por juego. Objetivo doble: dar el setup correcto
**y** que el cliente aprenda el porqué de cada ajuste.

**Decisiones cerradas** (no volver a preguntar):
- Web app · español por defecto + inglés (i18n ES/EN).
- Generador automático **+ explicador educativo** (qué hace cada parámetro, efecto al subir/bajar).
- Entrada por **condiciones** (pista/clima/temp/superficie) **y** por **síntoma** (subviraje, sobreviraje, etc.).
- Login, gratis para empezar (~100 clientes). Suscripción se evalúa después.
- Features cliente v1: **favoritos, notas, registro de tiempos de vuelta**.
- Datos: **originales y exactos de cada juego** (Patricio NO aporta setups; se compilan de fuentes oficiales + comunidad).
- 7 juegos: **ACC · F1 25 · Le Mans Ultimate · Assetto Corsa EVO · Assetto Corsa Rally · EA Sports WRC · iRacing**.
- **FFB/Fanatec** (pedido nuevo): cubrir **toda la línea DD moderna** (GT DD Pro, CSL DD, ClubSport DD, ClubSport DD+, Podium DD1, Podium DD2) + pedales load cell. Recomendar **ambas capas**: Panel de Control Fanatec (menú tuning) **y** FFB dentro del juego.
- Branding: **HECHO (2026-06-24)** — extraído de `patagoniasimracing.cl` + IG `@patagonia_simracing_pv` (logo casco+PSR, azul-noche `#061018` + acento `#2981f3`, fuente Inter). Ver §3e.

**Proceso pedido:** copiar lo bueno de apps similares / evitar lo malo; correr un
**loop de QA con agentes verificadores adversariales** que "renieguen lo hecho";
si algo falla, rehacer hasta que funcione. Entregar la app lista para usar.

---

## 2. Stack y gotchas (¡importante!)

- **Next.js 16** (App Router) — OJO, tiene breaking changes vs. lo conocido:
  - `params` y `searchParams` son **Promises** (hay que `await`).
  - `cookies()` / `headers()` de `next/headers` son **async**.
  - El "middleware" ahora se llama **Proxy** → `src/proxy.ts`.
  - Antes de tocar código Next, leer `node_modules/next/dist/docs/` (ver `AGENTS.md`).
- **React 19** + **TypeScript strict**.
- **Tailwind v4** — config CSS-first en `src/app/globals.css` (`@theme`), sin `tailwind.config.js`.
- **Prisma 6 + SQLite** — NO actualizar a Prisma 7 (rompe el schema: "url no longer supported in datasource"). Pinneado a `^6`.
- **Auth propia** — bcrypt (Node) + jose JWT (edge) en cookie httpOnly `psr_session`. La cookie es `Secure` **solo en https** (`isRequestSecure()` en `src/lib/auth/session.ts`) para que ande en http://localhost.
- **Arquitectura de datos:** catálogo + reglas en módulos TS bajo `src/data`. La DB solo guarda datos de usuario (User, Favorite, Note, LapRecord). El motor (`src/lib/engine`) corre en el cliente.

---

## 3. Estado actual

### ✅ Hecho y verificado
- App completa: auth, i18n, motor de reglas, generador, garaje. Build pasa, smoke test e2e verde.
- **ACC** implementado de punta a punta (plantilla de referencia en `src/data/acc/`).
- **Capa FFB / Fanatec** construida:
  - Tipos en `src/lib/types.ts`: `FanatecBase`, `FfbTuningParam`, `FfbControlPanelRec`, `FfbInGameSetting`, `GameFfb`; `GameData.ffb?`.
  - Hardware registry: `src/data/hardware/fanatec.ts` (6 bases DD + 8 parámetros del menú tuning con texto educativo ES/EN).
  - Datos FFB de ACC: `src/data/acc/ffb.ts` (menú tuning + FFB in-game, con gain perBase para no clippear).
  - UI: `src/components/ffb-panel.tsx`, montado al pie del generador (`src/app/app/[gameId]/generator.tsx`). Selector de base + tablas desplegables con explicación.
  - **Typecheck (`npx tsc --noEmit`) PASA.**

- **Los 7 juegos integrados y verificados.** Los 6 restantes (f1_25, lmu, ac_evo, ac_rally, ea_wrc, iracing) fueron generados desde la investigación e integrados en `src/data/registry.ts`. Totales: **221 autos, 102 pistas**. `npm run build` PASA. `npx tsx scripts/validate-engine.ts` da **0 problemas** (reglas con paramIds válidos, sin NaN, sin throws, FFB con bases válidas).
- **Loop de QA adversarial COMPLETADO** (`wf_79d2aaca-ef0`, 21 agentes): auditar → verificar escéptico → arreglar. Encontró y corrigió defectos reales; los verificadores descartaron falsos positivos. Tras los fixes: `tsc` limpio, `validate-engine` 0 problemas, `npm run build` verde. Defectos corregidos destacados: ACC regla de presión en mojado invertida + auto inventado (Corvette Z06 GT3.R → Nissan GT-R Nismo GT3); F1 25 diff de tracción invertido; LMU setting de FFB inexistente eliminado; AC EVO final_drive con efectos al revés; AC Rally developer (Supernova/505 Games) y bug de PSI invertido; EA WRC conflicto altura nieve+liso; iRacing ABS max 12→11 (12=OFF apagaba el ABS).

### ⏳ Pendiente (decisiones de Patricio, NO bugs)
1. **leftForReview del QA** (criterio humano, no errores): campo `publisher` separado en `GameMeta` (hoy plegado en `developer`); brake_bias del Lancia Stratos en EA WRC; reglas/textos de diferencial por-categoría para autos FWD/TCR en iRacing; afinar la magnitud de algunos deltas de presión.
2. **Gaps conocidos** (no son bugs): listas de autos parciales en juegos early access (AC EVO, AC Rally), rangos de parámetros "representativos" a afinar contra el juego, y nombres exactos de algunos settings de FFB in-game por confirmar. Detalle en el output del workflow `wzpdskj0t` (Fase 2).
3. **Branding**: reemplazar logo en `src/components/brand.tsx` y colores en `globals.css` cuando lleguen.

### ✅ Resultado: app funcional de punta a punta (5 juegos + FFB), build verde, QA pasado. Lista para usar con `npm run dev`.

### QA round-2 (2026-06-23) — 15 fixes aplicados + 9 decisiones de Patricio
Workflow `wf_18afd77b-f31` (70 agentes). **Aplicado:** LMU brake_migration (semántica + regla); AC EVO presiones mojado (-6→+6) y ride_height group→suspension; AC Rally diff_power mojado (-2→+2), FFB (Damper real, quitados understeer/kerb effects inventados), nota SEN; iRacing "Ford GT GTE"; i18n (leyenda tabla, footer, ternarios→diccionario, games.noData); seguridad (registro P2002→409, favoritos payload ≤8KB). + UI por disciplina: label **Tramo** (rally) vs **Pista** (circuito) y síntomas filtrados por reglas del juego.

**Decisiones round-2 — TODAS RESUELTAS (Patricio eligió las recomendadas, aplicadas 2026-06-23):**
1. **Diferencial RWD en autos FWD/TCR — FIX COMPLETO.** Se agregó `drivetrain?: "fwd"|"rwd"|"awd"` a `Car` y `excludeDrivetrains?: Drivetrain[]` a `ParamDelta` (types.ts). `generateSetup` (engine) saltea los deltas con `excludeDrivetrains` que incluyan la tracción del auto y emite una **nota educativa** para FWD (renderizada en el panel de resultado). Marcados como `drivetrain:"fwd"`: iRacing 4 TCR (Audi RS3, Civic, Elantra) + Renault Clio; AC Rally Mini Cooper S, Peugeot 306 Maxi, Peugeot 208 Rally4; EA WRC 15 autos (clases H1 FWD, H2 FWD, F2 Kit Car, S1600, Rally4 — NO S2000/Rally3/Junior WRC, que son 4WD). Todos sus deltas de diferencial trasero (diff_power/diff_brake/diff_preload/diff_coast/diff_drive_ramp/diff_coast_ramp) llevan `excludeDrivetrains:["fwd"]`. Se quitó además el `diff_center` fantasma de la regla genérica understeer_exit de AC Rally. **Verificado: 22 autos FWD reciben CERO ajustes de diferencial.** Pendiente menor (cosmético): las `reason` de esas reglas todavía mencionan el diferencial aunque el delta se saltee en FWD; la nota FWD lo aclara. Mejora futura: textos `reason` por-tracción.
2. **`diff_preload` en ACC — corregido a física real.** understeer_exit -2→+2, oversteer_exit +2→-2, y doc del parámetro realineado (más precarga = tracción/estabilidad de salida pero tiende a sobreviraje con gas fuerte).
3. **Campo `publisher` — agregado y mostrado.** GameMeta tiene `publisher?`; normalizados ACC/AC EVO (505 Games), EA WRC/F1 25 (EA Sports), AC Rally (505 Games), LMU (Motorsport Games); iRacing sin publisher. La tarjeta muestra "desarrollador · editora".
4. **Renault Clio (iRacing)** movido de `tcr` a `sportscar`, renombrado "Renault Clio R.S. V", year 2020, `drivetrain:"fwd"`.
5. **Control `timeOfDay`** quitado del generador (estado + envío) y claves i18n huérfanas (gen.timeOfDay, time.*) eliminadas. Se mantuvo el campo opcional en ConditionInput (lo usa validate-engine).

---

## 3b. COMPLETADA (iteración 1) — Exactitud absoluta + investigación de competencia

Patricio pidió (2026-06-23): (a) investigar apps de setups existentes y copiar lo bueno; (b) que parámetros, autos, pistas/etapas y ajustes de Fanatec sean **exactamente idénticos** a cada juego/software real, **iterando hasta lograrlo**.

- **Workflow:** `wf_6a31bcf9-171` (Task **wugoj2iqp**, 118 agentes, ~5.5M tokens). Output: `…\tasks\wugoj2iqp.output` → `competencia`, `auditoriaResumen`, `auditoriaDetalle` (con `verificaciones[].verdict.confirmed` = filtro adversarial de 2ª fuente). **Resultado: 81/105 correcciones confirmadas.**
- **APLICADO (alta confianza):**
  - **Parámetros:** F1 25 — escalas corregidas (ARB 1-21; suspensión 1-41; altura del 10-40 / tras 40-55; off-throttle 10-100; on-throttle 0-100; toe del min 0; toe tras min 0.06 default 0.10; presiones máx 29.5/26.5). LMU `brake_migration` máx 6→2.5. AC Rally `abs`/`tc` → mapas 1-3 (no 0-6). iRacing `tc` min 0→1 default→6. ACC `tyre_pressure_front` min 20.5→20.3. EA WRC `diff_brake`→"Coast"; muelles/ARB a N/mm reales; altura a offset ±20mm.
  - **Fanatec (`hardware/fanatec.ts`):** ClubSport DD 12→15 Nm, DD+ 15→18 Nm (firmware v1.4.2.3, may-2026). Agregados params tuning **INT, SPR, DPR**. FEI (0-100 step 10, def 100) y BRF (def 50) documentados; FFS aclarado (Podium=FFS / nuevas=LIN); FFB se muestra como "FF"/"F.FEEDB.".
  - **FFB in-game (7 `ffb.ts`, vía agentes):** LMU quitó mult por-coche; agregó Force Feedback Strength, Steering Torque Capability (=par Nm de la base), Steering Torque Sensitivity, Collision Strength; renombró Smoothing y Minimum Steering Torque. AC EVO: `road_effects`→Vibrations; damping separado en Dynamic Damping/Damper Gain/Minimum Damper; `ffb_smoothing`→Steering Filter; agregó Steering Lock/Speed Sensitivity; FEI→100 + INT 2-6. AC Rally: quitó `road_effects`; FEI 100, NDP 15, INT 2, SPR/DPR 100. EA WRC: `overall_strength`→"Vibration & FFB Strength"; agregó Wheel Friction/Tyre Slip/Steering Centre Force(+Scale); escala 0-150; Tyre Friction corregido a peso/amortiguación (45-65). iRacing: Wheel Force = par Nm de la base (perBase 8/8/15/18/20/25), "Use linear mode" ON, INT 3. F1 25: agregó Wheel Rotation 360° y corrigió nota SEN.
  - **Verificado:** `tsc` limpio, `validate-engine` 0 problemas, `npm run build` verde, y en preview (F1 25 circuito = valores nuevos OK + FFB con Wheel Rotation; AC Rally rally = "Tramo", TC/ABS mapas, FFB sin road_effects + con SPR/DPR/INT).
- **NO aplicado (marcado incierto, no inventado):** rangos por-auto/clase (ACC ARB/altura/ala, EA WRC muelles/ARB — hoy rango representativo único con nota); LMU `tc_slip` (nombres reales Power Cut/Slip Angle, no confirmados); ratios de marchas individuales F1/EA WRC (rangos sin confirmar). Las 24 verificaciones no confirmadas quedan en el output para revisión.
- **PENDIENTE priorizado (próximas iteraciones):**
  1. **Arquitectura de rangos por-auto/clase** (el gap de exactitud más grande): permitir `min/max/step/default` por coche o clase, no global. Afecta ACC (ARB, altura, ala — varían por coche) y EA WRC (muelles/ARB en N/mm por clase).
  2. ~~**Revisar magnitudes de delta en `rules.ts`** tras los cambios de escala~~ — **HECHO en iteración 3** (ver §3d): 13 deltas recalibrados + guarda de regresión en el validador.
  3. **Completar listas de autos/pistas** (ver `auditoriaResumen[].completeness`: ACC ~22% autos / 50% pistas; EA WRC, AC EVO, etc. parciales). Generar el faltante por clase desde fuentes oficiales.
  4. ~~Neutralización a castellano neutro~~ — **HECHO en iteración 2** (§3c); verificado en vivo: UI muestra "Elige tu simulador".
  5. Branding; cosmético reasons FWD.
- **Re-iterar:** `Workflow({ resumeFromRunId: "wugoj2iqp", scriptPath })` cachea los agentes ya corridos; re-correr el audit tras aplicar fixes hasta cero discrepancias.
- **Expectativa honesta:** "exactamente idéntico" es best-effort contra fuentes públicas; AC EVO y AC Rally son early-access (blanco móvil); lo no verificable se marca, no se inventa.

## 3c. COMPLETADA (iteración 2) — Rangos por-auto/clase + castellano neutro (2026-06-23)

Se atacó el **pendiente #1 (el gap de exactitud más grande): rangos por-auto/clase**, más el **#4 (castellano neutro)** y parte del **#2 (bugs de escala)**.

### Arquitectura de overrides de rango por auto/clase (NUEVO)
Un mismo parámetro ahora puede tener distinto `min/max/step/default` por **clase** o por **auto**, sin duplicar el `ParameterDef`.
- **Tipos** (`lib/types.ts`): `ParamRangeOverride = Partial<Pick<ParameterDef,"min"|"max"|"step"|"default">>`; `Category.paramOverrides?` y `Car.paramOverrides?` (ambos `Record<paramId, ParamRangeOverride>`). El del auto gana sobre el de la clase.
- **Motor** (`lib/engine/index.ts`): `effectiveParams(game, carId)` y `effectiveParam(game, carId, paramId)` fusionan global ← clase ← auto (y encajan el default al rango). `baseFor`, `generateSetup`, `netChanges` ahora pasan por los params **efectivos**; `baseFor` además clampea los valores de `baseSetups` al rango efectivo (un valor base nunca cae fuera del slider real del auto). **Backward-compatible**: sin overrides, comportamiento idéntico (devuelve `game.parameters` por referencia).
- **UI** (`app/app/[gameId]/generator.tsx`): el `ResultPanel` usa `effectiveParams(game, carId)` para la tabla, los formatos y las explicaciones. Se agregó una línea educativa **"Rango: min – max · paso step"** por parámetro (claves i18n `result.range` / `result.stepLabel`). Verificado en vivo: Mercedes-AMG GT4 muestra ala 0-7 y barras 0-2; Ferrari 296 GT3 mantiene 0-12 / 0-10.
- **Validador** (`scripts/validate-engine.ts`): chequea que los overrides referencien paramIds válidos, que el rango efectivo por auto sea coherente (min<max, min≤default≤max) y que los valores **crudos** de `baseSetups` caigan dentro del rango efectivo.

### Bugs de escala arreglados (los cazó el nuevo validador — pendiente #2)
- **AC Rally Citroën Xsara WRC**: `baseSetups` tenía `tc:0/abs:0` (escala vieja 0-6 = OFF); la escala nueva es mapas **1-3** → quedaba fuera de rango. Corregido a `tc:1/abs:1` (mapa mínimo).
- **EA WRC Peugeot 205 GTI**: `arb_rear:4` (escala vieja sin unidad); la nueva es **N/mm 5-40 def18** → 4 quedaba bajo el mínimo. Corregido a `arb_rear:24` (endurecer la cola de un FWD, preservando la intención del override).

### Datos de rango verificados (workflow `wf_074057aa-4ef`, runs `wqf984tv7` + resume `wsmr38qmm`)
Workflow de **investigación + verificación adversarial 2ª fuente** (1 agente por auto ACC + 1 por grupo de clase EA WRC, cada uno con un verificador escéptico). Se aplicó **solo lo confirmado con criterio lógico sólido**; lo demás quedó en `review`. Output: `…/tasks/wqf984tv7.output` (verdicts crudos) y `…/tasks/wsmr38qmm.output` (`{apply, review}` limpio).
- **APLICADO (alta confianza, respaldo por conteo explícito de opciones o por cota inferior observada):**
  - ACC **BMW M4 GT3**: `rear_wing` 0-**8** (Coach Dave "nueve opciones"; 0-12 era del McLaren 720S Evo).
  - ACC **Mercedes-AMG GT4**: `rear_wing` 0-**7** (Coach Dave "ocho opciones"; setup real llega a 7).
  - ACC **clase GT4**: `arb_front`/`arb_rear` 0-**2** (Coach Dave "only three settings (0-2)", rasgo de GT4) con default 1. Aplica a Merc GT4 (verificado) y Cayman GT4 (inferido del rasgo de clase).
  - EA WRC **clase Kit Car/S1600/S2000**: `spring_front`/`spring_rear` **30-250** N/mm def 120 (verificado 306 Maxi ~186 N/mm vía takegaki-drive.com, independiente).
  - EA WRC **clases modernas** (Rally4/Rally3/Rally2/WRC2/NR4/Junior): `spring_front`/`spring_rear` **45-260** N/mm def 90 (asfalto hasta 260, grava desde ~45; cross-check WRCsetups + takegaki).
  - *Razón de aplicar springs:* el global 40-130 era **demostrablemente bajo** (valores reales 186-260 > 130 lo prueban: subir un tope por cota inferior observada es lógicamente válido, a diferencia de bajar un tope por "nunca se vio más alto").
- **NO aplicado → REVIEW (35 ítems, ver `wsmr38qmm.output.review`):** ACC Merc GT3 Evo ala (los 2 verificadores se contradijeron; bajar el tope no es demostrable → se dejó global 0-12); **McLaren 720S Evo tiene DOBLE TC (TC1/TC2)** → nuestro `tc` único no lo modela (mejora estructural futura: partir en `tc1`/`tc2`); Cayman GT4 ala/camber/altura (camber min -4.5 con conf media); Aston ala; Nissan camber; Porsche 992 brake_bias; EA WRC históricos/Group B/Rally1 muelles+barras (fuente única WRCsetups bloqueada/no independiente → refutado); Rally1 ride-height (confusión offset-vs-absoluto en la data fuente); ARB modernas (conf media).

### Castellano neutro (pendiente #4 — COMPLETADO)
Pase completo voseo→**tuteo** en TODOS los textos `.es`: diccionario i18n (`dictionaries.ts`), `layout.tsx`, `generator.tsx`, y los `.es` de los 7 juegos (`parameters/rules/ffb/index`) + `hardware/fanatec.ts`. Se corrigieron además inconsistencias de **usted** (formas `bájelo/súbalo/déjelo/ajústelo` → `bájalo/súbelo/déjalo/ajústalo`) que rompían el registro. Verificado con grep: **0 ocurrencias** de voseo/usted en strings de UI. El `.en` quedó intacto.

### Estado tras iteración 2
`tsc` limpio · `validate-engine` **0 problemas** · `npm run build` **verde** · preview sin errores de consola. Pendiente priorizado restante: (a) seguir afinando rangos por-auto del `review` (sobre todo verificar topes reales de slider leyendo el juego, no setups de usuarios); (b) modelar TC doble del McLaren 720S Evo (y otros con TC1/TC2); (c) `rules.ts`: revisar magnitudes de delta tras los cambios de escala (springs N/mm, AC Rally TC/ABS 1-3) — **HECHO en iteración 3**; (d) completar listas autos/pistas; (e) branding; (f) cosmético reasons FWD.

## 3d. COMPLETADA (iteración 3) — Recalibración de magnitudes de delta (pendiente #2, 2026-06-24)

Se atacó el **pendiente #2/(c)**: tras los reescalados del 2026-06-23, las magnitudes de `delta` en `rules.ts` (que el motor aplica como `valor + delta*step`, recortado al rango **efectivo por auto/clase**) habían quedado descalibradas. Dos patrones: deltas **negligibles** (un rango que se expandió dejó el delta en ~2-5% del rango, imperceptible) y deltas **saturantes/over_resolution** (un rango que se comprimió a mapa hace que `|delta|≥2` salte la posición intermedia y se clave al tope, escondido por el clamp — `validate-engine` no lo cazaba).

- **Workflow adversarial** `wf_f8cd74a1-f2b` (Task `wxnzm7sn6`, 20 agentes): 1 auditor por juego → 1 verificador escéptico por hallazgo. **13 hallazgos, 13 confirmados.** Output: `…/tasks/wxnzm7sn6.output`.
- **APLICADO (13 deltas, signo/física SIEMPRE conservados, sólo se reescaló la magnitud):**
  - **F1 25** (suspensión 1-41 expandida, `-1/-2` ≈ 2-5%): `wet` front/rear_suspension −2→**−6** (15%); `bouncing` front/rear −1→**−4** (10%); `kerb_instability` front/rear −2→**−4** (10%). *(El rear de `wet` se llevó a −6 simétrico con el front, no al −4 que sugirió su verificador aislado, para no introducir desbalance front/rear que la regla no busca.)*
  - **AC EVO** (`spring_rate_rear` 40-250 step 1): `oversteer_mid` −2 (=2 N/mm ≈ 1%) → **−12** (12 N/mm ≈ 5.7%).
  - **AC Rally** (TC/ABS son MAPAS 1-3): `surface_snow` tc/abs +2→**+1**; `weather_wet` tc/abs +2→**+1**. Con +2 saltaban al mapa 3 (máx) salteando el 2; +1 da un click graduado (verificado: Citroën Xsara base 1 → 2 en nieve, antes 3).
  - **EA WRC** (ARB en N/mm 5-40): `surface_tarmac` arb_front/arb_rear +1 (=1 N/mm ≈ 2.9%) → **+4** (≈11%). *(Simétrico +4/+4 para preservar el gap front/rear de los defaults, no el +4/+5 asimétrico de los verificadores aislados.)*
- **NO tocado (correctamente):** EA WRC muelles/altura (ya estaban en N/mm/offset bien escalados), iRacing y ACC enteros (deltas proporcionados; ACC GT4 ARB override 0-2 recibe sólo ±1 = un click, OK), presiones psi (deltas dan 0.3–4 psi, OK), y todos los deltas de síntoma de ARB chicos (ajustes menores co-aplicados). El auditor fue conservador y no sobre-marcó.
- **Guarda de regresión nueva** en `scripts/validate-engine.ts`: los parámetros tipo MAPA (entero, ≤3 posiciones) ahora **fallan la validación** si una regla les mete `|delta|≥2` (caza el patrón AC Rally a futuro).
- **Verificado:** `tsc` limpio · `validate-engine` **0 problemas** (con la guarda activa) · `npm run build` **verde** · 8/8 asserts del motor (script temporal, ya borrado) · **en vivo**: F1 25 McLaren MCL39 mojado muestra suspensión 21→15.

## 3e. COMPLETADA (iteración 4) — Branding oficial + roster ACC + nota FWD (2026-06-24)

- **Branding (#4) — HECHO.** Patricio pasó las fuentes: sitio `patagoniasimracing.cl` + IG `@patagonia_simracing_pv`. Se extrajo la marca real (logo casco+PSR, paleta azul-noche `#061018` + acento `#2981f3`, tipografía **Inter**) bajando los assets del sitio (favicon/og-image/apple-touch-icon) y el CSS. Aplicado: `public/psr-logo.png` (logo oficial) en `brand.tsx`; favicon + `icon.png` + `apple-icon.png` reales en `src/app/`; paleta de marca en `globals.css` (reemplaza el turquesa placeholder); fuente Inter en `layout.tsx`. Verificado en vivo (`--color-brand #2981f3`, Inter, logo cargado, sin errores). *(El logo oficial es raster; si Patricio tiene un SVG vectorial, reemplazar `public/psr-logo.png`.)*
- **Roster ACC (#1) — HECHO.** Workflow `wf_83477f1c-92f` (investigación + verificación adversarial 2.ª fuente). ACC pasó de **13→42 autos** (+20 GT3, +9 GT4) y **12→25 pistas** (DLC: Silverstone, Bathurst, Laguna Seca, COTA, Nordschleife, etc.). IDs con sufijo de año para no colisionar con los existentes.
- **Cosmético FWD (#4b) — HECHO.** La nota FWD del motor ahora aclara que si una explicación menciona el diferencial, ese ajuste no se aplicó (fix en un solo lugar, sin reescribir 22 reasons).
- **Commits:** `9893b29` (ACC roster), `a364602` (branding + FWD), pusheados a `main`.
- **Sobre #1 (resto):** ACC era EL gran hueco (estaba ~22%). Los demás juegos están en cobertura razonable o son scope intencional: iRacing 46 (subset curado de road racing — el juego tiene cientos), LMU 33, F1 25 23, EA WRC 57 (roster completo). AC EVO 37 y AC Rally 12 son **early access** (blanco móvil, best-effort). O sea #1 queda sustancialmente cubierto; el resto es afinado incremental.

## 3f. COMPLETADA (iteración 5) — Loop "termina las 5 pendientes" (2026-06-24)

Patricio pidió por `/loop` terminar las 5 pendientes. Estado final:
1. **Listas autos/pistas — HECHO (ACC).** Ver §3e. El resto es scope intencional o early-access.
2. **TC doble McLaren 720S Evo — HECHO.** Commit `c221b40`. Nuevo mecanismo `Car.extraParams` (params que solo tiene un auto, además de los del juego; `effectiveParams` los agrega, las reglas no los tocan). El McLaren expone `tc2` (TC1 = el slider TC global que ajustan las reglas; TC2 = capa extra educativa). Reutilizable para futuros casos.
3. **Rangos por-auto/clase — PARCIAL (arquitectura + alta confianza HECHO; resto necesita el juego).** La arquitectura (`paramOverrides`) existe desde iteración 2 y los valores confirmables ya se aplicaron (ACC BMW M4 ala 0-8, Merc GT4 0-7, GT4 barras 0-2; EA WRC muelles por clase). El `review` del `wsmr38qmm` dejó el resto marcado como **no confirmable desde fuentes públicas** (los verificadores se contradecían o dependían de setups de usuarios). Como Patricio TIENE los juegos, lo correcto es que lea los topes reales del garaje y los pase (ver lista abajo), en vez de inventarlos.
4. **Branding — HECHO.** Ver §3e.
5. **LMU TC + marchas — HECHO (hasta donde permiten las fuentes).** Commit `cfc96b3`. LMU `tc_slip`→rótulo real "TC Slip Angle" (NO "Power Cut": habría invertido la física de la regla grip_green); F1 25 confirmado sin marchas ajustables; EA WRC texto de marchas aclarado. Quedan dos datos que necesitan el juego: el 3er canal de TC de LMU (Power Cut) y el rango real del final drive de EA WRC.

### ⏳ Datos para que Patricio capture EN EL JUEGO (y los aplico)
Esto desbloquea #3 y los flecos de #5 sin inventar nada:
- **ACC** (garaje de cada auto): tope real del **ala trasera** (clicks), rango de **camber** del/tras, rango de **altura** del/tras — por coche o por familia. Hoy usamos un rango global representativo salvo los pocos verificados.
- **ACC McLaren 720S Evo**: rango real de **TC2** (hoy 0-11 asumido).
- **LMU**: ¿el garaje muestra un tercer canal **TC Power Cut** además de TC y Slip Angle? Rango. Y confirmar si power/coast del diferencial van en **% o en grados de rampa**.
- **EA WRC**: rango/unidad real del **final drive** (hoy `0-20` representativo, marcado PENDIENTE en el código) y si conviene exponer las marchas individuales.
- **AC EVO / AC Rally** (early access): cuando estabilicen, confirmar listas de autos/pistas y topes de sliders.

## 3g. COMPLETADA (iteración 6) — Loop 2: más exactitud sin inventar (2026-06-24)

Patricio re-lanzó el `/loop`. Se exprimió lo que SÍ es verificable sin tener el juego en mano:
- **#5 fleco — 3er canal de TC de LMU (Power Cut): HECHO.** Commit `75aaa48`. Se creó `Category.extraParams` (params solo de una clase) y se agregó `tc_power_cut` (1-11, dato ya confirmado por el research) a Hypercar/LMGT3/GTE; los prototipos LMP2/LMP3 (sin TC) no lo reciben. LMU ahora modela los 3 canales reales (TC + Slip Angle + Power Cut).
- **#3 — ala por-auto en ACC: HECHO lo confirmable (6 autos).** Commit `7073c32`. Workflow `wf_fcb5ed3a-78d` (spec del garaje, no setups): Merc GT3 Evo / McLaren 720S GT3 / Huracán GT3 Evo → ala 0-8; BMW M4 GT4 → 0-5; Alpine A110 GT4 y McLaren 570S GT4 → 0-4. Los autos sin confirmar con ≥2 fuentes quedan en el global 0-12 (no se inventa).
- **Mecanismos nuevos reutilizables:** `Car.extraParams` (iter 5, McLaren TC2) y `Car`/`Category.extraParams` + el merge en `effectiveParams`. Habilitan modelar diferencias reales por auto/clase sin tocar el resto.

### ⏳ Lo que QUEDA y necesita leer el garaje del juego (Patricio)
- **ACC camber y altura por-auto** (no documentados en fuentes públicas; los agregadores los ocultan).
- **ACC ala** de los autos no confirmados (Audi R8 Evo II, Huracán Evo2, Aston V8 Vantage, Bentley, Ford Mustang, Nissan GT-R, Porsche 992 — probablemente 0-12 los modernos, 0-8 los 2018-19, pero sin confirmar).
- **ACC McLaren 720S Evo:** rango real de **TC2** (hoy 0-11 asumido).
- **EA WRC:** rango/unidad real del **final drive** (hoy 0-20 representativo) y formato %/grados del diferencial de LMU.
- **AC EVO / AC Rally:** listas y topes cuando salgan de early access.

## 3h. COMPLETADA (iteración 7) — #1 rosters COMPLETOS en todos los juegos (2026-06-24)

Workflow `wf_891905b9-f55` (research + verificación adversarial 2.ª fuente) completó las listas de los juegos que faltaban (commit `bd2b838`):
- **LMU** 33→**35** (+Duqueine D09 LMP3, +Toyota TR010 Hybrid 2026).
- **EA WRC** 57→**101 autos** (+44: históricos H2/H3 RWD, Group B, Group A, Kit Car/S1600/Rally4 con `drivetrain:"fwd"`, Rally2/WRC2, WRC 1997-2011, Rally1 '24) y 12→**18 pistas** (+México, Portugal, Finlandia + ficticias Scandia/Pacífico/Mediterráneo).
- **AC Rally** 12→**15** (+Škoda Fabia RS Rally2, Alpine A110 Gr.4, Lancia Fulvia 1.6 HF Gr.4 FWD) y el tramo combinado de Monte Carlo se partió en los 2 oficiales (La Bollène/Turini + Sisteron).
- **AC EVO** (early access) 37→**68** (del changelog v0.2-0.7, verificado).
- **F1 25** ya estaba completo. **iRacing** queda como subset curado de road racing **a propósito** (el juego tiene cientos; expandirlo es una decisión, no un gap).

**#1 (listas autos/pistas): COMPLETO** para todo lo documentable. `tsc`/`validate-engine` 0/`build` verdes (categoryIds válidos, sin duplicados, FWD ok).

### ⏳ Único pendiente real, y necesita leer el garaje (Patricio)
Ya NO quedan listas por completar. Solo faltan **rangos de sliders por-auto** no publicados en fuentes (ACC camber/altura por coche; rango exacto de TC2 del McLaren; final drive de EA WRC; formato %/grados del diff de LMU; AC EVO/AC Rally al salir de early access). Re-loopear no los consigue: requieren tu lectura in-game.

**Mejora extra aplicada (iteración 8, commit `53367b0`):** manejo **FWD en AC EVO** — 8 hot-hatch de tracción delantera (Abarth 695, Golf 8 GTI, i30 N, Alfa Junior, Alpine A290, Renault 5 GT Turbo, Mini Cooper S, Golf GTI Mk1) marcados `drivetrain:"fwd"` y los 7 deltas de diferencial de AC EVO con `excludeDrivetrains:["fwd"]`. Ahora los FWD no reciben ajustes de diff trasero y muestran la nota educativa, igual que los juegos de rally. Verificado por motor.

**Mejoras nuevas opcionales — ambas resueltas (ya no hay opcionales abiertas):**
- ~~expandir iRacing más allá del subset curado de road racing~~ → **DECIDIDO (2026-06-24): Patricio confirma dejar iRacing como subset curado de road racing a propósito; NO se expande.**
- ~~afinar/ampliar datos de FFB por juego~~ → **HECHO en iteración 9 (§3i)**.

## 3i. COMPLETADA (iteración 9) — Afinar + ampliar FFB (auditoría adversarial, 2026-06-24)

Patricio eligió "afinar y ampliar FFB" (el diferenciador de mercado central). Workflow `wf_da4ad691-680` (commit `ca86353`, pusheado): **8 auditores** (7 juegos + registro de hardware Fanatec) → **126 verificadores escépticos** (2 votos independientes por hallazgo, ángulos *existencia/exactitud* y *física/coherencia/hecho-vs-preferencia*) → síntesis con chequeo de coherencia cross-juego. **63 hallazgos: 28 confirmados, 7 débiles, 28 descartados/preferencia.** Output crudo: `…/tasks/w7zs8oatl.output` (bajo `.result`).

**APLICADO (solo factual/confirmado, vetado a mano; ES+EN castellano neutro):**
- **hardware/fanatec.ts:** SEN/NDP/NFR/NIN con rango + default de fábrica oficiales; SPR/DPR aclarado que **>100 amplifica** (hasta ~120), no solo atenúa; ClubSport DD = **par de sujeción** + límite **8 Nm con QR2 Lite**.
- **LMU:** 3 toggles reales que faltaban — **Force Feedback Effects** (interruptor maestro), **Invert FFB**, **Use Constant Steering Force Effect** — + **INT** en el panel tuning (señal cruda rF2).
- **F1 25:** nombre real del slider **"Vibration & FFB Strength"** (el juego abrevia; alineada también la nota regla-de-oro) + nota con escala 0-100 y ballparks por base + **INT** en el panel.
- **AC Rally:** aclarada la **escala del gain (0-200%)**; agregado **Steering Lock + Wheel Soft Lock**; nota del **multiplicador de FFB por auto** (service park).
- **EA WRC:** reescrita la nota de **Tyre Friction** (rango recomendado ≠ escala del slider) y el marco de escala de canales (son **%**, ~150 es práctico, no tope oficial).
- **iRacing:** agregado **Reduce Force When Parked** (ON, seguridad en DD); nota de **seguridad del Wheel Force** (ponerlo EXACTO al par pico); aclarado que **Strength es por-auto** (recalibrar con Auto al cambiar de coche).
- Verificado: `tsc` limpio, `validate-engine` 0, `build` verde, en vivo (login admin → /app/lmu, f1_25, iracing; 0 errores de consola), sin voseo.

**EN ESPERA (NO aplicado, a propósito — decisión/lectura in-game):**
1. **INT default 6 vs 11** en el panel (`fanatec.ts`): fuentes oficiales en conflicto (FAQ Fanatec dice 6; manuales CSL/CS dicen 11). No se tocó hasta confirmar contra el firmware real.
2. **AC EVO (early access):** la auditoría sugiere que `Vibrations` y `Speed Sensitivity` serían exclusivos del menú Logitech **TrueForce** (no del menú Fanatec), que `min_force` no está corroborado, y propone 4 sliders de efectos (Curbs/Road/Tyre Slips/ABS). Confianza media/baja + blanco móvil; el chequeo cross-juego además **refutó** bajar el perBase de gain (ya está alineado). → **Patricio: confirmar en el garaje de AC EVO qué sliders muestra realmente el menú FFB con una base Fanatec.**
3. **F1 25:** `Pit Stop Effects` (¿existe el slider?) y subir NDP 10-25→20-40 (preferencia) — sin aplicar.
4. **EA WRC:** `Understeer Enhance` (¿existe en EA WRC? incierto) y reframe de Self-Aligning Torque como no-master (el texto actual es defendible) — sin aplicar.
5. **iRacing:** `Intensity` (slider del Auto, 2023) — existencia no confirmada con certeza; sin aplicar.

**Re-iterar FFB:** `Workflow({ scriptPath: "<script de wf_da4ad691-680>", resumeFromRunId: "wf_da4ad691-680" })` para cachear lo ya corrido. Lo que falta son sobre todo confirmaciones in-game (igual que los rangos de sliders del §3h).

## 3j. COMPLETADA (iteración 10) — Auditoría adversarial de código/seguridad/UX (2026-06-24)

Las 9 iteraciones previas fueron casi todas exactitud-de-datos + FFB. Esta apuntó a las dimensiones **poco exprimidas y que NO dependen de datos in-game**: código, seguridad, API, i18n, UX/a11y, Next 16. Workflow `wf_f82bff3a-4ae` (Task `wpc7empho`, 68 agentes): 6 auditores (1 por dimensión) → 2 verificadores escépticos refutadores por hallazgo (≥2 votos reales para confirmar). **31 hallazgos, 5 confirmados** (resto refutado/preferencia/out-of-scope-data). Commit `7504103`, pusheado. *(Nota: varios verificadores de `ux`/`i18n` cayeron por rate-limit del servidor; la dimensión i18n se reauditó a mano.)*

**APLICADO (5 bugs reales):**
- **🔴 CRÍTICO — `lib/auth/session.ts`: fallback hardcodeado de `AUTH_SECRET` eliminado.** El secreto HMAC caía a `"dev-insecure-secret-change-me"` si faltaba el env → un atacante podía forjar un JWT HS256 con cualquier `sub`/`role` (incluido admin) y tomar cualquier cuenta. Ahora `getSessionSecret()` resuelve perezoso y **lanza** si el secreto falta, es `<32` chars o es un placeholder inseguro conocido (incluye el del `.env.example`). Verificado: login correcto sigue 200 (el `AUTH_SECRET` local real es de 64 chars).
- **🟡 MEDIO — `api/auth/login/route.ts`: side-channel de timing → enumeración de emails.** El `||` cortocircuitaba el `bcrypt.compare` cuando el email no existía (respuesta casi instantánea) vs ~65ms si existía. Ahora **siempre** se compara contra `DUMMY_PASSWORD_HASH` (const nueva en `password.ts`). Verificado en vivo: 401 email-inexistente 64ms ≈ 401 pass-mala 67ms.
- **🟠 ALTO — `generator.tsx` chips de síntoma:** estado seleccionado era **solo color** (sin `aria-pressed`/role) → invisible a lectores de pantalla (WCAG 1.4.1 + 4.1.2). Agregado `aria-pressed`.
- **🟡 MEDIO — `generator.tsx` toggle principiante/avanzado:** mismo defecto, agregado `aria-pressed`.
- **🟡 MEDIO — `generator.tsx` textarea de nota:** sin nombre accesible (solo `placeholder`, que desaparece al enfocar; WCAG 3.3.2). Agregado `aria-label`.

**Auditado y LIMPIO (no se tocó):**
- **i18n:** paridad ES/EN perfecta (**154 = 154** claves), 0 claves usadas-pero-faltantes, 0 voseo/usted. Confirmado con script determinístico (flatten dicts + grep de `t("…")`).
- **Motor, API, Next 16:** los hallazgos de esas dimensiones fueron refutados por los escépticos (falsos positivos o preferencias). El motor/API/auth-restante quedaron sólidos.

**Verificado:** `tsc` 0 · `validate-engine` 0 · `npm run build` verde · login en vivo (200/401/401 con timing igualado) · preview sin errores de consola.

**Re-iterar esta dimensión:** `Workflow({ scriptPath: "<script de wf_f82bff3a-4ae>", resumeFromRunId: "wf_f82bff3a-4ae" })`. Sigue siendo terreno fértil sin tocar datos: un pase futuro podría cubrir performance, manejo de errores en el cliente, y los hallazgos `ux` que el rate-limit dejó sin verificar.

---

## 3k. COMPLETADA (iteración 11) — 2º pase adversarial: performance / errores-cliente / UX (2026-06-24)

Continuación del loop sobre las dimensiones que el rate-limit de la iteración 10 dejó sin exprimir. Workflow `wf_39830199-ce0` (Task `wfpuag7nt`, 27 agentes): 3 auditores (performance, manejo de errores cliente, UX) → 2 escépticos refutadores por hallazgo, **refute-by-default** (confirma solo si NINGÚN escéptico refuta). **12 hallazgos, 7 confirmados, 5 refutados.** Commits `f895687` (6 quirúrgicos) + `1b49bad` (code-split), pusheados.

**APLICADO (7 bugs reales):**
- **🟠 ALTO perf — code-split del catálogo (`src/data/load-game.ts` nuevo + `generator.tsx`).** `registry.ts` barrel-importaba los 7 juegos; como las reglas son closures no tree-shakeables, `/app/[gameId]` embebía **~101 KB gzip** de catálogo entero por visita. Ahora `loadGame(id)` hace `import()` dinámico por juego y el generator carga async. Medido: chunk del generator 10 KB gz (0 datos estáticos), +1 juego ~15-17 KB gz → **~101→~25 KB gz, −74%** en la ruta más usada. `garage-view`/`games-grid` siguen con el registry estático (sus rutas sí listan todo el catálogo).
- **🟠 ALTO errores — `auth-form.tsx`:** `fetch` del login/registro sin `try/catch` → si la red fallaba, el botón quedaba deshabilitado para siempre sin mensaje. Ahora `try/catch/finally` + error.
- **🟠 ALTO errores — `generator.tsx` SaveBar:** `save{Favorite,Note,Lap}` sin `try/catch` → botón trabado en `busy` ante un `fetch` rechazado. Envueltos en `try/catch/finally`.
- **🟡 MEDIO errores — `garage-view.tsx` `del()`:** no chequeaba `res.ok` (el ítem "reaparecía" sin avisar tras un 401/500) ni atrapaba fallos de red. Ahora valida la respuesta y muestra `garage.deleteError`.
- **🟠 ALTO UX — `garage-view.tsx` borrado:** la ✕ hacía hard-delete permanente en un click, sin confirmación → pérdida de datos por misclick. Agregada confirmación (`window.confirm` con `garage.deleteConfirm`).
- **🟠 ALTO UX (integridad) — `generator.tsx` cambio de auto/categoría/pista:** tras generar, cambiar de auto dejaba el `result` viejo → la tabla mezclaba auto nuevo con valores viejos y **se guardaba un favorito corrupto** (nombre de un auto, valores de otro). Ahora los 3 selectores de identidad limpian `result` (`setResult(null)`). Verificado live: generar Ferrari → cambiar a Porsche → result se limpia.
- **🟡 MEDIO UX — `generator.tsx` SaveBar mensajes:** el "Guardado" quedaba fijo para siempre, los errores se pintaban en verde y el doble-click duplicaba favoritos. Ahora mensaje efímero (4s) con color según éxito/error + botón anti-duplicado tras guardar.

**REFUTADO (5, no se tocó — coincide con la lectura previa de las rutas):**
- GET `/api/{favorites,laps,notes}` sin `take`/límite y POST sin tope por usuario: técnicamente cierto pero **auto-scoped** (usuario autenticado floodeando su propia cuenta, `@@index([userId])`), deployment interno ~100 usuarios confiables, SQLite necesita millones de filas para degradar. Hardening teórico, no defecto presente. Los GET además **no tienen consumidores** (el garaje lee Prisma directo server-side, omitiendo el `payload`).
- Garaje sin paginación/virtualización: mismo razonamiento (datos por-usuario creados a mano de a uno).
- Input de temp-pista "acepta valores inválidos": refutado — `trackTempC` solo alimenta gates booleanos de umbral y todo sale acotado por `clampToParam`; `<input type=number>` ya filtra.

**i18n:** nueva clave `garage.deleteError` en ES y EN (paridad **155 = 155**).

**Verificado:** `tsc` 0 · `validate-engine` 0 · `next build` verde · split confirmado en el build · live (logueado) generator carga ACC completo, genera setup y limpia result al cambiar de auto, consola sin errores.

**Verificación en vivo completa (cierre del hueco — #2–#7 se habían shippeado sólo con tsc/build):** los 7 fixes probados en el preview corriendo, no sólo el build.
- **#3 + #7 (save favorito):** click → botón pasa a `✓ Guardado` disabled (anti-duplicado), mensaje `text-good` "¡Guardado en tu garaje!", **desaparece a los ~4s** (efímero).
- **#3 (save nota):** textarea → "Guardar" → mensaje verde "Guardado", el bloque se cierra.
- **#3 + #7 path error (save lap sin pista):** mensaje en **`text-danger` (rojo)** — confirma que los errores ya no se pintan en verde.
- **#3 (save lap OK con pista Spa):** verde "Guardado", bloque cierra.
- **#6:** seleccionar pista tras generar limpia el `result` (sin tabla, sin SaveBar).
- **#5 (confirm borrado):** stub `confirm→false` → `window.confirm("¿Eliminar esto?")` se llama, item **no** se borra (3→3). `confirm→true` → DELETE real → `router.refresh()` → 3→2.
- **#4 (delete robusto):** `fetch` DELETE forzado a 500 → banner `text-danger` "No se pudo eliminar. Inténtalo de nuevo." (clave i18n `garage.deleteError`), item conservado; `fetch` rechazado (red caída) → mismo banner, sin rejection sin atrapar.
- **#2 (auth-form):** en `/login`, `fetch` a `/api/auth/login` rechazado → error "Algo salió mal. Inténtalo de nuevo." + **botón re-habilitado** (`Ingresar`, no colgado). Antes del fix quedaba disabled para siempre sin mensaje.
- Datos de prueba creados durante la verificación **eliminados**; garaje limpio; consola sin errores. Sin cambios de código → sin commit (sólo verificación).

**Re-iterar:** `Workflow({ scriptPath: "<script de wf_39830199-ce0>", resumeFromRunId: "wf_39830199-ce0" })`. Las dimensiones código/seguridad/UX/perf ya están bastante exprimidas; el terreno fértil restante sin datos in-game es escaso. Lo pendiente real sigue siendo la captura de datos in-game de Patricio (§3f–3i).

---

## 3l. COMPLETADA (iteración 14): ACC reconstruido contra captura IN-GAME (2026-06-25)

Patricio pasó las **6 pestañas** del editor real de ACC (auto **Ferrari 296 GT3**,
preset **"Preajuste de seguridad"**, modo Vuelta Rápida): Neumáticos, Electrónica,
Combustible y Estrategia, Agarre Mecánico, Amortiguadores, Aero. La data previa de
ACC era una plantilla **simplificada de 16 params** (de la investigación genérica) y
NO espejaba el editor real. Reescrito 1:1 → **39 params**. tsc 0 / validate-engine 0
(acc = 39 params) / build verde / **verificado EN VIVO** (Ferrari 296 muestra los 39
params reales = preset Seguridad exacto; Mojado + Inestable-en-pianos mueve los
sliders correctos, incluidos los amortiguadores nuevos).

**Qué cambió (iteración 14):**
- `acc/parameters.ts` → **39 params reales con unidades del juego**: presiones psi
  por eje; **alineación** caída/convergencia/**ángulo de avance (caster, nuevo)** +
  **relación de giro del volante (nuevo)**; **muelles "índice del volante" N/m**
  (front 188964 / rear 136455), **topes de suspensión** (índice N + amplitud, nuevos),
  barras; **8 amortiguadores** (badén/comp.rápida/extensión/ext.rápida × 2 ejes,
  nuevos); aero altura del/tras + **ala** + **splitter (nuevo)**; frenos reparto +
  **potencia de frenada (nuevo)** + **conductos del/tras (nuevos)** + **pastillas
  del/tras (nuevas)**; **precarga del diferencial 70 Nm**; electrónica **TC 1-8 / ABS
  1-12 (rangos EXACTOS de la tabla en pantalla)** + **ECU Map (nuevo)** + **TC2 (ahora
  GLOBAL)**.
- **Defaults = valores EXACTOS del preset Seguridad** del 296 (p. ej. caster 11.0°,
  bias 59.0%, TC/ABS 5, ala 12, alturas 70/70, badén del 8/comp.rápida 4/extensión
  7/ext.rápida 5, tras 5/6/8/7).
- **Rangos:** exactos donde el juego los muestra (TC 1-8, ABS 1-12); el resto
  **estimado** y marcado "(rango estimado)" (mismo criterio AC Rally/EA WRC), porque
  el editor no muestra los topes de cada slider.
- `rules.ts` → todos los paramIds previos siguen válidos y sus steps no cambiaron
  (deltas siguen calibrados). Enriquecida `kerb_instability`: además de barras+altura
  ahora baja **compresión rápida** del/tras (−2) — físicamente correcto y ejercita los
  amortiguadores nuevos. TC/ABS deltas siguen OK con los rangos nuevos (1-8 / 1-12).
- `cars.ts` → Ferrari 296 GT3 marcado como **auto de referencia** (hereda defaults =
  preset, sin baseSetup propio). **Eliminado el extraParam TC2 del McLaren 720S Evo**:
  el 296 también trae TC2 → TC2 pasó a param GLOBAL (el extraParam habría chocado con
  el global y roto el validador). baseSetups por-auto previos siguen válidos.

**Lo que FALTA para exactitud total en ACC (necesita más capturas in-game):**
1. **Rangos min/max reales de los sliders estimados** (muelles N/m, topes de
   suspensión, los 8 amortiguadores, caster, relación de giro, ECU Map, TC2, splitter,
   potencia de frenada, conductos). Hoy estimados desde el preset del 296. Capturar los
   topes leyendo el garaje si se quiere exactitud fina.
2. **Convención de signo del toe** a confirmar (asumido: front negativo = toe-out).
3. **Valores de preset por-auto.** Hoy todos los GT3/GT4 heredan los defaults del 296.
   ACC NO es 100% uniforme: algunos autos no tienen TC2, y muelles/ala/caster varían por
   coche. Estructura y direcciones ya están bien; faltan los **valores** por-auto
   (capturar el garaje de cada uno cuando se pueda). Los overrides de `rear_wing`
   (max 8/7/5/4) y de ARB de GT4 (0-2) ya existentes se mantuvieron.

**Opcional ya disponible:** workflow adversarial para auditar la dirección física de
las reglas de ACC con los params nuevos (sobre todo amortiguadores y precarga del
diferencial). Independiente de los rangos. Pendiente de luz verde de Patricio.

---

## 3m. COMPLETADA (iteración 15): AC EVO reconstruido contra captura IN-GAME (2026-06-25)

Patricio pasó las **6 pestañas** del editor real de AC EVO (auto **Porsche 992 GT3 R**,
modo **Carrera**, build **v0.7.1**, preset de fábrica): Neumáticos, Electrónica,
Combustible y Estrategia, Suspensión, Amortiguadores, Aero. La data previa era una
plantilla genérica de **35 params** que NO espejaba el editor real. Reescrito 1:1 →
**29 params**. tsc 0 / validate-engine 0 (ac_evo = 29 params) / build verde /
**verificado EN VIVO** (Porsche 992 GT3 R muestra el preset exacto; Mojado mueve
presión/altura/TC/ala, e Inestable-en-pianos mueve barras + los amortiguadores lentos
nuevos por eje, sin NaN ni errores de consola).

**Hallazgo clave — el editor de AC EVO es MÁS chico de lo que asumía la plantilla:**
sólo tiene 6 pestañas y **NO** tiene pestaña de caja de cambios ni de frenos aparte (la
frenada vive en Suspensión como "Distribución de Frenada"). Por eso se **ELIMINARON**
del set: `final_drive`, `diff_power`, `diff_coast`, `brake_pressure`, `brake_ducts`,
`front_wing` (este Porsche no tiene splitter ajustable), `fuel` (estrategia) y los
**amortiguadores rápidos** (AC EVO sólo expone compresión/extensión LENTAS).

**Qué cambió (iteración 15):**
- `ac_evo/parameters.ts` (35 → **29 params**) con **unidades reales del juego**:
  presión psi por eje (F 26 / R 25.5); alineación **caída** (F −4 / R −3.5°),
  **convergencia** (F −0.1 / R 0.1°), **ángulo de avance/caster** (F 3°, default bajo);
  **muelle "Tasa de suspensión" en N/m** (F 340000 / R 360000, era N/mm); **tope de
  suspensión** dividido por eje (índice N 4000/4000 + amplitud mm F 15 / R 5);
  barras F 4 / R 5; **4 amortiguadores LENTOS** por eje (comp. F 6 / R 7, ext. F 7 / R 8);
  aero **sólo altura del 60 / tras 75 + ala trasera 11** (sin splitter); **distribución
  de frenada 60%**; **precarga del diferencial 100 Nm**; electrónica **TC1 5 + TC2 3
  (nuevo) + ABS 4 + Mapa Motor 3**.
- **Defaults = valores EXACTOS de la captura** del 992 GT3 R.
- **Rangos:** **estimados** (el editor no muestra topes), marcados en el comentario de
  cabecera; mismo criterio que ACC/AC Rally.
- `rules.ts` → purgados todos los paramIds que ya no existen: las reglas de
  diferencial usan ahora sólo `diff_preload`; `wet`/temp sin front_wing/brake_ducts;
  `fuel_high` sin `fuel`; `bouncing` usa bumpstop_range **F+R**; `kerb_instability`
  ablanda los **amortiguadores lentos F+R** (antes los rápidos, que ya no existen).
- `cars.ts` → **Porsche 992 GT3 R = auto de referencia** (hereda defaults, sin baseSetup
  propio). Limpiados los baseSetups que referenciaban params eliminados (front_wing/
  diff_power/diff_coast); los autos de calle FWD ahora ponen `rear_wing:0` + `tc2:0`.
  Sin paramOverrides (no hay topes por-clase verificados todavía).

**Lo que FALTA para exactitud total en AC EVO (necesita más capturas in-game):**
1. **Rangos min/max reales** de los sliders (todo estimado desde el preset del 992).
2. **Valores de preset por-auto** (hoy todos heredan los del 992 GT3 R; la lista de
   autos sigue parcial — early access, blanco móvil).
3. Confirmar si alguna **otra clase** (formula/road) expone params que el 992 GT3 R no
   (p. ej. front wing en fórmula): si aparecen, se agregan como `Category.extraParams`.

---

## 3n. COMPLETADA (iteración 16): LMU reconstruido contra DOS capturas IN-GAME (2026-06-25)

Patricio mandó **12 fotos** (3 tandas), las **6 pestañas** del editor real por cada
clase: **Hypercar = Alpine A424 #35** y **LMGT3 = McLaren 720S LMGT3 Evo #59** (Racing
Spirit of Léman, Bahrain). Pidió: *"revisa si son los mismos parámetros o cambian y
ajusta acorde a eso."* La data previa de LMU era una plantilla genérica (basada en
wiki/Coach Dave), no en captura. Reescrito 1:1. tsc 0 / validate-engine 0 (lmu = **45
params**) / build verde / **verificado por motor** (base Alpine y McLaren = capturas
exactas; reglas wet+pianos disparan en GT3 sin NaN).

**Veredicto a la pregunta:** el **template del editor es el MISMO** para ambas clases (6
pestañas, mismos campos), pero **~8 ajustes cambian** → modelo de 2 clases:

| Área | Hypercar (global) | LMGT3 (override/extra) |
|---|---|---|
| 3.er resorte (heave) | activo (índice 5/6) | **N/D** → extra solo-HC |
| Muelle de goma | Desacoplada | **N/D** → extra solo-HC |
| ABS | **N/A** (sin ABS) | 9 → extra **solo-GT3** |
| Híbrido (regen kW, mapa eléctrico kW) | 170 / 50 | 0 / 0 → extras solo-HC |
| Diff Potencia/Inercia | 30% / 60% | **Non-adjustable** → extras solo-HC |
| Ala trasera | pasos P (P13) | **grados** 0-15 (10.0°) → override |
| Dampers | clicks 0-25 (10/4...) | **B##/R## 0-50** (19/41...) → override |
| Mezcla motor | Full (6) | Race (4) → override |

**Decisión de modelado (cars.ts):** GLOBAL = **Hypercar** (Alpine, defaults exactos);
**LMGT3** = `paramOverrides` de clase (defaults exactos del McLaren + rangos donde la
escala cambia: ala en grados, dampers 0-50). Extras: `lmuHypercarExtras` (heave F/R,
muelle de goma F/R, diff power/inercia, diff delantero power/inercia/precarga, regen,
mapa eléctrico) en la clase Hypercar; `lmuGt3Abs` en la clase LMGT3. Prototipos
LMP2/LMP3 corren **sin TC** → `baseSetups` deja los 3 canales en 0. **45 params
universales** (presión kPa, camber/toe grados, muelles índice, topes/alturas/discos cm,
barras P, dampers lenta+rápida por eje, freno bias/migración/fuerza/ductos/discos,
precarga Nm, dirección, 3 canales de TC, mezcla/limitador/radiadores, combustible,
energía virtual, relación de cambio, difusor).

**Eliminado vs la plantilla vieja:** `front_aero`/`packers`/`bump`/`rebound` genéricos,
`diff_coast` (LMU no tiene coast: el diff es power/inercia/precarga), `final_drive`
(es selector Short/Standard/Long → `gear_ratio`), `brake_pressure`→`brake_pedal_force`,
`brake_ducts`→ductos F/R, `deployment_map`→`electric_map`. Springs N/mm→índice; ala única
→ por clase; dampers únicos → lenta/rápida por eje.

**Trampa de ingeniería resuelta:** el motor (`apply()` en engine/index.ts) ignora un
delta sobre un paramId ausente, así que las reglas PODRÍAN tocar abs/diff_power. **PERO**
`validate-engine.ts` chequea paramIds de reglas contra el set GLOBAL únicamente → falla
si una regla referencia un extra de clase. Por eso las reglas usan **solo params
universales**; ABS (GT3) y Power lock (Hypercar) se mencionan en el texto educativo de la
regla como ajuste manual, pero los deltas no los tocan (misma convención que TC2 en ACC).

**Lo que FALTA para exactitud total en LMU (necesita más capturas):**
1. Rangos min/max reales de los sliders (estimados desde 2 presets; defaults exactos).
2. Presets por-auto dentro de cada clase (hoy todos los Hypercar heredan el Alpine y
   todos los LMGT3 el McLaren).
3. Capturas de LMP2/LMP3/GTE (hoy heredan el set global Hypercar; solo se les apagó el TC).

---

## 3o. COMPLETADA (iteración 17): F1 25 e iRacing ELIMINADOS de la app (2026-06-25)

Decisión de Patricio (verbatim): "ahora elimina todo lo del juego de F1 y iracing de la
app, vamos a dejarlo fuera". Ambos juegos quedan **fuera del alcance** del producto.

**Qué se borró/cambió:**
- **Borrados** los directorios `src/data/f1_25/` y `src/data/iracing/` completos
  (cars/tracks/parameters/rules/ffb/index) vía `git rm -r`.
- `src/data/registry.ts` → quitados imports y entradas de `implementedGames` (de 7 →
  **5 sims**: acc, lmu, ac_evo, ac_rally, ea_wrc). `gameCatalog`, `getGame()` e
  `isImplemented()` ya no resuelven f1_25/iracing.
- `src/data/load-game.ts` → quitados los loaders dinámicos de f1_25/iracing.
- `src/lib/i18n/dictionaries.ts` → landing `feature1Title` "7 → 5 simuladores" (es+en)
  y `feature1Body` sin "F1 25" ni "iRacing" (es+en, paridad mantenida).
- `src/app/app/[gameId]/generator.tsx` y `README.md` → conteos/listas actualizados.
- **NO se tocó** `src/data/hardware/fanatec.ts`: menciona "iRacing" solo como ejemplo
  genérico de valores de FFB del volante (consejo de hardware, no claim de juego
  soportado) → se deja.

**Verificación:** tsc 0 / validate-engine 0 (5 juegos: acc 39, lmu 45, ac_evo 29,
ac_rally 36, ea_wrc 33) / `npm run build` verde (16/16 estáticas). Commit + push hechos.

**Pendiente tras esto:** ninguno de reconstrucción. La app queda con 5 sims. (Si se
quiere re-sumar F1 25 o iRacing en el futuro, recuperar desde el historial de git.)

---

## 3p. COMPLETADA (iteración 18): Auditoría multiagente full + fixes (2026-06-25)

Patricio pidió: *"lee el handoff y lanza una auditoría multiagente para revisar que esté
todo bien, cómo mejorarla y optimizarla y asegurarte que sea consistente y todo funcione."*

**Workflow de auditoría** `wf_3a82f33b-bd8` (106 agentes, 13 dimensiones: engine ·
data-consistency · física ×3 (acc / rally+wrc / lmu+evo) · ffb · seguridad · api-errores
· i18n · ux-a11y · next16-react · performance · config). Cada hallazgo pasó por **2
refutadores adversariales** (refute-by-default). **30 confirmados, 16 descartados** como
falsos positivos/preferencia. Veredicto: **app fundamentalmente sólida** — motor correcto
(merge order, clamp/step, delta stacking, FWD dedup), auth bien scoped al usuario, API
con códigos uniformes, i18n con paridad ES/EN completa. **Sin agujeros de seguridad ni de
integridad de datos.**

**APLICADO (fixes, todos verificados tsc 0 / validate-engine 0 / build verde):**
- **🔴 Física EA WRC `weather_wet`** (`ea_wrc/rules.ts`): `brake_bias` +2 → **−2**. Movía
  el reparto ADELANTE con la justificación "para no bloquear" (invertido vs física, vs su
  propio param, vs snow/gravel y vs AC Rally). Reason es+en reescrita.
- **🔴 Física AC EVO `oversteer_exit`** (`ac_evo/rules.ts`): `diff_preload` −2 → **+2**.
  Idéntico a `understeer_exit` (síntoma opuesto) y contradecía el increaseEffect del param
  + `oversteer_entry`/`braking_instability` (+2). Reason es+en reescrita.
- **FFB LMU** (`lmu/ffb.ts`): `steering_torque_capability` perBase `gt_dd_pro`/`csl_dd`
  "8" → **"5 (8 con Kit Boost)"** (contradecía `fanatec.ts` maxTorqueNm:5 y su propia nota).
- **Motor** (`engine/index.ts` `baseFor`): defaults heredados ahora pasan por
  `clampToParam` (encajan al step grid, como ya hacían los baseSetups; honra el doc comment).
- **i18n** (`context.tsx` `setLocale`): ahora actualiza `document.documentElement.lang`
  al cambiar idioma (WCAG 3.1.2; antes quedaba stale hasta navegar).
- **Bundle / code-split** (`garage-view.tsx`, `games-grid.tsx`): eran `"use client"` e
  importaban el barrel `@/data/registry` (arrastraba los 5 juegos completos al bundle,
  ~100 KB gz, anulando `load-game.ts`). Nuevo módulo **`src/data/game-metas.ts`**
  (solo `GameMeta[]` + `implementedGameIds: Set`, sin importar data por-juego); los nombres
  del garaje se resuelven server-side en `garage/page.tsx`. Verificado: ningún módulo
  cliente importa `@/data/registry`.
- **a11y `generator.tsx`** (lote): **bug funcional** del botón Favorito que quedaba
  trabado "Guardado" tras regenerar (`useEffect(setFavSaved(false),[result])`); `aria-pressed`
  en `Segmented`; `role="group"` + `aria-labelledby` en los 5 campos segmentados (antes el
  `<label>` no nombraba nada); contraste `text-muted/70|/60` → `text-muted` (col base +
  caption + hint, fallaban AA 4.5:1); `aria-label` en input de vuelta; `role="alert"` en
  mensajes de estado/error.
- **Contraste botones** (5 componentes): `hover:bg-brand-strong` con `text-bg` (4.02:1) →
  `text-fg` (~4.55:1) en page.tsx / generator.tsx ×2 / auth-form.tsx / site-header.tsx.
- **Consistencia castellano** (voseo→tuteo): 21 reemplazos en 6 archivos de data +
  11 usted→tuteo en las "reglas de oro" FFB (acc/ea_wrc/lmu/ac_evo `ffb.ts`). **0 voseo /
  0 usted-imperativo** en strings `es:` (re-grep confirmado). `en:` intacto.
- **Build/DX** (`package.json`): agregado `tsx ^4` a devDependencies (los scripts usaban
  `npx tsx` sin declararlo) + scripts `validate` y `seed`.

**PENDIENTE / recomendado (NO bugs — mejoras futuras, no aplicadas):**
1. **Tests del motor**: no hay unit tests del core determinístico ni script `test`. Las
   3 clases de bug de física/saturación de esta iteración las cazaría un suite chico
   (snapping, delta stacking, FWD exclude, y assert "signo del reason == signo del delta"
   por regla). Es la mejora de mayor ROI.
2. **ACC `oversteer_mid` `rear_wing` +1** (`acc/rules.ts`): no-op por saturación en el
   coche de referencia y la mayoría de GT3 (ala ya al máx) → la traza educativa promete un
   cambio que no ocurre. Bajar el default global del ala, o quitar el delta de ala. Cosmético.
3. **LMU `wet` presiones −5** (`lmu/rules.ts`): defendible pero opuesto a `tyres_cold`/
   `track_temp_low` (+) y a AC EVO wet (+). Confirmar convención (presión fría vs objetivo).
4. **Favoritos sin dedupe a nivel DB** (`api/favorites`): `@@unique([userId,gameId,carId,trackId])`
   + upsert evitaría duplicados por doble-tab. Auto-scoped, baja prioridad.
5. **13 claves i18n huérfanas** + wordmark hardcodeado (`brand.tsx`/`page.tsx`/`layout.tsx`
   en vez de `brand.name`): limpiar o cablear.
6. **Polish a11y**: `focus-visible` ring consistente en chips/summaries; `<thead>/<th scope>`
   en la tabla de setup; `aria-busy`/`role=status` en loading y botones async.
7. **Latente**: colisión de id entre `extraParams` de clase y de auto no validada (hoy
   ningún auto define extraParams → no se dispara); agregar chequeo cross-context al validador.

**Verificación final:** tsc 0 · validate-engine 0 (acc 39 / lmu 45 / ac_evo 29 / ac_rally 36
/ ea_wrc 33) · `npm run build` verde (16/16 estáticas, Proxy presente). NO commiteado/pusheado
(esperando luz verde de Patricio).

---

## 4. Cómo retomar (pasos concretos)

### A. Integrar los 6 juegos (cuando el workflow `wf_855c6e6b-1b2` termine)
1. Verificar qué carpetas se crearon: `src/data/{f1_25,lmu,ac_evo,ac_rally,ea_wrc,iracing}/`.
2. Editar `src/data/registry.ts`:
   - Importar cada juego: `import { f1_25 } from "./f1_25";` (cada index exporta `export const <id>: GameData`).
   - Agregarlos a `implementedGames = [acc, f1_25, lmu, ac_evo, ac_rally, ea_wrc, iracing]`.
   - Quitar de `upcomingMetas` los que ya estén implementados (para que no aparezcan duplicados ni como "próximamente").
3. `npx tsc --noEmit` → reparar errores de tipos (lo más probable: paramId mal referenciado en rules.ts, o campos faltantes en meta).
4. `npm run build` para confirmar.
5. Smoke test: levantar `npm run dev`, entrar a cada juego, generar un setup y abrir el panel FFB.

> Si el workflow se cayó o faltan juegos: re-lanzar con
> `Workflow({ scriptPath: ".../cargar-6-juegos-wf_855c6e6b-1b2.js", resumeFromRunId: "wf_855c6e6b-1b2" })`
> (los agentes ya completados devuelven cache; solo re-corren los que faltan).

### B. Loop de QA adversarial (pedido explícito de Patricio)
Lanzar un workflow de review con agentes que **renieguen lo hecho**. Dimensiones sugeridas:
- **Exactitud de datos** por juego: ¿los autos/pistas/parámetros existen y los rangos son reales? (verificar contra fuentes de la investigación, sección `sources`).
- **Coherencia física de las reglas**: ¿cada conditionRule/symptomRule mueve el parámetro en la dirección correcta?
- **FFB**: ¿los valores recomendados y el gain perBase tienen sentido para cada base? ¿nombres de settings in-game correctos por sim?
- **Código**: bugs en motor/auth/API, manejo de errores, i18n sin strings faltantes.
- **UX**: comparar contra apps similares; flujo claro, mobile, accesibilidad.
Patrón: find → verificar adversarial (≥2 votos) → confirmar → arreglar → re-verificar.

---

## 5. Mapa de archivos clave

```
patagonia-sim-setups/
  src/
    lib/
      types.ts              # CONTRATO del dominio (FFB + ParamRangeOverride; Car/Category.paramOverrides)
      engine/index.ts       # motor: effectiveParams/effectiveParam, baseFor, generateSetup, clampToParam
      auth/                 # session.ts (cookie secure condicional), current-user.ts, password.ts
      i18n/                 # context.tsx (useT, localize), dictionaries.ts, getLocale()
    data/
      registry.ts           # los 7 juegos; implementedGames + gameCatalog (barrel estático: grilla /app + /garage)
      load-game.ts          # loadGame(id) con import() dinámico por juego (code-split de /app/[gameId], §3k)
      hardware/fanatec.ts   # bases Fanatec + parámetros menú tuning (NUEVO)
      acc/                  # PLANTILLA de referencia (parameters/cars/tracks/rules/ffb/index)
      <otros 6 juegos>/     # los genera el workflow
    components/
      ffb-panel.tsx         # panel FFB/Fanatec (NUEVO)
      brand.tsx             # logo (reemplazar por el oficial)
      site-header.tsx, games-grid.tsx, garage-view.tsx, auth-form.tsx
    app/
      app/[gameId]/generator.tsx   # centro de la app (selección + resultado + FFB)
      api/                  # auth, favorites, notes, laps
  prisma/schema.prisma      # User, Favorite, Note, LapRecord
  README.md, HANDOFF.md (este archivo)
```

---

## 6. Datos de la investigación (fuente para los 6 juegos)

Resultado completo (JSON, ~240KB) del workflow de investigación (18 agentes):
`C:\Users\patri\AppData\Local\Temp\claude\C--Users-patri-Desktop-App-seteo-autos\a5121d3d-a7eb-4d35-84b1-2b26d49dd7e0\tasks\w3kqggqcr.output`

Estructura: `result.gameResults[]` (uno por juego, con `carClasses`, `tracks`,
`setupParameters` con su `effect`, condiciones, `sources`) + estudios transversales.
Buscar el bloque de cada juego por `"gameKey"` (f1-25, lmu, ac-evo, ac-rally, ea-wrc, iracing).

> Este archivo es temporal del sistema; si desaparece, los datos ya quedaron
> volcados en `src/data/<juego>/`. Para re-investigar, ver memoria del proyecto.

---

## 7. Cómo correr la app

```bash
cd patagonia-sim-setups
npm install
cp .env.example .env        # completar AUTH_SECRET
npx prisma generate && npx prisma db push
npm run dev                 # http://localhost:3000
```

### Preview en vivo (pedido de Patricio — arrancar en CADA sesión)
Patricio quiere ver un **preview en vivo** de la app en cada sesión para validar cambios en tiempo real.
- Config persistente ya creada: `.claude/launch.json` (en la **raíz** del working dir, no en la subcarpeta). Corre `npm --prefix patagonia-sim-setups run dev` en el puerto 3000.
- Al iniciar la sesión, arrancar con la herramienta de Preview: `preview_start({ name: "patagonia-sim-setups" })`. Si ya corre, la reutiliza.
- Next.js tiene **Fast Refresh**: los edits se reflejan solos en el preview. Tras tocar UI, sacar `preview_screenshot` para confirmar.
- `.env` (con `AUTH_SECRET`) y `prisma/dev.db` ya existen, así que levanta sin pasos extra.

### Cuenta de administrador (para ver el avance)
Hay un seed idempotente que crea/actualiza la cuenta admin de Patricio:
- Script: `scripts/seed-admin.ts` → `npx tsx scripts/seed-admin.ts`.
- Credenciales por defecto: **email** `patricio.ponce358@gmail.com` · **clave** `Patagonia2026!` · `role=admin`.
- Cambiar clave: `ADMIN_PASSWORD="otra" npx tsx scripts/seed-admin.ts` (o `ADMIN_EMAIL`/`ADMIN_NAME`).
- Es cuenta de **desarrollo local**: para producción, cambiar la clave y no versionar credenciales reales.
- Nota: el rol `admin` ya está en el schema y viaja en el JWT, pero todavía NO restringe ninguna vista (no hay panel admin); por ahora solo desbloquea el login a `/app` y `/garage`.

---

## 8. Memoria persistente

La memoria del proyecto vive en
`C:\Users\patri\.claude\projects\C--Users-patri-Desktop-App-seteo-autos\memory\`
(`MEMORY.md` = índice; `patagonia-setup-app.md` = decisiones del proyecto).
Revisarla al iniciar cualquier sesión nueva.

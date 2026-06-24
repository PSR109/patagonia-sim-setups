# HANDOFF — App de Setups Patagonia Sim Racing

> Documento para **retomar el trabajo en otra sesión** sin perder contexto.
> Última actualización: 2026-06-24 (iteración 7: loop 3 — #1 rosters completos en todos los juegos, ver §3h; iteración 6 en §3g).

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

### ✅ Resultado: app funcional de punta a punta (7 juegos + FFB), build verde, QA pasado. Lista para usar con `npm run dev`.

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

**Mejoras nuevas opcionales (NO parte de las 5; requieren tu OK):** expandir iRacing más allá del subset curado de road racing; afinar/ampliar datos de FFB por juego.

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
      registry.ts           # los 7 juegos; implementedGames + gameCatalog  <-- INTEGRACIÓN ACÁ
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

# Patagonia Sim Racing — App de Setups

Web app que **genera y explica** setups de simracing. El usuario elige juego →
auto → pista → condiciones (y/o describe su problema: subviraje, sobreviraje,
etc.) y la app devuelve el setup recomendado **con la explicación del porqué de
cada ajuste**. Login gratis, favoritos, notas y registro de tiempos. Español por
defecto, con opción de inglés.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tema/branding en `src/app/globals.css`)
- **Prisma 6 + SQLite** (datos de usuario: cuentas, favoritos, notas, vueltas)
- **Auth propia**: contraseñas con bcrypt, sesión JWT (jose) en cookie httpOnly,
  protección de rutas con el Proxy de Next (`src/proxy.ts`)
- **i18n** ES/EN propio (`src/lib/i18n`)

El catálogo de juegos/autos/pistas/parámetros y las **reglas de setup** viven como
módulos TypeScript en `src/data` (rápidos, versionados y fáciles de corregir). La
base de datos solo guarda lo de cada usuario.

## Puesta en marcha

```bash
npm install
cp .env.example .env        # y completá AUTH_SECRET (ver abajo)
npx prisma generate
npx prisma db push          # crea la base SQLite (dev.db)
npm run dev                 # http://localhost:3000
```

Generar un `AUTH_SECRET` propio:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Producción:

```bash
npm run build
npm run start
```

## Estructura

```
src/
  app/                 # rutas (App Router)
    page.tsx           # landing
    login, register    # auth
    app/               # panel (protegido): grilla de juegos
    app/[gameId]/      # generador de setup + explicaciones
    garage/            # favoritos, notas, tiempos (protegido)
    api/               # auth + favorites + notes + laps
  components/          # header, grilla, garaje, formularios
  data/                # CATÁLOGO + REGLAS por juego
    registry.ts        # los 7 juegos; cuáles tienen datos completos
    acc/               # juego de referencia (plantilla completa)
  lib/
    engine/            # motor: setup base + reglas de condición + síntoma
    auth/  i18n/        # sesión + traducciones
    types.ts           # contrato del dominio
```

## Cómo agregar un juego

Copiá la carpeta `src/data/acc/` como plantilla (parameters / cars / tracks /
rules / index), completá los datos verificados del juego y registralo en
`src/data/registry.ts` dentro de `implementedGames`. El motor y la UI funcionan
sin cambios.

## Estado

- ✅ App completa y verificada (auth, i18n, motor, generador, garaje).
- ✅ **ACC** implementado de punta a punta como referencia.
- ✅ Datos de los otros 4 juegos (Le Mans Ultimate, AC EVO, AC Rally, EA WRC)
  reconstruidos 1:1 contra el editor real de cada sim. (F1 25 e iRacing quedaron
  fuera del alcance.)

## Branding

Logo y colores en un solo lugar: `src/components/brand.tsx` (reemplazá el SVG por
el logo oficial cuando lo tengas) y los tokens de color en `src/app/globals.css`.

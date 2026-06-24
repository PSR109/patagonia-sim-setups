// Crea (o actualiza) la cuenta de ADMINISTRADOR para entrar a la app y ver el
// avance. Es idempotente: se puede correr las veces que haga falta y siempre deja
// la cuenta con la contraseña y el rol indicados. Las credenciales se pueden
// sobreescribir por variables de entorno.
//   Correr:  npx tsx scripts/seed-admin.ts
//   Cambiar clave:  ADMIN_PASSWORD="otra-clave" npx tsx scripts/seed-admin.ts
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

const EMAIL = (process.env.ADMIN_EMAIL ?? "patricio.ponce358@gmail.com").toLowerCase();
const PASSWORD = process.env.ADMIN_PASSWORD ?? "Patagonia2026!";
const NAME = process.env.ADMIN_NAME ?? "Patricio";

async function main() {
  const passwordHash = await hashPassword(PASSWORD);
  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: { passwordHash, role: "admin", name: NAME },
    create: { email: EMAIL, name: NAME, passwordHash, role: "admin", locale: "es" },
  });
  console.log(`✓ Admin listo: ${user.email}  (role=${user.role})`);
  console.log(`  Clave: ${PASSWORD}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("✗ Error sembrando admin:", e);
    process.exit(1);
  });

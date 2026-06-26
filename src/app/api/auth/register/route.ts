import { NextResponse } from "next/server";

// Registro DESHABILITADO: la app es privada (un solo administrador). Las cuentas
// se crean por seed/CLI (scripts/seed-admin.ts), nunca por la web. Cualquier
// intento de registro se rechaza con 403.
export async function POST() {
  return NextResponse.json({ error: "registration_disabled" }, { status: 403 });
}

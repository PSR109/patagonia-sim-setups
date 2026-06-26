import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth/session";

// App PRIVADA: solo el administrador entra. El chequeo de sesión acá es
// "optimista" (verifica el JWT, sin tocar la base), como recomienda Next 16; la
// autorización real se reafirma en cada Server Component / Route Handler.
const PROTECTED_PREFIXES = ["/app", "/garage"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;
  const isAdmin = session?.role === "admin";

  // El registro está deshabilitado (app de un solo dueño): /register → /login.
  if (pathname === "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  // Las áreas de la app exigen sesión Y rol admin. Cualquier otra cosa → login.
  if (isProtected && !isAdmin) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Ya logueado como admin: la página de login redirige a la app.
  if (pathname === "/login" && isAdmin) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/garage/:path*", "/login", "/register"],
};

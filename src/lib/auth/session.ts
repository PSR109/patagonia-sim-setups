import { SignJWT, jwtVerify } from "jose";

// Sesión firmada (JWT) guardada en una cookie httpOnly. jose es compatible con
// el runtime edge, así que el Proxy puede verificar la sesión.
export const SESSION_COOKIE = "psr_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

// Valores que NO se aceptan como secreto real: el viejo fallback hardcodeado y
// el placeholder del .env.example. Evita que un deploy quede firmando sesiones
// con un secreto conocido públicamente (que permitiría forjar cualquier JWT).
const INSECURE_SECRETS = new Set([
  "dev-insecure-secret-change-me",
  "cambiame-por-un-secreto-largo-y-aleatorio",
]);

// El secreto se resuelve de forma perezosa (no al importar) para no romper el
// build, pero falla rápido la primera vez que se firma/verifica si falta o es
// débil. Nunca hay un secreto por defecto.
let cachedSecret: Uint8Array | null = null;
function getSessionSecret(): Uint8Array {
  if (cachedSecret) return cachedSecret;
  const raw = process.env.AUTH_SECRET;
  if (!raw || raw.length < 32 || INSECURE_SECRETS.has(raw)) {
    throw new Error(
      "AUTH_SECRET no está configurado, es demasiado corto (mínimo 32 caracteres) " +
        "o usa un valor inseguro de ejemplo. Definí uno propio en .env " +
        '(generá con: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))").',
    );
  }
  cachedSecret = new TextEncoder().encode(raw);
  return cachedSecret;
}

export interface SessionPayload {
  sub: string; // userId
  email: string;
  role: string;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret());
}

// Opciones de la cookie de sesión. `secure` solo cuando la conexión es https,
// para que funcione tanto en https (deploy) como en http://localhost.
export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function isRequestSecure(request: Request): boolean {
  const proto = request.headers.get("x-forwarded-proto");
  if (proto) return proto.split(",")[0].trim() === "https";
  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (!payload.sub) return null;
    return {
      sub: payload.sub as string,
      email: (payload.email as string) ?? "",
      role: (payload.role as string) ?? "client",
    };
  } catch {
    return null;
  }
}

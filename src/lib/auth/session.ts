import { SignJWT, jwtVerify } from "jose";

// Sesión firmada (JWT) guardada en una cookie httpOnly. jose es compatible con
// el runtime edge, así que el Proxy puede verificar la sesión.
export const SESSION_COOKIE = "psr_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-insecure-secret-change-me",
);

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
    .sign(secret);
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
    const { payload } = await jwtVerify(token, secret);
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

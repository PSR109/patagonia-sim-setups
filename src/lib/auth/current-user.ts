import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, verifySession } from "./session";

export interface CurrentUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  locale: string;
}

// Lee la sesión desde la cookie y devuelve el usuario actual (o null).
// Solo para Server Components, Server Actions y Route Handlers (runtime Node).
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, name: true, role: true, locale: true },
  });
  return user;
}

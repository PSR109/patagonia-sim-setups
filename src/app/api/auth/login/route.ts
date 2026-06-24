import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import {
  SESSION_COOKIE,
  isRequestSecure,
  sessionCookieOptions,
  signSession,
} from "@/lib/auth/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = await signSession({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions(isRequestSecure(request)));

  return NextResponse.json({ ok: true });
}

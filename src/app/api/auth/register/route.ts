import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import {
  SESSION_COOKIE,
  isRequestSecure,
  sessionCookieOptions,
  signSession,
} from "@/lib/auth/session";

const schema = z.object({
  name: z.string().trim().min(1).max(80).optional().or(z.literal("")),
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();
  const name = parsed.data.name ? parsed.data.name : null;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "exists" }, { status: 409 });
  }

  try {
    const user = await prisma.user.create({
      data: { email, name, passwordHash: await hashPassword(parsed.data.password) },
    });

    const token = await signSession({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    const store = await cookies();
    store.set(SESSION_COOKIE, token, sessionCookieOptions(isRequestSecure(request)));

    return NextResponse.json({ ok: true });
  } catch (e) {
    // Carrera check-then-create: si otro request creó el mismo email entre el
    // findUnique y el create, Prisma lanza P2002 (unique). Lo mapeamos a 409.
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ error: "exists" }, { status: 409 });
    }
    throw e;
  }
}

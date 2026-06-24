import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/current-user";

const createSchema = z.object({
  gameId: z.string().min(1),
  carId: z.string().min(1),
  trackId: z.string().optional().nullable(),
  body: z.string().min(1).max(4000),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ notes });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const note = await prisma.note.create({
    data: {
      userId: user.id,
      gameId: parsed.data.gameId,
      carId: parsed.data.carId,
      trackId: parsed.data.trackId ?? null,
      body: parsed.data.body,
    },
  });
  return NextResponse.json({ note });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });
  await prisma.note.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}

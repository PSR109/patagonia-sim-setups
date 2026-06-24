import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/current-user";

const createSchema = z.object({
  gameId: z.string().min(1),
  carId: z.string().min(1),
  trackId: z.string().min(1),
  lapTimeMs: z.number().int().positive().max(36_000_000),
  conditions: z.any().optional(),
  setupRef: z.string().optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const laps = await prisma.lapRecord.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ laps });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const lap = await prisma.lapRecord.create({
    data: {
      userId: user.id,
      gameId: parsed.data.gameId,
      carId: parsed.data.carId,
      trackId: parsed.data.trackId,
      lapTimeMs: parsed.data.lapTimeMs,
      conditions: parsed.data.conditions
        ? JSON.stringify(parsed.data.conditions)
        : null,
      setupRef: parsed.data.setupRef ?? null,
      notes: parsed.data.notes ?? null,
    },
  });
  return NextResponse.json({ lap });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });
  await prisma.lapRecord.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}

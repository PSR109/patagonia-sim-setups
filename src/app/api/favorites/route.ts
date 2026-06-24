import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/current-user";

const createSchema = z.object({
  gameId: z.string().min(1),
  carId: z.string().min(1),
  trackId: z.string().optional().nullable(),
  label: z.string().max(120).optional().nullable(),
  payload: z
    .any()
    .refine((v) => JSON.stringify(v ?? {}).length <= 8000, "payload_too_large"),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ favorites });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const json = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const fav = await prisma.favorite.create({
    data: {
      userId: user.id,
      gameId: parsed.data.gameId,
      carId: parsed.data.carId,
      trackId: parsed.data.trackId ?? null,
      label: parsed.data.label ?? null,
      payload: JSON.stringify(parsed.data.payload ?? {}),
    },
  });
  return NextResponse.json({ favorite: fav });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });
  await prisma.favorite.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ ok: true });
}

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { GarageView } from "@/components/garage-view";

export default async function GaragePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/garage");

  const [favorites, notes, laps] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.lapRecord.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <GarageView
      favorites={favorites.map((f) => ({
        id: f.id,
        gameId: f.gameId,
        carId: f.carId,
        trackId: f.trackId,
        label: f.label,
        createdAt: f.createdAt.toISOString(),
      }))}
      notes={notes.map((n) => ({
        id: n.id,
        gameId: n.gameId,
        carId: n.carId,
        trackId: n.trackId,
        body: n.body,
        updatedAt: n.updatedAt.toISOString(),
      }))}
      laps={laps.map((l) => ({
        id: l.id,
        gameId: l.gameId,
        carId: l.carId,
        trackId: l.trackId,
        lapTimeMs: l.lapTimeMs,
        createdAt: l.createdAt.toISOString(),
      }))}
    />
  );
}

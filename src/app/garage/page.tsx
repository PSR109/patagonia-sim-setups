import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { GarageView } from "@/components/garage-view";
import { gameCatalog, getGame } from "@/data/registry";

// Resolución de nombres en el SERVIDOR: arma el texto "Juego · Auto · Pista" a
// partir de @/data/registry acá, así GarageView (componente 'use client') no
// importa el barrel de datos de los 5 juegos y queda fuera del bundle del cliente.
function gameName(id: string): string {
  return gameCatalog.find((g) => g.id === id)?.shortName ?? id;
}
function carName(gameId: string, carId: string): string {
  return getGame(gameId)?.cars.find((c) => c.id === carId)?.name ?? carId;
}
function trackName(gameId: string, trackId: string | null): string | null {
  if (!trackId) return null;
  return getGame(gameId)?.tracks.find((t) => t.id === trackId)?.name ?? trackId;
}
function comboLabel(gameId: string, carId: string, trackId: string | null): string {
  const parts = [gameName(gameId), carName(gameId, carId)];
  const tn = trackName(gameId, trackId);
  if (tn) parts.push(tn);
  return parts.join(" · ");
}

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
        comboLabel: comboLabel(f.gameId, f.carId, f.trackId),
        createdAt: f.createdAt.toISOString(),
      }))}
      notes={notes.map((n) => ({
        id: n.id,
        gameId: n.gameId,
        carId: n.carId,
        trackId: n.trackId,
        body: n.body,
        comboLabel: comboLabel(n.gameId, n.carId, n.trackId),
        updatedAt: n.updatedAt.toISOString(),
      }))}
      laps={laps.map((l) => ({
        id: l.id,
        gameId: l.gameId,
        carId: l.carId,
        trackId: l.trackId,
        lapTimeMs: l.lapTimeMs,
        comboLabel: comboLabel(l.gameId, l.carId, l.trackId),
        createdAt: l.createdAt.toISOString(),
      }))}
    />
  );
}

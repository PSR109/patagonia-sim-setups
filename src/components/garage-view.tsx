"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { gameCatalog, getGame } from "@/data/registry";
import { useT } from "@/lib/i18n/context";

type Fav = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string | null;
  label: string | null;
  createdAt: string;
};
type NoteT = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string | null;
  body: string;
  updatedAt: string;
};
type Lap = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string;
  lapTimeMs: number;
  createdAt: string;
};

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
function fmtLap(ms: number): string {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const mm = ms % 1000;
  return `${m}:${String(s).padStart(2, "0")}.${String(mm).padStart(3, "0")}`;
}

function comboLabel(gameId: string, carId: string, trackId: string | null): string {
  const parts = [gameName(gameId), carName(gameId, carId)];
  const tn = trackName(gameId, trackId);
  if (tn) parts.push(tn);
  return parts.join(" · ");
}

export function GarageView({
  favorites,
  notes,
  laps,
}: {
  favorites: Fav[];
  notes: NoteT[];
  laps: Lap[];
}) {
  const { t } = useT();
  const router = useRouter();

  async function del(kind: "favorites" | "notes" | "laps", id: string) {
    await fetch(`/api/${kind}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight">{t("garage.title")}</h1>

      {/* Favoritos */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t("garage.favorites")}
        </h2>
        {favorites.length === 0 ? (
          <Empty text={t("garage.emptyFav")} />
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {favorites.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface/60 px-4 py-3"
              >
                <Link
                  href={`/app/${f.gameId}`}
                  className="min-w-0 flex-1 truncate text-sm font-medium hover:text-brand"
                >
                  ★ { comboLabel(f.gameId, f.carId, f.trackId)}
                </Link>
                <DeleteBtn onClick={() => del("favorites", f.id)} label={t("common.delete")} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notas */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t("garage.notes")}
        </h2>
        {notes.length === 0 ? (
          <Empty text={t("garage.empty")} />
        ) : (
          <ul className="flex flex-col gap-2">
            {notes.map((n) => (
              <li
                key={n.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface/60 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted">{comboLabel(n.gameId, n.carId, n.trackId)}</p>
                  <p className="mt-0.5 whitespace-pre-wrap text-sm">{n.body}</p>
                </div>
                <DeleteBtn onClick={() => del("notes", n.id)} label={t("common.delete")} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Tiempos */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t("garage.laps")}
        </h2>
        {laps.length === 0 ? (
          <Empty text={t("garage.empty")} />
        ) : (
          <ul className="flex flex-col gap-2">
            {laps.map((l) => (
              <li
                key={l.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface/60 px-4 py-3"
              >
                <div className="min-w-0">
                  <span className="font-mono text-base font-semibold text-brand">
                    {fmtLap(l.lapTimeMs)}
                  </span>
                  <span className="ml-3 text-xs text-muted">
                    {comboLabel(l.gameId, l.carId, l.trackId)}
                  </span>
                </div>
                <DeleteBtn onClick={() => del("laps", l.id)} label={t("common.delete")} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted">
      {text}
    </div>
  );
}

function DeleteBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-danger/10 hover:text-danger"
      aria-label={label}
    >
      ✕
    </button>
  );
}

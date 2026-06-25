"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/context";

// `comboLabel` es el texto "Juego · Auto · Pista" ya resuelto en el servidor
// (garage/page.tsx), para no importar @/data/registry desde este componente
// 'use client' y mantener los datos de los 5 juegos fuera del bundle del cliente.
type Fav = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string | null;
  label: string | null;
  comboLabel: string;
  createdAt: string;
};
type NoteT = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string | null;
  body: string;
  comboLabel: string;
  updatedAt: string;
};
type Lap = {
  id: string;
  gameId: string;
  carId: string;
  trackId: string;
  lapTimeMs: number;
  comboLabel: string;
  createdAt: string;
};

function fmtLap(ms: number): string {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const mm = ms % 1000;
  return `${m}:${String(s).padStart(2, "0")}.${String(mm).padStart(3, "0")}`;
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
  const [delError, setDelError] = useState<string | null>(null);

  async function del(kind: "favorites" | "notes" | "laps", id: string) {
    // Borrado permanente (hard delete en la API): confirmamos para evitar
    // pérdida de datos por un click accidental en la ✕.
    if (!window.confirm(t("garage.deleteConfirm"))) return;
    setDelError(null);
    try {
      const res = await fetch(`/api/${kind}?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      // Sin chequear res.ok el ítem "reaparecía" tras refresh sin avisar; sin
      // try/catch un fallo de red dejaba el click sin efecto y sin feedback.
      if (res.ok) router.refresh();
      else setDelError(t("garage.deleteError"));
    } catch {
      setDelError(t("garage.deleteError"));
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold tracking-tight">{t("garage.title")}</h1>

      {delError && (
        <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {delError}
        </p>
      )}

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
                  ★ {f.comboLabel}
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
                  <p className="text-xs text-muted">{n.comboLabel}</p>
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
                    {l.comboLabel}
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

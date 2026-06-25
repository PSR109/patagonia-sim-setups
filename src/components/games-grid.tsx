"use client";

import Link from "next/link";
import { gameMetas, implementedGameIds } from "@/data/game-metas";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

export function GamesGrid() {
  const { t } = useT();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t("games.title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("games.subtitle")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gameMetas.map((g) => {
          const ready = implementedGameIds.has(g.id);
          const card = (
            <div
              className={cn(
                "group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-border bg-surface/60 p-5 transition-colors",
                ready ? "hover:border-brand/60 hover:bg-surface" : "opacity-70",
              )}
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: g.accent }}
              />
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold leading-tight">{g.name}</h2>
                <span
                  className="mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: `${g.accent}22`, color: g.accent }}
                >
                  {g.discipline === "rally" ? t("games.rally") : t("games.circuit")}
                </span>
              </div>
              <p className="text-xs text-muted">
                {g.developer}
                {g.publisher ? ` · ${g.publisher}` : ""}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-[11px]">
                {g.status === "early-access" && (
                  <span className="rounded bg-warn/15 px-2 py-0.5 font-semibold text-warn">
                    {t("games.earlyAccess")}
                  </span>
                )}
                <span className="rounded bg-surface-2 px-2 py-0.5 text-muted">
                  {g.hasImportableSetups ? t("games.importable") : t("games.manual")}
                </span>
                {ready ? (
                  <span className="ml-auto font-semibold text-brand">
                    {t("games.open")} →
                  </span>
                ) : (
                  <span className="ml-auto font-medium text-muted">
                    {t("common.loading")}
                  </span>
                )}
              </div>
            </div>
          );

          return ready ? (
            <Link key={g.id} href={`/app/${g.id}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={g.id} aria-disabled className="cursor-not-allowed">
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

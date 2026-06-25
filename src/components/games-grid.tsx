"use client";

import Link from "next/link";
import { gameMetas, implementedGameIds } from "@/data/game-metas";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

export function GamesGrid() {
  const { t } = useT();

  return (
    <div className="flex flex-col gap-7">
      <header className="reveal reveal-1">
        <span className="eyebrow">{t("nav.setups")}</span>
        <h1 className="mt-1.5 font-display text-3xl font-bold tracking-tight">
          {t("games.title")}
        </h1>
        <p className="mt-1.5 text-sm text-muted">{t("games.subtitle")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gameMetas.map((g, i) => {
          const ready = implementedGameIds.has(g.id);
          const card = (
            <div
              className={cn(
                "card group relative flex h-full flex-col gap-3 overflow-hidden p-5",
                ready && "card-interactive",
              )}
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${g.accent}, transparent)` }}
              />
              {/* glow de acento al hacer hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `${g.accent}33` }}
              />
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-lg font-semibold leading-tight tracking-tight">
                  {g.name}
                </h2>
                <span
                  className="mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    background: `${g.accent}1a`,
                    color: g.accent,
                    borderColor: `${g.accent}44`,
                  }}
                >
                  {g.discipline === "rally" ? t("games.rally") : t("games.circuit")}
                </span>
              </div>
              <p className="text-xs text-muted">
                {g.developer}
                {g.publisher ? ` · ${g.publisher}` : ""}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 text-[11px]">
                {g.status === "early-access" && (
                  <span className="rounded bg-warn/15 px-2 py-0.5 font-semibold text-warn">
                    {t("games.earlyAccess")}
                  </span>
                )}
                <span className="rounded bg-surface-2 px-2 py-0.5 text-muted">
                  {g.hasImportableSetups ? t("games.importable") : t("games.manual")}
                </span>
                {ready ? (
                  <span className="ml-auto font-display font-semibold text-brand transition-transform duration-200 group-hover:translate-x-0.5">
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

          const delay = `reveal-${Math.min(i + 1, 5)}`;
          return ready ? (
            <Link key={g.id} href={`/app/${g.id}`} className={`reveal block ${delay}`}>
              {card}
            </Link>
          ) : (
            <div
              key={g.id}
              aria-disabled
              className={`reveal block cursor-not-allowed opacity-70 ${delay}`}
            >
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

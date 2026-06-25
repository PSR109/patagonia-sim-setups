"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Brand } from "./brand";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/types";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {children}
    </Link>
  );
}

function LangToggle({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div className="ml-1 flex items-center rounded-md border border-border bg-surface p-0.5 text-xs font-semibold">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded px-2 py-1 uppercase transition-colors",
            locale === l ? "bg-brand text-bg" : "text-muted hover:text-fg",
          )}
          aria-pressed={locale === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader({
  user,
}: {
  user: { name: string | null; email: string } | null;
}) {
  const { t, locale, setLocale } = useT();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href={user ? "/app" : "/"}
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Brand />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {user && (
            <>
              <NavLink href="/app">{t("nav.setups")}</NavLink>
              <NavLink href="/garage">{t("nav.garage")}</NavLink>
            </>
          )}
          <LangToggle locale={locale} setLocale={setLocale} />
          {user ? (
            <button
              onClick={logout}
              disabled={loading}
              className="ml-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg disabled:opacity-50"
            >
              {t("nav.logout")}
            </button>
          ) : (
            <>
              <NavLink href="/login">{t("nav.login")}</NavLink>
              <Link
                href="/register"
                className="ml-1 rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-fg transition-colors hover:bg-brand-strong"
              >
                {t("nav.register")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

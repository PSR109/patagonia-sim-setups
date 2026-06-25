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
      className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg"
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
    <div className="ml-1 flex items-center rounded-lg border border-border bg-surface/70 p-0.5 text-xs font-semibold backdrop-blur">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-md px-2 py-1 uppercase tracking-wide transition-colors",
            locale === l
              ? "bg-brand text-white shadow-[0_4px_12px_-4px_rgba(46,139,255,0.8)]"
              : "text-muted hover:text-fg",
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
    <header className="sticky top-0 z-30 border-b border-border/50 bg-bg/65 backdrop-blur-xl">
      {/* hairline de marca al pie del header */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
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
              className="ml-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg disabled:opacity-50"
            >
              {t("nav.logout")}
            </button>
          ) : (
            <>
              <NavLink href="/login">{t("nav.login")}</NavLink>
              <Link href="/register" className="btn-primary ml-1 px-4 py-1.5 text-sm">
                {t("nav.register")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

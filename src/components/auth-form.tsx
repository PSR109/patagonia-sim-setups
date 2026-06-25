"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useT } from "@/lib/i18n/context";

export function AuthForm({
  mode,
  next,
}: {
  mode: "login" | "register";
  next: string;
}) {
  const { t } = useT();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("auth.errorEmail"));
      return;
    }
    if (mode === "register" && password.length < 8) {
      setError(t("auth.errorPassword"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "register" ? { name, email, password } : { email, password },
        ),
      });

      if (res.ok) {
        router.push(next || "/app");
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (data.error === "exists") setError(t("auth.errorExists"));
      else if (data.error === "invalid_credentials") setError(t("auth.errorInvalid"));
      else setError(t("auth.errorGeneric"));
    } catch {
      // fetch rechaza (offline, servidor caído, conexión cortada): sin esto el
      // botón quedaba deshabilitado para siempre sin mensaje. Mostramos error.
      setError(t("auth.errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <div className="reveal reveal-1 mx-auto max-w-sm py-12">
      <div className="card relative overflow-hidden p-7">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-sky to-transparent" />
        <span className="eyebrow">{isLogin ? t("nav.login") : t("nav.register")}</span>
        <h1 className="mb-6 mt-1.5 font-display text-2xl font-bold tracking-tight">
          {isLogin ? t("auth.loginTitle") : t("auth.registerTitle")}
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-muted">{t("auth.name")}</span>
              <input name="name" type="text" autoComplete="name" className="field" />
            </label>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-muted">{t("auth.email")}</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-muted">{t("auth.password")}</span>
            <input
              name="password"
              type="password"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="field"
            />
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-1 px-4 py-3 text-sm"
          >
            {loading
              ? t("common.loading")
              : isLogin
                ? t("auth.loginSubmit")
                : t("auth.registerSubmit")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-semibold text-brand hover:underline"
          >
            {isLogin ? t("auth.goRegister") : t("auth.goLogin")}
          </Link>
        </p>
      </div>
    </div>
  );
}

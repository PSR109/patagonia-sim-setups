"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/context";

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-5">
      <h3 className="mb-1.5 text-base font-semibold text-fg">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export default function Home() {
  const { t } = useT();
  return (
    <div className="flex flex-col gap-12 py-6">
      <section className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          Patagonia Sim Racing
        </span>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          {t("landing.heroTitle")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          {t("landing.heroSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-brand-strong"
          >
            {t("landing.ctaPrimary")}
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-surface-2"
          >
            {t("landing.ctaSecondary")}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Feature title={t("landing.feature1Title")} body={t("landing.feature1Body")} />
        <Feature title={t("landing.feature2Title")} body={t("landing.feature2Body")} />
        <Feature title={t("landing.feature3Title")} body={t("landing.feature3Body")} />
      </section>
    </div>
  );
}

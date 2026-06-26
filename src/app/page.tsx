"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/context";

// Sims en alcance (decorativo, nombres propios de los juegos).
const SIMS = [
  "Assetto Corsa Competizione",
  "Le Mans Ultimate",
  "Assetto Corsa EVO",
  "Assetto Corsa Rally",
  "EA Sports WRC",
];

function Feature({
  n,
  title,
  body,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  delay: string;
}) {
  return (
    <div
      className={`card card-interactive reveal group flex h-full flex-col gap-4 p-6 ${delay}`}
    >
      <span className="font-display text-2xl font-bold tabular-nums text-brand/80 transition-colors group-hover:text-brand">
        {n}
      </span>
      <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export default function Home() {
  const { t } = useT();
  return (
    <div className="flex flex-col gap-16 py-8">
      <section className="relative mx-auto max-w-3xl text-center">
        {/* anillo de glow detrás del hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[680px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
        />
        <span className="reveal reveal-1 mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-good shadow-[0_0_8px_var(--color-good)]" />
          <span className="eyebrow text-[0.65rem] text-muted">
            Patagonia Sim Racing
          </span>
        </span>
        <h1 className="reveal reveal-2 text-balance font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
          {t("landing.heroTitle")}
        </h1>
        <p className="reveal reveal-3 mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          {t("landing.heroSubtitle")}
        </p>
        <div className="reveal reveal-4 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login" className="btn-primary px-7 py-3 text-sm">
            {t("landing.ctaPrimary")}
            <span aria-hidden className="text-base leading-none">→</span>
          </Link>
          <Link href="/login" className="btn-ghost px-7 py-3 text-sm">
            {t("landing.ctaSecondary")}
          </Link>
        </div>

        {/* franja de sims soportados */}
        <div className="reveal reveal-5 mt-12 flex flex-col items-center gap-3">
          <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-faint">
            5 simuladores
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
            {SIMS.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border/70 bg-surface/40 px-2.5 py-1 text-[0.7rem] font-medium text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Feature
          n="01"
          delay="reveal-3"
          title={t("landing.feature1Title")}
          body={t("landing.feature1Body")}
        />
        <Feature
          n="02"
          delay="reveal-4"
          title={t("landing.feature2Title")}
          body={t("landing.feature2Body")}
        />
        <Feature
          n="03"
          delay="reveal-5"
          title={t("landing.feature3Title")}
          body={t("landing.feature3Body")}
        />
      </section>
    </div>
  );
}

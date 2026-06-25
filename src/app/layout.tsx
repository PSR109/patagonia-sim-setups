import type { Metadata } from "next";
import { Inter, Geist_Mono, Saira } from "next/font/google";
import "./globals.css";
import { getLocale } from "@/lib/i18n/locale";
import { getCurrentUser } from "@/lib/auth/current-user";
import { LocaleProvider } from "@/lib/i18n/context";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";

// Inter es la tipografía de la marca oficial (patagoniasimracing.cl) — cuerpo.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Saira: display técnico de aire motorsport para titulares y números grandes.
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Patagonia Sim Racing — Setups",
  description:
    "Generador y profesor de setups para simracing: elige auto, pista y condiciones y entiende el porqué de cada ajuste.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const user = await getCurrentUser();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${saira.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <LocaleProvider initialLocale={locale}>
          <SiteHeader
            user={user ? { name: user.name, email: user.email } : null}
          />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
            {children}
          </main>
          <footer className="mt-8 border-t border-border/60 px-4 py-7">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Patagonia Sim Racing
              </span>
              <span className="text-xs text-faint">
                © {new Date().getFullYear()} · {dictionaries[locale].brand.tagline}
              </span>
            </div>
          </footer>
        </LocaleProvider>
      </body>
    </html>
  );
}

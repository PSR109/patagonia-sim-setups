import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLocale } from "@/lib/i18n/locale";
import { getCurrentUser } from "@/lib/auth/current-user";
import { LocaleProvider } from "@/lib/i18n/context";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <LocaleProvider initialLocale={locale}>
          <SiteHeader
            user={user ? { name: user.name, email: user.email } : null}
          />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted">
            Patagonia Sim Racing · {new Date().getFullYear()} ·{" "}
            {dictionaries[locale].brand.tagline}
          </footer>
        </LocaleProvider>
      </body>
    </html>
  );
}

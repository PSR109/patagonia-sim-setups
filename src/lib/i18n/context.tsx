"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { dictionaries } from "./dictionaries";
import type { Locale, LocalizedText } from "@/lib/types";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolve(dict: unknown, key: string): string | undefined {
  const parts = key.split(".");
  let acc: unknown = dict;
  for (const part of parts) {
    if (acc && typeof acc === "object" && part in (acc as object)) {
      acc = (acc as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof acc === "string" ? acc : undefined;
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback(
    (key: string) =>
      resolve(dictionaries[locale], key) ??
      resolve(dictionaries.es, key) ??
      key,
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useT(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useT debe usarse dentro de <LocaleProvider>");
  return ctx;
}

// Para textos del dominio (LocalizedText) que vienen de los datos.
export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.es;
}

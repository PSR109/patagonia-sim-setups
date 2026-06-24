import { cookies } from "next/headers";
import type { Locale } from "@/lib/types";

export const LOCALE_COOKIE = "locale";

// Lee el idioma preferido desde la cookie (default español).
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "es";
}

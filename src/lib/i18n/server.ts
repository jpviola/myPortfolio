import { cookies, headers } from "next/headers";
import { FALLBACK_LOCALE, LOCALE_COOKIE, Locale, isLocale } from "./config";

export function getServerLocale(): Locale {
  const stored = cookies().get(LOCALE_COOKIE)?.value;
  if (isLocale(stored)) {
    return stored;
  }

  const acceptLanguage = headers().get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((entry) => entry.split(";")[0]?.trim()?.toLowerCase())
      .map((code) => code?.split("-")[0])
      .find((code): code is Locale => isLocale(code ?? undefined));
    if (preferred) {
      return preferred;
    }
  }

  return FALLBACK_LOCALE;
}

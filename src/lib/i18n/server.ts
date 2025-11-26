import { cookies, headers } from "next/headers";
import { FALLBACK_LOCALE, LOCALE_COOKIE, Locale, isLocale } from "./config";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(stored)) {
    return stored;
  }

  const headerList = await headers();
  const acceptLanguage = headerList.get("accept-language");
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

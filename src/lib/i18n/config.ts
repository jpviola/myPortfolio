import en from '@/../public/locales/en/common.json';
import es from '@/../public/locales/es/common.json';

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const FALLBACK_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[FALLBACK_LOCALE];
}

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLanguageName(locale: Locale, target: Locale = locale): string {
  const dict = getDictionary(target);
  return dict.languageNames[locale];
}

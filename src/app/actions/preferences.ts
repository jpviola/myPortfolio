'use server';

import { cookies } from 'next/headers';
import { LOCALE_COOKIE, Locale } from '@/lib/i18n/config';
import { DEFAULT_THEME, THEME_COOKIE, ThemePreference, isTheme } from '@/lib/theme/config';

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function setLanguagePreference(locale: Locale) {
  cookies().set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: ONE_YEAR,
  });
}

export async function setThemePreference(theme: ThemePreference) {
  const value = isTheme(theme) ? theme : DEFAULT_THEME;
  cookies().set(THEME_COOKIE, value, {
    path: '/',
    maxAge: ONE_YEAR,
  });
}

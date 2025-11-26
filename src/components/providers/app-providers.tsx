'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from './language-provider';
import { ThemeProvider } from './theme-provider';
import { Locale } from '@/lib/i18n/config';
import { ThemePreference } from '@/lib/theme/config';

export function AppProviders({ children, initialLocale, initialTheme }: {
  children: ReactNode;
  initialLocale: Locale;
  initialTheme: ThemePreference;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LanguageProvider key={initialLocale} initialLocale={initialLocale}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

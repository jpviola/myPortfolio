'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemePreference } from '@/lib/theme/config';

export function ThemeProvider({ children, initialTheme }: { children: ReactNode; initialTheme: ThemePreference; }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={initialTheme}
      enableSystem={false}
      storageKey="theme"
      disableTransitionOnChange
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
}

export { useTheme } from 'next-themes';

'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { ThemePreference } from '@/lib/theme/config';
import { setThemePreference } from '@/app/actions/preferences';

interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
  isPending: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeClass(theme: ThemePreference) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children, initialTheme }: { children: ReactNode; initialTheme: ThemePreference; }) {
  const [theme, setThemeState] = useState<ThemePreference>(initialTheme);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setThemeState(initialTheme);
    applyThemeClass(initialTheme);
  }, [initialTheme]);

  const persistTheme = useCallback((nextTheme: ThemePreference) => {
    setThemeState(nextTheme);
    applyThemeClass(nextTheme);
    startTransition(async () => {
      await setThemePreference(nextTheme);
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    persistTheme(next);
  }, [persistTheme, theme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    setTheme: persistTheme,
    toggleTheme,
    isPending,
  }), [theme, persistTheme, toggleTheme, isPending]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

'use client';

import clsx from 'clsx';
import { useTransition } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { useTheme } from '@/components/providers/theme-provider';
import { setThemePreference } from '@/app/actions/preferences';
import { ThemePreference } from '@/lib/theme/config';

export function ThemeToggle() {
  const { dictionary } = useLanguage();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const currentTheme = (theme ?? resolvedTheme ?? 'light') as ThemePreference;
  const isDark = currentTheme === 'dark';

  const handleToggle = () => {
    const nextTheme: ThemePreference = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    startTransition(async () => {
      await setThemePreference(nextTheme);
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition',
        isDark ? 'text-accent' : 'text-foreground/70 hover:text-foreground'
      )}
      aria-label={dictionary.navigation.themeLabel}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span>{isDark ? dictionary.navigation.themeDark : dictionary.navigation.themeLight}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 14.5A8.38 8.38 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z" />
    </svg>
  );
}

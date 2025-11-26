'use client';

import clsx from 'clsx';
import { useLanguage } from '@/components/providers/language-provider';
import { useTheme } from '@/components/providers/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme, isPending } = useTheme();
  const { dictionary } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={isPending}
      className={clsx(
        'inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium transition',
        theme === 'dark' ? 'text-accent' : 'text-foreground/70 hover:text-foreground',
      )}
      aria-label={dictionary.navigation.themeLabel}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      {theme === 'dark' ? dictionary.navigation.themeDark : dictionary.navigation.themeLight}
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

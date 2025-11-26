'use client';

import clsx from 'clsx';
import { useLanguage } from '@/components/providers/language-provider';
import { locales } from '@/lib/i18n/config';

export function LanguageToggle() {
  const { locale, setLocale, dictionary, isPending } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background/80 p-1 text-xs">
      {locales.map((value) => (
        <button
          key={value}
          type="button"
          aria-label={`${dictionary.navigation.languageLabel}: ${dictionary.languageNames[value]}`}
          className={clsx(
            'rounded-full px-2.5 py-1 font-medium transition',
            value === locale
              ? 'bg-accent text-white shadow'
              : 'text-foreground/70 hover:text-foreground',
          )}
          disabled={value === locale || isPending}
          onClick={() => setLocale(value)}
        >
          {value.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

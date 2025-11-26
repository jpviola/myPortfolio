'use client';

import clsx from 'clsx';
import { useLanguage } from '@/components/providers/language-provider';
import { locales } from '@/lib/i18n/config';

export function LanguageSwitcher() {
  const { locale, setLocale, dictionary, isPending } = useLanguage();

  return (
    <fieldset className="rounded-full border border-border bg-background/80 p-1">
      <legend className="sr-only">{dictionary.navigation.languageLabel}</legend>
      <div className="flex items-center gap-1">
        {locales.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={value === locale}
            aria-label={`${dictionary.navigation.languageLabel}: ${dictionary.languageNames[value]}`}
            className={clsx(
              'rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] transition',
              value === locale ? 'bg-foreground text-background shadow-sm' : 'text-foreground/60 hover:text-foreground'
            )}
            disabled={value === locale || isPending}
            onClick={() => setLocale(value)}
          >
            {value.toUpperCase()}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

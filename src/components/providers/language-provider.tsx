'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { Dictionary, Locale, dictionaries } from '@/lib/i18n/config';
import { setLanguagePreference } from '@/app/actions/preferences';
import { useRouter } from 'next/navigation';

interface LanguageContextValue {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale; }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    startTransition(async () => {
      await setLanguagePreference(nextLocale);
      router.refresh();
    });
  }, [router]);

  const dictionary = useMemo<Dictionary>(() => dictionaries[locale], [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    dictionary,
    setLocale: changeLocale,
    isPending,
  }), [locale, dictionary, changeLocale, isPending]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

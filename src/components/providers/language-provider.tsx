'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { Dictionary, Locale, getDictionary } from '@/lib/i18n/config';
import { setLanguagePreference } from '@/app/actions/preferences';
import { useRouter } from 'next/navigation';
import { i18n } from 'next-i18next';

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
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (i18n?.changeLanguage) {
      i18n.changeLanguage(nextLocale);
    }
    startTransition(async () => {
      await setLanguagePreference(nextLocale);
      router.refresh();
    });
  }, [router]);

  const dictionary = useMemo<Dictionary>(() => getDictionary(locale), [locale]);

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

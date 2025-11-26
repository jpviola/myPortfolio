"use client";

import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import type { UserConfig } from "next-i18next";

import i18nSettings from "../../i18n.config.json";
import commonEn from "../../public/locales/en/common.json";
import homeEn from "../../public/locales/en/home.json";
import commonEs from "../../public/locales/es/common.json";
import homeEs from "../../public/locales/es/home.json";

const resources = {
  en: {
    common: commonEn,
    home: homeEn,
  },
  es: {
    common: commonEs,
    home: homeEs,
  },
};

type SlotProps = { slotChildren?: ReactNode };

const SlotComponent = ({ slotChildren }: SlotProps) => <>{slotChildren}</>;

const clientI18nConfig: UserConfig = {
  i18n: {
    defaultLocale: i18nSettings.defaultLocale,
    locales: i18nSettings.locales,
  },
  defaultNS: i18nSettings.namespaces[0],
  ns: i18nSettings.namespaces,
  fallbackLng: i18nSettings.defaultLocale,
  interpolation: {
    escapeValue: false,
  },
  resources,
};

const routerStub = {
  basePath: "",
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  isReady: true,
  isPreview: false,
  isFallback: false,
  locale: i18nSettings.defaultLocale,
  locales: i18nSettings.locales,
  defaultLocale: i18nSettings.defaultLocale,
  domainLocales: [],
  isLocaleDomain: false,
  push: async () => true,
  replace: async () => true,
  reload: () => undefined,
  back: () => undefined,
  forward: () => undefined,
  prefetch: async () => undefined,
  beforePopState: () => undefined,
  events: {
    on: () => undefined,
    off: () => undefined,
    emit: () => undefined,
  },
} as NextRouter;

type ProvidersAppProps = AppProps<SlotProps>;

function ThemeProviders({ Component, pageProps }: ProvidersAppProps) {
  const ActiveComponent = (Component ?? SlotComponent) as ComponentType<SlotProps>;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ActiveComponent {...pageProps} />
    </ThemeProvider>
  );
}

const TranslationProvider = appWithTranslation(
  ThemeProviders as unknown as ComponentType<AppProps<SlotProps>>,
  clientI18nConfig,
);

export default function Providers({ children }: PropsWithChildren) {
  return (
    <TranslationProvider
      Component={SlotComponent as unknown as ProvidersAppProps["Component"]}
      pageProps={{ slotChildren: children }}
      router={routerStub}
    />
  );
}

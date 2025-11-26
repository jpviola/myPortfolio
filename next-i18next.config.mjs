import path from "node:path";
import { fileURLToPath } from "node:url";
import settings from "./i18n.config.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localePath = path.resolve(__dirname, "./public/locales");

const nextI18NextConfig = {
  i18n: {
    defaultLocale: settings.defaultLocale,
    locales: settings.locales,
    localeDetection: false,
  },
  defaultNS: settings.namespaces[0],
  ns: settings.namespaces,
  fallbackLng: settings.defaultLocale,
  localePath,
  reloadOnPrerender: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
};

export const defaultLocale = settings.defaultLocale;
export const locales = settings.locales;
export const namespaces = settings.namespaces;

export default nextI18NextConfig;

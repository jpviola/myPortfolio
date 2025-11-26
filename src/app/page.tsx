"use client";

import { useTransition } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

const localeOptions = [
  { code: "en", labelKey: "common:nav.switchToEnglish" },
  { code: "es", labelKey: "common:nav.switchToSpanish" },
];

export default function Home() {
  const { t, i18n } = useTranslation(["home", "common"]);
  const { resolvedTheme, setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const toggleTheme = () => {
    startTransition(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    });
  };

  const changeLocale = (code: string) => {
    startTransition(() => {
      void i18n.changeLanguage(code);
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b border-border">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {t("common:nav.home")}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full border border-border px-4 py-2 text-sm transition hover:border-foreground"
              onClick={toggleTheme}
              aria-pressed={resolvedTheme === "dark"}
            >
              {t("common:nav.toggleTheme")}
            </button>
            {localeOptions.map((locale) => (
              <button
                key={locale.code}
                type="button"
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  i18n.language === locale.code
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground"
                }`}
                onClick={() => changeLocale(locale.code)}
                disabled={isPending}
              >
                {t(locale.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container flex flex-col gap-6 py-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Next.js 14 · Tailwind · i18n
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("home:hero.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("home:hero.body")}
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {t("home:cta")}
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="container py-8 text-sm text-muted-foreground">
          {t("common:footer.madeBy")}
        </div>
      </footer>
    </div>
  );
}

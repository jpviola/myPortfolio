'use client';

import { useLanguage } from '@/components/providers/language-provider';

export function SiteFooter() {
  const { dictionary } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/80">
      <div className="container flex flex-col gap-2 py-8 text-sm text-foreground/70 md:flex-row md:items-center md:justify-between">
        <p>© {year} Locale Lab</p>
        <p>
          {dictionary.home.statLabel}: <span className="font-semibold text-foreground">{dictionary.home.statValue}</span>
        </p>
      </div>
    </footer>
  );
}

'use client';

import { LanguageSwitcher } from '@/components/language/language-switcher';
import { useLanguage } from '@/components/providers/language-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function SiteFooter() {
  const { dictionary } = useLanguage();
  const year = new Date().getFullYear();
  const footer = dictionary.footer;

  return (
    <footer className="border-t border-border/70 bg-background/90">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{footer.contactHeading}</p>
            <p className="mt-3 text-base text-foreground/80">{footer.contactDescription}</p>
          </div>
          <dl className="grid gap-4 rounded-3xl border border-border/70 bg-white/70 p-6 text-sm text-foreground/80 shadow-sm dark:bg-muted/60 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{footer.emailLabel}</dt>
              <dd className="mt-1 text-base font-semibold text-foreground">{footer.emailValue}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{footer.phoneLabel}</dt>
              <dd className="mt-1 text-base font-semibold text-foreground">{footer.phoneValue}</dd>
            </div>
          </dl>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{footer.socialHeading}</p>
            <p className="mt-3 text-base text-foreground/80">{footer.socialDescription}</p>
          </div>
          <ul className="space-y-3">
            {footer.socialLinks.map((link) => (
              <li key={link.label} className="flex items-center justify-between rounded-full border border-border/70 bg-white/60 px-4 py-3 text-sm font-semibold text-foreground shadow-sm dark:bg-muted/50">
                <span>{link.label}</span>
                <span className="text-foreground/70">{link.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 bg-background/80">
        <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50 sm:text-left">
            <p>© {year} Locale Lab</p>
            <p className="mt-1">{footer.rights}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

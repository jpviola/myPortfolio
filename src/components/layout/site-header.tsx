'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { LanguageSwitcher } from '@/components/language/language-switcher';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useLanguage } from '@/components/providers/language-provider';

const navItems = [
  { key: 'hero', hash: 'hero' },
  { key: 'highlights', hash: 'career-highlights' },
  { key: 'cv', hash: 'cv' },
  { key: 'portfolio', hash: 'portfolio' },
  { key: 'blog', hash: 'blog-preview' },
  { key: 'contact', hash: 'contact' },
] as const;

export function SiteHeader() {
  const { dictionary } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const navigation = dictionary.navigation;
  const links = useMemo(() => navItems.map((item) => ({
    ...item,
    label: navigation[item.key],
  })), [navigation]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.4em]">
          Locale Lab
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.3em] md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={{ pathname: '/', hash: link.hash }}
              className="text-foreground/70 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur md:hidden" role="dialog" aria-modal="true" id="mobile-menu">
          <div className="flex h-full flex-col justify-between gap-8 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">Locale Lab</p>
              <button
                type="button"
                className="rounded-full border border-border p-2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-6 text-2xl font-semibold">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={{ pathname: '/', hash: link.hash }}
                  className="text-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  );
}

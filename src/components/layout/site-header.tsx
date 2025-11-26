'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageToggle } from '@/components/language/language-toggle';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useLanguage } from '@/components/providers/language-provider';

const links = [
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { dictionary } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em]">
          Locale Lab
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={clsx(
                'transition hover:text-accent',
                pathname.startsWith(link.href) ? 'text-accent' : 'text-foreground/70',
              )}
            >
              {dictionary.navigation[link.key as 'blog' | 'contact']}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      <nav className="container flex gap-4 border-t border-border/70 py-2 text-xs font-semibold md:hidden">
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={clsx(
              'flex-1 rounded-full border border-border/70 px-3 py-2 text-center',
              pathname.startsWith(link.href) ? 'bg-accent text-white' : 'text-foreground/70',
            )}
          >
            {dictionary.navigation[link.key as 'blog' | 'contact']}
          </Link>
        ))}
      </nav>
    </header>
  );
}

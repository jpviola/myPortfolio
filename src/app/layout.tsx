import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/app-providers';
import { AppLayout } from '@/components/layout/app-layout';
import { getServerLocale } from '@/lib/i18n/server';
import { getServerTheme } from '@/lib/theme/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Locale Lab — bilingual blog starter',
  description:
    'MDX-powered blog and contact workflow that automatically pairs English/Spanish content, adds localized footnotes, and relays contact forms via email.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const theme = await getServerTheme();

  return (
    <html lang={locale} className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
        <AppProviders initialLocale={locale} initialTheme={theme}>
          <AppLayout>
            {children}
          </AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}

import { ReactNode } from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-background/60 text-foreground">
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

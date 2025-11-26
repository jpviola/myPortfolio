import Link from 'next/link';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/config';

const features = [
  {
    title: 'Bilingual MDX posts',
    body: 'Drop an .mdx file per locale and the index automatically pairs translations, highlights fallbacks, and keeps metadata in sync.',
  },
  {
    title: 'Custom footnotes',
    body: 'Use the <Footnote> component anywhere inside a post and the system renders numbered references plus a localized list at the bottom.',
  },
  {
    title: 'Locale-aware contact',
    body: 'A validated contact form surfaces schema errors in the active language and relays sanitized payloads through Nodemailer.',
  },
];

export default function HomePage() {
  const locale = getServerLocale();
  const dictionary = getDictionary(locale);

  return (
    <section className="container grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-8">
        <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Locale Lab
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {dictionary.home.heroTitle}
          </h1>
          <p className="text-lg text-foreground/80">{dictionary.home.heroBody}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5"
          >
            {dictionary.home.primaryCta}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
          >
            {dictionary.home.secondaryCta}
          </Link>
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/70 p-6 text-sm text-foreground/80 shadow-sm dark:bg-muted/60">
          <p className="font-semibold uppercase tracking-widest text-xs text-foreground/60">{dictionary.home.statLabel}</p>
          <p className="mt-2 text-2xl font-semibold text-accent">{dictionary.home.statValue}</p>
          <p className="mt-1 text-sm text-foreground/70">
            Auto-detect which translations exist, surface them to readers, and only translate what matters.
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-3xl border border-border/60 bg-muted/40 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

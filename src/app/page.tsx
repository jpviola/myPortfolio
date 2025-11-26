import Link from 'next/link';
import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/config';

export default function HomePage() {
  const locale = getServerLocale();
  const dictionary = getDictionary(locale);
  const highlights = dictionary.home.highlights;
  const projects = dictionary.home.portfolioProjects;

  return (
    <div className="space-y-20 pb-20 pt-16">
      <section id="hero" className="container space-y-10">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-accent">
            Locale Lab
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {dictionary.home.heroTitle}
            </h1>
            <p className="text-lg text-foreground/75">{dictionary.home.heroBody}</p>
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
        </div>
        <div className="rounded-3xl border border-border/70 bg-white/80 p-8 shadow-sm dark:bg-muted/60">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/50">{dictionary.home.statLabel}</p>
          <p className="mt-3 text-3xl font-semibold text-accent">{dictionary.home.statValue}</p>
          <p className="mt-2 text-sm text-foreground/70">
            Auto-detect which translations exist, surface them to readers, and only translate what matters.
          </p>
        </div>
      </section>

      <section id="career-highlights" className="container space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/50">{dictionary.home.highlightsTitle}</p>
          <p className="text-base text-foreground/80">{dictionary.home.highlightsBody}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="rounded-3xl border border-border/60 bg-white/70 p-6 shadow-sm dark:bg-muted/50">
              <h3 className="text-base font-semibold text-foreground">{highlight.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{highlight.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cv" className="container">
        <div className="rounded-3xl border border-border/70 bg-white/80 p-8 shadow-lg dark:bg-muted/60">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{dictionary.navigation.cv}</p>
            <h2 className="text-3xl font-semibold text-foreground">{dictionary.home.cvTitle}</h2>
            <p className="text-base text-foreground/70">{dictionary.home.cvBody}</p>
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
            >
              {dictionary.home.cvCta}
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="portfolio" className="container space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/50">{dictionary.home.portfolioTitle}</p>
          <p className="text-base text-foreground/80">{dictionary.home.portfolioBody}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-white/80 p-6 shadow-sm dark:bg-muted/60">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-foreground/70">{project.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="blog-preview" className="container rounded-3xl border border-border/70 bg-gradient-to-r from-white to-white/60 p-8 shadow-lg dark:from-muted/70 dark:to-muted/40">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{dictionary.navigation.blog}</p>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-foreground">{dictionary.home.blogSectionTitle}</h2>
            <p className="text-base text-foreground/70">{dictionary.home.blogSectionBody}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            {dictionary.home.blogSectionCta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section id="contact" className="container">
        <div className="rounded-3xl border border-border/70 bg-white/80 p-8 text-center shadow-lg dark:bg-muted/60">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50">{dictionary.home.contactSectionTitle}</p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground">{dictionary.contact.title}</h2>
          <p className="mt-2 text-base text-foreground/70">{dictionary.home.contactSectionBody}</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5"
          >
            {dictionary.home.contactSectionCta}
          </Link>
        </div>
      </section>
    </div>
  );
}

import { publications } from '@/content/cv';
import { Locale } from '@/lib/i18n/config';

export function PublicationGrid({ locale }: { locale: Locale }) {
  const headingId = 'publication-grid-heading';
  const { kicker, heading, description, items } = publications;

  return (
    <section aria-labelledby={headingId} className="container py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{kicker[locale]}</p>
          <h2 id={headingId} className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {heading[locale]}
          </h2>
        </div>
        <p className="text-sm text-foreground/70 lg:max-w-xl">{description[locale]}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col rounded-3xl border border-border/70 bg-white/80 p-6 shadow-sm transition dark:bg-muted/60"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
              {item.year} · {item.venue[locale]}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-foreground">{item.title[locale]}</h3>
            <p className="mt-3 flex-1 text-sm text-foreground/70">{item.description[locale]}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 transition hover:underline"
            >
              {item.linkLabel[locale]}
              <span aria-hidden>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

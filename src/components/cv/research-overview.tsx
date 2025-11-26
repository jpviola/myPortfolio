import { researchFocus } from '@/content/cv';
import { Locale } from '@/lib/i18n/config';

export function ResearchOverview({ locale }: { locale: Locale }) {
  const headingId = 'research-focus-heading';
  const { kicker, heading, description, areas } = researchFocus;

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
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {areas.map((area) => (
          <article
            key={area.id}
            className="flex h-full flex-col rounded-3xl border border-border/70 bg-white/80 p-6 shadow-sm transition dark:bg-muted/60"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground">{area.title[locale]}</h3>
              <p className="mt-3 text-sm text-foreground/70">{area.summary[locale]}</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {area.methods[locale].map((method) => (
                <li
                  key={`${area.id}-${method}`}
                  className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent dark:border-accent/40 dark:bg-accent/15 dark:text-white"
                >
                  {method}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

import { teachingExperience } from '@/content/cv';
import { Locale } from '@/lib/i18n/config';

export function TeachingList({ locale }: { locale: Locale }) {
  const headingId = 'teaching-experience-heading';
  const { kicker, heading, description, items } = teachingExperience;

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
      <div className="mt-8 divide-y divide-border/60 rounded-3xl border border-border/70 bg-white/80 dark:bg-muted/60">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:justify-between md:gap-10"
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">{item.terms[locale]}</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">{item.course[locale]}</h3>
                <p className="text-sm font-medium text-foreground/70">
                  {item.institution[locale]} · {item.level[locale]}
                </p>
              </div>
              <p className="text-sm text-foreground/70">{item.description[locale]}</p>
            </div>
            <ul className="grid gap-3 text-sm text-foreground/80 md:max-w-md">
              {item.highlights[locale].map((highlight) => (
                <li key={`${item.id}-${highlight}`} className="flex gap-3">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

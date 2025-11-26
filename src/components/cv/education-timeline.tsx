import { educationTimeline } from '@/content/cv';
import { Locale } from '@/lib/i18n/config';

export function EducationTimeline({ locale }: { locale: Locale }) {
  const headingId = 'education-timeline-heading';
  const { kicker, heading, description, items } = educationTimeline;

  return (
    <section aria-labelledby={headingId} className="container py-12">
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{kicker[locale]}</p>
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {heading[locale]}
          </h2>
          <p className="text-sm text-foreground/70">{description[locale]}</p>
        </header>
        <div className="relative">
          <span aria-hidden className="pointer-events-none absolute left-4 top-0 h-full w-px bg-border/60" />
          <ol className="space-y-8">
            {items.map((item) => (
              <li
                key={item.id}
                className="relative rounded-3xl border border-border/70 bg-white/80 p-6 pl-12 shadow-sm transition dark:bg-muted/60"
              >
                <span
                  aria-hidden
                  className="absolute left-3 top-8 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-background bg-accent dark:border-muted"
                />
                <time className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">
                  {item.period[locale]}
                </time>
                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{item.credential[locale]}</h3>
                  <p className="text-sm text-foreground/60">{item.location[locale]}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground/80">{item.institution[locale]}</p>
                <p className="mt-3 text-sm text-foreground/70">{item.summary[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

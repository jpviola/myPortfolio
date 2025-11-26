import { careerHighlights } from '@/content/cv';
import { Locale } from '@/lib/i18n/config';

export function HighlightsCards({ locale }: { locale: Locale }) {
  const headingId = 'career-highlights-heading';
  const { kicker, heading, description, cards } = careerHighlights;

  return (
    <section aria-labelledby={headingId} className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{kicker[locale]}</p>
        <h2 id={headingId} className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {heading[locale]}
        </h2>
        <p className="mt-4 text-base text-foreground/80">{description[locale]}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.id}
            aria-labelledby={`${card.id}-label`}
            className="rounded-3xl border border-border/70 bg-white/80 p-6 text-left shadow-sm transition dark:bg-muted/60"
          >
            <p id={`${card.id}-label`} className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
              {card.label[locale]}
            </p>
            <p className="mt-4 text-4xl font-semibold text-accent">{card.stat[locale]}</p>
            <p className="mt-3 text-sm text-foreground/70">{card.body[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

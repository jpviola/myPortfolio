import Link from 'next/link';
import { BlogPostSummary } from '@/lib/posts';
import { Dictionary } from '@/lib/i18n/config';
import { formatDate } from '@/lib/formatters';

interface PostCardProps {
  summary: BlogPostSummary;
  dictionary: Dictionary;
}

export function PostCard({ summary, dictionary }: PostCardProps) {
  const dateLabel = formatDate(summary.publishedAt, summary.activeLanguage);

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-muted/60">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-foreground/60">
          {dictionary.blogPost.published}: {dateLabel}
        </p>
        <Link href={`/blog/${summary.slug}`} className="text-2xl font-semibold text-foreground">
          {summary.title}
        </Link>
        <p className="text-sm text-foreground/70">{summary.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground/70">
        <span>{dictionary.blog.translationsLabel}</span>
        {summary.availableLanguages.map((language) => {
          const label = dictionary.blog.fallbackChip(dictionary.languageNames[language]);
          const isActive = summary.activeLanguage === language;
          return (
            <span
              key={language}
              className={`rounded-full border px-3 py-1 ${isActive ? 'border-accent bg-accent/10 text-accent' : 'border-border/60 text-foreground/60'}`}
            >
              {label}
            </span>
          );
        })}
      </div>
      {summary.isFallback && (
        <p className="text-xs text-foreground/60">
          {dictionary.blog.fallbackLabel(dictionary.languageNames[summary.activeLanguage])}
        </p>
      )}
      <Link
        href={`/blog/${summary.slug}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
      >
        {dictionary.blog.readPost}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

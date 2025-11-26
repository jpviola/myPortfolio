import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FootnoteProvider } from '@/components/footnotes/footnote-provider';
import { formatDate } from '@/lib/formatters';
import { getDictionary } from '@/lib/i18n/config';
import { getServerLocale } from '@/lib/i18n/server';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = getServerLocale();
  const dictionary = getDictionary(locale);
  const post = await getPostBySlug(params.slug, locale);

  if (!post) {
    notFound();
  }

  const { summary, content } = post;
  const publishedLabel = formatDate(summary.publishedAt, summary.activeLanguage);
  const updatedLabel = summary.updatedAt ? formatDate(summary.updatedAt, summary.activeLanguage) : null;

  return (
    <article className="container max-w-3xl space-y-10 py-14">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{dictionary.blog.title}</p>
          <h1 className="text-4xl font-semibold text-foreground">{summary.title}</h1>
          <p className="text-base text-foreground/70">{summary.description}</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/80 shadow-sm dark:bg-muted/60">
          <Image
            src={summary.heroImage}
            alt={summary.heroImageAlt}
            width={1200}
            height={630}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
        <dl className="grid gap-4 rounded-3xl border border-border/60 bg-muted/40 p-6 text-sm text-foreground/80 sm:grid-cols-2">
          <div>
            <dt className="font-semibold uppercase tracking-widest text-xs text-foreground/60">{dictionary.blogPost.published}</dt>
            <dd>{publishedLabel}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-widest text-xs text-foreground/60">{dictionary.blogPost.updated}</dt>
            <dd>{updatedLabel ?? publishedLabel}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold uppercase tracking-widest text-xs text-foreground/60">
              {dictionary.blogPost.availableLanguages}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {summary.availableLanguages.map((language) => (
                <span
                  key={language}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    language === summary.activeLanguage ? 'border-accent bg-accent/10 text-accent' : 'border-border/50 text-foreground/60'
                  }`}
                >
                  {dictionary.languageNames[language]}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        {summary.isFallback && (
          <p className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-4 text-xs text-foreground/70 dark:bg-muted/60">
            {dictionary.blog.fallbackLabel(dictionary.languageNames[summary.activeLanguage])}
          </p>
        )}
      </div>
      <FootnoteProvider heading={dictionary.footnotes.heading}>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {content}
        </div>
      </FootnoteProvider>
    </article>
  );
}

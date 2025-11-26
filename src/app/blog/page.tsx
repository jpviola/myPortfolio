import { PostCard } from '@/components/blog/post-card';
import { getDictionary } from '@/lib/i18n/config';
import { getServerLocale } from '@/lib/i18n/server';
import { getBlogSummaries } from '@/lib/posts';

export default async function BlogPage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const posts = await getBlogSummaries(locale);

  return (
    <section className="container py-16">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">{dictionary.blog.title}</p>
        <h1 className="text-3xl font-semibold text-foreground">{dictionary.blog.description}</h1>
      </div>
      <div className="mt-10 grid gap-6">
        {posts.length === 0 && (
          <p className="rounded-3xl border border-dashed border-border/70 bg-muted/40 p-8 text-sm text-foreground/70">
            {dictionary.blog.missingPosts}
          </p>
        )}
        {posts.map((post) => (
          <PostCard key={post.slug} summary={post} dictionary={dictionary} />
        ))}
      </div>
    </section>
  );
}

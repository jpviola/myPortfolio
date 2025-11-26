import fs from 'node:fs/promises';
import path from 'node:path';

import type React from 'react';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { cache } from 'react';
import { z } from 'zod';

import { mdxComponents } from '@/components/mdx/mdx-components';
import { FALLBACK_LOCALE, Locale, locales } from '@/lib/i18n/config';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

const frontmatterSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  slug: z.string().min(1),
  translationKey: z.string().optional(),
  language: z.enum(locales),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
});

export type BlogFile = z.infer<typeof frontmatterSchema> & {
  filePath: string;
  translationKey: string;
  body: string;
};

const loadPosts = cache(async (): Promise<BlogFile[]> => {
  const entries = await fg('**/*.mdx', { cwd: BLOG_DIR, absolute: true });
  const posts = await Promise.all(
    entries.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8');
      const { content, data } = matter(source);
      const parsed = frontmatterSchema.parse(data);
      const translationKey = parsed.translationKey ?? parsed.slug;
      return {
        ...parsed,
        translationKey,
        tags: parsed.tags ?? [],
        body: content.trim(),
        filePath,
      } satisfies BlogFile;
    }),
  );

  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});

type PostGroup = {
  slug: string;
  translationKey: string;
  entries: BlogFile[];
};

function buildGroups(posts: BlogFile[]): PostGroup[] {
  const groups = new Map<string, PostGroup>();

  posts.forEach((post) => {
    const key = post.translationKey;
    const existing = groups.get(key);
    if (existing) {
      existing.entries.push(post);
    } else {
      groups.set(key, {
        slug: post.slug,
        translationKey: key,
        entries: [post],
      });
    }
  });

  return Array.from(groups.values()).map((group) => ({
    ...group,
    entries: group.entries.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    ),
  }));
}

function resolveEntry(locale: Locale, entries: BlogFile[]) {
  const exact = entries.find((entry) => entry.language === locale);
  if (exact) {
    return { entry: exact, isFallback: false, languageUsed: exact.language };
  }
  const fallback = entries.find((entry) => entry.language === FALLBACK_LOCALE);
  if (fallback) {
    return { entry: fallback, isFallback: true, languageUsed: fallback.language };
  }
  const first = entries[0];
  return { entry: first, isFallback: true, languageUsed: first.language };
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  availableLanguages: Locale[];
  activeLanguage: Locale;
  isFallback: boolean;
}

export interface BlogPostPayload {
  summary: BlogPostSummary;
  content: React.ReactElement;
}

export const getBlogSummaries = cache(async (locale: Locale): Promise<BlogPostSummary[]> => {
  const posts = await loadPosts();
  const groups = buildGroups(posts);

  return groups
    .map((group) => {
      const { entry, isFallback, languageUsed } = resolveEntry(locale, group.entries);
      return {
        slug: group.slug,
        title: entry.title,
        description: entry.description,
        publishedAt: entry.publishedAt,
        updatedAt: entry.updatedAt,
        availableLanguages: group.entries.map((item) => item.language),
        activeLanguage: languageUsed,
        isFallback,
      } satisfies BlogPostSummary;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});

export async function getPostBySlug(slug: string, locale: Locale) {
  const posts = await loadPosts();
  const group = buildGroups(posts).find((item) => item.slug === slug);
  if (!group) {
    return null;
  }
  const { entry, isFallback, languageUsed } = resolveEntry(locale, group.entries);
  const { content } = await compileMDX({
    source: entry.body,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
    components: mdxComponents,
  });
  return {
    summary: {
      slug: group.slug,
      title: entry.title,
      description: entry.description,
      publishedAt: entry.publishedAt,
      updatedAt: entry.updatedAt,
      availableLanguages: group.entries.map((item) => item.language),
      activeLanguage: languageUsed,
      isFallback,
    },
    content,
  } as BlogPostPayload;
}

export const getAllPostSlugs = cache(async () => {
  const posts = await loadPosts();
  const slugs = new Set(posts.map((post) => post.slug));
  return Array.from(slugs);
});

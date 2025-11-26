import type { MDXComponents } from 'mdx/types';
import { Footnote } from '@/components/footnotes/footnote';
import clsx from 'clsx';

export const mdxComponents: MDXComponents = {
  Footnote,
  a: ({ className, ...props }) => (
    <a
      className={clsx('text-accent underline decoration-dotted underline-offset-4 transition hover:decoration-solid', className)}
      {...props}
    />
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={clsx('rounded-2xl border-l-4 border-accent/40 bg-muted/40 px-6 py-4 text-base italic text-foreground/80', className)}
      {...props}
    />
  ),
};

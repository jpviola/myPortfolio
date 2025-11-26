'use client';

import { ReactNode } from 'react';
import { useRegisterFootnote } from './footnote-provider';

interface FootnoteProps {
  id: string;
  children: ReactNode;
}

export function Footnote({ id, children }: FootnoteProps) {
  const index = useRegisterFootnote({ id, content: children });

  return (
    <sup id={`fnref-${id}`} className="ml-1 text-xs text-accent">
      <a href={`#fn-${id}`} className="hover:underline">
        [{index}]
      </a>
    </sup>
  );
}

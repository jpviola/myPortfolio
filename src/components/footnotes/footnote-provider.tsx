'use client';

import { ReactNode, createContext, useContext } from 'react';

interface FootnoteRegistration {
  id: string;
  content: ReactNode;
}

interface FootnoteEntry extends FootnoteRegistration {
  index: number;
}

interface FootnoteContextValue {
  register: (entry: FootnoteRegistration) => number;
}

const FootnoteContext = createContext<FootnoteContextValue | null>(null);

export function FootnoteProvider({ children, heading }: { children: ReactNode; heading: string; }) {
  const notes: FootnoteEntry[] = [];

  const register = (entry: FootnoteRegistration) => {
    const existing = notes.find((note) => note.id === entry.id);
    if (existing) {
      return existing.index;
    }
    const index = notes.length + 1;
    notes.push({ ...entry, index });
    return index;
  };

  return (
    <FootnoteContext.Provider value={{ register }}>
      {children}
      <FootnoteList heading={heading} notes={notes} />
    </FootnoteContext.Provider>
  );
}

function FootnoteList({ heading, notes }: { heading: string; notes: FootnoteEntry[]; }) {
  if (notes.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-border bg-muted/40 p-6" aria-label={heading}>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">{heading}</p>
      <ol className="mt-4 space-y-3 text-sm text-foreground/90">
        {notes.map((entry) => (
          <li key={entry.id} id={`fn-${entry.id}`} className="flex gap-3">
            <span className="font-semibold text-xs text-accent">{entry.index}.</span>
            <div className="space-x-2">
              {entry.content}
              <a href={`#fnref-${entry.id}`} className="text-xs text-accent underline">
                ↩
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function useFootnoteContext() {
  const context = useContext(FootnoteContext);
  if (!context) {
    throw new Error('Footnote components must be wrapped by <FootnoteProvider>.');
  }
  return context;
}

export function useRegisterFootnote(entry: FootnoteRegistration) {
  const { register } = useFootnoteContext();
  return register(entry);
}

'use client';

import { ReactNode, createContext, useCallback, useContext, useMemo, useRef } from 'react';

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
  const storeRef = useRef<FootnoteEntry[]>([]);
  storeRef.current = [];

  const register = useCallback((entry: FootnoteRegistration) => {
    const existing = storeRef.current.find((note) => note.id === entry.id);
    if (existing) {
      return existing.index;
    }
    const index = storeRef.current.length + 1;
    storeRef.current.push({ ...entry, index });
    return index;
  }, [storeRef]);

  const value = useMemo<FootnoteContextValue>(() => ({ register }), [register]);

  return (
    <FootnoteContext.Provider value={value}>
      {children}
      <FootnoteList heading={heading} notes={storeRef.current} />
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

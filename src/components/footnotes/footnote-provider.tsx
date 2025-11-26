import { ReactNode, createContext, useContext } from 'react';
import { randomUUID } from 'node:crypto';

interface FootnoteRegistration {
  id: string;
  content: ReactNode;
}

interface FootnoteEntry extends FootnoteRegistration {
  index: number;
}

const FootnoteContext = createContext<string | null>(null);
const footnoteStores = new Map<string, FootnoteEntry[]>();

function registerFootnote(storeId: string, entry: FootnoteRegistration) {
  const store = footnoteStores.get(storeId);
  if (!store) {
    throw new Error('Footnote store missing. Wrap content with <FootnoteProvider>.');
  }
  const existing = store.find((item) => item.id === entry.id);
  if (existing) {
    return existing.index;
  }
  const nextIndex = store.length + 1;
  store.push({ ...entry, index: nextIndex });
  return nextIndex;
}

export function FootnoteProvider({ children, heading }: { children: ReactNode; heading: string; }) {
  const storeId = randomUUID();
  footnoteStores.set(storeId, []);

  return (
    <>
      <FootnoteContext.Provider value={storeId}>{children}</FootnoteContext.Provider>
      <FootnoteList storeId={storeId} heading={heading} />
    </>
  );
}

function FootnoteList({ storeId, heading }: { storeId: string; heading: string; }) {
  const notes = footnoteStores.get(storeId) ?? [];
  footnoteStores.delete(storeId);

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

export function useFootnoteStore() {
  const storeId = useContext(FootnoteContext);
  if (!storeId) {
    throw new Error('Footnote components must be wrapped by <FootnoteProvider>.');
  }
  return storeId;
}

export function useRegisterFootnote(entry: FootnoteRegistration) {
  const storeId = useFootnoteStore();
  return registerFootnote(storeId, entry);
}

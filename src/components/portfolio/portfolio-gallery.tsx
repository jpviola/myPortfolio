'use client';

import Image from 'next/image';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { FootnoteProvider } from '@/components/footnotes/footnote-provider';
import { Footnote } from '@/components/footnotes/footnote';
import { useLanguage } from '@/components/providers/language-provider';
import { Dictionary, Locale } from '@/lib/i18n/config';
import {
  PortfolioProject,
  portfolioCategories,
  portfolioProjects,
  PortfolioCategoryId,
} from '@/data/portfolio';

export function PortfolioGallery() {
  const { locale, dictionary } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | PortfolioCategoryId>('all');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return portfolioProjects;
    }
    return portfolioProjects.filter((project) => project.categories.includes(activeCategory));
  }, [activeCategory]);

  const activeProject = useMemo(
    () => portfolioProjects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  const handleCardClick = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProjectId(null);
  }, []);

  return (
    <section className="container space-y-8 pb-16" aria-labelledby="portfolio-heading">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">{dictionary.portfolio.label}</p>
        <div className="max-w-3xl space-y-4">
          <h2 id="portfolio-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
            {dictionary.portfolio.title}
          </h2>
          <p className="text-base text-foreground/75">{dictionary.portfolio.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3" role="toolbar" aria-label={dictionary.portfolio.filtersLabel}>
        <FilterChip
          label={dictionary.portfolio.allLabel}
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        />
        {portfolioCategories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.label[locale]}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="rounded-3xl border border-border/70 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-muted/60"
          >
            <button
              type="button"
              className="flex h-full flex-col gap-4 text-left"
              onClick={() => handleCardClick(project.id)}
              aria-haspopup="dialog"
              aria-label={dictionary.portfolio.openProject(project.title[locale])}
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted">
                <Image
                  src={project.media.src}
                  alt={project.media.alt[locale]}
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 768px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-foreground/60">
                {project.categories.map((categoryId) => {
                  const category = portfolioCategories.find((entry) => entry.id === categoryId);
                  if (!category) return null;
                  return (
                    <span key={categoryId} className="rounded-full border border-border/70 px-3 py-1">
                      {category.label[locale]}
                    </span>
                  );
                })}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">{project.title[locale]}</h3>
                <p className="text-sm text-foreground/70">{project.summary[locale]}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {dictionary.portfolio.viewProject}
                <span aria-hidden>→</span>
              </span>
            </button>
          </article>
        ))}
      </div>

      {activeProject && (
        <PortfolioModal
          project={activeProject}
          locale={locale}
          dictionary={dictionary}
          onClose={handleClose}
        />
      )}
    </section>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        active ? 'border-accent bg-accent text-white shadow-lg shadow-accent/30' : 'border-border/70 text-foreground/70 hover:border-foreground/50',
      )}
    >
      {label}
    </button>
  );
}

function PortfolioModal({ project, locale, dictionary, onClose }: {
  project: PortfolioProject;
  locale: Locale;
  dictionary: Dictionary;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    document.body.style.setProperty('overflow', 'hidden');
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.removeProperty('overflow');
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [onClose, project.id]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const isShift = event.shiftKey;

      if (isShift && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!isShift && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener('keydown', handleTab);
    return () => {
      dialog.removeEventListener('keydown', handleTab);
    };
  }, [project.id]);

  const modalTitleId = `${project.id}-title`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/60" aria-hidden onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-border/60 bg-background p-6 shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={dictionary.portfolio.modal.close}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-sm font-semibold text-foreground/70 transition hover:bg-foreground/5"
        >
          ×
        </button>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{dictionary.portfolio.label}</p>
            <h3 id={modalTitleId} className="text-3xl font-semibold text-foreground">
              {project.title[locale]}
            </h3>
            <p className="text-base text-foreground/70">{project.summary[locale]}</p>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/70">
            <Image
              src={project.media.src}
              alt={project.media.alt[locale]}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <FootnoteProvider heading={dictionary.footnotes.heading}>
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-5">
                  <SectionHeading>{dictionary.portfolio.modal.overview}</SectionHeading>
                  <p className="text-base text-foreground/80">{project.description[locale]}</p>

                  <SectionHeading>{dictionary.portfolio.modal.highlights}</SectionHeading>
                  <div className="space-y-3">
                    {project.highlights.map((highlight, index) => (
                      <div key={`${project.id}-highlight-${index}`} className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                          {highlight.title[locale]}
                        </p>
                        <p className="mt-2 text-sm text-foreground/80">
                          {highlight.body[locale]}
                          {highlight.footnoteId && (
                            <ProjectFootnote project={project} locale={locale} noteId={highlight.footnoteId} />
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-3xl border border-border/70 bg-white/90 p-5 dark:bg-muted/50">
                    <SectionHeading>{dictionary.portfolio.modal.metrics}</SectionHeading>
                    <dl className="mt-4 grid gap-4">
                      {project.metrics.map((metric, index) => (
                        <div key={`${project.id}-metric-${index}`}>
                          <dt className="text-xs uppercase tracking-wide text-foreground/60">{metric.label[locale]}</dt>
                          <dd className="text-lg font-semibold text-foreground">{metric.value[locale]}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {project.stack.length > 0 && (
                    <div className="rounded-3xl border border-border/70 bg-muted/30 p-4">
                      <SectionHeading>{dictionary.portfolio.modal.stack}</SectionHeading>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-foreground/70">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full border border-border/70 px-3 py-1">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.links.length > 0 && (
                    <div className="space-y-3">
                      <SectionHeading>{dictionary.portfolio.modal.links}</SectionHeading>
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
                          >
                            {link.label[locale]}
                            <span aria-hidden>↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FootnoteProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode; }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">{children}</p>;
}

function ProjectFootnote({ project, locale, noteId }: { project: PortfolioProject; locale: Locale; noteId: string; }) {
  const note = project.footnotes?.find((entry) => entry.id === noteId);
  if (!note) return null;
  return <Footnote id={`${project.id}-${note.id}`}>{note.copy[locale]}</Footnote>;
}

import Link from 'next/link';
import { ContactForm } from '@/components/contact/contact-form';
import { getServerLocale } from '@/lib/i18n/server';
import { getDictionary } from '@/lib/i18n/config';

export default async function HomePage() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const home = dictionary.home;

  const heroFrameworks = home.heroFrameworks ?? [];
  const heroStats = home.heroStats ?? [];
  const heroSceneLabels = home.heroSceneLabels ?? [];
  const heroPortraitSlot = home.heroPortraitSlot;
  const heroLogoSlot = home.heroLogoSlot;
  const highlights = home.highlights ?? [];
  const educationTimeline = home.educationTimeline ?? [];
  const portfolioProjects = home.portfolioProjects ?? [];
  const blogPosts = home.blogPosts ?? [];
  const contactSection = home.contactSection;

  return (
    <div className="space-y-24 pb-24 pt-16">
      <section id="hero" className="container">
        <div className="relative overflow-hidden rounded-[40px] border border-white/15 bg-gradient-to-b from-[#0f172a] via-[#080f1a] to-[#020409] p-10 text-white shadow-2xl">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-12 top-[-120px] h-72 w-72 rounded-full bg-sky-500/30 blur-[160px]" />
            <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[150px]" />
          </div>
          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em]">
                {home.heroTagline}
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                <span className="bg-gradient-to-r from-lime-200 via-sky-300 to-fuchsia-300 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
                  {home.heroTitle}
                </span>
              </h1>
              <p className="text-lg text-white/80 md:max-w-3xl">{home.heroBody}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {heroFrameworks.map((framework) => (
                  <div key={framework.label} className="rounded-2xl border border-white/20 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">{framework.label}</p>
                    <p className="mt-2 text-base font-semibold">{framework.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5"
                >
                  {home.primaryCta}
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {home.secondaryCta}
                </Link>
              </div>
              <dl className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/15 bg-white/5 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{stat.label}</dt>
                    <dd className="mt-2 text-3xl font-semibold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <HeroProfilePanel portrait={heroPortraitSlot} logo={heroLogoSlot} focusAreas={heroSceneLabels} />
          </div>
        </div>
      </section>

      <section id="panorama" className="container">
        <div className="rounded-[32px] border border-border/60 bg-white/90 p-10 shadow-xl dark:bg-muted/70">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{home.highlightsTitle}</p>
            <h2 className="text-3xl font-semibold text-foreground">
              <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 bg-[length:250%] bg-clip-text text-transparent animate-gradient dark:from-white dark:via-sky-100 dark:to-white">
                {home.highlightsBody}
              </span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <article
                key={highlight.title}
                className="relative overflow-hidden rounded-3xl border border-border/70 bg-background/60 p-5 shadow-sm transition hover:-translate-y-0.5 dark:bg-background/30"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{highlight.badge}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{highlight.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{highlight.body}</p>
                <span
                  className="pointer-events-none absolute -right-6 top-6 h-16 w-16 rounded-full bg-accent/5 blur-2xl animate-glow"
                  style={{ animationDelay: `${index * 1.5}s` }}
                  aria-hidden
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">{dictionary.navigation.cv}</p>
            <h2 className="mt-4 text-3xl font-semibold">{home.cvTitle}</h2>
            <p className="mt-3 text-base text-white/70">{home.cvBody}</p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {home.cvCta}
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {educationTimeline.map((entry, index) => (
              <article
                key={`${entry.year}-${entry.title}`}
                className="rounded-[28px] border border-border/60 bg-white/90 p-6 shadow-sm dark:bg-muted/70"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">{entry.year}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{entry.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{entry.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {String(index + 1).padStart(2, '0')}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="container">
        <div className="rounded-[32px] border border-indigo-200/60 bg-gradient-to-br from-[#0b1220] via-[#1a1f35] to-[#111428] p-10 text-white shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">{dictionary.navigation.portfolio}</p>
              <h2 className="text-3xl font-semibold">{home.portfolioTitle}</h2>
              <p className="text-base text-white/75">{home.portfolioBody}</p>
              <Link
                href="#portfolio-grid"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {home.portfolioCta}
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div id="portfolio-grid" className="grid gap-4 md:grid-cols-2">
              {portfolioProjects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg shadow-black/20 backdrop-blur"
                >
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                    {project.stack?.map((item) => (
                      <span key={`${project.title}-${item}`} className="rounded-full border border-white/20 px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{project.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="blog-section" className="container">
        <div className="rounded-[32px] border border-border/70 bg-white/95 p-10 shadow-lg dark:bg-muted/80">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="flex-1 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">{dictionary.navigation.blog}</p>
              <h2 className="text-3xl font-semibold text-foreground">{home.blogSectionTitle}</h2>
              <p className="text-base text-foreground/70">{home.blogSectionBody}</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 self-start rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-foreground/5"
            >
              {home.blogSectionCta}
              <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.title} className="rounded-3xl border border-border/70 bg-background/60 p-6 shadow-sm dark:bg-background/30">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/50">{post.readingTime}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{post.excerpt}</p>
                <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {dictionary.blog.readPost}
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-border/70 bg-white/95 p-8 shadow-xl dark:bg-muted/80">
            <span className="pointer-events-none absolute -top-10 right-4 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">{contactSection.tagline}</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">{contactSection.title}</h2>
            <p className="mt-3 text-base text-foreground/70">{contactSection.body}</p>
            <div className="mt-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">{contactSection.socialHeading}</p>
              <p className="text-sm text-foreground/70">{contactSection.socialDescription}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactSection.socialLinks?.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-3xl border border-border/70 bg-white/80 px-4 py-3 text-left shadow-sm transition hover:-translate-y-1 hover:border-accent dark:bg-muted/70"
                  >
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/40">
                      <SocialIcon id={link.id} />
                    </span>
                    <span>
                      <span className="text-sm font-semibold text-foreground">{link.label}</span>
                      <span className="block text-xs text-foreground/60">{link.handle}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-border/70 bg-white/95 p-8 shadow-xl dark:bg-muted/80">
            <div className="mb-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground/60">{dictionary.contact.title}</p>
              <p className="text-sm text-foreground/70">{dictionary.contact.description}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroProfilePanel({
  portrait,
  logo,
  focusAreas,
}: {
  portrait?: { label?: string; caption?: string; };
  logo?: { label?: string; caption?: string; };
  focusAreas: string[];
}) {
  const portraitLabel = portrait?.label ?? 'Portrait';
  const portraitCaption = portrait?.caption ?? 'Reserve space for the hero image.';
  const logoLabel = logo?.label ?? 'Logo';
  const logoCaption = logo?.caption ?? 'Add the faculty crest or monogram.';

  return (
    <div className="relative isolate flex flex-col gap-6">
      <div className="rounded-[32px] border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="relative flex aspect-[3/4] w-full items-center justify-center rounded-[28px] border-2 border-dashed border-white/35 bg-gradient-to-b from-white/15 via-transparent to-transparent px-6 text-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">{portraitLabel}</p>
            <p className="text-sm text-white/80">{portraitCaption}</p>
          </div>
          <span className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_65%)]" aria-hidden />
        </div>
        <div className="mt-6 flex items-center gap-4 rounded-2xl border-2 border-dashed border-white/35 bg-white/5 p-4 text-left">
          <div className="flex size-16 items-center justify-center rounded-full border border-white/40 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70">
            {logoLabel}
          </div>
          <p className="text-sm text-white/80">{logoCaption}</p>
        </div>
      </div>
      {focusAreas.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {focusAreas.map((area, index) => (
            <div
              key={area}
              className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm font-semibold text-white shadow-lg animate-float"
              style={{ animationDelay: `${index * 0.6}s` }}
            >
              {area}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialIcon({ id }: { id: string; }) {
  switch (id) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
          <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zm-11 17H6V9h3.5zm-1.8-11a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM20 19h-3.5v-5.4c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.8V19H9.3s.1-8.7 0-9.6H12v1.4a3.4 3.4 0 0 1 3-1.7c2.2 0 3.9 1.5 3.9 4.7z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12 2a10 10 0 0 0-3.2 19.49c.5.1.68-.22.68-.48v-1.64c-2.78.62-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.64.07-.63.07-.63 1.02.08 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.94.85a2.3 2.3 0 0 1 .68-1.46c-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76a3.5 3.5 0 0 1 .1-2.72s.84-.27 2.75 1.05a9.5 9.5 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.37.83.4 1.82.1 2.72a3.7 3.7 0 0 1 1.02 2.76c0 3.95-2.34 4.81-4.58 5.06.36.32.69.94.69 1.9v2.82c0 .27.18.59.69.48A10 10 0 0 0 12 2Z"
          />
        </svg>
      );
    case 'scholar':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l8.5 5.5L12 14 3.5 8.5 12 3z" />
          <path d="M6 14v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5" />
        </svg>
      );
    case 'researchgate':
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 4h6.5a4 4 0 1 1 0 8H9v8H5z" />
          <path d="M13.5 12c2 0 3.5 1.2 3.5 3.6S15.4 20 12.8 20" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
          <path d="M13 22v-8h2.6l.4-3H13V8.5c0-.9.3-1.5 1.6-1.5H16V4.3c-.3 0-1.4-.1-2.7-.1-2.7 0-4.3 1.4-4.3 4v2.8H7v3h2.1v8z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
          <path d="M17.2 3H20l-6.6 7.5L21.2 21h-4l-5.2-6.5L5 21H2.2l7.1-8-6.6-7.5h4l4.7 5.8z" />
        </svg>
      );
    default:
      return <span className="text-lg font-semibold uppercase">{id.charAt(0)}</span>;
  }
}

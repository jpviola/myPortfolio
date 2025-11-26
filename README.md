# Locale Lab

A bilingual Next.js starter that ships a lightweight MDX blog, persistent language/theme toggles, localized footnotes, and a production-ready contact form that relays messages with Nodemailer.

## Highlights

- **MDX-backed blog** – Drop one `.mdx` file per locale under `content/blog`. Metadata declares the slug, language, and translation key so the blog index can pair languages automatically.
- **Automatic translation fallback** – If a reader selects Spanish but only the English file exists (see `calm-release.en.mdx`), the UI badges the active fallback language. The inverse is demonstrated by the Spanish-only `aprendizajes-async.es.mdx` post.
- **Custom footnotes** – Authors use `<Footnote id="context">…</Footnote>` anywhere in MDX. The page wraps content with a server-side `FootnoteProvider` that injects a localized footnote list at the end of the article.
- **Validated contact flow** – A client-side form plus `/api/contact` route share the same Zod schema. Errors surface in the active locale and successful submissions are sent through Nodemailer using environment-configured credentials.
- **Responsive, themed UI** – Light/dark themes sync with a cookie so the SSR layout matches the client. A global language toggle persists preference and triggers revalidation so every page reflects the selected locale.

## Project structure

```
content/blog            // MDX posts with bilingual metadata
src/app                // App Router pages, API route, and layout
src/components         // UI primitives, layout, blog cards, portfolio, contact form
src/data               // Typed data sources such as the portfolio gallery
src/lib                // i18n dictionary, locale/theme helpers, MDX loader, validation
```

## Portfolio gallery

`src/components/portfolio/portfolio-gallery.tsx` renders the interactive gallery on the home page. It is powered by the typed data source in `src/data/portfolio.ts`, which exports:

- `portfolioCategories` – localized labels for each filterable category.
- `PortfolioProject` – strongly typed entries that include bilingual titles, summaries, descriptions, media, stack tags, metrics, external links, and optional footnotes.

### Adding or editing projects

1. Open `src/data/portfolio.ts` and duplicate one of the existing entries in `portfolioProjects`.
2. Provide localized strings for `title`, `summary`, `description`, highlight labels, and metric values.
3. Assign one or more `categories` (add to `portfolioCategories` if a new one is needed).
4. Supply any supporting `links`, `stack` tags, and `metrics` to surface inside the modal.
5. Inline notes can register localized `footnotes`. Reference them by setting `footnoteId` inside a highlight item—the modal will render the inline marker and automatically append a numbered list at the bottom.

Because the gallery consumes the shared `LanguageProvider`, switching locales immediately swaps every piece of copy, the filters, and the modal content.

### Using footnotes outside MDX

The reusable `FootnoteProvider` and `Footnote` components live under `src/components/footnotes`. Wrap any section or modal with the provider, render your content, and drop `<Footnote id="context">Copy</Footnote>` wherever you need inline context. The provider collects every registration, renders a localized heading (pass `dictionary.footnotes.heading`), and inherits the site’s light/dark theme styles.

### Authoring posts

1. Create one file per locale, e.g. `content/blog/connected-rituals.en.mdx` and `content/blog/connected-rituals.es.mdx`.
2. Required frontmatter fields:
   ```yaml
   ---
   title: "Connected rituals for async squads"
   description: "Short summary"
   slug: "connected-rituals"        # route path, shared by every translation
   translationKey: "connected-rituals" # optional, defaults to slug
   language: "en"                    # en or es
   publishedAt: "2024-10-12"
   updatedAt: "2024-10-20"           # optional
   ---
   ```
3. Use `<Footnote id="any-id">context</Footnote>` anywhere in the body. The list is rendered automatically as "Footnotes" (EN) or "Notas al pie" (ES).
4. Missing translations are handled automatically: readers see the closest available language plus a notice generated from the locale dictionary.

## Running locally

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` and use the header toggles to change language or theme. The blog index and contact page update instantly.

### Required environment variables

Copy `.env.example` into `.env.local` and fill in the credentials from your SMTP provider (Nodemailer works with any SMTP server or services such as SendGrid/Postmark):

```
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
EMAIL_TO=
```

The `/api/contact` route validates payloads, localizes errors, and calls Nodemailer with the values above. `EMAIL_FROM` is the authenticated sender and `EMAIL_TO` is the inbox that receives submissions.

## Deploying on Vercel

1. **Create a new project** and select this repository.
2. **Build command**: `npm run build` (default output directory `.next`).
3. **Install command**: `npm install` (default).
4. **Environment variables**: add the six variables listed above in the “Production” environment. Vercel injects them at build and runtime.
5. **Run**: Vercel will execute `npm start` for preview/production once the build succeeds.

Because the blog relies on filesystem MDX files, no additional CMS setup is required. Updating or adding a post is as simple as committing a new file under `content/blog` and redeploying.

## Footnote usage

```mdx
Something worth clarifying<Footnote id="clarify">Extra context.</Footnote>
```

- `id` must be unique within the post so references link correctly.
- Footnotes are rendered with locale-aware headings and `↩` back-links.

## Contact workflow

1. The client form (`ContactForm`) runs the shared Zod schema before sending a request.
2. `/api/contact` re-validates, localizes response errors via the active locale sent in the payload, and hands the sanitized values to Nodemailer.
3. Errors bubble back to the UI with translated copy pulled from the dictionary.

## Scripts

- `npm run dev` – start the local dev server.
- `npm run build` – compile the production bundle.
- `npm run start` – run the production server locally.
- `npm run lint` – run Next.js lint checks.

Enjoy shipping bilingual content without duplicating entire stacks.

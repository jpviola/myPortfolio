# Next.js Foundation Starter

This repository bootstraps a modern Next.js 14 App Router workspace with TypeScript, Tailwind CSS, next-themes, and next-i18next already wired together. It serves as a clean baseline for future product work that needs a bilingual UI, theme toggles, and consistent formatting/linting out of the box.

## What's included

- **App Router + TypeScript** – opinionated project layout in `src/` with strict type-checking enabled.
- **Tailwind CSS** – custom tokens, Google fonts, typography plugin, and sensible container rules baked into `globals.css` and `tailwind.config.ts`.
- **Theming + i18n providers** – a single `Providers` component combines `next-themes` (system-aware dark mode) with `next-i18next` so both contexts are available everywhere.
- **Locale assets** – placeholder `en` and `es` namespaces stored under `public/locales/*` with next-i18next configured for shared namespaces.
- **Tooling** – ESLint (Next presets + Prettier) and Prettier formatting scripts to keep the codebase tidy.

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the starter interface. The landing page demonstrates:

- Theme toggling with `next-themes` and CSS variables.
- Live language switching backed by next-i18next resources.
- A minimalist layout using the configured design tokens and Google fonts.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the local development server (watch mode). |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Run ESLint using Next.js' recommended config + Prettier. |
| `npm run format` | Format all supported files with Prettier. |

> CI should run `npm run lint` and `npm run build` to ensure both linting and compilation succeed.

## Internationalization details

- Default locale: **English (`en`)**
- Secondary locale: **Spanish (`es`)**
- Shared namespaces: `common`, `home`
- Translation files live under `public/locales/{locale}/{namespace}.json`.

Add new copy by editing the JSON files or creating additional namespaces, then reference keys via `useTranslation("namespace")` on the client or helper utilities on the server.

## Theming

`src/app/providers.tsx` registers `ThemeProvider` with system detection enabled and wraps it with `appWithTranslation`. The root layout (`src/app/layout.tsx`) applies both Google fonts and injects this combined provider, so any component can call `useTheme` or `useTranslation` immediately.

## Environment placeholders

Future email/Nodemailer style features can reuse the following environment variables. Copy `.env.example` to `.env.local` and populate them when the integration is implemented:

```
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
EMAIL_TO=
```

They are not consumed yet, but the placeholders make it easy to wire up a contact form or transactional email pipeline later.

## Deployment

1. Run `npm run build` locally to ensure the project compiles.
2. Deploy to Vercel (or your platform of choice) with `npm install` as the install command and `npm run build` as the build command.
3. Provide the environment variables above in the hosting platform once you implement the email flow.

Happy shipping! The repo is ready for additional routes, features, and localization work.

import { Locale } from '@/lib/i18n/config';

export type LocalizedString = Record<Locale, string>;

export const portfolioCategories = [
  {
    id: 'platform',
    label: {
      en: 'Platform systems',
      es: 'Sistemas de plataforma',
    },
  },
  {
    id: 'researchOps',
    label: {
      en: 'Research operations',
      es: 'Operaciones de investigación',
    },
  },
  {
    id: 'goToMarket',
    label: {
      en: 'Go-to-market',
      es: 'Go-to-market',
    },
  },
  {
    id: 'enablement',
    label: {
      en: 'Enablement',
      es: 'Habilitación',
    },
  },
] as const;

export type PortfolioCategoryId = typeof portfolioCategories[number]['id'];

export interface PortfolioFootnote {
  id: string;
  copy: LocalizedString;
}

export interface PortfolioLink {
  href: string;
  label: LocalizedString;
}

export interface PortfolioHighlight {
  title: LocalizedString;
  body: LocalizedString;
  footnoteId?: string;
}

export interface PortfolioMetric {
  label: LocalizedString;
  value: LocalizedString;
}

export interface PortfolioProject {
  id: string;
  title: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  media: {
    src: string;
    alt: LocalizedString;
  };
  categories: PortfolioCategoryId[];
  stack: string[];
  highlights: PortfolioHighlight[];
  metrics: PortfolioMetric[];
  links: PortfolioLink[];
  footnotes?: PortfolioFootnote[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'atlas-hub',
    title: {
      en: 'Atlas research hub',
      es: 'Centro de investigación Atlas',
    },
    summary: {
      en: 'Unified bilingual insight library with programmable footnotes.',
      es: 'Biblioteca bilingüe de insights con notas al pie programables.',
    },
    description: {
      en: 'Rebuilt the company research hub so product, support, and leadership could query findings in English or Spanish. The experience pairs metadata, recordings, and footnotes to explain regional nuance without duplicating the entire write-up.',
      es: 'Reconstruimos el hub de investigación para que producto, soporte y liderazgo consultaran hallazgos en inglés o español. La experiencia combina metadatos, grabaciones y notas al pie para explicar matices regionales sin duplicar el informe completo.',
    },
    media: {
      src: '/window.svg',
      alt: {
        en: 'Screenshot of a bilingual research dashboard',
        es: 'Captura de un panel de investigación bilingüe',
      },
    },
    categories: ['platform', 'researchOps'],
    stack: ['Next.js', 'Supabase', 'MDX', 'Tailwind'],
    highlights: [
      {
        title: {
          en: 'Context switching drops',
          es: 'Menos cambios de contexto',
        },
        body: {
          en: 'Analysts tag each clip once and share snippets that switch languages inline, so stakeholders no longer wait for two recap decks.',
          es: 'Los analistas etiquetan cada clip una sola vez y comparten fragmentos que cambian de idioma en línea, evitando dos versiones del informe.',
        },
        footnoteId: 'snippets',
      },
      {
        title: {
          en: 'Traceable consent',
          es: 'Consentimiento rastreable',
        },
        body: {
          en: 'Footnotes capture when a quote is anonymized versus masked entirely, which keeps compliance reviewers in the same record.',
          es: 'Las notas al pie registran cuándo una cita es anonimizada frente a eliminada por completo, manteniendo a cumplimiento en el mismo registro.',
        },
        footnoteId: 'consent',
      },
    ],
    metrics: [
      {
        label: {
          en: 'Time to publish',
          es: 'Tiempo para publicar',
        },
        value: {
          en: '↓ 38% per study',
          es: '↓ 38% por estudio',
        },
      },
      {
        label: {
          en: 'Regions supported',
          es: 'Regiones cubiertas',
        },
        value: {
          en: '5 simultaneous launches',
          es: '5 lanzamientos simultáneos',
        },
      },
    ],
    links: [
      {
        href: 'https://example.com/atlas-case-study',
        label: {
          en: 'Case study deck',
          es: 'Presentación del caso',
        },
      },
      {
        href: 'https://example.com/atlas-demo',
        label: {
          en: 'Live prototype',
          es: 'Prototipo en vivo',
        },
      },
    ],
    footnotes: [
      {
        id: 'snippets',
        copy: {
          en: 'Clips are stored once and rendered with locale-aware captions so annotations stay in sync.',
          es: 'Los clips se guardan una sola vez y se muestran con subtítulos según el idioma para mantener sincronizadas las anotaciones.',
        },
      },
      {
        id: 'consent',
        copy: {
          en: 'Consent logs travel with each note, which means auditors can review translations without exporting data.',
          es: 'Los registros de consentimiento viajan con cada nota, permitiendo auditorías de traducciones sin exportar datos.',
        },
      },
    ],
  },
  {
    id: 'dual-track-launch',
    title: {
      en: 'Dual-track launch desk',
      es: 'Mesa de lanzamiento dual',
    },
    summary: {
      en: 'Coordinated playbooks that pair go-to-market experiments in both languages.',
      es: 'Playbooks coordinados que emparejan experimentos go-to-market en ambos idiomas.',
    },
    description: {
      en: 'Stood up a lightweight launch desk that let marketing, product, and support rehearse weekly updates in English and Spanish simultaneously. Every card inside the desk links to proof, localized positioning, and the canonical message for frontline teams.',
      es: 'Montamos una mesa de lanzamiento ligera que permitió a marketing, producto y soporte ensayar actualizaciones semanales en inglés y español al mismo tiempo. Cada tarjeta enlaza a evidencia, posicionamiento localizado y el mensaje oficial para los equipos de primera línea.',
    },
    media: {
      src: '/globe.svg',
      alt: {
        en: 'Illustration of synchronized launch activities',
        es: 'Ilustración de actividades de lanzamiento sincronizadas',
      },
    },
    categories: ['goToMarket', 'enablement'],
    stack: ['Linear', 'Notion API', 'Next.js'],
    highlights: [
      {
        title: {
          en: 'Shared cadence',
          es: 'Cadencia compartida',
        },
        body: {
          en: 'The desk locks milestones to dual-language scripts so regional leads can adapt tone without drifting from the launch map.',
          es: 'La mesa vincula hitos a guiones bilingües para que los líderes regionales adapten el tono sin apartarse del plan.',
        },
      },
      {
        title: {
          en: 'Measured pivots',
          es: 'Cambios medidos',
        },
        body: {
          en: 'Every experiment card keeps the original hypothesis plus annotations for each market, which preserves context after retros.',
          es: 'Cada tarjeta de experimento conserva la hipótesis original y anotaciones por mercado, preservando el contexto tras las retros.',
        },
        footnoteId: 'experiments',
      },
    ],
    metrics: [
      {
        label: {
          en: 'Asset reuse',
          es: 'Reutilización de activos',
        },
        value: {
          en: '72% of collateral shared',
          es: '72% del material reutilizado',
        },
      },
      {
        label: {
          en: 'Launch tempo',
          es: 'Ritmo de lanzamientos',
        },
        value: {
          en: 'Weekly sync → async briefs',
          es: 'Sync semanal → briefs asíncronos',
        },
      },
    ],
    links: [
      {
        href: 'https://example.com/dual-track-guide',
        label: {
          en: 'Playbook template',
          es: 'Plantilla del playbook',
        },
      },
    ],
    footnotes: [
      {
        id: 'experiments',
        copy: {
          en: 'When we archived the launch, annotations exported into the same deck so execs could see how copy evolved per region.',
          es: 'Al archivar el lanzamiento, las anotaciones se exportaron al mismo deck para que dirección viera cómo evolucionaba el copy por región.',
        },
      },
    ],
  },
  {
    id: 'signals-console',
    title: {
      en: 'Signals console',
      es: 'Consola de señales',
    },
    summary: {
      en: 'Telemetry dashboard aligning platform health, research notes, and support queues.',
      es: 'Panel que alinea salud de la plataforma, notas de investigación y colas de soporte.',
    },
    description: {
      en: 'Connected incident reviews, churn interviews, and product analytics into a single bilingual console. The dashboard exposes the narrative and lets teams open a modal to read the research footnotes that justify each spike.',
      es: 'Conectamos revisiones de incidentes, entrevistas de churn y analítica de producto en una sola consola bilingüe. El panel expone la narrativa y permite abrir un modal para leer las notas de investigación que justifican cada pico.',
    },
    media: {
      src: '/file.svg',
      alt: {
        en: 'Charts showing product health and notes',
        es: 'Gráficas de salud del producto y notas',
      },
    },
    categories: ['platform', 'enablement'],
    stack: ['Next.js', 'DatoCMS', 'Vercel Edge'],
    highlights: [
      {
        title: {
          en: 'Live annotations',
          es: 'Anotaciones en vivo',
        },
        body: {
          en: 'Every chart point links back to the interview or log line that triggered it, so engineers never lose the bilingual source.',
          es: 'Cada punto en la gráfica enlaza con la entrevista o log que lo originó, evitando perder la fuente bilingüe.',
        },
        footnoteId: 'annotations',
      },
      {
        title: {
          en: 'Shared filters',
          es: 'Filtros compartidos',
        },
        body: {
          en: 'Product managers slice the same view mobile leads use, which keeps priorities aligned across regions.',
          es: 'Los PM utilizan la misma vista que los líderes móviles, manteniendo prioridades alineadas entre regiones.',
        },
      },
    ],
    metrics: [
      {
        label: {
          en: 'Incident review time',
          es: 'Tiempo de revisión de incidentes',
        },
        value: {
          en: '↓ 45 minutes per call',
          es: '↓ 45 minutos por llamada',
        },
      },
      {
        label: {
          en: 'Shared dashboards',
          es: 'Dashboards compartidos',
        },
        value: {
          en: '12 squads subscribe',
          es: '12 escuadras suscritas',
        },
      },
    ],
    links: [
      {
        href: 'https://example.com/signals-console',
        label: {
          en: 'Technical spec',
          es: 'Especificación técnica',
        },
      },
      {
        href: 'https://example.com/signals-video',
        label: {
          en: 'Walkthrough video',
          es: 'Video de recorrido',
        },
      },
    ],
    footnotes: [
      {
        id: 'annotations',
        copy: {
          en: 'Annotations inherit the viewer’s locale so the same link renders English or Spanish context automatically.',
          es: 'Las anotaciones heredan el idioma del espectador, mostrando contexto en inglés o español automáticamente.',
        },
      },
    ],
  },
];

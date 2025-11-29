import { Locale } from '@/lib/i18n/config';

export type LocalizedString = Record<Locale, string>;

export const portfolioCategories = [
  {
    id: 'curriculum',
    label: {
      en: 'Curriculum design',
      es: 'Diseño curricular',
    },
  },
  {
    id: 'research',
    label: {
      en: 'Research labs',
      es: 'Laboratorios de investigación',
    },
  },
  {
    id: 'publicPrograms',
    label: {
      en: 'Public programs',
      es: 'Programas públicos',
    },
  },
  {
    id: 'mentoring',
    label: {
      en: 'Mentoring & advising',
      es: 'Mentorías y acompañamiento',
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
    id: 'phenomenology-commons',
    title: {
      en: 'Phenomenology Commons',
      es: 'Comunidad Fenomenológica',
    },
    summary: {
      en: 'Graduate seminar linking oral histories with phenomenological method.',
      es: 'Seminario de posgrado que vincula historias orales con método fenomenológico.',
    },
    description: {
      en: 'Co-created with the Institute of Philosophy at UBA to help educators pair oral history archives with rigorous phenomenological description. Fellows document fieldwork, annotate testimonies, and publish bilingual briefs for partner institutions.',
      es: 'Co-creado con el Instituto de Filosofía de la UBA para ayudar a docentes a combinar archivos de historia oral con descripción fenomenológica rigurosa. Los becarios documentan trabajo de campo, anotan testimonios y publican informes bilingües para las instituciones aliadas.',
    },
    media: {
      src: '/window.svg',
      alt: {
        en: 'Students collaborating around archival material',
        es: 'Estudiantes colaborando alrededor de material de archivo',
      },
    },
    categories: ['curriculum', 'research'],
    stack: ['Graduate seminar', 'Oral history', 'Field notebooks'],
    highlights: [
      {
        title: {
          en: 'Shared field diaries',
          es: 'Diarios de campo compartidos',
        },
        body: {
          en: 'Students pair phenomenological description with ethnographic prompts so archives stay grounded in lived experience.',
          es: 'Los estudiantes combinan descripción fenomenológica con consignas etnográficas para mantener los archivos anclados a la experiencia vivida.',
        },
        footnoteId: 'field-diaries',
      },
      {
        title: {
          en: 'Archive stewardship',
          es: 'Custodia de archivos',
        },
        body: {
          en: 'Each cohort processes delicate testimonies, tags consent levels, and shares guidance with museum partners.',
          es: 'Cada cohorte procesa testimonios sensibles, etiqueta niveles de consentimiento y comparte lineamientos con museos aliados.',
        },
      },
    ],
    metrics: [
      {
        label: {
          en: 'Fellows per cohort',
          es: 'Becarios por cohorte',
        },
        value: {
          en: '28 researchers',
          es: '28 investigadores',
        },
      },
      {
        label: {
          en: 'Annotated testimonies',
          es: 'Testimonios anotados',
        },
        value: {
          en: '320 records',
          es: '320 registros',
        },
      },
    ],
    links: [
      {
        href: 'https://example.com/phenomenology-commons',
        label: {
          en: 'Syllabus overview',
          es: 'Resumen del programa',
        },
      },
      {
        href: 'https://example.com/phenomenology-commons-report',
        label: {
          en: 'Impact report',
          es: 'Informe de impacto',
        },
      },
    ],
    footnotes: [
      {
        id: 'field-diaries',
        copy: {
          en: 'Participants keep bilingual diaries that connect phenomenological reductions with contextual notes.',
          es: 'Los participantes mantienen diarios bilingües que conectan reducciones fenomenológicas con notas contextuales.',
        },
      },
    ],
  },
  {
    id: 'ethics-technology-studio',
    title: {
      en: 'Ethics of Technology Studio',
      es: 'Estudio de Ética Tecnológica',
    },
    summary: {
      en: 'Interfaculty lab bridging engineering, law, and philosophy to draft responsible AI policies.',
      es: 'Laboratorio interfacultades que une ingeniería, derecho y filosofía para diseñar políticas responsables de IA.',
    },
    description: {
      en: 'Weekly studio that pairs engineering prototypes with philosophical critique and legal review. Teams co-author ethical guardrails, publication guidelines, and response plans for public institutions.',
      es: 'Estudio semanal que combina prototipos de ingeniería con crítica filosófica y revisión legal. Los equipos co-escriben barandillas éticas, guías de publicación y planes de respuesta para instituciones públicas.',
    },
    media: {
      src: '/globe.svg',
      alt: {
        en: 'Illustration of interdisciplinary seminar',
        es: 'Ilustración de seminario interdisciplinario',
      },
    },
    categories: ['publicPrograms', 'curriculum'],
    stack: ['Policy clinic', 'Workshops', 'Faculty co-teaching'],
    highlights: [
      {
        title: {
          en: 'Policy sprints',
          es: 'Sprints de política',
        },
        body: {
          en: 'Mixed teams prototype ethical guardrails alongside engineering releases and legal reviews.',
          es: 'Equipos mixtos prototipan barandillas éticas junto a los lanzamientos de ingeniería y las revisiones legales.',
        },
        footnoteId: 'policy',
      },
      {
        title: {
          en: 'Community juries',
          es: 'Jurados comunitarios',
        },
        body: {
          en: 'Residents and students review case studies to keep institutional decisions accountable to lived experience.',
          es: 'Vecinos y estudiantes revisan casos para mantener las decisiones institucionales alineadas con la experiencia vivida.',
        },
      },
    ],
    metrics: [
      {
        label: {
          en: 'Partner faculties',
          es: 'Facultades aliadas',
        },
        value: {
          en: '3 schools',
          es: '3 facultades',
        },
      },
      {
        label: {
          en: 'Policy briefs',
          es: 'Documentos de política',
        },
        value: {
          en: '12 published',
          es: '12 publicados',
        },
      },
    ],
    links: [
      {
        href: 'https://example.com/ethics-studio-guide',
        label: {
          en: 'Studio guide',
          es: 'Guía del estudio',
        },
      },
    ],
    footnotes: [
      {
        id: 'policy',
        copy: {
          en: 'Each sprint ends with a bilingual rubric that product teams reuse during procurement reviews.',
          es: 'Cada sprint termina con una rúbrica bilingüe que los equipos de producto reutilizan en las revisiones de compras.',
        },
      },
    ],
  },
  {
    id: 'care-theory-lab',
    title: {
      en: 'Care Theory Lab',
      es: 'Laboratorio de Teoría del Cuidado',
    },
    summary: {
      en: 'Community-based research residency focused on health, education, and mutual aid infrastructures.',
      es: 'Residencia de investigación comunitaria enfocada en salud, educación e infraestructuras de cuidado.',
    },
    description: {
      en: 'Residency program that embeds philosophy students inside clinics and schools to co-design practices of care. Participants publish joint findings with community partners and mentor younger cohorts.',
      es: 'Programa de residencia que inserta a estudiantes de filosofía en clínicas y escuelas para co-diseñar prácticas de cuidado. Los participantes publican hallazgos junto a las organizaciones y acompañan a cohortes más jóvenes.',
    },
    media: {
      src: '/file.svg',
      alt: {
        en: 'Community workshop illustration',
        es: 'Ilustración de taller comunitario',
      },
    },
    categories: ['research', 'mentoring'],
    stack: ['Community research', 'Residency', 'Mentorship'],
    highlights: [
      {
        title: {
          en: 'Resident circles',
          es: 'Círculos de residentes',
        },
        body: {
          en: 'Weekly salons mix philosophical readings with story-sharing from nurses, teachers, and caregivers.',
          es: 'Salones semanales mezclan lecturas filosóficas con relatos de enfermeras, docentes y cuidadoras.',
        },
        footnoteId: 'residents',
      },
      {
        title: {
          en: 'Care metrics',
          es: 'Métricas de cuidado',
        },
        body: {
          en: 'Teams build qualitative indicators that complement hospital dashboards and municipal reports.',
          es: 'Los equipos construyen indicadores cualitativos que complementan tableros hospitalarios e informes municipales.',
        },
      },
    ],
    metrics: [
      {
        label: {
          en: 'Community partners',
          es: 'Aliados comunitarios',
        },
        value: {
          en: '9 organizations',
          es: '9 organizaciones',
        },
      },
      {
        label: {
          en: 'Student residencies',
          es: 'Residencias estudiantiles',
        },
        value: {
          en: '14 fellows',
          es: '14 becarios',
        },
      },
    ],
    links: [
      {
        href: 'https://example.com/care-theory-lab',
        label: {
          en: 'Residency prospectus',
          es: 'Prospecto de la residencia',
        },
      },
      {
        href: 'https://example.com/care-theory-lab-journal',
        label: {
          en: 'Field journal',
          es: 'Cuaderno de campo',
        },
      },
    ],
    footnotes: [
      {
        id: 'residents',
        copy: {
          en: 'Residents pair weekly philosophical salons with service hours inside partnering clinics.',
          es: 'Los residentes combinan salones filosóficos semanales con horas de servicio en las clínicas aliadas.',
        },
      },
    ],
  },
];

import { Locale } from '@/lib/i18n/config';

export type LocalizedText = Record<Locale, string>;
export type LocalizedTextList = Record<Locale, string[]>;

type SectionCopy = {
  kicker: LocalizedText;
  heading: LocalizedText;
  description: LocalizedText;
};

export type EducationTimelineItem = {
  id: string;
  institution: LocalizedText;
  credential: LocalizedText;
  period: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
};

export type ResearchFocusArea = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  methods: LocalizedTextList;
};

export type TeachingExperienceItem = {
  id: string;
  course: LocalizedText;
  institution: LocalizedText;
  level: LocalizedText;
  terms: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedTextList;
};

export type PublicationItem = {
  id: string;
  title: LocalizedText;
  venue: LocalizedText;
  year: string;
  description: LocalizedText;
  link: string;
  linkLabel: LocalizedText;
};

export type CareerHighlightCard = {
  id: string;
  label: LocalizedText;
  stat: LocalizedText;
  body: LocalizedText;
};

export const educationTimeline: SectionCopy & { items: EducationTimelineItem[] } = {
  kicker: {
    en: 'Academic CV',
    es: 'CV académico',
  },
  heading: {
    en: 'Education timeline',
    es: 'Trayectoria académica',
  },
  description: {
    en: 'Training across humanities, cognitive science, and computing powers multilingual scholarship.',
    es: 'La formación en humanidades, ciencias cognitivas y computación respalda una investigación multilingüe.',
  },
  items: [
    {
      id: 'phd-hci',
      institution: {
        en: 'Stanford University · HCI Group',
        es: 'Universidad de Stanford · Grupo de HCI',
      },
      credential: {
        en: 'Ph.D. in Human-Computer Interaction',
        es: 'Doctorado en Interacción Humano-Computadora',
      },
      period: {
        en: '2012 – 2016',
        es: '2012 – 2016',
      },
      location: {
        en: 'Stanford, California',
        es: 'Stanford, California',
      },
      summary: {
        en: 'Dissertation on equitable AI feedback systems for bilingual classrooms, co-advised by CS and education faculty.',
        es: 'Tesis sobre sistemas de retroalimentación de IA equitativos para aulas bilingües, codirigida por facultad de computación y educación.',
      },
    },
    {
      id: 'msc-cog',
      institution: {
        en: 'University of Barcelona · Faculty of Psychology',
        es: 'Universidad de Barcelona · Facultad de Psicología',
      },
      credential: {
        en: 'M.Sc. in Cognitive Science',
        es: 'Maestría en Ciencias Cognitivas',
      },
      period: {
        en: '2010 – 2012',
        es: '2010 – 2012',
      },
      location: {
        en: 'Barcelona, Spain',
        es: 'Barcelona, España',
      },
      summary: {
        en: 'Led the NeuroDesign lab and published studies on bilingual perception and tactile learning tools.',
        es: 'Dirigió el laboratorio de NeuroDesign y publicó estudios sobre percepción bilingüe y herramientas táctiles de aprendizaje.',
      },
    },
    {
      id: 'ba-lit',
      institution: {
        en: 'National Autonomous University of Mexico',
        es: 'Universidad Nacional Autónoma de México',
      },
      credential: {
        en: 'B.A. in Comparative Literature',
        es: 'Licenciatura en Literatura Comparada',
      },
      period: {
        en: '2005 – 2009',
        es: '2005 – 2009',
      },
      location: {
        en: 'Mexico City, Mexico',
        es: 'Ciudad de México, México',
      },
      summary: {
        en: 'Explored translation theory, co-founded a community press, and designed early reading technologies.',
        es: 'Exploró teoría de la traducción, cofundó una editorial comunitaria y diseñó tecnologías tempranas de lectura.',
      },
    },
  ],
};

export const researchFocus: SectionCopy & { areas: ResearchFocusArea[] } = {
  kicker: {
    en: 'Research',
    es: 'Investigación',
  },
  heading: {
    en: 'Inquiry & research focus',
    es: 'Líneas de investigación',
  },
  description: {
    en: 'Fieldwork-driven investigations align civic technology, education, and responsible AI.',
    es: 'Investigaciones guiadas por trabajo de campo que articulan tecnología cívica, educación e IA responsable.',
  },
  areas: [
    {
      id: 'civic-learning',
      title: {
        en: 'Civic learning interfaces',
        es: 'Interfaces para aprendizaje cívico',
      },
      summary: {
        en: 'Codesigns mixed-reality toolkits that help first-time voters deliberate policy within bilingual communities.',
        es: 'Cocrea kits de realidad mixta que ayudan a votantes primerizos a deliberar políticas en comunidades bilingües.',
      },
      methods: {
        en: ['Participatory design charrettes', 'Speculative prototyping', 'Longitudinal diary studies'],
        es: ['Sesiones de diseño participativo', 'Prototipado especulativo', 'Estudios longitudinales con diarios'],
      },
    },
    {
      id: 'responsible-ai',
      title: {
        en: 'Responsible AI feedback',
        es: 'Retroalimentación de IA responsable',
      },
      summary: {
        en: 'Evaluates multilingual tutoring agents so families receive transparent, human-centered explanations.',
        es: 'Evalúa agentes tutores multilingües para que las familias reciban explicaciones transparentes y centradas en las personas.',
      },
      methods: {
        en: ['Model interpretability audits', 'Co-analysis with teachers', 'Localized evaluation frameworks'],
        es: ['Auditorías de interpretabilidad de modelos', 'Coanálisis con docentes', 'Marcos de evaluación localizados'],
      },
    },
    {
      id: 'mixed-methods',
      title: {
        en: 'Mixed-methods evaluation',
        es: 'Evaluación de métodos mixtos',
      },
      summary: {
        en: 'Combines ethnography with telemetry to describe how public institutions adopt inclusive technology.',
        es: 'Combina etnografía y telemetría para describir cómo las instituciones públicas adoptan tecnología inclusiva.',
      },
      methods: {
        en: ['Comparative policy ethnography', 'Contextual inquiry sprints', 'Data storytelling workshops'],
        es: ['Etnografía comparativa de políticas', 'Sprints de investigación contextual', 'Talleres de narrativas con datos'],
      },
    },
  ],
};

export const teachingExperience: SectionCopy & { items: TeachingExperienceItem[] } = {
  kicker: {
    en: 'Teaching',
    es: 'Docencia',
  },
  heading: {
    en: 'Teaching & mentorship',
    es: 'Docencia y mentoría',
  },
  description: {
    en: 'Studios and seminars center on designing with multilingual communities and scaling responsible research.',
    es: 'Los estudios y seminarios se centran en diseñar con comunidades multilingües y escalar investigación responsable.',
  },
  items: [
    {
      id: 'inclusive-studio',
      course: {
        en: 'Inclusive Product Strategy Studio',
        es: 'Estudio de Estrategia de Producto Inclusivo',
      },
      institution: {
        en: 'Columbia Business School',
        es: 'Columbia Business School',
      },
      level: {
        en: 'Graduate studio',
        es: 'Estudio de posgrado',
      },
      terms: {
        en: 'Spring 2023 · Spring 2024',
        es: 'Primavera 2023 · Primavera 2024',
      },
      description: {
        en: 'Guided cross-functional MBA teams through bilingual fieldwork and evidence-based roadmaps.',
        es: 'Guié a equipos interdisciplinarios de MBA en trabajo de campo bilingüe y hojas de ruta basadas en evidencia.',
      },
      highlights: {
        en: ['Embedded accessibility reviews into every critique.', 'Partnered with New York civic labs for live briefs.'],
        es: ['Integró revisiones de accesibilidad en cada crítica.', 'Trabajó con laboratorios cívicos de Nueva York en briefs reales.'],
      },
    },
    {
      id: 'research-methods',
      course: {
        en: 'Research Methods for Emerging Interfaces',
        es: 'Métodos de Investigación para Interfaces Emergentes',
      },
      institution: {
        en: 'MIT M.Eng. in HCI',
        es: 'MIT M.Eng. en HCI',
      },
      level: {
        en: 'Graduate seminar',
        es: 'Seminario de posgrado',
      },
      terms: {
        en: 'Fall 2021 · Fall 2022',
        es: 'Otoño 2021 · Otoño 2022',
      },
      description: {
        en: 'Focused on prototyping inclusive AI assistants with qualitative and quantitative rigor.',
        es: 'Se centró en prototipar asistentes de IA inclusivos con rigor cualitativo y cuantitativo.',
      },
      highlights: {
        en: ['Delivered bilingual critique templates for peer review.', 'Launched a living repository of research protocols.'],
        es: ['Compartió plantillas bilingües para las críticas entre pares.', 'Lanzó un repositorio vivo de protocolos de investigación.'],
      },
    },
    {
      id: 'service-design',
      course: {
        en: 'Service Design Practicum',
        es: 'Práctica de Diseño de Servicios',
      },
      institution: {
        en: 'Universidad de los Andes',
        es: 'Universidad de los Andes',
      },
      level: {
        en: 'Undergraduate lab',
        es: 'Laboratorio de pregrado',
      },
      terms: {
        en: 'Summer 2019 · Summer 2020',
        es: 'Verano 2019 · Verano 2020',
      },
      description: {
        en: 'Partnered with municipal agencies in Bogotá to transform resident services.',
        es: 'Trabajó con agencias municipales en Bogotá para transformar servicios ciudadanos.',
      },
      highlights: {
        en: ['Mentored first-generation students through research ethics reviews.', 'Delivered Spanish-first toolkits for service blueprints.'],
        es: ['Acompañó a estudiantes de primera generación en comités de ética.', 'Entregó kits en español para mapas de servicio.'],
      },
    },
  ],
};

export const publications: SectionCopy & { items: PublicationItem[] } = {
  kicker: {
    en: 'Publications',
    es: 'Publicaciones',
  },
  heading: {
    en: 'Selected publications',
    es: 'Publicaciones seleccionadas',
  },
  description: {
    en: 'Representative peer-reviewed work on bilingual learning environments and humane AI systems.',
    es: 'Trabajos arbitrados sobre entornos de aprendizaje bilingüe y sistemas de IA centrados en las personas.',
  },
  items: [
    {
      id: 'translating-trust',
      title: {
        en: 'Translating Trust: Designing Feedback Loops for Bilingual Classrooms',
        es: 'Traducir la confianza: diseño de bucles de retroalimentación para aulas bilingües',
      },
      venue: {
        en: 'ACM CHI Conference on Human Factors in Computing Systems',
        es: 'Conferencia ACM CHI sobre Factores Humanos en Sistemas Computacionales',
      },
      year: '2024',
      description: {
        en: 'Introduces a framework for equitable AI nudges that respect student agency across English and Spanish.',
        es: 'Presenta un marco de avisos de IA equitativos que respetan la agencia estudiantil en inglés y español.',
      },
      link: 'https://doi.org/10.1145/placeholder1',
      linkLabel: {
        en: 'Access paper',
        es: 'Ver artículo',
      },
    },
    {
      id: 'co-design',
      title: {
        en: 'Co-Designing Civics Simulations with First-Time Voters',
        es: 'Cocrear simulaciones cívicas con votantes primerizos',
      },
      venue: {
        en: 'Proceedings of the Learning Sciences',
        es: 'Memorias de las Ciencias del Aprendizaje',
      },
      year: '2022',
      description: {
        en: 'Documents participatory workshops that produced bilingual civic learning kits adopted by three cities.',
        es: 'Documenta talleres participativos que produjeron kits cívicos bilingües adoptados por tres ciudades.',
      },
      link: 'https://doi.org/10.1145/placeholder2',
      linkLabel: {
        en: 'Read case study',
        es: 'Leer caso de estudio',
      },
    },
    {
      id: 'mentorship',
      title: {
        en: 'Mentorship as Infrastructure in Responsible AI Teams',
        es: 'La mentoría como infraestructura en equipos de IA responsable',
      },
      venue: {
        en: 'Journal of Responsible Technology',
        es: 'Journal of Responsible Technology',
      },
      year: '2021',
      description: {
        en: 'Maps mentorship rituals that sustain ethical review practices inside multilingual research labs.',
        es: 'Describe rituales de mentoría que sostienen prácticas de revisión ética en laboratorios multilingües.',
      },
      link: 'https://doi.org/10.1145/placeholder3',
      linkLabel: {
        en: 'Download PDF',
        es: 'Descargar PDF',
      },
    },
  ],
};

export const careerHighlights: SectionCopy & { cards: CareerHighlightCard[] } = {
  kicker: {
    en: 'Highlights',
    es: 'Destacados',
  },
  heading: {
    en: 'Career highlights at a glance',
    es: 'Resumen de logros profesionales',
  },
  description: {
    en: 'Snapshots that summarize impact across scholarship, teaching, and civic partnerships.',
    es: 'Instantáneas que resumen el impacto en investigación, docencia y alianzas cívicas.',
  },
  cards: [
    {
      id: 'publications-count',
      label: {
        en: 'Peer-reviewed articles',
        es: 'Artículos arbitrados',
      },
      stat: {
        en: '28',
        es: '28',
      },
      body: {
        en: 'Published across HCI, learning sciences, and civic tech venues.',
        es: 'Publicados en foros de HCI, ciencias del aprendizaje y tecnología cívica.',
      },
    },
    {
      id: 'mentees',
      label: {
        en: 'Students mentored',
        es: 'Estudiantes mentorados',
      },
      stat: {
        en: '40+',
        es: '40+',
      },
      body: {
        en: 'Guided undergraduate researchers, master’s studios, and doctoral cohorts.',
        es: 'Ha guiado a investigadores de pregrado, estudios de maestría y cohortes doctorales.',
      },
    },
    {
      id: 'partnerships',
      label: {
        en: 'Industry & civic partnerships',
        es: 'Alianzas con industria y gobierno',
      },
      stat: {
        en: '12',
        es: '12',
      },
      body: {
        en: 'Collaborations with public innovation labs and responsible AI teams.',
        es: 'Colaboraciones con laboratorios públicos de innovación y equipos de IA responsable.',
      },
    },
    {
      id: 'talks',
      label: {
        en: 'Talks & keynotes',
        es: 'Charlas y conferencias',
      },
      stat: {
        en: '55',
        es: '55',
      },
      body: {
        en: 'Spoke at design weeks, education ministries, and research summits.',
        es: 'Ha presentado en semanas de diseño, ministerios de educación y cumbres de investigación.',
      },
    },
  ],
};

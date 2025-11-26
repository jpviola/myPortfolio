export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const FALLBACK_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

type ContactErrors = {
  nameRequired: string;
  nameLength: string;
  emailInvalid: string;
  messageRequired: string;
  messageLength: string;
  requestError: string;
};

type ContactFormCopy = {
  title: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitCta: string;
  successTitle: string;
  successBody: string;
  errors: ContactErrors;
};

type DictionaryShape = {
  navigation: {
    blog: string;
    contact: string;
    themeLabel: string;
    languageLabel: string;
    themeLight: string;
    themeDark: string;
  };
  home: {
    heroTitle: string;
    heroBody: string;
    primaryCta: string;
    secondaryCta: string;
    statLabel: string;
    statValue: string;
  };
  blog: {
    title: string;
    description: string;
    translationsLabel: string;
    fallbackLabel: (languageName: string) => string;
    fallbackChip: (languageName: string) => string;
    readPost: string;
    missingPosts: string;
  };
  blogPost: {
    published: string;
    updated: string;
    availableLanguages: string;
    translationBadge: string;
  };
  footnotes: {
    heading: string;
  };
  contact: ContactFormCopy;
  languageNames: Record<Locale, string>;
};

export const dictionaries: Record<Locale, DictionaryShape> = {
  en: {
    navigation: {
      blog: "Blog",
      contact: "Contact",
      themeLabel: "Theme",
      languageLabel: "Language",
      themeLight: "Light",
      themeDark: "Dark",
    },
    home: {
      heroTitle: "Bilingual insights for product leaders.",
      heroBody:
        "Capture research notes once and publish them in English or Spanish. The starter blog demonstrates MDX-powered translations, custom footnotes, and a production-ready contact path.",
      primaryCta: "Browse the blog",
      secondaryCta: "Start a conversation",
      statLabel: "Reusable translation pairs",
      statValue: "40% time saved",
    },
    blog: {
      title: "Field notes",
      description:
        "Every article ships with locale-aware metadata. When a translation is missing we gracefully fall back to the closest available language.",
      translationsLabel: "Available in",
      fallbackLabel: (languageName: string) => `Showing the ${languageName} version while we translate this post.`,
      fallbackChip: (languageName: string) => `${languageName} version`,
      readPost: "Read article",
      missingPosts: "No posts available yet.",
    },
    blogPost: {
      published: "Published",
      updated: "Updated",
      availableLanguages: "Translations",
      translationBadge: "Translation",
    },
    footnotes: {
      heading: "Footnotes",
    },
    contact: {
      title: "Contact",
      description:
        "Send a bilingual request and we'll route it to the right inbox. The handler validates input, localizes errors, and relays via Nodemailer.",
      nameLabel: "Full name",
      emailLabel: "Email",
      messageLabel: "Message",
      submitCta: "Send message",
      successTitle: "Message sent",
      successBody: "Thanks for reaching out. We'll reply soon.",
      errors: {
        nameRequired: "Please add your name.",
        nameLength: "Name should be at least 2 characters.",
        emailInvalid: "Add a valid email address.",
        messageRequired: "Let us know how we can help.",
        messageLength: "Messages should be between 10 and 1500 characters.",
        requestError: "We couldn't send your message. Try again in a moment.",
      },
    },
    languageNames: {
      en: "English",
      es: "Spanish",
    },
  },
  es: {
    navigation: {
      blog: "Blog",
      contact: "Contacto",
      themeLabel: "Tema",
      languageLabel: "Idioma",
      themeLight: "Claro",
      themeDark: "Oscuro",
    },
    home: {
      heroTitle: "Ideas bilingües para equipos de producto.",
      heroBody:
        "Captura aprendizajes una sola vez y publícalos en inglés o español. Este demo usa MDX para detectar traducciones, notas al pie y un formulario listo para producción.",
      primaryCta: "Ver el blog",
      secondaryCta: "Escríbenos",
      statLabel: "Pares traducidos reutilizables",
      statValue: "40% de tiempo ahorrado",
    },
    blog: {
      title: "Notas de campo",
      description:
        "Cada artículo conoce qué idiomas existen. Si falta una traducción mostramos la versión más cercana disponible.",
      translationsLabel: "Disponible en",
      fallbackLabel: (languageName: string) => `Mostrando la versión en ${languageName} mientras preparamos la traducción.`,
      fallbackChip: (languageName: string) => `Versión ${languageName}`,
      readPost: "Leer artículo",
      missingPosts: "Aún no hay entradas.",
    },
    blogPost: {
      published: "Publicado",
      updated: "Actualizado",
      availableLanguages: "Traducciones",
      translationBadge: "Traducción",
    },
    footnotes: {
      heading: "Notas al pie",
    },
    contact: {
      title: "Contacto",
      description:
        "Envía un mensaje en tu idioma preferido. Validamos cada campo, localizamos los errores y enviamos el correo vía Nodemailer.",
      nameLabel: "Nombre completo",
      emailLabel: "Correo",
      messageLabel: "Mensaje",
      submitCta: "Enviar mensaje",
      successTitle: "Mensaje enviado",
      successBody: "Gracias por escribir. Te responderemos pronto.",
      errors: {
        nameRequired: "Por favor agrega tu nombre.",
        nameLength: "El nombre debe tener al menos 2 caracteres.",
        emailInvalid: "Necesitamos un correo válido.",
        messageRequired: "Cuéntanos cómo podemos ayudar.",
        messageLength: "El mensaje debe tener entre 10 y 1500 caracteres.",
        requestError: "No pudimos enviar el mensaje. Intenta otra vez.",
      },
    },
    languageNames: {
      en: "Inglés",
      es: "Español",
    },
  },
};

export type Dictionary = typeof dictionaries["en"];

export function getDictionary(locale: Locale): DictionaryShape {
  return dictionaries[locale] ?? dictionaries[FALLBACK_LOCALE];
}

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLanguageName(locale: Locale, target: Locale = locale): string {
  const dict = getDictionary(target);
  return dict.languageNames[locale];
}

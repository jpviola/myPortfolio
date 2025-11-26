import { ContactForm } from '@/components/contact/contact-form';
import { getDictionary } from '@/lib/i18n/config';
import { getServerLocale } from '@/lib/i18n/server';

export default function ContactPage() {
  const locale = getServerLocale();
  const dictionary = getDictionary(locale);

  return (
    <section className="container grid gap-12 py-16 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{dictionary.navigation.contact}</p>
        <h1 className="text-4xl font-semibold text-foreground">{dictionary.contact.title}</h1>
        <p className="text-base text-foreground/70">{dictionary.contact.description}</p>
      </div>
      <div className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-lg dark:bg-muted/60">
        <ContactForm />
      </div>
    </section>
  );
}

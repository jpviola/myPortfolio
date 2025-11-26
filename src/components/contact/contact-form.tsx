'use client';

import { FormEvent, useState } from 'react';
import { contactSchema, ContactFormData, mapContactErrors } from '@/lib/validation';
import { useLanguage } from '@/components/providers/language-provider';

interface SubmitState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

const initialForm: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

export function ContactForm() {
  const { locale, dictionary } = useLanguage();
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: 'idle' });

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(mapContactErrors(parsed.error.issues, dictionary.contact.errors));
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...parsed.data, locale }),
      });
      const payload = await response.json();
      if (!response.ok) {
        setErrors(payload.errors ?? {});
        setState({ status: 'error', message: dictionary.contact.errors.requestError });
        return;
      }
      setForm(initialForm);
      setState({ status: 'success', message: dictionary.contact.successBody });
    } catch (error) {
      console.error(error);
      setState({ status: 'error', message: dictionary.contact.errors.requestError });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="name">
          {dictionary.contact.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          className="mt-2 w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3 text-sm focus:border-accent focus:outline-none"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          disabled={submitting}
          autoComplete="name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="email">
          {dictionary.contact.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-2 w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3 text-sm focus:border-accent focus:outline-none"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          disabled={submitting}
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="message">
          {dictionary.contact.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="mt-2 w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3 text-sm focus:border-accent focus:outline-none"
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          disabled={submitting}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>
      {state.status === 'success' && state.message && (
        <p className="rounded-2xl border border-green-500/50 bg-green-50 px-4 py-3 text-sm text-green-700">
          {dictionary.contact.successTitle}: {state.message}
        </p>
      )}
      {state.status === 'error' && state.message && (
        <p className="rounded-2xl border border-red-500/50 bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      )}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-70"
        disabled={submitting}
      >
        {submitting ? `${dictionary.contact.submitCta}…` : dictionary.contact.submitCta}
      </button>
    </form>
  );
}

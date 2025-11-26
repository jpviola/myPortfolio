import { Locale } from '@/lib/i18n/config';

export function formatDate(date: string, locale: Locale) {
  const value = new Date(date);
  if (Number.isNaN(value.valueOf())) {
    return date;
  }
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(value);
}

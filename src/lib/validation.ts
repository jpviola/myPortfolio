import { z, ZodIssue } from 'zod';
import type { Dictionary } from '@/lib/i18n/config';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'nameRequired' })
    .min(2, { message: 'nameLength' })
    .max(120, { message: 'nameLength' }),
  email: z.string().email({ message: 'emailInvalid' }),
  message: z
    .string()
    .min(1, { message: 'messageRequired' })
    .min(10, { message: 'messageLength' })
    .max(1500, { message: 'messageLength' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactErrorKey = keyof Dictionary['contact']['errors'];

export function mapContactErrors(
  issues: ZodIssue[],
  dictionary: Dictionary['contact']['errors'],
): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  for (const issue of issues) {
    const path = issue.path[0];
    if (!path || typeof path !== 'string') {
      continue;
    }
    if (errors[path as keyof ContactFormData]) {
      continue;
    }
    const key = (issue.message as ContactErrorKey) || 'requestError';
    const message = dictionary[key] ?? dictionary.requestError;
    errors[path as keyof ContactFormData] = message;
  }
  return errors;
}


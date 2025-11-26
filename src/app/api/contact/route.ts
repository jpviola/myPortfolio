import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { contactSchema, mapContactErrors } from '@/lib/validation';
import { FALLBACK_LOCALE, Locale, getDictionary, isLocale } from '@/lib/i18n/config';

type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

let cachedTransport: { transporter: nodemailer.Transporter; config: MailConfig } | null = null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const locale: Locale = isLocale(body.locale) ? body.locale : FALLBACK_LOCALE;
    const dictionary = getDictionary(locale);
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errors = mapContactErrors(parsed.error.issues, dictionary.contact.errors);
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { transporter, config } = getTransport();
    const payload = parsed.data;

    await transporter.sendMail({
      to: config.to,
      from: config.from,
      replyTo: payload.email,
      subject: `New Locale Lab inquiry from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\nMessage:\n${payload.message}`,
      html: `<p><strong>Name:</strong> ${payload.name}</p><p><strong>Email:</strong> ${payload.email}</p><p><strong>Message</strong></p><p>${payload.message}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('contact-email-error', error);
    const locale: Locale = FALLBACK_LOCALE;
    const dictionary = getDictionary(locale);
    return NextResponse.json({ error: dictionary.contact.errors.requestError }, { status: 500 });
  }
}

function getTransport() {
  if (cachedTransport) {
    return cachedTransport;
  }
  const config = resolveMailConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
  cachedTransport = { transporter, config };
  return cachedTransport;
}

function resolveMailConfig(): MailConfig {
  const host = process.env.EMAIL_SERVER_HOST;
  const port = Number(process.env.EMAIL_SERVER_PORT ?? 587);
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!host || !user || !pass || !from || !to) {
    throw new Error('Missing email configuration. Check .env.example for required variables.');
  }

  return { host, port, user, pass, from, to };
}

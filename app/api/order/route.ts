import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const schema = z.object({
  name: z.string(),
  phone: z.string(),
  from: z.string(),
  to: z.string(),
  date: z.string(),
  passengers: z.string().optional(),
  comment: z.string().optional(),
});

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    cache: 'no-store'
  });
}

async function sendEmail(subject: string, html: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;
  const to = process.env.MAIL_TO || process.env.CONTACT_EMAIL;
  if (!host || !user || !pass || !to) return;
  const transporter = nodemailer.createTransport({
    host, port: Number(process.env.SMTP_PORT || 465), secure: true,
    auth: { user, pass }
  });
  await transporter.sendMail({ from, to, subject, html });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const text = [
      `*Новая заявка на трансфер*`,
      `Имя: ${data.name}`,
      `Телефон: ${data.phone}`,
      `Маршрут: ${data.from} → ${data.to}`,
      `Дата/время: ${data.date}`,
      data.passengers ? `Пассажиров: ${data.passengers}` : '',
      data.comment ? `Комментарий: ${data.comment}` : ''
    ].filter(Boolean).join('\n');

    await Promise.all([
      sendTelegram(text),
      sendEmail(`Заявка: ${data.from} → ${data.to}`, text.replace(/\n/g, '<br/>'))
    ]);

    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

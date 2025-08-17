# TransferMVP — Next.js + Tailwind

Готовый шаблон для сайта трансферов: SEO-страницы под маршруты, форма заказа, Telegram/Email уведомления.

## Быстрый старт

```bash
pnpm i # или npm i / yarn
pnpm dev
```

Открой `http://localhost:3000`

## Переменные окружения

Создай `.env` из примера:

```
TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=
CONTACT_EMAIL=nemercevroman@gmail.com

# SMTP (необязательно, если используешь только Telegram)
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
MAIL_FROM=
MAIL_TO=
```

## Данные маршрутов

Редактируй `lib/routes.ts` — добавляй города/направления и цены. 
Страницы будут доступны по `/{slugFrom}/{slugTo}`, например `/sochi/anapa`.

## Деплой

- **Vercel** — просто подключи репозиторий, добавь переменные окружения.
- **reg.ru/VPS** — сборка `next build`, запуск `next start` (или SSR через PM2/NGINX).

## Лицензия
MIT

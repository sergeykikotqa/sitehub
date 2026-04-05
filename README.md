# СайтХаб

Минималистичный лендинг-портфолио для услуги “создание сайтов для локального бизнеса”. Проект собран на `Next.js App Router`, хранит кейсы в markdown и поддерживает контентный workflow через `Decap CMS`.

## Что внутри

- главная `/` с продающим hero и единым Telegram CTA
- каталог кейсов `/portfolio`
- detail pages `/portfolio/[slug]`
- `robots.txt`, `sitemap.xml`, 404 и базовый analytics bridge
- `public/admin` для редактирования `settings` и `projects`

## Стек

- `Next.js 16`
- `TypeScript`
- `Tailwind CSS 4`
- `gray-matter`
- `zod`
- `react-markdown`
- `Decap CMS`

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на [http://localhost:3000](http://localhost:3000).

## Локальный CMS workflow

```bash
npm run dev:cms
```

Перед запуском защищённой админки задайте env-переменные:

```powershell
$env:SITEHUB_ADMIN_USERNAME="admin"
$env:SITEHUB_ADMIN_PASSWORD="strong-password"
```

После этого доступны:

- сайт: [http://localhost:3000](http://localhost:3000)
- CMS: [http://localhost:3000/admin](http://localhost:3000/admin)

Если GitHub/Netlify auth ещё не готов или `/admin` временно выключен, контент можно редактировать напрямую через markdown-файлы.

## Контент

- `content/settings/site.json` — brand, SEO, CTA, navigation
- `content/projects/*.md` — кейсы портфолио
- `public/uploads/*` — OG и cover assets

## Модель кейса

- `status: draft | published` управляет видимостью на сайте
- `projectUrl` опционален и нужен для кнопки `Открыть сайт` на detail page

## Проверка

```bash
npm run lint
npm run build
```

## Motion Guidelines

All motion and animation decisions must follow the rules defined here:
→ /docs/motion-guidelines.md

## Decision Tuning Framework

Post-launch product decisions must follow the benchmark and guardrail rules defined here:
→ /docs/decision-tuning-framework.md

## Важно перед production

- подключить production-домен `https://сайтхаб.рф` или задать `SITE_URL` / `NEXT_PUBLIC_SITE_URL` для корректных canonical, OG и sitemap
- заменить placeholder `telegramUrl` и `ctaHref`
- при необходимости поменять seeded demo cases на реальные кейсы через CMS или markdown

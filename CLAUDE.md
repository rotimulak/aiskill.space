# Envise.space

Лендинг AI-платформы Envise на Next.js 16 (SSG).

## Стек

- Next.js 16 + React 19 + TypeScript 5
- Tailwind CSS 4 + Radix UI + shadcn/ui
- Lucide React (иконки)

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Главная страница
│   ├── layout.tsx         # Layout + метаданные + Яндекс Метрика
│   ├── globals.css        # Tailwind + CSS переменные + анимации
│   └── docs/              # Страницы документации
├── components/
│   ├── sections/          # Секции лендинга (navbar, hero, footer и др.)
│   └── ui/                # UI компоненты (button, card, input, accordion, avatar)
└── lib/
    ├── landing-content.ts # Весь контент лендинга (тексты, данные)
    └── utils.ts           # cn() для Tailwind классов

public/
├── fonts/                 # Geist шрифты
└── .htaccess             # Apache конфиг

utils/
└── deploy-ftp.js         # FTP деплой скрипт

dist/                      # Собранный SSG
```

## Команды

```bash
npm run dev      # Разработка (localhost:3000)
npm run build    # Сборка SSG в dist/
npm run lint     # ESLint проверка

node utils/deploy-ftp.js   # Деплой на FTP
```

## Деплой

FTP на MyJino.ru:
- Host: c174a6863fb6.hosting.myjino.ru
- Path: /envise.space

## Важно

- Контент редактируется в `src/lib/landing-content.ts`
- UI компоненты добавляются через `npx shadcn@latest add`
- Сборка статическая (output: "export")
- Path alias: `@/*` → `./src/*`

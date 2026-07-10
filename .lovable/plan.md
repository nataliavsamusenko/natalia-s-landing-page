
# План реализации лендинга Натальи Самусенко

## Стек и базовая настройка

- React + TypeScript + TanStack Router (текущий шаблон), Tailwind v4, shadcn/ui, framer-motion.
- Одна страница: `src/routes/index.tsx` + отдельный маршрут `src/routes/privacy.tsx` для политики ПДн (плюс дублирование в модалку на главной).
- `<html lang="ru">` через `__root.tsx`, SEO/OG/twitter в `head()` главного маршрута.
- Дизайн-токены (изумруд/золото/олива, стеклянные панели, свечения, тени) — в `src/styles.css` как семантические переменные, никаких хардкод-цветов в компонентах.
- Шрифты: Inter (body) + элегантный serif italic (например, Fraunces) для крупных акцентов — через `<link>` в `__root.tsx`.

## Ассеты

- Загруженное фото сохраню как Lovable Asset (`lovable-assets create` из `/mnt/user-uploads/…`) и подключу через JSON-пойнтер — без хранения бинаря в репо.
- Использую как есть, только адаптация кроп/оверлей/тени — без AI-перерисовки лица и украшений.
- Плейсхолдеры логотипов/сертификатов — inline SVG с пометкой TODO.

## Структура секций (сверху вниз)

1. **StickyHeader** — лого «Наталья Самусенко», якоря (Бизнес, Финансистам, Кейсы, Отзывы, Контакты), CTA-кнопка, бургер на мобилке, scroll-spy (IntersectionObserver).
2. **Hero** — full-bleed тёмный фон + интерактивное «ядро» (Canvas 2D частицы/градиентный шар с реакцией на курсор; fallback — статичный градиент при `prefers-reduced-motion` или отсутствии поддержки). Фото Натальи справа в стеклянной раме с изумрудным свечением. Сегмент-переключатель аудиторий, динамические H1/подзаголовок/буллеты/CTA.
3. **TrustStrip** — 4 метрики, 4–6 лого-заглушек, 2–3 сертификата-заглушки.
4. **BusinessBlock** (виден при `#business`) — карусель кейсов (ситуация → действие → результат) + аккордеон услуг (6 пунктов из ТЗ).
5. **FinanceBlock** (виден при `#finance`) — сетка flip-карточек инструментов (hover на desktop, tap на touch, клавиатура, закрытие по повторному tap/клику вне) + карточки программ (Наставничество, Практикум, Разборы).
6. **GlossaryTooltips** — небольшой инлайн-словарь ключевых терминов (EBITDA, Cash Flow, ROI, Оборотный капитал, Точка безубыточности), Radix Tooltip + Popover для touch, Esc закрывает, collision-aware.
7. **Testimonials** — два набора (бизнес/финансисты), горизонтальный scroll-snap, стрелки, клавиатура, aria-label. Показ зависит от аудитории.
8. **ContactForm** — Имя/Email/Сообщение + чекбокс согласия + ссылка на политику. Zod-валидация, имитация отправки (toast «Спасибо, скоро свяжусь»). TODO про backend/антиспам.
9. **Footer** — имя, Telegram, email-заглушка, ссылка на политику, копирайт.
10. **PrivacyModal / route `/privacy`** — временный нейтральный текст + TODO.

## Компоненты (в `src/components/landing/`)

- `AudienceProvider` (контекст + хук `useAudience`) — источник истины для `business | finance`.
- `Header`, `MobileMenu`, `AudienceSwitch`, `Hero`, `HeroBackground` (canvas-эффект + fallback), `PortraitFrame`.
- `TrustStrip`, `MetricCard`, `LogoPlaceholder`.
- `CasesCarousel`, `CaseCard`, `ServicesAccordion`.
- `ToolFlipCard`, `ToolsGrid`, `ProgramsGrid`, `ProgramCard`.
- `TermTooltip` (обёртка над Radix Tooltip/Popover с touch-детектом).
- `TestimonialsRail`, `TestimonialCard`.
- `ContactForm`, `PrivacyDialog`, `Footer`.
- `TelegramCTA` — единая кнопка с пропом `variant` и общей ссылкой-заглушкой.
- Данные-моки — `src/data/landing.ts` (кейсы, отзывы, инструменты, метрики) с шапкой `// TODO: заменить на реальный контент`.

## Переключатель аудиторий

- Значения `"business" | "finance"`, хранятся в контексте.
- Инициализация: URL-хэш (`#business`/`#finance`) → localStorage (`ns-audience`) → дефолт `business`.
- При смене: обновляем контекст, `localStorage.setItem`, `history.replaceState(null, "", "#business")` (без скачка скролла).
- Слушатель `hashchange` для навигации по якорям.
- Переключатель — 2 кнопки в hero (роль `tablist`/`tab`, `aria-selected`, стрелки влево/вправо).
- От аудитории зависят: hero H1/подзаголовок/буллеты, primary CTA, показ Business- vs Finance-блока, набор отзывов. Оба блока отрисовываются, скрываются через условный рендер (для SEO дублирующий контент кладётся в `<noscript>`-friendly семантику — оба `<section>` присутствуют в DOM, скрытая через `hidden` атрибут).

## Telegram CTA и мок-форма

- Константа `TELEGRAM_URL = "https://t.me/natalia_samusenko"` (`// TODO: заменить на реальную ссылку`), используется во всех CTA.
- Кнопки — `<a target="_blank" rel="noopener noreferrer">` с семантикой кнопки.
- Форма: `react-hook-form` + `zod` (валидация имени/email/сообщения/чекбокса), submit — `await new Promise(r => setTimeout(r, 600))` → success-state + toast. `// TODO: подключить backend/Formspree, антиспам, реальную политику ПДн`.

## Визуал и интерактив

- Палитра по ТЗ (в токенах): `--bg #000`, `--text #F5F3EF`, `--muted #9C978D`, `--gold #C9A15C`, `--emerald #0F6B4F`, `--olive #6F7A3A`, стеклянные слои и границы через `color-mix`.
- Правило гармонии: золото — главный CTA-акцент, изумруд — свечения/hero-фон, олива — только в тонких hover/градиентах.
- Микроанимации через framer-motion (fade/slide на появлении, hover-glow на карточках).
- Hero-фон: лёгкий canvas с частицами + радиальный градиент, реакция на mousemove, pulse по клику; `prefers-reduced-motion` → статичный градиент, canvas не монтируется.
- Focus-ring через `--ring`, видимый на всех интерактивных элементах.

## SEO / доступность / performance

- `head()` c русским title/description/OG/twitter, canonical `/`.
- Семантические `<header> <main> <section aria-labelledby> <footer>`, `<h1>` только в hero.
- `alt` у фото, `aria-label` на иконочных кнопках, `lang="ru"`.
- Фото с фиксированным `aspect-ratio` — без CLS.
- Проверю адаптив 360/768/1280+.

## Список TODO-заглушек в коде

- Реальная ссылка Telegram.
- Реальные логотипы клиентов и сертификаты.
- Реальные кейсы, метрики и отзывы (сейчас — правдоподобные моки).
- Backend/antispam для формы.
- Юридически проверенная политика ПДн.
- Реальные email и соц-ссылки в футере.
- OG-изображение (пока — фото Натальи).

Жду подтверждения — после «ок» начну реализацию.

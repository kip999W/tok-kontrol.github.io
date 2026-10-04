<div align="center">

# ⚡ ТокКонтроль

**Лендинг службы электромонтажа в Кемерово — готовый, собранный, задеплоенный**

[![Status](https://img.shields.io/badge/status-✅%20проект%20завершён-F59E0B?style=flat-square)]()
[![HTML](https://img.shields.io/badge/HTML5-kit--templates-0A192F?style=flat-square)]()
[![SCSS](https://img.shields.io/badge/SCSS-design--tokens-F59E0B?style=flat-square)]()
[![JS](https://img.shields.io/badge/JS-ES6%20modules-1E3A8A?style=flat-square)]()
[![Build](https://img.shields.io/badge/build-Prepros%207-4B5563?style=flat-square)]()

`Тёмно-синий #0A192F · Янтарный акцент #F59E0B · Montserrat + Inter`

</div>

---

## 📌 О проекте

Одностраничный маркетинговый сайт (лендинг) для компании **«ТокКонтроль»** — услуги электрика
в Кемерово и области: аварийный выезд 24/7, замена проводки, сборка щитов, умный дом.

Проект **полностью завершён**: свёрстан дизайн, настроена сборка, написана вся интерактивная
логика на чистом ES6, контент вынесен в data-модули. Сайт не требует Node.js и серверных
технологий — это статика, которую можно залить на любой хостинг.

**Ключевые офферы, отражённые в дизайне:** гарантия 3 года по договору, выезд за 60 минут,
бесплатный замер, честная смета без скрытых доплат, средний рейтинг клиентов 4.9/5.

---

## 🎨 Дизайн-система

Все токены собраны в `#source/scss/abstracts/_variables.scss`:

| Токен | Значение | Использование |
|---|---|---|
| `$color-primary` | `#0A192F` | Фон hero/footer, заголовки, тёмные секции |
| `$color-primary-light` | `#1E3A8A` | Акценты, фокус-состояния |
| `$color-accent` | `#F59E0B` | CTA-кнопки, цены, лейблы секций |
| `$color-accent-dark` | `#D97706` | Hover кнопок |
| `$font-primary` | Montserrat | Заголовки, навигация, кнопки |
| `$font-body` | Inter | Основной текст |

**Фирменные элементы:** волновый SVG-разделитель (`wave-divider`) между секциями,
жёлтая курсивная приставка в логотипе «Ток*Контроль*», нумерованные step-карточки (01–05),
inline-SVG иконки со `stroke="currentColor"`, бейджи допусков в карточках команды.

---

## 🧩 Воронка лендинга (10 секций)

```
Navbar (Bootstrap offcanvas)
 ├─ Hero: Swiper-слайдер (5 слайдов) + wave-divider
 ├─ Услуги            ← servicesData.js   (карточки с ценами, CTA)
 ├─ Преимущества      ← advantagesData.js («Почему мы»)
 ├─ Портфолио         ← portfolioData.js  (фильтры: квартиры / дома / коммерция)
 ├─ Калькулятор       ← 5 шагов: объект → тип работ → площадь (range 20–300 м²)
 │                      → доп. работы → результат «от N ₽» + CTA на замер
 ├─ Этапы работы      (5 шагов от заявки до акта приёмки)
 ├─ Команда           (мастера, стаж, бейджи допусков)
 ├─ Отзывы            ← reviewsData.js    (рейтинг, фото)
 ├─ Контакты          (форма + телефон + benefits-лист)
 └─ Footer (навигация, контакты, WhatsApp/Telegram, авто-год)
```

---

## 🏗 Архитектура

Принцип **«исходники → сборка → статика»**:

```
#source/  (index.kit + partials + scss)  ──Prepros──▶  index.html + css/main.css
js/data/*.js  ──import──▶  js/modules/*.js  ──render──▶  DOM (grid, swiper, cards)
```

Весь контент отделён от разметки: чтобы поменять услугу, отзыв или слайд,
достаточно отредактировать **один массив** в файле `js/data/`.

### JS-модули (`type="module"`, входная точка — `js/main.js`)

| Модуль | Ответственность |
|---|---|
| `modules/mainSlider.js` | Инициализация Swiper hero-слайдера из `slidesData.js` |
| `modules/renderCards.js` | Рендер услуг и преимуществ, фильтры портфолио |
| `modules/renderReviews.js` | Рендер сетки отзывов из `reviewsData.js` |
| `modules/calculator.js` | Пошаговый калькулятор: `CALC_PRICES`, прогресс-бар, диапазон «от/до» |
| `modules/contactForm.js` | Валидация, маска телефона `+7 (___) ___-__-__`, honeypot `_honey`, экран успеха |
| `modules/smoothScroll.js` | Плавный переход к якорям с учётом высоты navbar |
| `modules/scroll.js` | Кнопка «наверх» |
| `main.js` | Bootstrap модулей + CTA-логика: кнопка услуги → скролл к форме → автоподстановка услуги и текста в комментарий; `data-action="call"` → `tel:` |

---

## 📂 Структура файлов

```
├── index.html                  # собранный лендинг (Kit + minify)
├── css/main.css                # собранный CSS (из #source/scss)
├── vendor/swiper/              # Swiper 11 (css + js, локально, без CDN)
├── js/
│   ├── main.js                 # точка входа (ES modules)
│   ├── data/                   # servicesData · slidesData · portfolioData
│   │                           # · advantagesData · reviewsData
│   └── modules/                # 7 модулей логики (см. таблицу выше)
├── img/
│   ├── content/hero/           # slide-0…4.png
│   ├── content/portfolio/      # 7 фото объектов
│   ├── content/reviews/        # фото клиентов
│   ├── content/team/           # фото мастеров
│   └── favicon/                # полный набор иконок + webmanifest
├── #source/                    # исходники (не участвуют в рантайме)
│   ├── index.kit               # Kit-шаблон → собирает index.html
│   ├── partials/               # header, footer, swiper, calculator, contact
│   └── scss/                   # abstracts / base / components / sections
└── prepros.config              # настройки Prepros 7 (kit, sass, minify, livereload)
```

---

## 🚀 Запуск

**Продуктив:** просто откройте `index.html` или залейте папку на любой статический хостинг
(Node.js и сборка не нужны — всё уже собрано).

**Разработка (через Prepros 7):**

```bash
# 1. Открыть проект в Prepros 7 (File → Add Project → выбрать папку)
# 2. Нажать Run Prepros Server → livereload автоматически пересобирает
#    #source/index.kit → index.html  и  #source/scss → css/main.css
```

**Как добавить контент (пример — новая услуга):**

```js
// js/data/servicesData.js — добавьте объект в массив:
{
  title: 'Проектирование электрики',
  desc: 'Разработка проекта электроснабжения под ключ.',
  features: ['План освещения', 'Расчёт нагрузок', 'Схема щита'],
  price: 500,
  btnText: 'Заказать',
  btnAction: 'order',
  serviceId: 'other',
}
```

Карточка появится на сайте сама — разметку трогать не нужно.

---

## ✅ Качество

- **SEO:** meta description/keywords, canonical, Open Graph (`ru_RU`), theme-color, семантические секции
- **Доступность:** `aria-label`/`aria-controls` у offcanvas и соцкнопок, `label for` во всех полях, `alt` у изображений
- **Производительность:** `loading="lazy"` для изображений, `defer` для Swiper, минифицированные HTML/CSS/JS, шрифты через `preconnect`
- **Безопасность формы:** honeypot-поле `_honey`, required-согласие на обработку ПДн, клиентская валидация
- **Мобильность:** адаптив, offcanvas-меню, touch-слайдер, range-слайдер площади

---

## 📈 Дорожная карта v2

- [ ] Подключить реальный email-API вместо Formspree-полей (`_subject/_template`)
- [ ] Страница `privacy-policy.html` (ссылка в футере уже есть)
- [ ] Яндекс.Метрика / GA4 + цели на отправку формы и клик по телефону
- [ ] Реальные фото команды вместо плейсхолдеров
- [ ] Блог / FAQ-блок для SEO-трафика по низкочастотным запросам

---

<div align="center">

**ТокКонтроль** © 2026 · г. Кемерово, пр. Советский, д. 27, офис 304
Сделано вручную: HTML(Kit) · SCSS · Vanilla JS · без фреймворков

</div>

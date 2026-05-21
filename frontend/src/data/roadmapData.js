export const roadmapData = {
  frontend: {
    title: 'Frontend-разработчик',
    description: 'Пошаговый план развития frontend-разработчика с нуля до первой работы на основе стандартов индустрии.',
    categories: [
      {
        id: 'internet',
        title: '1. Как работает интернет',
        color: 'card-blue',
        items: [
          {
            id: 'internet-how',
            title: 'Как устроен интернет?',
            description: 'Изучите основы: что такое сеть, серверы, клиенты, IP-адреса и как данные перемещаются между компьютерами.',
            resources: [
              { title: 'Как работает Интернет (Хабр)', url: 'https://habr.com/ru/articles/342928/' },
              { title: 'How does the Internet work (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work' }
            ]
          },
          {
            id: 'internet-http',
            title: 'Что такое HTTP/HTTPS?',
            description: 'Протокол передачи гипертекста. Запросы (GET, POST, PUT, DELETE), статус-коды (200, 301, 400, 404, 500) и безопасность SSL/TLS.',
            resources: [
              { title: 'Обзор протокола HTTP (MDN)', url: 'https://developer.mozilla.org/ru/docs/Web/HTTP/Overview' },
              { title: 'Разница между HTTP и HTTPS (Cloudflare)', url: 'https://www.cloudflare.com/ru-ru/learning/ssl/why-is-http-not-secure/' }
            ]
          },
          {
            id: 'internet-dns',
            title: 'Как работает DNS?',
            description: 'Domain Name System — телефонная книга интернета, сопоставляющая доменные имена (например, google.com) с реальными IP-адресами серверов.',
            resources: [
              { title: 'Что такое DNS? (Cloudflare)', url: 'https://www.cloudflare.com/ru-ru/learning/dns/what-is-dns/' }
            ]
          },
          {
            id: 'internet-browsers',
            title: 'Браузеры и их устройство',
            description: 'Как браузеры рендерят страницы (разбор HTML/CSS, построение DOM и CSSOM деревьев, этапы Layout/Paint).',
            resources: [
              { title: 'Как работают браузеры (Хабр)', url: 'https://habr.com/ru/articles/126955/' }
            ]
          }
        ]
      },
      {
        id: 'html',
        title: '2. Основы HTML',
        color: 'card-lime',
        items: [
          {
            id: 'html-basics',
            title: 'Основы разметки HTML',
            description: 'Теги, атрибуты, структура страницы, заголовки, списки, формы, таблицы, ссылки и изображения.',
            resources: [
              { title: 'Введение в HTML (MDN)', url: 'https://developer.mozilla.org/ru/docs/Learn/HTML/Introduction_to_HTML' }
            ]
          },
          {
            id: 'html-semantic',
            title: 'Семантический HTML',
            description: 'Использование осмысленных тегов (<header>, <nav>, <main>, <article>, <footer>) вместо сплошных <div>.',
            resources: [
              { title: 'Семантические элементы HTML (W3Schools)', url: 'https://www.w3schools.com/html/html5_semantic_elements.asp' }
            ]
          },
          {
            id: 'html-seo',
            title: 'SEO и Доступность',
            description: 'Базовая оптимизация для поисковых систем (теги title, meta-описание) и доступность сайтов для людей с ограниченными возможностями (a11y, ARIA-атрибуты).',
            resources: [
              { title: 'Руководство по доступности web-контента (Хабр)', url: 'https://habr.com/ru/articles/499632/' }
            ]
          }
        ]
      },
      {
        id: 'css',
        title: '3. Стилизация CSS',
        color: 'card-pink',
        items: [
          {
            id: 'css-basics',
            title: 'Синтаксис и селекторы CSS',
            description: 'Стилизация элементов, селекторы (классы, ID, псевдоклассы), наследование, специфичность селекторов и блочная модель (Box Model).',
            resources: [
              { title: 'Изучение CSS (MDN)', url: 'https://developer.mozilla.org/ru/docs/Learn/CSS' }
            ]
          },
          {
            id: 'css-flexbox',
            title: 'Макеты на Flexbox',
            description: 'Одномерное позиционирование элементов с использованием Flexbox. Свойства контейнера и элементов.',
            resources: [
              { title: 'Шпаргалка по Flexbox (CSS-Tricks)', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
            ]
          },
          {
            id: 'css-grid',
            title: 'Сетки на CSS Grid',
            description: 'Двумерное позиционирование элементов по строкам и колонкам с помощью технологии Grid Layout.',
            resources: [
              { title: 'Полное руководство по CSS Grid (CSS-Tricks)', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }
            ]
          },
          {
            id: 'css-responsive',
            title: 'Адаптивность и Media-запросы',
            description: 'Создание сайтов, корректно отображающихся на смартфонах, планшетах и компьютерах с использованием медиа-запросов и относительных единиц измерения.',
            resources: [
              { title: 'Адаптивный веб-дизайн (MDN)', url: 'https://developer.mozilla.org/ru/docs/Learn/CSS/CSS_layout/Responsive_Design' }
            ]
          }
        ]
      },
      {
        id: 'javascript',
        title: '4. Программирование на JavaScript',
        color: 'card-lilac',
        items: [
          {
            id: 'js-basics',
            title: 'Основы JavaScript',
            description: 'Переменные (let, const), типы данных, циклы, ветвления, структуры данных (объекты, массивы), функции и замыкания.',
            resources: [
              { title: 'Современный учебник JavaScript', url: 'https://learn.javascript.ru/' }
            ]
          },
          {
            id: 'js-dom',
            title: 'Работа с DOM API',
            description: 'Поиск элементов на странице, изменение текста и стилей, обработка событий пользователя (клик, отправка формы, скролл).',
            resources: [
              { title: 'Документ и объекты страницы (learn.javascript.ru)', url: 'https://learn.javascript.ru/document' }
            ]
          },
          {
            id: 'js-async',
            title: 'Асинхронность и Fetch API',
            description: 'Промисы (Promises), async/await. Выполнение AJAX/HTTP запросов к серверу для получения динамических данных.',
            resources: [
              { title: 'Асинхронные запросы: Fetch (learn.javascript.ru)', url: 'https://learn.javascript.ru/fetch' }
            ]
          },
          {
            id: 'js-es6',
            title: 'ES6+ возможности и модули',
            description: 'Стрелочные функции, деструктуризация массивов/объектов, rest/spread операторы, классы и модульный JS (import/export).',
            resources: [
              { title: 'Спецификации ES6+ (Хабр)', url: 'https://habr.com/ru/articles/305900/' }
            ]
          }
        ]
      },
      {
        id: 'tools',
        title: '5. Окружение и инструменты',
        color: 'card-blue',
        items: [
          {
            id: 'tools-git',
            title: 'Система контроля версий Git',
            description: 'Инициализация репозитория, коммиты, ветвление, слияние веток, разрешение конфликтов слияния.',
            resources: [
              { title: 'Книга Pro Git (на русском)', url: 'https://git-scm.com/book/ru/v2' }
            ]
          },
          {
            id: 'tools-github',
            title: 'Хостинг кода GitHub',
            description: 'Публикация кода, создание Pull Requests, совместная работа, коммиты в удаленный репозиторий.',
            resources: [
              { title: 'Основы работы с GitHub (Хабр)', url: 'https://habr.com/ru/articles/125399/' }
            ]
          },
          {
            id: 'tools-npm',
            title: 'Пакетные менеджеры (npm / yarn)',
            description: 'Установка внешних библиотек и зависимостей, управление package.json и запускаемыми скриптами.',
            resources: [
              { title: 'Что такое NPM? (Хабр)', url: 'https://habr.com/ru/articles/244367/' }
            ]
          },
          {
            id: 'tools-vite',
            title: 'Сборщик проектов Vite',
            description: 'Современный инструмент для быстрой сборки фронтенда, поддерживающий HMR (Hot Module Replacement).',
            resources: [
              { title: 'Официальный сайт Vite', url: 'https://vite.dev/' }
            ]
          }
        ]
      },
      {
        id: 'framework',
        title: '6. Фреймворки (на примере React)',
        color: 'card-lime',
        items: [
          {
            id: 'react-basics',
            title: 'Основы React и JSX',
            description: 'Компонентный подход, JSX разметка, передача параметров через props, рендеринг списков.',
            resources: [
              { title: 'Документация React (на русском)', url: 'https://react.dev/' }
            ]
          },
          {
            id: 'react-state',
            title: 'Состояние и Жизненный цикл',
            description: 'Управление локальным состоянием с помощью хука useState. Выполнение побочных эффектов с useEffect.',
            resources: [
              { title: 'Хуки в React (react.dev)', url: 'https://react.dev/reference/react' }
            ]
          },
          {
            id: 'react-router',
            title: 'Маршрутизация (React Router)',
            description: 'Создание многостраничных Single Page Applications (SPA) с помощью библиотеки React Router.',
            resources: [
              { title: 'Официальный сайт React Router', url: 'https://reactrouter.com/' }
            ]
          }
        ]
      },
      {
        id: 'modern-css',
        title: '7. Продвинутый CSS',
        color: 'card-pink',
        items: [
          {
            id: 'css-modules',
            title: 'CSS Modules',
            description: 'Локальные области видимости для стилей компонентов для избежания конфликтов имен классов.',
            resources: [
              { title: 'CSS Modules руководство', url: 'https://github.com/css-modules/css-modules' }
            ]
          },
          {
            id: 'css-tailwind',
            title: 'Фреймворк Tailwind CSS',
            description: 'Utility-first CSS фреймворк для быстрой стилизации компонентов с помощью готовых классов.',
            resources: [
              { title: 'Документация Tailwind CSS', url: 'https://tailwindcss.com/' }
            ]
          }
        ]
      },
      {
        id: 'test-deploy',
        title: '8. Тестирование и деплой',
        color: 'card-lilac',
        items: [
          {
            id: 'test-basics',
            title: 'Основы тестирования',
            description: 'Написание Unit-тестов для функций и компонентов с использованием Jest или Vitest.',
            resources: [
              { title: 'Введение в тестирование на Jest (Хабр)', url: 'https://habr.com/ru/articles/502348/' }
            ]
          },
          {
            id: 'deploy-vercel',
            title: 'Хостинг и публикация (Vercel / Netlify)',
            description: 'Сборка проекта в production-версию и деплой на облачные платформы для публичного доступа.',
            resources: [
              { title: 'Деплой React приложения на Vercel (Хабр)', url: 'https://habr.com/ru/articles/553316/' }
            ]
          }
        ]
      }
    ]
  },
  backend: {
    title: 'Backend-разработчик',
    description: 'Интерактивная карта развития backend-разработчика.',
    categories: [
      {
        id: 'languages',
        title: '1. Языки программирования',
        color: 'card-lilac',
        items: [
          { id: 'be-lang-basics', title: 'Основы Node.js / Python / Go', description: 'Изучение синтаксиса выбранного языка и базовых библиотек.', resources: [] },
          { id: 'be-lang-oop', title: 'ООП и шаблоны проектирования', description: 'Классы, объекты, паттерны и SOLID принципы.', resources: [] }
        ]
      },
      {
        id: 'databases',
        title: '2. Базы данных',
        color: 'card-blue',
        items: [
          { id: 'be-db-sql', title: 'Реляционные БД и SQL (PostgreSQL)', description: 'Проектирование таблиц, индексы, связи, написание сложных запросов.', resources: [] },
          { id: 'be-db-nosql', title: 'NoSQL базы данных (MongoDB)', description: 'Документо-ориентированные базы данных, кэширование (Redis).', resources: [] }
        ]
      },
      {
        id: 'frameworks',
        title: '3. Создание API и Веб-фреймворки',
        color: 'card-lime',
        items: [
          { id: 'be-fw-api', title: 'REST API, GraphQL, gRPC', description: 'Создание маршрутов, обработка запросов, валидация данных, сериализация.', resources: [] },
          { id: 'be-fw-auth', title: 'Аутентификация и сессии', description: 'Cookies, JWT токены, OAuth2 и авторизация прав доступа.', resources: [] }
        ]
      },
      {
        id: 'deploy',
        title: '4. Инфраструктура и DevOps',
        color: 'card-pink',
        items: [
          { id: 'be-devops-git', title: 'Контроль версий и Git', description: 'Совместная разработка, коммиты, ветки.', resources: [] },
          { id: 'be-devops-docker', title: 'Контейнеризация с Docker', description: 'Создание образов, Docker Compose, запуск контейнеров.', resources: [] }
        ]
      }
    ]
  },
  android: {
    title: 'Android-разработчик',
    description: 'Интерактивная карта развития мобильного разработчика под Android.',
    categories: [
      {
        id: 'kotlin',
        title: '1. Язык Kotlin',
        color: 'card-pink',
        items: [
          { id: 'android-kotlin-basics', title: 'Синтаксис Kotlin', description: 'Базовые типы, управляющие конструкции, функции, ООП.', resources: [] },
          { id: 'android-kotlin-coroutines', title: 'Асинхронность и Coroutines', description: 'Потоки, корутины, асинхронное выполнение задач.', resources: [] }
        ]
      },
      {
        id: 'ui',
        title: '2. Разработка интерфейса (UI)',
        color: 'card-blue',
        items: [
          { id: 'android-ui-xml', title: 'XML Layouts и View System', description: 'Конструкторы разметки, ConstraintLayout, RecyclerView.', resources: [] },
          { id: 'android-ui-compose', title: 'Jetpack Compose', description: 'Современный декларативный фреймворк для верстки интерфейса.', resources: [] }
        ]
      },
      {
        id: 'architecture',
        title: '3. Архитектура и Библиотеки',
        color: 'card-lime',
        items: [
          { id: 'android-arch-mvvm', title: 'MVVM и Архитектурные компоненты', description: 'LiveData, ViewModel, Room DB, Retrofit для работы с сетью.', resources: [] }
        ]
      }
    ]
  },
  qa: {
    title: 'QA Engineer',
    description: 'Интерактивная карта развития специалиста по тестированию ПО (QA).',
    categories: [
      {
        id: 'theory',
        title: '1. Теория тестирования',
        color: 'card-lime',
        items: [
          { id: 'qa-theory-basics', title: 'Виды и уровни тестирования', description: 'Классификация тестирования, чек-листы, тест-кейсы, жизненный цикл бага.', resources: [] },
          { id: 'qa-theory-istqb', title: 'Стандарты ISTQB', description: 'Основные концепции и терминология по международным стандартам.', resources: [] }
        ]
      },
      {
        id: 'manual',
        title: '2. Инструменты ручного тестирования',
        color: 'card-blue',
        items: [
          { id: 'qa-manual-api', title: 'Тестирование API с Postman', description: 'Отправка HTTP запросов, валидация ответов, авто-тесты в Postman.', resources: [] },
          { id: 'qa-manual-devtools', title: 'Chrome DevTools', description: 'Инспектирование элементов, анализ сетевых запросов и логов консоли.', resources: [] }
        ]
      },
      {
        id: 'automation',
        title: '3. Автоматизация тестирования (AQA)',
        color: 'card-pink',
        items: [
          { id: 'qa-auto-js', title: 'Основы JavaScript / Python', description: 'Базовый синтаксис языка программирования для написания скриптов.', resources: [] },
          { id: 'qa-auto-frameworks', title: 'Фреймворки автоматизации', description: 'Написание тестов с помощью Cypress, Selenium или Playwright.', resources: [] }
        ]
      }
    ]
  }
};

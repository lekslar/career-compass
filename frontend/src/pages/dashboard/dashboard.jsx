import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User, Compass, History, ChevronDown, ChevronUp,
  BookOpen, TrendingUp, LogOut
} from 'lucide-react';
import './dashboard.css';

const ROADMAPS_BY_PROFESSION = {
  frontend: [
    { id: 1, title: 'Месяц 1: Основы интернета и HTML/CSS', tasks: [
      'Изучить как работает интернет, IP-адреса, DNS-серверы и протоколы HTTP/HTTPS',
      'Освоить синтаксис HTML5, семантические теги и базовые мета-теги для SEO',
      'Понять основы CSS3, способы подключения стилей, селекторы и блочную модель (Box Model)'
    ]},
    { id: 2, title: 'Месяц 2: Макеты и адаптивность CSS', tasks: [
      'Изучить позиционирование элементов Flexbox (flex-direction, justify-content, align-items)',
      'Освоить двумерные сетки CSS Grid (grid-template-columns, grid-gap)',
      'Научиться создавать адаптивный дизайн с помощью медиа-запросов (@media) и относительных единиц'
    ]},
    { id: 3, title: 'Месяц 3: Базовый JavaScript', tasks: [
      'Изучить переменные (let, const), типы данных и базовые операторы',
      'Понять работу ветвлений (if/else, switch) и циклов (for, while)',
      'Освоить функции (включая стрелочные) и работу с массивами/объектами'
    ]},
    { id: 4, title: 'Месяц 4: Работа с DOM API', tasks: [
      'Понять как устроено DOM-дерево и научиться находить элементы на странице',
      'Реализовать обработку событий пользователя (клики, формы, клавиатура)',
      'Создать первое интерактивное приложение (интерактивный список дел или калькулятор)'
    ]},
    { id: 5, title: 'Месяц 5: Асинхронность и Fetch API', tasks: [
      'Изучить асинхронное программирование (Promises, async/await)',
      'Научиться делать GET/POST HTTP-запросы с помощью Fetch API к внешнему серверу',
      'Изучить формат обмена данными JSON и обработку ошибок try/catch'
    ]},
    { id: 6, title: 'Месяц 6: Окружение и инструменты', tasks: [
      'Установить Git, освоить основные команды (commit, push, pull, branch)',
      'Создать профиль на GitHub, опубликовать свои проекты и настроить GitHub Pages',
      'Изучить основы пакетного менеджера npm/yarn и сборщик проектов Vite'
    ]},
    { id: 7, title: 'Месяц 7: Введение в React', tasks: [
      'Понять философию React, компонентный подход и разметку JSX',
      'Научиться передавать данные между компонентами через props',
      'Создать структуру проекта с переиспользуемыми React-компонентами'
    ]},
    { id: 8, title: 'Месяц 8: Состояние и Жизненный цикл в React', tasks: [
      'Изучить управление локальным состоянием с помощью хука useState',
      'Понять работу с побочными эффектами (запросы данных, таймеры) через хук useEffect',
      'Реализовать фильтрацию и динамическое обновление списков в React'
    ]},
    { id: 9, title: 'Месяц 9: Навигация и продвинутая стилизация', tasks: [
      'Настроить маршрутизацию в приложении с помощью библиотеки React Router',
      'Изучить CSS Modules для локализации стилей компонентов',
      'Освоить современный UI-фреймворк Tailwind CSS и применить его в проекте'
    ]},
    { id: 10, title: 'Месяц 10: Тестирование фронтенда', tasks: [
      'Понять цели тестирования и разницу между Unit и интеграционными тестами',
      'Изучить фреймворк Vitest/Jest и написать первые тесты для чистых JS-функций',
      'Написать тесты для React-компонентов с помощью React Testing Library'
    ]},
    { id: 11, title: 'Месяц 11: Оптимизация и Деплой', tasks: [
      'Провести рефакторинг кода, настроить линтеры ESLint и Prettier',
      'Собрать production-бандл и опубликовать проект на платформе Vercel или Netlify',
      'Оформить репозитории на GitHub: написать подробные README.md, добавить скриншоты'
    ]},
    { id: 12, title: 'Месяц 12: Резюме и Собеседования', tasks: [
      'Составить резюме (CV) веб-разработчика и подготовить сопроводительное письмо',
      'Пройти несколько тренировочных собеседований (Mock Interviews) по JS/React',
      'Начать активно откликаться на вакансии и проходить технические интервью'
    ]}
  ],
  backend: [
    { id: 1, title: 'Месяц 1: Выбор платформы и Основы языка', tasks: [
      'Выбрать стек (Node.js/Python/Go) и установить рабочее окружение (IDE, компилятор/рантайм)',
      'Изучить синтаксис языка: переменные, типы данных, операторы и ветвления',
      'Понять работу с функциями, областями видимости и базовыми структурами (массивы, словари)'
    ]},
    { id: 2, title: 'Месяц 2: ООП и архитектурные концепции', tasks: [
      'Освоить объектно-ориентированное программирование (классы, наследование, полиморфизм)',
      'Изучить базовые принципы проектирования SOLID и паттерны программирования',
      'Написать консольное приложение средней сложности с использованием модульной структуры'
    ]},
    { id: 3, title: 'Месяц 3: Реляционные базы данных и SQL', tasks: [
      'Изучить устройство реляционных БД на примере PostgreSQL или MySQL',
      'Освоить синтаксис SQL: создание таблиц, индексы, внешние ключи и связи (один-ко-многим, многие-ко-многим)',
      'Научиться писать сложные запросы (JOIN, GROUP BY) и агрегировать данные'
    ]},
    { id: 4, title: 'Месяц 4: Создание первого HTTP-сервера', tasks: [
      'Изучить работу протокола HTTP: структура запросов/ответов, методы, статус-коды',
      'Освоить фреймворк для веб-сервера (Express для Node.js, FastAPI/Django для Python)',
      'Написать первый сервер, обрабатывающий простейшие GET и POST запросы'
    ]},
    { id: 5, title: 'Месяц 5: Разработка REST API', tasks: [
      'Спроектировать полноценный REST API для работы с сущностями (CRUD)',
      'Настроить валидацию входящих данных на сервере и правильную отдачу HTTP статус-кодов',
      'Изучить CORS, настроить middleware-функции для парсинга тела запросов и логирования'
    ]},
    { id: 6, title: 'Месяц 6: Интеграция БД с сервером', tasks: [
      'Изучить технологию ORM (Prisma/Sequelize для JS, SQLAlchemy для Python)',
      'Настроить миграции БД через ORM и связать таблицы с сущностями в коде',
      'Реализовать сохранение, обновление и выборку данных из БД в хэндлерах сервера'
    ]},
    { id: 7, title: 'Месяц 7: Аутентификация и безопасность', tasks: [
      'Изучить принципы хэширования паролей с использованием библиотек типа bcrypt',
      'Реализовать регистрацию и вход пользователей на основе сессий или JWT-токенов',
      'Написать middleware защиты роутов для проверки прав авторизованного пользователя'
    ]},
    { id: 8, title: 'Месяц 8: Git, совместная работа и структура', tasks: [
      'Освоить Git: создание веток, коммиты, разрешение конфликтов слияния',
      'Организовать структуру проекта по стандартам MVC или чистой архитектуры',
      'Опубликовать исходный код проекта на GitHub'
    ]},
    { id: 9, title: 'Месяц 9: Контейнеризация с Docker', tasks: [
      'Понять концепцию контейнеризации, разницу между виртуальными машинами и контейнерами',
      'Написать Dockerfile для упаковки своего веб-сервера в изолированный образ',
      'Настроить Docker Compose для одновременного запуска сервера и базы данных PostgreSQL'
    ]},
    { id: 10, title: 'Месяц 10: Автотесты и документирование API', tasks: [
      'Написать Unit и интеграционные тесты для API с использованием Jest/Supertest или Pytest',
      'Настроить автоматическое генерирование документации API с помощью Swagger/OpenAPI',
      'Покрыть тестами критически важные сценарии (авторизация, запись в БД)'
    ]},
    { id: 11, title: 'Месяц 11: Деплой сервера в облако', tasks: [
      'Настроить переменные окружения (.env) для работы в продакшене',
      'Развернуть веб-сервер и базу данных на облачном хостинге (Render, Railway, Amvera)',
      'Настроить базовый CI/CD пайплайн на GitHub Actions для автозапуска тестов при коммите'
    ]},
    { id: 12, title: 'Месяц 12: Портфолио и Собеседования', tasks: [
      'Красиво оформить README.md ко всем ключевым проектам в GitHub с архитектурной схемой',
      'Составить резюме Backend Developer, отразить навыки работы с БД, Docker и API',
      'Изучить частые вопросы по базам данных (транзакции, индексы) и начать прохождение интервью'
    ]}
  ],
  android: [
    { id: 1, title: 'Месяц 1: Язык Kotlin — Основы', tasks: [
      'Установить среду разработки Android Studio и настроить Kotlin SDK',
      'Изучить синтаксис Kotlin: переменные, типы данных, базовые операторы, ветвления и циклы',
      'Научиться писать простые консольные программы и освоить работу с функциями'
    ]},
    { id: 2, title: 'Месяц 2: Kotlin — ООП и Null Safety', tasks: [
      'Изучить классы, объекты, наследование, интерфейсы и абстрактные классы в Kotlin',
      'Понять концепцию Null Safety (nullable типы, безопасные вызовы, Elvis-оператор)',
      'Освоить коллекции Kotlin (List, Set, Map) и функциональные операции над ними'
    ]},
    { id: 3, title: 'Месяц 3: Начало разработки под Android', tasks: [
      'Изучить структуру Android проекта: папки java, res, файл AndroidManifest.xml',
      'Понять жизненный цикл Activity и научиться запускать эмулятор/тестировать на реальном устройстве',
      'Создать первое приложение со статичным XML-макетом и кнопками'
    ]},
    { id: 4, title: 'Месяц 4: Верстка интерфейса XML (View System)', tasks: [
      'Изучить основные View-компоненты: TextView, Button, ImageView, EditText',
      'Освоить сложные менеджеры компоновки, особенно ConstraintLayout для гибкой верстки',
      'Научиться выводить списки данных с помощью эффективного RecyclerView'
    ]},
    { id: 5, title: 'Месяц 5: Современный UI на Jetpack Compose', tasks: [
      'Понять философию декларативного UI и принципы Jetpack Compose',
      'Освоить базовые функции Compose: Box, Row, Column, Text, Button, Image',
      'Изучить управление состоянием (State) в Compose с помощью remember и MutableState'
    ]},
    { id: 6, title: 'Месяц 6: Навигация и Жизненный цикл', tasks: [
      'Настроить переходы между экранами с помощью библиотеки Jetpack Navigation/Compose Navigation',
      'Изучить передачу аргументов между экранами при навигации',
      'Разобраться в жизненном цикле Compose-компонентов и эффектах запуска (LaunchedEffect)'
    ]},
    { id: 7, title: 'Месяц 7: Сетевое взаимодействие', tasks: [
      'Понять протокол HTTP, REST API и работу с сетью на мобильных устройствах',
      'Изучить библиотеку Retrofit для отправки сетевых запросов и сериализатор Gson/Moshi',
      'Реализовать загрузку картинок из интернета с помощью библиотеки Coil или Glide'
    ]},
    { id: 8, title: 'Месяц 8: Локальное хранение данных', tasks: [
      'Изучить базу данных SQLite и современную надстройку Room DB',
      'Написать сущности (Entity), DAO интерфейсы для запросов к БД и настроить миграции Room',
      'Освоить Jetpack DataStore для безопасного хранения настроек и токенов пользователя'
    ]},
    { id: 9, title: 'Месяц 9: Асинхронность и Реактивные потоки', tasks: [
      'Изучить концепцию Kotlin Coroutines для выполнения тяжелых задач в фоновых потоках',
      'Понять работу с реактивными потоками Kotlin Flow (StateFlow, SharedFlow)',
      'Связать получение данных из сети/БД с Compose UI через реактивные стейты'
    ]},
    { id: 10, title: 'Месяц 10: Архитектура мобильных приложений', tasks: [
      'Изучить архитектурный паттерн MVVM (Model-View-ViewModel)',
      'Освоить Jetpack ViewModel для сохранения состояния UI при поворотах экрана',
      'Понять основы внедрения зависимостей (Dependency Injection) с помощью Hilt или Koin'
    ]},
    { id: 11, title: 'Месяц 11: Тестирование и Публикация', tasks: [
      'Написать Unit-тесты для ViewModel и логики приложения с помощью JUnit и Mockk',
      'Изучить процесс сборки приложения (APK, Android App Bundle) и подпись релиза',
      'Ознакомиться с Google Play Console и процессом публикации мобильного приложения'
    ]},
    { id: 12, title: 'Месяц 12: Портфолио и Трудоустройство', tasks: [
      'Опубликовать 2-3 готовых мобильных приложения на GitHub с подробным описанием в README.md',
      'Составить резюме Android Developer, сделав упор на Kotlin, Jetpack Compose, MVVM и Room',
      'Подготовиться к вопросам по архитектуре Android, JVM и начать отклики'
    ]}
  ],
  qa: [
    { id: 1, title: 'Месяц 1: Введение в тестирование и ЖЦ ПО', tasks: [
      'Изучить что такое тестирование ПО, его цели, принципы и разницу между QA, QC и Testing',
      'Понять жизненный цикл разработки программного обеспечения (SDLC) и жизненный цикл тестирования (STLC)',
      'Изучить методологии разработки Agile, Scrum, Kanban и роль тестировщика в них'
    ]},
    { id: 2, title: 'Месяц 2: Тест-дизайн и виды тестирования', tasks: [
      'Изучить классификацию видов тестирования (функциональное, нефункциональное, регрессионное и т.д.)',
      'Освоить основные техники тест-дизайна: разделение на классы эквивалентности и анализ граничных значений',
      'Изучить техники предугадывания ошибок, таблицы решений и переходы состояний'
    ]},
    { id: 3, title: 'Месяц 3: Тестовая документация и баг-трекинг', tasks: [
      'Научиться составлять тест-кейсы (шаги, ожидаемый результат) и группировать их в чек-листы',
      'Изучить структуру хорошего баг-репорта (Summary, Steps to reproduce, Actual/Expected result, Severity/Priority)',
      'Освоить работу в таск-трекерах (Jira, Redmine) и системах управления тестами (TestRail, Zephyr)'
    ]},
    { id: 4, title: 'Месяц 4: Тестирование Web-приложений и DevTools', tasks: [
      'Разобраться в особенностях веб-тестирования: кроссбраузерность, адаптивность верстки',
      'Изучить Chrome DevTools: вкладку Elements (инспекция кода), Console (просмотр JS-ошибок)',
      'Освоить вкладку Network для отслеживания отправляемых запросов, ответов сервера и времени загрузки'
    ]},
    { id: 5, title: 'Месяц 5: Основы сетей и тестирования API', tasks: [
      'Изучить основы веб-технологий: структура URL, методы HTTP-запросов (GET, POST, PUT, DELETE)',
      'Разобраться в структуре заголовков запросов и основных статус-кодах (2xx, 3xx, 4xx, 5xx)',
      'Изучить основы формата обмена данными JSON'
    ]},
    { id: 6, title: 'Месяц 6: Тестирование API в Postman', tasks: [
      'Установить Postman, научиться отправлять запросы и анализировать ответы сервера',
      'Освоить работу с переменными окружения (Environments) и создание коллекций тестов в Postman',
      'Написать простейшие скрипты валидации ответов на вкладке Tests (код ответа, тело ответа)'
    ]},
    { id: 7, title: 'Месяц 7: Базы данных и SQL для тестировщиков', tasks: [
      'Понять роль баз данных в приложениях и установить клиент СУБД (DBeaver, pgAdmin)',
      'Освоить синтаксис SQL: выборка данных (SELECT), фильтрация (WHERE), сортировка (ORDER BY)',
      'Научиться связывать данные из нескольких таблиц с помощью JOIN и использовать группировки (GROUP BY)'
    ]},
    { id: 8, title: 'Месяц 8: Основы программирования для автотестов', tasks: [
      'Выбрать язык для автоматизации (JavaScript или Python) и установить среду разработки (VS Code/PyCharm)',
      'Изучить базовые конструкции: переменные, типы данных, ветвления, циклы',
      'Научиться писать простейшие функции и разобраться со структурой классов'
    ]},
    { id: 9, title: 'Месяц 9: Введение в тест-автоматизацию (AQA)', tasks: [
      'Понять цели автоматизации и критерии выбора тест-кейсов для автотестов',
      'Изучить основы работы с HTML DOM: поиск элементов с помощью CSS селекторов и XPath',
      'Ознакомиться с современными AQA фреймворками (Cypress/Playwright для JS, Selenium для Python)'
    ]},
    { id: 10, title: 'Месяц 10: Написание первых UI автотестов', tasks: [
      'Настроить проект автотестирования, установить зависимости через npm/pip',
      'Написать скрипты для открытия страницы, клика по кнопкам, ввода текста и проверки условий (assertions)',
      'Реализовать запуск тестов в безголовом (headless) режиме и просмотр отчетов о прохождении'
    ]},
    { id: 11, title: 'Месяц 11: CI/CD и генерация тест-отчетов', tasks: [
      'Понять концепцию непрерывной интеграции (CI/CD) на примере GitHub Actions',
      'Настроить запуск автотестов на сервере при создании пулл-реквеста в GitHub',
      'Интегрировать построение наглядных отчетов о прохождении тестов с помощью Allure Report'
    ]},
    { id: 12, title: 'Месяц 12: Резюме и Старт карьеры', tasks: [
      'Составить резюме QA Engineer, отразив навыки ручного тестирования, работы с API, SQL и автотестов',
      'Подготовить примеры тест-документации и автотестов в открытом репозитории на GitHub',
      'Подготовиться к техническим вопросам по базам данных и тест-дизайну, начать отклики'
    ]}
  ],
  default: [
    { id: 1, title: 'Месяц 1: Старт и Основы', tasks: [
      'Изучить основы выбранного направления (HTML/CSS/JS для Frontend, Node.js для Backend)',
      'Настроить рабочее окружение (Git, VS Code, терминал)',
      'Создать первый репозиторий на GitHub и сделать коммит'
    ]},
    { id: 2, title: 'Месяц 2: Базовое программирование', tasks: [
      'Освоить синтаксис языка программирования (переменные, циклы, ветвления)',
      'Понять работу функций и области видимости',
      'Написать 10 простых алгоритмических задач'
    ]},
    { id: 3, title: 'Месяц 3: Работа с окружением и данными', tasks: [
      'Понять работу с DOM (для Frontend) или основами SQL баз данных (для Backend)',
      'Изучить сетевые протоколы (HTTP, REST API)',
      'Реализовать простое приложение (калькулятор или Todo List)'
    ]},
    { id: 4, title: 'Месяц 4: Продвинутые концепции', tasks: [
      'Изучить асинхронное программирование (Promises, async/await)',
      'Понять работу с пакетными менеджерами (npm, yarn)',
      'Добавить валидацию данных и обработку ошибок в проекты'
    ]},
    { id: 5, title: 'Месяц 5: Знакомство с Фреймворками', tasks: [
      'Начать изучение фреймворка (React для Frontend, Express/Nest для Backend)',
      'Изучить основы роутинга внутри фреймворка',
      'Создать первое многостраничное демо-приложение'
    ]},
    { id: 6, title: 'Месяц 6: Базы данных и Авторизация', tasks: [
      'Изучить интеграцию базы данных (Supabase, PostgreSQL, MongoDB)',
      'Реализовать регистрацию и вход пользователей (JWT, Sessions)',
      'Настроить защиту приватных роутов'
    ]},
    { id: 7, title: 'Месяц 7: Тестирование', tasks: [
      'Разобраться с методами тестирования (Unit, Integration)',
      'Написать первые тесты (Jest, Vitest или Supertest)',
      'Покрыть тестами критически важные функции своего API/клиента'
    ]},
    { id: 8, title: 'Месяц 8: Контейнеризация', tasks: [
      'Изучить основы Docker (образы, контейнеры)',
      'Написать Dockerfile для своего приложения',
      'Запустить связку клиент-сервер-БД через Docker Compose'
    ]},
    { id: 9, title: 'Месяц 9: Инструменты CI/CD и Линтеры', tasks: [
      'Изучить GitHub Actions для автоматизации сборки и тестов',
      'Настроить ESLint и Prettier для автоматического форматирования кода',
      'Настроить проверку кода при создании Pull Request'
    ]},
    { id: 10, title: 'Месяц 10: Архитектура и Рефакторинг', tasks: [
      'Понять паттерны проектирования и архитектурные слои (MVC, Clean Architecture)',
      'Провести полный рефакторинг своего дипломного/крупного проекта',
      'Оптимизировать производительность кода (кэширование, индексы в БД)'
    ]},
    { id: 11, title: 'Месяц 11: Деплой и Портфолио', tasks: [
      'Развернуть проект в продакшн (Vercel/Netlify для фронта, Render/Railway для бэка)',
      'Привязать доменное имя и настроить SSL сертификат',
      'Красиво оформить README.md ко всем ключевым проектам в GitHub'
    ]},
    { id: 12, title: 'Месяц 12: Поиск работы и собеседования', tasks: [
      'Составить грамотное резюме (CV) и написать сопроводительное письмо',
      'Пройти 2-3 тренировочных собеседования (Mock Interviews)',
      'Начать делать отклики на вакансии и выполнять тестовые задания'
    ]}
  ]
};

// Строим плоский список task_id в том же порядке что и чекбоксы
// task_id формат: m{month}_{taskIndex}
function makeTaskId(monthId, taskIndex) {
  return `m${monthId}_${taskIndex}`;
}

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(queryParams.get('tab') || 'progress');

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (tab) setActiveTab(tab);
  }, [location.search]);

  // Загружаем открытые месяцы из localStorage
  const userKey = user?.email || 'anonymous';

  const [openMonths, setOpenMonths] = useState(() => {
    const saved = localStorage.getItem(`dashboard_open_months_${userKey}`);
    return saved ? JSON.parse(saved) : { 1: true };
  });

  // Сохраняем состояние при изменениях
  useEffect(() => {
    localStorage.setItem(`dashboard_open_months_${userKey}`, JSON.stringify(openMonths));
  }, [openMonths, userKey]);

  // Множество выполненных task_id (из БД)
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [progressLoading, setProgressLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // История тестов
  const [testHistory, setTestHistory] = useState([]);
  const [testsLoading, setTestsLoading] = useState(true);

  const activeProfession = user?.current_profession || localStorage.getItem('anonymous_profession') || 'default';
  const roadmapMonths = ROADMAPS_BY_PROFESSION[activeProfession] || ROADMAPS_BY_PROFESSION.default;
  const totalTasks = roadmapMonths.reduce((acc, m) => acc + m.tasks.length, 0);

  // Загружаем прогресс
  useEffect(() => {
    // Сразу сбрасываем стейт при смене профессии — не ждём ответа от сервера
    setCompletedTasks(new Set());

    if (!user?.id) {
      const saved = localStorage.getItem(`dashboard_progress_anonymous_${activeProfession}`);
      if (saved) {
        try {
          setCompletedTasks(new Set(JSON.parse(saved)));
        } catch (e) {
          setCompletedTasks(new Set());
        }
      } else {
        setCompletedTasks(new Set());
      }
      setProgressLoading(false);
      return;
    }

    setProgressLoading(true);
    fetch(`/api/progress/${user.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.progress) {
          // Новый формат: массив [{ month_number, tasks: { "m1_0": true, ... } }]
          const ids = new Set();
          data.progress.forEach(row => {
            Object.entries(row.tasks || {}).forEach(([taskId, done]) => {
              if (done) ids.add(taskId);
            });
          });
          setCompletedTasks(ids);
        }
      })
      .catch(err => console.error('Ошибка загрузки прогресса:', err))
      .finally(() => setProgressLoading(false));
  }, [user?.id, activeProfession]);

  // Загружаем историю тестов
  useEffect(() => {
    // 1. Сначала читаем локальную историю
    let localHistory = [];
    const savedLocal = localStorage.getItem('anonymous_test_history');
    if (savedLocal) {
      try {
        localHistory = JSON.parse(savedLocal);
      } catch (e) {
        localHistory = [];
      }
    }

    // 2. Если пользователь не авторизован, просто показываем локальную историю
    if (!user?.id) {
      setTestHistory(localHistory);
      setTestsLoading(false);
      return;
    }

    // 3. Если авторизован, сначала показываем локальную историю (чтобы сразу отобразить),
    // затем делаем запрос к бэкенду и синхронизируем локальные данные при их наличии.
    setTestHistory(localHistory);

    const syncAndFetch = async () => {
      try {
        // Если есть локальная история, синхронизируем её с сервером
        if (localHistory.length > 0) {
          try {
            const syncRes = await fetch('/api/quiz/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                localHistory: localHistory
              })
            });
            if (syncRes.ok) {
              // Синхронизация успешна — очищаем локальную историю
              localStorage.removeItem('anonymous_test_history');
              localHistory = [];
            }
          } catch (syncErr) {
            console.error('Ошибка синхронизации локальной истории тестов:', syncErr);
          }
        }

        // Загружаем всю историю пользователя с сервера
        const res = await fetch(`/api/quiz/results/${user.id}`);
        const data = await res.json();
        
        if (data.results) {
          const backendHistory = data.results;
          const mergedMap = new Map();
          
          // Добавляем сначала бэкенд (они приоритетнее)
          backendHistory.forEach(item => mergedMap.set(item.id, item));
          // Затем добавляем локальные (если остались)
          localHistory.forEach(item => {
            if (!mergedMap.has(item.id)) {
              mergedMap.set(item.id, item);
            }
          });

          const merged = Array.from(mergedMap.values());
          // Сортируем по дате completed_at по убыванию
          merged.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
          setTestHistory(merged);
        }
      } catch (err) {
        console.error('Ошибка загрузки тестов с сервера:', err);
      } finally {
        setTestsLoading(false);
      }
    };

    syncAndFetch();
  }, [user?.id]);

  const toggleMonth = (id) => {
    setOpenMonths(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckboxChange = async (monthId, taskIndex, currentChecked) => {
    const taskId = makeTaskId(monthId, taskIndex);
    const newChecked = !currentChecked;

    const nextSet = new Set(completedTasks);
    if (newChecked) {
      nextSet.add(taskId);
    } else {
      nextSet.delete(taskId);
    }
    setCompletedTasks(nextSet);

    if (!user?.id) {
      localStorage.setItem(
        `dashboard_progress_anonymous_${activeProfession}`, 
        JSON.stringify(Array.from(nextSet))
      );
      return;
    }

    try {
      await fetch('/api/progress/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          monthNumber: monthId,
          taskId,
          isCompleted: newChecked,
        }),
      });
    } catch (err) {
      // Откат при ошибке
      console.error('Ошибка сохранения прогресса:', err);
      setCompletedTasks(prev => {
        const rollback = new Set(prev);
        if (newChecked) rollback.delete(taskId);
        else rollback.add(taskId);
        return rollback;
      });
    }
  };

  const checkedCount = completedTasks.size;
  const progressPercent = totalTasks > 0 ? Math.round((checkedCount / totalTasks) * 100) : 0;

  const professionLabels = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    android: 'Android Developer',
    qa: 'QA Engineer',
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('ru-RU');
  };

  return (
    <section className="view active">
      <div className="dashboard-grid">

        <aside className="dashboard-sidebar">
          <button className={`dashboard-tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}>
            <User size={20} /> Мой Прогресс
          </button>
          <button className={`dashboard-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}>
            <Compass size={20} /> План на 12 месяцев
          </button>
          <button className={`dashboard-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}>
            <History size={20} /> История тестов
          </button>
          <button className="dashboard-tab-btn logout-btn"
            onClick={() => { onLogout(); navigate('/'); }}>
            <LogOut size={20} /> Выйти
          </button>
        </aside>

        <main className="dashboard-panel">

          {/* ПРОГРЕСС */}
          {activeTab === 'progress' && (
            <div>
              <h2 className="panel-title">Личный кабинет</h2>
              <p className="panel-subtitle">Отслеживай свои успехи и управляй планом развития</p>

              <div className="profile-summary-card">
                <div className="profile-avatar-wrapper"><User size={48} /></div>
                <div className="profile-info">
                  <h3>{user?.name || 'Пользователь'}</h3>
                  <span className="profile-badge">
                    {professionLabels[user?.current_profession || localStorage.getItem('anonymous_profession')] || 'Профессия не выбрана'}
                  </span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card card-lime">
                  <div className="stat-label">
                    <TrendingUp size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                    Общий прогресс
                  </div>
                  <div className="stat-value">
                    {progressLoading ? '...' : `${progressPercent}%`}
                  </div>
                </div>
                <div className="stat-card card-blue">
                  <div className="stat-label">
                    <BookOpen size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                    Пройдено задач
                  </div>
                  <div className="stat-value">
                    {progressLoading ? '...' : `${checkedCount} / ${totalTasks}`}
                  </div>
                </div>
              </div>

              <div className="cta-section">
                <h2>Продолжай двигаться к цели!</h2>
                <p>Твой индивидуальный 12-месячный план развития готов. Перейди во вкладку «План на 12 месяцев», чтобы узнать свой следующий шаг.</p>
                <button className="btn-primary" onClick={() => setActiveTab('roadmap')}>
                  Открыть план развития
                </button>
              </div>
            </div>
          )}

          {/* РОАДМАП */}
          {activeTab === 'roadmap' && (
            <div>
              <h2 className="panel-title">План действий на 12 месяцев</h2>
              <p className="panel-subtitle">Пошаговый план становления в IT с возможностью отмечать прогресс</p>

              <div className="quiz-header" style={{ marginBottom: '32px' }}>
                <span className="badge-pink">Прогресс плана</span>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="badge-pink" style={{ background: 'var(--lime-light)', color: 'var(--lime-hover)' }}>
                  {progressPercent}%
                </span>
              </div>

              {progressLoading ? (
                <p style={{ textAlign: 'center', padding: '32px' }}>Загрузка прогресса...</p>
              ) : (
                <div className="roadmap-container">
                  {roadmapMonths.map((month) => {
                    const isOpen = !!openMonths[month.id];
                    return (
                      <div key={month.id} className={`roadmap-month-card ${isOpen ? 'open' : ''}`}>
                        <div className="roadmap-month-header" onClick={() => toggleMonth(month.id)}>
                          <div className="roadmap-month-title-wrapper">
                            <span className="roadmap-month-badge">Month {month.id}</span>
                            <span>{month.title}</span>
                          </div>
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {isOpen && (
                          <div className="roadmap-month-content">
                            {month.tasks.map((task, idx) => {
                              const taskId = makeTaskId(month.id, idx);
                              const isChecked = completedTasks.has(taskId);
                              return (
                                <label key={idx} className={`roadmap-checklist-item ${isChecked ? 'checked' : ''}`}>
                                  <input type="checkbox" checked={isChecked}
                                    onChange={() => handleCheckboxChange(month.id, idx, isChecked)} />
                                  <span>{task}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ИСТОРИЯ ТЕСТОВ */}
          {activeTab === 'tests' && (
            <div>
              <h2 className="panel-title">История тестирования</h2>
              <p className="panel-subtitle">Здесь хранятся все результаты твоих карьерных тестов</p>

              {testsLoading ? (
                <p style={{ textAlign: 'center', padding: '32px' }}>Загрузка...</p>
              ) : testHistory.length === 0 ? (
                <div className="cta-section">
                  <h2>Тестов пока нет</h2>
                  <p>Пройди тест на профориентацию, чтобы узнать какая IT-профессия тебе подходит.</p>
                  <button className="btn-primary" onClick={() => navigate('/quiz')}>
                    Перейти к тесту
                  </button>
                </div>
              ) : (
                <div className="history-list">
                  {testHistory.map((test) => (
                    <div key={test.id} className="history-item">
                      <div>
                        <div className="item-title">{test.test_name}</div>
                        <div className="item-desc">Дата прохождения: {formatDate(test.completed_at)}</div>
                      </div>
                      <span className="badge-pink" style={{ background: 'var(--blue-light)', color: 'var(--purple)' }}>
                        {professionLabels[test.match_profession] || test.match_profession} ({test.match_percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </section>
  );
}

export default Dashboard;

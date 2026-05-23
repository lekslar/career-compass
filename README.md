# Web-приложение «Карьерный компас» для студентов (Career Compass)
Приложение, которое помогает выбрать ИТ-профессию и построить план действий на 12 месяцев. 
<br>

## Структура проекта
```
career-compass/
├── package.json                        # корневой (запуск всего проекта)
│
├── backend/
│   ├── server.js                       # точка входа, Express + подключение роутов
│   ├── package.json
│   ├── config/
│   │   └── supabase.js                 # клиент Supabase (читает .env)
│   ├── routes/
│   │   ├── auth.js                     # POST /api/auth/register, /login, PATCH /profession
│   │   ├── quiz.js                     # GET /api/quiz/questions, POST /submit, GET /results/:userId
│   │   ├── progress.js                 # GET /api/progress/:userId, POST /toggle
│   │   ├── professions.js              # GET /api/professions
│   │   └── assistant.js               # POST /api/assistant/chat
│   └── services/
│       └── scoring.js                  # подсчёт результатов квиза → [{ profession, percentage }]
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx                     # роутинг всего приложения (React Router)
        ├── main.jsx                    # точка входа React
        ├── styles/
        │   └── index.css              # глобальные CSS-переменные и базовые стили
        ├── data/
        │   ├── professionsData.js      # локальные данные о профессиях (иконки, цвета)
        │   └── roadmapData.js          # данные для интерактивного roadmap по профессиям
        ├── components/
        │   ├── Header/                 # шапка сайта с навигацией
        │   └── Footer/                 # подвал
        └── pages/
            ├── main/                   # главная страница /
            │   └── components/
            │       ├── HeroSection/
            │       ├── HowItWorksSection/
            │       └── ServicesSection/
            ├── professions/            # список профессий /professions
            │   └── components/
            │       ├── ProfessionCard/
            │       └── ProfessionsHeader/
            ├── profession-detail/      # детальная страница профессии /profession/:slug
            │   └── components/
            │       ├── ProfessionAbout/
            │       ├── ProfessionCareerPath/
            │       ├── ProfessionFirstSteps/
            │       ├── ProfessionHero/
            │       ├── ProfessionRequirements/
            │       ├── ProfessionResources/
            │       └── ProfessionSkills/
            ├── roadmap/                # интерактивный roadmap /roadmap/:slug
            ├── dashboard/              # личный кабинет /dashboard
            ├── login/                  # вход /login
            ├── register/               # регистрация /register
            └── chat/                   # ИИ-помощник /chat
```

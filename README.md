# Web-приложение «Карьерный компас» для студентов (Career Compass)
Приложение, которое помогает выбрать ИТ-профессию и построить план действий на 12 месяцев. 
<br>
<br>

## Структура проекта
```
career-compass/
├── package.json                  # Корневой (concurrently — запуск фронта + бэка)
├── README.md
│
├── backend/
│   ├── server.js                 # Точка входа Express
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── supabase.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── progress.js
│   │   ├── quiz.js
│   │   ├── professions.js
│   │   └── assistant.js
│   └── services/
│       └── scoring.js
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx                     # Основной роутинг
        ├── styles/
        │   └── index.css
        ├── data/
        │   ├── professionsData.js
        │   └── roadmapData.js
        ├── components/
        │   ├── Header/
        │   └── Footer/
        └── pages/
            ├── main/
            ├── professions/
            ├── profession-detail/
            ├── roadmap/
            ├── dashboard/
            ├── quiz/
            ├── login/
            ├── register/
            └── chat/
```
<br>

## Работа с проектом

# 1. Клонируем репозиторий
git clone <ссылка-на-репозиторий>
cd career-compass

# 2. Устанавливаем зависимости
npm install

# 3. Переходим в backend и устанавливаем его зависимости
cd backend
npm install
cd ..

# 4. Настраиваем .env (backend)
cd backend
cp .env.example .env   # если есть пример
# Открой .env и заполни:
# SUPABASE_URL=...
# SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_KEY=...

## Ключевые моменты проекта

База данных: Supabase (PostgreSQL)
Frontend: React + Vite + React Router v6
Backend: Express.js
Стили: Чистый CSS (без Tailwind)
Авторизация: Supabase Auth

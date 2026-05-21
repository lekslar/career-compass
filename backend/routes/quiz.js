// routes/quiz.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { calculateResults } = require('../services/scoring');

// 1. GET /api/quiz/questions — Отдать все вопросы из Supabase на фронтенд
router.get('/questions', async (req, res) => {
    try {
        // Запрашиваем из базы все вопросы
        const { data, error } = await supabase
            .from('quiz_questions')
            .select('*')
            .order('id', { ascending: true }); // сортируем по порядку, от 1-го вопроса к последнему

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // Возвращаем массив вопросов фронтенду
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Не удалось загрузить вопросы теста" });
    }
});

// 2. POST /api/quiz/submit — Принять ответы от фронтенда и вернуть результат скоринга
router.post('/submit', async (req, res) => {
    try {
        const { userId, answers } = req.body; 
        // Фронтенд пришлет answers в формате: [{ questionId: 1, optionId: "b" }, ...]

        // Проверяем, что фронтенд прислал массив ответов
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Неверный формат ответов. Ожидался массив." });
        }

        // Вызываем функцию подсчета баллов из папки services
        const topProfessions = calculateResults(answers);

        // Отправляем результат обратно фронтенду
        res.json({
            status: "success",
            userId: userId || "anonymous",
            recommended: topProfessions // Вернет массив отсортированных профессий, например: ["backend", "qa", "frontend"]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Внутренняя ошибка сервера при обработке результатов" });
    }
});

module.exports = router;
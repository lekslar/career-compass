// routes/quiz.js
const express = require('express');
const router = express.Router();
const { calculateResults } = require('../services/scoring');
const supabase = require('../config/supabase');

// 1. GET /api/quiz/questions — Получаем вопросы для теста
router.get('/questions', async (req, res) => {
    try {
        const { data, error } = await supabase.from('quiz_questions').select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// 2. POST /api/quiz/submit — Исправляем и добавляем асинхронность (async)
router.post('/submit', async (req, res) => {
    try {
        const { userId, answers } = req.body; 
        
        // Валидация входных данных
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Неверный формат ответов" });
        }

        // 1. Считаем результаты локально (эта функция быстрая, она не идет в сеть, await не нужен)
        const topProfessions = calculateResults(answers);
        
        // Получаем самую подходящую профессию (первая в массиве)
        const mainMatch = topProfessions[0]; 

        // ЗАПИСЫВАЕМ ПРОГРЕСС В SUPABASE
    
        // const { error: dbError } = await supabase
        //     .from('user_progress')
        //     .insert({
        //         user_id: userId,
        //         chosen_profession: mainMatch,
        //         step_id: 1,                 
        //         status: 'in_progress'
        //     });

        // Если база вернула ошибку при записи
        // if (dbError) {
        //     console.error("Ошибка записи в Supabase:", dbError.message);
        // }

        // 3. Отдаем результат на фронтенд
        res.json({
            status: "success",
            userId: userId,
            recommended: topProfessions // Передаем массив ['frontend', 'backend', 'qa']
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Внутренняя ошибка сервера при обработке теста" });
    }
});

module.exports = router;
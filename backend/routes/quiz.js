// backend/routes/quiz.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { calculateResults } = require('../services/scoring');

// GET /api/quiz/questions — все вопросы из Supabase
router.get('/questions', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('quiz_questions')
            .select('*')
            .order('id', { ascending: true });

        if (error) return res.status(500).json({ error: error.message });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Не удалось загрузить вопросы теста' });
    }
});

// POST /api/quiz/submit — принять ответы, посчитать результат, сохранить в quiz_results
router.post('/submit', async (req, res) => {
    try {
        const { userId, answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Неверный формат ответов. Ожидался массив.' });
        }

        // Считаем результат
        const topProfessions = calculateResults(answers);
        const topProfession = topProfessions[0]; // лучшая профессия

        // Считаем процент: сколько ответов совпало с топ-профессией (включая нейтральный 'e')
        const professionAnswerMap = { frontend: 'a', backend: 'b', qa: 'c', android: 'd' };
        const targetOption = professionAnswerMap[topProfession];
        const matchCount = answers.filter(a => a.optionId === targetOption || a.optionId === 'e').length;
        const matchPercentage = Math.round((matchCount / answers.length) * 100);

        // Сохраняем результат в БД (только если пользователь авторизован)
        if (userId) {
            const { error: saveError } = await supabase
                .from('quiz_results')
                .insert({
                    user_id: userId,
                    test_name: 'Общий тест на IT-профессию',
                    match_profession: topProfession,
                    match_percentage: matchPercentage,
                });

            if (saveError) {
                console.error('Ошибка сохранения результата:', saveError.message);
            }

            // Обновляем current_profession у пользователя
            await supabase
                .from('users')
                .update({ current_profession: topProfession })
                .eq('id', userId);
        }

        res.json({
            status: 'success',
            userId: userId || 'anonymous',
            recommended: topProfessions,
            matchPercentage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Внутренняя ошибка сервера при обработке результатов' });
    }
});

// GET /api/quiz/results/:userId — история тестов пользователя
router.get('/results/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const { data, error } = await supabase
            .from('quiz_results')
            .select('id, test_name, match_profession, match_percentage, completed_at')
            .eq('user_id', userId)
            .order('completed_at', { ascending: false });

        if (error) return res.status(500).json({ error: error.message });

        res.json({ status: 'success', results: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка получения истории тестов' });
    }
});

// POST /api/quiz/sync — синхронизация анонимных результатов тестов при авторизации
router.post('/sync', async (req, res) => {
    try {
        const { userId, localHistory } = req.body;

        if (!userId || !Array.isArray(localHistory) || localHistory.length === 0) {
            return res.json({ status: 'success', message: 'Нечего синхронизировать' });
        }

        const records = localHistory.map(item => ({
            user_id: userId,
            test_name: item.test_name || 'Общий тест на IT-профессию',
            match_profession: item.match_profession,
            match_percentage: item.match_percentage,
            completed_at: item.completed_at || new Date().toISOString()
        }));

        const { error } = await supabase
            .from('quiz_results')
            .insert(records);

        if (error) {
            console.error('Ошибка синхронизации результатов:', error.message);
            return res.status(500).json({ error: error.message });
        }

        res.json({ status: 'success', count: records.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при синхронизации' });
    }
});

module.exports = router;
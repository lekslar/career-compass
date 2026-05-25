// backend/routes/progress.js
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /api/progress/:userId
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const { data, error } = await supabase
            .from('user_tasks_progress')
            .select('month_number, tasks')
            .eq('user_id', userId);

        if (error) return res.status(500).json({ error: error.message });

        res.json({ status: 'success', progress: data || [] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при получении прогресса' });
    }
});

// POST /api/progress/toggle
// Поддерживает два режима:
//   1. Чекбоксы dashboard: { userId, monthNumber, taskId, isCompleted: true/false }
//   2. Статусы roadmap:    { userId, monthNumber, taskId, status: 'completed'|'learning'|'not_started' }
router.post('/toggle', async (req, res) => {
    try {
        const { userId, monthNumber, taskId, isCompleted, status } = req.body;

        if (!userId || monthNumber === undefined || monthNumber === null || !taskId) {
            return res.status(400).json({ error: 'Переданы не все обязательные поля' });
        }

        // Определяем значение для сохранения:
        // - если передан status ('completed'|'learning'|'not_started') — сохраняем строку
        // - если передан isCompleted (boolean) — сохраняем boolean (для чекбоксов dashboard)
        let valueToStore;
        if (status !== undefined) {
            valueToStore = status; // 'completed', 'learning', 'not_started'
        } else {
            valueToStore = isCompleted; // true / false
        }

        // Читаем текущий tasks
        const { data: existing, error: fetchError } = await supabase
            .from('user_tasks_progress')
            .select('tasks')
            .eq('user_id', userId)
            .eq('month_number', monthNumber)
            .maybeSingle();

        if (fetchError) return res.status(500).json({ error: fetchError.message });

        const currentTasks = existing?.tasks || {};

        // Если статус 'not_started' — удаляем ключ из объекта (не хранить мусор)
        if (valueToStore === 'not_started' || valueToStore === false) {
            delete currentTasks[taskId];
        } else {
            currentTasks[taskId] = valueToStore;
        }

        const { error: upsertError } = await supabase
            .from('user_tasks_progress')
            .upsert(
                {
                    user_id: userId,
                    month_number: monthNumber,
                    tasks: currentTasks,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'user_id,month_number' }
            );

        if (upsertError) return res.status(500).json({ error: upsertError.message });

        res.json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при обновлении прогресса' });
    }
});

module.exports = router;

// DELETE /api/progress/reset/:userId
// Сбрасывает прогресс dashboard (месяца 1-12) при смене профессии.
// Roadmap-прогресс (month_number = 0) не трогает.
router.delete('/reset/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const { error } = await supabase
            .from('user_tasks_progress')
            .delete()
            .eq('user_id', userId)
            .gte('month_number', 1)  // только месяцы 1-12
            .lte('month_number', 12);

        if (error) return res.status(500).json({ error: error.message });

        res.json({ status: 'success', message: 'Прогресс dashboard сброшен' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при сбросе прогресса' });
    }
});

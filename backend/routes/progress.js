const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// 1. GET /api/progress/:userId — Получить весь прогресс пользователя
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const { data, error } = await supabase
            .from('user_tasks_progress')
            .select('month_number, tasks')
            .eq('user_id', userId);

        if (error) return res.status(500).json({ error: error.message });

        res.json({
            status: "success",
            progress: data // вернет массив месяцев, внутри каждого объект { task_id: true/false }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера при получении прогресса" });
    }
});

// 2. POST /api/progress/toggle — Переключение конкретной задачи внутри месяца
router.post('/toggle', async (req, res) => {
    try {
        const { userId, monthNumber, taskId, isCompleted } = req.body;

        if (!userId || !monthNumber || !taskId) {
            return res.status(400).json({ error: "Переданы не все обязательные поля" });
        }

        // Подготавливаем JSON-кусочек для обновления (например: {"internet-how": true})
        const taskUpdate = JSON.stringify({ [taskId]: isCompleted });

        // Делаем надстройку через rpc (удаленный вызов) или чистый upsert слияния JSON.
        // Используем встроенный синтаксис Supabase для обновления jsonb данных:
        const { data: existingRow } = await supabase
            .from('user_tasks_progress')
            .select('tasks')
            .eq('user_id', userId)
            .eq('month_number', monthNumber)
            .single();

        let currentTasks = existingRow ? existingRow.tasks : {};
        
        // Меняем или добавляем статус конкретной задачи
        currentTasks[taskId] = isCompleted;

        // Сохраняем обратно через upsert, опираясь на уникальный ключ unique_user_month
        const { error } = await supabase
            .from('user_tasks_progress')
            .upsert({
                user_id: userId,
                month_number: monthNumber,
                tasks: currentTasks,
                updated_at: new Date()
            }, { onConflict: 'user_id, month_number' });

        if (error) return res.status(500).json({ error: error.message });

        res.json({ status: "success", message: "Статус задачи в JSONB обновлен" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера при обновлении прогресса" });
    }
});

module.exports = router;
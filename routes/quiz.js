// routes/quiz.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { calculateResults } = require('../services/scoring');

// Путь к файлу с вопросами
const questionsPath = path.join(__dirname, '../data/questions.json');

// 1. GET /api/quiz/questions — Отдать вопросы на фронтенд
router.get('/questions', (req, res) => {
    const rawData = fs.readFileSync(questionsPath);
    const questions = JSON.parse(rawData);
    res.json(questions);
});

// 2. POST /api/quiz/submit — Принять ответы и вернуть рекомендации
router.post('/submit', (req, res) => {
    const { userId, answers } = req.body; // answers: [{questionId: 1, optionId: "a"}, ...]
    
    if (!answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: "Неверный формат ответов" });
    }

    const topProfessions = calculateResults(answers);
    
    res.json({
        status: "success",
        userId: userId,
        recommended: topProfessions // Вернет массив, например: ["frontend", "backend", "qa"]
    });
});

module.exports = router;
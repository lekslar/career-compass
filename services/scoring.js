// services/scoring.js

function calculateResults(userAnswers) {
    // Начальные баллы для каждой профессии
    const scores = {
        frontend: 0,
        backend: 0,
        qa: 0
    };

    // userAnswers прилетит в формате: [{ questionId: 1, optionId: "a" }, { questionId: 2, optionId: "b" }]
    userAnswers.forEach(answer => {
        if (answer.optionId === 'a') scores.frontend += 5;
        if (answer.optionId === 'b') scores.backend += 5;
        if (answer.optionId === 'c') scores.qa += 5;
    });

    // Сортируем профессии по количеству набранных баллов (от большего к меньшему)
    const sortedProfessions = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    // Возвращаем ТОП-3 профессии в виде массива ключей (например: ['frontend', 'backend', 'qa'])
    return sortedProfessions;
}

module.exports = { calculateResults };
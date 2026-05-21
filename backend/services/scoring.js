// services/scoring.js

function calculateResults(userAnswers) {
    // 1. Создаем объект, где будем копить баллы для каждой профессии
    const scores = {
        frontend: 0,
        backend: 0,
        qa: 0
    };

    // 2. Проверяем, что нам вообще прислали данные, чтобы код не упал
    if (!userAnswers || !Array.isArray(userAnswers)) {
        return ['frontend', 'backend', 'qa']; // Отдаем дефолт, если что-то пошло не так
    }

    // 3. Проходим циклом по каждому ответу
    userAnswers.forEach(answer => {
        if (answer.optionId === 'a') scores.frontend += 5;
        if (answer.optionId === 'b') scores.backend += 5;
        if (answer.optionId === 'c') scores.qa += 5;
    });

    // 4. Сортируем ключи (профессии) по убыванию баллов.
    const sortedProfessions = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    return sortedProfessions;
}

module.exports = { calculateResults };
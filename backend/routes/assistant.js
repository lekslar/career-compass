const express = require('express');
const router = express.Router();
require('dotenv').config();

// Функция для удаления приветствий в начале сгенерированного сообщения
function cleanGreeting(text, userName) {
    if (!text) return text;
    
    let cleaned = text.trim();
    
    // Регулярное выражение для общих приветствий в начале сообщения (без ASCII \b, так как он не работает с кириллицей)
    const generalGreetingRegex = /^(привет|здравствуй|здравствуйте|добрый день|добрый вечер|доброе утро|приветствую|салют)(?![а-яёa-z0-9_-])\s*,?\s*([а-яёa-z0-9_-]+)?\s*[!,.]*\s*/i;
    
    if (generalGreetingRegex.test(cleaned)) {
        cleaned = cleaned.replace(generalGreetingRegex, '');
    }
    
    // Если есть имя пользователя, убираем также специфичные приветствия с именем в начале
    if (userName) {
        const escapedName = userName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        
        // Например: "Алексей, привет!" или "Алексей!" (используем lookahead вместо \b)
        const namePrefixRegex = new RegExp(`^${escapedName}(?![а-яёa-z0-9_-])\\s*,?\\s*(привет|здравствуй|здравствуйте|добрый день|добрый вечер|доброе утро|приветствую)?(?![а-яёa-z0-9_-])\\s*[!,.]*\\s*`, 'i');
        if (namePrefixRegex.test(cleaned)) {
            cleaned = cleaned.replace(namePrefixRegex, '');
        }
    }
    
    // Убираем оставшиеся в начале знаки препинания и пробелы
    cleaned = cleaned.trim().replace(/^[!,.]+\s*/, '');
    
    // Делаем первую букву заглавной
    if (cleaned.length > 0) {
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
    
    return cleaned;
}

router.post('/', async (req, res) => {
    const { message, history, userProfile } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Сообщение не передано' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        // Если ключ не задан, возвращаем подсказку
        return res.json({
            text: 'Привет! Кажется, в файле `.env` на сервере не задан API-ключ `GEMINI_API_KEY`. \n\nПожалуйста, добавь свою переменную `GEMINI_API_KEY=твой_ключ` in файл `backend/.env`, чтобы я мог общаться с настоящей нейросетью! 🔑'
        });
    }

    try {
        // Форматируем историю сообщений под Gemini API
        const contents = [];
        
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                // Включаем все сообщения, включая приветственное, чтобы модель видела контекст
                contents.push({
                    role: msg.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }]
                });
            });
        }

        // Добавляем текущий вопрос пользователя в конец
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });

        // Создаем динамический контекст о пользователе и его ЛК
        let userContextText = '';
        if (userProfile) {
            const { name, email, dashboardProgress, roadmapsProgress } = userProfile;
            userContextText = `\n\nИнформация о текущем авторизованном пользователе (его личном кабинете):
- Имя: ${name}
- Email: ${email}
- Прогресс общего 12-месячного плана развития: ${dashboardProgress ? `${dashboardProgress.percent}% (${dashboardProgress.completedCount} из ${dashboardProgress.totalCount} задач выполнено)` : 'нет данных'}`;

            if (roadmapsProgress && Object.keys(roadmapsProgress).length > 0) {
                userContextText += `\n- Прогресс по специализированным дорожным картам (Roadmaps):`;
                Object.keys(roadmapsProgress).forEach(slug => {
                    const rm = roadmapsProgress[slug];
                    userContextText += `\n  * ${rm.title}: прогресс ${rm.percent}%.
    - Изученные темы (Completed): ${rm.completedTopics && rm.completedTopics.length > 0 ? rm.completedTopics.join(', ') : 'еще нет изученных тем'}
    - Темы в процессе изучения (Learning): ${rm.learningTopics && rm.learningTopics.length > 0 ? rm.learningTopics.join(', ') : 'нет тем в процессе изучения'}`;
                });
            } else {
                userContextText += `\n- Пользователь еще не начал отмечать прогресс в специализированных дорожных картах (вкладка "Профессии" -> конкретная профессия -> интерактивный Roadmap).`;
            }

            userContextText += `\n\nПравила обращения к этому пользователю:
- Обязательно обращайся к пользователю по его имени: ${name}.
- Ты видишь его личный кабинет и прогресс (данные выше). Активно ссылайся на этот прогресс в общении. Хвали его за изученные темы, подбадривай и давай конкретные советы по темам, которые он сейчас изучает (статус "В процессе").
- Если пользователь спрашивает "какой у меня прогресс?", "что мне учить дальше?" или "посмотри мой личный кабинет", отвечай развернуто, используя предоставленные выше данные.`;
        } else {
            userContextText = `\n\nТекущий пользователь не авторизован (гость).
Правила общения:
- Обращайся к нему нейтрально/обобщенно.
- Если он спрашивает про свой прогресс, личный кабинет или как сохранить результаты, вежливо предложи ему войти в аккаунт или зарегистрироваться (кнопки в шапке сайта), чтобы отслеживать свой прогресс обучения на 12 месяцев и получать персонализированные рекомендации от тебя.`;
        }

        const systemInstruction = {
            parts: [{
                text: `Ты — опытный ИИ Карьерный Ментор на сайте "Карьерный Компас" (Career Compass).
Твоя цель — помогать пользователям определиться с выбором профессии в сфере IT, строить карьерные треки, давать советы по обучению, рассказывать про востребованность навыков и зарплаты.

Информация о нашем сайте "Карьерный Компас":
1. На главной странице сайта есть интерактивный профориентационный тест. Если пользователь не знает, какую профессию выбрать, обязательно порекомендуй ему пройти этот тест.
2. У нас есть подробные интерактивные дорожные карты (Roadmaps) по ключевым направлениям: Frontend (верстка, JS, React), Backend (Python, Node.js, Go), QA (тестирование ручное и автоматизированное), Mobile (Kotlin, Swift, Flutter), UI/UX Дизайн.
3. В дорожных картах пользователи могут отмечать изученные темы и отслеживать свой прогресс обучения на 12 месяцев.
4. Наша платформа оформлена в стиле нео-брутализма (яркие цвета, толстые черные рамки, плоские тени).

Правила твоего общения:
- Будь дружелюбным, поддерживающим и профессиональным.
- Форматируй свои ответы в Markdown (используй заголовки ###, списки, выделение жирным), чтобы ответы выглядели красиво на странице чата.
- Если тебя спрашивают о начале обучения, рекомендуй заглянуть в наши дорожные карты.
- Отвечай кратко, структурированно, без лишней "воды", но развернуто по существу.
- КРИТИЧЕСКИ ВАЖНО: НИКОГДА не начинай свои сообщения с приветствий типа "Привет", "Здравствуйте", "Добрый день", "Приветствую", а также не начинай сообщение с имени пользователя (например, "Алексей, ..."), если это не является частью предложения. Твое первое сообщение-приветствие уже было показано пользователю в самом начале чата. Все твои ответы должны сразу переходить к сути дела или к ответу на вопрос пользователя, без каких-либо вводных приветствий.
- Общайся исключительно на русском языке.${userContextText}`
            }]
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents,
                systemInstruction
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error('Gemini API Error:', errData);
            return res.status(500).json({ error: 'Ошибка при обращении к Gemini API' });
        }

        const data = await response.json();
        
        // Извлекаем текстовый ответ от модели
        const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Извините, не удалось сгенерировать ответ.';

        // Очищаем ответ от нежелательных приветствий в начале сообщения перед отправкой пользователю
        const cleanedResponseText = cleanGreeting(botResponseText, userProfile?.name);

        res.json({ text: cleanedResponseText });

    } catch (err) {
        console.error('Ошибка в роуте assistant:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, ArrowLeft, ArrowRight, RefreshCw, 
  Code, Server, Smartphone, CheckCircle, 
  Sparkles, Star, Trophy, ArrowUpRight
} from 'lucide-react';
import './quiz.css';

const PROFESSION_META = {
  frontend: {
    title: 'Frontend-разработчик',
    desc: 'Создает интерактивные пользовательские интерфейсы для веб-сайтов и веб-приложений. Превращает макеты дизайнеров в живой, работающий код, оптимизирует скорость загрузки страниц и заботится об удобстве пользователей.',
    icon: Code,
    color: '#3b82f6',
    bgColor: 'var(--blue-light)',
    slug: 'frontend'
  },
  backend: {
    title: 'Backend-разработчик',
    desc: 'Проектирует серверную архитектуру, базы данных и логику обработки информации. Обеспечивает стабильность, безопасность и высокую скорость работы систем «под капотом», с которыми общаются клиентские приложения.',
    icon: Server,
    color: '#8b5cf6',
    bgColor: 'var(--lilac-light)',
    slug: 'backend'
  },
  android: {
    title: 'Android-разработчик',
    desc: 'Разрабатывает мобильные приложения для смартфонов, планшетов, умных часов и телевизоров на базе операционной системы Android. Создает отзывчивый интерфейс с учетом аппаратных возможностей мобильных гаджетов.',
    icon: Smartphone,
    color: '#ec4899',
    bgColor: 'var(--pink-light)',
    slug: 'android'
  },
  qa: {
    title: 'QA Engineer (Тестировщик)',
    desc: 'Контролирует качество разрабатываемого ПО на всех этапах. Составляет тест-планы, находит дефекты и ошибки в работе систем, разрабатывает автотесты и следит, чтобы продукт полностью соответствовал требованиям.',
    icon: CheckCircle,
    color: '#10b981',
    bgColor: 'var(--lime-light)',
    slug: 'qa'
  }
};

const LOADING_STATUSES = [
  "Загружаем ваши ответы...",
  "Сопоставляем с картами компетенций...",
  "Вычисляем веса для 4 направлений...",
  "Подбираем лучшую траекторию обучения...",
  "Генерируем результаты..."
];

function QuizPage({ user, onUserUpdate }) {
  const navigate = useNavigate();
  
  const [started, setStarted] = useState(() => {
    return localStorage.getItem('last_quiz_started') === 'true';
  });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(() => {
    const saved = localStorage.getItem('last_quiz_current_idx');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('last_quiz_answers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(LOADING_STATUSES[0]);
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem('last_quiz_result');
    return saved ? JSON.parse(saved) : null;
  });

  // 1. Загрузка вопросов из базы данных
  useEffect(() => {
    setLoading(true);
    setLoadError(null);
    fetch('/api/quiz/questions')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сервера');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
        } else {
          setLoadError('Вопросы теста не найдены. Убедись, что SQL-скрипт был запущен в Supabase.');
        }
      })
      .catch(err => {
        console.error('Ошибка загрузки вопросов:', err.message);
        setLoadError('Не удалось загрузить вопросы теста. Проверь подключение к серверу.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 2. Симуляция смены текстов на экране анализа ответов
  useEffect(() => {
    if (!submitting) return;
    
    let textIdx = 0;
    const interval = setInterval(() => {
      textIdx++;
      if (textIdx < LOADING_STATUSES.length) {
        setSubmitMessage(LOADING_STATUSES[textIdx]);
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [submitting]);

  // Сброс состояния
  const handleReset = () => {
    localStorage.removeItem('last_quiz_started');
    localStorage.removeItem('last_quiz_current_idx');
    localStorage.removeItem('last_quiz_answers');
    localStorage.removeItem('last_quiz_result');
    setStarted(false);
    setCurrentIdx(0);
    setAnswers([]);
    setSubmitting(false);
    setResult(null);
    setSubmitMessage(LOADING_STATUSES[0]);
  };

  // Вспомогательная функция сброса прогресса при смене профессии
  const resetProgressIfProfessionChanged = async (newProfession) => {
    if (user && user.current_profession && user.current_profession !== newProfession) {
      try {
        await fetch(`/api/progress/reset/${user.id}`, { method: 'DELETE' });
      } catch (e) {
        console.warn('Не удалось сбросить прогресс:', e);
      }
    }
  };

  // Переход к следующему вопросу или отправка
  const handleSelectOption = (optionId) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIdx] = {
      questionId: questions[currentIdx].id,
      optionId: optionId
    };
    setAnswers(nextAnswers);
    localStorage.setItem('last_quiz_answers', JSON.stringify(nextAnswers));

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      localStorage.setItem('last_quiz_current_idx', nextIdx.toString());
    } else {
      // Последний вопрос — запускаем анализ
      setSubmitting(true);

      const submitPayload = {
        userId: user?.id || null,
        answers: nextAnswers
      };

      // async IIFE внутри setTimeout чтобы использовать await
      setTimeout(async () => {
        try {
          const res = await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submitPayload)
          });

          if (!res.ok) throw new Error('Submit API error');
          const data = await res.json();

          localStorage.setItem('last_quiz_result', JSON.stringify(data));

          const recommendedProfession = data.recommended[0];

          if (user && onUserUpdate) {
            await resetProgressIfProfessionChanged(recommendedProfession);
            const updatedUser = { ...user, current_profession: recommendedProfession };
            onUserUpdate(updatedUser);
          } else if (!user) {
            localStorage.setItem('anonymous_profession', recommendedProfession);
            const localHistory = localStorage.getItem('anonymous_test_history')
              ? JSON.parse(localStorage.getItem('anonymous_test_history'))
              : [];
            localHistory.unshift({
              id: 'local_' + Date.now(),
              test_name: 'Общий тест на IT-профессию',
              match_profession: recommendedProfession,
              match_percentage: data.matchPercentage,
              completed_at: new Date().toISOString()
            });
            localStorage.setItem('anonymous_test_history', JSON.stringify(localHistory));
          }

          setResult(data);
          setSubmitting(false);

        } catch (err) {
          console.error('Submit API error, calculating locally:', err);

          // Фолбэк локального скоринга
          const scores = { frontend: 0, backend: 0, qa: 0, android: 0 };
          nextAnswers.forEach(ans => {
            if (ans.optionId === 'a') scores.frontend += 5;
            if (ans.optionId === 'b') scores.backend += 5;
            if (ans.optionId === 'c') scores.qa += 5;
            if (ans.optionId === 'd') scores.android += 5;
            if (ans.optionId === 'e') {
              scores.frontend += 2;
              scores.backend += 2;
              scores.qa += 2;
              scores.android += 2;
            }
          });
          const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
          const topProfession = sorted[0];
          const professionAnswerMap = { frontend: 'a', backend: 'b', qa: 'c', android: 'd' };
          const targetOption = professionAnswerMap[topProfession];
          const matchCount = nextAnswers.filter(a => a.optionId === targetOption || a.optionId === 'e').length;
          const matchPercentage = Math.round((matchCount / nextAnswers.length) * 100);

          const localResult = { status: 'success', recommended: sorted, matchPercentage };
          localStorage.setItem('last_quiz_result', JSON.stringify(localResult));

          if (user && onUserUpdate) {
            await resetProgressIfProfessionChanged(topProfession);
            const updatedUser = { ...user, current_profession: topProfession };
            onUserUpdate(updatedUser);
          } else if (!user) {
            localStorage.setItem('anonymous_profession', topProfession);
            const localHistory = localStorage.getItem('anonymous_test_history')
              ? JSON.parse(localStorage.getItem('anonymous_test_history'))
              : [];
            localHistory.unshift({
              id: 'local_' + Date.now(),
              test_name: 'Общий тест на IT-профессию',
              match_profession: topProfession,
              match_percentage: matchPercentage,
              completed_at: new Date().toISOString()
            });
            localStorage.setItem('anonymous_test_history', JSON.stringify(localHistory));
          }

          setResult(localResult);
          setSubmitting(false);
        }
      }, 2000);
    }
  };

  // Кнопка назад
  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);
      localStorage.setItem('last_quiz_current_idx', prevIdx.toString());
    }
  };

  // Рендер 1: загрузка вопросов
  if (loading) {
    return (
      <div className="quiz-wrapper view active" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ border: '4px solid var(--border-color)', borderTop: '4px solid var(--purple)', borderRadius: '50%', width: '48px', height: '48px', margin: '0 auto 20px' }}></div>
          <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Загрузка вопросов теста...</p>
        </div>
      </div>
    );
  }

  // Рендер 1b: ошибка загрузки
  if (loadError) {
    return (
      <div className="quiz-wrapper view active" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '32px' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚠️</p>
          <h2 style={{ marginBottom: '12px', color: 'var(--text-main)' }}>Не удалось загрузить тест</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>{loadError}</p>
          <button className="btn-primary" onClick={() => {
            setLoadError(null);
            setLoading(true);
            fetch('/api/quiz/questions')
              .then(r => r.json())
              .then(d => {
                if (Array.isArray(d) && d.length > 0) setQuestions(d);
                else setLoadError('Вопросы не найдены в базе данных.');
              })
              .catch(() => setLoadError('Сервер недоступен.'))
              .finally(() => setLoading(false));
          }}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // Рендер 2: интро-экран
  if (!started) {
    return (
      <section className="quiz-wrapper view active">
        <div className="quiz-intro-card">
          <div className="quiz-intro-icon">
            <Compass size={40} />
          </div>
          <h2>Какая профессия в IT тебе подходит?</h2>
          <p>
            Пройди этот интерактивный тест из 10 вопросов, чтобы определить свои интересы, стиль мышления и подобрать идеальное IT-направление. 
          </p>
          
          <div className="quiz-features">
            <div className="quiz-feature-item">
              <Sparkles size={20} />
              <span>10 вопросов</span>
            </div>
            <div className="quiz-feature-item">
              <Star size={20} />
              <span>5 вариантов ответов</span>
            </div>
            <div className="quiz-feature-item">
              <Trophy size={20} />
              <span>Сравнение 4 треков</span>
            </div>
          </div>

          <button onClick={() => { localStorage.setItem('last_quiz_started', 'true'); setStarted(true); }} className="btn-primary">
            Начать тестирование <ArrowRight size={18} />
          </button>
        </div>
      </section>
    );
  }

  // Рендер 3: экран симуляции анализа
  if (submitting) {
    return (
      <section className="quiz-wrapper view active">
        <div className="quiz-analyzing-card">
          <div className="pulse-spinner-wrapper">
            <div className="pulse-spinner-ring"></div>
            <div className="pulse-spinner">
              <Compass size={36} className="spinner" />
            </div>
          </div>
          <div className="analyzing-text">Вычисляем результат</div>
          <div className="analyzing-subtext">{submitMessage}</div>
        </div>
      </section>
    );
  }

  // Рендер 4: экран результатов
  if (result) {
    const recommendedSlug = result.recommended[0];
    const topProfession = PROFESSION_META[recommendedSlug];
    const matchPercentage = result.matchPercentage;
    const IconComponent = topProfession?.icon || Code;

    const calculatedScores = { frontend: 0, backend: 0, qa: 0, android: 0 };
    answers.forEach(ans => {
      if (ans.optionId === 'a') calculatedScores.frontend += 5;
      if (ans.optionId === 'b') calculatedScores.backend += 5;
      if (ans.optionId === 'c') calculatedScores.qa += 5;
      if (ans.optionId === 'd') calculatedScores.android += 5;
      if (ans.optionId === 'e') {
        calculatedScores.frontend += 2;
        calculatedScores.backend += 2;
        calculatedScores.qa += 2;
        calculatedScores.android += 2;
      }
    });

    const maxScore = 50;
    const breakdown = [
      { slug: 'frontend', title: 'Frontend Developer', pct: Math.round((calculatedScores.frontend / maxScore) * 100), color: '#3b82f6' },
      { slug: 'backend', title: 'Backend Developer', pct: Math.round((calculatedScores.backend / maxScore) * 100), color: '#8b5cf6' },
      { slug: 'android', title: 'Android Developer', pct: Math.round((calculatedScores.android / maxScore) * 100), color: '#ec4899' },
      { slug: 'qa', title: 'QA Engineer', pct: Math.round((calculatedScores.qa / maxScore) * 100), color: '#10b981' }
    ].sort((a, b) => b.pct - a.pct);

    return (
      <section className="quiz-wrapper view active" style={{ maxWidth: '1000px' }}>
        <div className="result-header-card">
          <div className="result-badge-circle" style={{ borderColor: topProfession.color }}>
            <span className="percent" style={{ color: topProfession.color }}>{matchPercentage}%</span>
            <span className="label">Совпадение</span>
          </div>
          <div className="result-info">
            <span className="result-info-badge" style={{ color: topProfession.color, borderColor: `${topProfession.color}30` }}>
              <IconComponent size={16} /> Твоя рекомендация
            </span>
            <h2 className="result-title">{topProfession.title}</h2>
            <p className="result-description">{topProfession.desc}</p>
          </div>
        </div>

        <div className="result-grid">
          <div className="breakdown-card">
            <h3>Профиль твоих склонностей</h3>
            <div className="breakdown-list">
              {breakdown.map((item, idx) => {
                const ItemIcon = PROFESSION_META[item.slug]?.icon || Code;
                return (
                  <div className="breakdown-item" key={idx}>
                    <div className="breakdown-info">
                      <div className="breakdown-name">
                        <ItemIcon size={18} style={{ color: item.color }} />
                        <span>{item.title}</span>
                      </div>
                      <span className="breakdown-percent">{item.pct}%</span>
                    </div>
                    <div className="breakdown-bar-bg">
                      <div 
                        className="breakdown-bar-fill" 
                        style={{ 
                          width: `${item.pct}%`, 
                          background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}bb 100%)` 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="result-actions-card">
            <div>
              <h3>Что делать дальше?</h3>
              <p className="action-intro" style={{ marginTop: '12px' }}>
                Мы подобрали индивидуальный план обучения, который поможет тебе освоить эту профессию с нуля.
              </p>
            </div>
            
            <div className="action-btn-group">
              <button 
                className="btn-primary" 
                onClick={() => navigate(`/roadmap/${topProfession.slug}`)}
              >
                Открыть дорожную карту <ArrowUpRight size={18} />
              </button>
              
              <button 
                className="btn-secondary-outline" 
                onClick={() => navigate('/dashboard')}
              >
                В личный кабинет
              </button>
              
              <button 
                className="btn-text" 
                onClick={handleReset}
                style={{ justifyContent: 'center', marginTop: '8px' }}
              >
                <RefreshCw size={16} /> Пройти тест заново
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Рендер 5: прохождение вопросов
  const activeQuestion = questions[currentIdx];
  const progressPercent = Math.round((currentIdx / questions.length) * 100);

  return (
    <section className="quiz-wrapper view active">
      {currentIdx > 0 && (
        <button className="quiz-back-btn" onClick={handlePrevQuestion}>
          <ArrowLeft size={16} /> Назад
        </button>
      )}

      <div className="quiz-card">
        <div className="quiz-header">
          <span className="badge-pink">Вопрос {currentIdx + 1} из {questions.length}</span>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="badge-pink" style={{ background: 'var(--lime-light)', color: 'var(--lime-hover)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            {progressPercent}%
          </span>
        </div>

        <div className="question-text">
          {activeQuestion.question_text}
        </div>

        <div className="options-grid">
          {activeQuestion.options?.map((option) => (
            <button 
              key={option.id}
              className="option-btn"
              onClick={() => handleSelectOption(option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuizPage;
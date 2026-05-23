import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  User, Compass, History, ChevronDown, ChevronUp,
  BookOpen, TrendingUp, LogOut
} from 'lucide-react';
import './dashboard.css';

const ROADMAP_MONTHS = [
  { id: 1, title: 'Месяц 1: Старт и Основы', tasks: [
    'Изучить основы выбранного направления (HTML/CSS/JS для Frontend, Node.js для Backend)',
    'Настроить рабочее окружение (Git, VS Code, терминал)',
    'Создать первый репозиторий на GitHub и сделать коммит'
  ]},
  { id: 2, title: 'Месяц 2: Базовое программирование', tasks: [
    'Освоить синтаксис языка программирования (переменные, циклы, ветвления)',
    'Понять работу функций и области видимости',
    'Написать 10 простых алгоритмических задач'
  ]},
  { id: 3, title: 'Месяц 3: Работа с окружением и данными', tasks: [
    'Понять работу с DOM (для Frontend) или основами SQL баз данных (для Backend)',
    'Изучить сетевые протоколы (HTTP, REST API)',
    'Реализовать простое приложение (калькулятор или Todo List)'
  ]},
  { id: 4, title: 'Месяц 4: Продвинутые концепции', tasks: [
    'Изучить асинхронное программирование (Promises, async/await)',
    'Понять работу с пакетными менеджерами (npm, yarn)',
    'Добавить валидацию данных и обработку ошибок в проекты'
  ]},
  { id: 5, title: 'Месяц 5: Знакомство с Фреймворками', tasks: [
    'Начать изучение фреймворка (React для Frontend, Express/Nest для Backend)',
    'Изучить основы роутинга внутри фреймворка',
    'Создать первое многостраничное демо-приложение'
  ]},
  { id: 6, title: 'Месяц 6: Базы данных и Авторизация', tasks: [
    'Изучить интеграцию базы данных (Supabase, PostgreSQL, MongoDB)',
    'Реализовать регистрацию и вход пользователей (JWT, Sessions)',
    'Настроить защиту приватных роутов'
  ]},
  { id: 7, title: 'Месяц 7: Тестирование', tasks: [
    'Разобраться с методами тестирования (Unit, Integration)',
    'Написать первые тесты (Jest, Vitest или Supertest)',
    'Покрыть тестами критически важные функции своего API/клиента'
  ]},
  { id: 8, title: 'Месяц 8: Контейнеризация', tasks: [
    'Изучить основы Docker (образы, контейнеры)',
    'Написать Dockerfile для своего приложения',
    'Запустить связку клиент-сервер-БД через Docker Compose'
  ]},
  { id: 9, title: 'Месяц 9: Инструменты CI/CD и Линтеры', tasks: [
    'Изучить GitHub Actions для автоматизации сборки и тестов',
    'Настроить ESLint и Prettier для автоматического форматирования кода',
    'Настроить проверку кода при создании Pull Request'
  ]},
  { id: 10, title: 'Месяц 10: Архитектура и Рефакторинг', tasks: [
    'Понять паттерны проектирования и архитектурные слои (MVC, Clean Architecture)',
    'Провести полный рефакторинг своего дипломного/крупного проекта',
    'Оптимизировать производительность кода (кэширование, индексы в БД)'
  ]},
  { id: 11, title: 'Месяц 11: Деплой и Портфолио', tasks: [
    'Развернуть проект в продакшн (Vercel/Netlify для фронта, Render/Railway для бэка)',
    'Привязать доменное имя и настроить SSL сертификат',
    'Красиво оформить README.md ко всем ключевым проектам в GitHub'
  ]},
  { id: 12, title: 'Месяц 12: Поиск работы и собеседования', tasks: [
    'Составить грамотное резюме (CV) и написать сопроводительное письмо',
    'Пройти 2-3 тренировочных собеседования (Mock Interviews)',
    'Начать делать отклики на вакансии и выполнять тестовые задания'
  ]},
];

// Строим плоский список task_id в том же порядке что и чекбоксы
// task_id формат: m{month}_{taskIndex}
function makeTaskId(monthId, taskIndex) {
  return `m${monthId}_${taskIndex}`;
}

const TOTAL_TASKS = ROADMAP_MONTHS.reduce((acc, m) => acc + m.tasks.length, 0);

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(queryParams.get('tab') || 'progress');

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    if (tab) setActiveTab(tab);
  }, [location.search]);

  // Загружаем открытые месяцы из localStorage
  const userKey = user?.email || 'anonymous';

  const [openMonths, setOpenMonths] = useState(() => {
    const saved = localStorage.getItem(`dashboard_open_months_${userKey}`);
    return saved ? JSON.parse(saved) : { 1: true };
  });

  // Сохраняем состояние при изменениях
  useEffect(() => {
    localStorage.setItem(`dashboard_open_months_${userKey}`, JSON.stringify(openMonths));
  }, [openMonths, userKey]);

  // Множество выполненных task_id (из БД)
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [progressLoading, setProgressLoading] = useState(true);

  // История тестов
  const [testHistory, setTestHistory] = useState([]);
  const [testsLoading, setTestsLoading] = useState(true);

  // Загружаем прогресс из БД
  useEffect(() => {
    if (!user?.id) {
      setProgressLoading(false);
      return;
    }

    fetch(`/api/progress/${user.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.progress) {
          // Новый формат: массив [{ month_number, tasks: { "m1_0": true, ... } }]
          const ids = new Set();
          data.progress.forEach(row => {
            Object.entries(row.tasks || {}).forEach(([taskId, done]) => {
              if (done) ids.add(taskId);
            });
          });
          setCompletedTasks(ids);
        }
      })
      .catch(err => console.error('Ошибка загрузки прогресса:', err))
      .finally(() => setProgressLoading(false));
  }, [user?.id]);

  // Загружаем историю тестов
  useEffect(() => {
    if (!user?.id) {
      setTestsLoading(false);
      return;
    }

    fetch(`/api/quiz/results/${user.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.results) setTestHistory(data.results);
      })
      .catch(err => console.error('Ошибка загрузки тестов:', err))
      .finally(() => setTestsLoading(false));
  }, [user?.id]);

  const toggleMonth = (id) => {
    setOpenMonths(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckboxChange = async (monthId, taskIndex, currentChecked) => {
    if (!user?.id) return;

    const taskId = makeTaskId(monthId, taskIndex);
    const newChecked = !currentChecked;

    // Оптимистичное обновление UI
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (newChecked) next.add(taskId);
      else next.delete(taskId);
      return next;
    });

    try {
      await fetch('/api/progress/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          monthNumber: monthId,
          taskId,
          isCompleted: newChecked,
        }),
      });
    } catch (err) {
      // Откат при ошибке
      console.error('Ошибка сохранения прогресса:', err);
      setCompletedTasks(prev => {
        const next = new Set(prev);
        if (newChecked) next.delete(taskId);
        else next.add(taskId);
        return next;
      });
    }
  };

  const checkedCount = completedTasks.size;
  const progressPercent = Math.round((checkedCount / TOTAL_TASKS) * 100);

  const professionLabels = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    android: 'Android Developer',
    qa: 'QA Engineer',
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('ru-RU');
  };

  return (
    <section className="view active">
      <div className="dashboard-grid">

        <aside className="dashboard-sidebar">
          <button className={`dashboard-tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}>
            <User size={20} /> Мой Прогресс
          </button>
          <button className={`dashboard-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}>
            <Compass size={20} /> План на 12 месяцев
          </button>
          <button className={`dashboard-tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}>
            <History size={20} /> История тестов
          </button>
          <button className="dashboard-tab-btn logout-btn"
            onClick={() => { onLogout(); navigate('/'); }}>
            <LogOut size={20} /> Выйти
          </button>
        </aside>

        <main className="dashboard-panel" style={{ paddingTop: '48px', paddingBottom: '48px' }}>

          {/* ПРОГРЕСС */}
          {activeTab === 'progress' && (
            <div>
              <h2 className="panel-title">Личный кабинет</h2>
              <p className="panel-subtitle">Отслеживай свои успехи и управляй планом развития</p>

              <div className="profile-summary-card">
                <div className="profile-avatar-wrapper"><User size={48} /></div>
                <div className="profile-info">
                  <h3>{user?.name || 'Пользователь'}</h3>
                  <span className="profile-badge">
                    {professionLabels[user?.current_profession] || 'Профессия не выбрана'}
                  </span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card card-lime">
                  <div className="stat-label">
                    <TrendingUp size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                    Общий прогресс
                  </div>
                  <div className="stat-value">
                    {progressLoading ? '...' : `${progressPercent}%`}
                  </div>
                </div>
                <div className="stat-card card-blue">
                  <div className="stat-label">
                    <BookOpen size={18} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
                    Пройдено задач
                  </div>
                  <div className="stat-value">
                    {progressLoading ? '...' : `${checkedCount} / ${TOTAL_TASKS}`}
                  </div>
                </div>
              </div>

              <div className="cta-section">
                <h2>Продолжай двигаться к цели!</h2>
                <p>Твой индивидуальный 12-месячный план развития готов. Перейди во вкладку «План на 12 месяцев», чтобы узнать свой следующий шаг.</p>
                <button className="btn-primary" onClick={() => setActiveTab('roadmap')}>
                  Открыть план развития
                </button>
              </div>
            </div>
          )}

          {/* РОАДМАП */}
          {activeTab === 'roadmap' && (
            <div>
              <h2 className="panel-title">План действий на 12 месяцев</h2>
              <p className="panel-subtitle">Пошаговый план становления в IT с возможностью отмечать прогресс</p>

              <div className="quiz-header" style={{ marginBottom: '32px' }}>
                <span className="badge-pink">Прогресс плана</span>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="badge-pink" style={{ background: 'var(--lime-light)', color: 'var(--lime-hover)' }}>
                  {progressPercent}%
                </span>
              </div>

              {progressLoading ? (
                <p style={{ textAlign: 'center', padding: '32px' }}>Загрузка прогресса...</p>
              ) : (
                <div className="roadmap-container">
                  {ROADMAP_MONTHS.map((month) => {
                    const isOpen = !!openMonths[month.id];
                    return (
                      <div key={month.id} className={`roadmap-month-card ${isOpen ? 'open' : ''}`}>
                        <div className="roadmap-month-header" onClick={() => toggleMonth(month.id)}>
                          <div className="roadmap-month-title-wrapper">
                            <span className="roadmap-month-badge">Month {month.id}</span>
                            <span>{month.title}</span>
                          </div>
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {isOpen && (
                          <div className="roadmap-month-content">
                            {month.tasks.map((task, idx) => {
                              const taskId = makeTaskId(month.id, idx);
                              const isChecked = completedTasks.has(taskId);
                              return (
                                <label key={idx} className={`roadmap-checklist-item ${isChecked ? 'checked' : ''}`}>
                                  <input type="checkbox" checked={isChecked}
                                    onChange={() => handleCheckboxChange(month.id, idx, isChecked)} />
                                  <span>{task}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ИСТОРИЯ ТЕСТОВ */}
          {activeTab === 'tests' && (
            <div>
              <h2 className="panel-title">История тестирования</h2>
              <p className="panel-subtitle">Здесь хранятся все результаты твоих карьерных тестов</p>

              {testsLoading ? (
                <p style={{ textAlign: 'center', padding: '32px' }}>Загрузка...</p>
              ) : testHistory.length === 0 ? (
                <div className="cta-section">
                  <h2>Тестов пока нет</h2>
                  <p>Пройди тест на профориентацию, чтобы узнать какая IT-профессия тебе подходит.</p>
                  <button className="btn-primary" onClick={() => navigate('/professions')}>
                    Перейти к тесту
                  </button>
                </div>
              ) : (
                <div className="history-list">
                  {testHistory.map((test) => (
                    <div key={test.id} className="history-item">
                      <div>
                        <div className="item-title">{test.test_name}</div>
                        <div className="item-desc">Дата прохождения: {formatDate(test.completed_at)}</div>
                      </div>
                      <span className="badge-pink" style={{ background: 'var(--blue-light)', color: 'var(--purple)' }}>
                        {professionLabels[test.match_profession] || test.match_profession} ({test.match_percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </section>
  );
}

export default Dashboard;

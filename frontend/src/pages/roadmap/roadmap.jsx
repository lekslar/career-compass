import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, ExternalLink, X, BookOpen, GraduationCap } from 'lucide-react';
import { roadmapData } from '../../data/roadmapData';
import './roadmap.css';

function RoadmapPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const roadmap = roadmapData[slug];

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Получаем userId из localStorage (там хранится объект user)
  const getUserId = () => {
    try {
      const saved = localStorage.getItem('currentUser');
      return saved ? JSON.parse(saved).id : null;
    } catch {
      return null;
    }
  };

  // Загрузка прогресса с адаптацией под JSONB
  useEffect(() => {
    if (!slug) return;
    setSelectedTopic(null);

    const userId = getUserId();

    if (userId) {
      fetch(`/api/progress/${userId}`)
        .then(r => r.json())
        .then(data => {
          if (data.status === 'success' && data.progress) {
            const map = {};

            // Формат tasks: { "topicId": "completed" | "learning" }
            // Ключ not_started не хранится (удаляется на бэкенде)
            data.progress.forEach(row => {
              if (row.tasks) {
                Object.entries(row.tasks).forEach(([taskId, statusValue]) => {
                  if (statusValue === 'completed' || statusValue === 'learning') {
                    map[taskId] = statusValue;
                  }
                });
              }
            });

            setStatusMap(map);
          }
        })
        .catch(err => {
          console.error('Ошибка загрузки прогресса:', err);
          // Фолбэк на localStorage
          const saved = localStorage.getItem(`roadmap_progress_${slug}`);
          if (saved) {
            try { setStatusMap(JSON.parse(saved)); } catch {}
          }
        })
        .finally(() => setLoading(false));
    } else {
      // Не авторизован — берём из localStorage
      const saved = localStorage.getItem(`roadmap_progress_${slug}`);
      if (saved) {
        try { setStatusMap(JSON.parse(saved)); } catch {}
      } else {
        setStatusMap({});
      }
      setLoading(false);
    }
  }, [slug]);

  if (!roadmap) {
    return (
      <section className="view active">
        <div className="error-page">
          <h2>Roadmap не найден</h2>
          <button className="btn-primary" onClick={() => navigate('/professions')}>
            Вернуться к профессиям
          </button>
        </div>
      </section>
    );
  }

  const allTopics = [];
  roadmap.categories.forEach(category => {
    category.items.forEach(item => {
      allTopics.push({ ...item, categoryColor: category.color });
    });
  });

  const totalTopics = allTopics.length;
  const completedTopics = allTopics.filter(t => statusMap[t.id] === 'completed').length;
  const learningTopics = allTopics.filter(t => statusMap[t.id] === 'learning').length;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Обновление статуса в БД через атомарные и чистые вызовы JSONB бэкенда
  const updateTopicStatus = async (topicId, status) => {
    const updated = { ...statusMap, [topicId]: status };
    setStatusMap(updated);

    const userId = getUserId();

    if (userId) {
      // month_number = 0 зарезервировано для roadmap-прогресса
      // Передаём status строкой: 'completed' | 'learning' | 'not_started'
      // Бэкенд сам хранит строку, not_started — удаляет ключ
      try {
        await fetch('/api/progress/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            monthNumber: 0,
            taskId: topicId,
            status,
          }),
        });
      } catch (err) {
        console.error('Ошибка сохранения статуса темы:', err);
      }
    } else {
      // Не авторизован — сохраняем в localStorage
      localStorage.setItem(`roadmap_progress_${slug}`, JSON.stringify(updated));
    }
  };

  return (
    <section className="view active roadmap-page-container">
      <button className="back-button" onClick={() => navigate(`/profession/${slug}`)}>
        <ArrowLeft size={20} /> Вернуться к описанию
      </button>

      <div className="roadmap-header">
        <div className="roadmap-title-area">
          <GraduationCap size={44} className="roadmap-header-icon" />
          <div>
            <h1>Интерактивный Roadmap: {roadmap.title}</h1>
            <p className="roadmap-subtitle">{roadmap.description}</p>
          </div>
        </div>

        <div className="roadmap-progress-card">
          <div className="progress-stats">
            <div className="stat-box">
              <span className="stat-number">{completedTopics}</span>
              <span className="stat-label">Изучено</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{learningTopics}</span>
              <span className="stat-label">В процессе</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{totalTopics}</span>
              <span className="stat-label">Всего тем</span>
            </div>
          </div>

          <div className="progress-bar-wrapper">
            <div className="progress-bar-label">Общий прогресс: {progressPercent}%</div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '48px' }}>Загрузка прогресса...</p>
      ) : (
        <div className="roadmap-tree">
          {roadmap.categories.map((category, catIdx) => (
            <div key={category.id} className="roadmap-category-section">
              {catIdx > 0 && <div className="roadmap-connector-line"></div>}
              <div className={`roadmap-category-card ${category.color}`}>
                <h2 className="category-title">{category.title}</h2>
                <div className="roadmap-nodes-grid">
                  {category.items.map((item) => {
                    const status = statusMap[item.id] || 'not_started';
                    return (
                      <div key={item.id}
                        className={`roadmap-node-card ${status} ${selectedTopic?.id === item.id ? 'selected' : ''}`}
                        onClick={() => setSelectedTopic({ ...item, categoryColor: category.color })}>
                        <div className="node-status-indicator">
                          {status === 'completed' && <CheckCircle size={18} className="icon-completed" />}
                          {status === 'learning' && <Clock size={18} className="icon-learning" />}
                          {status === 'not_started' && <div className="icon-empty"></div>}
                        </div>
                        <span className="node-title">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`roadmap-drawer ${selectedTopic ? 'open' : ''}`}>
        {selectedTopic && (
          <div className="drawer-content">
            <div className="drawer-header">
              <span className={`drawer-badge ${selectedTopic.categoryColor}`}>Тема курса</span>
              <button className="close-btn" onClick={() => setSelectedTopic(null)}>
                <X size={24} />
              </button>
            </div>

            <h3 className="drawer-title">{selectedTopic.title}</h3>

            <div className="status-selector-area">
              <span className="status-title">Статус изучения:</span>
              <div className="status-buttons">
                <button
                  className={`status-btn btn-not-started ${!statusMap[selectedTopic.id] || statusMap[selectedTopic.id] === 'not_started' ? 'active' : ''}`}
                  onClick={() => updateTopicStatus(selectedTopic.id, 'not_started')}>
                  Не начато
                </button>
                <button
                  className={`status-btn btn-learning ${statusMap[selectedTopic.id] === 'learning' ? 'active' : ''}`}
                  onClick={() => updateTopicStatus(selectedTopic.id, 'learning')}>
                  В процессе
                </button>
                <button
                  className={`status-btn btn-completed ${statusMap[selectedTopic.id] === 'completed' ? 'active' : ''}`}
                  onClick={() => updateTopicStatus(selectedTopic.id, 'completed')}>
                  Изучено
                </button>
              </div>
            </div>

            <div className="drawer-body">
              <h4 className="body-section-title">Описание темы</h4>
              <p className="drawer-description">{selectedTopic.description}</p>

              <h4 className="body-section-title">📚 Рекомендуемые ресурсы</h4>
              {selectedTopic.resources && selectedTopic.resources.length > 0 ? (
                <ul className="drawer-resources-list">
                  {selectedTopic.resources.map((resource, idx) => (
                    <li key={idx}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                        <BookOpen size={16} />
                        <span>{resource.title}</span>
                        <ExternalLink size={14} className="ext-icon" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-resources-msg">Ресурсы добавятся в ближайшее время.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RoadmapPage;
import { useState, useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';
import { roadmapData } from '../../data/roadmapData';
import '../../styles/index.css';
import './chat.css';

// Парсер Markdown и блоков кода для красивого нео-бруталистского рендеринга
const parseMessageText = (text) => {
  const lines = text.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Проверяем начало или конец блока кода
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        const codeContent = codeLines.join('\n');
        const currentLang = codeLanguage;
        elements.push(
          <div key={`code-${i}`} className="code-block-container">
            <div className="code-block-header">
              <span>{currentLang.toUpperCase() || 'CODE'}</span>
              <button 
                type="button"
                className="code-copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(codeContent);
                  alert('Код скопирован в буфер обмена! 📋');
                }}
              >
                Копировать
              </button>
            </div>
            <pre className="code-block-content">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeLines = [];
        codeLanguage = '';
      } else {
        inCodeBlock = true;
        codeLanguage = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={i} style={{ height: '8px' }} />);
      continue;
    }

    // Заголовки уровня 3 (###)
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={i}>{trimmed.replace('### ', '')}</h3>);
      continue;
    }

    // Полностью жирные строки
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(
        <strong key={i} style={{ display: 'block', marginTop: '12px', marginBottom: '4px', fontWeight: 900 }}>
          {trimmed.replace(/\*\*/g, '')}
        </strong>
      );
      continue;
    }

    // Списки
    if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const rawLine = trimmed.slice(2);
      const parts = rawLine.split('**');
      elements.push(
        <li key={i}>
          {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx}>{part}</strong> : part)}
        </li>
      );
      continue;
    }

    // Обычные строки с жирным текстом внутри
    if (trimmed.includes('**')) {
      const parts = trimmed.split('**');
      elements.push(
        <p key={i}>
          {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx}>{part}</strong> : part)}
        </p>
      );
      continue;
    }

    elements.push(<p key={i}>{line}</p>);
  }

  // Если блок кода не был закрыт, рендерим его остаток
  if (inCodeBlock && codeLines.length > 0) {
    const codeContent = codeLines.join('\n');
    elements.push(
      <div key={`code-unfinished`} className="code-block-container">
        <div className="code-block-header">
          <span>{codeLanguage.toUpperCase() || 'CODE'}</span>
        </div>
        <pre className="code-block-content">
          <code>{codeContent}</code>
        </pre>
      </div>
    );
  }

  return elements;
};

function ChatPage({ user }) {
  const messagesEndRef = useRef(null);

  // Инициализируем сообщения из localStorage или приветственным сообщением
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`career_compass_chat_history_${user?.email || 'anonymous'}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Ошибка загрузки истории чата', e);
      }
    }
    const greetingName = user?.name ? `, ${user.name}` : '';
    return [
      {
        id: 'welcome',
        sender: 'bot',
        text: `Привет${greetingName}! Я твой ИИ-картограф и ментор в мире IT. 🚀\n\nЯ помогу тебе определиться с будущей профессией, расскажу, какие навыки востребованы, с чего начать обучение, какие зарплаты платят специалистам и как составить план развития. \n\nЗадай мне любой вопрос или выбери одну из подсказок ниже! 👇`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Перезагрузка сообщений при смене пользователя
  useEffect(() => {
    const saved = localStorage.getItem(`career_compass_chat_history_${user?.email || 'anonymous'}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Ошибка загрузки истории чата', e);
      }
    } else {
      const greetingName = user?.name ? `, ${user.name}` : '';
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: `Привет${greetingName}! Я твой ИИ-картограф и ментор в мире IT. 🚀\n\nЯ помогу тебе определиться с будущей профессией, расскажу, какие навыки востребованы, с чего начать обучение, какие зарплаты платят специалистам и как составить план развития. \n\nЗадай мне любой вопрос или выбери одну из подсказок ниже! 👇`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [user]);

  // Скролл вниз при добавлении сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Сохранение сообщений в localStorage
  useEffect(() => {
    localStorage.setItem(`career_compass_chat_history_${user?.email || 'anonymous'}`, JSON.stringify(messages));
  }, [messages, user]);

  // Сбор данных из личного кабинета (LK) для ИИ
  const getUserProfilePayload = () => {
    if (!user) return null;
    const userKey = user.email || 'anonymous';
    
    // 1. Прогресс общего 12-месячного плана из личного кабинета
    const savedDashboard = localStorage.getItem(`dashboard_checked_tasks_${userKey}`);
    let dashboardCount = 5; // По умолчанию выполнено 5 задач
    if (savedDashboard) {
      try {
        const checkedTasks = JSON.parse(savedDashboard);
        dashboardCount = Object.values(checkedTasks).filter(Boolean).length;
      } catch (e) {
        console.error(e);
      }
    }
    
    // 2. Прогресс детальных интерактивных дорожных карт (Roadmaps)
    const roadmapsProgress = {};
    const slugs = ['frontend', 'backend', 'android', 'qa'];
    
    slugs.forEach(slug => {
      const savedRoadmap = localStorage.getItem(`roadmap_progress_${slug}`);
      if (savedRoadmap) {
        try {
          const statusMap = JSON.parse(savedRoadmap);
          const roadmap = roadmapData[slug];
          if (roadmap) {
            const allTopics = [];
            roadmap.categories.forEach(category => {
              category.items.forEach(item => {
                allTopics.push(item);
              });
            });
            
            const total = allTopics.length;
            const completed = allTopics.filter(t => statusMap[t.id] === 'completed').map(t => t.title);
            const learning = allTopics.filter(t => statusMap[t.id] === 'learning').map(t => t.title);
            const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
            
            if (completed.length > 0 || learning.length > 0) {
              roadmapsProgress[slug] = {
                title: roadmap.title,
                percent,
                completedCount: completed.length,
                learningCount: learning.length,
                totalCount: total,
                completedTopics: completed,
                learningTopics: learning
              };
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

    return {
      name: user.name,
      email: user.email,
      dashboardProgress: {
        percent: Math.round((dashboardCount / 36) * 100),
        completedCount: dashboardCount,
        totalCount: 36
      },
      roadmapsProgress
    };
  };

  // Отправка сообщения ИИ-ассистенту на бэкенд
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Добавляем сообщение пользователя в чат
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages, // отправляем историю без последнего сообщения
          userProfile: getUserProfilePayload()
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка сети при запросе к ассистенту');
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Ошибка ассистента:', error);
      const errorMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        text: 'Произошла ошибка при получении ответа от ИИ-ассистента. Пожалуйста, обратитесь к администратору за помощью или попробуйте снова позже.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="view active" style={{ marginTop: '5px', marginBottom: '60px' }}>
      <div className="chat-page-wrapper">
        <div className="chat-card">

          {/* Шапка чата */}
          <div className="chat-header-neobrutal">
            <div className="chat-header-left">
              <div className="chat-avatar-frame">
                <Bot size={24} />
              </div>
              <div className="chat-info">
                <h2>ИИ Карьерный Ментор</h2>
                <div className="chat-status">
                  <span className="status-dot-pulse"></span>
                  <span>В сети • Задавай вопросы о карьере в IT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Область сообщений */}
          <div className="chat-messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`msg-row ${msg.sender === 'user' ? 'msg-row-user' : 'msg-row-bot'}`}
              >
                <div className="msg-bubble-neobrutal">
                  {parseMessageText(msg.text)}
                  <span className="msg-time-stamp">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Индикатор печати ИИ */}
            {isTyping && (
              <div className="msg-row msg-row-bot">
                <div className="typing-indicator-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>Ментор думает...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Нижняя панель с вводом */}
          <div className="chat-bottom-bar">
            <form onSubmit={handleSendMessage} className="chat-input-wrapper-neobrutal">
              <input
                type="text"
                className="chat-input-neobrutal"
                placeholder="Спроси ментора о карьере, языках или обучении..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chat-send-btn-neobrutal"
                disabled={!inputValue.trim() || isTyping}
                title="Отправить сообщение"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ChatPage;

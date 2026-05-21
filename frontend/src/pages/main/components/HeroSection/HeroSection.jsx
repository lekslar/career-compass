import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Laptop, Sparkles, Star, Code, PenTool, Database } from 'lucide-react';
import './HeroSection.css';

function HeroSection() {
  const [activeTab, setActiveTab] = useState('school');
  const navigate = useNavigate();

  const subtitles = {
    school: "Без долгих тестов и догадок, подберем ИТ-профессии, которые действительно совпадают с твоими сильными сторонами и увлечениями.",
    student: "Мы поможем понять суть профессий и найти нужную по твоим интересам. С нами выбор профессии становится простым: всего несколько кликов - и интерактивный помощник подскажет, куда лучше двигаться дальше.",
    parent: "Поможем найти взвешенное решение на основе фактов, а не предположений. Вы сможете быстро разобраться в современных профессиях и дать ребенку возможность выбрать специальность самостоятельно без давления с вашей стороны."
  };

  return (
    <div className="hero-section">
      <div className="hero-text">
        <h2 className="hero-title">
          Найдем <span className="highlight-lime">профессию</span> по твоим интересам
        </h2>
        <p className="hero-subtitle" style={{ minHeight: '80px', transition: 'opacity 0.3s' }}>
          {subtitles[activeTab]}
        </p>
        
        <div className="audience-toggle">
          <button 
            className={`toggle-btn ${activeTab === 'school' ? 'active' : ''}`}
            onClick={() => setActiveTab('school')}
          >
            для школьников
          </button>
          <button 
            className={`toggle-btn ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => setActiveTab('student')}
          >
            для студентов
          </button>
          <button 
            className={`toggle-btn ${activeTab === 'parent' ? 'active' : ''}`}
            onClick={() => setActiveTab('parent')}
          >
            для родителей
          </button>
        </div>

        <div>
          <button onClick={() => navigate('/professions')} className="btn-primary">
            Выбрать профессию <ArrowRight />
          </button>
        </div>
      </div>
      
      <div className="hero-image-placeholder">
        <div className="sketchy-illustration">
          {/* Декоративные иконки на фоне */}
          <Sparkles className="floating-bg-icon fi-1" size={32} />
          <Star className="floating-bg-icon fi-2" size={40} />
          <Sparkles className="floating-bg-icon fi-3" size={24} />

          <Laptop className="main-ill-icon" strokeWidth={1.5} size={180} />
          
          <div className="thought-bubble tb-1">
            <Code size={18} /> frontend
          </div>
          <div className="thought-bubble tb-2">
            <PenTool size={18} /> дизайн
          </div>
          <div className="thought-bubble tb-3">
            <Database size={18} /> данные
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

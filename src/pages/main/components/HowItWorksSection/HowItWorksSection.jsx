import { ClipboardList, Cpu, Map, Target } from 'lucide-react';
import './HowItWorksSection.css';

function HowItWorksSection() {
  return (
    <div className="how-it-works">
      <h3 className="section-title text-center">
        <span className="highlight-marker highlight-marker-pink">Как работает сервис?</span>
      </h3>
      <div className="steps-grid">
        <div className="step-card tilt-left">
          <div className="step-number">1</div>
          <h4>Короткий опрос</h4>
          <p>Ответь на несколько вопросов о том, что тебе нравится делать.</p>
          <ClipboardList className="step-icon" />
        </div>
        <div className="step-card tilt-right">
          <div className="step-number">2</div>
          <h4>Анализ навыков</h4>
          <p>Наша система подберет топ-3 идеальные профессии для тебя.</p>
          <Cpu className="step-icon" />
        </div>
        <div className="step-card tilt-left">
          <div className="step-number">3</div>
          <h4>Дорожная карта</h4>
          <p>Получи пошаговый план развития на 12 месяцев.</p>
          <Map className="step-icon" />
        </div>
        <div className="step-card tilt-right">
          <div className="step-number">4</div>
          <h4>Трекинг</h4>
          <p>Отмечай прогресс и двигайся к офферу мечты!</p>
          <Target className="step-icon" />
        </div>
      </div>
    </div>
  );
}

export default HowItWorksSection;

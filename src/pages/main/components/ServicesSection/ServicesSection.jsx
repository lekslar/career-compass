import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './ServicesSection.css';

function ServicesSection() {
  const navigate = useNavigate();

  return (
    <div className="services-section">
      <h3 className="section-title text-center">
        <span className="highlight-marker highlight-marker-purple">Поможем выбрать профессию</span>
      </h3>
      <div className="services-grid">
        <div className="service-card card-blue" onClick={() => navigate('/professions')} style={{ cursor: 'pointer' }}>
          <h4>Профессии</h4>
          <p>Справочник актуальных ИТ-специальностей с зарплатами и требованиями.</p>
          <button className="circle-btn"><ChevronRight /></button>
        </div>
        <div className="service-card card-lilac" onClick={() => navigate('/professions')} style={{ cursor: 'pointer' }}>
          <h4>Дорожные карты</h4>
          <p>Пошаговые планы обучения от нуля до первой работы.</p>
          <button className="circle-btn"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;

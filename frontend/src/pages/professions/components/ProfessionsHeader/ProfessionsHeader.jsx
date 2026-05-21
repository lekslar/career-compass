import './ProfessionsHeader.css';

function ProfessionsHeader() {
  return (
    <div className="professions-header">
      <h2 className="hero-title">Профессии</h2>
      <p className="hero-subtitle" style={{ marginTop: '24px', marginBottom: '60px' }}>
        Посмотри какие направления профессий тебе могут быть интересны и совпадают с твоими навыками
      </p>
    </div>
  );
}

export default ProfessionsHeader;

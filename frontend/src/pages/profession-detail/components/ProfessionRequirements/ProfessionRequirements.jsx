import './ProfessionRequirements.css';

function ProfessionRequirements({ profession }) {
  return (
    <section className="profession-section">
      <h2 className="section-title">Требования к специалисту</h2>
      <div className="requirements-grid">
        <div className="requirement-card">
          <h3>Образование</h3>
          <p>{profession.requirements.education}</p>
        </div>
        <div className="requirement-card">
          <h3>Сертификаты</h3>
          <p>{profession.requirements.certificates}</p>
        </div>
        <div className="requirement-card">
          <h3>Опыт</h3>
          <p>{profession.requirements.experience}</p>
        </div>
      </div>
    </section>
  );
}

export default ProfessionRequirements;

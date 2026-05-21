import './ProfessionCareerPath.css';

function ProfessionCareerPath({ profession }) {
  return (
    <section className="profession-section">
      <h2 className="section-title">Карьерный путь и зарплата</h2>
      <div className="career-path">
        {profession.careerPath.map((stage, idx) => (
          <div key={idx} className="career-stage">
            <div className="career-stage-header">
              <div className="career-stage-number">{idx + 1}</div>
              <div className="career-stage-info">
                <h3>{stage.level}</h3>
                <p className="career-salary">{stage.salary}</p>
              </div>
            </div>
            <p className="career-description">{stage.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfessionCareerPath;

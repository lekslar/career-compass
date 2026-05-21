import './ProfessionSkills.css';

function ProfessionSkills({ profession }) {
  return (
    <section className="profession-section">
      <h2 className="section-title">Ключевые навыки</h2>
      <div className="skills-grid">
        {profession.keySkills.map((skill, idx) => (
          <div key={idx} className="skill-card">
            <div className="skill-header">
              <h4>{skill.name}</h4>
              <span className={`skill-level ${skill.level.toLowerCase().replace('/', '-')}`}>
                {skill.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfessionSkills;

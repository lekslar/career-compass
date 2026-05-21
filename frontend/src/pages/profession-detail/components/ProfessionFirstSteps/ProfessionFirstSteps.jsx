import './ProfessionFirstSteps.css';

function ProfessionFirstSteps({ profession }) {
  return (
    <section className="profession-section">
      <h2 className="section-title">Первые шаги в профессию</h2>
      <div className="first-steps">
        {profession.firstSteps.map((step, idx) => (
          <div key={idx} className="first-step">
            <div className="step-number">{idx + 1}</div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProfessionFirstSteps;

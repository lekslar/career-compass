function ProfessionAbout({ profession }) {
  return (
    <section className="profession-section">
      <h2 className="section-title">О профессии</h2>
      <p className="section-text">{profession.fullDescription}</p>
    </section>
  );
}

export default ProfessionAbout;

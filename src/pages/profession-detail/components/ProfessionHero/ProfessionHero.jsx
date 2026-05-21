import './ProfessionHero.css';

function ProfessionHero({ profession }) {
  const IconComponent = profession.icon;
  return (
    <div className={`profession-hero ${profession.color}`}>
      <div className="profession-hero-content">
        <div className="profession-icon-wrapper profession-hero-icon">
          <IconComponent size={96} strokeWidth={1.5} />
        </div>
        <h1 className="profession-hero-title">{profession.title}</h1>
        <p className="profession-hero-subtitle">{profession.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProfessionHero;

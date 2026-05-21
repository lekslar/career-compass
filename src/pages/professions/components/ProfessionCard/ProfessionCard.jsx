import './ProfessionCard.css';

function ProfessionCard({ profession, onClick }) {
  const IconComponent = profession.icon;
  return (
    <div 
      className={`profession-card ${profession.color}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="profession-icon-wrapper">
        <IconComponent size={64} strokeWidth={1.5} />
      </div>
      <h3 className="profession-title">{profession.title}</h3>
    </div>
  );
}

export default ProfessionCard;

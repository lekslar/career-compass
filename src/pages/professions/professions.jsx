import { useNavigate } from 'react-router-dom';
import { professionsData } from '../../data/professionsData';
import ProfessionsHeader from './components/ProfessionsHeader/ProfessionsHeader';
import ProfessionCard from './components/ProfessionCard/ProfessionCard';

function ProfessionsPage() {
  const navigate = useNavigate();

  return (
    <section className="view active">
      <ProfessionsHeader />

      <div className="professions-grid">
        {professionsData.map((profession) => (
          <ProfessionCard 
            key={profession.id}
            profession={profession}
            onClick={() => navigate(`/profession/${profession.slug}`)}
          />
        ))}
      </div>
    </section>
  );
}

export default ProfessionsPage;

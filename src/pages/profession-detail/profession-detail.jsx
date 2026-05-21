import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { professionsData } from '../../data/professionsData';
import ProfessionHero from './components/ProfessionHero/ProfessionHero';
import ProfessionAbout from './components/ProfessionAbout/ProfessionAbout';
import ProfessionSkills from './components/ProfessionSkills/ProfessionSkills';
import ProfessionRequirements from './components/ProfessionRequirements/ProfessionRequirements';
import ProfessionCareerPath from './components/ProfessionCareerPath/ProfessionCareerPath';
import ProfessionFirstSteps from './components/ProfessionFirstSteps/ProfessionFirstSteps';
import ProfessionResources from './components/ProfessionResources/ProfessionResources';

function ProfessionDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const profession = professionsData.find(p => p.slug === slug);

  if (!profession) {
    return (
      <section className="view active">
        <div className="error-page">
          <h2>Профессия не найдена</h2>
          <button className="btn-primary" onClick={() => navigate('/professions')}>
            Вернуться к профессиям
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="view active">
      <button 
        className="back-button"
        onClick={() => navigate('/professions')}
      >
        <ArrowLeft size={20} />
        Вернуться
      </button>

      <ProfessionHero profession={profession} />
      <ProfessionAbout profession={profession} />
      <ProfessionSkills profession={profession} />
      <ProfessionRequirements profession={profession} />
      <ProfessionCareerPath profession={profession} />
      <ProfessionFirstSteps profession={profession} />
      <ProfessionResources profession={profession} />
    </section>
  );
}

export default ProfessionDetailPage;

import HeroSection from './components/HeroSection/HeroSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import ServicesSection from './components/ServicesSection/ServicesSection';

function MainPage() {
  return (
    <section className="view active">
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
    </section>
  );
}

export default MainPage;

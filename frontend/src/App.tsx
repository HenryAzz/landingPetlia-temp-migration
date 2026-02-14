import { useState, useCallback, useEffect } from 'react';
import Navbar from "./Navbar";
import WelcomeScreen from "./WelcomeScreen";
import TalkToSomeoneScreen from "./TalkToSomeoneScreen";
import EverythingGoodScreen from "./EverythingGoodScreen";
import HowItWorksScreen from "./HowItWorksScreen";
import WaveDivider from "./WaveDivider";
import ChooseYourBondScreen from "./ChooseYourBondScreen";
import ExperiencesScreen from "./ExperiencesScreen";
import TestimonialsScreen from "./TestimonialsScreen";
import PricingScreen from "./PricingScreen";
import FAQScreen from "./faqs";
import ContactScreen from "./ContactScreen";
import JoinTeamScreen from "./JoinTeamScreen";
import Footer from "./Footer";
import BlueSectionDivider from './BlueSectionDivider';
import WhiteSectionDivider from './WhiteSectionDivider';
import Loader from './Loader';

function App() {
  const [preSelectedPlan, setPreSelectedPlan] = useState('');
  const [currentPage, setCurrentPage] = useState<'main' | 'joinTeam'>('main');
  const [loading, setLoading] = useState(true);
  const [loaderFinished, setLoaderFinished] = useState(false);

  // 👇 Esto hace que SIEMPRE empiece arriba al recargar
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoaderFinish = useCallback(() => {
    setLoading(false);
    setLoaderFinished(true);
  }, []);

  const handleNavigateToJoinTeam = () => {
    setCurrentPage('joinTeam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBackToMain = () => {
    setCurrentPage('main');
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (currentPage === 'joinTeam') {
    return (
      <div className="w-full">
        <JoinTeamScreen onGoBack={handleGoBackToMain} />
      </div>
    );
  }

  return (
    <div className="w-full">
      {loading && <Loader onFinish={handleLoaderFinish} />}

      <Navbar 
        onNavigateToJoinTeam={handleNavigateToJoinTeam} 
        loaderFinished={loaderFinished} 
      />

      <WelcomeScreen loaderFinished={loaderFinished} />
      <TalkToSomeoneScreen />
      <EverythingGoodScreen />
      <WaveDivider />

      <HowItWorksScreen />
      <BlueSectionDivider text="Ahora elegí lo que más te represente" />
      <ChooseYourBondScreen />
      <BlueSectionDivider text="Y hay mucho más por descubrir" />
      <ExperiencesScreen />
      <WaveDivider />
      <TestimonialsScreen />
      <WhiteSectionDivider />
      <PricingScreen onSelectPlan={setPreSelectedPlan} />
      <WhiteSectionDivider />
      <FAQScreen />
      <WaveDivider />

      <ContactScreen
        preSelectedPlan={preSelectedPlan}
        onNavigateToJoinTeam={handleNavigateToJoinTeam}
      />
      <WaveDivider />

      <Footer />
    </div>
  );
}

export default App;

import { useState, useCallback, useEffect } from "react";
import Navbar from "./Navbar";
import WelcomeScreen from "./WelcomeScreen";
import Footer from "./Footer";
import Loader from "./Loader";
import WhatsAppFloat from "./WhatsAppFloat";
import ExitIntentModal from "./ExitIntentModal";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import FeaturesSection from "./FeaturesSection";
import BusinessSection from "./BusinessSection";
import AppScreensSection from "./AppScreensSection";
import ManifestoBanner from "./ManifestoBanner";
import RoadmapSection from "./RoadmapSection";
import CTASection from "./CTASection";

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoaderFinish = useCallback(() => {
    setLoading(false);
    setLoaderFinished(true);
  }, []);

  return (
    <div className="w-full bg-[#F9FAFB]">
      {loading && <Loader onFinish={handleLoaderFinish} />}
      <Navbar />
      <WelcomeScreen loaderFinished={loaderFinished} />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <BusinessSection />
      <AppScreensSection />
      <ManifestoBanner />
      <RoadmapSection />
      <CTASection />
      <Footer />
      <ExitIntentModal />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
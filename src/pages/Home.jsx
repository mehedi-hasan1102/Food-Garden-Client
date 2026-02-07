import HeroSection from "../Components/HeroSection";

import OverviewSection from "../Components/OverviewSection";
import FeaturesSection from "../Components/FeaturesSection";
import ExtraSections from "../Components/ExtraSections";
import ExtraSection2 from "../Components/ExtraSection2";
import DynamicSections from "../Components/DynamicSections";
import StatsSection from "../Components/StatsSection";
import AlertsSection from "../Components/AlertsSection";
import CTASection from "../Components/CTASection";

const Home = () => {
  return (
    <>
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <DynamicSections />
        <OverviewSection />
        <FeaturesSection />
        <AlertsSection />
        <StatsSection />
        <ExtraSections />
        <ExtraSection2 />
        <CTASection />
      </div>
    </div>
    
    </>
  );
};

export default Home;

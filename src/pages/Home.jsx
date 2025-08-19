import HeroSection from "../Components/HeroSection";

import ExtraSections from "../Components/ExtraSections";
import ExtraSection2 from "../Components/ExtraSection2";
import DynamicSections from "../Components/DynamicSections";
import StatsSection from "../Components/StatsSection";

const Home = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto">
      <HeroSection />

      <DynamicSections />
      <StatsSection />
      <ExtraSections />
      <ExtraSection2 />
      </div>
    </>
  );
};

export default Home;

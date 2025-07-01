import HeroSection from "../Components/HeroSection";

import ExtraSections from "../Components/ExtraSections";
import ExtraSection2 from "../Components/ExtraSection2";
import DynamicSections from "../Components/DynamicSections";
import StatsSection from "../Components/StatsSection";

const Home = () => {
  return (
    <>
      <HeroSection />

      <DynamicSections />
      <StatsSection />
      <ExtraSections />
      <ExtraSection2 />
      
    </>
  );
};

export default Home;

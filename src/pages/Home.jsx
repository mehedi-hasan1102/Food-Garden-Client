import HeroSection from "../Components/HeroSection";

import ExtraSections from "../Components/ExtraSections";
import ExtraSection2 from "../Components/ExtraSection2";
import DynamicSections from "../Components/DynamicSections";

const Home = () => {
  return (
    <>
      <HeroSection />

      <DynamicSections />
      <ExtraSections />
      <ExtraSection2 />
    </>
  );
};

export default Home;

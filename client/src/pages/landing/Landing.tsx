import {
  ActionBtns,
  FeaturesSection,
  HeroSection,
} from "./components";

const Landing = () => {
  return (
    <div className="landing-page container flex-center flex-col">
      <HeroSection>
        <ActionBtns />
      </HeroSection>
      <FeaturesSection />
    </div>
  );
};

export default Landing;

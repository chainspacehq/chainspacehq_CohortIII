import ChainspaceHero from "@/components/ChainspaceHero";
import ValueExplosion from "@/components/ValueExplosion";
import LearningPath from "@/components/LearningPath";
import ProgramDetails from "@/components/ProgramDetails";
import FirstCohort from "@/components/FirstCohort";
import SecondCohort from "@/components/SecondCohort";
import VolunteerOpportunities from "@/components/VolunteerOpportunities";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="dark">
      <ChainspaceHero />
      <ValueExplosion />
      <LearningPath />
      <ProgramDetails />
      <FirstCohort />
      <SecondCohort />
      <VolunteerOpportunities />
      
      <Footer />
    </div>
  );
};

export default Index;

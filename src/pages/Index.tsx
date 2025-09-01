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
    <div className="flex flex-col mx-auto px-3 sm:px-6 lg:px-8 w-full items-center justify-center dark min-h-screen max-w-full lg:max-w-[64rem]">
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

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ApplicationFormModal from './ApplicationFormModal';
const ChainspaceHero = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  return <section className="relative min-h-screen bg-chainspace-black flex items-center justify-center overflow-hidden">
      {/* Geometric Background Lines */}
      <div className="geometric-lines"></div>
      
      {/* Main Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        {/* ChainspaceHQ Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img 
              src="/lovable-uploads/0df41d9e-100b-4fb8-a515-8f886791bc31.png" 
              alt="ChainspaceHQ Logo" 
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h2 className="text-2xl md:text-3xl font-monument text-chainspace-white">
              CHAINSPACE<span className="text-chainspace-orange">HQ</span>
            </h2>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="text-center mb-8 md:mb-12">
          <img src="/lovable-uploads/a47bd7b0-429a-4aa9-a57b-33afd1364a10.png" alt="Chainspace Cohort III - 100% Tuition Sponsored Program" className="max-w-4xl w-full mx-auto rounded-lg shadow-2xl" />
        </div>

        {/* Main Content Grid */}
        

        {/* Registration Status */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-chainspace-orange text-chainspace-black px-6 py-2 rounded-full mb-6">
            <span className="text-lg font-aspekta font-bold">✦ REGISTRATION ONGOING</span>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="text-center mb-8 max-w-4xl mx-auto">
          <div className="border-2 border-chainspace-orange rounded-lg p-4 md:p-6 bg-chainspace-black/50">
            <div className="text-chainspace-orange font-aspekta text-base md:text-lg font-bold mb-4">
              [STARTING <span className="text-chainspace-white">15-09-2025</span> — ENDS <span className="text-chainspace-white">05-12-2025</span>.....]
            </div>
            <div className="text-chainspace-white font-aspekta text-base md:text-lg font-bold mb-2">
              EVERY MONDAY, WEDNESDAY, FRIDAY
            </div>
            <div className="text-chainspace-white font-aspekta text-base md:text-lg font-bold">
              5:00 PM EVERY CLASS DAYS
            </div>
            <div className="mt-4 text-chainspace-orange font-aspekta text-sm md:text-base">
              <span className="font-bold">Venue:</span> <span className="text-chainspace-white">Chainspace HQ Hub, Mboho Mkparawa Ibibio Hall, Uyo, Nigeria</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-8">
          <Button size="lg" className="explosive-btn font-monument px-6 md:px-12 py-4 md:py-6 text-lg md:text-xl font-black rounded-full" onClick={() => setIsApplicationModalOpen(true)}>
            <span className="hidden sm:inline">APPLY NOW - 40 SPOTS ONLY</span>
            <span className="sm:hidden">APPLY NOW</span>
          </Button>
        </div>

        {/* Commitment Badge */}
        <div className="text-center mb-12">
          <div className="inline-block bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-full px-6 py-3">
            <span className="text-chainspace-orange font-aspekta font-bold">YOUR COMMITMENT: ₦20,000 LOGISTICS ONLY</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center border-t border-chainspace-orange/30 pt-8">
          <div className="text-chainspace-orange font-aspekta text-sm font-bold mb-4">
            For inquiries
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-chainspace-white font-aspekta text-sm">
            <div className="flex items-center gap-2">
              <span>✕</span>
              <span>ChainspaceHQ</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <span>www.chainspacehq.com</span>
            </div>
            <div>
              0916-381-9499, 0911-600-5085
            </div>
          </div>
        </div>
      </div>

      <ApplicationFormModal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} />
    </section>;
};
export default ChainspaceHero;
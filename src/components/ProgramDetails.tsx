import { Calendar, Clock, Users, MapPin, Award, Laptop, CheckCircle, DollarSign } from "lucide-react";

const ProgramDetails = () => {
  const details = [
    { icon: Calendar, title: "DURATION", value: "12 Weeks", description: "3 Intensive Months" },
    { icon: Clock, title: "SCHEDULE", value: "Mon, Wed, Fri", description: "5:00 PM Every Class" },
    { icon: MapPin, title: "FORMAT", value: "In-Person", description: "ChainspaceHQ Uyo" },
    { icon: Users, title: "CLASS SIZE", value: "40 Maximum", description: "Small Cohort Focus" },
    { icon: Award, title: "CERTIFICATE", value: "Blockchain Dev", description: "Industry Recognized" },
    { icon: Laptop, title: "REQUIREMENTS", value: "Laptop Required", description: "Minimum Specs Apply" }
  ];

  const requirements = [
    { icon: Laptop, title: "Functional Laptop Required", description: "Minimum 8GB RAM, 256GB storage, ability to run development tools", critical: true },
    { icon: Clock, title: "Commitment to 21+ Hours/Week", description: "3 months dedication: 3 classes + self-study + project work", critical: true },
    { icon: Users, title: "Team Collaboration", description: "Willingness to work on group projects and peer programming", critical: false },
    { icon: MapPin, title: "Location Flexibility", description: "Based in or able to relocate to Uyo, Akwa Ibom for in-person classes", critical: true },
    { icon: DollarSign, title: "₦20,000 Logistics Commitment", description: "Covers meals, materials, and workspace maintenance (refundable with conditions)", critical: true }
  ];

  const idealCandidate = [
    "Complete beginner or self-taught developer looking to level up",
    "Recent graduate interested in technology career",
    "Career changer seeking skills in Web3 space",
    "Entrepreneur wanting to build blockchain-based solutions",
    "Tech enthusiast ready to commit to intensive learning"
  ];

  return (
    <section className="relative bg-chainspace-black py-16 md:py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="explosion-text text-3xl md:text-5xl font-black text-chainspace-white mb-4">PROGRAM DETAILS</h2>
          <p className="text-chainspace-orange text-lg md:text-xl font-semibold">EVERYTHING YOU NEED TO KNOW</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {details.map((detail, i) => (
            <div key={i} className="group">
              <div className="bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-6 h-full text-center transform transition-transform duration-300 group-hover:scale-105 flex flex-col justify-between">
                <div className="flex justify-center mb-4">
                  <div className="bg-chainspace-orange p-4 rounded-full">
                    <detail.icon className="w-8 h-8 text-chainspace-black" />
                  </div>
                </div>
                <h3 className="text-chainspace-orange font-black text-lg mb-2">{detail.title}</h3>
                <div className="text-chainspace-white font-bold text-xl mb-2">{detail.value}</div>
                <p className="text-chainspace-white text-sm opacity-75">{detail.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included Section */}
        <div className="bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-6 md:p-10 mb-16">
          <h3 className="explosion-text text-2xl md:text-4xl font-black text-chainspace-orange text-center mb-8">WHAT'S INCLUDED</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: "Workspace Access", text: "24/7 access to ChainspaceHQ coworking space during program duration" },
              { title: "Expert Mentorship", text: "Direct access to experienced blockchain developers and industry professionals" },
              { title: "Development Tools", text: "Premium subscriptions to development platforms and testing environments" },
              { title: "Project Portfolio", text: "Build 3-5 real-world projects to showcase your skills to employers" },
              { title: "Industry Certificate", text: "Certification recognized by Web3 companies and blockchain startups" },
              { title: "Career Support", text: "Job placement assistance and connections to Web3 companies in Nigeria and globally" }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full" />
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="explosion-text text-3xl md:text-5xl font-black text-chainspace-white mb-4">READY TO TRANSFORM?</h2>
          <p className="text-chainspace-orange text-lg md:text-xl font-semibold">REQUIREMENTS FOR COHORT III</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {requirements.map((req, i) => (
            <div key={i} className="group relative">
              <div className={`border-2 rounded-2xl p-6 h-full transform transition-transform duration-300 group-hover:scale-105 flex flex-col justify-between ${req.critical ? 'bg-chainspace-dark-gray border-chainspace-orange' : 'bg-chainspace-black border-chainspace-orange opacity-80'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-chainspace-orange p-4 rounded-full mb-4">
                    <req.icon className="w-8 h-8 text-chainspace-black" />
                  </div>
                  <h3 className="text-chainspace-white font-black text-lg mb-3 leading-tight">{req.title}</h3>
                  <p className="text-chainspace-white text-sm opacity-75 leading-relaxed">{req.description}</p>
                  <div className="mt-4"><CheckCircle className="w-6 h-6 text-chainspace-orange" /></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ideal Candidate and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start mb-16">
          <div>
            <h3 className="explosion-text text-2xl md:text-4xl font-black text-chainspace-orange mb-6">IDEAL CANDIDATE</h3>
            <div className="space-y-4">
              {idealCandidate.map((trait, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-chainspace-black rounded-full" />
                  </div>
                  <p className="text-chainspace-white text-sm leading-relaxed">{trait}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-chainspace-dark-gray border border-chainspace-orange rounded-lg">
              <h4 className="text-chainspace-orange font-bold text-lg mb-3">No Prior Experience? No Problem!</h4>
              <p className="text-chainspace-white text-sm leading-relaxed">
                Our curriculum is designed for beginners. We have trained students from diverse backgrounds including accounting, marketing, and farming. <span className="text-chainspace-orange font-semibold">Your passion and commitment matter more than your current skill level.</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
            <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-6 text-center">APPLICATION TIMELINE</h3>
            <div className="space-y-6">
              {["Submit Application","Review Process","Interview Call","Confirmation"].map((step, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="bg-chainspace-black text-chainspace-orange rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">{i+1}</div>
                  <div>
                    <h4 className="text-chainspace-black font-bold">{step}</h4>
                    <p className="text-chainspace-black text-sm">
                      {i===0 && "Complete online form with requirements"}
                      {i===1 && "2-3 days application review"}
                      {i===2 && "Brief 15-minute phone interview"}
                      {i===3 && "Acceptance notification & next steps"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Commitment */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
            <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-4">TIME COMMITMENT</h3>
            <div className="text-chainspace-black font-bold text-lg">21+ HOURS PER WEEK • 3 MONTHS TOTAL</div>
            <div className="text-chainspace-black text-sm mt-2">Classes + Self-study + Project Work</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetails;

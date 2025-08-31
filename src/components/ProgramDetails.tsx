import { Calendar, Clock, Users, MapPin, Award, Laptop, CheckCircle, DollarSign } from "lucide-react";
const ProgramDetails = () => {
  const details = [{
    icon: Calendar,
    title: "DURATION",
    value: "12 Weeks",
    description: "3 Intensive Months",
    color: "text-chainspace-orange"
  }, {
    icon: Clock,
    title: "SCHEDULE",
    value: "Mon, Wed, Fri",
    description: "5:00 PM Every Class",
    color: "text-chainspace-orange"
  }, {
    icon: MapPin,
    title: "FORMAT",
    value: "In-Person",
    description: "ChainspaceHQ Uyo",
    color: "text-chainspace-orange"
  }, {
    icon: Users,
    title: "CLASS SIZE",
    value: "40 Maximum",
    description: "Small Cohort Focus",
    color: "text-chainspace-orange"
  }, {
    icon: Award,
    title: "CERTIFICATE",
    value: "Blockchain Dev",
    description: "Industry Recognized",
    color: "text-chainspace-orange"
  }, {
    icon: Laptop,
    title: "REQUIREMENTS",
    value: "Laptop Required",
    description: "Minimum Specs Apply",
    color: "text-chainspace-orange"
  }];
  const requirements = [{
    icon: Laptop,
    title: "Functional Laptop Required",
    description: "Minimum 8GB RAM, 256GB storage, ability to run development tools",
    critical: true
  }, {
    icon: Clock,
    title: "Commitment to 21+ Hours/Week",
    description: "3 months dedication: 3 classes + self-study + project work",
    critical: true
  }, {
    icon: Users,
    title: "Team Collaboration",
    description: "Willingness to work on group projects and peer programming",
    critical: false
  }, {
    icon: MapPin,
    title: "Location Flexibility",
    description: "Based in or can relocate to Uyo, Akwa Ibom for in-person classes",
    critical: true
  }, {
    icon: DollarSign,
    title: "₦20,000 Logistics Commitment",
    description: "Covers meals, materials, and workspace maintenance (refundable with conditions)",
    critical: true
  }];
  const idealCandidate = ["Complete beginner or self-taught developer looking to level up", "Recent graduate interested in cutting-edge technology career", "Career changer seeking high-demand skills in Web3 space", "Entrepreneur wanting to build blockchain-based solutions", "Tech enthusiast ready to commit to intensive learning"];
  return <section className="relative min-h-screen bg-chainspace-black py-20">
      <div className="geometric-lines opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-4">
            PROGRAM DETAILS
          </h2>
          <p className="text-chainspace-orange text-xl font-semibold">
            EVERYTHING YOU NEED TO KNOW
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {details.map((detail, index) => <div key={index} className="group">
              <div className="starburst bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-4 md:p-6 lg:p-8 h-full min-h-[200px] md:min-h-[280px] text-center transform transition-all duration-300 group-hover:scale-105 flex flex-col justify-between">
                <div className="flex justify-center mb-4">
                  <div className="starburst bg-chainspace-orange p-4 rounded-full">
                    <detail.icon className="w-8 h-8 text-chainspace-black" />
                  </div>
                </div>
                
                <h3 className="text-chainspace-orange font-black text-lg mb-2">
                  {detail.title}
                </h3>
                
                <div className="text-chainspace-white font-bold text-2xl mb-2">
                  {detail.value}
                </div>
                
                <p className="text-chainspace-white text-sm opacity-75">
                  {detail.description}
                </p>
              </div>
            </div>)}
        </div>

        {/* What's Included Section */}
        <div className="bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-8 md:p-12">
          <h3 className="explosion-text text-3xl md:text-4xl font-black text-chainspace-orange text-center mb-8">
            WHAT'S INCLUDED
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">Workspace Access</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">24/7 access to ChainspaceHQ coworking space during program duration</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">Expert Mentorship</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">Direct access to experienced blockchain developers and industry professionals</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">Development Tools</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">Premium subscriptions to development platforms and testing environments</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">Project Portfolio</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">Build 3-5 real-world projects to showcase your skills to potential employers</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">Industry Certificate</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">Official certification recognized by Web3 companies and blockchain startups</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-chainspace-white font-bold text-lg mb-1">Career Support</h4>
                  <p className="text-chainspace-white opacity-75 text-sm">Job placement assistance and connections to Web3 companies in Nigeria and globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Transform Section */}
        <div className="mt-24 text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-4">
            READY TO TRANSFORM?
          </h2>
          <p className="text-chainspace-orange text-xl font-semibold">
            REQUIREMENTS FOR COHORT III
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {requirements.map((req, index) => <div key={index} className="relative group">
               <div className={`starburst border-2 rounded-2xl p-4 md:p-6 h-full min-h-[250px] md:min-h-[320px] transform transition-all duration-300 group-hover:scale-105 flex flex-col justify-between ${req.critical ? 'bg-chainspace-dark-gray border-chainspace-orange' : 'bg-chainspace-black border-chainspace-orange opacity-80'}`}>
                {/* Critical Badge */}
                {req.critical && <div className="absolute -top-3 -right-3">
                    
                  </div>}

                <div className="flex flex-col items-center text-center">
                  <div className="starburst bg-chainspace-orange p-4 rounded-full mb-4">
                    <req.icon className="w-8 h-8 text-chainspace-black" />
                  </div>
                  
                  <h3 className="text-chainspace-white font-black text-lg mb-3 leading-tight">
                    {req.title}
                  </h3>
                  
                  <p className="text-chainspace-white text-sm opacity-75 leading-relaxed">
                    {req.description}
                  </p>

                  <div className="mt-4">
                    <CheckCircle className="w-6 h-6 text-chainspace-orange" />
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {/* Ideal Candidate Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="explosion-text text-3xl md:text-4xl font-black text-chainspace-orange mb-8">
              IDEAL CANDIDATE
            </h3>
            
            <div className="space-y-4">
              {idealCandidate.map((trait, index) => <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-chainspace-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-chainspace-black rounded-full"></div>
                  </div>
                  <p className="text-chainspace-white text-sm leading-relaxed">
                    {trait}
                  </p>
                </div>)}
            </div>

            <div className="mt-8 p-6 bg-chainspace-dark-gray border border-chainspace-orange rounded-lg">
              <h4 className="text-chainspace-orange font-bold text-lg mb-3">
                No Prior Experience? No Problem!
              </h4>
              <p className="text-chainspace-white text-sm leading-relaxed">
                Our curriculum is designed for complete beginners. We've successfully trained 
                students from diverse backgrounds including accounting, marketing, and even 
                farming. <span className="text-chainspace-orange font-semibold">
                Your passion and commitment matter more than your current skill level.
                </span>
              </p>
            </div>
          </div>

          <div className="starburst bg-gradient-to-br from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
            <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-6 text-center">
              APPLICATION TIMELINE
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-chainspace-black text-chainspace-orange rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-chainspace-black font-bold">Submit Application</h4>
                  <p className="text-chainspace-black text-sm">Complete online form with requirements</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-chainspace-black text-chainspace-orange rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-chainspace-black font-bold">Review Process</h4>
                  <p className="text-chainspace-black text-sm">2-3 days application review</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-chainspace-black text-chainspace-orange rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-chainspace-black font-bold">Interview Call</h4>
                  <p className="text-chainspace-black text-sm">Brief 15-minute phone interview</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-chainspace-black text-chainspace-orange rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="text-chainspace-black font-bold">Confirmation</h4>
                  <p className="text-chainspace-black text-sm">Acceptance notification & next steps</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-chainspace-black text-chainspace-orange px-6 py-3 rounded-full inline-block">
                <span className="font-bold text-sm">APPLICATIONS CLOSE: September 10, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Commitment */}
        <div className="mt-16 text-center">
          <div className="inline-block starburst bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
            <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-4">
              TIME COMMITMENT
            </h3>
            <div className="text-chainspace-black font-bold text-lg">
              21+ HOURS PER WEEK • 3 MONTHS TOTAL
            </div>
            <div className="text-chainspace-black text-sm mt-2">
              Classes + Self-study + Project Work
            </div>
          </div>
        </div>

      </div>
    </section>;
};
export default ProgramDetails;
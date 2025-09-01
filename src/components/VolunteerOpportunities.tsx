import { Palette, Users, Wifi, Lightbulb, MapPin, Clock } from "lucide-react";
import creativeWorkspace from "@/assets/creative-team-workspace.jpg";

const VolunteerOpportunities = () => {
  return (
    <section className="relative min-h-screen bg-chainspace-black py-20 overflow-x-hidden overflow-y-hidden">
      <div className="geometric-lines opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-chainspace-orange text-chainspace-black px-6 py-2 rounded-full font-bold mb-6">
            VOLUNTEER OPPORTUNITY
          </div>
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-6">
            Join as a Creative Designer Volunteer
          </h2>
          <p className="text-chainspace-white text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Shape the future of Web3 education through innovative design. Work with our team to create 
            compelling visual experiences that inspire and educate the next generation of blockchain developers.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Left Side - Position Info */}
          <div className="space-y-8">
            {/* Position Details */}
            <div className="starburst bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-chainspace-orange rounded-full p-3">
                  <Palette className="w-8 h-8 text-chainspace-black" />
                </div>
                <div>
                  <h3 className="text-chainspace-orange font-black text-2xl">Creative Designer</h3>
                  <p className="text-chainspace-white font-semibold">2 Positions Available</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-chainspace-orange" />
                  <span className="text-chainspace-white">Remote or Onsite Flexibility</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-chainspace-orange" />
                  <span className="text-chainspace-white">Flexible Hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-chainspace-orange" />
                  <span className="text-chainspace-white">Collaborative Team Environment</span>
                </div>
              </div>
            </div>

            {/* Role Description */}
            <div className="bg-chainspace-black border border-chainspace-orange rounded-2xl p-6">
              <h4 className="text-chainspace-orange font-bold text-lg mb-4">What You'll Do</h4>
              <ul className="space-y-2 text-chainspace-white">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-chainspace-orange rounded-full mt-2"></div>
                  <span>Design engaging educational materials and course content</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-chainspace-orange rounded-full mt-2"></div>
                  <span>Create visual assets for web and social media platforms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-chainspace-orange rounded-full mt-2"></div>
                  <span>Collaborate on brand identity and user experience design</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            {/* Creative Workspace Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={creativeWorkspace} 
                alt="Creative team workspace with modern design tools and collaborative environment"
                className="w-full h-40 sm:h-56 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chainspace-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-chainspace-white font-black text-2xl mb-2">Join Our Creative Space</h3>
                <p className="text-chainspace-white text-sm opacity-90">
                  Work in a modern, collaborative environment with all the tools and resources you need to succeed
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="text-center">
              <div className="orbital relative w-32 h-32 mx-auto bg-chainspace-orange rounded-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Users className="w-16 h-16 text-chainspace-black" />
                </div>
                
                {/* Orbiting elements */}
                <div className="orbital-element top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-chainspace-white p-2 rounded-full">
                    <Palette className="w-4 h-4 text-chainspace-orange" />
                  </div>
                </div>
                <div className="orbital-element top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="bg-chainspace-white p-2 rounded-full">
                    <Lightbulb className="w-4 h-4 text-chainspace-orange" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a 
            href="https://wa.me/2348104273165" 
            target="_blank" 
            rel="noopener noreferrer"
            className="explosive-btn px-6 md:px-12 py-3 md:py-6 text-lg md:text-xl font-black rounded-full inline-block w-full sm:w-auto text-center"
          >
            APPLY NOW
          </a>
          <p className="text-chainspace-white opacity-75 mt-4">
            Ready to make an impact? Join our creative team today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default VolunteerOpportunities;

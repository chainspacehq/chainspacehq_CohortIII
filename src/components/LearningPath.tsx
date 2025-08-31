const LearningPath = () => {
  const months = [{
    title: "MONTH 1",
    subtitle: "FOUNDATION EXPLOSION",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    description: "Build your Web2 foundation with modern front-end technologies"
  }, {
    title: "MONTH 2",
    subtitle: "BLOCKCHAIN IMMERSION",
    technologies: ["Solidity", "Flow EVM", "Smart Contracts", "Web3.js"],
    description: "Dive deep into blockchain development and smart contract programming"
  }, {
    title: "MONTH 3",
    subtitle: "DAPP DEPLOYMENT",
    technologies: ["Full-Stack dApps", "Testing", "Deployment", "IPFS"],
    description: "Build and deploy production-ready decentralized applications"
  }];
  const bonusTopics = ["Tokenomics", "DAOs", "ENS Integration", "DeFi Protocols"];
  return <section className="relative min-h-screen bg-chainspace-black py-20">
      <div className="geometric-lines opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-4">
            WHAT YOU'LL LEARN
          </h2>
          <p className="text-chainspace-orange text-xl font-semibold">
            12 WEEKS OF INTENSIVE TRANSFORMATION
          </p>
        </div>

        {/* Learning Timeline */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {months.map((month, index) => <div key={index} className="relative group">
              {/* Connecting Line (Desktop) */}
              {index < months.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-chainspace-orange transform -translate-y-1/2 z-10">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-chainspace-orange rounded-full transform translate-x-1 -translate-y-1/2"></div>
                </div>}
              
              <div className="starburst bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="explosion-text text-2xl md:text-3xl font-black text-chainspace-orange mb-2">
                    {month.title}
                  </h3>
                  <p className="text-chainspace-white font-bold text-lg">
                    {month.subtitle}
                  </p>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {month.technologies.map((tech, techIndex) => <div key={techIndex} className="bg-chainspace-orange text-chainspace-black text-center py-2 px-3 rounded-full text-sm font-bold transform hover:scale-110 transition-transform duration-200">
                      {tech}
                    </div>)}
                </div>

                <p className="text-chainspace-white text-sm leading-relaxed">
                  {month.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-6 bg-chainspace-black rounded-full h-2 overflow-hidden">
                  <div className="bg-chainspace-orange h-full rounded-full transition-all duration-1000" style={{
                width: `${(index + 1) / months.length * 100}%`
              }}></div>
                </div>
              </div>
            </div>)}
        </div>

        {/* Bonus Section */}
        <div className="text-center">
          <div className="inline-block">
            <div className="starburst bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
              <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-4">
                BONUS MODULES
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {bonusTopics.map((topic, index) => <div key={index} className="bg-chainspace-black text-chainspace-orange border border-chainspace-orange rounded-full px-4 py-2 text-sm font-bold">
                    {topic}
                  </div>)}
              </div>
              
              <p className="text-chainspace-black font-semibold">
                Advanced topics to accelerate your Web3 journey
              </p>
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          
        </div>
      </div>
    </section>;
};
export default LearningPath;
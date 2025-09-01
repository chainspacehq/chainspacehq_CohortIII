const LearningPath = () => {
  const months = [
    {
      title: "MONTH 1",
      subtitle: "FOUNDATION EXPLOSION",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      description:
        "Build your Web2 foundation with modern front-end technologies",
    },
    {
      title: "MONTH 2",
      subtitle: "BLOCKCHAIN IMMERSION",
      technologies: ["Solidity", "Flow EVM", "Smart Contracts", "Web3.js"],
      description:
        "Dive deep into blockchain development and smart contract programming",
    },
    {
      title: "MONTH 3",
      subtitle: "DAPP DEPLOYMENT",
      technologies: ["Full-Stack dApps", "Testing", "Deployment", "IPFS"],
      description:
        "Build and deploy production-ready decentralized applications",
    },
  ];

  const bonusTopics = ["Tokenomics", "DAOs", "ENS Integration", "DeFi Protocols"];

  return (
    <section className="relative bg-chainspace-black py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="geometric-lines opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-4">
            WHAT YOU'LL LEARN
          </h2>
          <p className="text-chainspace-orange text-xl font-semibold">
            12 WEEKS OF INTENSIVE TRANSFORMATION
          </p>
        </div>

        {/* Learning Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {months.map((month, index) => (
            <div
              key={index}
              className="bg-chainspace-dark-gray border-2 border-chainspace-orange rounded-2xl p-8 h-full transform transition-all duration-300 hover:scale-105"
            >
              <div className="text-center mb-6">
                <h3 className="explosion-text text-2xl md:text-3xl font-black text-chainspace-orange mb-2">
                  {month.title}
                </h3>
                <p className="text-chainspace-white font-bold text-lg">
                  {month.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {month.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="bg-chainspace-orange text-chainspace-black text-center py-2 px-3 rounded-full text-sm font-bold transition-transform duration-200 hover:scale-110"
                  >
                    {tech}
                  </div>
                ))}
              </div>

              <p className="text-chainspace-white text-sm leading-relaxed mb-6">
                {month.description}
              </p>

              <div className="bg-chainspace-black rounded-full h-2 overflow-hidden">
                <div
                  className="bg-chainspace-orange h-full rounded-full transition-all duration-1000"
                  style={{ width: `${((index + 1) / months.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bonus Section */}
        <div className="text-center">
          <div className="inline-block">
            <div className="bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
              <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-4">
                BONUS MODULES
              </h3>

              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {bonusTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-chainspace-black text-chainspace-orange border border-chainspace-orange rounded-full px-4 py-2 text-sm font-bold"
                  >
                    {topic}
                  </div>
                ))}
              </div>

              <p className="text-chainspace-black font-semibold">
                Advanced topics to accelerate your Web3 journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPath;

const ValueExplosion = () => {
  const valueBreakdown = [{
    label: "Mentorship & Training",
    value: "₦150,000",
    position: "top-left"
  }, {
    label: "Workspace Access",
    value: "₦37,000",
    position: "top-right"
  }, {
    label: "Tools & Resources",
    value: "₦86,000",
    position: "bottom-left"
  }, {
    label: "Certificate & Portfolio",
    value: "₦27,000",
    position: "bottom-right"
  }];
  const getPositionClass = (position: string) => {
    const positions = {
      "top-left": "lg:absolute lg:top-1/4 lg:left-1/4 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2",
      "top-right": "lg:absolute lg:top-1/4 lg:right-1/4 lg:transform lg:translate-x-1/2 lg:-translate-y-1/2", 
      "bottom-left": "lg:absolute lg:bottom-1/4 lg:left-1/4 lg:transform lg:-translate-x-1/2 lg:translate-y-1/2",
      "bottom-right": "lg:absolute lg:bottom-1/4 lg:right-1/4 lg:transform lg:translate-x-1/2 lg:translate-y-1/2"
    };
    return positions[position as keyof typeof positions];
  };
  return <section className="relative min-h-screen bg-chainspace-black py-20 overflow-hidden">
      <div className="geometric-lines opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-8">
            VALUE EXPLOSION
          </h2>
        </div>

        {/* Mobile Grid Layout */}
        <div className="lg:hidden grid grid-cols-2 gap-6 mb-8">
          {valueBreakdown.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="starburst bg-chainspace-orange hover:bg-chainspace-orange-bright transition-all duration-300 rounded-2xl p-4 transform hover:scale-105">
                <div className="text-center">
                  <div className="text-chainspace-black font-bold text-sm mb-1 leading-tight">
                    {item.label}
                  </div>
                  <div className="text-chainspace-black font-black text-lg line-through decoration-2">
                    {item.value}
                  </div>
                  <div className="text-chainspace-black font-bold text-sm animate-pulse">
                    <span className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]">
                      FREE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Central Value Display */}
        <div className="hidden lg:block relative w-full max-w-4xl mx-auto h-[500px]">
          {/* Central Starburst */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="starburst value-badge rounded-full w-72 h-72 flex flex-col items-center justify-center text-center">
              <div className="border-t-2 border-chainspace-black w-16 mb-2"></div>
            </div>
          </div>

          {/* Surrounding Mini-Starbursts */}
          {valueBreakdown.map((item, index) => (
            <div key={index} className={`${getPositionClass(item.position)} z-10`}>
              <div className="group cursor-pointer">
                <div className="starburst bg-chainspace-orange hover:bg-chainspace-orange-bright transition-all duration-300 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center p-4 transform hover:scale-110">
                  <div className="text-chainspace-black font-bold text-base mb-1 leading-tight">
                    {item.label}
                  </div>
                  <div className="text-chainspace-black font-black text-xl line-through decoration-2">
                    {item.value}
                  </div>
                  <div className="text-chainspace-black font-bold text-sm animate-pulse transform-gpu">
                    <span className="inline-block animate-[pulse_1.5s_ease-in-out_infinite] hover:animate-[scale-in_0.3s_ease-out]">
                      FREE
                    </span>
                  </div>
                </div>
                
                {/* Hover Details */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-chainspace-dark-gray border border-chainspace-orange rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-30">
                  <div className="text-chainspace-white text-sm font-semibold">
                    {item.label}: {item.value}
                  </div>
                  <div className="text-chainspace-orange text-xs mt-1">
                    Professional grade resources included
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge> 
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g stroke="hsl(var(--chainspace-orange))" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.6">
              <line x1="200" y1="200" x2="100" y2="100" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="300" y2="100" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="100" y2="300" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="200" y1="200" x2="300" y2="300" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
            </g>
          </svg>
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-16">
          <div className="inline-block">
            <div className="starburst bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-full px-12 py-6">
              <div className="text-chainspace-black font-black text-xl md:text-3xl">
                YOUR COMMITMENT: ₦20,000 LOGISTICS ONLY
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-chainspace-white max-w-2xl mx-auto">
            <p className="text-lg opacity-75">
              This covers materials and workspace maintenance.
              <span className="text-chainspace-orange font-bold"> Everything else is 100% sponsored.</span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default ValueExplosion;
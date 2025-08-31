const Footer = () => {
  return (
    <footer className="bg-chainspace-black py-8 border-t border-chainspace-orange/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/0df41d9e-100b-4fb8-a515-8f886791bc31.png" 
              alt="ChainspaceHQ Logo" 
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-chainspace-white font-monument text-lg md:text-xl">
              CHAINSPACE<span className="text-chainspace-orange">HQ</span>
            </span>
          </div>
          <p className="text-chainspace-white text-sm md:text-lg">
            @2025 built with love by chainspacehq
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
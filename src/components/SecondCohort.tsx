import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ApplicationFormModal from './ApplicationFormModal';

// Import gallery images for second cohort
const codingSession1 = '/lovable-uploads/c9396e69-9a95-4bec-a8bb-30e20c0e9cc3.png';
const codingSession2 = '/lovable-uploads/10f85456-1c6a-47aa-8255-ad259f9c9e00.png';
const workshopSession = '/lovable-uploads/da176108-830b-4c3b-b8bd-2be8abf05354.png';
const classroomFull = '/lovable-uploads/10a8430f-1b9e-47cc-b13c-5abda56c7eaa.png';
const presentationSession = '/lovable-uploads/8e828f40-1972-4bf6-9463-f2682c6988a6.png';
const instructorTeaching = '/lovable-uploads/918909a2-56ac-471d-b7a4-6efcab96eaaa.png';
const collaborativeWork = '/lovable-uploads/5af5d0c6-d9b8-444b-93c0-411c075c7a0b.png';
const practicalSession = '/lovable-uploads/31434ec6-7e6e-4cc1-b0be-94cd34f60f39.png';
const studyEnvironment = '/lovable-uploads/e2c3cde0-5952-49eb-ab24-2111edb863fb.png';
const SecondCohort = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const galleryImages = [{
    src: codingSession1,
    title: "Intensive Coding Sessions",
    description: "Students working collaboratively on blockchain projects"
  }, {
    src: codingSession2,
    title: "Advanced Programming Workshop",
    description: "Hands-on development with expert instructors"
  }, {
    src: workshopSession,
    title: "Technical Workshop",
    description: "Deep dive into smart contract development"
  }, {
    src: classroomFull,
    title: "Full Classroom Engagement",
    description: "All participants actively learning together"
  }, {
    src: presentationSession,
    title: "Project Presentations",
    description: "Students showcasing their blockchain applications"
  }, {
    src: instructorTeaching,
    title: "Expert Mentorship",
    description: "One-on-one guidance from industry professionals"
  }, {
    src: collaborativeWork,
    title: "Team Collaboration",
    description: "Peer-to-peer learning and project development"
  }, {
    src: practicalSession,
    title: "Practical Application",
    description: "Real-world blockchain development experience"
  }, {
    src: studyEnvironment,
    title: "Learning Environment",
    description: "Modern facilities supporting optimal learning"
  }];
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  return <section className="relative min-h-screen bg-chainspace-dark-gray py-20">
      <div className="geometric-lines opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-4">
            COHORT II EXCELLENCE
          </h2>
          <p className="text-chainspace-orange text-xl font-semibold">
            SECOND BATCH • 20 GRADUATES • 11 EMPLOYED
          </p>
        </div>

        {/* Main Gallery Section */}
        <div className="mb-16">
          {/* Featured Image Display */}
          <div className="relative max-w-4xl mx-auto mb-8">
            <div className="starburst bg-chainspace-black border-2 border-chainspace-orange rounded-2xl p-4 overflow-hidden">
              <div className="relative h-96 rounded-lg overflow-hidden cursor-pointer" onClick={() => openImageModal(galleryImages[currentImageIndex].src)}>
                <img src={galleryImages[currentImageIndex].src} alt={galleryImages[currentImageIndex].title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-chainspace-white font-black text-xl mb-2">{galleryImages[currentImageIndex].title}</h3>
                  <p className="text-chainspace-white/80 text-sm">{galleryImages[currentImageIndex].description}</p>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-4">
                <button onClick={prevImage} className="explosive-btn p-3 rounded-full hover:bg-chainspace-orange/20 transition-colors" aria-label="Previous image">
                  <ChevronLeft className="w-6 h-6 text-chainspace-orange" />
                </button>
                
                <div className="text-chainspace-white font-semibold">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
                
                <button onClick={nextImage} className="explosive-btn p-3 rounded-full hover:bg-chainspace-orange/20 transition-colors" aria-label="Next image">
                  <ChevronRight className="w-6 h-6 text-chainspace-orange" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3 max-w-5xl mx-auto">
            {galleryImages.map((image, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${index === currentImageIndex ? 'ring-2 ring-chainspace-orange scale-105' : 'hover:scale-105 hover:ring-1 hover:ring-chainspace-orange/50'}`}>
                <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 transition-opacity duration-300 ${index === currentImageIndex ? 'bg-chainspace-orange/20' : 'bg-black/20'}`}></div>
              </button>)}
          </div>
        </div>

        {/* Success Metrics */}
        

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block starburst bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-2xl p-8">
            <h3 className="text-chainspace-black font-black text-2xl md:text-3xl mb-4">
              BE PART OF COHORT III SUCCESS
            </h3>
            <p className="text-chainspace-black font-semibold mb-4">
              Join our growing community of successful Web3 developers
            </p>
            <button onClick={() => setIsApplicationModalOpen(true)} className="bg-chainspace-black text-chainspace-orange border-2 border-chainspace-black hover:bg-transparent hover:text-chainspace-black font-bold py-3 px-8 rounded-full transition-all duration-300">
              APPLY FOR COHORT III
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full">
            <button onClick={closeImageModal} className="absolute top-4 right-4 z-10 bg-chainspace-orange text-chainspace-black rounded-full p-2 hover:bg-chainspace-orange-bright transition-colors" aria-label="Close modal">
              <X className="w-6 h-6" />
            </button>
            <img src={selectedImage} alt="Gallery image" className="max-w-full max-h-full object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          </div>
        </div>}
      
      <ApplicationFormModal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} />
    </section>;
};
export default SecondCohort;
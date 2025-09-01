import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ApplicationFormModal from './ApplicationFormModal';

// Import gallery images
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

  const galleryImages = [
    { src: codingSession1, title: "Intensive Coding Sessions", description: "Students working collaboratively on blockchain projects" },
    { src: codingSession2, title: "Advanced Programming Workshop", description: "Hands-on development with expert instructors" },
    { src: workshopSession, title: "Technical Workshop", description: "Deep dive into smart contract development" },
    { src: classroomFull, title: "Full Classroom Engagement", description: "All participants actively learning together" },
    { src: presentationSession, title: "Project Presentations", description: "Students showcasing their blockchain applications" },
    { src: instructorTeaching, title: "Expert Mentorship", description: "One-on-one guidance from industry professionals" },
    { src: collaborativeWork, title: "Team Collaboration", description: "Peer-to-peer learning and project development" },
    { src: practicalSession, title: "Practical Application", description: "Real-world blockchain development experience" },
    { src: studyEnvironment, title: "Learning Environment", description: "Modern facilities supporting optimal learning" },
  ];

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

  return (
    <section className="relative min-h-screen bg-chainspace-dark-gray py-12 sm:py-16 md:py-20 overflow-x-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-chainspace-white mb-3">
            COHORT II EXCELLENCE
          </h2>
          <p className="text-chainspace-orange text-base sm:text-lg md:text-xl font-semibold">
            SECOND BATCH • 20 GRADUATES • 11 EMPLOYED
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="bg-chainspace-black border-2 border-chainspace-orange rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div
              className="relative h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openImageModal(galleryImages[currentImageIndex].src)}
            >
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 p-2 sm:p-3 rounded">
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">
                  {galleryImages[currentImageIndex].title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm">
                  {galleryImages[currentImageIndex].description}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-3 sm:mt-4">
              <button onClick={prevImage} className="p-2 rounded-full hover:bg-chainspace-orange/20">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-chainspace-orange" />
              </button>
              <div className="text-white text-sm sm:text-base">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
              <button onClick={nextImage} className="p-2 rounded-full hover:bg-chainspace-orange/20">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-chainspace-orange" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto mb-10">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                index === currentImageIndex
                  ? "ring-2 ring-chainspace-orange scale-105"
                  : "hover:scale-105 hover:ring-1 hover:ring-chainspace-orange/50"
              } transition`}
            >
              <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-chainspace-orange to-chainspace-orange-bright rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-chainspace-black font-black text-lg sm:text-2xl md:text-3xl mb-3">
              BE PART OF COHORT III SUCCESS
            </h3>
            <p className="text-chainspace-black font-medium mb-4 text-sm sm:text-base">
              Join our growing community of successful Web3 developers
            </p>
            <button
              onClick={() => setIsApplicationModalOpen(true)}
              className="bg-black text-chainspace-orange border-2 border-black hover:bg-transparent hover:text-black font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base transition"
            >
              APPLY FOR COHORT III
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh]">
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 bg-chainspace-orange text-black rounded-full p-2"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <ApplicationFormModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
      />
    </section>
  );
};

export default SecondCohort;

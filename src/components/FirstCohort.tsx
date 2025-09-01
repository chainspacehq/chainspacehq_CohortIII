import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import ApplicationFormModal from "./ApplicationFormModal"

// Images
const eventPresentation = "/lovable-uploads/f3bc934e-8a82-4973-ab05-db55357c5014.png"
const codingSession1 = "/lovable-uploads/1045eee4-6776-4d5d-aae8-c3702788e805.png"
const codingSession2 = "/lovable-uploads/96f494c1-dbe8-44a8-a5c9-eec4d6d2e087.png"
const classroomSession = "/lovable-uploads/731fd7ad-c8c9-46d9-9621-4d1b7fe09176.png"
const workshopSession = "/lovable-uploads/c62f8c51-dc2d-43ae-a30d-6072b3bb6ed7.png"
const presentationScreen = "/lovable-uploads/06dcce1e-28f7-46f0-9e62-5bd25d7b5f61.png"
const groupPhoto1 = "/lovable-uploads/3fb10a1f-192f-459e-8240-9a5cac90546e.png"
const groupPhoto2 = "/lovable-uploads/e4c4a4bf-ca96-41d6-bdb6-44f6e0765206.png"
const instructorSession = "/lovable-uploads/54e27ec9-9b1a-4524-9307-feef31d28b77.png"

const FirstCohort = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)

  const galleryImages = [
    { src: eventPresentation, title: "Program Launch Event", description: "Opening ceremony with participants and lighting effects" },
    { src: codingSession1, title: "Intensive Coding Session", description: "Students working on blockchain development projects" },
    { src: codingSession2, title: "Collaborative Learning", description: "Team-based learning and peer collaboration" },
    { src: classroomSession, title: "Classroom Engagement", description: "Interactive learning session with instructor guidance" },
    { src: workshopSession, title: "Hands-on Workshop", description: "Practical blockchain development training" },
    { src: presentationScreen, title: "Technical Presentations", description: "Students presenting their project work" },
    { src: groupPhoto1, title: "Cohort Group Photo", description: "First cohort team celebration" },
    { src: groupPhoto2, title: "Program Graduation", description: "Celebrating successful program completion" },
    { src: instructorSession, title: "Code Review Session", description: "Instructor explaining smart contract development" }
  ]

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  const openImageModal = (src: string) => setSelectedImage(src)
  const closeImageModal = () => setSelectedImage(null)

  const getSelectedImageIndex = () => galleryImages.findIndex((img) => img.src === selectedImage)

  const navigateModal = (direction: "prev" | "next") => {
    const currentIndex = getSelectedImageIndex()
    if (currentIndex === -1) return
    const newIndex =
      direction === "next" ? (currentIndex + 1) % galleryImages.length : (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedImage(galleryImages[newIndex].src)
  }

  return (
    <section className="relative min-h-screen bg-chainspace-black py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="explosion-text text-4xl md:text-6xl font-black text-chainspace-white mb-4">
            COHORT I SUCCESS STORY
          </h2>
          <p className="text-chainspace-orange text-xl font-semibold">
            FIRST BATCH • 20 GRADUATES 
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <div
            className="relative h-96 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openImageModal(galleryImages[currentImageIndex].src)}
          >
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-chainspace-white font-black text-xl mb-2">{galleryImages[currentImageIndex].title}</h3>
              <p className="text-chainspace-white/80 text-sm">{galleryImages[currentImageIndex].description}</p>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={prevImage}
              className="explosive-btn p-3 rounded-full hover:bg-chainspace-orange/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-chainspace-orange" />
            </button>
            <div className="text-chainspace-white font-semibold">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
            <button
              onClick={nextImage}
              className="explosive-btn p-3 rounded-full hover:bg-chainspace-orange/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-chainspace-orange" />
            </button>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentImageIndex
                  ? "ring-2 ring-chainspace-orange scale-105"
                  : "hover:scale-105 hover:ring-1 hover:ring-chainspace-orange/50"
              }`}
            >
              <img src={image.src} alt={image.title} className="w-full h-full object-cover" />
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentImageIndex ? "bg-chainspace-orange/20" : "bg-black/20"
                }`}
              ></div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-chainspace-orange to-chainspace-red rounded-2xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready to Join Our Next Cohort?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Learn blockchain development, collaborate with peers, and start your career in web3. Apply now and become part of the journey.
          </p>
          <button
            onClick={() => setIsApplicationModalOpen(true)}
            className="bg-chainspace-black text-chainspace-orange px-8 py-3 rounded-full font-semibold hover:bg-chainspace-dark-gray transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-chainspace-orange text-chainspace-black rounded-full p-2 hover:bg-chainspace-orange-bright transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateModal("prev")
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-chainspace-orange/80 text-chainspace-black rounded-full p-3 hover:bg-chainspace-orange transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateModal("next")
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-chainspace-orange/80 text-chainspace-black rounded-full p-3 hover:bg-chainspace-orange transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="relative">
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              {(() => {
                const currentIndex = getSelectedImageIndex()
                const currentImage = currentIndex !== -1 ? galleryImages[currentIndex] : null
                return (
                  currentImage && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                      <h3 className="text-chainspace-white font-black text-xl mb-2">{currentImage.title}</h3>
                      <p className="text-chainspace-white/80 text-sm mb-2">{currentImage.description}</p>
                      <div className="text-chainspace-orange text-sm font-semibold">
                        {currentIndex + 1} / {galleryImages.length}
                      </div>
                    </div>
                  )
                )
              })()}
            </div>
          </div>
        </div>
      )}

      <ApplicationFormModal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} />
    </section>
  )
}

export default FirstCohort

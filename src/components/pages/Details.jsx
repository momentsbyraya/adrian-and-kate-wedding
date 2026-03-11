import React, { useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import { themeConfig } from '../../config/themeConfig'
import ImageBanner from '../ImageBanner'
import Divider from '../Divider'
import Line from '../Line'
import SecondaryButton from '../SecondaryButton'
import PhotoSection from '../PhotoSection'
import Venue from '../Venue'
import Schedule from '../Schedule'
import DressCode from '../DressCode'
import GiftRegistry from '../GiftRegistry'
import PhotoUpload from '../PhotoUpload'
import './Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Details = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const headerContentRef = useRef(null)
  const venueRef = useRef(null)
  const photoSectionRef = useRef(null)
  const curvedDivider3Ref = useRef(null)

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  // Random background position, rotation, and flip - Top layer (old-book-bg)
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    if (backButtonRef.current) {
      gsap.set(backButtonRef.current, { opacity: 0, scale: 0 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Back button fade-in animation after page slides in
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.6 }
      )
    }

    // Scroll-triggered animations for individual elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header content (description and graphics) animation
    if (headerContentRef.current) {
      ScrollTrigger.create({
        trigger: headerContentRef.current,
        start: "top 80%",
        animation: gsap.fromTo(headerContentRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }







    // Photo Section animation
    if (photoSectionRef.current) {
      ScrollTrigger.create({
        trigger: photoSectionRef.current,
        start: "top 80%",
        animation: gsap.fromTo(photoSectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Curved Divider animations
    if (curvedDivider3Ref.current) {
      ScrollTrigger.create({
        trigger: curvedDivider3Ref.current,
        start: "top 85%",
        animation: gsap.fromTo(curvedDivider3Ref.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.6, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }


    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
    <section
      ref={sectionRef}
      id="details"
      data-section="details"
      className="relative w-full overflow-hidden bg-white details-section"
    >
      {/* Prenup Image at Top */}
      <ImageBanner 
        src="/assets/images/prenup/prenup-1.png" 
        alt="Prenup photo"
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 pb-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Header Section */}
          <div className="text-center">
            <div ref={headerContentRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Join us as we exchange our vows
              </p>
              <Divider />
            </div>
          </div>

          {/* Venue Section */}
          <Venue />
                  </div>
                </div>
                
      {/* Wave Container */}
      <div className="wave relative w-full" style={{ marginBottom: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill="#9b7b6c" fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
            </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center" style={{ marginTop: '-1px' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />
                    </div>
                </div>

      {/* Wave Container - Bottom Variation */}
      <div className="wave wave-bottom relative w-full" style={{ marginTop: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill="#9b7b6c" fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
                    </div>
                    
      {/* Photo Section */}
      <div ref={photoSectionRef}>
      <PhotoSection
        images={[
          { src: '/assets/images/prenup/img4.jpeg', alt: 'Photo 1', label: 'Memories' },
          { src: '/assets/images/prenup/img1.jpg', alt: 'Photo 2', label: 'Together' },
          { src: '/assets/images/prenup/img6.jpg', alt: 'Photo 3', label: 'Love' }
        ]}
        paragraph="This is where our journey began, a moment captured in time that will forever hold a special place in our hearts."
        backgroundTexts={['Forever', 'Always', 'Together', 'Love', 'Us']}
      />
              </div>

      {/* Wave Container - Before Dress Code */}
      <div className="wave relative w-full" style={{ marginBottom: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill="#e3d1c3" fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center" style={{ marginTop: '-1px' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Dress Code Section */}
          <DressCode />
                    </div>
                </div>

      {/* Wave Container - Bottom Variation - After Dress Code */}
      <div className="wave wave-bottom relative w-full" style={{ marginTop: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill="#e3d1c3" fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12" style={{ marginTop: '-1px' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Gift Registry Section */}
          <GiftRegistry />

          {/* Photo Upload Section */}
          <PhotoUpload />
        </div>
      </div>

    </section>


    
    {/* Back Button - Circular, Bottom Right - Outside section to avoid transform issues */}
    <button
      ref={backButtonRef}
      onClick={() => {
        // Slide out page to the left before navigating
        if (sectionRef.current) {
          gsap.to(sectionRef.current, {
            x: '-100%',
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              navigate('/')
            }
          })
        } else {
          navigate('/')
        }
      }}
      className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#333333] text-white rounded-full shadow-lg hover:bg-[#333333]/80 hover:scale-110 transition-all duration-300 flex items-center justify-center group back-button"
      aria-label="Back to home"
    >
      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
    </button>
    </>
  )
}

export default Details






import React, { useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WEDDING_BLUSH, WEDDING_LIGHT_BLUE } from '../../config/themeConfig'
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
import FAQSection from '../FAQSection'
import { prenupDetailsBannerUrl, prenupDetailsPhotoStrip } from '../../data/prenup'
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
        src={prenupDetailsBannerUrl} 
        alt="Prenup photo"
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 pb-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Header Section */}
          <div className="text-center">
            <div ref={headerContentRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#2F3E46] max-w-3xl mx-auto leading-relaxed">
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
          <path fill={WEDDING_LIGHT_BLUE} fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
            </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center" style={{ marginTop: '-1px' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />
                    </div>
                </div>

      {/* Wave under schedule — same light blue as `.program-section` */}
      <div className="wave wave-bottom relative w-full" style={{ marginTop: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill={WEDDING_LIGHT_BLUE} fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
                    
      {/* Photo Section */}
      <div ref={photoSectionRef}>
      <PhotoSection
        images={prenupDetailsPhotoStrip}
        paragraph="This is where our journey began, a moment captured in time that will forever hold a special place in our hearts."
        backgroundTexts={['Forever', 'Always', 'Together', 'Love', 'Us']}
      />
              </div>

      {/* Wave before dress code — matches `.attire-section` blush */}
      <div className="wave relative w-full" style={{ marginBottom: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill={WEDDING_BLUSH} fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center" style={{ marginTop: '-1px' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Dress Code Section */}
          <DressCode />
        </div>
      </div>

      {/* Wave under dress code — full-bleed (was clipped inside max-w wrapper) */}
      <div className="wave wave-bottom relative w-full" style={{ marginTop: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="h-auto w-full" style={{ display: 'block' }}>
          <path
            fill={WEDDING_BLUSH}
            fillOpacity="1"
            stroke="none"
            d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      {/* Gift, photo upload, FAQ */}
      <div
        className="relative z-20 flex flex-col items-center justify-center pt-12"
        style={{ marginTop: '-1px' }}
      >
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <GiftRegistry />
          <PhotoUpload />
        </div>
        <FAQSection id="faq" />
      </div>

    </section>


    
    {/* Back — bottom right, outside section to avoid transform issues */}
    <button
      ref={backButtonRef}
      type="button"
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
      className="back-button fixed bottom-12 right-6 z-[100] inline-flex aspect-square size-16 shrink-0 items-center justify-center rounded-full bg-[#F4E8E9] font-albert text-xs font-semibold uppercase leading-none tracking-[0.12em] text-[#2F3E46] shadow-lg underline decoration-[#2F3E46]/50 underline-offset-[0.25em] transition-colors duration-300 hover:bg-[#E2EAFC] sm:size-[4.25rem] sm:text-sm sm:tracking-[0.14em]"
    >
      Back
    </button>
    </>
  )
}

export default Details







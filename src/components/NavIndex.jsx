import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { themeConfig } from '../config/themeConfig'
import { couple, prenupHomePolaroidUrls } from '../data'
import Counter from './Counter'
import { getTimeUntilWedding } from '../utils/countdown'
import './NavIndex.css'

const FEATURE_POLAROIDS = [
  {
    id: 'couples-request',
    label: "Couple's Request",
    background: '/assets/images/graphics/bg-1.png',
    icon: '/assets/images/graphics/ring-sketch.png',
    iconAlt: 'Wedding rings sketch',
    hash: '#couples-request',
    className: 'polaroid-1',
    containerClassName: 'polaroid-1-container',
    imageClassName: 'polaroid-1-image',
    flower: {
      src: '/assets/images/graphics/flower-3.png',
      className: 'absolute bottom-0 left-[80%] h-auto object-contain flower-3',
    },
  },
  {
    id: 'snap-and-share',
    label: 'Snap',
    background: '/assets/images/graphics/textured-bg-2.png',
    icon: '/assets/images/graphics/camera-sketch.png',
    iconAlt: 'Camera sketch',
    hash: '#snap-and-share',
    className: 'polaroid-2',
    containerClassName: 'polaroid-2-container',
    imageClassName: 'polaroid-2-image',
    flower: {
      src: '/assets/images/graphics/flower-4.png',
      className: 'absolute h-auto object-contain flower-4',
      refKey: 'flower4',
    },
  },
]

const NavIndex = ({ onOpenRSVP }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const coupleNameRef = useRef(null)
  const envelopeRef = useRef(null)
  const flower1Ref = useRef(null)
  const flower4Ref = useRef(null)
  const ovalContainerRef = useRef(null)
  const polaroidRef = useRef(null)
  const rsvpContainerRef = useRef(null)
  const detailsContainerRef = useRef(null)
  const momentsImagesRef = useRef(null)
  const momentsTextRef = useRef(null)

  // Countdown state
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  // Pages/Sections to navigate to - matching the pages folder
  const sections = []

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate elements one after another when on home page
    if (location.pathname === '/') {
      // Set all elements to start hidden
      if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })
      if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, y: 30 })
      if (flower1Ref.current) gsap.set(flower1Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (flower4Ref.current) gsap.set(flower4Ref.current, { opacity: 0, scale: 0, rotation: 0 })
      if (ovalContainerRef.current) gsap.set(ovalContainerRef.current, { opacity: 0, y: 30 })
      if (polaroidRef.current) gsap.set(polaroidRef.current, { opacity: 0, y: 30 })
      if (rsvpContainerRef.current) gsap.set(rsvpContainerRef.current, { opacity: 0, y: 30 })
      if (detailsContainerRef.current) gsap.set(detailsContainerRef.current, { opacity: 0, y: 30 })
      if (momentsImagesRef.current) {
        gsap.set(momentsImagesRef.current.children, { opacity: 0, y: 30 })
      }
      if (momentsTextRef.current) gsap.set(momentsTextRef.current, { opacity: 0, y: 20 })
      
      // Small delay to ensure opening screen is fully gone
      setTimeout(() => {
        // Animate elements one after another
        const tl = gsap.timeline({ delay: 0.2 })
            
            // Envelope - show first
            if (envelopeRef.current) {
              tl.fromTo(envelopeRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
              )
            }
            
            // Flower 1 - animate after envelope
            if (flower1Ref.current) {
              tl.fromTo(flower1Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.3"
              )
            }
            
            // Couple's name - simple slide in
            if (coupleNameRef.current) {
              tl.fromTo(coupleNameRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Oval container - simple slide in
            if (ovalContainerRef.current) {
              tl.fromTo(ovalContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Polaroid image - simple slide in
            if (polaroidRef.current) {
              tl.fromTo(polaroidRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Flower 4 - top right of polaroid - keep animation
            if (flower4Ref.current) {
              tl.fromTo(flower4Ref.current,
                { opacity: 0, scale: 0, rotation: 0 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.5"
              )
            }
            
            // RSVP container - simple slide in
            if (rsvpContainerRef.current) {
              tl.fromTo(rsvpContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Details container - simple slide in
            if (detailsContainerRef.current) {
              tl.fromTo(detailsContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
            
            // Moments images - simple slide in with stagger
            if (momentsImagesRef.current) {
              tl.fromTo(momentsImagesRef.current.children,
                { opacity: 0, y: 30 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  ease: "power2.out",
                  stagger: 0.1
                },
                "-=0.4"
              )
            }
            
            // Moments text - simple slide in
            if (momentsTextRef.current) {
              tl.fromTo(momentsTextRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
              )
            }
      }, 300) // Small delay to ensure smooth transition
    }
  }, [location.pathname])

  const handleNavigation = (section) => {
    // If it's RSVP, open modal instead of navigating
    if (section.isModal && section.id === 'rsvp' && onOpenRSVP) {
      onOpenRSVP()
      return
    }

    navigateWithSlide(section.path)
  }

  const navigateWithSlide = (path) => {
    window.scrollTo(0, 0)

    const complete = () => {
      navigate(path)
      setTimeout(() => window.scrollTo(0, 0), 0)
    }

    if (navRef.current) {
      gsap.to(navRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: complete
      })
    } else {
      complete()
    }
  }

  const handleCardKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat nav-index-bg" />
      
      {/* Light wash for readability over blurred photo */}
      <div className="absolute inset-0 nav-index-overlay" />
      
      <div 
        ref={navRef}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
      >

        {/* Container 2: Rest of the Content */}
        <div className="relative">
          {/* Midnight Blue Envelope Image */}
        <div ref={envelopeRef} className="flex justify-center relative envelope-container">
          <img 
            src="/assets/images/graphics/envelope.png" 
            alt="Wedding Invitation" 
            className="w-[60vw] h-auto object-contain"
          />
           {/* Flower 1 - Bottom Left */}
           <img 
             ref={flower1Ref}
             src="/assets/images/graphics/flower-1.png" 
             alt="Flower decoration" 
             className="absolute bottom-[0%] -left-[5%] w-[38vw] h-auto object-contain flower-1-rotate flower-1-container"
           />
        </div>

        {/* Container with border radius 50% and Polaroid Image */}
        <div className="flex justify-start items-start gap-6 relative z-20 oval-polaroid-container">
          {/* Oval Container */}
          <div 
            ref={ovalContainerRef}
            className="rounded-[50%] p-1 nav-clickable oval-container"
            role="button"
            tabIndex={0}
            aria-label="View entourage"
            onClick={() => navigateWithSlide('/entourage')}
            onKeyDown={(event) => handleCardKeyDown(event, () => navigateWithSlide('/entourage'))}
          >
            <div className="rounded-[50%] w-full h-full p-1 oval-border">
              <div className="rounded-[50%] w-full h-full flex flex-col items-center justify-center relative oval-border">
                {/* Text Content */}
                <div className="text-center px-4">
                  <p className="nanum-myeongjo-regular text-[#2F3E46] mb-2 oval-text-for">
                    FOR THE
                  </p>
                  <p className={`imperial-script-regular mb-4 underline oval-text-entourage ${themeConfig.text.primary}`}>
                    Entourage
                  </p>
                  <p className="nanum-myeongjo-regular text-[#2F3E46] oval-text-click">
                    CLICK HERE
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Polaroid Container Wrapper */}
          <div 
            className="relative nav-clickable polaroid-wrapper"
            role="button"
            tabIndex={0}
            aria-label="View our moments"
            onClick={() => navigateWithSlide('/moments')}
            onKeyDown={(event) => handleCardKeyDown(event, () => navigateWithSlide('/moments'))}
          >
            {/* Polaroid-style Image Container */}
            <div 
              ref={polaroidRef}
              className="bg-white relative polaroid-container"
            >
              <img 
                src={prenupHomePolaroidUrls[0]} 
                alt="Prenup photo" 
                className="w-full object-cover polaroid-image"
                style={{ objectPosition: 'center bottom' }}
              />
              <p className="polaroid-label font-handwritten">Our Moments</p>
            </div>
          </div>
        </div>

        {/* Rectangle Container - Longer than wider */}
        <div className="flex justify-start items-start gap-6 relative rsvp-details-container">
          <div 
            ref={rsvpContainerRef}
            className="bg-white flex flex-col nav-clickable relative rsvp-container"
            onClick={() => onOpenRSVP?.()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleCardKeyDown(e, () => onOpenRSVP?.())}
            aria-label="Open RSVP"
          >
            {/* RSVP card */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
              <p className="text-center rsvp-text-container">
                <span className="imperial-script-regular rsvp-text-r">R</span>
                <span className="nanum-myeongjo-regular rsvp-text-svp">SVP</span>
              </p>
              <p className="nanum-myeongjo-regular rsvp-text-hint">
                CLICK TO RSVP
              </p>
            </div>
          </div>
          
          {/* New Container - Wider than long */}
          <div 
            ref={detailsContainerRef}
            className="bg-white flex flex-col items-center justify-center nav-clickable relative details-container"
            style={{
              borderTopColor: themeConfig.cssVariables['--primary-bg'],
              borderBottomColor: themeConfig.cssVariables['--primary-bg']
            }}
            role="button"
            tabIndex={0}
            aria-label="View wedding details"
            onClick={() => navigateWithSlide('/details')}
            onKeyDown={(event) => handleCardKeyDown(event, () => navigateWithSlide('/details'))}
          >
            {/* Flower 5 - Bottom Left */}
            <img 
              src="/assets/images/graphics/flower-5.png" 
              alt="Flower decoration" 
              className="absolute h-auto object-contain flower-5"
            />
            
            {/* Text Content */}
            <div className="text-center px-4 relative z-10">
              <p className={`nanum-myeongjo-regular details-text-view ${themeConfig.text.primary}`}>
                VIEW THE
              </p>
              <p className={`imperial-script-regular underline details-text-details ${themeConfig.text.primary}`}>
                Details
              </p>
              <p className="nanum-myeongjo-regular details-text-hint">
                CLICK HERE
              </p>
            </div>
          </div>
        </div>

        {/* Couple's Request & Snap polaroids */}
        <div ref={momentsImagesRef} className="flex justify-center items-start gap-4 sm:gap-6 relative moments-images-container mt-16 sm:mt-20 md:mt-24">
          {/* Flower 7 - Under the images */}
          <img 
            src="/assets/images/graphics/flower-7.png" 
            alt="Flower decoration" 
            className="absolute h-auto object-contain flower-7"
          />
          
          {/* VIEW OUR MOMENTS Text - Top Right */}
          <button
            ref={momentsTextRef}
            type="button"
            className="absolute nav-clickable-text bg-transparent border-none outline-none moments-text-button"
            aria-label="View our moments"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              navigateWithSlide('/moments')
            }}
          >
             <span className="nanum-myeongjo-regular text-center underline pulsating-moments moments-text text-white">
               OUR MOMENTS
             </span>
          </button>
          
          {FEATURE_POLAROIDS.map((polaroid) => (
            <div
              key={polaroid.id}
              className={`nav-clickable ${polaroid.className}`}
              role="button"
              tabIndex={0}
              aria-label={`View ${polaroid.label}`}
              onClick={() => navigateWithSlide(`/details${polaroid.hash}`)}
              onKeyDown={(event) =>
                handleCardKeyDown(event, () => navigateWithSlide(`/details${polaroid.hash}`))
              }
            >
              <div className={`bg-white relative ${polaroid.containerClassName}`}>
                <div
                  className={`w-full polaroid-feature-image ${polaroid.imageClassName}`}
                  style={{ backgroundImage: `url(${polaroid.background})` }}
                >
                  <img
                    src={polaroid.icon}
                    alt={polaroid.iconAlt}
                    className="polaroid-feature-icon"
                  />
                </div>
                <p className="polaroid-label font-handwritten">{polaroid.label}</p>

                {polaroid.flower.refKey === 'flower4' ? (
                  <img
                    ref={flower4Ref}
                    src={polaroid.flower.src}
                    alt="Flower decoration"
                    className={polaroid.flower.className}
                  />
                ) : (
                  <img
                    src={polaroid.flower.src}
                    alt="Flower decoration"
                    className={polaroid.flower.className}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

          {/* Navigation Boxes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {sections.map((section) => {
              const isActive = location.pathname === section.path
              const isCountdown = section.id === 'counter'
              
              // For countdown, render as non-clickable div
              if (isCountdown) {
                return (
                  <div
                    key={section.id}
                    className="group relative opacity-70 cursor-default"
                  >
                    {/* Box with Section Name */}
                    <div 
                      className="px-4 py-6 rounded-lg border-2 text-center min-h-[80px] flex items-center justify-center bg-white border-[#2F3E46]/30 text-[#2F3E46] shadow-sm"
                    >
                      <span className="text-sm sm:text-base font-albert font-medium">
                        {section.name}
                      </span>
                    </div>
                  </div>
                )
              }
              
              // For other sections, render as clickable button
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavigation(section)}
                  className={`group relative transition-all duration-300 ${
                    isActive 
                      ? 'opacity-100 scale-105' 
                      : 'opacity-90 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={section.isModal ? `Open ${section.name} modal` : `Navigate to ${section.name}`}
                >
                  {/* Box with Section Name */}
                  <div 
                    className={`px-4 py-6 rounded-lg border-2 transition-all duration-300 text-center min-h-[80px] flex items-center justify-center ${
                      isActive
                        ? 'bg-[#E2EAFC] border-[#E2EAFC] text-[#2F3E46] shadow-lg'
                        : 'bg-white border-[#E2EAFC]/60 text-[#2F3E46] hover:border-[#E2EAFC] hover:bg-[#F4E8E9]/40 shadow-md'
                    }`}
                  >
                    <span className="text-sm sm:text-base font-albert font-medium">
                      {section.name}
                    </span>
                  </div>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F5B8CC] rounded-full border-2 border-white" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Container 3: Counter */}
        <div className="relative">
          <Counter countdown={countdown} />
        </div>
      </div>
    </div>
  )
}

export default NavIndex



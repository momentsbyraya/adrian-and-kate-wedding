import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import Line from './Line'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venue1Ref = useRef(null)
  const venue2Ref = useRef(null)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception

  useEffect(() => {
    // Venue Title animation
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(venueTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Venue 1 animation - animate image and content separately
    if (venue1Ref.current) {
      const venue1Container = venue1Ref.current
      const flexContainer = venue1Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const venue1Image = flexContainer.querySelector('.venue-image-container')
        const venue1Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
        if (venue1Image) {
          gsap.set(venue1Image, { opacity: 0, x: -30 })
        }
        if (venue1Content) {
          gsap.set(venue1Content, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: venue1Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (venue1Image) {
              gsap.to(venue1Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (venue1Content) {
              gsap.to(venue1Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Venue 2 animation - animate image and content separately
    if (venue2Ref.current) {
      const venue2Container = venue2Ref.current
      const flexContainer = venue2Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const venue2Image = flexContainer.querySelector('.venue-image-container')
        const venue2Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
        if (venue2Image) {
          gsap.set(venue2Image, { opacity: 0, x: 30 })
        }
        if (venue2Content) {
          gsap.set(venue2Content, { opacity: 0, x: -30 })
        }
        
        ScrollTrigger.create({
          trigger: venue2Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (venue2Content) {
              gsap.to(venue2Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (venue2Image) {
              gsap.to(venue2Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venue1Ref.current ||
          trigger.vars.trigger === venue2Ref.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Venue Title */}
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span 
            className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase venue-title-text"
          >
            WHERE TO GO
          </span>
        </h3>
      </div>

      {/* Venues Container - Side by side on 992px and above */}
      <div className="flex flex-col lg-custom:flex-row gap-3 lg-custom:gap-4 items-stretch">
        {/* Ceremony Information */}
        <div className="relative overflow-visible flex-1">
          <div className="relative overflow-hidden">
            <div 
              ref={venue1Ref} 
              className="text-center transition-opacity duration-500 ease-in-out"
            >
              {/* Venue Image and Details - Side by side on mobile, stacked on 992px+ */}
              <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-start">
                {/* Venue Image */}
                <div className="w-1/2 lg-custom:w-full">
                  <div className="w-full relative venue-image-container">
                    <img 
                      src="/assets/images/venues/ceremony.jpg" 
                      alt={ceremony.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
                
                {/* Venue Details */}
                <div className="w-1/2 lg-custom:w-full flex flex-col justify-between text-left venue-image-container">
                  {/* Venue Name and Location Container */}
                  <div>
                    {/* Venue Name */}
                    <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-left">
                      {ceremony.name}
                    </div>
                    
                     {/* Address */}
                     <p className="text-sm sm:text-base font-albert font-thin text-[#333333] mb-4 text-left">
                       {ceremony.address && `${ceremony.address}, `}
                       {ceremony.city}
                       {ceremony.state && `, ${ceremony.state}`}
                       {ceremony.zip && `, ${ceremony.zip}`}
                     </p>
                  </div>

                  {/* Google Maps Link Button */}
                  <div className="flex justify-start items-center">
                    <SecondaryButton
                      href={ceremony.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ArrowRight}
                    >
                      Get Direction
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider - Hidden on mobile, shown on 992px and above */}
        <div className="hidden lg-custom:block w-px bg-[#333333] opacity-40 self-stretch"></div>
        <div className="lg-custom:hidden w-full">
          <Line />
        </div>

        {/* Reception Information */}
        <div className="relative overflow-visible flex-1">
          <div className="relative overflow-hidden">
            <div 
              ref={venue2Ref}
              className="text-center transition-opacity duration-500 ease-in-out"
            >
              {/* Venue Image and Details - Side by side on mobile, stacked on 992px+ */}
              <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-start">
                {/* Venue Details - First on mobile (left), second on desktop (bottom) */}
                <div className="w-1/2 lg-custom:w-full flex flex-col justify-between text-center venue-image-container order-1 lg-custom:order-2">
                  {/* Venue Name and Location Container */}
                  <div className="flex-1 flex items-center justify-center">
                    {/* Venue Name */}
                    <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] text-center">
                      {reception.name}
                    </div>
                  </div>

                  {/* Google Maps Link Button */}
                  <div className="flex justify-center items-center">
                    <SecondaryButton
                      href={reception.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ArrowRight}
                    >
                      Get Direction
                    </SecondaryButton>
                  </div>
                </div>
                
                {/* Venue Image - Second on mobile (right), first on desktop (top) */}
                <div className="w-1/2 lg-custom:w-full order-2 lg-custom:order-1">
                  <div className="w-full relative venue-image-container">
                    <img 
                      src="/assets/images/venues/reception.jpg" 
                      alt={reception.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue

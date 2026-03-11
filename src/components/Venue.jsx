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
  const venueRef = useRef(null)

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

    // Venue animation - animate image and content separately
    if (venueRef.current) {
      const venueContainer = venueRef.current
      const venueImage = venueContainer.querySelector('.venue-image-container')
      const venueContent = venueContainer.querySelector('.venue-content-container')
      
      if (venueImage) {
        gsap.set(venueImage, { opacity: 0, y: 30 })
      }
      if (venueContent) {
        gsap.set(venueContent, { opacity: 0, y: 30 })
      }
      
      ScrollTrigger.create({
        trigger: venueRef.current,
        start: "top 75%",
        onEnter: () => {
          if (venueImage) {
            gsap.to(venueImage, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            })
          }
          if (venueContent) {
            gsap.to(venueContent, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2
            })
          }
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venueRef.current
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

      {/* Venue Container */}
      <div 
        ref={venueRef} 
        className="relative overflow-visible"
      >
        {/* Venue Image */}
        <div className="w-full mb-6 md:mb-8 flex justify-center">
          <div className="w-full max-w-[250px] md:max-w-full relative venue-image-container">
            <img 
              src="/assets/images/venues/Venue.jpg" 
              alt={ceremony.name} 
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
        
        {/* Venue Details */}
        <div className="venue-content-container">
          {/* Venue Name */}
          <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-4 text-center">
            {ceremony.name}
          </div>
          
          {/* Ceremony and Reception Times */}
          <div className="mb-6">
            <p className="text-sm sm:text-base font-albert text-[#333333] text-center">
              <span className="font-semibold">Ceremony:</span> {ceremony.time} | <span className="font-semibold">Reception:</span> {reception.time}
            </p>
          </div>

          {/* Google Maps Link Button */}
          <div className="flex justify-center items-center">
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
    </>
  )
}

export default Venue

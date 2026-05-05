import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const formatVenueLine = (v) => {
  const cityState = [v.city, v.state].filter(Boolean).join(', ')
  const parts = [v.address, cityState, v.zip].filter(Boolean)
  return parts.length ? parts.join(' Â· ') : null
}

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception
  const venueGoogleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Lot%204677B%20M.H.%20Del%20Pilar%20Street%2C%20Brgy%20Plaza%20Aldea%2C%201980%20Tanay%2C%20Philippines'

  useEffect(() => {
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          venueTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    if (venueRef.current) {
      const venueContainer = venueRef.current
      const venueImages = venueContainer.querySelectorAll('.venue-image-container')
      const venueContents = venueContainer.querySelectorAll('.venue-content-container')

      venueImages.forEach((el) => gsap.set(el, { opacity: 0, y: 30 }))
      venueContents.forEach((el) => gsap.set(el, { opacity: 0, y: 30 }))

      ScrollTrigger.create({
        trigger: venueRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(venueImages, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.12
          })
          gsap.to(venueContents, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.15,
            stagger: 0.12
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars &&
          (trigger.vars.trigger === venueTitleRef.current ||
            trigger.vars.trigger === venueRef.current)
        ) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title w-full text-center">
          <span className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase venue-title-text">
            WHERE TO GO
          </span>
        </h3>
      </div>

      {/* Venues stack vertically; each row is image | details (reception mirrored) */}
      <div
        ref={venueRef}
        className="relative mx-auto flex max-w-5xl flex-col gap-10 overflow-visible sm:gap-12 md:gap-16"
      >
        {/* Ceremony */}
        <div className="flex min-w-0 flex-row items-stretch gap-3 sm:gap-4 md:gap-6">
          <div className="flex w-1/2 min-w-0 shrink-0 items-stretch justify-center">
            <div className="venue-image-container relative w-full max-w-none">
              <img
                src="/assets/images/venues/ceremony.jpg"
                alt={ceremony.name}
                className="h-full w-full rounded object-cover"
              />
            </div>
          </div>
          <div className="venue-content-container flex w-1/2 min-w-0 flex-col items-center justify-center text-center">
            <p className="imperial-script-regular mb-1 text-xl capitalize leading-none text-[#1e4566] not-italic sm:mb-1.5 sm:text-2xl md:text-3xl">
              Ceremony
            </p>
            <div className="mb-2 text-base font-boska text-[#1e4566] sm:text-lg md:text-xl lg:text-2xl">
              {ceremony.name}
            </div>
            {formatVenueLine(ceremony) && (
              <p className="mb-3 text-xs font-albert text-[#1e4566]/90 sm:text-sm">
                {formatVenueLine(ceremony)}
              </p>
            )}
            <p className="mb-4 text-xs font-albert text-[#1e4566] sm:mb-5 sm:text-sm md:text-base">
              <span className="font-semibold">Time:</span> {ceremony.time}
            </p>
            <div className="mt-auto flex w-full justify-center">
              <SecondaryButton
                href={ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={ArrowRight}
              >
                Get directions
              </SecondaryButton>
            </div>
          </div>
        </div>

        {/* Reception: copy left, image right */}
        <div className="flex min-w-0 flex-row items-stretch gap-3 sm:gap-4 md:gap-6">
          <div className="venue-content-container flex w-1/2 min-w-0 flex-col items-center justify-center text-center">
            <p className="imperial-script-regular mb-1 text-xl capitalize leading-none text-[#1e4566] not-italic sm:mb-1.5 sm:text-2xl md:text-3xl">
              Reception
            </p>
            <div className="mb-2 text-base font-boska text-[#1e4566] sm:text-lg md:text-xl lg:text-2xl">
              {reception.name}
            </div>
            {formatVenueLine(reception) && (
              <p className="mb-3 text-xs font-albert text-[#1e4566]/90 sm:text-sm">
                {formatVenueLine(reception)}
              </p>
            )}
            <p className="mb-4 text-xs font-albert text-[#1e4566] sm:mb-5 sm:text-sm md:text-base">
              <span className="font-semibold">Time:</span> {reception.time}
            </p>
            <div className="mt-auto flex w-full justify-center">
              <SecondaryButton
                href={venueGoogleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={ArrowRight}
              >
                Get directions
              </SecondaryButton>
            </div>
          </div>
          <div className="flex w-1/2 min-w-0 shrink-0 items-stretch justify-center">
            <div className="venue-image-container relative w-full max-w-none">
              <img
                src="/assets/images/venues/reception.jpg"
                alt={reception.name}
                className="h-full w-full rounded object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue


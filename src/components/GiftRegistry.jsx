import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)

  useEffect(() => {
    if (giftRegistryRef.current) {
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          giftRegistryRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === giftRegistryRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="mt-20 relative gift-registry-section">
      <div ref={giftRegistryRef} className="text-center relative z-10">
        <h3 className="relative inline-block px-6 py-3 mb-4">
          <span className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase gift-registry-title-text">
            Couple's Request
          </span>
        </h3>
        <p className="text-base sm:text-lg font-albert font-thin text-white max-w-3xl mx-auto leading-relaxed">
          Sharing our Wedding day with you is what matters most but if you desire to give nonetheless a monetary gifts are welcome during our prosperous dance.
        </p>
      </div>
    </div>
  )
}

export default GiftRegistry

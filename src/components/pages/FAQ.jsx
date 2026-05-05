import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FAQSection from '../FAQSection'
import './Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)

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

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        data-section="faq"
        className="relative w-full overflow-hidden bg-white details-section"
      >
        <FAQSection id="faq" />
      </section>

      {/* Back */}
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
        className="back-button fixed bottom-12 right-6 z-[100] inline-flex aspect-square size-16 shrink-0 items-center justify-center rounded-full bg-[#c6d7f4] font-albert text-xs font-semibold uppercase leading-none tracking-[0.12em] text-[#1e4566] shadow-lg underline decoration-[#1e4566]/50 underline-offset-[0.25em] transition-colors duration-300 hover:bg-[#c6d7f4] sm:size-[4.25rem] sm:text-sm sm:tracking-[0.14em]"
      >
        Back
      </button>
    </>
  )
}

export default FAQ


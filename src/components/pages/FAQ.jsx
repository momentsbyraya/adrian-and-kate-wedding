import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft } from 'lucide-react'
import { faq as faqData } from '../../data'
import './Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)
  const faqItems = faqData

  // Helper function to get icon and clean text for FAQ questions
  const getFaqIconAndText = (question) => {
    // Remove any emoji at the start if present
    const emojiPattern = /^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/
    const cleanText = question.replace(emojiPattern, '').trim()
    
    return { Icon: null, text: cleanText }
  }

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

    // FAQ section animation - title first, then items one after the other
    if (faqRef.current && faqTitleRef.current) {
      // Set initial states
      gsap.set(faqTitleRef.current, { opacity: 0, y: 30 })
        
      ScrollTrigger.create({
        trigger: faqRef.current,
        start: "top 80%",
        onEnter: () => {
          // 1. Animate title first
          gsap.to(faqTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              // 2. After title animation, find and animate items one after the other
              const faqItemsContainer = faqRef.current.querySelector('.space-y-6')
              if (faqItemsContainer) {
                const faqItems = Array.from(faqItemsContainer.children).filter(child => child.tagName === 'DIV')
                
                if (faqItems.length > 0) {
                  // Set initial states for items
                  gsap.set(faqItems, { opacity: 0, y: 30 })
                  
                  // Animate items one after the other
                  gsap.to(faqItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.2
                  })
                }
              }
            }
          })
        }
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
        id="faq"
        data-section="faq"
        className="relative w-full overflow-hidden bg-white details-section"
      >
        {/* FAQ Section */}
        <div className="relative z-20 faq-section">
          <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16 py-12">
            <h3 ref={faqTitleRef} className="relative inline-block px-6 py-3 mb-12 text-center w-full">
              <span 
                className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase faq-title-text"
                style={{ lineHeight: '0.8' }}
              >
                Frequently Asked Questions
              </span>
            </h3>
            {faqItems && faqItems.faqData && (
              <div className="space-y-6 max-w-[600px] mx-auto">
                {faqItems.faqData.map((item, index) => {
                  const { text } = getFaqIconAndText(item.question)
                  return (
                    <div key={index}>
                      <div className="mb-2">
                        <p className="text-base sm:text-lg font-albert text-[#f5f5f0] mb-2 faq-question-bold">
                          Q: {text}
                        </p>
                        <p className="text-sm sm:text-base font-albert font-thin text-[#f5f5f0] whitespace-pre-line">
                          A: {item.answer}
                        </p>
                      </div>
                      {index < faqItems.faqData.length - 1 && (
                        <div className="h-px bg-[#f5f5f0]/30 mt-6"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back Button - Circular, Bottom Right */}
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
        className="fixed bottom-12 right-6 z-[100] w-14 h-14 bg-[#6F4827] text-white rounded-full shadow-lg hover:bg-[#6F4827]/80 hover:scale-110 transition-all duration-300 flex items-center justify-center group back-button"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
    </>
  )
}

export default FAQ

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faq as faqData } from '../data'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const getFaqIconAndText = (question) => {
  const emojiPattern = /^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/
  const cleanText = question.replace(emojiPattern, '').trim()
  return { Icon: null, text: cleanText }
}

const FAQSection = ({ id = 'faq' }) => {
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)
  const faqItems = faqData
  const scrollTriggerInstance = useRef(null)

  useEffect(() => {
    if (!faqRef.current || !faqTitleRef.current) return

    gsap.set(faqTitleRef.current, { opacity: 0, y: 30 })

    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: faqRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(faqTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            const faqItemsContainer = faqRef.current.querySelector('.space-y-6')
            if (faqItemsContainer) {
              const items = Array.from(faqItemsContainer.children).filter(
                (child) => child.tagName === 'DIV'
              )
              if (items.length > 0) {
                gsap.set(items, { opacity: 0, y: 30 })
                gsap.to(items, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  stagger: 0.2
                })
              }
            }
          }
        })
      }
    })

    return () => {
      scrollTriggerInstance.current?.kill()
      scrollTriggerInstance.current = null
    }
  }, [])

  return (
    <div id={id} data-section="faq" className="relative z-20 faq-section">
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
                    <p className="faq-question-bold mb-2 text-base font-albert text-[#2F3E46] sm:text-lg">
                      Q: {text}
                    </p>
                    <p className="whitespace-pre-line text-sm font-albert font-thin text-[#2F3E46] sm:text-base">
                      A: {item.answer}
                    </p>
                  </div>
                  {index < faqItems.faqData.length - 1 && (
                    <div className="mt-6 h-px bg-[#2F3E46]/20" aria-hidden />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQSection

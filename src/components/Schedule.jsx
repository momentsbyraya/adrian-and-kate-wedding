import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { couple } from '../data'
import { WEDDING_BLUSH, WEDDING_TEXT_DARK_BLUE } from '../config/themeConfig'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const scheduleTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)
  const dateSelectorRef = useRef(null)

  useEffect(() => {
    if (scheduleTitleRef.current) {
      ScrollTrigger.create({
        trigger: scheduleTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(scheduleTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (dateSelectorRef.current) {
      const flexContainer = dateSelectorRef.current.querySelector('.flex.items-center')
      if (flexContainer) {
        const allItems = Array.from(flexContainer.children)
        const heartContainer = allItems.find(item => item.querySelector('svg'))
        const heartSvg = heartContainer?.querySelector('svg')
        const heartNumber = heartContainer?.querySelector('.heart-day-number')
        
        const nearestBoxes = allItems.filter((item, idx) => {
          const isHeart = item.querySelector('svg')
          if (isHeart) return false
          const heartIndex = allItems.findIndex(i => i.querySelector('svg'))
          return idx === heartIndex - 1 || idx === heartIndex + 1
        })
        
        const furthestBoxes = allItems.filter((item, idx) => {
          const isHeart = item.querySelector('svg')
          if (isHeart) return false
          const heartIndex = allItems.findIndex(i => i.querySelector('svg'))
          return idx === 0 || idx === allItems.length - 1
        })
        
        if (heartSvg) {
          gsap.set(heartSvg, { opacity: 0, scale: 0 })
        }
        if (heartNumber) {
          gsap.set(heartNumber, { opacity: 0, scale: 0 })
        }
        nearestBoxes.forEach(box => {
          gsap.set(box, { opacity: 0, x: -20 })
        })
        furthestBoxes.forEach(box => {
          gsap.set(box, { opacity: 0, x: -20 })
        })
        
        ScrollTrigger.create({
          trigger: dateSelectorRef.current,
          start: "top 75%",
          onEnter: () => {
            if (heartSvg) {
              gsap.to(heartSvg, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
              })
            }
            
            if (heartNumber) {
              gsap.to(heartNumber, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.3
              })
            }
            
            gsap.to(nearestBoxes, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.6,
              stagger: 0.1
            })
            
            gsap.to(furthestBoxes, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.9,
              stagger: 0.1
            })
          }
        })
      }
    }

    if (lineRef.current) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%",
        animation: gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          { scaleY: 1, duration: 1.5, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('div.flex.items-center')
      if (eventItems.length > 0) {
        gsap.set(eventItems, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: eventsRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(eventItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.2
            })
          }
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === scheduleTitleRef.current ||
          trigger.vars.trigger === dateSelectorRef.current ||
          trigger.vars.trigger === timelineRef.current ||
          trigger.vars.trigger === eventsRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div className="relative program-section">
      <div ref={scheduleTitleRef} className="relative z-10 mb-12 sm:mb-16 program-title-container">
        <h3 className="px-6 py-3">
          <span 
            className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase program-title-text"
          >
            Order of Events
          </span>
        </h3>
        <p
          className="text-sm sm:text-base md:text-lg font-albert text-center mt-4 mx-auto px-4 program-description"
          style={{ color: WEDDING_TEXT_DARK_BLUE }}
        >
          Ceremony at 2:30 PM, then join us for reception from 4:30 PM to 9:00 PM
        </p>
        
        <div ref={dateSelectorRef} className="flex flex-col items-center mt-8">
          <p
            className="text-base sm:text-lg font-boska mb-4 date-month-year"
            style={{ color: WEDDING_TEXT_DARK_BLUE }}
          >
            {couple.wedding.month} {couple.wedding.year}
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            {[parseInt(couple.wedding.day) - 2, parseInt(couple.wedding.day) - 1, parseInt(couple.wedding.day), parseInt(couple.wedding.day) + 1, parseInt(couple.wedding.day) + 2].map((day, index) => {
              const isWeddingDay = day === parseInt(couple.wedding.day)
              const isBesideHeart = index === 1 || index === 3
              return (
                <div key={index} className="relative">
                  {isWeddingDay ? (
                    <div className="relative flex items-center justify-center">
                      <svg 
                        className="w-20 h-20 sm:w-24 sm:h-24"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M50,85 C30,70 10,50 10,30 C10,15 22,5 35,5 C42,5 48,8 50,12 C52,8 58,5 65,5 C78,5 90,15 90,30 C90,50 70,70 50,85 Z" 
                          fill={WEDDING_BLUSH}
                        />
                      </svg>
                      <span
                        className="absolute inset-0 flex items-center justify-center font-boska font-semibold text-xl sm:text-2xl heart-day-number"
                        style={{ color: WEDDING_TEXT_DARK_BLUE }}
                      >
                        {day}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`flex items-center justify-center rounded-lg border border-[#1e4566]/35 ${isBesideHeart ? 'w-12 h-12 sm:w-14 sm:h-14 border-[#1e4566]/45' : 'w-10 h-10 sm:w-12 sm:h-12'}`}
                    >
                      <span className="font-boska text-base sm:text-lg" style={{ color: WEDDING_TEXT_DARK_BLUE }}>
                        {day}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto z-10 timeline-container">
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2 bg-[#1e4566]/35"
        />

        <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex items-center justify-end">
            </div>
            <div className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 transform rounded-full bg-[#1e4566]" />
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                2:30 PM
              </div>
              <div className="mb-1 border-b border-dashed border-[#1e4566]/40" />
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Ceremony
              </div>
            </div>
          </div>

          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                4:30 PM
              </div>
              <div className="mb-1 border-b border-dashed border-[#1e4566]/40" />
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Reception begins
              </div>
            </div>
            <div className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 transform rounded-full bg-[#1e4566]" />
            <div className="w-1/2 pl-6 text-left flex items-center justify-start">
            </div>
          </div>

          <div className="flex items-center relative min-h-[60px]">
            <div className="w-1/2 pr-6 text-right flex items-center justify-end">
            </div>
            <div className="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 transform rounded-full bg-[#1e4566]" />
            <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl alice-regular mb-1 timeline-event-time">
                9:00 PM
              </div>
              <div className="mb-1 border-b border-dashed border-[#1e4566]/40" />
              <div className="text-sm sm:text-base md:text-lg font-albert timeline-event-description">
                Celebration concludes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule

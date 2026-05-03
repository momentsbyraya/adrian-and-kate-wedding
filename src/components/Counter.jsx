import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const countdownRef = useRef(null)

  useEffect(() => {
    // Countdown numbers stagger animation
    if (countdownRef.current) {
      gsap.fromTo(".countdown-number", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          stagger: 0.2
        }
      )
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ marginTop: '2rem' }}
    >
      {/* Countdown Timer */}
      <div ref={countdownRef} className="flex justify-center items-center space-x-3 px-4">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#6F4827] mb-1 countdown-number not-italic">
            {countdown.days}
          </div>
          <div className="text-xs sm:text-sm text-[#6F4827] opacity-80 font-medium">Days</div>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#6F4827]">:</div>
        
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#6F4827] mb-1 countdown-number not-italic">
            {countdown.hours}
          </div>
          <div className="text-xs sm:text-sm text-[#6F4827] opacity-80 font-medium">Hours</div>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#6F4827]">:</div>
        
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#6F4827] mb-1 countdown-number not-italic">
            {countdown.minutes}
          </div>
          <div className="text-xs sm:text-sm text-[#6F4827] opacity-80 font-medium">Minutes</div>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#6F4827]">:</div>
        
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#6F4827] mb-1 countdown-number not-italic">
            {countdown.seconds}
          </div>
          <div className="text-xs sm:text-sm text-[#6F4827] opacity-80 font-medium">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default Counter 
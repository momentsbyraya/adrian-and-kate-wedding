import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import Line from './Line'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const category1Ref = useRef(null)
  const category2Ref = useRef(null)
  const [activeTooltip, setActiveTooltip] = useState(null)
  
  const colorNames = {
    '#FFFFFF': 'Pure White',
    '#F5F5F0': 'Soft Ivory'
  }

  useEffect(() => {
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    if (category1Ref.current) {
      const category1Container = category1Ref.current
      const flexContainer = category1Container.querySelector('.dresscode-layout')
      if (flexContainer) {
        const category1Image = flexContainer.querySelector('.dresscode-image-container')
        const category1Content = flexContainer.querySelector('.dresscode-content')
        
        if (category1Image) {
          gsap.set(category1Image, { opacity: 0, x: -30 })
        }
        if (category1Content) {
          gsap.set(category1Content, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: category1Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category1Image) {
              gsap.to(category1Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category1Content) {
              gsap.to(category1Content, {
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

    if (category2Ref.current) {
      const category2Container = category2Ref.current
      const flexContainer = category2Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category2Image = flexContainer.querySelector('.dresscode-image-container')
        const category2Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
        if (category2Image) {
          gsap.set(category2Image, { opacity: 0, x: 30 })
        }
        if (category2Content) {
          gsap.set(category2Content, { opacity: 0, x: -30 })
        }
        
        ScrollTrigger.create({
          trigger: category2Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category2Content) {
              gsap.to(category2Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category2Image) {
              gsap.to(category2Image, {
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          trigger.vars.trigger === category1Ref.current ||
          trigger.vars.trigger === category2Ref.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  const whiteColors = ['#FFFFFF', '#F5F5F0']

  return (
    <div className="relative pb-20 sm:pb-24 md:pb-32 attire-section">
      {/* Top Wave - Attire Section */}
      <div className="wave relative w-full" style={{ marginBottom: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill="#e3d1c3" fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16">
        <div>
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/falling-flower.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase dress-code-title-text"
            >
              The Attire
            </span>
          </h3>
          <p className="text-base sm:text-lg font-albert font-thin italic dress-code-description">
            We would love to see you in your
            comfiest attire
            that suits in our color motif
          </p>
        </div>
      </div>

      <div className="flex flex-col items-stretch">
        <div className="relative overflow-visible flex-1">
          <div className="relative overflow-visible">
            <div 
              ref={category1Ref}
              className="transition-opacity duration-500 ease-in-out"
            >
              <div className="dresscode-layout flex flex-col gap-6 md:gap-8 items-center">
                {/* Image on Top */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <div className="w-full relative dresscode-image-container">
                    <img 
                      src="/assets/images/dresscode/guests.png" 
                      alt="All white attire" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>

                {/* Text & Swatches Below */}
                <div className="w-full max-w-xl mx-auto text-center dresscode-content">
                  <div className="w-full">
                    <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#3d2f25] mb-2">
                      All White
                    </div>
                    <p className="text-sm sm:text-base font-albert font-thin italic text-[#3d2f25] mb-3">
                      Our dress code is all white. Feel free to come in any elegant shade of white that makes you feel your best.
                    </p>
                    <div className="flex gap-2 justify-center">
                      {whiteColors.map((color, index) => (
                        <div 
                          key={index}
                          className="relative group"
                          onMouseEnter={() => setActiveTooltip(`white-${index}`)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() => setActiveTooltip(activeTooltip === `white-${index}` ? null : `white-${index}`)}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded cursor-pointer" style={{ backgroundColor: color }}></div>
                          {activeTooltip === `white-${index}` && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none color-swatch-tooltip" style={{ position: 'absolute' }}>
                              {colorNames[color]}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#333333]"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave - Attire Section */}
      <div className="wave wave-bottom relative w-full" style={{ marginTop: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto" style={{ display: 'block' }}>
          <path fill="#e3d1c3" fillOpacity="1" stroke="none" d="M0,192L60,165.3C120,139,240,85,360,90.7C480,96,600,160,720,197.3C840,235,960,245,1080,229.3C1200,213,1320,171,1380,149.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
    </div>
  )
}

export default DressCode

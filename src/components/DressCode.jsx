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
    '#D4A5A5': 'Dusty Pink',
    '#C08081': 'Old Rose',
    '#F5C2C2': 'Light Pink',
    '#87AE73': 'Sage Green',
    '#D4AF37': 'Gold'
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
      const flexContainer = category1Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category1Image = flexContainer.querySelector('.dresscode-image-container')
        const category1Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-boska')
        )
        
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

  const gentlemenColors = ['#D4A5A5', '#C08081', '#F5C2C2', '#87AE73', '#D4AF37']
  const ladiesColors = ['#D4A5A5', '#C08081', '#F5C2C2', '#87AE73', '#D4AF37']

  return (
    <div className="relative pb-20 sm:pb-24 md:pb-32">
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
            formal attire
            that suits in our color motif
          </p>
        </div>
      </div>

      <div className="flex flex-col lg-custom:flex-row gap-3 lg-custom:gap-4 items-stretch">
        <div className="relative overflow-visible flex-1">
          <div className="relative overflow-visible">
            <div 
              ref={category1Ref}
              className="transition-opacity duration-500 ease-in-out"
            >
              <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-start">
                <div className="w-1/2 lg-custom:w-full flex flex-col text-right lg-custom:text-left order-1 lg-custom:order-2">
                  <div className="w-full">
                    <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-right lg-custom:text-left">
                      Gentlemen
                    </div>
                    <p className="text-sm sm:text-base font-albert font-thin italic text-[#333333] mb-3 text-right lg-custom:text-left">
                      Barong tagalog (beige/ivory) / polo/ long sleeve/ slacks
                    </p>
                    <div className="flex gap-2 justify-end lg-custom:justify-start">
                      {gentlemenColors.map((color, index) => (
                        <div 
                          key={index}
                          className="relative group"
                          onMouseEnter={() => setActiveTooltip(`gentlemen-${index}`)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() => setActiveTooltip(activeTooltip === `gentlemen-${index}` ? null : `gentlemen-${index}`)}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded cursor-pointer" style={{ backgroundColor: color }}></div>
                          {activeTooltip === `gentlemen-${index}` && (
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
                <div className="w-1/2 lg-custom:w-full order-2 lg-custom:order-1">
                  <div className="w-full relative dresscode-image-container">
                    <img 
                      src="/assets/images/dresscode/gentlemen.png" 
                      alt="Gentlemen" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <>
          <div className="hidden lg-custom:block w-px bg-[#333333] opacity-40 self-stretch"></div>
          <div className="lg-custom:hidden w-full">
            <Line />
          </div>
        </>

        <div className="relative overflow-visible flex-1">
          <div className="relative overflow-visible">
            <div 
              ref={category2Ref}
              className="text-center transition-opacity duration-500 ease-in-out"
            >
              <div className="flex flex-row lg-custom:flex-col gap-6 md:gap-8 lg-custom:gap-6 items-start">
                <div className="w-1/2 lg-custom:w-full">
                  <div className="w-full relative dresscode-image-container">
                    <img 
                      src="/assets/images/dresscode/ladies.png" 
                      alt="Ladies" 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </div>
                <div className="w-1/2 lg-custom:w-full flex flex-col justify-between text-left lg-custom:text-left dresscode-image-container">
                  <div>
                    <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-left lg-custom:text-left">
                      Ladies
                    </div>
                    <p className="text-sm sm:text-base font-albert font-thin italic text-[#333333] mb-3 text-left lg-custom:text-left">
                      Long gown/ formal jumpsuit/ cocktail dress (avoid wearing white)
                    </p>
                    <div className="flex gap-2 justify-start lg-custom:justify-start">
                      {ladiesColors.map((color, index) => (
                        <div
                          key={index}
                          className="relative group"
                          onMouseEnter={() => setActiveTooltip(`ladies-${index}`)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() => setActiveTooltip(activeTooltip === `ladies-${index}` ? null : `ladies-${index}`)}
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded cursor-pointer" style={{ backgroundColor: color }}></div>
                          {activeTooltip === `ladies-${index}` && (
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
    </div>
  )
}

export default DressCode

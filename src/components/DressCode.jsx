import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { dresscode } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const DressCodeCategoryRow = ({
  section,
  imageFirst,
  activeTooltip,
  setActiveTooltip
}) => {
  if (!section) return null

  const imageBlock = (
    <div className="flex w-1/2 min-w-0 shrink-0 items-stretch justify-center">
      <div className="relative w-full max-w-none dresscode-image-container">
        <img
          src={section.image}
          alt={section.title}
          className="h-full min-h-[100px] w-full rounded object-cover"
        />
      </div>
    </div>
  )

  const contentBlock = (
    <div className="dresscode-content flex w-1/2 min-w-0 flex-col items-center justify-center px-1 text-center sm:px-2">
      <div className="w-full">
        <div
          className={`mb-1 text-base font-boska sm:mb-2 sm:text-lg md:text-xl lg:text-2xl ${themeConfig.text.secondary}`}
        >
          {section.title}
        </div>
        <p
          className={`mb-2 text-xs font-albert font-thin italic sm:mb-3 sm:text-sm md:text-base ${themeConfig.text.secondary}`}
        >
          {section.description}
        </p>
        {section.colors?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {section.colors.map((color, index) => {
              const tipId = `${section.id}-${index}`
              return (
                <div
                  key={tipId}
                  className="relative group"
                  onMouseEnter={() => setActiveTooltip(tipId)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => setActiveTooltip(activeTooltip === tipId ? null : tipId)}
                >
                  <div
                    className="h-5 w-5 cursor-pointer rounded border border-[#6D5959]/35 sm:h-7 sm:w-7"
                    style={{ backgroundColor: color.hex }}
                  />
                  {activeTooltip === tipId && (
                    <div
                      className={`color-swatch-tooltip pointer-events-none absolute bottom-full left-1/2 z-[9999] mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-[#E2EAFC] px-2 py-1 text-xs ${themeConfig.text.secondary}`}
                      style={{ position: 'absolute' }}
                    >
                      {color.name}
                      <div className="absolute left-1/2 top-full -mt-1 -translate-x-1/2 transform border-4 border-transparent border-t-[#E2EAFC]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="dresscode-layout flex min-w-0 flex-row items-stretch gap-3 sm:gap-4 md:gap-6">
      {imageFirst ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}

const DressCode = () => {
  const dressCodeTitleRef = useRef(null)
  const rowRefs = useRef([])
  const [activeTooltip, setActiveTooltip] = useState(null)

  const sections = dresscode.sections ?? []
  const attireIntro = dresscode.mainDressCode?.description ?? ''

  useEffect(() => {
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    const setupCategoryScroll = (element, imageOnRight) => {
      if (!element) return
      const flexContainer = element.querySelector('.dresscode-layout')
      if (!flexContainer) return
      const imageEl = flexContainer.querySelector('.dresscode-image-container')
      const contentEl = flexContainer.querySelector('.dresscode-content')
      if (imageOnRight) {
        if (imageEl) gsap.set(imageEl, { opacity: 0, x: 30 })
        if (contentEl) gsap.set(contentEl, { opacity: 0, x: -30 })
      } else {
        if (imageEl) gsap.set(imageEl, { opacity: 0, x: -30 })
        if (contentEl) gsap.set(contentEl, { opacity: 0, x: 30 })
      }
      ScrollTrigger.create({
        trigger: element,
        start: 'top 75%',
        onEnter: () => {
          if (imageEl) {
            gsap.to(imageEl, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' })
          }
          if (contentEl) {
            gsap.to(contentEl, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.2
            })
          }
        }
      })
    }

    sections.forEach((_, i) => {
      const el = rowRefs.current[i]
      if (el) setupCategoryScroll(el, i % 2 === 1)
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const t = trigger.vars?.trigger
        if (!t) return
        if (t === dressCodeTitleRef.current || rowRefs.current.includes(t)) {
          trigger.kill()
        }
      })
    }
  }, [sections.length])

  return (
    <div className="relative pb-20 sm:pb-24 md:pb-32 attire-section">
      <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16 pt-8 sm:pt-10">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src="/assets/images/graphics/falling-flower.png"
              alt="Flower decoration"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase dress-code-title-text">
              The Attire
            </span>
          </h3>
          <p className="text-base sm:text-lg font-albert font-thin italic dress-code-description max-w-2xl mx-auto px-2">
            {attireIntro}
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-12 px-3 sm:gap-16 sm:px-4 md:gap-20">
        {sections.map((section, i) => (
          <React.Fragment key={section.id}>
            {i > 0 && (
              <hr
                className="dresscode-category-divider w-full border-0 border-t border-dashed border-[#6D5959]/30"
                aria-hidden="true"
              />
            )}
            <div
              ref={(el) => {
                rowRefs.current[i] = el
              }}
              className="min-w-0 transition-opacity duration-500 ease-in-out"
            >
              <DressCodeCategoryRow
                section={section}
                imageFirst={i % 2 === 0}
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default DressCode

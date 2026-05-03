import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { themeConfig } from '../config/themeConfig'
import { prenupOpeningUrls } from '../data/prenup'

/** Three prenup shots — grid / stack layouts (see `src/data/prenup.js`). */
const OPENING_PRENUP_IMAGES = prenupOpeningUrls

/** `'grid'` — three full-width rows. `'stack'` — rotated stack (kept for later). */
const OPENING_BG_MODE = 'grid'

function OpeningScreen({ onEnvelopeOpen }) {
  const envelopeRef = useRef(null)
  const openingSectionRef = useRef(null)
  const clickMeRef = useRef(null)
  const coupleNameRef = useRef(null)
  const stampRef = useRef(null)

  // Animate text and envelope on mount
  useEffect(() => {
    if (clickMeRef.current) gsap.set(clickMeRef.current, { opacity: 0, y: -30 })
    if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, scale: 0.8 })
    if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })

    const tl = gsap.timeline({ delay: 0.3 })

    if (clickMeRef.current) {
      tl.to(clickMeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
    }

    if (envelopeRef.current) {
      tl.to(envelopeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4")
    }

    if (coupleNameRef.current) {
      tl.to(coupleNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
    }

    if (stampRef.current) {
      gsap.to(stampRef.current, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1
      })
    }
  }, [])

  const handleEnvelopeClick = () => {
    const envelope = envelopeRef.current
    const openingSection = openingSectionRef.current

    if (envelope) {
      envelope.classList.add('active')
      setTimeout(() => {
        if (openingSection) {
          openingSection.classList.add('zooming-out')
          setTimeout(() => {
            if (onEnvelopeOpen) {
              onEnvelopeOpen()
            }
          }, 1500)
        }
      }, 2100)
    }
  }

  return (
    <div
      ref={openingSectionRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center opening-section"
      style={themeConfig.cssVariables}
    >
      {OPENING_BG_MODE === 'stack' ? (
        <div className="opening-stack-wrap" aria-hidden="true">
          <div className="opening-stack-inner">
            {OPENING_PRENUP_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`opening-stack-img opening-stack-img--${i === 0 ? 'back' : i === 1 ? 'mid' : 'front'}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="opening-bg-grid" aria-hidden="true">
          {OPENING_PRENUP_IMAGES.map((src) => (
            <div key={src} className="opening-bg-grid-row">
              <img src={src} alt="" className="opening-bg-grid-img" />
            </div>
          ))}
        </div>
      )}
      <div className="absolute inset-0 z-[1] bg-black/35 pointer-events-none" aria-hidden />
      <section className="cssletter flex flex-col items-center relative z-10 w-full py-8" style={{ minHeight: 'auto', height: 'auto' }}>
        <div ref={clickMeRef} className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center click-me-container">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-foglihten uppercase leading-tight" style={{ color: '#EDEDDD' }}>
            YOU ARE CORDIALLY
          </p>
          <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight" style={{ fontFamily: 'Pinyon Script, cursive', color: '#F5F5DC' }}>
            Invited
          </p>
        </div>
        <div className="envelope" ref={envelopeRef}>
          <button
            className="heart stamp-button"
            id="openEnvelope"
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img
              ref={stampRef}
              src="/assets/images/graphics/stamp.png"
              alt="Stamp"
              className="stamp-image"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          <div className="envelope-letter envelope-letter-centered">
            <p className="opening-envelope-invite text-lg sm:text-xl md:text-2xl font-bold px-2 leading-snug">
              Celebrate with Us
            </p>
            <img
              src="/assets/images/graphics/cutlery-sketch.png"
              alt="Cutlery sketch"
              className="mt-4 w-20 sm:w-24 md:w-28 h-auto mx-auto"
              onError={(e) => {
                e.target.src = '/assets/images/graphics/ring-sketch.png'
              }}
            />
          </div>
        </div>
        <div ref={coupleNameRef} className="mt-4 sm:mt-6 md:mt-8 text-center couple-name-container">
          <p
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-foglihten uppercase leading-tight"
            style={{
              color: '#EDEDDD',
              fontSize: 'clamp(1.5rem, 4vw, 48px)',
              textShadow: 'none',
              cursor: 'pointer'
            }}
            onClick={handleEnvelopeClick}
          >
            CLICK TO OPEN
          </p>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen

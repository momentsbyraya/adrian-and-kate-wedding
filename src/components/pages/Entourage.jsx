import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { couple, entourage } from '../../data'
import { themeConfig } from '../../config/themeConfig'
import './Entourage.css'

gsap.registerPlugin(ScrollTrigger)

const labelClass =
  'sponsor-role-title-wrap text-[12px] sm:text-[15px] md:text-[17px] lg:text-[19px] caudex-bold mb-2 text-center uppercase entourage-block-hl'

const lineClass =
  'text-[10.5px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-poppins uppercase entourage-anim-name'

/** Heading uses less margin below title (before names / next block) */
const entourageTightHeadingBottom = new Set(['Secondary Sponsors', 'Principal Sponsor', 'Ring bearer', 'Coin bearer', 'Bible bearer', 'Flower girls'])

/** Bearers + flower girls stack — reduce top margin vs other section `hl` */
const entourageBearerFlowerHl = new Set(['Ring bearer', 'Coin bearer', 'Bible bearer', 'Flower girls'])

/** 50–50 mirrored columns (groom side text-right / bride side text-left), same grid as draft parents + BM/MOH */
function renderMirroredRolesTwoCol(block, index) {
  const left = block.left ?? {}
  const right = block.right ?? {}
  const leftLines = left.lines ?? []
  const rightLines = right.lines ?? []
  return (
    <div
      key={index}
      className="mx-auto mb-8 mt-8 grid w-full max-w-5xl grid-cols-2 justify-center gap-x-3 sm:gap-x-4 px-1 sm:px-2"
    >
      <div className="family-col-groom flex min-w-0 w-full flex-col items-end gap-0 text-right">
        <h3 className={`${labelClass} !text-right mt-0 !mb-1 w-full px-0.5 break-words`}>{left.title}</h3>
        {leftLines.map((line, j) => (
          <p
            key={j}
            className={`${lineClass} m-0 max-w-full whitespace-normal break-words text-right leading-[1.2]`}
          >
            {line}
          </p>
        ))}
      </div>
      <div className="family-col-bride flex min-w-0 w-full flex-col items-start gap-0 text-left">
        <h3 className={`${labelClass} !text-left mt-0 !mb-1 w-full px-0.5 break-words`}>{right.title}</h3>
        {rightLines.map((line, j) => (
          <p
            key={j}
            className={`${lineClass} m-0 max-w-full whitespace-normal break-words text-left leading-[1.2]`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function renderBlock(block, index) {
  switch (block.t) {
    case 'hl': {
      const bearerFlower = entourageBearerFlowerHl.has(block.text)
      const tightBelow = entourageTightHeadingBottom.has(block.text)
      return (
        <h3
          key={index}
          className={`${labelClass} ${bearerFlower ? '!mt-3' : 'mt-8'} ${tightBelow ? '!mb-1' : ''}`}
        >
          {block.text}
        </h3>
      )
    }

    case 'subhl':
      return (
        <p key={index} className={`${labelClass} !mt-3 !mb-0.5`}>
          {block.text}
        </p>
      )

    case 'parentsTwoCol':
    case 'rolesTwoCol':
      return renderMirroredRolesTwoCol(block, index)

    case 'p': {
      const lines = block.lines ?? []
      return (
        <div key={index} className="mb-0.5 flex flex-col items-center gap-0.5">
          {lines.map((line, j) => (
            <p key={j} className={`${lineClass} m-0 text-center leading-[1.2]`}>
              {line}
            </p>
          ))}
        </div>
      )
    }

    case 'principal': {
      const rows = block.rows ?? []
      return (
        <div key={index} className="mx-auto mb-5 w-full max-w-5xl space-y-1 px-1 sm:px-2">
          {rows.map((row, ri) => {
            if (!row || row.length === 0) return null
            if (row.length >= 2) {
              const [left, right] = row
              return (
                <div key={ri} className="grid w-full grid-cols-2 items-start gap-x-4 sm:gap-x-6">
                  <p className={`${lineClass} m-0 min-w-0 text-right whitespace-normal leading-[1.2]`}>{left}</p>
                  <p className={`${lineClass} m-0 min-w-0 text-left whitespace-normal leading-[1.2]`}>{right}</p>
                </div>
              )
            }
            return (
              <div key={ri} className="flex w-full justify-center overflow-visible">
                <p className={`${lineClass} m-0 text-center whitespace-normal leading-[1.2]`}>{row[0]}</p>
              </div>
            )
          })}
        </div>
      )
    }

    case 'pairRow':
      return (
        <div
          key={index}
          className="mx-auto mb-1 flex max-w-5xl flex-col items-center gap-0.5"
        >
          <p className={`${lineClass} m-0 whitespace-normal text-center leading-[1.2]`}>{block.left}</p>
          <p className={`${lineClass} m-0 whitespace-normal text-center leading-[1.2]`}>{block.right}</p>
        </div>
      )

    case 'twoCol':
      return (
        <div key={index} className="mx-auto mb-6 mt-3 w-full max-w-5xl px-1 sm:px-2">
          <div className="mb-1 grid w-full grid-cols-2 items-start gap-x-4 sm:gap-x-6">
            <p className="sponsor-role-title-wrap mb-1 text-right text-[12px] uppercase caudex-bold sm:text-[15px] md:text-[17px] lg:text-[19px]">
              {block.leftTitle}
            </p>
            <p className="sponsor-role-title-wrap mb-1 text-left text-[12px] uppercase caudex-bold sm:text-[15px] md:text-[17px] lg:text-[19px]">
              {block.rightTitle}
            </p>
          </div>
          <div className="w-full space-y-1">
            {(block.rows ?? []).map((row, ri) => (
              <div key={ri} className="grid w-full grid-cols-2 items-start gap-x-4 sm:gap-x-6">
                <p className={`${lineClass} m-0 min-w-0 text-right whitespace-normal leading-[1.2]`}>{row[0] ?? ''}</p>
                <p className={`${lineClass} m-0 min-w-0 text-left whitespace-normal leading-[1.2]`}>{row[1] ?? ''}</p>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

const Entourage = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const flowersContainerRef = useRef(null)
  const blocks = entourage.blocks ?? []

  useLayoutEffect(() => {
    const startAnimations = () => {
      if (flowersContainerRef.current) {
        const flowers = flowersContainerRef.current.querySelectorAll('.falling-flower')

        if (flowers.length > 0) {
          flowers.forEach((flower) => {
            if (flower.classList.contains('delay-0')) {
              flower.style.animation = 'none'
              void flower.offsetWidth

              flower.style.transform = 'translateY(0vh) rotate(0deg)'
              flower.style.opacity = '0.6'
              flower.style.animationDelay = '0s'
              flower.style.animationPlayState = 'running'

              const speedClass = flower.classList.toString().match(/speed-(slow|medium|fast)/)?.[1] || 'medium'
              const duration = speedClass === 'slow' ? 15 : speedClass === 'fast' ? 8 : 12

              const animationName = `fallingSnowVisible-${speedClass}`
              if (!document.getElementById(`style-${animationName}`)) {
                const style = document.createElement('style')
                style.id = `style-${animationName}`
                style.textContent = `
                  @keyframes ${animationName} {
                    0% {
                      transform: translateY(0vh) rotate(0deg);
                      opacity: 0.6;
                    }
                    90% {
                      opacity: 0.6;
                    }
                    100% {
                      transform: translateY(100vh) rotate(360deg);
                      opacity: 0;
                    }
                  }
                `
                document.head.appendChild(style)
              }

              flower.style.animation = `${animationName} ${duration}s linear infinite`
            } else {
              flower.style.animationPlayState = 'running'
            }
            void flower.offsetWidth
          })
        }
      }
    }

    startAnimations()
    requestAnimationFrame(() => {
      startAnimations()
    })
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const appEl = document.querySelector('.App')
    const prev = {
      html: html.style.overflowX,
      body: body.style.overflowX,
      app: appEl ? appEl.style.overflowX : ''
    }
    html.style.overflowX = 'visible'
    body.style.overflowX = 'visible'
    if (appEl) appEl.style.overflowX = 'visible'
    return () => {
      html.style.overflowX = prev.html
      body.style.overflowX = prev.body
      if (appEl) appEl.style.overflowX = prev.app
    }
  }, [])

  useLayoutEffect(() => {
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
  }, [])

  useEffect(() => {
    const nameLines = sectionRef.current?.querySelectorAll('.entourage-anim-name')
    if (nameLines && nameLines.length > 0) {
      gsap.set(nameLines, { opacity: 0, y: 20 })
    }

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    if (nameLines && nameLines.length > 0 && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(nameLines, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.05
          })
        },
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <div ref={flowersContainerRef} className="pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const leftPosition = `${(i * 5) % 100}%`
          const sizeClass = i % 3 === 0 ? 'size-small' : i % 3 === 1 ? 'size-medium' : 'size-large'
          const speedClass = i % 3 === 0 ? 'speed-slow' : i % 3 === 1 ? 'speed-medium' : 'speed-fast'
          const delayClass = `delay-${i % 15}`
          const isDelayZero = (i % 15) === 0

          return (
            <div
              key={`falling-flower-${i}`}
              className={`falling-flower ${sizeClass} ${speedClass} ${delayClass}`}
              style={{
                left: leftPosition,
                ...(isDelayZero && {
                  animationDelay: '0s',
                  opacity: '0.6',
                  animationPlayState: 'running'
                })
              }}
            >
              <img src="/assets/images/graphics/falling-flower.png" alt="Falling flower" />
            </div>
          )
        })}
      </div>

      <section
        ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative w-full overflow-visible px-6 py-32 sm:py-40 md:py-44 lg:py-52"
      >
        <div className="entourage-bg absolute inset-0 z-0 bg-cover bg-no-repeat" aria-hidden />
        <div className="entourage-overlay absolute inset-0 z-[1]" aria-hidden />

        <div
          className="pointer-events-none absolute left-1/2 top-0 z-[2] flex w-screen max-w-none -translate-x-1/2 justify-center"
          aria-hidden
        >
          <img src="/assets/images/graphics/flower-banner.png" alt="" className="entourage-flower-banner-img" />
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-[2] flex w-screen max-w-none -translate-x-1/2 justify-center"
          aria-hidden
        >
          <img
            src="/assets/images/graphics/flower-banner.png"
            alt=""
            className="entourage-flower-banner-img entourage-flower-banner-img--flip"
          />
        </div>

        <div className="entourage-foreground relative z-20 flex flex-col items-center justify-center overflow-visible py-12">
          <div className="entourage-content-stack mx-auto w-full max-w-4xl min-w-0 px-4 sm:px-6 md:px-8 [&_h3+p]:my-12">
            <div className="mb-12 text-center">
              <div
                ref={headerRef}
                className="text-[1.925rem] sm:text-5xl md:text-6xl mb-10"
                role="group"
                aria-label={`${couple.groom.fullName} and ${couple.bride.fullName} nuptials`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p
                      className={`font-tebranos uppercase text-[2.25rem] sm:text-7xl md:text-8xl lg:text-[5.75rem] tracking-wide leading-none ${themeConfig.text.secondary}`}
                    >
                      {couple.groom.firstName}
                    </p>
                    <p
                      className={`font-ballet text-[2rem] sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] -mt-1 ${themeConfig.text.secondary}`}
                    >
                      {couple.groom.lastName}
                    </p>
                  </div>

                  <p
                    className={`caudex-bold text-[0.9rem] sm:text-base lg:text-xl my-4 sm:my-10 ${themeConfig.text.secondary}`}
                  >
                    AND
                  </p>

                  <div>
                    <p
                      className={`font-tebranos uppercase text-[2.25rem] sm:text-7xl md:text-8xl lg:text-[5.75rem] tracking-wide leading-none ${themeConfig.text.secondary}`}
                    >
                      {couple.bride.firstName}
                    </p>
                    <p
                      className={`font-ballet text-[2rem] sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] -mt-1 leading-none ${themeConfig.text.secondary}`}
                    >
                      {couple.bride.lastName}
                    </p>
                  </div>
                </div>
                <div
                  className={`caudex-bold text-[0.9375rem] sm:text-xl md:text-xl mt-8 lg:mt-10 uppercase mb-14 ${themeConfig.text.secondary}`}
                  style={{ lineHeight: '0.8' }}
                >
                  Nuptials
                </div>
              </div>
            </div>
            {blocks.map((block, i) => renderBlock(block, i))}
          </div>

          <div className="relative z-[50] mt-12 flex w-full justify-center pb-8 sm:mt-16 sm:pb-10">
            <Link
              id="entourage-back-link"
              to="/"
              replace
              className="entourage-back-link inline-block caudex-bold text-sm uppercase tracking-[0.12em] underline decoration-[#8b4a5c]/50 underline-offset-[0.35em] transition-colors duration-300 sm:text-base md:text-lg"
            >
              Back
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Entourage

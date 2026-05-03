import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage, couple } from '../../data'
import { themeConfig } from '../../config/themeConfig'
import './Entourage.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const bibleBearerRef = useRef(null)
  const ringBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const veilSponsorsRef = useRef(null)
  const cordSponsorsRef = useRef(null)
  const candleSponsorsRef = useRef(null)
  const littleFlowerGirlsRef = useRef(null)
  const specialMentionsRef = useRef(null)
  const flowersContainerRef = useRef(null)

  useLayoutEffect(() => {
    // Start falling flowers animation immediately when page opens
    // The first flower (delay-0) starts immediately, others follow with their delays
    const startAnimations = () => {
      if (flowersContainerRef.current) {
        const flowers = flowersContainerRef.current.querySelectorAll('.falling-flower')

        if (flowers.length > 0) {
          flowers.forEach((flower) => {
            // Remove any existing animation delay for delay-0 to start immediately
            if (flower.classList.contains('delay-0')) {
              // Force restart animation by removing and re-adding
              flower.style.animation = 'none'
              void flower.offsetWidth // Force reflow
              
              // Set initial transform to start delay-0 flowers at top of viewport (immediately visible)
              // Start from 0vh instead of -100vh so they're visible right away
              flower.style.transform = 'translateY(0vh) rotate(0deg)'
              flower.style.opacity = '0.6'
              flower.style.animationDelay = '0s'
              flower.style.animationPlayState = 'running'
              
              // Re-apply animation - it will continue from the current transform
              const speedClass = flower.classList.toString().match(/speed-(slow|medium|fast)/)?.[1] || 'medium'
              const duration = speedClass === 'slow' ? 15 : speedClass === 'fast' ? 8 : 12
              
              // Create custom keyframes that start from 0vh (visible) instead of -100vh
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
            // Trigger reflow to ensure animation starts
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

  // Global wrappers use overflow-x: hidden; lift while on this page so long lines are not clipped
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

  /* Hide Entourage slide-in pose before paint. Do NOT use React inline transform/opacity
     on the section — React re-renders would overwrite GSAP and block the exit tween + navigate. */
  useLayoutEffect(() => {
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
  }, [])

  useEffect(() => {
    // Set initial hidden states for all name elements to prevent flash
    const allNameElements = sectionRef.current?.querySelectorAll('p.font-poppins, .ninong-item, .ninang-item, .groomsmen-item, .bridesmaids-item')
    if (allNameElements && allNameElements.length > 0) {
      gsap.set(allNameElements, { opacity: 0, y: 20 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )


    // Collect all names from Parents down to Flower Girls for sequential row-by-row animation
    const allNameRows = []
    let currentTime = 0
    
    // Parents section - collect rows
    if (parentsRef.current) {
      const groomParents = parentsRef.current.querySelectorAll('.family-col-groom p.font-poppins')
      const brideParents = parentsRef.current.querySelectorAll('.family-col-bride p.font-poppins')
      
      if (groomParents.length > 0 && brideParents.length > 0) {
        const maxLength = Math.max(groomParents.length, brideParents.length)
        gsap.set([...groomParents, ...brideParents], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomParents[i]) row.push(groomParents[i])
          if (brideParents[i]) row.push(brideParents[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Principal Sponsors — paired rows use .ninong-item / .ninang-item inside row wrappers
    if (principalSponsorsRef.current) {
      const ninongElements = principalSponsorsRef.current?.querySelectorAll('.ninong-item')
      const ninangElements = principalSponsorsRef.current?.querySelectorAll('.ninang-item')
      
      if (ninongElements && ninangElements && ninongElements.length > 0) {
        const maxLength = Math.max(ninongElements.length, ninangElements.length)
        gsap.set([...ninongElements, ...ninangElements], { opacity: 0, y: 20 })
        
        // Collect paired rows
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (ninongElements[i]) row.push(ninongElements[i])
          if (ninangElements[i]) row.push(ninangElements[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }

      }
    }

    // Bestman and Maid of Honor - collect rows
    if (bestmanRef.current || maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current?.querySelectorAll('p.font-poppins') ?? []
      const maidOfHonorNames = maidOfHonorRef.current?.querySelectorAll('p.font-poppins') ?? []
      
      if (bestmanNames.length > 0 || maidOfHonorNames.length > 0) {
        const maxLength = Math.max(bestmanNames.length, maidOfHonorNames.length)
        gsap.set([...bestmanNames, ...maidOfHonorNames], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (bestmanNames[i]) row.push(bestmanNames[i])
          if (maidOfHonorNames[i]) row.push(maidOfHonorNames[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Groomsmen + Bridesmaids - collect rows (before candle / veil / cord on page)
    if (secondarySponsorsRef.current) {
      const groomsmenElements = secondarySponsorsRef.current?.querySelectorAll('.groomsmen-item')
      const bridesmaidsElements = secondarySponsorsRef.current?.querySelectorAll('.bridesmaids-item')
      
      if (groomsmenElements && bridesmaidsElements && groomsmenElements.length > 0) {
        const maxLength = Math.max(groomsmenElements.length, bridesmaidsElements.length)
        gsap.set([...groomsmenElements, ...bridesmaidsElements], { opacity: 0, y: 20 })
        
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (groomsmenElements[i]) row.push(groomsmenElements[i])
          if (bridesmaidsElements[i]) row.push(bridesmaidsElements[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    // Candle, Veil, Cord — two-column rows use p.font-poppins
    const sponsorRefs = [candleSponsorsRef, veilSponsorsRef, cordSponsorsRef].filter(ref => ref.current)
    sponsorRefs.forEach(ref => {
      const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })

    if (specialMentionsRef.current) {
      const paras = specialMentionsRef.current.querySelectorAll('p.special-mention-text')
      if (paras.length > 0) {
        gsap.set(paras, { opacity: 0, y: 20 })
        Array.from(paras).forEach((p) => {
          allNameRows.push({ elements: [p], time: currentTime })
          currentTime += 0.1
        })
      }
    }
    
    // Bible Bearer, Ring Bearer, Coin Bearer - collect (single column - one name per row)
    const bearerRefs = [bibleBearerRef, ringBearerRef, coinBearerRef].filter(ref => ref.current)
    bearerRefs.forEach(ref => {
      const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })

    // Little Flower Girls - collect (single column - one name per row)
    if (littleFlowerGirlsRef.current) {
      const names = littleFlowerGirlsRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    
    // Animate all collected rows sequentially when any section comes into view
    const nameAnimationTrigger =
      parentsRef.current || principalSponsorsRef.current || sectionRef.current
    if (allNameRows.length > 0 && nameAnimationTrigger) {
      ScrollTrigger.create({
        trigger: nameAnimationTrigger,
        start: "top 80%",
        onEnter: () => {
          const masterTl = gsap.timeline()
          allNameRows.forEach(({ elements, time }) => {
            masterTl.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out"
            }, time)
          })
        },
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourage.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourage.entourageList.find(item => item.category === "Maid of Honor")
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const veilSponsors = entourage.entourageList.find(item => item.category === "Veil Sponsors")
  const cordSponsors = entourage.entourageList.find(item => item.category === "Cord Sponsors")
  const candleSponsors = entourage.entourageList.find(item => item.category === "Candle Sponsors")
  const littleFlowerGirls = entourage.entourageList.find(item => item.category === "Little Flower Girls")

  return (
    <>
      {/* Falling Snow Effect — pointer-events none */}
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
              <img 
                src="/assets/images/graphics/falling-flower.png" 
                alt="Falling flower"
              />
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
        <div className="absolute inset-0 z-0 bg-cover bg-no-repeat entourage-bg" aria-hidden />
        <div className="absolute inset-0 z-[1] entourage-overlay" aria-hidden />

        {/* Content */}
        <div className="entourage-foreground relative z-20 flex flex-col items-center justify-center overflow-visible py-12">
          <div className="mx-auto w-max max-w-none min-w-max px-4 sm:px-6 md:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
                {/* Couple Names */}
                <div className="flex flex-col items-center justify-center">
                  {/* Groom's Name */}
                  <div>
                    <p className={`font-tebranos text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-tight ${themeConfig.text.primary}`}>
                      {couple.groom.firstName}
                    </p>
                    <p className={`font-ballet text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight -mt-4 ${themeConfig.text.primary}`}>
                      {couple.groom.lastName}
                    </p>
                  </div>
                  <p className={`caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl uppercase leading-tight my-1 ${themeConfig.text.primary}`}>
                    AND
                  </p>
                  {/* Bride's Name */}
                  <div>
                    <p className={`font-tebranos text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-tight ${themeConfig.text.primary}`}>
                      {couple.bride.firstName}
                    </p>
                    <p className={`font-ballet text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight -mt-4 ${themeConfig.text.primary}`}>
                      {couple.bride.lastName}
                    </p>
                  </div>
                </div>
                {/* NUPTIALS */}
                <div className={`caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl block leading-none uppercase mt-8 ${themeConfig.text.primary}`} style={{ lineHeight: '0.8' }}>
                  NUPTIALS
                </div>
              </h2>
            </div>

            {/* Family (groom / bride sides) */}
            {entourage.familyMembers && (
              <div ref={parentsRef} className="mb-8 flex flex-row gap-4 sm:gap-6 justify-center items-start shrink-0">
                <div className="family-col-groom shrink-0 min-w-max">
                  {entourage.familyMembers.groomSide.map((entry, index) => (
                    <div key={`groom-${index}`} className="mb-3 text-right">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-1 uppercase whitespace-nowrap text-[#6F4827]">{entry.role}</p>
                      <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap">{entry.name}</p>
                    </div>
                  ))}
                </div>
                <div className="family-col-bride shrink-0 min-w-max">
                  {entourage.familyMembers.brideSide.map((entry, index) => (
                    <div key={`bride-${index}`} className="mb-3 text-left">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-1 uppercase whitespace-nowrap text-[#6F4827]">{entry.role}</p>
                      <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap">{entry.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Principal witnesses */}
            {principalSponsors && (() => {
              const ninongs = principalSponsors.ninong || []
              const ninangs = principalSponsors.ninang || []
              const rowCount = Math.max(ninongs.length, ninangs.length)

              return (
                <div ref={principalSponsorsRef} className="mb-8 w-full max-w-5xl shrink-0 mx-auto px-1 sm:px-2">
                  <h3 className="sponsor-role-title-wrap text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-4 px-2 text-center uppercase text-[#6F4827]">
                    {principalSponsors.displayTitle || 'Principal Sponsors'}
                  </h3>
                  <div className="space-y-2 w-full">
                    {Array.from({ length: rowCount }).map((_, index) => {
                      const ninongName = (ninongs[index] ?? '').trim()
                      const ninangName = (ninangs[index] ?? '').trim()
                      const both = ninongName && ninangName
                      const onlyNinong = ninongName && !ninangName
                      const onlyNinang = ninangName && !ninongName

                      if (both) {
                        return (
                          <div
                            key={index}
                            className="grid w-full grid-cols-2 gap-x-4 sm:gap-x-6 items-start"
                          >
                            <div className="flex min-w-0 justify-end overflow-visible">
                              <p className="ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-right whitespace-nowrap">
                                {ninongs[index]}
                              </p>
                            </div>
                            <div className="flex min-w-0 justify-start overflow-visible">
                              <p className="ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-left whitespace-nowrap">
                                {ninangs[index]}
                              </p>
                            </div>
                          </div>
                        )
                      }

                      if (onlyNinong) {
                        return (
                          <div key={index} className="flex w-full justify-center overflow-visible">
                            <p className="ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-center whitespace-nowrap">
                              {ninongs[index]}
                            </p>
                          </div>
                        )
                      }

                      if (onlyNinang) {
                        return (
                          <div key={index} className="flex w-full justify-center overflow-visible">
                            <p className="ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-center whitespace-nowrap">
                              {ninangs[index]}
                            </p>
                          </div>
                        )
                      }

                      return (
                        <div key={index} className="min-h-[1.25rem] sm:min-h-[1.375rem]" aria-hidden />
                      )
                    })}
                  </div>
                </div>
              )
            })()}

            {(bestman || maidOfHonor) && (
              <>
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular text-center capitalize whitespace-nowrap" style={{ color: '#6F4827' }}>
                    To stand our side
                  </h3>
                </div>

                <div className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center shrink-0 min-w-max">
                  {bestman && (
                    <div ref={bestmanRef} className="shrink-0 min-w-max">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: '#6F4827' }}>Bestman</p>
                      {bestman.names && bestman.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap text-right">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}

                  {maidOfHonor && (
                    <div ref={maidOfHonorRef} className="shrink-0 min-w-max">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: '#6F4827' }}>Maid Of Honor</p>
                      {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap text-left">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Groomsmen & Bridesmaids — 50 / 50 columns */}
            {secondarySponsors && secondarySponsors.groomsmen && secondarySponsors.bridesmaids && (
              <div ref={secondarySponsorsRef} className="mb-8 w-full max-w-5xl shrink-0 mx-auto px-1 sm:px-2">
                <div className="mb-4 grid w-full grid-cols-2 gap-x-4 sm:gap-x-6 items-start">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold text-right uppercase whitespace-nowrap text-[#6F4827]">
                    Groomsmen
                  </p>
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold text-left uppercase whitespace-nowrap text-[#6F4827]">
                    Bridesmaids
                  </p>
                </div>
                <div className="w-full space-y-2">
                  {Array.from({ length: Math.max(secondarySponsors.groomsmen.length, secondarySponsors.bridesmaids.length) }).map((_, index) => (
                    <div key={index} className="grid w-full grid-cols-2 gap-x-4 sm:gap-x-6 items-start">
                      <div className="flex min-w-0 justify-end overflow-visible">
                        {secondarySponsors.groomsmen[index] ? (
                          <p className="groomsmen-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-right whitespace-nowrap">
                            {secondarySponsors.groomsmen[index]}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex min-w-0 justify-start overflow-visible">
                        {secondarySponsors.bridesmaids[index] ? (
                          <p className="bridesmaids-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-left whitespace-nowrap">
                            {secondarySponsors.bridesmaids[index]}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8 flex flex-col items-center gap-6">
              {candleSponsors && candleSponsors.names && candleSponsors.names.length >= 2 && (
                <div ref={candleSponsorsRef} className="flex w-full max-w-5xl flex-col items-center text-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-1 uppercase whitespace-nowrap text-[#6F4827]">
                    {candleSponsors.label || 'Candle sponsors'}
                  </p>
                  <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start shrink-0 min-w-max">
                    <p className="shrink-0 min-w-max text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-right whitespace-nowrap">{candleSponsors.names[0]}</p>
                    <p className="shrink-0 min-w-max text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-left whitespace-nowrap">{candleSponsors.names[1]}</p>
                  </div>
                </div>
              )}

              {veilSponsors && veilSponsors.names && veilSponsors.names.length >= 2 && (
                <div ref={veilSponsorsRef} className="flex w-full max-w-5xl flex-col items-center text-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-1 uppercase whitespace-nowrap text-[#6F4827]">
                    {veilSponsors.label || 'Veil sponsors'}
                  </p>
                  <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start shrink-0 min-w-max">
                    <p className="shrink-0 min-w-max text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-right whitespace-nowrap">{veilSponsors.names[0]}</p>
                    <p className="shrink-0 min-w-max text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-left whitespace-nowrap">{veilSponsors.names[1]}</p>
                  </div>
                </div>
              )}

              {cordSponsors && cordSponsors.names && cordSponsors.names.length >= 2 && (
                <div ref={cordSponsorsRef} className="flex w-full max-w-5xl flex-col items-center text-center">
                  <p className="sponsor-role-title-wrap text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-1 uppercase text-[#6F4827]">
                    {cordSponsors.label || 'Cord sponsors'}
                  </p>
                  <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start shrink-0 min-w-max">
                    <p className="shrink-0 min-w-max text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-right whitespace-nowrap">{cordSponsors.names[0]}</p>
                    <p className="shrink-0 min-w-max text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] text-left whitespace-nowrap">{cordSponsors.names[1]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

            <div
              ref={specialMentionsRef}
              className="entourage-wrap-prose mx-auto mb-8 w-full min-w-0 max-w-[min(40rem,calc(100vw-3rem))] shrink-0 px-4 sm:px-6"
            >
              {entourage.specialMentions && entourage.specialMentions.length > 0 && (
                <div className="flex flex-col gap-5">
                  {entourage.specialMentions.map((entry, index) => {
                    const isStructured =
                      entry &&
                      typeof entry === 'object' &&
                      ('before' in entry ||
                        'name' in entry ||
                        'names' in entry ||
                        'after' in entry)

                    if (!isStructured) {
                      const line = typeof entry === 'string' ? entry : String(entry)
                      return (
                        <p
                          key={index}
                          className="special-mention-text max-w-full whitespace-normal text-center text-[10px] sm:text-[13px] md:text-[15px] font-poppins leading-relaxed text-[#6F4827]"
                        >
                          {line}
                        </p>
                      )
                    }

                    const before = entry.before ?? ''
                    const name = entry.name ?? ''
                    const namesArr = Array.isArray(entry.names)
                      ? entry.names.map((n) => String(n).trim()).filter(Boolean)
                      : []
                    const after = (entry.after ?? '').trim()

                    const nameBlock =
                      namesArr.length > 0 ? (
                        <>
                          <br />
                          {namesArr.map((n, i) => (
                            <React.Fragment key={i}>
                              {i > 0 ? <br /> : null}
                              <span className="special-mention-name">{n}</span>
                            </React.Fragment>
                          ))}
                        </>
                      ) : name ? (
                        <>
                          <br />
                          <span className="special-mention-name">{name}</span>
                        </>
                      ) : null

                    return (
                      <p
                        key={index}
                        className="special-mention-text max-w-full whitespace-normal text-center text-[10px] sm:text-[13px] md:text-[15px] font-poppins leading-relaxed text-[#6F4827]"
                      >
                        {before}
                        {nameBlock}
                        {after ? (
                          <>
                            <br />
                            {after}
                          </>
                        ) : null}
                      </p>
                    )
                  })}
                </div>
              )}

              {littleFlowerGirls && (
                <div ref={littleFlowerGirlsRef} className="mt-8 flex flex-col items-center gap-3 text-center">
                  {littleFlowerGirls.label && (
                    <p className="little-flower-intro max-w-full text-center text-[10px] sm:text-[13px] md:text-[15px] font-poppins leading-relaxed text-[#6F4827]">
                      {littleFlowerGirls.label}
                    </p>
                  )}
                  {littleFlowerGirls.names && littleFlowerGirls.names.length > 0
                    ? littleFlowerGirls.names.map((name, index) => (
                        <p
                          key={index}
                          className="little-flower-line max-w-full text-center text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins text-[#6F4827]"
                        >
                          {name}
                        </p>
                      ))
                    : null}
                </div>
              )}
            </div>

            {/* Bible Bearer, Ring Bearer, Coin Bearer */}
            {(bibleBearer || ringBearer || coinBearer) && (
              <div className="mb-6">
                <div className="flex flex-col gap-6 justify-center items-center mt-6">
                  {bibleBearer && (
                    <div ref={bibleBearerRef}>
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: '#6F4827' }}>Bible Bearer</p>
                      {bibleBearer.names && bibleBearer.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap text-center">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}

                  {ringBearer && (
                    <div ref={ringBearerRef}>
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: '#6F4827' }}>Ring Bearer</p>
                      {ringBearer.names && ringBearer.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap text-center">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}

                  {coinBearer && (
                    <div ref={coinBearerRef}>
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: '#6F4827' }}>Coin Bearer</p>
                      {coinBearer.names && coinBearer.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#6F4827] whitespace-nowrap text-center">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="relative z-[50] mt-12 sm:mt-16 flex w-full justify-center pb-8 sm:pb-10">
              <Link
                id="entourage-back-link"
                to="/"
                replace
                className="entourage-back-link inline-block caudex-bold text-sm sm:text-base md:text-lg uppercase tracking-[0.12em] underline decoration-white/90 underline-offset-[0.35em] transition-opacity duration-300 hover:opacity-90 active:opacity-75"
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

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAudio } from '../../hooks/useAudio'
import { loveStory, images } from '../../data'
import {
  prenupMomentsBannerFilename,
  prenupMomentsGalleryFilenames,
  prenupUrl,
} from '../../data/prenup'
import GradientLayer from '../GradientLayer'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Moments = () => {
  const navigate = useNavigate()
  const { pause, audioRef } = useAudio()
  const sectionRef = useRef(null)
  const backButtonRef = useRef(null)
  const firstParagraphRef = useRef(null)
  const momentsTitleRef = useRef(null)
  const momentsGridRef = useRef(null)
  const galleryGridImageRefs = useRef([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const videoModalRef = useRef(null)
  const wasPlayingBeforeVideo = useRef(false)

  /** Masonry + lightbox — all entries in `prenupMomentsGalleryFilenames` (full prenup set). */
  const prenupGalleryFilenames = prenupMomentsGalleryFilenames

  const galleryImageUrls = prenupGalleryFilenames.map(prenupUrl)
  const storyParagraphs = useMemo(
    () =>
      loveStory.story
        .split(/\n\n+/)
        .map((block) => block.trim())
        .filter(Boolean),
    []
  )
  const storyImages = useMemo(
    () => Array.from(new Set(galleryImageUrls)).slice(0, storyParagraphs.length),
    [galleryImageUrls, storyParagraphs.length]
  )

  const lightboxImages = galleryImageUrls

  const mainGalleryImages =
    galleryImageUrls.length >= 2
      ? galleryImageUrls.slice(0, -2)
      : galleryImageUrls
  const lastTwoGalleryImages =
    galleryImageUrls.length >= 2 ? galleryImageUrls.slice(-2) : []

  const gridColumnPattern = [
    'span 3',
    'span 1',
    'span 2',
    'span 2',
    'span 1',
    'span 3',
    'span 1',
    'span 2',
    'span 2',
    'span 1',
  ]

  const gridColumnForIndex = (index) => {
    const n = mainGalleryImages.length
    if (n === 4 && index === 3) return 'span 3'
    return gridColumnPattern[index % gridColumnPattern.length]
  }

  const galleryTileClass = (isFullWidthRow) =>
    isFullWidthRow
      ? 'max-h-[220px] min-h-[11rem] cursor-pointer overflow-hidden sm:max-h-[260px] sm:min-h-[13rem] md:max-h-[400px] md:min-h-[17rem] lg:max-h-[440px] lg:min-h-[18rem]'
      : 'max-h-[150px] cursor-pointer overflow-hidden md:max-h-[260px] lg:max-h-[300px]'

  const galleryTileStyle = {
    height: '100%',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
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

    // First paragraph animation on load
    if (firstParagraphRef.current) {
      gsap.fromTo(firstParagraphRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 }
      )
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: momentsTitleRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    if (momentsTitleRef.current) {
      tl.fromTo(
        momentsTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    galleryGridImageRefs.current.forEach((ref, index) => {
      if (!ref) return
      const isFromLeft = index % 2 === 0
      const xValue = isFromLeft ? -100 : 100
      gsap.set(ref, { opacity: 0, x: xValue, force3D: true })
      ScrollTrigger.create({
        trigger: ref,
        start: 'top 85%',
        animation: gsap.to(ref, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }),
        toggleActions: 'play none none reverse',
      })
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        const tr = trigger.vars && trigger.vars.trigger
        if (
          tr === momentsTitleRef.current ||
          galleryGridImageRefs.current.includes(tr)
        ) {
          trigger.kill()
        }
      })
    }
  }, [prenupGalleryFilenames.length])

  // Function to handle video modal open
  const handleVideoOpen = () => {
    // Pause background music when video opens - check actual audio state
    if (audioRef.current && !audioRef.current.paused) {
      wasPlayingBeforeVideo.current = true
      pause()
    } else {
      wasPlayingBeforeVideo.current = false
    }
    
    setIsVideoOpen(true)
  }

  // Function to handle video modal close
  const handleVideoClose = () => {
    setIsVideoOpen(false)
    
    // Resume music when video closes (if it was playing before)
    if (wasPlayingBeforeVideo.current) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {})
        }
        wasPlayingBeforeVideo.current = false
      }, 300)
    }
  }

  const openLightbox = (image, indexInLightbox) => {
    setSelectedImage(image)
    setSelectedImageIndex(indexInLightbox)
  }

  const handleLightboxClose = () => {
    setSelectedImage(null)
    setSelectedImageIndex(null)
  }

  const handleLightboxPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1
      setSelectedImage(lightboxImages[newIndex])
      setSelectedImageIndex(newIndex)
    }
  }

  const handleLightboxNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < lightboxImages.length - 1
    ) {
      const newIndex = selectedImageIndex + 1
      setSelectedImage(lightboxImages[newIndex])
      setSelectedImageIndex(newIndex)
    }
  }

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Video modal rotation animation (only on screens smaller than 768px)
  useEffect(() => {
    if (isVideoOpen && videoModalRef.current) {
      // Set initial state
      gsap.set(videoModalRef.current, {
        rotation: 0,
        scale: 0.8,
        opacity: 0
      })
      
      // Animate to landscape (only on mobile)
      gsap.to(videoModalRef.current, {
        rotation: isMobile ? 90 : 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [isVideoOpen, isMobile])

  return (
    <>
      <section
        ref={sectionRef}
        id="moments"
        data-section="moments"
        className="relative w-full overflow-hidden min-h-screen"
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        {/* Background - White */}
        <div 
          className="absolute inset-0 bg-white"
        />
        
        {/* Image Banner - Similar to Details page */}
        <div className="relative z-20 w-screen" style={{ width: '100vw' }}>
          <div className="relative w-full h-[250px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
            <img
              src={prenupUrl(prenupMomentsBannerFilename)}
              alt="Banner image"
              className="h-full w-full object-cover object-[50%_28%] sm:object-[50%_32%] md:object-[50%_36%]"
            />
            {/* Soft transparent white gradient layers at bottom */}
            <GradientLayer height="h-32" opacity={0.7} gradientId="whiteGradient1" />
            <GradientLayer height="h-24" opacity={0.5} gradientId="whiteGradient2" />
            <GradientLayer height="h-12" opacity={0.4} gradientId="whiteGradient3" />
            <GradientLayer height="h-8" opacity={0.3} gradientId="whiteGradient4" />
            <GradientLayer height="h-6" opacity={0.25} gradientId="whiteGradient5" />
            <GradientLayer height="h-4" opacity={0.2} gradientId="whiteGradient6" />

            {/* Full-bleed white blur at bottom (from images.json graphics) */}
            <img
              src={images.graphics.bannerWhiteBlur}
              alt=""
              className="pointer-events-none absolute bottom-0 left-1/2 z-[8] h-36 w-screen max-w-none -translate-x-1/2 object-cover object-bottom sm:h-40 md:h-44"
              aria-hidden
            />
            
            {/* Solid transition SVG at bottom */}
            <svg 
              className="absolute bottom-0 left-0 w-full h-[12px] pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1200 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="solidTransitionMoments" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#solidTransitionMoments)" />
            </svg>
            
            {/* Our Love Story Title at bottom */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center pb-0.5 z-10">
              <div className="w-full text-center">
                {/* Our in Ballet font */}
                <h1 className="font-ballet text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2" style={{ color: '#4E342E' }}>
                  Our
                </h1>
                {/* Love Story in Tebranos font */}
                <h2 className="font-tebranos text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase mb-4 -mt-6" style={{
                  color: '#4E342E'
                }}>
                  Love Story
                </h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Love Story Section */}
        <div
          className="relative z-20 w-full py-12"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div
            ref={firstParagraphRef}
            className="relative z-20 mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 sm:gap-16 sm:px-10 md:px-12"
          >
            {storyParagraphs.map((paragraph, index) => {
              const photoLeft = index % 2 === 0
              const storyImage = storyImages[index]
              const storyObjectPosition = index === 2 ? 'center top' : undefined
              return (
                <div
                  key={index}
                  className="grid w-full items-center gap-6 md:gap-8"
                  style={{
                    gridTemplateColumns: photoLeft ? '2fr 3fr' : '3fr 2fr',
                  }}
                >
                  {photoLeft ? (
                    <>
                      <div className="flex items-center justify-center">
                        {storyImage && (
                          <div
                            className="relative w-full max-w-[220px] bg-white px-[2px] pt-[2px] pb-3 shadow-lg"
                            style={{
                              borderTop: '4px solid white',
                              borderLeft: '2px solid white',
                              borderRight: '2px solid white',
                              borderBottom: '10px solid white',
                              transform: 'rotate(-3deg)',
                            }}
                          >
                            <img
                              src={storyImage}
                              alt=""
                              className="aspect-square w-full object-cover"
                              style={storyObjectPosition ? { objectPosition: storyObjectPosition } : undefined}
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                      <p
                        className="w-full text-left text-xs font-albert leading-relaxed sm:text-sm md:text-base"
                        style={{ color: '#4a2c1f' }}
                      >
                        {paragraph}
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        className="w-full text-right text-xs font-albert leading-relaxed sm:text-sm md:text-base"
                        style={{ color: '#4a2c1f' }}
                      >
                        {paragraph}
                      </p>
                      <div className="flex items-center justify-center">
                        {storyImage && (
                          <div
                            className="relative w-full max-w-[220px] bg-white px-[2px] pt-[2px] pb-3 shadow-lg"
                            style={{
                              borderTop: '4px solid white',
                              borderLeft: '2px solid white',
                              borderRight: '2px solid white',
                              borderBottom: '10px solid white',
                              transform: 'rotate(3deg)',
                            }}
                          >
                            <img
                              src={storyImage}
                              alt=""
                              className="aspect-square w-full object-cover"
                              style={storyObjectPosition ? { objectPosition: storyObjectPosition } : undefined}
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

           {/* Moments gallery: title then single masonry grid (all prenup photos) */}
           <div
             ref={momentsGridRef}
             className="relative z-20 mt-8 flex w-full flex-col"
           >
             <div className="relative z-20 flex w-full items-center justify-center pt-12 pb-6">
               <div className="relative z-10 mx-auto w-full max-w-md px-8 sm:max-w-xl sm:px-12 lg:max-w-4xl lg:px-16">
                 <div ref={momentsTitleRef} className="text-center">
                   <div className="mb-4 flex w-full items-center justify-center">
                     <img
                       src="/assets/images/graphics/falling-flower.png"
                       alt=""
                       className="h-auto w-auto"
                       style={{ maxWidth: '120px' }}
                       aria-hidden
                     />
                   </div>
                   <h2
                     className="w-full px-4 text-center"
                     style={{ border: 'none', outline: 'none' }}
                   >
                     <span
                       className="stylish-calligraphy inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                       style={{ lineHeight: '1.2', color: '#4E342E' }}
                     >
                       Our Moments
                     </span>
                   </h2>
                 </div>
               </div>
             </div>

             {galleryImageUrls.length > 0 && (
               <div className="relative z-20 flex w-full items-center justify-center pb-12 pt-2">
                 <div className="mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-16">
                   <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                     {mainGalleryImages.length > 0 && (
                       <div className="grid auto-rows-auto grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                         {mainGalleryImages.map((image, index) => {
                           const gridColumn = gridColumnForIndex(index)
                           const isFullWidthRow = gridColumn === 'span 3'
                           return (
                             <div
                               key={image}
                               ref={(el) => {
                                 galleryGridImageRefs.current[index] = el
                               }}
                               className={galleryTileClass(isFullWidthRow)}
                               style={{
                                 gridColumn,
                                 ...galleryTileStyle,
                               }}
                               onClick={() => openLightbox(image, index)}
                             >
                               <img
                                 src={image}
                                 alt={`Gallery ${index + 1}`}
                                 className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                                 style={{
                                   height: '100%',
                                   willChange: 'transform',
                                   backfaceVisibility: 'hidden',
                                 }}
                                 loading="lazy"
                               />
                             </div>
                           )
                         })}
                       </div>
                     )}

                     {lastTwoGalleryImages.length === 2 && (
                       <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                         <div
                           ref={(el) => {
                             galleryGridImageRefs.current[mainGalleryImages.length] =
                               el
                           }}
                           className={`${galleryTileClass(false)} col-span-2`}
                           style={galleryTileStyle}
                           onClick={() =>
                             openLightbox(
                               lastTwoGalleryImages[0],
                               mainGalleryImages.length
                             )
                           }
                         >
                           <img
                             src={lastTwoGalleryImages[0]}
                             alt={`Gallery ${mainGalleryImages.length + 1}`}
                             className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                             style={{
                               height: '100%',
                               willChange: 'transform',
                               backfaceVisibility: 'hidden',
                             }}
                             loading="lazy"
                           />
                         </div>
                         <div
                           ref={(el) => {
                             galleryGridImageRefs.current[
                               mainGalleryImages.length + 1
                             ] = el
                           }}
                           className={`${galleryTileClass(false)} col-span-3`}
                           style={galleryTileStyle}
                           onClick={() =>
                             openLightbox(
                               lastTwoGalleryImages[1],
                               mainGalleryImages.length + 1
                             )
                           }
                         >
                           <img
                             src={lastTwoGalleryImages[1]}
                             alt={`Gallery ${mainGalleryImages.length + 2}`}
                             className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                             style={{
                               height: '100%',
                               willChange: 'transform',
                               backfaceVisibility: 'hidden',
                             }}
                             loading="lazy"
                           />
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}
           </div>

           {/* Second Moments Section - All 5 Polaroids in One Container */}
           {/* <div className="relative z-20 w-full mt-12 pb-12">
             <div className="relative w-full pt-32 pb-12 overflow-hidden">
               Background Handwriting Text
               <div 
                 className="absolute inset-0 pointer-events-none z-0"
                 style={{
                   opacity: 0.3
                 }}
               >
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8b4a5c] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     top: '5%',
                     left: '-5%',
                     transform: 'rotate(-5deg)'
                   }}
                 >
                   Forever
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8b4a5c] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     top: '25%',
                     right: '-8%',
                     transform: 'rotate(8deg)'
                   }}
                 >
                   Always
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8b4a5c] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     bottom: '25%',
                     left: '-8%',
                     transform: 'rotate(-8deg)'
                   }}
                 >
                   Together
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8b4a5c] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     bottom: '5%',
                     right: '-5%',
                     transform: 'rotate(5deg)'
                   }}
                 >
                   Love
                 </p>
                 <p 
                   className="font-handwritten text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#8b4a5c] whitespace-nowrap"
                   style={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%) rotate(-3deg)'
                   }}
                 >
                   Us
                 </p>
               </div>
               
               <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
                 <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex justify-center items-center mb-8">
                   <div 
                     className="absolute -top-6 -left-8 sm:left-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-lg transform -rotate-12 opacity-90"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup-7.jpg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#8b4a5c] font-handwritten">
                         Memories
                       </div>
                     </div>
                   </div>
                   
                   <div 
                     className="relative w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform rotate-3 hover:scale-105 transition-transform duration-300"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup-8.jpg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#8b4a5c] font-handwritten">
                         Together
                       </div>
                     </div>
                   </div>
                   
                   <div 
                     className="absolute -top-4 -right-8 sm:right-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-lg transform rotate-6"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup-9.jpg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#8b4a5c] font-handwritten">
                         Love
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex justify-center items-center">
                   <div 
                     className="absolute -left-8 sm:left-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform -rotate-6 hover:scale-105 transition-transform duration-300"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup-10.jpg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#8b4a5c] font-handwritten">
                         Forever
                       </div>
                     </div>
                   </div>

                   <div 
                     className="absolute -right-8 sm:right-4 w-40 h-48 sm:w-60 sm:h-72 lg:w-72 lg:h-88 bg-white shadow-xl transform rotate-6 hover:scale-105 transition-transform duration-300"
                     style={{
                       border: '4px solid white',
                       borderTop: '4px solid white'
                     }}
                   >
                     <div 
                       className="w-full h-40 sm:h-60 lg:h-72 bg-cover bg-center"
                       style={{
                         backgroundImage: 'url(/assets/images/prenup/prenup-11.jpg)',
                         borderTop: '4px solid white',
                         borderLeft: '4px solid white',
                         borderRight: '4px solid white'
                       }}
                     ></div>
                     <div className="p-2 text-center">
                       <div className="text-sm sm:text-lg text-[#8b4a5c] font-handwritten">
                         Always
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div> */}
       </section>
      
      {/* Back Button - Circular, Bottom Right - Outside section to avoid transform issues */}
      <button
        ref={backButtonRef}
        type="button"
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
        className="back-button fixed bottom-12 right-6 z-[100] inline-flex aspect-square size-16 shrink-0 items-center justify-center rounded-full bg-[#c6d7f4] font-albert text-xs font-semibold uppercase leading-none tracking-[0.12em] text-[#1e4566] shadow-lg underline decoration-[#1e4566]/50 underline-offset-[0.25em] transition-colors duration-300 hover:bg-[#c6d7f4] sm:size-[4.25rem] sm:text-sm sm:tracking-[0.14em]"
        style={{ pointerEvents: 'auto' }}
      >
        Back
      </button>

      {/* Video Modal */}
      {isVideoOpen && createPortal(
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={(e) => {
            // Close when clicking the backdrop
            if (e.target === e.currentTarget) {
              handleVideoClose()
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleVideoClose()
            }}
            className="absolute top-4 right-4 z-[300] w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ pointerEvents: 'auto' }}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* YouTube Video Player */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/KSPPzvrdFyU?si=nA2owsm0AcwCZZ8x&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="max-w-full max-h-full"
              style={{ 
                width: '90%',
                height: '90%',
                maxWidth: '1000px',
                maxHeight: '562px',
                aspectRatio: '16/9',
                pointerEvents: 'auto'
              }}
            />
          </div>
        </div>,
        document.body
      )}

      {/* Image lightbox: same behavior as reference Moments (prev/next, edge disable) */}
      {selectedImage &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleLightboxClose}
            />

            <button
              type="button"
              onClick={handleLightboxClose}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {selectedImageIndex !== null && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLightboxPrevious()
                }}
                disabled={selectedImageIndex === 0}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-opacity duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-30"
                style={{ pointerEvents: 'auto' }}
                aria-label="Previous image"
              >
                <ChevronLeft
                  className="h-10 w-10 text-white"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))' }}
                />
              </button>
            )}

            {selectedImageIndex !== null && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleLightboxNext()
                }}
                disabled={selectedImageIndex === lightboxImages.length - 1}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-opacity duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-30"
                style={{ pointerEvents: 'auto' }}
                aria-label="Next image"
              >
                <ChevronRight
                  className="h-10 w-10 text-white"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7))' }}
                />
              </button>
            )}

            <div className="relative z-10 flex max-h-[90vh] w-full max-w-7xl items-center justify-center">
              <img
                src={selectedImage}
                alt="Full size image"
                className="max-h-[90vh] w-auto max-w-full object-contain"
                loading="eager"
                decoding="async"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Moments


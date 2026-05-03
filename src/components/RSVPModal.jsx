import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Modal entrance animation
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { y: 16 })
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out"
      })
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    // Modal exit animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.25,
      ease: "power2.out"
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div
        ref={contentRef}
        className={`absolute inset-0 z-10 flex flex-col overflow-hidden ${themeConfig.paragraph.background}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200/80 px-4 py-3 sm:px-6 sm:py-4">
          <h2 className="text-xl sm:text-2xl font-leckerli font-light text-gray-900/80">RSVP</h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200/60 hover:text-gray-900"
            aria-label="Close RSVP"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-12">
          <p className="text-center text-2xl sm:text-3xl font-albert font-medium tracking-wide text-[#6F4827]">
            TO BE ADDED
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal 
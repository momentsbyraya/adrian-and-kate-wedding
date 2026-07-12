import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ExternalLink, X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

const RSVP_FORM_URL = weddingConfig.rsvp.formUrl
const RSVP_FORM_OPEN_URL =
  weddingConfig.rsvp.formOpenUrl ||
  RSVP_FORM_URL.replace('?embedded=true', '?usp=header')

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false)
      return undefined
    }

    document.body.style.overflow = 'hidden'

    gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
    gsap.set(contentRef.current, { y: 16 })

    gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
    })

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.25,
      ease: 'power2.out',
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
    <div ref={modalRef} className="fixed inset-0 z-[100]">
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div
        ref={contentRef}
        className={`absolute inset-0 z-10 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden ${themeConfig.paragraph.background}`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200/80 px-4 sm:h-16 sm:px-6">
          <h2 className="text-xl font-leckerli font-light text-gray-900/80 sm:text-2xl">RSVP</h2>
          <div className="flex items-center gap-1">
            <a
              href={RSVP_FORM_OPEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200/60 hover:text-gray-900"
              aria-label="Open RSVP form in a new tab"
              title="Open in new tab"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200/60 hover:text-gray-900"
              aria-label="Close RSVP"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          className="relative w-full flex-1 overflow-hidden bg-white"
          style={{ height: 'calc(100dvh - 3.5rem)' }}
        >
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="caudex-bold text-sm uppercase tracking-[0.14em] text-gray-500">
                Loading RSVP form…
              </p>
              <a
                href={RSVP_FORM_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2F3E46] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d515c]"
              >
                Open form in new tab
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          <iframe
            key={RSVP_FORM_URL}
            title="RSVP for the Wedding of Adrian and Kate"
            src={RSVP_FORM_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="block h-full w-full border-0"
            style={{
              width: '100%',
              height: '100%',
              minHeight: 'calc(100dvh - 3.5rem)',
            }}
            onLoad={() => setIframeLoaded(true)}
            allow="fullscreen"
            referrerPolicy="no-referrer-when-downgrade"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal

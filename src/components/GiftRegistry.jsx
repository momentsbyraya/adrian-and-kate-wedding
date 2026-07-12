import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gift } from 'lucide-react'
import { WEDDING_TEXT_DARK_BLUE } from '../config/themeConfig'
import GiftModal from './GiftModal'
import './pages/Details.css'

gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)
  const [giftModalOpen, setGiftModalOpen] = useState(false)

  useEffect(() => {
    if (giftRegistryRef.current) {
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          giftRegistryRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === giftRegistryRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div id="couples-request" className="mt-20 relative gift-registry-section">
      <div ref={giftRegistryRef} className="text-center relative z-10">
        <h3 className="relative inline-block px-6 py-3 mb-4">
          <span className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase gift-registry-title-text">
            Couple&apos;s Request
          </span>
        </h3>
        <p className="text-base sm:text-lg font-albert font-thin max-w-3xl mx-auto leading-relaxed gift-registry-body">
          Sharing our wedding day with you means the world to us. Should you wish to give a gift, a monetary contribution is welcome via{' '}
          <span className="font-medium not-italic">GCash</span> or{' '}
          <span className="font-medium not-italic">BPI</span>.
        </p>

        <button
          type="button"
          className="mt-10 inline-flex items-center gap-2 rounded-full border-2 px-8 py-3 font-albert text-sm font-semibold uppercase tracking-widest shadow-sm transition-colors duration-300 hover:bg-white/90 sm:text-base gift-send-button"
          style={{ borderColor: WEDDING_TEXT_DARK_BLUE, color: WEDDING_TEXT_DARK_BLUE }}
          onClick={() => setGiftModalOpen(true)}
        >
          <Gift className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
          Send Gift
        </button>
      </div>

      <GiftModal isOpen={giftModalOpen} onClose={() => setGiftModalOpen(false)} />
    </div>
  )
}

export default GiftRegistry

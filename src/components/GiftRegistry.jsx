import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, X, Copy, Check } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import { themeConfig } from '../config/themeConfig'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const { paymentMethods } = paymentMethodsData

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  useEffect(() => {
    // Gift Registry animation
    if (giftRegistryRef.current) {
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: "top 80%",
        animation: gsap.fromTo(giftRegistryRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === giftRegistryRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Gift Registry Section */}
      <div className="mt-20 relative gift-registry-section">
        <div ref={giftRegistryRef} className="text-center relative z-10">
          <h3 className="relative inline-block px-6 py-3 mb-4">
            <span 
              className="font-tebranos text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none uppercase gift-registry-title-text"
            >
              Couple's Request
            </span>
          </h3>
          <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
            With all that we have, we've been truly blessed. Your presence and prayers are all that we request. But if you desire to give nonetheless, a <strong>monetary gift</strong> is one we suggest.
          </p>
        </div>
        
        {/* Send Gift Button */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <button
            onClick={() => setIsGiftModalOpen(true)}
            className="relative flex items-center justify-center hover:opacity-80 transition-all duration-300 group bg-white rounded-lg px-8 py-3 gap-2 gift-button"
          >
            <div 
              className="absolute inset-0 rounded-lg border pointer-events-none gift-button-border"
              style={{ borderColor: themeConfig.cssVariables['--gold'] }}
            ></div>
            <span className="font-medium text-sm sm:text-base relative z-10" style={{ color: themeConfig.cssVariables['--gold'] }}>Send Gift</span>
            <ArrowRight className="w-4 h-4 relative z-10" style={{ color: themeConfig.cssVariables['--gold'] }} />
          </button>
        </div>
      </div>

      {/* Gift Registry Modal */}
      {isGiftModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsGiftModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl alice-regular font-black text-gray-800 modal-methods-title">Methods</h3>
              <button
                onClick={() => setIsGiftModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {paymentMethods && paymentMethods.length > 0 && (
                <div className="space-y-8">
                  {paymentMethods.map((method, index) => {
                    // Extract name from "GCash - Name" format
                    const accountName = method.accountInfo?.accountName || method.name?.split(' - ')[1] || method.name
                    const accountNumber = method.accountInfo?.accountNumber
                    
                    return (
                      <div key={index} className="flex flex-col items-center justify-center">
                        {/* QR Code Image */}
                        {method.accountInfo?.qrCode && (
                          <div className="flex items-center justify-center mb-4">
                            <img 
                              src={method.accountInfo.qrCode} 
                              alt={`${accountName} QR Code`}
                              className="w-full max-w-xs h-auto object-contain"
                            />
                          </div>
                        )}
                        {/* Account Number with Copy Icon */}
                        {accountNumber && (
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm sm:text-base font-albert text-[#333333] font-semibold">
                              {accountNumber}
                            </p>
                            <button
                              onClick={() => handleCopy(accountNumber, index)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                              title="Copy number"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-600" />
                              )}
                            </button>
                          </div>
                        )}
                        {/* Account Name */}
                        {accountName && (
                          <h4 className="text-lg sm:text-xl font-boska text-[#333333]">
                            {accountName}
                          </h4>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry

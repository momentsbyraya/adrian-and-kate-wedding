import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, Copy, Check } from 'lucide-react'
import { WEDDING_TEXT_DARK_BLUE } from '../config/themeConfig'
import { paymentMethods as paymentMethodsFile } from '../data'

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fallback below */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

const GiftModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false)

  const methods = paymentMethodsFile?.paymentMethods ?? []
  const method = methods[0]
  const info = method?.accountInfo
  const giftImageSrc =
    info?.giftImage?.trim() || '/assets/images/monetary-gifts/IMG_6303.jpeg'
  const accountNumber = info?.accountNumber?.trim() || ''
  const accountName = info?.accountName?.trim() || ''

  const handleCopy = useCallback(async () => {
    if (!accountNumber) return
    const ok = await copyToClipboard(accountNumber)
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }, [accountNumber])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCopied(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        aria-label="Close gift dialog"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <h2 id="gift-modal-title" className="sr-only">
          Send a gift
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="max-h-[min(75vh,calc(100vh-8rem))] overflow-y-auto px-4 pb-6 pt-12 sm:px-6">
          {!info ? (
            <p className="text-center font-albert text-sm text-gray-600">Gift payment details are not configured.</p>
          ) : (
            <div className="flex flex-col gap-5">
              <span className="sr-only" aria-live="polite">
                {copied ? 'Account number copied' : ''}
              </span>

              <div className="overflow-hidden rounded-xl ring-1 ring-black/10">
                <img
                  src={giftImageSrc}
                  alt=""
                  className="h-auto w-full object-cover object-center"
                />
              </div>

              <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 sm:gap-3">
                <span
                  className="min-w-0 flex-1 text-center font-mono text-[0.95rem] font-medium tracking-wide sm:text-base"
                  style={{ color: WEDDING_TEXT_DARK_BLUE }}
                >
                  {accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  style={{ color: copied ? '#15803d' : undefined }}
                  aria-label={copied ? 'Copied' : 'Copy account number'}
                  title={copied ? 'Copied' : 'Copy account number'}
                >
                  {copied ? <Check className="h-5 w-5" strokeWidth={2} /> : <Copy className="h-5 w-5" strokeWidth={2} />}
                </button>
              </div>

              <p
                className="text-center font-albert text-lg font-semibold sm:text-xl"
                style={{ color: WEDDING_TEXT_DARK_BLUE }}
              >
                {accountName}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GiftModal

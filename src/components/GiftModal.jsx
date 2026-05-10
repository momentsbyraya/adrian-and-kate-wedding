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

function GiftMethodBlock({ method, copiedKey, onCopied }) {
  const info = method?.accountInfo
  const giftImageSrc =
    info?.giftImage?.trim() || '/assets/images/monetary-gifts/IMG_6303.jpeg'
  const accountNumber = info?.accountNumber?.trim() || ''
  const accountName = info?.accountName?.trim() || ''

  const handleCopy = useCallback(async () => {
    if (!accountNumber) return
    const ok = await copyToClipboard(accountNumber)
    if (ok) {
      onCopied(method?.name || giftImageSrc)
      window.setTimeout(() => onCopied(null), 2000)
    }
  }, [accountNumber, giftImageSrc, method?.name, onCopied])

  return (
    <div className="flex flex-col gap-5 border-t border-gray-100 pt-5 first:border-t-0 first:pt-0">
      <span className="sr-only" aria-live="polite">
        {copiedKey === (method?.name || giftImageSrc) ? 'Account number copied' : ''}
      </span>

      <div className="overflow-hidden rounded-xl ring-1 ring-black/10">
        <img
          src={giftImageSrc}
          alt={method?.name ? `${method.name} gift payment details` : ''}
          className="h-auto w-full object-cover object-center"
        />
      </div>

      {accountNumber ? (
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
            style={{ color: copiedKey === (method?.name || giftImageSrc) ? '#15803d' : undefined }}
            aria-label={copiedKey === (method?.name || giftImageSrc) ? 'Copied' : 'Copy account number'}
            title={copiedKey === (method?.name || giftImageSrc) ? 'Copied' : 'Copy account number'}
          >
            {copiedKey === (method?.name || giftImageSrc) ? (
              <Check className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Copy className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
        </div>
      ) : null}

      {accountName ? (
        <p
          className="text-center font-albert text-lg font-semibold sm:text-xl"
          style={{ color: WEDDING_TEXT_DARK_BLUE }}
        >
          {accountName}
        </p>
      ) : null}
    </div>
  )
}

const GiftModal = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState(null)

  const methods = paymentMethodsFile?.paymentMethods ?? []
  const configuredMethods = methods.filter((m) => m?.accountInfo)
  const hasAnyInfo = configuredMethods.length > 0

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCopiedKey(null)
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
          {!hasAnyInfo ? (
            <p className="text-center font-albert text-sm text-gray-600">Gift payment details are not configured.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {configuredMethods.map((method) => (
                <GiftMethodBlock
                  key={method.name || method.accountInfo?.giftImage}
                  method={method}
                  copiedKey={copiedKey}
                  onCopied={setCopiedKey}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GiftModal

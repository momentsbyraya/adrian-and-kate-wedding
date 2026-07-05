/** Favicon image (served from Vite `publicDir` → `/assets/...`). */
export const FAVICON_IMAGE_PATH = '/assets/images/image-placeholder.png'
/** Open Graph / Twitter card image. */
export const SHARE_IMAGE_PATH = '/assets/images/image-placeholder.png'

export function getShareImageAbsoluteUrl() {
  if (typeof window === 'undefined') return SHARE_IMAGE_PATH
  return `${window.location.origin}${SHARE_IMAGE_PATH}`
}

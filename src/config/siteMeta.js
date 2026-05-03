/** Favicon + Open Graph / Twitter card image (served from Vite `publicDir` → `/assets/...`). */
export const SHARE_IMAGE_PATH = '/assets/images/prenup/IMG_6290.jpeg'

export function getShareImageAbsoluteUrl() {
  if (typeof window === 'undefined') return SHARE_IMAGE_PATH
  return `${window.location.origin}${SHARE_IMAGE_PATH}`
}

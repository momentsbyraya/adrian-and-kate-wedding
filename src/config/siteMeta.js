/** Wedding logo — favicon, apple-touch icon, and social preview image. */
export const WEDDING_LOGO_PATH = '/assets/images/prenup/wedding%20logo.png'

/** Favicon image (served from Vite `publicDir` → `/assets/...`). */
export const FAVICON_IMAGE_PATH = WEDDING_LOGO_PATH
/** Open Graph / Twitter card image. */
export const SHARE_IMAGE_PATH = WEDDING_LOGO_PATH

export function getShareImageAbsoluteUrl() {
  if (typeof window === 'undefined') return SHARE_IMAGE_PATH
  return `${window.location.origin}${SHARE_IMAGE_PATH}`
}

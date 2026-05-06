/**
 * Prenup photos — synced with filenames in `assets/images/prenup/`.
 * Update PRENUP_FILENAMES when you add or replace images.
 */
export const PRENUP_BASE = '/assets/images/prenup'

export const PRENUP_FILENAMES = [
  'IMG_6282.jpeg',
  'IMG_6287.jpeg',
  'IMG_6288.jpeg',
  'IMG_6290.jpeg',
  'IMG_6294.jpeg',
  'IMG_6296.jpeg',
]

export const prenupUrl = (filename) =>
  `${PRENUP_BASE}/${encodeURIComponent(filename)}`

export const prenupAllUrls = PRENUP_FILENAMES.map(prenupUrl)

/** Opening screen — three grid/stack rows (top-aligned crop in CSS) */
export const prenupOpeningUrls = [
  prenupUrl('IMG_6287.jpeg'),
  prenupUrl('IMG_6288.jpeg'),
  prenupUrl('IMG_6290.jpeg'),
]

/** Home (NavIndex) blurred full-page background — keep in sync with `NavIndex.css` `.nav-index-bg` */
export const prenupHomeBackgroundUrl = prenupUrl(PRENUP_FILENAMES[0])

/** NavIndex polaroid row (left to right) */
export const prenupHomePolaroidUrls = [
  prenupUrl(PRENUP_FILENAMES[1]),
  prenupUrl(PRENUP_FILENAMES[3]),
  prenupUrl(PRENUP_FILENAMES[0]),
]

/** Details page top banner (`ImageBanner`) */
export const prenupDetailsBannerUrl = prenupUrl('IMG_6287.jpeg')

/** Details PhotoSection (under schedule) — left · center · right */
export const prenupDetailsPhotoStrip = [
  { src: prenupUrl('IMG_6294.jpeg'), alt: 'Prenup photo', label: 'Memories', backgroundPosition: 'center top' },
  { src: prenupUrl('IMG_6287.jpeg'), alt: 'Prenup photo', label: 'Together', backgroundPosition: 'center top' },
  { src: prenupUrl('IMG_6296.jpeg'), alt: 'Prenup photo', label: 'Love', backgroundPosition: 'center top' },
]

/** Moments: full-bleed top banner (also appears in gallery when using full `PRENUP_FILENAMES` list) */
export const prenupMomentsBannerFilename = 'IMG_6288.jpeg'

/** Moments story section — keep original prenup set for narrative photos */
export const prenupMomentsStoryFilenames = [...PRENUP_FILENAMES]

/** Moments masonry + lightbox — use prenup images not used by the current key sections */
export const prenupMomentsGalleryFilenames = [
  'DSCF4020.jpeg',
  'IMG_3515.jpeg',
  'img1.jpeg',
  'IMG_4171.jpeg',
  'DSCF7115.jpeg',
  'DSCF6797.jpeg',
  'DSCF4055.jpeg',
  'img2.jpeg',
  'IMG_4167.jpeg',
  'img3.jpeg',
]

/** Entourage — keep in sync with `Entourage.css` `.entourage-bg` (graphic, not prenup) */
export const prenupEntourageBackgroundUrl = '/assets/images/graphics/bg-1.png'

/** PhotoSection fallback when no `images` prop */
export const prenupPhotoSectionDefaults = [
  { src: prenupUrl(PRENUP_FILENAMES[0]), alt: 'Prenup photo', label: 'Memories' },
  { src: prenupUrl(PRENUP_FILENAMES[2]), alt: 'Prenup photo', label: 'Together' },
  { src: prenupUrl(PRENUP_FILENAMES[4]), alt: 'Prenup photo', label: 'Love' },
]

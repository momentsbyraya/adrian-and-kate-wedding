/**
 * Prenup photos — synced with filenames in `assets/images/prenup/`.
 * Update PRENUP_FILENAMES when you add or replace images.
 */
export const PRENUP_BASE = '/assets/images/prenup'

/** Temporary stand-in until real prenup photos are added */
export const IMAGE_PLACEHOLDER = '/assets/images/image-placeholder.png'

export const PRENUP_FILENAMES = [
  'photo1.jpg',
  'photo2.jpg',
  'photo3.jpg',
  'photo4.jpg',
  'photo5.jpg',
  'photo6.jpg',
]

export const prenupUrl = (_filename) => IMAGE_PLACEHOLDER

export const prenupAllUrls = PRENUP_FILENAMES.map(prenupUrl)

/** Opening screen — three grid/stack rows (top-aligned crop in CSS) */
export const prenupOpeningUrls = [
  prenupUrl(PRENUP_FILENAMES[1]),
  prenupUrl(PRENUP_FILENAMES[2]),
  prenupUrl(PRENUP_FILENAMES[3]),
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
export const prenupDetailsBannerUrl = prenupUrl(PRENUP_FILENAMES[1])

/** Details PhotoSection (under schedule) — left · center · right */
export const prenupDetailsPhotoStrip = [
  { src: prenupUrl(PRENUP_FILENAMES[4]), alt: 'Prenup photo', label: 'Memories', backgroundPosition: 'center top' },
  { src: prenupUrl(PRENUP_FILENAMES[1]), alt: 'Prenup photo', label: 'Together', backgroundPosition: 'center top' },
  { src: prenupUrl(PRENUP_FILENAMES[5]), alt: 'Prenup photo', label: 'Love', backgroundPosition: 'center top' },
]

/** Moments: full-bleed top banner (also appears in gallery when using full `PRENUP_FILENAMES` list) */
export const prenupMomentsBannerFilename = PRENUP_FILENAMES[2]

/** Moments story section — keep original prenup set for narrative photos */
export const prenupMomentsStoryFilenames = [...PRENUP_FILENAMES]

/**
 * Moments masonry + lightbox gallery filenames.
 * Generic, drop-in names — replace the matching files in `assets/images/prenup/`
 * (gallery1.jpg … gallery10.jpg) without touching code.
 */
export const GALLERY_FILENAMES = [
  'gallery1.jpg',
  'gallery2.jpg',
  'gallery3.jpg',
  'gallery4.jpg',
  'gallery5.jpg',
  'gallery6.jpg',
  'gallery7.jpg',
  'gallery8.jpg',
  'gallery9.jpg',
  'gallery10.jpg',
]

export const prenupMomentsGalleryFilenames = [...GALLERY_FILENAMES]

/** Entourage — keep in sync with `Entourage.css` `.entourage-bg` (graphic, not prenup) */
export const prenupEntourageBackgroundUrl = '/assets/images/graphics/bg-1.png'

/** PhotoSection fallback when no `images` prop */
export const prenupPhotoSectionDefaults = [
  { src: prenupUrl(PRENUP_FILENAMES[0]), alt: 'Prenup photo', label: 'Memories' },
  { src: prenupUrl(PRENUP_FILENAMES[2]), alt: 'Prenup photo', label: 'Together' },
  { src: prenupUrl(PRENUP_FILENAMES[4]), alt: 'Prenup photo', label: 'Love' },
]

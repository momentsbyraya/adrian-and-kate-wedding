/**
 * Prenup photos — synced with filenames in `assets/images/prenup/`.
 * Update PRENUP_FILENAMES when you add or replace images.
 */
export const PRENUP_BASE = '/assets/images/prenup'

/** Fallback when a filename is missing */
export const IMAGE_PLACEHOLDER = '/assets/images/image-placeholder.png'

/** Build a public URL for a prenup file (encodes spaces/special chars) */
export const prenupUrl = (filename) =>
  filename ? `${PRENUP_BASE}/${encodeURIComponent(filename)}` : IMAGE_PLACEHOLDER

/** Hero image — home page main photo + blurred background */
export const PRENUP_HERO = 'IMG_6957-Picsart-AiImageEnhancer.jpg'

export const PRENUP_FILENAMES = [
  'IMG_6957-Picsart-AiImageEnhancer.jpg',
  'IMG_6954-Picsart-AiImageEnhancer.jpg',
  'IMG_6955-Picsart-AiImageEnhancer.jpg',
  'IMG_6956-Picsart-AiImageEnhancer.jpg',
  'IMG_2862-Picsart-AiImageEnhancer.jpg',
  'IMG_3648.jpg',
  'IMG_5439~photo-Picsart-AiImageEnhancer.jpg',
  'IMG_3037.jpg',
  'IMG_3424.jpg',
  '0ed9d03c0ff0a3e7cb4cabf9118c98e5.JPEG',
  '79f56ae81fcc4fa978d91a8f3f6eb946.JPEG',
]

export const prenupAllUrls = PRENUP_FILENAMES.map(prenupUrl)

/**
 * Face-focused `object-position` per file. Tiles are cropped shorter than the
 * source photo, so this keeps the couple's faces in frame instead of cropping
 * to the bottom (feet) or top.
 */
export const PRENUP_FOCAL_POINTS = {
  'IMG_6957-Picsart-AiImageEnhancer.jpg': '50% 38%',
  'IMG_6954-Picsart-AiImageEnhancer.jpg': '50% 24%',
  'IMG_6955-Picsart-AiImageEnhancer.jpg': '50% 22%',
  'IMG_6956-Picsart-AiImageEnhancer.jpg': '50% 33%',
  'IMG_2862-Picsart-AiImageEnhancer.jpg': '50% 52%',
  'IMG_3648.jpg': '50% 47%',
  'IMG_5439~photo-Picsart-AiImageEnhancer.jpg': '50% 40%',
  '0ed9d03c0ff0a3e7cb4cabf9118c98e5.JPEG': '50% 52%',
  '79f56ae81fcc4fa978d91a8f3f6eb946.JPEG': '50% 55%',
  'IMG_3037.jpg': '50% 40%',
  'IMG_3424.jpg': '50% 40%',
}

export const prenupFocalPoint = (filename) =>
  PRENUP_FOCAL_POINTS[filename] ?? '50% 40%'

/** Opening screen — three grid/stack rows (top-aligned crop in CSS) */
export const prenupOpeningUrls = [
  prenupUrl(PRENUP_FILENAMES[1]),
  prenupUrl(PRENUP_FILENAMES[2]),
  prenupUrl(PRENUP_FILENAMES[3]),
]

/** Home (NavIndex) blurred full-page background — keep in sync with `NavIndex.css` `.nav-index-bg` */
export const prenupHomeBackgroundUrl = prenupUrl(PRENUP_HERO)

/** NavIndex polaroid row (left to right) — index 0 is the hero polaroid */
export const prenupHomePolaroidUrls = [
  prenupUrl(PRENUP_HERO),
  prenupUrl(PRENUP_FILENAMES[3]),
  prenupUrl(PRENUP_FILENAMES[0]),
]

/** Details page top banner (`ImageBanner`) */
export const prenupDetailsBannerUrl = prenupUrl(PRENUP_FILENAMES[1])
/** Face-focused crop for the Details banner (keeps faces from being cut off) */
export const prenupDetailsBannerFocal = prenupFocalPoint(PRENUP_FILENAMES[1])

/** Details PhotoSection (under schedule) — left · center · right */
export const prenupDetailsPhotoStrip = [
  { src: prenupUrl(PRENUP_FILENAMES[4]), alt: 'Prenup photo', label: 'Memories', backgroundPosition: 'center top' },
  { src: prenupUrl(PRENUP_FILENAMES[6]), alt: 'Prenup photo', label: 'Together', backgroundPosition: 'center top' },
  { src: prenupUrl(PRENUP_FILENAMES[5]), alt: 'Prenup photo', label: 'Love', backgroundPosition: 'center top' },
]

/** Moments: full-bleed top banner (top of the story section) */
export const prenupMomentsBannerFilename = 'IMG_6954-Picsart-AiImageEnhancer.jpg'

/** Moments story section — full prenup set for narrative photos */
export const prenupMomentsStoryFilenames = [...PRENUP_FILENAMES]

/** Moments masonry + lightbox gallery — full prenup set (minus removed items) */
export const GALLERY_FILENAMES = PRENUP_FILENAMES.filter(
  (filename) => filename !== 'IMG_3037.jpg' && filename !== 'IMG_3424.jpg'
)

export const prenupMomentsGalleryFilenames = [...GALLERY_FILENAMES]

/** Entourage — keep in sync with `Entourage.css` `.entourage-bg` (graphic, not prenup) */
export const prenupEntourageBackgroundUrl = '/assets/images/graphics/bg-1.png'

/** PhotoSection fallback when no `images` prop */
export const prenupPhotoSectionDefaults = [
  { src: prenupUrl(PRENUP_FILENAMES[0]), alt: 'Prenup photo', label: 'Memories' },
  { src: prenupUrl(PRENUP_FILENAMES[2]), alt: 'Prenup photo', label: 'Together' },
  { src: prenupUrl(PRENUP_FILENAMES[4]), alt: 'Prenup photo', label: 'Love' },
]

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'
import { FAVICON_IMAGE_PATH, getShareImageAbsoluteUrl } from '../config/siteMeta'

const DynamicTitle = () => {
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const ogImage = getShareImageAbsoluteUrl()
  const description = `${couple.nickname}'s wedding — ${weddingDate}. Digital invitation.`

  return (
    <Helmet>
      <title>{`${couple.nickname}'s Wedding - ${weddingDate}`}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/jpeg" href={FAVICON_IMAGE_PATH} />
      <link rel="apple-touch-icon" href={FAVICON_IMAGE_PATH} />
      <meta property="og:title" content={`${couple.nickname}'s Wedding`} />
      <meta property="og:description" content={`Join us on ${weddingDate}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={`${couple.nickname} — wedding`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${couple.nickname}'s Wedding`} />
      <meta name="twitter:description" content={`Join us on ${weddingDate}`} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export default DynamicTitle

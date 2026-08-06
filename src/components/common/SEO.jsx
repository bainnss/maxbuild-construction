import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../../constants'
import { useSiteSettings } from '../../hooks/useCmsContent'

export default function SEO({ title, description, path = '/', image }) {
  const company = useSiteSettings()
  const resolvedDescription =
    description || company.seoDefaultDescription || company.description
  const resolvedImage = image || company.ogImageUrl
  const fullTitle = title
    ? `${title} | ${company.name}`
    : company.seoDefaultTitle || `${company.name} | ${company.tagline}`
  const url = `${company.websiteUrl || SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={company.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  )
}

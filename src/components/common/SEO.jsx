import { Helmet } from 'react-helmet-async'
import { SITE_URL, SEO_KEYWORDS } from '../../constants'
import { useSiteSettings } from '../../hooks/useCmsContent'

/**
 * Comprehensive SEO component with Open Graph, Twitter Cards, Geo tags,
 * JSON-LD structured data, and local SEO optimizations for Mumbai / MMR.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image,
  keywords,
  type = 'website',
  article,
  noindex = false,
  jsonLd,
}) {
  const company = useSiteSettings()
  const geo = company.geo || {}

  /* ── Resolved values ─────────────────────────────────── */
  const resolvedDescription =
    description || company.seoDefaultDescription || company.description
  const resolvedImage = image || company.ogImageUrl
  const fullTitle = title
    ? `${title} | ${company.name}`
    : company.seoDefaultTitle || `${company.name} | ${company.tagline}`
  const url = `${company.websiteUrl || SITE_URL}${path}`

  /* Merge page-specific keywords with global local-SEO keywords */
  const allKeywords = [
    ...(keywords || []),
    ...SEO_KEYWORDS.primary,
    ...SEO_KEYWORDS.secondary.slice(0, 8),
  ]
    .filter(Boolean)
    .join(', ')

  /* ── LocalBusiness JSON-LD (injected on every page) ── */
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${company.websiteUrl || SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    alternateName: company.shortName,
    url: company.websiteUrl || SITE_URL,
    logo: company.logoUrl || `${company.websiteUrl || SITE_URL}/android-chrome-512x512.png`,
    image: resolvedImage,
    description: resolvedDescription,
    telephone: company.phoneRaw || company.phone,
    email: company.email,
    foundingDate: String(company.founded),
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 200 },
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Bank Transfer, Cheque',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address?.street,
      addressLocality: company.address?.city,
      addressRegion: company.address?.state,
      postalCode: company.address?.zip,
      addressCountry: geo.country || 'IN',
    },
    geo: geo.latitude
      ? {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      }
      : undefined,
    areaServed: (geo.serviceAreas || []).map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Construction Services',
      itemListElement: [
        'Residential Construction',
        'Commercial Construction',
        'Industrial Construction',
        'Infrastructure Development',
        'Architecture & Design',
        'Interior Fit-outs',
        'Renovation & Remodeling',
        'Project Management',
        'Structural Engineering',
        'Design & Build',
      ].map((service, i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service },
        position: i + 1,
      })),
    },
    sameAs: Object.values(company.social || {}).filter(
      (url) => url && !url.endsWith('.com')
    ),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  }

  /* ── WebSite search action schema ── */
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.websiteUrl || SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${company.websiteUrl || SITE_URL}/projects?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  /* ── BreadcrumbList schema ── */
  const pathSegments = path.split('/').filter(Boolean)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: company.websiteUrl || SITE_URL,
      },
      ...pathSegments.map((seg, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
        item: `${company.websiteUrl || SITE_URL}/${pathSegments.slice(0, i + 1).join('/')}`,
      })),
    ],
  }

  /* ── Article schema (for news / blog) ── */
  const articleSchema = article
    ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: resolvedDescription,
      image: resolvedImage,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        '@type': 'Organization',
        name: company.name,
      },
      publisher: {
        '@type': 'Organization',
        name: company.name,
        logo: {
          '@type': 'ImageObject',
          url:
            company.logoUrl ||
              `${company.websiteUrl || SITE_URL}/android-chrome-512x512.png`,
      },
    },
}
    : null

/* Combine all schemas */
const schemas = [
  localBusinessSchema,
  websiteSchema,
  path !== '/' ? breadcrumbSchema : null,
  articleSchema,
  jsonLd,
].filter(Boolean)

return (
  <Helmet>
    {/* ── Primary Meta ── */}
    <title>{fullTitle}</title>
    <meta name="description" content={resolvedDescription} />
    <meta name="keywords" content={allKeywords} />
    <link rel="canonical" href={url} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    {!noindex && (
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    )}

    {/* ── Geo / Local SEO ── */}
    <meta name="geo.region" content={`${geo.country || 'IN'}-${geo.region || 'MH'}`} />
    <meta name="geo.placename" content={company.address?.city || 'Bhayander'} />
    {geo.latitude && (
      <meta name="geo.position" content={`${geo.latitude};${geo.longitude}`} />
    )}
    {geo.latitude && (
      <meta name="ICBM" content={`${geo.latitude}, ${geo.longitude}`} />
    )}
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    <meta name="author" content={company.name} />
    <meta name="distribution" content="local" />
    <meta name="rating" content="general" />
    <meta name="coverage" content="India" />
    <meta name="target" content="all" />
    <meta name="HandheldFriendly" content="True" />

    {/* ── Open Graph ── */}
    <meta property="og:type" content={type} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={resolvedDescription} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={resolvedImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={`${company.name} — ${company.tagline}`} />
    <meta property="og:site_name" content={company.name} />
    <meta property="og:locale" content="en_IN" />

    {/* ── Twitter Cards ── */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={resolvedDescription} />
    <meta name="twitter:image" content={resolvedImage} />
    <meta name="twitter:image:alt" content={`${company.name} — ${company.tagline}`} />

    {/* ── JSON-LD Structured Data ── */}
    {schemas.map((schema, i) => (
      <script key={i} type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    ))}
  </Helmet>
)
}

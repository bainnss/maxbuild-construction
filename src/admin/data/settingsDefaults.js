import { COMPANY, BRAND, SITE_URL } from '../../constants/index.js'

export const defaultSettings = () => ({
  companyName: COMPANY.name,
  shortName: COMPANY.shortName,
  legalName: COMPANY.legalName,
  tagline: COMPANY.tagline,
  description: COMPANY.description,
  email: COMPANY.email,
  phone: COMPANY.phone,
  phoneRaw: COMPANY.phoneRaw,
  websiteUrl: SITE_URL,
  founded: COMPANY.founded,
  address: { ...COMPANY.address },
  hours: { ...COMPANY.hours },
  social: { ...COMPANY.social },
  footerContent: COMPANY.description,
  copyrightText: `© ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.`,
  contactNote: 'Our project desk responds within one business day.',
  mapEmbedUrl: '',
  mapLabel: 'San Francisco Headquarters',

  // Logos & media
  logoUrl: '', // full-color (loader / light surfaces)
  logoNavUrl: '', // light/knockout for dark header & footer
  faviconUrl: '',
  ogImageUrl:
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
  heroImageUrl: '',

  // Brand colours
  colorNavy: '#12153F',
  colorNavyLight: '#1A1B5D',
  colorBrandNavy: '#1A1B5D',
  colorPrimary: BRAND.indigo,
  colorPrimaryLight: BRAND.violet,
  colorAccent: BRAND.accent,
  colorAccentDeep: BRAND.accentDeep,
  colorLavender: BRAND.lavender,
  colorSurface: '#0E1233',

  // SEO defaults
  seoDefaultTitle: `${COMPANY.name} | ${COMPANY.tagline}`,
  seoDefaultDescription: COMPANY.description,

  // Legacy aliases kept for older LocalStorage payloads
  primaryColor: BRAND.indigo,
  accentColor: BRAND.accent,

  updatedAt: new Date().toISOString(),
})

/** Merge persisted settings with defaults so new fields always exist. */
export const mergeSettings = (partial = {}) => {
  const base = defaultSettings()
  return {
    ...base,
    ...partial,
    address: { ...base.address, ...(partial.address || {}) },
    hours: { ...base.hours, ...(partial.hours || {}) },
    social: { ...base.social, ...(partial.social || {}) },
    colorPrimary: partial.colorPrimary || partial.primaryColor || base.colorPrimary,
    colorAccent: partial.colorAccent || partial.accentColor || base.colorAccent,
    primaryColor: partial.colorPrimary || partial.primaryColor || base.primaryColor,
    accentColor: partial.colorAccent || partial.accentColor || base.accentColor,
  }
}

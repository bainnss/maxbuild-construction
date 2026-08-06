export const COMPANY = {
  name: 'MaxBuild Infrastructure Pvt Ltd',
  shortName: 'MaxBuild',
  legalName: 'MaxBuild Infrastructure Pvt Ltd',
  tagline: "Building Tomorrow's Landmarks Today.",
  description:
    'Professional infrastructure and construction company delivering world-class residential, commercial, and industrial projects with uncompromising quality.',
  email: 'hello@maxbuild.com',
  phone: '+1 (800) 555-0142',
  phoneRaw: '+18005550142',
  address: {
    street: '1200 Harbor Boulevard, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
    full: '1200 Harbor Boulevard, Suite 400, San Francisco, CA 94105',
  },
  hours: {
    weekdays: 'Monday – Friday: 8:00 AM – 6:00 PM',
    saturday: 'Saturday: 9:00 AM – 2:00 PM',
    sunday: 'Sunday: Closed',
  },
  social: {
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
  founded: 1998,
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Residential', path: '/services#residential' },
      { label: 'Commercial', path: '/services#commercial' },
      { label: 'Industrial', path: '/services#industrial' },
      { label: 'Infrastructure', path: '/services#infrastructure' },
    ],
  },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Careers', path: '/careers' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
]

export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/team' },
    { label: 'Careers', path: '/careers' },
    { label: 'News', path: '/#news' },
  ],
  services: [
    { label: 'Residential', path: '/services#residential' },
    { label: 'Commercial', path: '/services#commercial' },
    { label: 'Industrial', path: '/services#industrial' },
    { label: 'Design & Build', path: '/services#design-build' },
  ],
  resources: [
    { label: 'Projects', path: '/projects' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ],
}

export const SITE_URL = 'https://maxbuild.com'

/** Brand colors derived from the official MaxBuild logo */
export const BRAND = {
  navy: '#1A1B5D',
  indigo: '#222E7B',
  violet: '#3F478C',
  accent: '#00AEEF',
  accentDeep: '#0088CE',
  lavender: '#E1E5F2',
  white: '#FFFFFF',
  mist: '#F5F6FB',
}

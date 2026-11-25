export const COMPANY = {
  name: 'MaxBuild Infrastructure Pvt Ltd',
  shortName: 'MaxBuild',
  legalName: 'MaxBuild Infrastructure Pvt Ltd',
  tagline: "Building Tomorrow's Landmarks Today.",
  description:
    'Leading construction company in Mumbai, Bhayander, Mira Road & Thane delivering world-class residential, commercial, and industrial projects with uncompromising quality.',
  email: 'hello@maxbuildinfra.com',
  phone: '+91 22 4000 1234',
  phoneRaw: '+912240001234',
  address: {
    street: 'Office No. 301, MaxBuild Tower, Station Road',
    city: 'Bhayander West',
    state: 'Maharashtra',
    zip: '401101',
    country: 'India',
    full: 'Office No. 301, MaxBuild Tower, Station Road, Bhayander West, Thane, Maharashtra 401101',
  },
  hours: {
    weekdays: 'Monday – Friday: 9:00 AM – 7:00 PM',
    saturday: 'Saturday: 10:00 AM – 5:00 PM',
    sunday: 'Sunday: By Appointment',
  },
  social: {
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
  founded: 1998,

  /** Geo / local SEO metadata */
  geo: {
    latitude: 19.3015,
    longitude: 72.8513,
    serviceAreas: [
      'Mumbai',
      'Bhayander',
      'Bhayander East',
      'Bhayander West',
      'Mira Road',
      'Mira-Bhayandar',
      'Thane',
      'Thane West',
      'Dahisar',
      'Borivali',
      'Kandivali',
      'Vasai',
      'Virar',
      'Navi Mumbai',
      'Andheri',
      'Goregaon',
      'Malad',
      'Jogeshwari',
    ],
    region: 'Maharashtra',
    country: 'IN',
  },
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

export const SITE_URL = 'https://maxbuildinfra.com'

/** Primary SEO keywords for local ranking in Mumbai / MMR */
export const SEO_KEYWORDS = {
  primary: [
    'construction company in Mumbai',
    'construction company in Bhayander',
    'construction company in Mira Road',
    'construction company in Thane',
    'best construction company Mumbai',
    'top builders in Bhayander',
    'construction company near me',
  ],
  secondary: [
    'residential construction Mumbai',
    'commercial construction Thane',
    'building contractors Bhayander',
    'civil contractors Mira Road',
    'home construction Mumbai',
    'industrial construction Maharashtra',
    'renovation contractors Bhayander',
    'interior fit-out Mumbai',
    'design build Thane',
    'infrastructure company Mumbai',
    'flat construction Bhayander',
    'building construction Mira Road',
    'construction services Thane',
    'general contractor Mumbai',
    'turnkey construction Bhayander',
  ],
  longTail: [
    'best residential construction company in Bhayander West',
    'affordable home builders in Mira Road',
    'trusted construction company in Thane',
    'luxury villa construction Mumbai',
    'commercial building construction Bhayander',
    'road and infrastructure construction Thane',
    'renovation and remodeling services Mumbai',
    'green building construction Mumbai',
    'RERA registered builders Bhayander',
    'top 10 construction companies in Thane',
  ],
}

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

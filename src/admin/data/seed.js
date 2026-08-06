import { projects as seedProjects } from '../../data/projects.js'
import { services as seedServices } from '../../data/services.js'
import { team as seedTeam } from '../../data/team.js'
import { generateId, nowIso, parseLocation } from '../utils/index.js'
import { defaultSettings, mergeSettings } from './settingsDefaults.js'

export { defaultSettings, mergeSettings } from './settingsDefaults.js'

export const normalizeProject = (p, index = 0) => {
  const loc = parseLocation(p.location || '')
  return {
    id: String(p.id ?? generateId()),
    slug: p.slug || `project-${index + 1}`,
    name: p.name || 'Untitled Project',
    shortDescription: p.shortDescription || '',
    description: p.description || '',
    location: p.location || '',
    city: p.city || loc.city,
    state: p.state || loc.state,
    country: p.country || loc.country || 'United States',
    completionDate: p.completionDate || '',
    startDate: p.startDate || '',
    status: p.status || 'Completed',
    category: p.category || p.industry || 'Commercial',
    area: p.area || '',
    squareFeet: p.squareFeet || p.area || '',
    client: p.client || p.clientName || '',
    clientName: p.clientName || p.client || '',
    architectName: p.architectName || '',
    budget: p.budget || '',
    duration: p.duration || p.timeline || '',
    timeline: p.timeline || p.duration || '',
    constructionType: p.constructionType || '',
    image: p.image || '',
    thumbnail: p.thumbnail || p.image || '',
    gallery: p.gallery || [],
    technologies: p.technologies || [],
    materials: p.materials || [],
    challenges: p.challenges || [],
    solutions: p.solutions || [],
    highlights: p.highlights || [],
    seoTitle: p.seoTitle || p.name || '',
    seoDescription: p.seoDescription || p.shortDescription || '',
    featured: Boolean(p.featured),
    displayOrder: p.displayOrder ?? index + 1,
    published: p.published !== false,
    draft: p.draft === true || p.published === false,
    industry: p.industry || p.category || 'Commercial',
    createdAt: p.createdAt || nowIso(),
    updatedAt: p.updatedAt || nowIso(),
  }
}

export const normalizeService = (s, index = 0) => ({
  id: String(s.id ?? generateId()),
  slug: s.slug || `service-${index + 1}`,
  title: s.title || 'Untitled Service',
  shortDescription: s.shortDescription || '',
  description: s.description || '',
  icon: s.icon || 'Building2',
  image: s.image || '',
  bannerImage: s.bannerImage || s.image || '',
  gallery: s.gallery || [],
  features: s.features || [],
  benefits: s.benefits || s.features || [],
  displayOrder: s.displayOrder ?? index + 1,
  seoTitle: s.seoTitle || s.title || '',
  seoDescription: s.seoDescription || s.shortDescription || '',
  published: s.published !== false,
  createdAt: s.createdAt || nowIso(),
  updatedAt: s.updatedAt || nowIso(),
})

export const normalizeTeamMember = (m, index = 0) => ({
  id: String(m.id ?? generateId()),
  name: m.name || 'Unnamed',
  designation: m.designation || '',
  department: m.department || 'Leadership',
  bio: m.bio || m.biography || '',
  biography: m.biography || m.bio || '',
  experience: m.experience || '',
  yearsExperience: m.yearsExperience || m.experience || '',
  specialisation: m.specialisation || '',
  specialisations: m.specialisations || (m.specialisation ? [m.specialisation] : []),
  linkedin: m.linkedin || '',
  email: m.email || '',
  phone: m.phone || '',
  image: m.image || m.photo || '',
  photo: m.photo || m.image || '',
  socialLinks: m.socialLinks || { linkedin: m.linkedin || '' },
  displayOrder: m.displayOrder ?? index + 1,
  featured: Boolean(m.featured),
  status: m.status || 'Active',
  createdAt: m.createdAt || nowIso(),
  updatedAt: m.updatedAt || nowIso(),
})

export const normalizeClient = (c, index = 0) => ({
  id: String(c.id ?? generateId()),
  name: typeof c === 'string' ? c : c.name || 'Unnamed Client',
  logoUrl: (typeof c === 'string' ? '' : c.logoUrl) || '',
  websiteUrl: (typeof c === 'string' ? '' : c.websiteUrl) || '',
  displayOrder: (typeof c === 'string' ? index + 1 : c.displayOrder) ?? index + 1,
  published: typeof c === 'string' ? true : c.published !== false,
  createdAt: (typeof c === 'string' ? nowIso() : c.createdAt) || nowIso(),
  updatedAt: (typeof c === 'string' ? nowIso() : c.updatedAt) || nowIso(),
})

const seedClients = [
  'Aether Realty',
  'Summit Capital',
  'Nova Hospitals',
  'Horizon Hotels',
  'Vertex Logistics',
  'Pacific Rail',
  'Lumina Tech',
  'Atlas Energy',
]

export const getSeedData = () => ({
  projects: seedProjects.map(normalizeProject),
  services: seedServices.map(normalizeService),
  team: seedTeam.map(normalizeTeamMember),
  clients: seedClients.map(normalizeClient),
  settings: defaultSettings(),
  activities: [
    {
      id: generateId(),
      type: 'system',
      message: 'CMS initialized with seed content',
      createdAt: nowIso(),
    },
  ],
})

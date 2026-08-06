import { useMemo } from 'react'
import { useCmsStore } from '../store/cmsStore'
import { COMPANY } from '../constants'
import { mergeSettings } from '../admin/data/settingsDefaults'

const byDisplayOrder = (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)

/** Public site reads live CMS content from the API-backed store. */
export function usePublicProjects() {
  const projects = useCmsStore((s) => s.projects)
  return useMemo(
    () =>
      projects
        .filter((p) => p.published && !p.draft)
        .slice()
        .sort(byDisplayOrder),
    [projects]
  )
}

export function useFeaturedProjects() {
  const projects = usePublicProjects()
  return useMemo(() => projects.filter((p) => p.featured), [projects])
}

export function usePublicProject(slug) {
  const projects = useCmsStore((s) => s.projects)
  return useMemo(
    () => projects.find((p) => p.slug === slug && p.published && !p.draft) || null,
    [projects, slug]
  )
}

export function useRelatedProjects(slug, limit = 3) {
  const projects = usePublicProjects()
  return useMemo(
    () => projects.filter((p) => p.slug !== slug).slice(0, limit),
    [projects, slug, limit]
  )
}

export function usePublicServices() {
  const services = useCmsStore((s) => s.services)
  return useMemo(
    () =>
      services
        .filter((s) => s.published)
        .slice()
        .sort(byDisplayOrder),
    [services]
  )
}

export function usePublicTeam() {
  const team = useCmsStore((s) => s.team)
  return useMemo(
    () =>
      team
        .filter((m) => m.status !== 'Inactive')
        .slice()
        .sort(byDisplayOrder),
    [team]
  )
}

export function useFeaturedTeam() {
  const team = usePublicTeam()
  return useMemo(() => team.filter((m) => m.featured), [team])
}

export function usePublicClients() {
  const clients = useCmsStore((s) => s.clients)
  return useMemo(
    () =>
      (clients || [])
        .filter((c) => c.published !== false)
        .slice()
        .sort(byDisplayOrder),
    [clients]
  )
}

export function useSiteSettings() {
  const raw = useCmsStore((s) => s.settings)

  return useMemo(() => {
    const settings = mergeSettings(raw)
    return {
      ...COMPANY,
      ...settings,
      name: settings.companyName || COMPANY.name,
      shortName: settings.shortName || COMPANY.shortName,
      legalName: settings.legalName || COMPANY.legalName,
      description: settings.description || COMPANY.description,
      email: settings.email || COMPANY.email,
      phone: settings.phone || COMPANY.phone,
      phoneRaw: settings.phoneRaw || COMPANY.phoneRaw,
      address: settings.address || COMPANY.address,
      hours: settings.hours || COMPANY.hours,
      social: settings.social || COMPANY.social,
      tagline: settings.tagline || COMPANY.tagline,
      founded: settings.founded || COMPANY.founded,
      footerContent: settings.footerContent || settings.description || COMPANY.description,
      copyrightText: settings.copyrightText,
      contactNote: settings.contactNote,
      mapEmbedUrl: settings.mapEmbedUrl,
      mapLabel: settings.mapLabel,
      websiteUrl: settings.websiteUrl,
      logoUrl: settings.logoUrl,
      logoNavUrl: settings.logoNavUrl,
      faviconUrl: settings.faviconUrl,
      ogImageUrl: settings.ogImageUrl,
      heroImageUrl: settings.heroImageUrl,
      seoDefaultTitle: settings.seoDefaultTitle,
      seoDefaultDescription: settings.seoDefaultDescription,
    }
  }, [raw])
}

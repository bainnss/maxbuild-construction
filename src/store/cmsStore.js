import { create } from 'zustand'
import { api } from '../lib/api'
import { mergeSettings } from '../admin/data/settingsDefaults'

const emptyState = {
  projects: [],
  services: [],
  team: [],
  clients: [],
  settings: mergeSettings({}),
  activities: [],
}

export const useCmsStore = create((set, get) => ({
  ...emptyState,
  hydrated: false,
  adminHydrated: false,
  loading: false,
  error: null,

  fetchPublic: async () => {
    set({ loading: true, error: null })
    try {
      const data = await api('/public')
      set({
        projects: data.projects || [],
        services: data.services || [],
        team: data.team || [],
        clients: data.clients || [],
        settings: mergeSettings(data.settings),
        hydrated: true,
        loading: false,
      })
    } catch (err) {
      set({ error: err.message, loading: false, hydrated: true })
    }
  },

  fetchAdmin: async () => {
    set({ loading: true, error: null })
    try {
      const data = await api('/admin/content')
      set({
        projects: data.projects || [],
        services: data.services || [],
        team: data.team || [],
        clients: data.clients || [],
        settings: mergeSettings(data.settings),
        activities: data.activities || [],
        hydrated: true,
        adminHydrated: true,
        loading: false,
      })
    } catch (err) {
      set({ error: err.message, loading: false })
      throw err
    }
  },

  addProject: async (payload) => {
    const project = await api('/projects', { method: 'POST', body: payload })
    set((s) => ({ projects: [project, ...s.projects] }))
    return project
  },

  updateProject: async (id, payload) => {
    const project = await api(`/projects/${id}`, { method: 'PUT', body: payload })
    set((s) => ({
      projects: s.projects.map((item) => (item.id === id ? project : item)),
    }))
    return project
  },

  deleteProject: async (id) => {
    await api(`/projects/${id}`, { method: 'DELETE' })
    set((s) => ({ projects: s.projects.filter((item) => item.id !== id) }))
  },

  deleteProjects: async (ids) => {
    await api('/projects/bulk-delete', { method: 'POST', body: { ids } })
    set((s) => ({ projects: s.projects.filter((item) => !ids.includes(item.id)) }))
  },

  duplicateProject: async (id) => {
    const copy = await api(`/projects/${id}/duplicate`, { method: 'POST' })
    set((s) => ({ projects: [copy, ...s.projects] }))
    return copy
  },

  addService: async (payload) => {
    const service = await api('/services', { method: 'POST', body: payload })
    set((s) => ({ services: [service, ...s.services] }))
    return service
  },

  updateService: async (id, payload) => {
    const service = await api(`/services/${id}`, { method: 'PUT', body: payload })
    set((s) => ({
      services: s.services.map((item) => (item.id === id ? service : item)),
    }))
    return service
  },

  deleteService: async (id) => {
    await api(`/services/${id}`, { method: 'DELETE' })
    set((s) => ({ services: s.services.filter((item) => item.id !== id) }))
  },

  duplicateService: async (id) => {
    const copy = await api(`/services/${id}/duplicate`, { method: 'POST' })
    set((s) => ({ services: [copy, ...s.services] }))
    return copy
  },

  addTeamMember: async (payload) => {
    const member = await api('/team', { method: 'POST', body: payload })
    set((s) => ({ team: [member, ...s.team] }))
    return member
  },

  updateTeamMember: async (id, payload) => {
    const member = await api(`/team/${id}`, { method: 'PUT', body: payload })
    set((s) => ({
      team: s.team.map((item) => (item.id === id ? member : item)),
    }))
    return member
  },

  deleteTeamMember: async (id) => {
    await api(`/team/${id}`, { method: 'DELETE' })
    set((s) => ({ team: s.team.filter((item) => item.id !== id) }))
  },

  addClient: async (payload) => {
    const client = await api('/clients', { method: 'POST', body: payload })
    set((s) => ({ clients: [client, ...(s.clients || [])] }))
    return client
  },

  updateClient: async (id, payload) => {
    const client = await api(`/clients/${id}`, { method: 'PUT', body: payload })
    set((s) => ({
      clients: (s.clients || []).map((item) => (item.id === id ? client : item)),
    }))
    return client
  },

  deleteClient: async (id) => {
    await api(`/clients/${id}`, { method: 'DELETE' })
    set((s) => ({ clients: (s.clients || []).filter((item) => item.id !== id) }))
  },

  updateSettings: async (payload) => {
    const settings = await api('/settings', { method: 'PUT', body: payload })
    set({ settings: mergeSettings(settings) })
    return settings
  },

  resetToSeed: async () => {
    await api('/admin/reset', { method: 'POST' })
    await get().fetchAdmin()
  },

  globalSearch: (query) => {
    const q = query.trim().toLowerCase()
    if (!q) return { projects: [], services: [], team: [], clients: [] }
    const { projects, services, team, clients } = get()
    return {
      projects: projects.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.status?.toLowerCase().includes(q)
      ),
      services: services.filter(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          s.shortDescription?.toLowerCase().includes(q)
      ),
      team: team.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.designation?.toLowerCase().includes(q)
      ),
      clients: (clients || []).filter((c) => c.name?.toLowerCase().includes(q)),
    }
  },
}))

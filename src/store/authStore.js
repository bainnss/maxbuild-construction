import { create } from 'zustand'
import { api } from '../lib/api'

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  ready: false,

  hydrate: async () => {
    try {
      const data = await api('/auth/me')
      set({ isAuthenticated: true, user: data.user, ready: true })
    } catch {
      set({ isAuthenticated: false, user: null, ready: true })
    }
  },

  login: async (username, password, remember = true) => {
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: { username, password, remember },
      })
      set({ isAuthenticated: true, user: data.user })
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message || 'Login failed' }
    }
  },

  logout: async () => {
    try {
      await api('/auth/logout', { method: 'POST' })
    } catch {
      /* ignore */
    }
    set({ isAuthenticated: false, user: null })
  },

  checkAuth: () => get().isAuthenticated,
}))

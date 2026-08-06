import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Users,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useCmsStore } from '../../store/cmsStore'
import Logo from '../../components/common/Logo'
import { cn } from '../../utils'
import toast from 'react-hot-toast'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/clients', label: 'Clients', icon: Building2 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const globalSearch = useCmsStore((s) => s.globalSearch)
  const navigate = useNavigate()
  const location = useLocation()

  const crumbs = location.pathname.split('/').filter(Boolean)

  const onLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  const results = query.trim().length > 1 ? globalSearch(query) : null

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex h-full flex-col">
      <div className={cn('flex items-center gap-3 border-b border-white/8 px-4 py-5', collapsed && !mobile && 'justify-center px-2')}>
        <Link to="/admin" className="rounded-lg px-2 py-1.5" onClick={() => setMobileOpen(false)}>
          <Logo type="nav" variant="mark" className={cn(collapsed && !mobile ? 'max-w-[36px]' : 'max-w-[140px]')} />
        </Link>
        {mobile && (
          <button type="button" className="ml-auto text-slate-400" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-accent/15 text-accent'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white',
                  collapsed && !mobile && 'justify-center px-2'
                )
              }
            >
              <Icon size={18} />
              {(!collapsed || mobile) && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-white/8 p-3">
        <button
          type="button"
          onClick={onLogout}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10',
            collapsed && !mobile && 'justify-center px-2'
          )}
        >
          <LogOut size={18} />
          {(!collapsed || mobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-svh bg-navy text-slate-200">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 hidden border-r border-white/8 bg-surface/95 backdrop-blur-xl transition-[width] duration-300 lg:block',
          collapsed ? 'w-[76px]' : 'w-[260px]'
        )}
      >
        <SidebarContent />
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="absolute top-1/2 -right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-light text-slate-400 hover:text-white"
          aria-label="Toggle sidebar"
        >
          <ChevronRight size={14} className={cn('transition', !collapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-navy/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />
            <motion.aside
              className="fixed top-0 bottom-0 left-0 z-50 w-[280px] border-r border-white/8 bg-surface lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className={cn('relative transition-[padding] duration-300', collapsed ? 'lg:pl-[76px]' : 'lg:pl-[260px]')}>
        <header className="sticky top-0 z-30 border-b border-white/8 bg-navy/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 md:px-6">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <div className="relative min-w-0 flex-1 max-w-xl">
              <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, services, team, clients…"
                className="w-full rounded-lg border border-white/10 bg-navy-light/60 py-2.5 pr-3 pl-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-accent/40"
              />
              {results && (
                <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-80 overflow-auto rounded-xl border border-white/10 bg-navy-light p-2 shadow-premium">
                  {!results.projects.length &&
                    !results.services.length &&
                    !results.team.length &&
                    !results.clients?.length && (
                    <p className="px-3 py-4 text-sm text-slate-500">No results</p>
                  )}
                  {results.projects.slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                      onClick={() => {
                        setQuery('')
                        navigate(`/admin/projects/${p.id}`)
                      }}
                    >
                      <span className="text-xs text-accent">Project</span>
                      <p className="text-white">{p.name}</p>
                    </button>
                  ))}
                  {results.services.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                      onClick={() => {
                        setQuery('')
                        navigate(`/admin/services?edit=${s.id}`)
                      }}
                    >
                      <span className="text-xs text-accent">Service</span>
                      <p className="text-white">{s.title}</p>
                    </button>
                  ))}
                  {results.team.slice(0, 3).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                      onClick={() => {
                        setQuery('')
                        navigate(`/admin/team?edit=${m.id}`)
                      }}
                    >
                      <span className="text-xs text-accent">Team</span>
                      <p className="text-white">{m.name}</p>
                    </button>
                  ))}
                  {(results.clients || []).slice(0, 3).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                      onClick={() => {
                        setQuery('')
                        navigate('/admin/clients')
                      }}
                    >
                      <span className="text-xs text-accent">Client</span>
                      <p className="text-white">{c.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 md:gap-3">
              <p className="hidden text-xs text-slate-500 md:block">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:text-white"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent" />
              </button>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 px-2 py-1.5 md:px-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                  {(user?.name || 'A').slice(0, 1)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-white">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-slate-500">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 border-t border-white/5 px-4 py-2 text-xs text-slate-500 md:px-6">
            {crumbs.map((c, i) => (
              <span key={`${c}-${i}`} className="inline-flex items-center gap-1 capitalize">
                {i > 0 && <ChevronRight size={12} />}
                <span className={i === crumbs.length - 1 ? 'text-slate-300' : ''}>{c}</span>
              </span>
            ))}
          </div>
        </header>

        <main className="relative px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

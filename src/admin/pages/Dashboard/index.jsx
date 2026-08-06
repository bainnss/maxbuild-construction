import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  Loader,
  Briefcase,
  Users,
  Building2,
  Plus,
  ArrowUpRight,
} from 'lucide-react'
import { useCmsStore } from '../../../store/cmsStore'
import { AdminCard, AdminPageHeader, AdminBadge } from '../../components/ui/primitives'
import { formatAdminDate } from '../../utils'

export default function AdminDashboard() {
  const projects = useCmsStore((s) => s.projects)
  const services = useCmsStore((s) => s.services)
  const team = useCmsStore((s) => s.team)
  const clients = useCmsStore((s) => s.clients)
  const activities = useCmsStore((s) => s.activities)

  const completed = projects.filter((p) => p.status === 'Completed').length
  const upcoming = projects.filter((p) => p.status === 'Upcoming').length
  const inProgress = projects.filter((p) => p.status === 'In Progress').length
  const published = projects.filter((p) => p.published && !p.draft).length

  const cards = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, tone: 'text-accent' },
    { label: 'Completed', value: completed, icon: CheckCircle2, tone: 'text-emerald-400' },
    { label: 'In Progress', value: inProgress, icon: Loader, tone: 'text-amber-300' },
    { label: 'Upcoming', value: upcoming, icon: Clock3, tone: 'text-sky-300' },
    { label: 'Services', value: services.length, icon: Briefcase, tone: 'text-violet-300' },
    { label: 'Team Members', value: team.length, icon: Users, tone: 'text-rose-300' },
    { label: 'Clients', value: (clients || []).length, icon: Building2, tone: 'text-cyan-300' },
  ]

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  const statusBars = [
    { label: 'Completed', value: completed, color: 'bg-emerald-400' },
    { label: 'In Progress', value: inProgress, color: 'bg-amber-400' },
    { label: 'Upcoming', value: upcoming, color: 'bg-sky-400' },
  ]
  const maxBar = Math.max(1, ...statusBars.map((s) => s.value))

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of MaxBuild website content and recent activity."
        actions={
          <>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent"
            >
              <Plus size={16} /> New Project
            </Link>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5"
            >
              View Site <ArrowUpRight size={14} />
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <AdminCard className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold text-white">{card.value}</p>
                </div>
                <div className={`rounded-lg bg-white/5 p-2.5 ${card.tone}`}>
                  <Icon size={20} />
                </div>
              </AdminCard>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <AdminCard className="xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Project Status</h2>
            <AdminBadge tone="info">{published} published</AdminBadge>
          </div>
          <div className="space-y-4">
            {statusBars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-slate-400">{bar.label}</span>
                  <span className="text-white">{bar.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className={`h-full rounded-full ${bar.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(bar.value / maxBar) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold text-white">Recently Updated</h3>
            <div className="divide-y divide-white/8">
              {recentProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/admin/projects/${p.id}`}
                  className="flex items-center gap-3 py-3 transition hover:bg-white/[0.02]"
                >
                  <img
                    src={p.thumbnail || p.image}
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{p.name}</p>
                    <p className="text-xs text-slate-500">{formatAdminDate(p.updatedAt)}</p>
                  </div>
                  <AdminBadge
                    tone={
                      p.status === 'Completed'
                        ? 'success'
                        : p.status === 'In Progress'
                          ? 'warning'
                          : 'info'
                    }
                  >
                    {p.status}
                  </AdminBadge>
                </Link>
              ))}
            </div>
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard>
            <h2 className="mb-4 font-display text-lg font-semibold text-white">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { to: '/admin/projects/new', label: 'Create Project' },
                { to: '/admin/services', label: 'Manage Services' },
                { to: '/admin/team', label: 'Manage Team' },
                { to: '/admin/settings', label: 'Website Settings' },
              ].map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="flex items-center justify-between rounded-lg border border-white/8 px-3 py-2.5 text-sm text-slate-300 transition hover:border-accent/30 hover:text-white"
                >
                  {a.label}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="mb-4 font-display text-lg font-semibold text-white">Recent Activity</h2>
            <ul className="space-y-3">
              {activities.slice(0, 8).map((a) => (
                <li key={a.id} className="border-l-2 border-accent/40 pl-3">
                  <p className="text-sm text-slate-300">{a.message}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{formatAdminDate(a.createdAt)}</p>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>
      </div>
    </div>
  )
}

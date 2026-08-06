import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pencil, Trash2, ArrowLeft, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { AdminBadge, AdminCard, AdminPageHeader } from '../../components/ui/primitives'
import ConfirmModal from '../../modals/ConfirmModal'
import { formatAdminDate } from '../../utils'

export default function ProjectDetailsAdmin() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = useCmsStore((s) => s.projects.find((p) => p.id === id))
  const deleteProject = useCmsStore((s) => s.deleteProject)
  const [confirm, setConfirm] = useState(false)

  if (!project) {
    return (
      <div className="py-20 text-center text-slate-400">
        Project not found.{' '}
        <Link to="/admin/projects" className="text-accent">
          Back
        </Link>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader
        title={project.name}
        description={project.shortDescription}
        actions={
          <>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            {project.published && (
              <Link
                to={`/projects/${project.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300"
              >
                Public page <ExternalLink size={14} />
              </Link>
            )}
            <Link
              to={`/admin/projects/${project.id}/edit`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-3 py-2 text-sm font-semibold text-white"
            >
              <Pencil size={14} /> Edit
            </Link>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-500/30 px-3 py-2 text-sm text-rose-300"
            >
              <Trash2 size={14} /> Delete
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AdminCard className="overflow-hidden p-0">
            <img src={project.image} alt={project.name} className="aspect-[16/9] w-full object-cover" />
          </AdminCard>
          <AdminCard>
            <h2 className="font-display text-lg font-semibold text-white">Overview</h2>
            <p className="mt-3 leading-relaxed text-slate-300">{project.description}</p>
          </AdminCard>
          {project.gallery?.length > 0 && (
            <AdminCard>
              <h2 className="mb-4 font-display text-lg font-semibold text-white">Gallery</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {project.gallery.map((src, i) => (
                  <img key={i} src={src} alt="" className="aspect-square rounded-lg object-cover" />
                ))}
              </div>
            </AdminCard>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <ListCard title="Challenges" items={project.challenges} />
            <ListCard title="Solutions" items={project.solutions} />
            <ListCard title="Materials" items={project.materials} />
            <ListCard title="Technologies" items={project.technologies} />
          </div>
        </div>

        <div className="space-y-4">
          <AdminCard className="space-y-3 text-sm">
            <Meta label="Status">
              <AdminBadge tone={project.status === 'Completed' ? 'success' : 'warning'}>
                {project.status}
              </AdminBadge>
            </Meta>
            <Meta label="Category">{project.category}</Meta>
            <Meta label="Location">{project.location}</Meta>
            <Meta label="Client">{project.clientName || project.client || '—'}</Meta>
            <Meta label="Architect">{project.architectName || '—'}</Meta>
            <Meta label="Area">{project.area || '—'}</Meta>
            <Meta label="Duration">{project.duration || project.timeline || '—'}</Meta>
            <Meta label="Start">{project.startDate || '—'}</Meta>
            <Meta label="Completion">{project.completionDate || '—'}</Meta>
            <Meta label="Budget">{project.budget || '—'}</Meta>
            <Meta label="Published">{project.published && !project.draft ? 'Yes' : 'Draft'}</Meta>
            <Meta label="Featured">{project.featured ? 'Yes' : 'No'}</Meta>
            <Meta label="Created">{formatAdminDate(project.createdAt)}</Meta>
            <Meta label="Updated">{formatAdminDate(project.updatedAt)}</Meta>
          </AdminCard>
          {project.highlights?.length > 0 && <ListCard title="Highlights" items={project.highlights} />}
        </div>
      </div>

      <ConfirmModal
        open={confirm}
        title="Delete this project?"
        description="This will remove the project from the CMS and public website."
        onCancel={() => setConfirm(false)}
        onConfirm={async () => {
          try {
            await deleteProject(project.id)
            toast.success('Project deleted')
            navigate('/admin/projects')
          } catch (err) {
            toast.error(err.message || 'Could not delete project')
          }
        }}
      />
    </div>
  )
}

function Meta({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-2">
      <span className="text-slate-500">{label}</span>
      <span className="text-right text-slate-200">{children}</span>
    </div>
  )
}

function ListCard({ title, items = [] }) {
  if (!items?.length) return null
  return (
    <AdminCard>
      <h3 className="font-display text-base font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </AdminCard>
  )
}

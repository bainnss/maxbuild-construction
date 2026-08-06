import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Copy,
  Eye,
  CheckSquare,
  Square,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { AdminBadge, AdminPageHeader, inputClass } from '../../components/ui/primitives'
import ConfirmModal from '../../modals/ConfirmModal'
import { formatAdminDate, paginate } from '../../utils'

export default function AdminProjects() {
  const navigate = useNavigate()
  const projects = useCmsStore((s) => s.projects)
  const deleteProject = useCmsStore((s) => s.deleteProject)
  const deleteProjects = useCmsStore((s) => s.deleteProjects)
  const duplicateProject = useCmsStore((s) => s.duplicateProject)

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [category, setCategory] = useState('All')
  const [published, setPublished] = useState('All')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [bulkOpen, setBulkOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...projects]
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q)
      )
    }
    if (status !== 'All') list = list.filter((p) => p.status === status)
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (published === 'Published') list = list.filter((p) => p.published && !p.draft)
    if (published === 'Draft') list = list.filter((p) => p.draft || !p.published)
    list.sort((a, b) => {
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
      if (sort === 'name') return a.name.localeCompare(b.name)
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    })
    return list
  }, [projects, query, status, category, published, sort])

  const { items, totalPages, total } = paginate(filtered, page, 8)

  const toggleAll = () => {
    if (selected.length === items.length) setSelected([])
    else setSelected(items.map((p) => p.id))
  }

  const toggleOne = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Create, edit, and publish landmark project content."
        actions={
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent"
          >
            <Plus size={16} /> New Project
          </Link>
        }
      />

      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
          <input
            className={`${inputClass} pl-9`}
            placeholder="Search projects…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className={inputClass} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }}>
            {['All', 'Completed', 'In Progress', 'Upcoming'].map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All statuses' : s}</option>
            ))}
          </select>
          <select className={inputClass} value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }}>
            {['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Architecture', 'Interior'].map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All categories' : s}</option>
            ))}
          </select>
          <select className={inputClass} value={published} onChange={(e) => { setPublished(e.target.value); setPage(1) }}>
            {['All', 'Published', 'Draft'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select className={inputClass} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm">
          <span>{selected.length} selected</span>
          <button
            type="button"
            onClick={() => setBulkOpen(true)}
            className="rounded-md bg-rose-600 px-3 py-1.5 font-semibold text-white"
          >
            Bulk Delete
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/8 bg-navy-light/40">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/8 bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">
                  <button type="button" onClick={toggleAll} aria-label="Select all">
                    {selected.length && selected.length === items.length ? (
                      <CheckSquare size={16} className="text-accent" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3">Completion</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => toggleOne(p.id)} aria-label="Select">
                      {selected.includes(p.id) ? (
                        <CheckSquare size={16} className="text-accent" />
                      ) : (
                        <Square size={16} />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.thumbnail || p.image} alt="" className="h-11 w-14 rounded-md object-cover" />
                      <div>
                        <p className="font-medium text-white">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <AdminBadge
                      tone={
                        p.status === 'Completed' ? 'success' : p.status === 'In Progress' ? 'warning' : 'info'
                      }
                    >
                      {p.status}
                    </AdminBadge>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{p.category}</td>
                  <td className="px-4 py-3 text-slate-300">{p.area || '—'}</td>
                  <td className="px-4 py-3 text-slate-300">{p.completionDate || '—'}</td>
                  <td className="px-4 py-3">
                    <AdminBadge tone={p.published && !p.draft ? 'success' : 'muted'}>
                      {p.published && !p.draft ? 'Yes' : 'Draft'}
                    </AdminBadge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <IconBtn label="View" onClick={() => navigate(`/admin/projects/${p.id}`)}>
                        <Eye size={14} />
                      </IconBtn>
                      <IconBtn label="Edit" onClick={() => navigate(`/admin/projects/${p.id}/edit`)}>
                        <Pencil size={14} />
                      </IconBtn>
                      <IconBtn
                        label="Duplicate"
                        onClick={async () => {
                          try {
                            const copy = await duplicateProject(p.id)
                            toast.success('Project duplicated')
                            if (copy) navigate(`/admin/projects/${copy.id}/edit`)
                          } catch (err) {
                            toast.error(err.message || 'Could not duplicate project')
                          }
                        }}
                      >
                        <Copy size={14} />
                      </IconBtn>
                      <IconBtn label="Delete" onClick={() => setDeleteId(p.id)} danger>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-slate-500">
                    No projects match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/8 px-4 py-3 text-sm text-slate-400">
          <span>
            {total} project{total === 1 ? '' : 's'}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border border-white/10 px-3 py-1 disabled:opacity-40"
            >
              Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-white/10 px-3 py-1 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete this project?"
        description="This action cannot be undone. The project will be removed from the public website."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await deleteProject(deleteId)
            setDeleteId(null)
            toast.success('Project deleted')
          } catch (err) {
            toast.error(err.message || 'Could not delete project')
          }
        }}
      />
      <ConfirmModal
        open={bulkOpen}
        title={`Delete ${selected.length} projects?`}
        description="Selected projects will be permanently removed."
        onCancel={() => setBulkOpen(false)}
        onConfirm={async () => {
          try {
            await deleteProjects(selected)
            setSelected([])
            setBulkOpen(false)
            toast.success('Projects deleted')
          } catch (err) {
            toast.error(err.message || 'Could not delete projects')
          }
        }}
      />
    </div>
  )
}

function IconBtn({ children, onClick, label, danger }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`rounded-md border border-white/10 p-2 text-slate-300 hover:bg-white/5 hover:text-white ${
        danger ? 'hover:border-rose-500/40 hover:text-rose-300' : ''
      }`}
    >
      {children}
    </button>
  )
}

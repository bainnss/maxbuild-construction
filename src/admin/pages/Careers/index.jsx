import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Search, Eye, MapPin, Briefcase, Clock, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { careerSchema } from '../../validation/schemas'
import { paginate } from '../../utils'
import TagsInput from '../../components/TagsInput'
import ConfirmModal from '../../modals/ConfirmModal'
import {
  AdminBadge,
  AdminCard,
  AdminPageHeader,
  Field,
  inputClass,
  selectClass,
  textareaClass,
} from '../../components/ui/primitives'

const defaults = {
  title: '',
  department: 'Operations',
  location: 'Bhayander West, Thane',
  employmentType: 'Full-time',
  experience: '',
  salaryRange: '',
  openings: 1,
  description: '',
  requirements: [],
  responsibilities: [],
  featured: false,
  displayOrder: 1,
  status: 'Active',
}

const STATUS_TONE = {
  Active: 'success',
  Draft: 'warning',
  Closed: 'danger',
}

export default function AdminCareers() {
  const careers = useCmsStore((s) => s.careers)
  const addCareer = useCmsStore((s) => s.addCareer)
  const updateCareer = useCmsStore((s) => s.updateCareer)
  const deleteCareer = useCmsStore((s) => s.deleteCareer)

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [viewing, setViewing] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const list = useMemo(() => careers || [], [careers])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return list
      .filter((job) => {
        const matchesStatus = statusFilter === 'All' || job.status === statusFilter
        const matchesQuery =
          !q ||
          job.title?.toLowerCase().includes(q) ||
          job.department?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q)
        return matchesStatus && matchesQuery
      })
      .slice()
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }, [list, query, statusFilter])

  const { items, totalPages, total } = paginate(filtered, page, 8)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(careerSchema), defaultValues: defaults })

  const openCreate = () => {
    setEditing(null)
    reset({ ...defaults, displayOrder: list.length + 1 })
    setOpen(true)
  }

  const openEdit = (job) => {
    setEditing(job)
    reset({
      ...defaults,
      ...job,
      employmentType: job.employmentType || job.type || 'Full-time',
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
    })
    setOpen(true)
  }

  const onSubmit = async (data) => {
    const slug = (data.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const payload = { ...data, slug }

    try {
      if (editing) {
        await updateCareer(editing.id, payload)
        toast.success('Job opening updated')
      } else {
        await addCareer(payload)
        toast.success('Job opening created')
      }
      setOpen(false)
    } catch (err) {
      toast.error(err.message || 'Could not save job opening')
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Careers & Job Openings"
        description="Publish, edit, and manage open positions displayed on the public Careers page."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent"
          >
            <Plus size={16} /> Add Job Opening
          </button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
          <input
            className={`${inputClass} pl-9`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search job title, department, location…"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Active', 'Draft', 'Closed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setStatusFilter(status)
                setPage(1)
              }}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                statusFilter === status
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <AdminCard className="py-14 text-center">
          <p className="text-base font-medium text-white">No job openings found</p>
          <p className="mt-1 text-sm text-slate-400">
            Create your first job posting to publish it on the public Careers page.
          </p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2 text-sm font-semibold text-white hover:bg-accent"
          >
            <Plus size={15} /> Add Job Opening
          </button>
        </AdminCard>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((job) => (
            <AdminCard key={job.id} className="flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <AdminBadge tone={STATUS_TONE[job.status] || 'default'}>
                        {job.status}
                      </AdminBadge>
                      {job.featured && <AdminBadge tone="info">Featured</AdminBadge>}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white">
                      {job.title}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-md border border-white/10 bg-navy/60 px-2.5 py-1 text-xs text-slate-300">
                    {job.openings || 1} {(job.openings || 1) === 1 ? 'opening' : 'openings'}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase size={13} className="text-accent" />
                    {job.department} · {job.employmentType}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} className="text-accent" />
                    {job.location}
                  </span>
                  {job.experience && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-accent" />
                      {job.experience}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/8 pt-3">
                <span className="text-xs text-slate-500">
                  {job.salaryRange || 'Compensation: Competitive'}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewing(job)}
                    className="rounded-md border border-white/10 p-2 text-slate-300 hover:border-white/25 hover:text-white"
                    aria-label={`View ${job.title}`}
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(job)}
                    className="rounded-md border border-white/10 p-2 text-slate-300 hover:border-white/25 hover:text-white"
                    aria-label={`Edit ${job.title}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(job.id)}
                    className="rounded-md border border-white/10 p-2 text-rose-300 hover:border-rose-400/40"
                    aria-label={`Delete ${job.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{total} job openings</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border border-white/10 px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            {page}/{totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border border-white/10 px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-xl border border-white/10 bg-navy-light p-6 shadow-premium">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-white">
                {editing ? 'Edit Job Opening' : 'Add Job Opening'}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Job Title" error={errors.title?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Senior Site Engineer"
                    {...register('title')}
                  />
                </Field>
                <Field label="Department" error={errors.department?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Operations, Engineering"
                    {...register('department')}
                  />
                </Field>
                <Field label="Location" error={errors.location?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Bhayander West, Thane"
                    {...register('location')}
                  />
                </Field>
                <Field label="Employment Type" error={errors.employmentType?.message}>
                  <select className={selectClass} {...register('employmentType')}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </Field>
                <Field label="Experience" error={errors.experience?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. 3–6 Years"
                    {...register('experience')}
                  />
                </Field>
                <Field label="Salary / Compensation" error={errors.salaryRange?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. ₹6L – ₹10L PA or Competitive"
                    {...register('salaryRange')}
                  />
                </Field>
              </div>

              <Field label="Job Description" error={errors.description?.message}>
                <textarea
                  className={textareaClass}
                  placeholder="Describe the role, project scope, and team..."
                  {...register('description')}
                />
              </Field>

              <Field label="Requirements" hint="Type a requirement and press Enter">
                <Controller
                  name="requirements"
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add requirement and press Enter…"
                    />
                  )}
                />
              </Field>

              <Field label="Key Responsibilities" hint="Type a responsibility and press Enter">
                <Controller
                  name="responsibilities"
                  control={control}
                  render={({ field }) => (
                    <TagsInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add responsibility and press Enter…"
                    />
                  )}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Openings" error={errors.openings?.message}>
                  <input type="number" min={1} className={inputClass} {...register('openings')} />
                </Field>
                <Field label="Status" error={errors.status?.message}>
                  <select className={selectClass} {...register('status')}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </Field>
                <Field label="Display Order" error={errors.displayOrder?.message}>
                  <input type="number" className={inputClass} {...register('displayOrder')} />
                </Field>
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" {...register('featured')} /> Feature this role
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-accent-deep px-5 py-2 text-sm font-semibold text-white hover:bg-accent disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving...' : editing ? 'Update Opening' : 'Create Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-xl border border-white/10 bg-navy-light p-6 shadow-premium">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <AdminBadge tone={STATUS_TONE[viewing.status] || 'default'}>
                    {viewing.status}
                  </AdminBadge>
                  <span className="text-xs text-slate-400">
                    {viewing.department} · {viewing.employmentType}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                  {viewing.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {viewing.location}
                  {viewing.experience ? ` · ${viewing.experience}` : ''}
                  {viewing.salaryRange ? ` · ${viewing.salaryRange}` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm text-slate-300">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </h3>
                <p className="mt-2 leading-relaxed">{viewing.description}</p>
              </div>

              {viewing.requirements?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Requirements
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-300">
                    {viewing.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {viewing.responsibilities?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Responsibilities
                  </h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-300">
                    {viewing.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const job = viewing
                  setViewing(null)
                  openEdit(job)
                }}
                className="rounded-lg bg-accent-deep px-4 py-2 text-sm font-semibold text-white hover:bg-accent"
              >
                Edit Opening
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete job opening?"
        description="This job posting will be permanently removed from the Careers page."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await deleteCareer(deleteId)
            setDeleteId(null)
            toast.success('Job opening deleted')
          } catch (err) {
            toast.error(err.message || 'Could not delete job opening')
          }
        }}
      />
    </div>
  )
}

import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Search, LayoutGrid, List } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { serviceSchema } from '../../validation/schemas'
import { slugify, paginate } from '../../utils'
import ImageUploader from '../../components/ImageUploader'
import TagsInput from '../../components/TagsInput'
import ConfirmModal from '../../modals/ConfirmModal'
import {
  AdminBadge,
  AdminCard,
  AdminPageHeader,
  Field,
  inputClass,
  textareaClass,
} from '../../components/ui/primitives'

const defaults = {
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  icon: 'Building2',
  image: '',
  bannerImage: '',
  gallery: [],
  features: [],
  benefits: [],
  displayOrder: 1,
  seoTitle: '',
  seoDescription: '',
  published: true,
}

export default function AdminServices() {
  const services = useCmsStore((s) => s.services)
  const addService = useCmsStore((s) => s.addService)
  const updateService = useCmsStore((s) => s.updateService)
  const deleteService = useCmsStore((s) => s.deleteService)
  const duplicateService = useCmsStore((s) => s.duplicateService)

  const [query, setQuery] = useState('')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return services.filter(
      (s) => !q || s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q)
    )
  }, [services, query])

  const { items, totalPages, total } = paginate(filtered, page, 9)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(serviceSchema), defaultValues: defaults })

  const title = watch('title')

  const openCreate = () => {
    setEditing(null)
    reset(defaults)
    setOpen(true)
  }

  const openEdit = (service) => {
    setEditing(service)
    reset({ ...defaults, ...service, gallery: service.gallery || [], features: service.features || [], benefits: service.benefits || [] })
    setOpen(true)
  }

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      slug: data.slug || slugify(data.title),
      bannerImage: data.bannerImage || data.image,
    }
    try {
      if (editing) {
        await updateService(editing.id, payload)
        toast.success('Service updated')
      } else {
        await addService(payload)
        toast.success('Service added')
      }
      setOpen(false)
    } catch (err) {
      toast.error(err.message || 'Could not save service')
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Manage service offerings shown on the public website."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent"
          >
            <Plus size={16} /> New Service
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
          <input
            className={`${inputClass} pl-9`}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            placeholder="Search services…"
          />
        </div>
        <div className="flex rounded-lg border border-white/10 p-1">
          <button type="button" onClick={() => setView('grid')} className={`rounded-md p-2 ${view === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
            <LayoutGrid size={16} />
          </button>
          <button type="button" onClick={() => setView('list')} className={`rounded-md p-2 ${view === 'list' ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((s) => (
            <AdminCard key={s.id} className="overflow-hidden p-0">
              <img src={s.image} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
                  <AdminBadge tone={s.published ? 'success' : 'muted'}>
                    {s.published ? 'Live' : 'Hidden'}
                  </AdminBadge>
                </div>
                <p className="line-clamp-2 text-sm text-slate-400">{s.shortDescription}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => openEdit(s)} className="rounded-md border border-white/10 p-2 text-slate-300 hover:text-white">
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await duplicateService(s.id)
                        toast.success('Service duplicated')
                      } catch (err) {
                        toast.error(err.message || 'Could not duplicate service')
                      }
                    }}
                    className="rounded-md border border-white/10 px-2 text-xs text-slate-300"
                  >
                    Duplicate
                  </button>
                  <button type="button" onClick={() => setDeleteId(s.id)} className="rounded-md border border-white/10 p-2 text-rose-300">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/8">
          <table className="min-w-full text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Icon</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={s.image} alt="" className="h-10 w-14 rounded object-cover" />
                      <span className="text-white">{s.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{s.icon}</td>
                  <td className="px-4 py-3">
                    <AdminBadge tone={s.published ? 'success' : 'muted'}>
                      {s.published ? 'Published' : 'Draft'}
                    </AdminBadge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" onClick={() => openEdit(s)} className="mr-2 text-slate-300 hover:text-white">Edit</button>
                    <button type="button" onClick={() => setDeleteId(s.id)} className="text-rose-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{total} services</span>
        <div className="flex gap-2">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-white/10 px-3 py-1 disabled:opacity-40">Prev</button>
          <span>{page}/{totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border border-white/10 px-3 py-1 disabled:opacity-40">Next</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-3xl rounded-xl border border-white/10 bg-navy-light p-6 shadow-premium">
            <h2 className="font-display text-xl font-semibold text-white">
              {editing ? 'Edit Service' : 'New Service'}
            </h2>
            <form
              className="mt-5 space-y-4"
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => {
                if (!editing && title) setValue('slug', slugify(title))
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title" error={errors.title?.message}>
                  <input className={inputClass} {...register('title')} />
                </Field>
                <Field label="Slug" error={errors.slug?.message}>
                  <input className={inputClass} {...register('slug')} />
                </Field>
              </div>
              <Field label="Short Description" error={errors.shortDescription?.message}>
                <textarea className={textareaClass} {...register('shortDescription')} />
              </Field>
              <Field label="Full Description" error={errors.description?.message}>
                <textarea className={textareaClass} {...register('description')} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Icon (Lucide name)" error={errors.icon?.message}>
                  <input className={inputClass} {...register('icon')} placeholder="Building2" />
                </Field>
                <Field label="Display Order">
                  <input type="number" className={inputClass} {...register('displayOrder')} />
                </Field>
              </div>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUploader label="Banner / Image" value={field.value} onChange={field.onChange} />
                )}
              />
              <Field label="Features">
                <Controller name="features" control={control} render={({ field }) => (
                  <TagsInput value={field.value || []} onChange={field.onChange} />
                )} />
              </Field>
              <Field label="Benefits">
                <Controller name="benefits" control={control} render={({ field }) => (
                  <TagsInput value={field.value || []} onChange={field.onChange} />
                )} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="SEO Title"><input className={inputClass} {...register('seoTitle')} /></Field>
                <label className="flex items-end gap-2 pb-3 text-sm text-slate-300">
                  <input type="checkbox" {...register('published')} /> Published
                </label>
              </div>
              <Field label="SEO Description">
                <textarea className={textareaClass} {...register('seoDescription')} />
              </Field>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-accent-deep px-4 py-2 text-sm font-semibold text-white">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete this service?"
        description="It will disappear from the public Services page."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await deleteService(deleteId)
            setDeleteId(null)
            toast.success('Service deleted')
          } catch (err) {
            toast.error(err.message || 'Could not delete service')
          }
        }}
      />
    </div>
  )
}

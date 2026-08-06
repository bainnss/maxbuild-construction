import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Search, Building2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { clientSchema } from '../../validation/schemas'
import { paginate } from '../../utils'
import ImageUploader from '../../components/ImageUploader'
import ConfirmModal from '../../modals/ConfirmModal'
import {
  AdminBadge,
  AdminCard,
  AdminPageHeader,
  Field,
  inputClass,
} from '../../components/ui/primitives'

const defaults = {
  name: '',
  logoUrl: '',
  websiteUrl: '',
  displayOrder: 1,
  published: true,
}

export default function AdminClients() {
  const clients = useCmsStore((s) => s.clients)
  const addClient = useCmsStore((s) => s.addClient)
  const updateClient = useCmsStore((s) => s.updateClient)
  const deleteClient = useCmsStore((s) => s.deleteClient)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const list = clients || []

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return list
      .filter((c) => !q || c.name.toLowerCase().includes(q))
      .slice()
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  }, [list, query])

  const { items, totalPages, total } = paginate(filtered, page, 12)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(clientSchema), defaultValues: defaults })

  const openCreate = () => {
    setEditing(null)
    reset({ ...defaults, displayOrder: list.length + 1 })
    setOpen(true)
  }

  const openEdit = (client) => {
    setEditing(client)
    reset({ ...defaults, ...client })
    setOpen(true)
  }

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateClient(editing.id, data)
        toast.success('Client updated')
      } else {
        await addClient(data)
        toast.success('Client added')
      }
      setOpen(false)
    } catch (err) {
      toast.error(err.message || 'Could not save client')
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Clients"
        description="Manage client names and logos shown in the homepage marquee."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent"
          >
            <Plus size={16} /> Add Client
          </button>
        }
      />

      <div className="relative mb-5 max-w-md">
        <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
        <input
          className={`${inputClass} pl-9`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
          placeholder="Search clients…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((c) => (
          <AdminCard key={c.id} className="flex items-center gap-4 p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-navy/60">
              {c.logoUrl ? (
                <img src={c.logoUrl} alt={c.name} className="h-full w-full object-contain p-2" />
              ) : (
                <Building2 size={22} className="text-slate-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="truncate font-display text-base font-semibold text-white">{c.name}</h3>
                <AdminBadge tone={c.published ? 'success' : 'warning'}>
                  {c.published ? 'Published' : 'Hidden'}
                </AdminBadge>
              </div>
              <p className="text-xs text-slate-500">Order {c.displayOrder ?? '—'}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(c)}
                  className="rounded-md border border-white/10 p-2 text-slate-300"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(c.id)}
                  className="rounded-md border border-white/10 p-2 text-rose-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      {!items.length && (
        <AdminCard className="py-12 text-center text-sm text-slate-500">
          No clients yet. Add your first client logo or name.
        </AdminCard>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{total} clients</span>
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
            {page}/{totalPages || 1}
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-lg rounded-xl border border-white/10 bg-navy-light p-6 shadow-premium">
            <h2 className="font-display text-xl font-semibold text-white">
              {editing ? 'Edit Client' : 'Add Client'}
            </h2>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Field label="Client Name" error={errors.name?.message}>
                <input className={inputClass} {...register('name')} />
              </Field>
              <Controller
                name="logoUrl"
                control={control}
                render={({ field }) => (
                  <ImageUploader label="Logo (optional)" value={field.value} onChange={field.onChange} />
                )}
              />
              <Field label="Website URL" hint="Optional link">
                <input className={inputClass} placeholder="https://" {...register('websiteUrl')} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Display Order">
                  <input type="number" className={inputClass} {...register('displayOrder')} />
                </Field>
                <label className="flex items-end gap-2 pb-3 text-sm text-slate-300">
                  <input type="checkbox" {...register('published')} /> Published on site
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-accent-deep px-4 py-2 text-sm font-semibold text-white"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Remove client?"
        description="They will no longer appear in the homepage client marquee."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await deleteClient(deleteId)
            setDeleteId(null)
            toast.success('Client removed')
          } catch (err) {
            toast.error(err.message || 'Could not remove client')
          }
        }}
      />
    </div>
  )
}

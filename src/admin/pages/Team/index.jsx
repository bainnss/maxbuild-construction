import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { teamSchema } from '../../validation/schemas'
import { paginate } from '../../utils'
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
  name: '',
  designation: '',
  department: 'Leadership',
  biography: '',
  yearsExperience: '',
  specialisations: [],
  linkedin: '',
  email: '',
  phone: '',
  photo: '',
  displayOrder: 1,
  featured: false,
  status: 'Active',
}

export default function AdminTeam() {
  const team = useCmsStore((s) => s.team)
  const addTeamMember = useCmsStore((s) => s.addTeamMember)
  const updateTeamMember = useCmsStore((s) => s.updateTeamMember)
  const deleteTeamMember = useCmsStore((s) => s.deleteTeamMember)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return team.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.designation?.toLowerCase().includes(q) ||
        m.department?.toLowerCase().includes(q)
    )
  }, [team, query])

  const { items, totalPages, total } = paginate(filtered, page, 8)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(teamSchema), defaultValues: defaults })

  const openCreate = () => {
    setEditing(null)
    reset(defaults)
    setOpen(true)
  }

  const openEdit = (member) => {
    setEditing(member)
    reset({
      ...defaults,
      ...member,
      biography: member.biography || member.bio || '',
      yearsExperience: member.yearsExperience || member.experience || '',
      photo: member.photo || member.image || '',
      specialisations: member.specialisations || (member.specialisation ? [member.specialisation] : []),
    })
    setOpen(true)
  }

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      bio: data.biography,
      experience: data.yearsExperience,
      image: data.photo,
      specialisation: data.specialisations?.[0] || '',
      socialLinks: { linkedin: data.linkedin || '' },
    }
    try {
      if (editing) {
        await updateTeamMember(editing.id, payload)
        toast.success('Team member updated')
      } else {
        await addTeamMember(payload)
        toast.success('Team member added')
      }
      setOpen(false)
    } catch (err) {
      toast.error(err.message || 'Could not save team member')
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Team"
        description="Manage leadership and staff profiles on the public website."
        actions={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-deep px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent"
          >
            <Plus size={16} /> Add Member
          </button>
        }
      />

      <div className="relative mb-5 max-w-md">
        <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
        <input
          className={`${inputClass} pl-9`}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1) }}
          placeholder="Search team…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((m) => (
          <AdminCard key={m.id} className="overflow-hidden p-0">
            <img src={m.photo || m.image} alt={m.name} className="aspect-[4/5] w-full object-cover" />
            <div className="p-4">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">{m.name}</h3>
                {m.featured && <AdminBadge tone="info">Featured</AdminBadge>}
              </div>
              <p className="text-sm text-accent">{m.designation}</p>
              <p className="mt-1 text-xs text-slate-500">{m.department} · {m.status}</p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => openEdit(m)} className="rounded-md border border-white/10 p-2 text-slate-300">
                  <Pencil size={14} />
                </button>
                <button type="button" onClick={() => setDeleteId(m.id)} className="rounded-md border border-white/10 p-2 text-rose-300">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{total} members</span>
        <div className="flex gap-2">
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-white/10 px-3 py-1 disabled:opacity-40">Prev</button>
          <span>{page}/{totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border border-white/10 px-3 py-1 disabled:opacity-40">Next</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-xl border border-white/10 bg-navy-light p-6 shadow-premium">
            <h2 className="font-display text-xl font-semibold text-white">
              {editing ? 'Edit Member' : 'Add Member'}
            </h2>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input className={inputClass} {...register('name')} />
                </Field>
                <Field label="Designation" error={errors.designation?.message}>
                  <input className={inputClass} {...register('designation')} />
                </Field>
                <Field label="Department">
                  <input className={inputClass} {...register('department')} />
                </Field>
                <Field label="Years of Experience">
                  <input className={inputClass} {...register('yearsExperience')} />
                </Field>
              </div>
              <Field label="Biography" error={errors.biography?.message}>
                <textarea className={textareaClass} {...register('biography')} />
              </Field>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <div>
                    <ImageUploader label="Photo" value={field.value} onChange={field.onChange} />
                    {errors.photo && <p className="mt-1 text-xs text-rose-400">{errors.photo.message}</p>}
                  </div>
                )}
              />
              <Field label="Specialisations">
                <Controller name="specialisations" control={control} render={({ field }) => (
                  <TagsInput value={field.value || []} onChange={field.onChange} />
                )} />
              </Field>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="LinkedIn"><input className={inputClass} {...register('linkedin')} /></Field>
                <Field label="Email" error={errors.email?.message}><input className={inputClass} {...register('email')} /></Field>
                <Field label="Phone"><input className={inputClass} {...register('phone')} /></Field>
              </div>
              <div className="flex flex-wrap gap-4">
                <Field label="Status">
                  <select className={inputClass} {...register('status')}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </Field>
                <Field label="Display Order">
                  <input type="number" className={inputClass} {...register('displayOrder')} />
                </Field>
                <label className="flex items-end gap-2 pb-3 text-sm text-slate-300">
                  <input type="checkbox" {...register('featured')} /> Featured
                </label>
              </div>
              <div className="flex justify-end gap-3">
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
        title="Remove team member?"
        description="They will no longer appear on the public Team page."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await deleteTeamMember(deleteId)
            setDeleteId(null)
            toast.success('Team member removed')
          } catch (err) {
            toast.error(err.message || 'Could not remove team member')
          }
        }}
      />
    </div>
  )
}

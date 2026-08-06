import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { projectSchema } from '../../validation/schemas'
import { useCmsStore } from '../../../store/cmsStore'
import { slugify } from '../../utils'
import ImageUploader from '../../components/ImageUploader'
import TagsInput from '../../components/TagsInput'
import { AdminCard, AdminPageHeader, Field, inputClass, textareaClass } from '../../components/ui/primitives'

const emptyDefaults = {
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  city: '',
  state: '',
  country: 'United States',
  status: 'Upcoming',
  category: 'Commercial',
  completionDate: '',
  startDate: '',
  area: '',
  squareFeet: '',
  clientName: '',
  architectName: '',
  budget: '',
  duration: '',
  constructionType: '',
  image: '',
  thumbnail: '',
  gallery: [],
  technologies: [],
  materials: [],
  challenges: [],
  solutions: [],
  highlights: [],
  seoTitle: '',
  seoDescription: '',
  featured: false,
  displayOrder: 1,
  published: true,
  draft: false,
}

export default function ProjectFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const projects = useCmsStore((s) => s.projects)
  const addProject = useCmsStore((s) => s.addProject)
  const updateProject = useCmsStore((s) => s.updateProject)
  const existing = useMemo(() => projects.find((p) => p.id === id), [projects, id])

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: emptyDefaults,
  })

  useEffect(() => {
    if (isEdit && existing) {
      reset({
        ...emptyDefaults,
        ...existing,
        clientName: existing.clientName || existing.client || '',
        gallery: existing.gallery || [],
        technologies: existing.technologies || [],
        materials: existing.materials || [],
        challenges: existing.challenges || [],
        solutions: existing.solutions || [],
        highlights: existing.highlights || [],
      })
    }
  }, [isEdit, existing, reset])

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [isDirty])

  const name = watch('name')
  useEffect(() => {
    if (!isEdit && name) setValue('slug', slugify(name), { shouldValidate: true })
  }, [name, isEdit, setValue])

  if (isEdit && !existing) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">Project not found.</p>
        <Link to="/admin/projects" className="mt-4 inline-block text-accent">
          Back to projects
        </Link>
      </div>
    )
  }

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      location: [data.city, data.state, data.country].filter(Boolean).join(', '),
      client: data.clientName,
      industry: data.category,
      thumbnail: data.thumbnail || data.image,
      draft: data.draft || !data.published,
    }
    try {
      if (isEdit) {
        await updateProject(id, payload)
        toast.success('Project updated')
        navigate(`/admin/projects/${id}`)
      } else {
        const created = await addProject(payload)
        toast.success('Project added')
        navigate(`/admin/projects/${created.id}`)
      }
    } catch (err) {
      toast.error(err.message || 'Could not save project. Please try again.')
    }
  }

  return (
    <div className="pb-24">
      <AdminPageHeader
        title={isEdit ? 'Edit Project' : 'Create Project'}
        description="Fill in project details. Changes sync to the public website when published."
        actions={
          <Link to="/admin/projects" className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-300">
            Cancel
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">General Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Project Name" error={errors.name?.message}>
              <input className={inputClass} {...register('name')} />
            </Field>
            <Field label="Slug" error={errors.slug?.message} hint="Auto-generated from name">
              <input className={inputClass} {...register('slug')} />
            </Field>
            <Field label="Short Description" error={errors.shortDescription?.message} className="md:col-span-2">
              <textarea className={textareaClass} {...register('shortDescription')} />
            </Field>
            <Field label="Full Description" error={errors.description?.message} className="md:col-span-2">
              <textarea className={`${textareaClass} min-h-[160px]`} {...register('description')} />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Project Information</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="City" error={errors.city?.message}>
              <input className={inputClass} {...register('city')} />
            </Field>
            <Field label="State">
              <input className={inputClass} {...register('state')} />
            </Field>
            <Field label="Country" error={errors.country?.message}>
              <input className={inputClass} {...register('country')} />
            </Field>
            <Field label="Status" error={errors.status?.message}>
              <select className={inputClass} {...register('status')}>
                {['Completed', 'In Progress', 'Upcoming'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Category" error={errors.category?.message}>
              <select className={inputClass} {...register('category')}>
                {['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Architecture', 'Interior'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Construction Type">
              <input className={inputClass} {...register('constructionType')} />
            </Field>
            <Field label="Start Date">
              <input className={inputClass} {...register('startDate')} placeholder="2023-01 or Jan 2023" />
            </Field>
            <Field label="Completion Date">
              <input className={inputClass} {...register('completionDate')} />
            </Field>
            <Field label="Duration">
              <input className={inputClass} {...register('duration')} placeholder="36 months" />
            </Field>
            <Field label="Area">
              <input className={inputClass} {...register('area')} />
            </Field>
            <Field label="Square Feet">
              <input className={inputClass} {...register('squareFeet')} />
            </Field>
            <Field label="Budget">
              <input className={inputClass} {...register('budget')} />
            </Field>
            <Field label="Client Name">
              <input className={inputClass} {...register('clientName')} />
            </Field>
            <Field label="Architect Name">
              <input className={inputClass} {...register('architectName')} />
            </Field>
            <Field label="Display Order">
              <input type="number" className={inputClass} {...register('displayOrder')} />
            </Field>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Technologies">
              <Controller
                name="technologies"
                control={control}
                render={({ field }) => <TagsInput value={field.value || []} onChange={field.onChange} />}
              />
            </Field>
            <Field label="Materials">
              <Controller
                name="materials"
                control={control}
                render={({ field }) => <TagsInput value={field.value || []} onChange={field.onChange} />}
              />
            </Field>
            <Field label="Challenges">
              <Controller
                name="challenges"
                control={control}
                render={({ field }) => (
                  <TagsInput value={field.value || []} onChange={field.onChange} placeholder="Add challenge + Enter" />
                )}
              />
            </Field>
            <Field label="Solutions">
              <Controller
                name="solutions"
                control={control}
                render={({ field }) => (
                  <TagsInput value={field.value || []} onChange={field.onChange} placeholder="Add solution + Enter" />
                )}
              />
            </Field>
            <Field label="Highlights" className="md:col-span-2">
              <Controller
                name="highlights"
                control={control}
                render={({ field }) => (
                  <TagsInput value={field.value || []} onChange={field.onChange} placeholder="Add highlight + Enter" />
                )}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Images</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <div>
                  <ImageUploader label="Primary Cover Image" value={field.value} onChange={field.onChange} />
                  {errors.image && <p className="mt-1 text-xs text-rose-400">{errors.image.message}</p>}
                </div>
              )}
            />
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  label="Thumbnail (optional)"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="mt-6">
            <Controller
              name="gallery"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  label="Gallery Images"
                  multiple
                  values={field.value || []}
                  onChangeMultiple={field.onChange}
                  onReorder={field.onChange}
                />
              )}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">SEO</h2>
          <div className="grid gap-4">
            <Field label="SEO Title">
              <input className={inputClass} {...register('seoTitle')} />
            </Field>
            <Field label="SEO Description">
              <textarea className={textareaClass} {...register('seoDescription')} />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Publishing</h2>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" {...register('featured')} /> Featured Project
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" {...register('published')} /> Published
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" {...register('draft')} /> Draft
            </label>
          </div>
        </AdminCard>

        <div className="fixed right-0 bottom-0 left-0 z-20 border-t border-white/10 bg-navy/90 px-4 py-3 backdrop-blur-xl lg:left-[260px]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              {isDirty ? 'You have unsaved changes' : 'All changes saved locally'}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-accent-deep px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent disabled:opacity-60"
            >
              {isSubmitting ? 'Saving…' : isEdit ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

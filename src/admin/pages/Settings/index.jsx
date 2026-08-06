import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { useCmsStore } from '../../../store/cmsStore'
import { mergeSettings } from '../../data/settingsDefaults'
import { settingsSchema } from '../../validation/schemas'
import { AdminCard, AdminPageHeader, Field, inputClass, textareaClass } from '../../components/ui/primitives'
import ImageUploader from '../../components/ImageUploader'

function toFormValues(settings) {
  const s = mergeSettings(settings)
  return {
    companyName: s.companyName,
    shortName: s.shortName,
    legalName: s.legalName,
    tagline: s.tagline,
    description: s.description,
    email: s.email,
    phone: s.phone,
    phoneRaw: s.phoneRaw,
    websiteUrl: s.websiteUrl,
    founded: s.founded,
    footerContent: s.footerContent,
    copyrightText: s.copyrightText,
    contactNote: s.contactNote,
    mapEmbedUrl: s.mapEmbedUrl,
    mapLabel: s.mapLabel,
    street: s.address.street,
    city: s.address.city,
    state: s.address.state,
    zip: s.address.zip,
    country: s.address.country,
    weekdays: s.hours.weekdays,
    saturday: s.hours.saturday,
    sunday: s.hours.sunday,
    linkedin: s.social.linkedin,
    instagram: s.social.instagram,
    twitter: s.social.twitter,
    facebook: s.social.facebook,
    youtube: s.social.youtube,
    logoUrl: s.logoUrl,
    logoNavUrl: s.logoNavUrl,
    faviconUrl: s.faviconUrl,
    ogImageUrl: s.ogImageUrl,
    heroImageUrl: s.heroImageUrl,
    colorNavy: s.colorNavy,
    colorNavyLight: s.colorNavyLight,
    colorBrandNavy: s.colorBrandNavy,
    colorPrimary: s.colorPrimary,
    colorPrimaryLight: s.colorPrimaryLight,
    colorAccent: s.colorAccent,
    colorAccentDeep: s.colorAccentDeep,
    colorLavender: s.colorLavender,
    colorSurface: s.colorSurface,
    seoDefaultTitle: s.seoDefaultTitle,
    seoDefaultDescription: s.seoDefaultDescription,
  }
}

function ColorField({ label, name, control }) {
  return (
    <Field label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="h-11 w-14 shrink-0 cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
              value={field.value || '#000000'}
              onChange={(e) => field.onChange(e.target.value)}
            />
            <input
              className={inputClass}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="#000000"
            />
          </div>
        )}
      />
    </Field>
  )
}

export default function AdminSettings() {
  const rawSettings = useCmsStore((s) => s.settings)
  const updateSettings = useCmsStore((s) => s.updateSettings)
  const resetToSeed = useCmsStore((s) => s.resetToSeed)
  const settings = useMemo(() => mergeSettings(rawSettings), [rawSettings])
  const formDefaults = useMemo(() => toFormValues(settings), [settings])

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: formDefaults,
  })

  useEffect(() => {
    reset(formDefaults)
  }, [formDefaults, reset])

  const watchedColors = watch([
    'colorPrimary',
    'colorAccent',
    'colorNavy',
    'colorAccentDeep',
  ])

  const onSubmit = async (data) => {
    const fullAddress = [data.street, data.city, data.state, data.zip, data.country]
      .filter(Boolean)
      .join(', ')

    try {
    await updateSettings({
      companyName: data.companyName,
      shortName: data.shortName,
      legalName: data.legalName,
      tagline: data.tagline,
      description: data.description,
      email: data.email,
      phone: data.phone,
      phoneRaw: data.phoneRaw || data.phone?.replace(/[^\d+]/g, ''),
      websiteUrl: data.websiteUrl,
      founded: Number(data.founded) || settings.founded,
      footerContent: data.footerContent,
      copyrightText: data.copyrightText,
      contactNote: data.contactNote,
      mapEmbedUrl: data.mapEmbedUrl,
      mapLabel: data.mapLabel,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        full: fullAddress,
      },
      hours: {
        weekdays: data.weekdays,
        saturday: data.saturday,
        sunday: data.sunday,
      },
      social: {
        linkedin: data.linkedin,
        instagram: data.instagram,
        twitter: data.twitter,
        facebook: data.facebook,
        youtube: data.youtube,
      },
      logoUrl: data.logoUrl || '',
      logoNavUrl: data.logoNavUrl || '',
      faviconUrl: data.faviconUrl || '',
      ogImageUrl: data.ogImageUrl || '',
      heroImageUrl: data.heroImageUrl || '',
      colorNavy: data.colorNavy,
      colorNavyLight: data.colorNavyLight,
      colorBrandNavy: data.colorBrandNavy,
      colorPrimary: data.colorPrimary,
      colorPrimaryLight: data.colorPrimaryLight,
      colorAccent: data.colorAccent,
      colorAccentDeep: data.colorAccentDeep,
      colorLavender: data.colorLavender,
      colorSurface: data.colorSurface,
      primaryColor: data.colorPrimary,
      accentColor: data.colorAccent,
      seoDefaultTitle: data.seoDefaultTitle,
      seoDefaultDescription: data.seoDefaultDescription,
    })
      toast.success('Settings saved — public site updated')
    } catch (err) {
      toast.error(err.message || 'Could not save settings')
    }
  }

  return (
    <div className="pb-16">
      <AdminPageHeader
        title="Website Settings"
        description="Edit every company detail, brand colour, logo, and SEO default. Changes apply across the public website."
        actions={
          <button
            type="button"
            onClick={async () => {
              if (window.confirm('Reset all CMS data (projects, services, team, settings) to seed content?')) {
                try {
                  await resetToSeed()
                  toast.success('CMS reset to seed data')
                } catch (err) {
                  toast.error(err.message || 'Could not reset CMS')
                }
              }
            }}
            className="rounded-lg border border-rose-500/30 px-4 py-2.5 text-sm text-rose-300"
          >
            Reset CMS Data
          </button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Company Identity</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company Name" error={errors.companyName?.message}>
              <input className={inputClass} {...register('companyName')} />
            </Field>
            <Field label="Short Name">
              <input className={inputClass} {...register('shortName')} />
            </Field>
            <Field label="Legal Name" className="md:col-span-2">
              <input className={inputClass} {...register('legalName')} />
            </Field>
            <Field label="Tagline / Headline" className="md:col-span-2">
              <input className={inputClass} {...register('tagline')} />
            </Field>
            <Field label="Founded Year">
              <input type="number" className={inputClass} {...register('founded')} />
            </Field>
            <Field label="Website URL">
              <input className={inputClass} {...register('websiteUrl')} />
            </Field>
            <Field label="Company Description" className="md:col-span-2">
              <textarea className={textareaClass} {...register('description')} />
            </Field>
            <Field label="Footer Blurb" className="md:col-span-2">
              <textarea className={textareaClass} {...register('footerContent')} />
            </Field>
            <Field label="Copyright Text" className="md:col-span-2">
              <input className={inputClass} {...register('copyrightText')} />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Contact Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email" error={errors.email?.message}>
              <input className={inputClass} {...register('email')} />
            </Field>
            <Field label="Phone (display)" error={errors.phone?.message}>
              <input className={inputClass} {...register('phone')} />
            </Field>
            <Field label="Phone (tel link raw)" hint="e.g. +18005550142">
              <input className={inputClass} {...register('phoneRaw')} />
            </Field>
            <Field label="Contact page note">
              <input className={inputClass} {...register('contactNote')} />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Office Address</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Street" className="md:col-span-2">
              <input className={inputClass} {...register('street')} />
            </Field>
            <Field label="City">
              <input className={inputClass} {...register('city')} />
            </Field>
            <Field label="State">
              <input className={inputClass} {...register('state')} />
            </Field>
            <Field label="ZIP / Postal">
              <input className={inputClass} {...register('zip')} />
            </Field>
            <Field label="Country">
              <input className={inputClass} {...register('country')} />
            </Field>
            <Field label="Map label" className="md:col-span-2">
              <input className={inputClass} {...register('mapLabel')} />
            </Field>
            <Field label="Google Maps embed URL / iframe src" className="md:col-span-2" hint="Paste Maps embed URL">
              <input className={inputClass} {...register('mapEmbedUrl')} placeholder="https://www.google.com/maps/embed?..." />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Business Hours</h2>
          <div className="grid gap-4">
            <Field label="Weekdays">
              <input className={inputClass} {...register('weekdays')} />
            </Field>
            <Field label="Saturday">
              <input className={inputClass} {...register('saturday')} />
            </Field>
            <Field label="Sunday">
              <input className={inputClass} {...register('sunday')} />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Social Media</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {['linkedin', 'instagram', 'twitter', 'facebook', 'youtube'].map((key) => (
              <Field key={key} label={key}>
                <input className={inputClass} {...register(key)} />
              </Field>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-2 font-display text-lg font-semibold text-white">Brand Colours</h2>
          <p className="mb-5 text-sm text-slate-400">
            These update CSS variables on the live website immediately after save.
          </p>
          <div className="mb-5 flex flex-wrap gap-2">
            {watchedColors.filter(Boolean).map((c) => (
              <span key={c} className="h-8 w-8 rounded-md border border-white/10" style={{ background: c }} title={c} />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ColorField label="Navy (page background)" name="colorNavy" control={control} />
            <ColorField label="Navy Light" name="colorNavyLight" control={control} />
            <ColorField label="Brand Navy" name="colorBrandNavy" control={control} />
            <ColorField label="Primary" name="colorPrimary" control={control} />
            <ColorField label="Primary Light" name="colorPrimaryLight" control={control} />
            <ColorField label="Accent" name="colorAccent" control={control} />
            <ColorField label="Accent Deep (buttons)" name="colorAccentDeep" control={control} />
            <ColorField label="Lavender" name="colorLavender" control={control} />
            <ColorField label="Surface" name="colorSurface" control={control} />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-2 font-display text-lg font-semibold text-white">Logos & Media</h2>
          <p className="mb-5 text-sm text-slate-400">
            Full-colour logo for loader/light backgrounds. Nav logo for dark header & footer. Favicon appears in the browser tab.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <Controller
              name="logoUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader label="Full-colour logo (loader / light)" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="logoNavUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader label="Nav / Footer logo (dark backgrounds)" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="faviconUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader label="Favicon" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="ogImageUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader label="Default Open Graph / social share image" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="heroImageUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader label="Homepage hero background (optional override)" value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-5 font-display text-lg font-semibold text-white">Default SEO</h2>
          <div className="grid gap-4">
            <Field label="Default meta title">
              <input className={inputClass} {...register('seoDefaultTitle')} />
            </Field>
            <Field label="Default meta description">
              <textarea className={textareaClass} {...register('seoDefaultDescription')} />
            </Field>
          </div>
        </AdminCard>

        <div className="sticky bottom-4 z-10 flex items-center justify-between rounded-xl border border-white/10 bg-navy/95 px-4 py-3 shadow-premium backdrop-blur-xl">
          <p className="text-xs text-slate-500">
            {isDirty ? 'You have unsaved changes' : 'All settings synced to LocalStorage'}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-accent-deep px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}

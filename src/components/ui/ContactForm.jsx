import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle2 } from 'lucide-react'
import Button from './Button'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    // EmailJS-ready: replace with emailjs.send when credentials are available
    console.info('Contact form submission:', data)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full Name"
          error={errors.name?.message}
          id="name"
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="field"
            placeholder="Jane Smith"
            {...register('name', { required: 'Name is required' })}
          />
        </Field>
        <Field label="Email" error={errors.email?.message} id="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="field"
            placeholder="jane@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
          />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message} id="phone">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="field"
            placeholder="+1 (555) 000-0000"
            {...register('phone')}
          />
        </Field>
        <Field label="Project Type" error={errors.projectType?.message} id="projectType">
          <select
            id="projectType"
            className="field"
            defaultValue=""
            {...register('projectType', { required: 'Select a project type' })}
          >
            <option value="" disabled>
              Select type
            </option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Infrastructure</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message} id="message">
        <textarea
          id="message"
          rows={5}
          className="field resize-none"
          placeholder="Tell us about your vision, timeline, and location..."
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 20, message: 'Please provide more detail' },
          })}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <Send size={16} />
        </Button>
        {submitted && (
          <p className="flex items-center gap-2 text-sm text-emerald-400" role="status">
            <CheckCircle2 size={16} /> Message received. We will respond shortly.
          </p>
        )}
      </div>
    </form>
  )
}

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import Button from '../../components/ui/Button'
import { ImageWithSkeleton } from '../../components/ui/Skeleton'
import { benefits } from '../../data/content'
import { IMAGES } from '../../constants/images'
import { usePublicCareers } from '../../hooks/useCmsContent'
import { useCmsStore } from '../../store/cmsStore'
import { submitCareerApplication } from '../../lib/api'
import {
  MapPin,
  Briefcase,
  ArrowUpRight,
  Clock,
  IndianRupee,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'
import { cn } from '../../utils'

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export default function Careers() {
  const jobs = usePublicCareers()
  const hydrated = useCmsStore((s) => s.hydrated)

  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeError, setResumeError] = useState('')
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const formSectionRef = useRef(null)
  const fileInputRef = useRef(null)

  const departments = useMemo(
    () => ['All', ...new Set(jobs.map((j) => j.department).filter(Boolean))],
    [jobs]
  )

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return jobs.filter((job) => {
      const matchesDept = departmentFilter === 'All' || job.department === departmentFilter
      const matchesQuery =
        !q ||
        job.title?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.department?.toLowerCase().includes(q)
      return matchesDept && matchesQuery
    })
  }, [jobs, departmentFilter, searchQuery])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      coverLetter: '',
    },
  })

  const handleApplyClick = (job) => {
    setValue('position', job.title, { shouldValidate: true })
    setValue('jobId', job.id || '')
    setSelectedJob(null)
    setSubmitStatus({ type: '', message: '' })
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0]
    setResumeError('')
    if (!file) {
      setResumeFile(null)
      return
    }
    const validExt = /\.(pdf|doc|docx)$/i.test(file.name)
    if (!ACCEPTED_TYPES.includes(file.type) && !validExt) {
      setResumeError('Please upload a PDF, DOC, or DOCX file.')
      setResumeFile(null)
      return
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeError('Resume file size must be under 5 MB.')
      setResumeFile(null)
      return
    }
    setResumeFile(file)
  }

  const onSubmit = async (data) => {
    setSubmitStatus({ type: '', message: '' })
    if (!resumeFile) {
      setResumeError('Please upload your resume (PDF, DOC, or DOCX).')
      return
    }

    const formData = new FormData()
    formData.append('name', data.name.trim())
    formData.append('email', data.email.trim())
    formData.append('phone', data.phone.trim())
    formData.append('position', data.position)
    formData.append('jobId', data.jobId || '')
    formData.append('experience', data.experience.trim())
    formData.append('coverLetter', data.coverLetter.trim())
    formData.append('resume', resumeFile)

    try {
      const res = await submitCareerApplication(formData)
      toast.success('Application submitted successfully!')
      setSubmitStatus({
        type: 'success',
        message:
          res.message ||
          'Your application has been sent to our HR team at saadbains123786@gmail.com.',
      })
      reset()
      setResumeFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      const msg = err.message || 'Failed to submit application. Please try again.'
      toast.error(msg)
      setSubmitStatus({ type: 'error', message: msg })
    }
  }

  return (
    <>
      <SEO
        title="Careers — Join the Best Construction Team in Mumbai"
        description="Join MaxBuild Infrastructure. Explore open positions, benefits, and a culture built on craft and excellence. Construction jobs in Mumbai, Bhayander, Mira Road & Thane."
        path="/careers"
        image={IMAGES.workers}
        keywords={[
          'construction jobs Mumbai',
          'civil engineer jobs Bhayander',
          'construction careers Thane',
          'building jobs Mira Road',
          'construction company hiring Mumbai',
        ]}
      />
      <PageHero
        eyebrow="Careers"
        title="Build your career on landmarks."
        description="Join a team where craftsmanship, safety, and ambition define every day on site and in studio. Opportunities across Mumbai, Bhayander & Thane."
        image={IMAGES.workers}
      />

      <section className="section-pad">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Culture"
                title="A workplace worthy of the work."
                description="We hire people who care about precision — then give them the tools, mentorship, and projects to grow into industry leaders."
              />
            </div>
            <div className="img-zoom relative aspect-[16/11] overflow-hidden rounded-sm">
              <ImageWithSkeleton
                src={IMAGES.culture}
                alt="MaxBuild team collaboration"
                className="h-full w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/40">
        <Container>
          <SectionTitle eyebrow="Benefits" title="Support that matches the ambition." align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-sm border border-white/8 bg-navy-light/40 p-7"
              >
                <h3 className="font-display text-xl font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

        {/* Open Roles Section */}
        <section className="section-pad" id="open-roles">
          <Container>
                  <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <SectionTitle
                      eyebrow="Open Roles"
                      title="Current opportunities."
                      description="Explore active roles across our Mumbai, Bhayander, Mira Road, and Thane teams."
                      className="mb-0"
                    />
                    <div className="relative w-full max-w-sm">
                      <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search roles or locations..."
                        className="field pl-11"
                      />
                    </div>
                  </div>

                  {departments.length > 1 && (
                    <div className="mb-8 flex flex-wrap gap-2">
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => setDepartmentFilter(dept)}
                          className={cn(
                            'rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
                            departmentFilter === dept
                              ? 'border-accent-deep bg-accent-deep text-white'
                              : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                          )}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  )}

                  {!hydrated ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="skeleton h-32 w-full rounded-sm" />
                      ))}
                    </div>
                  ) : filteredJobs.length === 0 ? (
                    <div className="rounded-sm border border-white/10 bg-navy-light/30 px-6 py-14 text-center">
                      <p className="font-display text-xl text-white">No matching open positions right now</p>
                      <p className="mt-2 text-sm text-slate-400">
                        Submit a general application below and we&apos;ll reach out when a matching role opens.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/10 border-y border-white/10">
                      {filteredJobs.map((job) => (
                        <article
                          key={job.id}
                          className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                                {job.department}
                              </span>
                              {job.openings > 1 && (
                                <span className="text-xs text-slate-400">
                                  {job.openings} positions
                                </span>
                              )}
                            </div>
                            <h3 className="mt-2.5 font-display text-2xl font-semibold text-white">
                              {job.title}
                            </h3>
                            <p className="mt-2 max-w-2xl line-clamp-2 text-slate-400">
                              {job.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.15em] text-slate-400">
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin size={13} className="text-accent" /> {job.location}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <Briefcase size={13} className="text-accent" /> {job.employmentType || job.type}
                              </span>
                              {job.experience && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Clock size={13} className="text-accent" /> {job.experience}
                                </span>
                              )}
                              {job.salaryRange && (
                                <span className="inline-flex items-center gap-1.5">
                                  <IndianRupee size={13} className="text-accent" /> {job.salaryRange}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 flex-wrap gap-3">
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => setSelectedJob(job)}
                            >
                              View Details
                            </Button>
                            <Button type="button" onClick={() => handleApplyClick(job)}>
                              Apply Now <ArrowUpRight size={16} />
                            </Button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </Container>
      </section>

            {/* Application Form Section */}
            <section ref={formSectionRef} id="apply-form" className="section-pad bg-surface/40 scroll-mt-24">
              <Container>
                <div className="grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <SectionTitle
                      eyebrow="Apply Now"
                      title="Submit your application."
                      description="Tell us about your engineering, design, or site leadership background. Our HR desk reviews every application directly."
                      className="mb-6"
                    />
                    <div className="space-y-4 rounded-sm border border-white/10 bg-navy-light/35 p-6 text-sm text-slate-300">
                      <p className="font-display text-base font-semibold text-white">
                        What to expect after applying
                      </p>
                      <ul className="space-y-2.5 text-slate-400">
                        <li>1. Application sent directly to HR (`saadbains123786@gmail.com`).</li>
                        <li>2. Technical & portfolio screening within 3–5 business days.</li>
                        <li>3. In-person or virtual interview with our Bhayander / Mumbai leads.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-sm border border-white/10 bg-navy-light/40 p-6 md:p-8 lg:col-span-7">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                      <input type="hidden" {...register('jobId')} />

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="career-name"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Full Name *
                          </label>
                          <input
                            id="career-name"
                            type="text"
                            className="field"
                            placeholder="Rahul Sharma"
                            {...register('name', {
                              required: 'Full name is required',
                              minLength: { value: 2, message: 'Enter at least 2 characters' },
                            })}
                          />
                          {errors.name && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="career-email"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Email Address *
                          </label>
                          <input
                            id="career-email"
                            type="email"
                            className="field"
                            placeholder="rahul@example.com"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                              },
                            })}
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="career-phone"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Phone Number *
                          </label>
                          <input
                            id="career-phone"
                            type="tel"
                            className="field"
                            placeholder="+91 98765 43210"
                            {...register('phone', {
                              required: 'Phone number is required',
                              minLength: { value: 7, message: 'Enter a valid phone number' },
                            })}
                          />
                          {errors.phone && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="career-experience"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Total Experience *
                          </label>
                          <input
                            id="career-experience"
                            type="text"
                            className="field"
                            placeholder="e.g. 4 Years / Fresher"
                            {...register('experience', {
                              required: 'Experience is required',
                            })}
                          />
                          {errors.experience && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {errors.experience.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                          <label
                            htmlFor="career-position"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Position Applied For *
                          </label>
                          <select
                            id="career-position"
                            className="field"
                            defaultValue=""
                            {...register('position', { required: 'Please select a position' })}
                          >
                            <option value="" disabled>
                              Select an open position
                            </option>
                            {jobs.map((job) => (
                              <option key={job.id} value={job.title}>
                                {job.title} ({job.location})
                              </option>
                            ))}
                            <option value="General Application">General Application</option>
                          </select>
                          {errors.position && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {errors.position.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="career-resume"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Resume / CV (PDF, DOC, DOCX · Max 5 MB) *
                          </label>
                          <div className="flex flex-wrap items-center gap-3 rounded-sm border border-dashed border-white/20 bg-navy/40 p-4">
                            <input
                              ref={fileInputRef}
                              id="career-resume"
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={handleResumeChange}
                              className="sr-only"
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-accent hover:text-accent"
                            >
                              <Upload size={14} /> Choose File
                            </button>
                            {resumeFile ? (
                              <div className="flex items-center gap-2 text-sm text-slate-200">
                                <FileText size={15} className="text-accent" />
                                <span className="max-w-[220px] truncate">{resumeFile.name}</span>
                                <span className="text-xs text-slate-400">
                                  ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setResumeFile(null)
                                    if (fileInputRef.current) fileInputRef.current.value = ''
                                  }}
                                  className="text-slate-400 hover:text-rose-400"
                                  aria-label="Remove resume"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">No file selected</span>
                            )}
                          </div>
                          {resumeError && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {resumeError}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="career-cover-letter"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                          >
                            Cover Letter *
                          </label>
                          <textarea
                            id="career-cover-letter"
                            rows={4}
                            className="field resize-none"
                            placeholder="Briefly highlight your relevant construction/engineering experience, key projects, and notice period..."
                            {...register('coverLetter', {
                              required: 'Cover letter is required',
                              minLength: {
                                value: 20,
                                message: 'Please provide at least 20 characters',
                              },
                            })}
                          />
                          {errors.coverLetter && (
                            <p className="mt-1.5 text-sm text-rose-400" role="alert">
                              {errors.coverLetter.message}
                            </p>
                          )}
                        </div>

                        <div className="pt-2">
                          <Button type="submit" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                            <ArrowUpRight size={16} />
                          </Button>
                        </div>

                        {submitStatus.message && (
                          <div
                            role="status"
                            className={cn(
                              'flex items-start gap-2.5 rounded-sm border p-4 text-sm',
                              submitStatus.type === 'success'
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                            )}
                          >
                            {submitStatus.type === 'success' ? (
                              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                            ) : (
                              <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            )}
                            <span>{submitStatus.message}</span>
                          </div>
                        )}
                    </form>
                  </div>
                </div>
              </Container>
            </section>

            {/* Job Details Modal */}
            {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/85 p-4 backdrop-blur-sm">
          <div className="my-10 w-full max-w-2xl rounded-sm border border-white/15 bg-navy-light p-6 shadow-premium md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="inline-block rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {selectedJob.department} · {selectedJob.employmentType || selectedJob.type}
                </span>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
                  {selectedJob.title}
                </h2>
                <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.14em] text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} className="text-accent" /> {selectedJob.location}
                  </span>
                  {selectedJob.experience && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-accent" /> {selectedJob.experience}
                    </span>
                  )}
                  {selectedJob.salaryRange && (
                    <span className="inline-flex items-center gap-1.5">
                      <IndianRupee size={13} className="text-accent" /> {selectedJob.salaryRange}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="rounded-sm border border-white/10 p-2 text-slate-400 hover:text-white"
                aria-label="Close job details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-sm text-slate-300">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Role Overview
                </h3>
                <p className="mt-2 leading-relaxed text-slate-300">{selectedJob.description}</p>
              </div>

              {selectedJob.requirements?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Requirements
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {selectedJob.requirements.map((req) => (
                      <li key={req} className="flex gap-2.5 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.responsibilities?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Key Responsibilities
                  </h3>
                  <ul className="mt-2.5 space-y-2">
                    {selectedJob.responsibilities.map((resp) => (
                      <li key={resp} className="flex gap-2.5 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-white/10 pt-5">
              <Button type="button" variant="secondary" onClick={() => setSelectedJob(null)}>
                Close
              </Button>
              <Button type="button" onClick={() => handleApplyClick(selectedJob)}>
                Apply Now <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
    </div >
      )
}
    </>
  )
}

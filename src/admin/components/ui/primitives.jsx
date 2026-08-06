import { cn } from '../../../utils'

export function AdminCard({ children, className }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/8 bg-navy-light/50 p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

export function AdminPageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-slate-400">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function AdminBadge({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-white/10 text-slate-200',
    success: 'bg-emerald-500/15 text-emerald-300',
    warning: 'bg-amber-500/15 text-amber-300',
    danger: 'bg-rose-500/15 text-rose-300',
    info: 'bg-accent/15 text-accent',
    muted: 'bg-white/5 text-slate-400',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
        tones[tone] || tones.default
      )}
    >
      {children}
    </span>
  )
}

export function Field({ label, error, hint, children, className }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && (
        <p className="text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export const inputClass =
  'w-full rounded-lg border border-white/10 bg-navy/60 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent/50 focus:ring-2 focus:ring-accent/20'

export const selectClass = inputClass
export const textareaClass = `${inputClass} min-h-[110px] resize-y`

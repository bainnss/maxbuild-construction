import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { fadeUp } from '../../animations/variants'
import { cn } from '../../utils'

function isCompletedStatus(status = '') {
  return status.toLowerCase().includes('complet')
}

export default function ProjectCard({ project, index = 0, variant = 'portfolio' }) {
  const prefersReducedMotion = useReducedMotion()
  const isFeatured = variant === 'featured'
  const completed = isCompletedStatus(project.status)
  const indexLabel = String(index + 1).padStart(2, '0')
  const metaItems = [project.completionDate, project.area].filter(Boolean)

  return (
    <motion.article
      variants={prefersReducedMotion ? undefined : fadeUp}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: prefersReducedMotion ? 0 : Math.min(index, 5) * 0.07 }}
      className="group h-full"
      data-cursor="hover"
    >
      <Link
        to={`/projects/${project.slug}`}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-navy-light/45',
          'transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-premium',
          '[.light_&]:border-slate-200/90 [.light_&]:bg-white [.light_&]:shadow-sm [.light_&]:hover:border-accent-deep/50'
        )}
      >
        {/* Architectural Image Frame */}
        <div
          className={cn(
            'img-zoom relative w-full overflow-hidden bg-navy',
            isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'
          )}
        >
          <ImageWithSkeleton
            src={project.image}
            alt={project.name}
            className="absolute inset-0 h-full w-full"
          />

          {/* Subtle architectural vignette preserving image clarity */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-navy/45 opacity-80 transition-opacity duration-500 group-hover:opacity-65"
            aria-hidden="true"
          />

          {/* Top Bar: Category & Status */}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-navy/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100 backdrop-blur-md">
              {isFeatured && (
                <span className="text-accent tabular-nums">{indexLabel}</span>
              )}
              {isFeatured && <span className="h-2.5 w-px bg-white/25" aria-hidden="true" />}
              <span>{project.category}</span>
            </span>

            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/15 bg-navy/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    completed ? 'bg-emerald-400' : 'bg-accent'
                  )}
                  aria-hidden="true"
                />
                {project.status}
              </span>
            )}
          </div>
        </div>

        {/* Architectural Editorial Body */}
        <div
          className={cn(
            'flex flex-1 flex-col justify-between',
            isFeatured ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
          )}
        >
          <div>
            {project.location && (
              <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium tracking-wide text-slate-300 [.light_&]:text-slate-600">
                <MapPin size={13} className="shrink-0 text-accent [.light_&]:text-accent-deep" />
                <span className="truncate">{project.location}</span>
              </div>
            )}

            <h3
              className={cn(
                'font-display font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-accent',
                '[.light_&]:text-slate-900 [.light_&]:group-hover:text-accent-deep',
                isFeatured ? 'text-2xl leading-tight sm:text-[1.65rem]' : 'text-xl leading-snug'
              )}
            >
              {project.name}
            </h3>

            {isFeatured && project.shortDescription && (
              <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-400 [.light_&]:text-slate-600">
                {project.shortDescription}
              </p>
            )}
          </div>

          {/* Metadata & Navigation Bar */}
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4 [.light_&]:border-slate-200">
            <div className="min-w-0">
              {metaItems.length > 0 ? (
                <p className="truncate text-xs font-medium uppercase tracking-[0.14em] text-slate-400 tabular-nums [.light_&]:text-slate-500">
                  {metaItems.join(' · ')}
                </p>
              ) : (
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400 [.light_&]:text-slate-500">
                  {project.industry || project.category}
                </span>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              {isFeatured && (
                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 transition-colors duration-300 group-hover:text-accent sm:inline [.light_&]:text-slate-600 [.light_&]:group-hover:text-accent-deep">
                  View Project
                </span>
              )}
              <span
                className={cn(
                  'flex shrink-0 items-center justify-center rounded-sm border border-white/15 bg-white/5 text-white',
                  'transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-navy',
                  '[.light_&]:border-slate-300 [.light_&]:bg-slate-50 [.light_&]:text-slate-800 [.light_&]:group-hover:border-accent-deep [.light_&]:group-hover:bg-accent-deep [.light_&]:group-hover:text-white',
                  isFeatured ? 'h-10 w-10' : 'h-9 w-9'
                )}
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={isFeatured ? 18 : 16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Accent Indicator */}
        <span
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-deep to-primary-light transition-transform duration-500 ease-out group-hover:scale-x-100"
          aria-hidden="true"
        />
      </Link>
    </motion.article>
  )
}

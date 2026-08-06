import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { IMAGES } from '../../constants/images'
import { cn } from '../../utils'

export default function CTABanner({
  title = 'Ready to Build Something Extraordinary?',
  description = 'Partner with MaxBuild for precision engineering, disciplined delivery, and architecture that endures.',
  primaryLabel = 'Start a Project',
  primaryTo = '/contact',
  secondaryLabel = 'View Projects',
  secondaryTo = '/projects',
  className,
}) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-0">
        <img src={IMAGES.cta} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-navy/60" />
      </div>
      <Container className="relative section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Let&apos;s Collaborate
          </p>
          <h2 className="font-display text-3xl font-semibold text-white text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300 leading-relaxed">{description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to={primaryTo} size="lg">
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            Prefer email?{' '}
            <Link to="/contact" className="link-underline text-accent">
              Reach our project desk
            </Link>
          </p>
        </div>
      </Container>
    </section>
  )
}

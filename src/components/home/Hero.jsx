import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Counter from '../ui/Counter'
import { IMAGES } from '../../constants/images'
import { statistics } from '../../data/content'
import { blurReveal, fadeUp, staggerContainer } from '../../animations/variants'
import { useSiteSettings } from '../../hooks/useCmsContent'

export default function Hero() {
  const company = useSiteSettings()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const heroSrc = company.heroImageUrl || IMAGES.hero

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-end overflow-hidden pt-24 pb-10 sm:pb-14 md:pt-0 md:pb-24"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroSrc}
          alt={`${company.name} site at dusk`}
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/25" />
        <div className="absolute inset-0 blueprint-grid opacity-25" />
      </motion.div>

      {/* Decorative accents — desktop only so they don't collide with CTAs/stats on mobile */}
      <div className="pointer-events-none absolute top-1/4 right-[8%] hidden h-40 w-40 rounded-full border border-accent/25 brand-orb opacity-40 md:block" />
      <div className="pointer-events-none absolute top-[35%] right-[12%] hidden h-24 w-24 rounded-full border border-accent/20 md:block" />
      <div className="pointer-events-none absolute bottom-[22%] left-[6%] hidden h-px w-32 brand-swoosh opacity-70 md:block" />

      <Container className="relative z-10 w-full">
        <motion.div style={{ opacity }} variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent sm:mb-5 sm:text-xs sm:tracking-[0.32em]"
          >
            Est. {company.founded} · Infrastructure Excellence
          </motion.p>
          <motion.h1
            variants={blurReveal}
            className="max-w-4xl font-display text-[1.85rem] font-semibold leading-[1.12] text-white text-balance sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl"
          >
            {company.tagline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base md:text-lg"
          >
            {company.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-7 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <Button to="/projects" size="lg" className="w-full sm:w-auto">
              Explore Projects
            </Button>
            <Button to="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/10 pt-7 sm:mt-14 sm:gap-8 sm:pt-10 md:mt-16 md:grid-cols-4"
          >
            {statistics.map((stat) => (
              <Counter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                className="min-w-0 text-left"
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <a
        href="#about"
        className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 transition hover:text-white sm:bottom-6 md:flex"
        aria-label="Scroll to about section"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </a>
    </section>
  )
}

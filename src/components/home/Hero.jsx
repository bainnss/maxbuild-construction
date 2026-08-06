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
    <section ref={ref} className="relative flex min-h-svh items-end overflow-hidden pb-16 md:pb-24">
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

      <div className="pointer-events-none absolute top-1/4 right-[8%] h-40 w-40 rounded-full border border-accent/25 brand-orb opacity-40" />
      <div className="pointer-events-none absolute top-[35%] right-[12%] h-24 w-24 rounded-full border border-accent/20" />
      <div className="pointer-events-none absolute bottom-[22%] left-[6%] h-px w-32 brand-swoosh opacity-70" />

      <Container className="relative z-10 w-full">
        <motion.div style={{ opacity }} variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p
            variants={fadeUp}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-accent"
          >
            Est. {company.founded} · Infrastructure Excellence
          </motion.p>
          <motion.h1
            variants={blurReveal}
            className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {company.tagline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            {company.description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button to="/projects" size="lg">
              Explore Projects
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Contact Us
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-10 sm:gap-8 md:grid-cols-4"
          >
            {statistics.map((stat) => (
              <Counter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                className="text-left"
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 transition hover:text-white"
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

import { motion } from 'framer-motion'
import Container from '../ui/Container'
import { cn } from '../../utils'
import { blurReveal, fadeUp, staggerContainer } from '../../animations/variants'

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  className,
  children,
}) {
  return (
    <section className={cn('relative min-h-[56vh] overflow-hidden pt-28 md:min-h-[62vh] md:pt-32', className)}>
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30" />
        </div>
      )}
      {!image && <div className="absolute inset-0 blueprint-grid opacity-40" />}
      <Container className="relative flex min-h-[44vh] flex-col justify-end pb-16 md:pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={blurReveal}
            className="font-display text-4xl font-semibold text-white text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-slate-300 leading-relaxed">
              {description}
            </motion.p>
          )}
          {children}
        </motion.div>
      </Container>
    </section>
  )
}

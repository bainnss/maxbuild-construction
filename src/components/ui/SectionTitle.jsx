import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils'
import { fadeUp, staggerContainer } from '../../animations/variants'

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        className
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-display text-3xl font-semibold leading-tight text-balance text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

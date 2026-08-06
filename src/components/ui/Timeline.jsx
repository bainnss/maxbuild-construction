import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils'

export default function Timeline({ items = [], className }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-primary via-primary-light/40 to-transparent md:left-1/2" />
      <div className="space-y-10 md:space-y-16">
        {items.map((item, i) => {
          const left = i % 2 === 0
          return (
            <motion.div
              key={item.year || item.id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={cn(
                'relative grid gap-6 md:grid-cols-2',
                left ? 'md:text-right' : ''
              )}
            >
              <div
                className={cn(
                  'absolute top-1 left-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-navy md:left-1/2',
                  'shadow-[0_0_0_4px_rgba(59,130,246,0.2)]'
                )}
              />
              <div className={cn('pl-12 md:pl-0', left ? 'md:pr-12' : 'md:col-start-2 md:pl-12')}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-light">
                  {item.year || item.title}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-400 leading-relaxed">{item.description}</p>
              </div>
              {left && <div className="hidden md:block" />}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils'

export default function Counter({
  value,
  suffix = '',
  prefix = '',
  label,
  className,
  duration = 2000,
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return undefined

    let frame
    const start = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) frame = requestAnimationFrame(animate)
      else setCount(value)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl font-semibold text-white md:text-5xl lg:text-6xl"
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </motion.p>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-400 md:text-sm">
        {label}
      </p>
    </div>
  )
}

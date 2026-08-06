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
    <div ref={ref} className={cn('min-w-0 text-center', className)}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </motion.p>
      <p className="mt-2 max-w-[12rem] text-[10px] leading-snug font-medium uppercase tracking-[0.14em] text-slate-400 sm:mt-3 sm:max-w-none sm:text-xs sm:tracking-[0.22em] md:text-sm">
        {label}
      </p>
    </div>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../utils'

const variants = {
  primary:
    'bg-accent-deep text-white hover:bg-accent shadow-[0_12px_40px_-12px_rgba(0,136,206,0.65)]',
  secondary:
    'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/25',
  outline:
    'bg-transparent text-white border border-accent/50 hover:border-accent hover:bg-accent/15',
  ghost: 'bg-transparent text-accent hover:text-white',
  light: 'bg-white text-brand-navy hover:bg-lavender',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm tracking-wide',
  lg: 'px-9 py-4 text-base tracking-wide',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className,
  magnetic = true,
  type = 'button',
  onClick,
  ...props
}) {
  const ref = useRef(null)

  const handleRipple = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sizePx = Math.max(rect.width, rect.height)
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.width = ripple.style.height = `${sizePx}px`
    ripple.style.left = `${e.clientX - rect.left - sizePx / 2}px`
    ripple.style.top = `${e.clientY - rect.top - sizePx / 2}px`
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.setProperty('--mx', `${x * 0.15}px`)
    ref.current.style.setProperty('--my', `${y * 0.15}px`)
    ref.current.style.setProperty('--gx', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--gy', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--mx', '0px')
    ref.current.style.setProperty('--my', '0px')
  }

  const classes = cn(
    'btn-ripple relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-sm font-body font-semibold uppercase transition-all duration-300',
    'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300',
    'before:bg-[radial-gradient(circle_at_var(--gx,_50%)_var(--gy,_50%),rgba(0,174,239,0.4),transparent_55%)]',
    'hover:before:opacity-100',
    'translate-x-[var(--mx,0)] translate-y-[var(--my,0)]',
    variants[variant],
    sizes[size],
    className
  )

  const shared = {
    ref,
    className: classes,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: (e) => {
      handleRipple(e)
      onClick?.(e)
    },
    ...props,
  }

  if (to) {
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link to={to} {...shared}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <a href={href} {...shared}>
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button type={type} whileTap={{ scale: 0.98 }} {...shared}>
      {children}
    </motion.button>
  )
}

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useScroll'

export default function CustomCursor() {
  const isDesktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)')
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 420, damping: 28 })
  const springY = useSpring(y, { stiffness: 420, damping: 28 })

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove('cursor-active')
      return undefined
    }

    document.body.classList.add('cursor-active')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e) => {
      const target = e.target.closest('a, button, [data-cursor="hover"]')
      setHovering(Boolean(target))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      document.body.classList.remove('cursor-active')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [isDesktop, x, y])

  if (!isDesktop) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="rounded-full border border-white bg-white/20"
          animate={{
            width: hovering ? 48 : 12,
            height: hovering ? 48 : 12,
            opacity: 1,
          }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>
    </>
  )
}

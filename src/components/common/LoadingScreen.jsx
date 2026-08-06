import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden={!visible}
        >
          <div className="absolute inset-0 brand-orb opacity-30" />
          <div className="absolute inset-0 blueprint-grid opacity-40" />
          <div className="relative flex w-full max-w-lg flex-col items-center gap-8 px-8 sm:px-10">
            <motion.div
              className="flex w-full justify-center"
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo type="brand" variant="hero" className="object-center" />
            </motion.div>
            <motion.div
              className="h-px w-32 overflow-hidden rounded-full bg-lavender sm:w-44"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-brand-navy via-accent to-lavender"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ delay: 0.45, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

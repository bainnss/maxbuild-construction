import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { IMAGES } from '../../constants/images'
import { useSiteSettings } from '../../hooks/useCmsContent'

export default function ParallaxBanner() {
  const company = useSiteSettings()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative h-[50vh] min-h-[360px] overflow-hidden md:h-[60vh]">
      <motion.div style={{ y }} className="absolute inset-[-20%] ">
        <img src={IMAGES.parallax} alt="" className="h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-navy/65" />
      <Container className="relative flex h-full items-center">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Construction Philosophy</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white text-balance md:text-5xl">
            Build once. Build right. Build for generations.
          </h2>
          <p className="mt-5 text-slate-300">{company.description}</p>
          <div className="mt-8">
            <Button to="/about" variant="secondary">
              Our Philosophy
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

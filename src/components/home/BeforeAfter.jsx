import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IMAGES } from '../../constants/images'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'

export default function BeforeAfter() {
  const containerRef = useRef(null)
  const [pos, setPos] = useState(50)

  const update = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(98, Math.max(2, next)))
  }

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <Container className="relative">
        <SectionTitle
          eyebrow="Transformation"
          title="Before & After Showcase"
          description="Drag to reveal the difference precision construction makes — from shell to signature landmark."
          align="center"
        />
        <div
          ref={containerRef}
          className="relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-sm border border-white/10 select-none"
          onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
          onClick={(e) => update(e.clientX)}
          role="img"
          aria-label="Before and after comparison slider"
        >
          <img
            src={IMAGES.beforeAfter.after}
            alt="After renovation"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img
              src={IMAGES.beforeAfter.before}
              alt="Before renovation"
              className="absolute inset-0 h-full max-w-none object-cover"
              style={{ width: containerRef.current?.offsetWidth || '100%' }}
              draggable={false}
            />
          </div>
          <div
            className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ left: `${pos}%` }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-navy/80 text-xs font-semibold tracking-widest text-white backdrop-blur-md"
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => update(info.point.x)}
            >
              ↔
            </motion.div>
          </div>
          <span className="absolute top-4 left-4 rounded-sm bg-navy/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Before
          </span>
          <span className="absolute top-4 right-4 rounded-sm bg-primary/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            After
          </span>
        </div>
      </Container>
    </section>
  )
}

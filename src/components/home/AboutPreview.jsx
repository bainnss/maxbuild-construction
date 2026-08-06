import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { IMAGES } from '../../constants/images'
import { fadeLeft, fadeRight } from '../../animations/variants'

export default function AboutPreview() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" className="section-pad relative scroll-mt-24">
      <Container>
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative lg:col-span-6"
          >
            <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm">
              <ImageWithSkeleton src={IMAGES.about} alt="Modern MaxBuild commercial tower" className="h-full w-full" />
            </div>
            <motion.div
              style={{ y }}
              className="absolute -right-4 -bottom-8 hidden w-48 overflow-hidden rounded-sm border border-white/10 shadow-premium md:block lg:-right-8"
            >
              <ImageWithSkeleton src={IMAGES.aboutSecondary} alt="Construction craftsmanship" className="aspect-[3/4]" />
            </motion.div>
            <div className="absolute top-6 left-6 glass rounded-sm px-4 py-3">
              <p className="font-display text-3xl font-semibold text-white">28+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Years Building</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-6"
          >
            <SectionTitle
              eyebrow="About MaxBuild"
              title="Precision infrastructure for landmarks that define skylines."
              description="We are a multi-disciplinary construction firm trusted by developers, institutions, and civic agencies to deliver complex projects with clarity, craft, and absolute accountability."
              className="mb-8"
            />
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                From concept through commissioning, MaxBuild unites architecture, engineering, and field excellence under one disciplined delivery model.
              </p>
              <p>
                Our teams build with the composure of a luxury atelier and the rigor of heavy civil — because world-class outcomes demand both.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about">
                Our Story <ArrowUpRight size={16} />
              </Button>
              <Link to="/team" className="link-underline self-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                Meet Leadership
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

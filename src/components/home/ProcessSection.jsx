import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { processSteps } from '../../data/content'
import { fadeUp, staggerContainer } from '../../animations/variants'

export default function ProcessSection() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Process"
          title="From first conversation to final handover."
          description="A transparent five-stage delivery model designed for clarity, speed, and quality."
          align="center"
        />
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-5"
        >
          {processSteps.map((step, i) => (
            <motion.li
              key={step.id}
              variants={fadeUp}
              className="relative rounded-sm border border-white/8 bg-navy-light/30 p-6"
            >
              <span className="font-display text-4xl font-semibold text-primary/50">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.description}</p>
              {i < processSteps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-primary-light/40 md:block" />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  )
}

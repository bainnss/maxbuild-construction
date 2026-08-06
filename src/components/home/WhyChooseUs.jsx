import { Cpu, Shield, Clock, Leaf, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { whyChooseUs } from '../../data/content'
import { fadeUp, staggerContainer } from '../../animations/variants'

const ICONS = { Cpu, Shield, Clock, Leaf, Star }

export default function WhyChooseUs() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Why MaxBuild"
          title="The standard behind every landmark."
          description="Four pillars that define how we plan, build, and stand behind every project."
          align="center"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {whyChooseUs.map((item) => {
            const Icon = ICONS[item.icon] || Star
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="group rounded-sm border border-white/8 bg-navy-light/40 p-7 transition duration-500 hover:-translate-y-1 hover:border-primary-light/30 hover:shadow-premium"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm border border-white/10 bg-primary/20 text-accent transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

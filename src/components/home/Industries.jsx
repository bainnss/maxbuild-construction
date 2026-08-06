import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { industries } from '../../data/content'
import { fadeUp, staggerContainer } from '../../animations/variants'

export default function Industries() {
  return (
    <section className="section-pad bg-surface/50">
      <Container>
        <SectionTitle
          eyebrow="Industries"
          title="Sectors we serve with depth."
          description="Specialized delivery teams for the environments that demand the most."
          align="center"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6"
        >
          {industries.map((item, i) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              data-cursor="hover"
            >
              <ImageWithSkeleton src={item.image} alt={item.name} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-navy/50 transition duration-500 group-hover:bg-navy/30" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="font-display text-lg font-semibold text-white">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { news } from '../../data/content'
import { formatDate } from '../../utils'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

export default function NewsPreview() {
  return (
    <section id="news" className="section-pad scroll-mt-24">
      <Container>
        <SectionTitle
          eyebrow="Insights"
          title="Latest from MaxBuild."
          description="Project milestones, sustainability initiatives, and industry leadership."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-sm border border-white/8 bg-navy-light/30 transition hover:-translate-y-1 hover:border-primary-light/25"
            >
              <div className="img-zoom relative aspect-[16/10]">
                <ImageWithSkeleton src={item.image} alt={item.title} className="absolute inset-0 h-full w-full" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span className="text-primary-light">{item.category}</span>
                  <span>·</span>
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-white group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.excerpt}</p>
                <Link
                  to="/about"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent"
                >
                  Read More <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import Button from '../../components/ui/Button'
import { ImageWithSkeleton } from '../../components/ui/Skeleton'
import { careers, benefits } from '../../data/content'
import { IMAGES } from '../../constants/images'
import { MapPin, Briefcase, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers"
        description="Join MaxBuild Infrastructure. Explore open positions, benefits, and a culture built on craft and excellence."
        path="/careers"
        image={IMAGES.workers}
      />
      <PageHero
        eyebrow="Careers"
        title="Build your career on landmarks."
        description="Join a team where craftsmanship, safety, and ambition define every day on site and in studio."
        image={IMAGES.workers}
      />

      <section className="section-pad">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Culture"
                title="A workplace worthy of the work."
                description="We hire people who care about precision — then give them the tools, mentorship, and projects to grow into industry leaders."
              />
            </div>
            <div className="img-zoom relative aspect-[16/11] overflow-hidden rounded-sm">
              <ImageWithSkeleton src={IMAGES.culture} alt="MaxBuild team collaboration" className="h-full w-full" />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/40">
        <Container>
          <SectionTitle eyebrow="Benefits" title="Support that matches the ambition." align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-sm border border-white/8 bg-navy-light/40 p-7"
              >
                <h3 className="font-display text-xl font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionTitle
            eyebrow="Open Roles"
            title="Current opportunities."
            description="Don't see the right role? Send your portfolio — we're always looking for exceptional talent."
          />
          <div className="divide-y divide-white/10 border-y border-white/10">
            {careers.map((job) => (
              <article
                key={job.id}
                className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">{job.title}</h3>
                  <p className="mt-2 max-w-2xl text-slate-400">{job.description}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={12} className="text-accent" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase size={12} className="text-accent" /> {job.type} · {job.department}
                    </span>
                  </div>
                </div>
                <Button to="/contact" variant="secondary">
                  Apply <ArrowUpRight size={16} />
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

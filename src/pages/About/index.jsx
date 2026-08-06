import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import Timeline from '../../components/ui/Timeline'
import Counter from '../../components/ui/Counter'
import TeamCard from '../../components/team/TeamCard'
import { ImageWithSkeleton } from '../../components/ui/Skeleton'
import { IMAGES } from '../../constants/images'
import { companyTimeline, statistics, values } from '../../data/content'
import { useFeaturedTeam } from '../../hooks/useCmsContent'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

export default function About() {
  const featuredTeam = useFeaturedTeam()

  return (
    <>
      <SEO
        title="About Us"
        description="Discover MaxBuild Infrastructure — our story, mission, values, and the leadership driving landmark projects worldwide."
        path="/about"
        image={IMAGES.about}
      />
      <PageHero
        eyebrow="About Us"
        title="Building with purpose since 1998."
        description="A construction company forged by craftsmanship, elevated by engineering, and defined by the landmarks we leave behind."
        image={IMAGES.architecture}
      />

      <section className="section-pad">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Our Story"
                title="From a San Francisco workshop to a national construction leader."
                description="What began as a precision-focused general contractor has grown into a multi-disciplinary firm delivering residential, commercial, industrial, and infrastructure projects across the United States."
              />
              <p className="text-slate-400 leading-relaxed">
                Today, MaxBuild combines design intelligence, field excellence, and digital project controls to deliver outcomes that developers, institutions, and cities trust for decades.
              </p>
            </div>
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-sm">
              <ImageWithSkeleton src={IMAGES.office} alt="MaxBuild headquarters" className="h-full w-full" />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/50">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: 'Mission', text: 'Deliver landmark construction with absolute integrity, technical excellence, and client partnership.' },
              { title: 'Vision', text: 'Set the global standard for how ambitious buildings and infrastructure are conceived and built.' },
              { title: 'Philosophy', text: 'Build once. Build right. Build for generations — with safety, craft, and accountability.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-sm border border-white/8 bg-navy-light/40 p-8"
              >
                <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionTitle
            eyebrow="Values"
            title="Principles that guide every decision."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border-t border-primary-light/40 pt-6">
                <h3 className="font-display text-xl font-semibold text-white">{v.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/40">
        <Container>
          <SectionTitle
            eyebrow="Timeline"
            title="Milestones that shaped MaxBuild."
            align="center"
          />
          <Timeline items={companyTimeline} />
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {statistics.map((stat) => (
              <Counter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/40">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="img-zoom relative aspect-[16/11] overflow-hidden rounded-sm">
              <ImageWithSkeleton src={IMAGES.culture} alt="MaxBuild team culture" className="h-full w-full" />
            </div>
            <div>
              <SectionTitle
                eyebrow="Culture"
                title="A company of builders, thinkers, and partners."
                description="We invest in people who care deeply about craft — from apprentices on the deck to principals in the boardroom."
              />
              <ul className="space-y-3 text-slate-300">
                {['Safety-first field culture', 'Continuous technical education', 'Inclusive leadership pathways', 'Pride in civic contribution'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <SectionTitle eyebrow="Leadership" title="Meet the people leading MaxBuild." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTeam.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

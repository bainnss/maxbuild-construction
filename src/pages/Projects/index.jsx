import { useMemo, useState } from 'react'
import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import ProjectCard from '../../components/projects/ProjectCard'
import { usePublicProjects } from '../../hooks/useCmsContent'
import { IMAGES } from '../../constants/images'
import { cn } from '../../utils'

export default function Projects() {
  const projects = usePublicProjects()
  const [active, setActive] = useState('All')
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category))],
    [projects]
  )

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  )

  return (
    <>
      <SEO
        title="Projects"
        description="Browse MaxBuild Infrastructure's portfolio of landmark residential, commercial, industrial, and infrastructure projects."
        path="/projects"
        image={IMAGES.about}
      />
      <PageHero
        eyebrow="Projects"
        title="A portfolio of landmarks."
        description="Explore completed and active projects across sectors — each delivered with precision and pride."
        image={IMAGES.heroAlt}
      />
      <section className="section-pad">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow="Portfolio" title="Selected works." className="mb-0" />
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active === cat}
                  onClick={() => setActive(cat)}
                  className={cn(
                    'rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
                    active === cat
                      ? 'border-accent-deep bg-accent-deep text-white'
                      : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

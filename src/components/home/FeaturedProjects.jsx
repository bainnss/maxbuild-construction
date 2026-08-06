import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import ProjectCard from '../projects/ProjectCard'
import { useFeaturedProjects } from '../../hooks/useCmsContent'

export default function FeaturedProjects() {
  const projects = useFeaturedProjects().slice(0, 4)

  return (
    <section className="section-pad bg-surface/40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Portfolio"
            title="Featured projects that set the bar."
            description="A selection of landmarks across commercial, residential, industrial, and infrastructure."
            className="mb-0 max-w-2xl"
          />
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

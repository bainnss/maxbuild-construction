import { Link, useParams } from 'react-router-dom'
import { MapPin, Ruler, Calendar, Building2, User } from 'lucide-react'
import SEO from '../../components/common/SEO'
import Container from '../../components/ui/Container'
import Gallery from '../../components/ui/Gallery'
import Button from '../../components/ui/Button'
import ProjectCard from '../../components/projects/ProjectCard'
import SectionTitle from '../../components/ui/SectionTitle'
import { usePublicProject, useRelatedProjects } from '../../hooks/useCmsContent'
import { ImageWithSkeleton } from '../../components/ui/Skeleton'

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = usePublicProject(slug)
  const related = useRelatedProjects(slug)

  if (!project) {
    return (
      <section className="section-pad pt-40">
        <Container className="text-center">
          <h1 className="font-display text-4xl font-semibold text-white">Project not found</h1>
          <p className="mt-4 text-slate-400">The project you&apos;re looking for doesn&apos;t exist.</p>
          <div className="mt-8">
            <Button to="/projects">Back to Projects</Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={project.name}
        description={project.shortDescription}
        path={`/projects/${project.slug}`}
        image={project.image}
      />

      <section className="relative min-h-[70vh] overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        </div>
        <Container className="relative flex min-h-[60vh] flex-col justify-end pb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {project.category} · {project.status}
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-slate-300">
            <MapPin size={16} className="text-accent" /> {project.location}
          </p>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionTitle eyebrow="Overview" title="Project narrative." className="mb-8" />
              <p className="text-lg leading-relaxed text-slate-300">{project.description}</p>

              <div className="mt-14">
                <h3 className="font-display text-2xl font-semibold text-white">Challenges</h3>
                <ul className="mt-5 space-y-3">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <h3 className="font-display text-2xl font-semibold text-white">Solutions</h3>
                <ul className="mt-5 space-y-3">
                  {project.solutions.map((s) => (
                    <li key={s} className="flex gap-3 text-slate-400">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">Materials</h3>
                  <ul className="mt-4 space-y-2 text-slate-400">
                    {project.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">Technologies</h3>
                  <ul className="mt-4 space-y-2 text-slate-400">
                    {project.technologies.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-display text-2xl font-semibold text-white">Highlights</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {project.highlights.map((h) => (
                    <div key={h} className="rounded-sm border border-white/8 bg-navy-light/40 p-5 text-sm text-slate-300">
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <h3 className="mb-8 font-display text-2xl font-semibold text-white">Gallery</h3>
                <Gallery images={project.gallery} />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-sm border border-white/10 bg-navy-light/60 p-6 backdrop-blur-md">
                  <h2 className="font-display text-xl font-semibold text-white">Project Details</h2>
                  <dl className="mt-6 space-y-5 text-sm">
                    <Meta icon={User} label="Client" value={project.clientName || project.client} />
                    <Meta icon={Building2} label="Type" value={project.constructionType} />
                    <Meta icon={Ruler} label="Area" value={project.area} />
                    <Meta icon={Calendar} label="Timeline" value={project.timeline} />
                    <Meta icon={Calendar} label="Completed" value={project.completionDate} />
                    <Meta icon={MapPin} label="Location" value={project.location} />
                  </dl>
                  <div className="mt-8">
                    <Button to="/contact" className="w-full">
                      Start Similar Project
                    </Button>
                  </div>
                </div>
                <div className="img-zoom overflow-hidden rounded-sm border border-white/8">
                  <ImageWithSkeleton src={project.image} alt={project.name} className="aspect-[4/3]" />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/40">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <SectionTitle eyebrow="More Work" title="Related projects." className="mb-0" />
            <Link to="/projects" className="link-underline text-sm uppercase tracking-[0.16em] text-accent">
              All Projects
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <Icon size={16} className="mt-0.5 text-accent" />
      <div>
        <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</dt>
        <dd className="mt-1 text-slate-200">{value}</dd>
      </div>
    </div>
  )
}

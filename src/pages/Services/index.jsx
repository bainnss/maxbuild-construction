import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import ServiceCard from '../../components/services/ServiceCard'
import { usePublicServices } from '../../hooks/useCmsContent'
import { IMAGES } from '../../constants/images'

export default function Services() {
  const services = usePublicServices()

  return (
    <>
      <SEO
        title="Services"
        description="Explore MaxBuild Infrastructure services — residential, commercial, industrial, infrastructure, design-build, and more."
        path="/services"
        image={IMAGES.steel}
      />
      <PageHero
        eyebrow="Services"
        title="Full-spectrum construction expertise."
        description="Ten integrated capabilities designed to take ambitious projects from vision to enduring reality."
        image={IMAGES.machinery}
      />
      <section className="section-pad">
        <Container>
          <SectionTitle
            eyebrow="What We Deliver"
            title="Capabilities for every scale of ambition."
            description="Whether you need a precision fit-out or a multi-year infrastructure program, MaxBuild brings the right team and method."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

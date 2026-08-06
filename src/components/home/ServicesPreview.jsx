import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import ServiceCard from '../services/ServiceCard'
import { usePublicServices } from '../../hooks/useCmsContent'

export default function ServicesPreview() {
  const services = usePublicServices()

  return (
    <section className="section-pad relative bg-surface/60">
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <Container className="relative">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Capabilities"
            title="Services engineered for ambitious builds."
            description="End-to-end construction expertise spanning residential, commercial, industrial, and infrastructure."
            className="mb-0 max-w-2xl"
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent transition hover:gap-3"
          >
            All Services <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

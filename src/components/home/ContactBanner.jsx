import { Mail, MapPin, Phone } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { useSiteSettings } from '../../hooks/useCmsContent'

export default function ContactBanner() {
  const company = useSiteSettings()

  return (
    <section className="border-y border-white/8 bg-navy-light/40">
      <Container className="py-14 md:py-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-light">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
              Let&apos;s discuss your next landmark.
            </h2>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-slate-300">
            <a href={`tel:${company.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-white">
              <Phone size={16} className="text-accent" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 hover:text-white">
              <Mail size={16} className="text-accent" /> {company.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-accent" /> {company.address.city}, {company.address.state}
            </span>
          </div>
          <Button to="/contact">Contact Desk</Button>
        </div>
      </Container>
    </section>
  )
}

import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import ContactForm from '../../components/ui/ContactForm'
import Accordion from '../../components/ui/Accordion'
import { faqs } from '../../data/content'
import { IMAGES } from '../../constants/images'
import { useSiteSettings } from '../../hooks/useCmsContent'

export default function Contact() {
  const company = useSiteSettings()

  return (
    <>
      <SEO
        title="Contact"
        description={`Contact ${company.name}. Reach our project desk for consultations, proposals, and partnership inquiries.`}
        path="/contact"
        image={IMAGES.contact}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's start the conversation."
        description={company.contactNote || 'Share your vision. Our project desk responds within one business day.'}
        image={IMAGES.contact}
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Project Desk"
                title="How to reach us."
                className="mb-8"
              />
              <div className="space-y-6">
                <Info
                  icon={MapPin}
                  title="Headquarters"
                  lines={[
                    company.address.street,
                    `${company.address.city}, ${company.address.state} ${company.address.zip}`,
                  ]}
                />
                <Info
                  icon={Phone}
                  title="Phone"
                  lines={[company.phone]}
                  href={`tel:${company.phoneRaw}`}
                />
                <Info
                  icon={Mail}
                  title="Email"
                  lines={[company.email]}
                  href={`mailto:${company.email}`}
                />
                <Info
                  icon={Clock}
                  title="Working Hours"
                  lines={[company.hours.weekdays, company.hours.saturday, company.hours.sunday]}
                />
              </div>
            </div>
            <div className="rounded-sm border border-white/10 bg-navy-light/40 p-6 md:p-8 lg:col-span-7">
              <h2 className="font-display text-2xl font-semibold text-white">Send a message</h2>
              <p className="mt-2 mb-8 text-slate-400">Tell us about scope, timeline, and location.</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="overflow-hidden rounded-sm border border-white/10 bg-navy-light/50">
            {company.mapEmbedUrl ? (
              <iframe
                title={company.mapLabel || 'Office map'}
                src={company.mapEmbedUrl}
                className="aspect-[21/9] min-h-[280px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-[21/9] min-h-[280px] items-center justify-center blueprint-grid">
                <div className="text-center">
                  <MapPin className="mx-auto text-accent" size={28} />
                  <p className="mt-4 font-display text-xl text-white">
                    {company.mapLabel || 'Headquarters'}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{company.address.full}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Add a Maps embed URL in Admin → Settings
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface/40">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Before you write." />
          <Accordion items={faqs.slice(0, 4)} />
        </Container>
      </section>
    </>
  )
}

function Info({ icon: Icon, title, lines, href }) {
  const content = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-white/10 text-accent">
        <Icon size={18} />
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h3>
        <div className="mt-2 space-y-1 text-slate-200">
          {lines.filter(Boolean).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </>
  )

  if (href) {
    return (
      <a href={href} className="flex gap-4 transition hover:text-accent">
        {content}
      </a>
    )
  }

  return <div className="flex gap-4">{content}</div>
}

import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Accordion from '../ui/Accordion'
import { faqs } from '../../data/content'

export default function FAQPreview() {
  return (
    <section className="section-pad bg-surface/40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle
              eyebrow="FAQ"
              title="Answers before you ask."
              description="Common questions about delivery models, timelines, and how we partner with clients."
              className="mb-6"
            />
            <Link
              to="/faq"
              className="link-underline text-sm font-semibold uppercase tracking-[0.16em] text-accent"
            >
              View all FAQs
            </Link>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faqs.slice(0, 5)} />
          </div>
        </div>
      </Container>
    </section>
  )
}

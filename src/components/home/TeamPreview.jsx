import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import TeamCard from '../team/TeamCard'
import { useFeaturedTeam } from '../../hooks/useCmsContent'

export default function TeamPreview() {
  const team = useFeaturedTeam()

  return (
    <section className="section-pad bg-surface/40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Leadership"
            title="The minds behind the landmarks."
            description="Seasoned leaders across design, engineering, operations, and client experience."
            className="mb-0 max-w-2xl"
          />
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent"
          >
            Full Team <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

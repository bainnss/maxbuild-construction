import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import TeamCard from '../../components/team/TeamCard'
import { usePublicTeam } from '../../hooks/useCmsContent'
import { IMAGES } from '../../constants/images'

export default function Team() {
  const team = usePublicTeam()

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the leadership and specialists behind MaxBuild Infrastructure's landmark projects."
        path="/team"
        image={IMAGES.culture}
      />
      <PageHero
        eyebrow="Our Team"
        title="Leaders who build with conviction."
        description="A multidisciplinary bench of executives, engineers, designers, and field leaders."
        image={IMAGES.culture}
      />
      <section className="section-pad">
        <Container>
          <SectionTitle
            eyebrow="People"
            title="The MaxBuild collective."
            description="Expertise spanning strategy, design, engineering, operations, safety, and client partnerships."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

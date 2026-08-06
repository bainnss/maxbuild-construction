import { useMemo, useState } from 'react'
import SEO from '../../components/common/SEO'
import PageHero from '../../components/layout/PageHero'
import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'
import Accordion from '../../components/ui/Accordion'
import { faqs } from '../../data/content'
import { Search } from 'lucide-react'
import { cn } from '../../utils'

const categories = ['All', ...new Set(faqs.map((f) => f.category))]

export default function FAQ() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCategory = category === 'All' || f.category === category
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about MaxBuild Infrastructure services, process, pricing, and partnerships."
        path="/faq"
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered clearly."
        description="Search our knowledge base or browse by category to learn how MaxBuild partners with clients."
      />
      <section className="section-pad">
        <Container>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Help Center"
              title="Find what you need."
              className="mb-0"
            />
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
              <label htmlFor="faq-search" className="sr-only">
                Search FAQs
              </label>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                className="field pl-11"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
                  category === cat
                    ? 'border-accent-deep bg-accent-deep text-white'
                    : 'border-white/10 text-slate-400 hover:text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <Accordion items={filtered} />
          ) : (
            <p className="py-16 text-center text-slate-400">No questions match your search.</p>
          )}
        </Container>
      </section>
    </>
  )
}

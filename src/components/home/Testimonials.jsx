import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../data/content'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Testimonials() {
  return (
    <section className="section-pad">
      <Container>
        <SectionTitle
          eyebrow="Testimonials"
          title="Trusted by leaders who build cities."
          description="Client partnerships defined by clarity, craftsmanship, and outcomes that endure."
          align="center"
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <article className="flex h-full flex-col rounded-sm border border-white/8 bg-navy-light/40 p-7 md:p-8">
                <div className="mb-5 flex gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="flex-1 text-lg leading-relaxed text-slate-200">
                  “{t.quote}”
                </blockquote>
                <div className="mt-8 flex items-center gap-4 border-t border-white/8 pt-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-slate-400">{t.role}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

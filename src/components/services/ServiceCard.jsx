import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  Building2,
  Factory,
  Landmark,
  Compass,
  Armchair,
  Hammer,
  Layers,
  ClipboardList,
  PenTool,
  ArrowRight,
} from 'lucide-react'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { fadeUp } from '../../animations/variants'

const ICONS = {
  Home,
  Building2,
  Factory,
  Landmark,
  Compass,
  Armchair,
  Hammer,
  Layers,
  ClipboardList,
  PenTool,
}

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICONS[service.icon] || Building2

  return (
    <motion.article
      id={service.slug}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.06 }}
      className="group scroll-mt-28"
      data-cursor="hover"
    >
      <div className="relative overflow-hidden rounded-sm border border-white/8 bg-navy-light/60 transition duration-500 hover:-translate-y-1 hover:border-primary-light/30 hover:shadow-premium">
        <div className="img-zoom relative aspect-[16/10]">
          <ImageWithSkeleton
            src={service.image}
            alt={service.title}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-navy/30 to-transparent" />
          <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 bg-navy/70 text-accent backdrop-blur-md">
            <Icon size={22} />
          </div>
        </div>
        <div className="p-6 md:p-7">
          <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
            {service.shortDescription}
          </p>
          <ul className="mt-5 space-y-2">
            {service.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="h-1 w-1 rounded-full bg-primary-light" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent transition group-hover:gap-3"
          >
            Discuss Project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

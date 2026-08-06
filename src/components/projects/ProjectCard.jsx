import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { fadeUp } from '../../animations/variants'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
      className="group relative"
      data-cursor="hover"
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm border border-white/8 bg-navy-light">
          <ImageWithSkeleton
            src={project.image}
            alt={project.name}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-90 transition duration-500 group-hover:opacity-95" />
          <div className="absolute inset-0 border border-transparent transition duration-500 group-hover:border-primary-light/40" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-sm bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {project.category}
            </span>
            <span className="rounded-sm bg-primary/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {project.status}
            </span>
          </div>

          <div className="absolute right-4 bottom-4 left-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-300">
              <MapPin size={12} className="text-accent" />
              {project.location}
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{project.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {project.completionDate} · {project.area}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white transition group-hover:border-accent group-hover:bg-primary group-hover:text-white">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

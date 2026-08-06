import { motion } from 'framer-motion'
import { FaLinkedinIn } from 'react-icons/fa'
import { ImageWithSkeleton } from '../ui/Skeleton'
import { fadeUp } from '../../animations/variants'

export default function TeamCard({ member, index = 0 }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
      className="group"
      data-cursor="hover"
    >
      <div className="relative overflow-hidden rounded-sm border border-white/8 bg-navy-light/50 transition duration-500 hover:-translate-y-1 hover:border-primary-light/25 hover:shadow-premium">
        <div className="img-zoom relative aspect-[4/5]">
          <ImageWithSkeleton
            src={member.photo || member.image}
            alt={member.name}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 bg-navy/60 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100 hover:bg-primary"
          >
            <FaLinkedinIn size={16} />
          </a>
        </div>
        <div className="p-5 md:p-6">
          <h3 className="font-display text-xl font-semibold text-white">{member.name}</h3>
          <p className="mt-1 text-sm text-primary-light">{member.designation}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
            <span>{member.yearsExperience || member.experience}</span>
            <span className="text-white/20">·</span>
            <span>{member.specialisations?.[0] || member.specialisation}</span>
          </div>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {member.biography || member.bio}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils'

export default function Accordion({ items = [], allowMultiple = false }) {
  const [open, setOpen] = useState([])

  const toggle = (id) => {
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      return allowMultiple ? [...prev, id] : [id]
    })
  }

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition hover:text-accent"
            >
              <span className="font-display text-lg font-medium text-white md:text-xl">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'shrink-0 text-primary-light transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
                size={20}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-slate-400 leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

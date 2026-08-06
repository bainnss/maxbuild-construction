import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ImageWithSkeleton } from './Skeleton'
import { cn } from '../../utils'

export default function Gallery({ images = [], className }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <div
        className={cn(
          'columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]',
          className
        )}
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'img-zoom mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm border border-white/8',
              i % 3 === 0 ? 'aspect-[4/5]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]'
            )}
            aria-label={`Open gallery image ${i + 1}`}
            data-cursor="hover"
          >
            <ImageWithSkeleton src={src} alt={`Gallery ${i + 1}`} className="h-full w-full" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              type="button"
              aria-label="Close lightbox"
              className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 text-white hover:bg-white/10"
              onClick={() => setActive(null)}
            >
              <X size={20} />
            </button>
            <motion.img
              key={active}
              src={images[active]}
              alt={`Gallery ${active + 1}`}
              className="max-h-[85vh] max-w-5xl rounded-sm object-contain"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

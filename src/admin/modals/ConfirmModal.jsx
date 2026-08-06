import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../utils'

export default function ConfirmModal({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            aria-label="Close"
            onClick={onCancel}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="relative w-full max-w-md rounded-xl border border-white/10 bg-navy-light p-6 shadow-premium"
          >
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
            <h2 id="confirm-title" className="font-display text-xl font-semibold text-white">
              {title}
            </h2>
            {description && <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={onConfirm}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-semibold text-white transition',
                  tone === 'danger' ? 'bg-rose-600 hover:bg-rose-500' : 'bg-accent-deep hover:bg-accent'
                )}
              >
                {loading ? 'Please wait…' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

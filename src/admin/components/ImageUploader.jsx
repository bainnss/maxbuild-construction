import { useRef, useState } from 'react'
import { ImagePlus, X, GripVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '../../utils'
import { uploadImage } from '../../lib/api'

export default function ImageUploader({
  label = 'Image',
  value,
  onChange,
  multiple = false,
  values = [],
  onChangeMultiple,
  onReorder,
}) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (files) => {
    const list = Array.from(files || [])
    if (!list.length) return
    setUploading(true)
    try {
      if (multiple) {
        const urls = []
        for (const file of list) {
          urls.push(await uploadImage(file))
        }
        onChangeMultiple?.([...(values || []), ...urls])
        toast.success(`${urls.length} image(s) uploaded`)
      } else {
        const url = await uploadImage(list[0])
        onChange?.(url)
        toast.success('Image uploaded')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const removeAt = (index) => {
    onChangeMultiple?.(values.filter((_, i) => i !== index))
  }

  const onDragStart = (index) => setDragging(index)
  const onDrop = (index) => {
    if (dragging === null || dragging === index) return
    const next = [...values]
    const [item] = next.splice(dragging, 1)
    next.splice(index, 0, item)
    onReorder?.(next)
    onChangeMultiple?.(next)
    setDragging(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-accent/40 hover:text-accent"
        >
          <ImagePlus size={14} /> Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {!multiple && value && (
        <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10">
          <img src={value} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange?.('')}
            className="absolute top-2 right-2 rounded-md bg-navy/80 p-1.5 text-white hover:bg-rose-600"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {!multiple && !value && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-navy/40 text-slate-400 transition hover:border-accent/40 hover:text-accent"
        >
          <ImagePlus size={22} />
          <span className="text-sm">{uploading ? 'Uploading…' : 'Click to upload cover image'}</span>
        </button>
      )}

      {multiple && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {(values || []).map((src, index) => (
            <div
              key={`${src.slice(0, 24)}-${index}`}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(index)}
              className={cn(
                'group relative aspect-square overflow-hidden rounded-lg border border-white/10',
                dragging === index && 'opacity-50'
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-navy/80 to-transparent p-1.5 opacity-0 transition group-hover:opacity-100">
                <GripVertical size={14} className="text-white/80" />
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="rounded bg-rose-600/90 p-1 text-white"
                  aria-label="Remove"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 text-slate-400 hover:border-accent/40 hover:text-accent"
          >
            <ImagePlus size={18} />
            <span className="text-xs">Add</span>
          </button>
        </div>
      )}
    </div>
  )
}

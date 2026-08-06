import { useState } from 'react'
import { X } from 'lucide-react'
import { inputClass } from './ui/primitives'

export default function TagsInput({ value = [], onChange, placeholder = 'Type and press Enter' }) {
  const [text, setText] = useState('')

  const add = () => {
    const next = text.trim()
    if (!next) return
    if (!value.includes(next)) onChange([...value, next])
    setText('')
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs text-slate-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <input
        className={inputClass}
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            add()
          }
        }}
        onBlur={add}
      />
    </div>
  )
}

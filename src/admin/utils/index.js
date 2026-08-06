export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

export const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const nowIso = () => new Date().toISOString()

export const formatAdminDate = (value) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

/**
 * Convert an image file to a compressed data URL.
 * Keeps SVGs/GIFs as-is. Shrinks large photos to avoid storage bloat.
 */
export const fileToDataUrl = async (file, { maxWidth = 1600, quality = 0.78 } = {}) => {
  if (!file?.type?.startsWith('image/')) {
    return readFileAsDataUrl(file)
  }

  // Don't re-encode formats that canvas would hurt
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return readFileAsDataUrl(file)
  }

  try {
    const original = await readFileAsDataUrl(file)
    const img = await loadImage(original)
    const scale = Math.min(1, maxWidth / Math.max(img.width, 1))
    const width = Math.max(1, Math.round(img.width * scale))
    const height = Math.max(1, Math.round(img.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return original

    ctx.drawImage(img, 0, 0, width, height)

    const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
    const compressed =
      outputType === 'image/png'
        ? canvas.toDataURL('image/png')
        : canvas.toDataURL('image/jpeg', quality)

    // Prefer the smaller of the two payloads
    return compressed.length < original.length ? compressed : original
  } catch {
    return readFileAsDataUrl(file)
  }
}

export const parseLocation = (location = '') => {
  const parts = location.split(',').map((p) => p.trim())
  return {
    city: parts[0] || '',
    state: parts[1] || '',
    country: parts[2] || 'United States',
  }
}

export const joinLocation = ({ city, state, country }) =>
  [city, state, country].filter(Boolean).join(', ')

export const ensureArray = (value) => {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) {
    return value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export const paginate = (items, page = 1, pageSize = 10) => {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    pageSize,
    total,
    totalPages,
  }
}

import app from '../server/app.js'
import { connectDb } from '../server/db.js'
import { seedDatabase } from '../server/seed.js'

let ready

async function ensureReady() {
  if (!ready) {
    ready = (async () => {
      await connectDb()
      await seedDatabase({ force: false })
    })()
  }
  return ready
}

function normalizeUrl(req) {
  // Vercel catch-all often leaves req.url without the /api prefix.
  // Express routes are all mounted under /api/*, so rebuild it.
  const segments = req.query?.path
  if (segments != null) {
    const joined = Array.isArray(segments) ? segments.join('/') : String(segments)
    const qsIndex = (req.url || '').indexOf('?')
    const rawQs = qsIndex >= 0 ? (req.url || '').slice(qsIndex + 1) : ''
    const cleanedQs = rawQs
      .split('&')
      .filter((part) => part && !part.startsWith('path='))
      .join('&')
    req.url = `/api/${joined}${cleanedQs ? `?${cleanedQs}` : ''}`
    return
  }

  if (req.url && !req.url.startsWith('/api')) {
    req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`
  }
}

export default async function handler(req, res) {
  await ensureReady()
  normalizeUrl(req)
  return app(req, res)
}

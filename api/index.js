import app from '../server/app.js'
import { connectDb } from '../server/db.js'
import { seedDatabase } from '../server/seed.js'

/**
 * Vercel Serverless Function entry for the Express API.
 * vercel.json routes every /api/* request to this file.
 */
let ready

async function ensureReady() {
  if (!ready) {
    ready = (async () => {
      await connectDb()
      try {
        await seedDatabase({ force: false })
      } catch (err) {
        console.error('seedDatabase skipped:', err?.message || err)
      }
    })()
  }
  return ready
}

export default async function handler(req, res) {
  await ensureReady()
  return app(req, res)
}

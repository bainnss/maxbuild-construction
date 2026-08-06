import dotenv from 'dotenv'
import app from '../server/app.js'
import { connectDb } from '../server/db.js'
import { seedDatabase } from '../server/seed.js'

dotenv.config()

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

export default async function handler(req, res) {
  await ensureReady()
  return app(req, res)
}

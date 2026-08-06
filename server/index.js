import dotenv from 'dotenv'
import app from './app.js'
import { connectDb } from './db.js'
import { seedDatabase } from './seed.js'

dotenv.config()

const port = Number(process.env.PORT || 8787)

async function start() {
  await connectDb()
  await seedDatabase({ force: false })
  app.listen(port, () => {
    console.log(`MaxBuild API running on http://localhost:${port}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})

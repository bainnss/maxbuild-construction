import dotenv from 'dotenv'
import { connectDb } from './db.js'
import { ensureAdminUser } from './ensureAdmin.js'
import { Project } from './models/Project.js'
import { Service } from './models/Service.js'
import { TeamMember } from './models/TeamMember.js'
import { Client } from './models/Client.js'
import { Settings } from './models/Settings.js'
import { Activity } from './models/Activity.js'
import { getSeedData } from '../src/admin/data/seed.js'
import { mergeSettings } from '../src/admin/data/settingsDefaults.js'

dotenv.config()

export { ensureAdminUser }

const stripMeta = (doc) => {
  const next = { ...doc }
  delete next.id
  delete next._id
  delete next.createdAt
  delete next.updatedAt
  return next
}

export async function seedDatabase({ force = false } = {}) {
  await connectDb()
  await ensureAdminUser()

  const projectCount = await Project.countDocuments()
  if (!force && projectCount > 0) {
    return { seeded: false, message: 'Database already has content' }
  }

  if (force) {
    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      TeamMember.deleteMany({}),
      Client.deleteMany({}),
      Settings.deleteMany({}),
      Activity.deleteMany({}),
    ])
  }

  const seed = getSeedData()
  await Project.insertMany(seed.projects.map(stripMeta))
  await Service.insertMany(seed.services.map(stripMeta))
  await TeamMember.insertMany(seed.team.map(stripMeta))
  await Client.insertMany(seed.clients.map(stripMeta))
  await Settings.create({ key: 'site', data: mergeSettings(seed.settings) })
  await Activity.create({
    type: 'system',
    message: force ? 'CMS reset to seed content' : 'CMS initialized with seed content',
  })

  return { seeded: true, message: force ? 'Reset to seed data' : 'Seeded empty database' }
}

const isDirectRun = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('/server/seed.js')

if (isDirectRun) {
  seedDatabase({ force: process.argv.includes('--force') })
    .then((result) => {
      console.log(result.message)
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

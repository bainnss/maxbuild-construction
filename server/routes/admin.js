import { Router } from 'express'
import { Project } from '../models/Project.js'
import { Service } from '../models/Service.js'
import { TeamMember } from '../models/TeamMember.js'
import { Client } from '../models/Client.js'
import { Settings } from '../models/Settings.js'
import { Activity } from '../models/Activity.js'
import { requireAuth } from '../middleware/auth.js'
import { mergeSettings } from '../../src/admin/data/settingsDefaults.js'
import { seedDatabase } from '../seed.js'

const router = Router()

router.get('/content', requireAuth, async (_req, res) => {
  const [projects, services, team, clients, settingsDoc, activities] = await Promise.all([
    Project.find().sort({ updatedAt: -1 }),
    Service.find().sort({ displayOrder: 1 }),
    TeamMember.find().sort({ displayOrder: 1 }),
    Client.find().sort({ displayOrder: 1 }),
    Settings.findOne({ key: 'site' }),
    Activity.find().sort({ createdAt: -1 }).limit(40),
  ])

  res.json({
    projects: projects.map((item) => item.toJSON()),
    services: services.map((item) => item.toJSON()),
    team: team.map((item) => item.toJSON()),
    clients: clients.map((item) => item.toJSON()),
    settings: mergeSettings(settingsDoc?.data || {}),
    activities: activities.map((item) => ({
      ...item.toJSON(),
      createdAt: item.createdAt,
    })),
  })
})

router.post('/reset', requireAuth, async (_req, res) => {
  const data = await seedDatabase({ force: true })
  res.json(data)
})

export default router

import { Router } from 'express'
import { Project } from '../models/Project.js'
import { Service } from '../models/Service.js'
import { TeamMember } from '../models/TeamMember.js'
import { Client } from '../models/Client.js'
import { Settings } from '../models/Settings.js'
import { mergeSettings } from '../../src/admin/data/settingsDefaults.js'

const router = Router()

router.get('/', async (_req, res) => {
  const [projects, services, team, clients, settingsDoc] = await Promise.all([
    Project.find({ published: true, draft: { $ne: true } }).sort({ displayOrder: 1 }),
    Service.find({ published: true }).sort({ displayOrder: 1 }),
    TeamMember.find({ status: { $ne: 'Inactive' } }).sort({ displayOrder: 1 }),
    Client.find({ published: { $ne: false } }).sort({ displayOrder: 1 }),
    Settings.findOne({ key: 'site' }),
  ])

  res.json({
    projects: projects.map((item) => item.toJSON()),
    services: services.map((item) => item.toJSON()),
    team: team.map((item) => item.toJSON()),
    clients: clients.map((item) => item.toJSON()),
    settings: mergeSettings(settingsDoc?.data || {}),
  })
})

export default router

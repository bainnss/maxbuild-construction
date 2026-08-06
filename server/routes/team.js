import { Router } from 'express'
import { TeamMember } from '../models/TeamMember.js'
import { requireAuth } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = Router()

router.get('/', requireAuth, async (_req, res) => {
  const items = await TeamMember.find().sort({ displayOrder: 1 })
  res.json(items.map((item) => item.toJSON()))
})

router.post('/', requireAuth, async (req, res) => {
  const item = await TeamMember.create(req.body)
  await logActivity(`Team member “${item.name}” added`, 'create')
  res.status(201).json(item.toJSON())
})

router.put('/:id', requireAuth, async (req, res) => {
  const item = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!item) return res.status(404).json({ message: 'Team member not found' })
  await logActivity('Team member updated', 'update')
  res.json(item.toJSON())
})

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await TeamMember.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ message: 'Team member not found' })
  await logActivity(`Team member “${item.name}” removed`, 'delete')
  res.json({ ok: true })
})

export default router

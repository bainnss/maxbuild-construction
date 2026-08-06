import { Router } from 'express'
import { Client } from '../models/Client.js'
import { requireAuth } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = Router()

router.get('/', requireAuth, async (_req, res) => {
  const items = await Client.find().sort({ displayOrder: 1 })
  res.json(items.map((item) => item.toJSON()))
})

router.post('/', requireAuth, async (req, res) => {
  const item = await Client.create(req.body)
  await logActivity(`Client “${item.name}” added`, 'create')
  res.status(201).json(item.toJSON())
})

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!item) return res.status(404).json({ message: 'Client not found' })
  await logActivity('Client updated', 'update')
  res.json(item.toJSON())
})

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Client.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ message: 'Client not found' })
  await logActivity(`Client “${item.name}” removed`, 'delete')
  res.json({ ok: true })
})

export default router

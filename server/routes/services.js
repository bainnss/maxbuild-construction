import { Router } from 'express'
import { Service } from '../models/Service.js'
import { requireAuth } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = Router()

router.get('/', requireAuth, async (_req, res) => {
  const items = await Service.find().sort({ displayOrder: 1, updatedAt: -1 })
  res.json(items.map((item) => item.toJSON()))
})

router.post('/', requireAuth, async (req, res) => {
  const item = await Service.create(req.body)
  await logActivity(`Service “${item.title}” created`, 'create')
  res.status(201).json(item.toJSON())
})

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!item) return res.status(404).json({ message: 'Service not found' })
  await logActivity('Service updated', 'update')
  res.json(item.toJSON())
})

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Service.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ message: 'Service not found' })
  await logActivity(`Service “${item.title}” deleted`, 'delete')
  res.json({ ok: true })
})

router.post('/:id/duplicate', requireAuth, async (req, res) => {
  const source = await Service.findById(req.params.id)
  if (!source) return res.status(404).json({ message: 'Service not found' })
  const data = source.toObject()
  delete data._id
  data.title = `${source.title} (Copy)`
  data.slug = `${source.slug}-copy-${Date.now().toString(36).slice(-4)}`
  data.published = false
  const copy = await Service.create(data)
  await logActivity('Service duplicated', 'create')
  res.status(201).json(copy.toJSON())
})

export default router

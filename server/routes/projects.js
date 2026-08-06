import { Router } from 'express'
import { Project } from '../models/Project.js'
import { requireAuth } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'

const router = Router()

router.get('/', requireAuth, async (_req, res) => {
  const items = await Project.find().sort({ updatedAt: -1 })
  res.json(items.map((item) => item.toJSON()))
})

router.get('/:id', requireAuth, async (req, res) => {
  const item = await Project.findById(req.params.id)
  if (!item) return res.status(404).json({ message: 'Project not found' })
  res.json(item.toJSON())
})

router.post('/', requireAuth, async (req, res) => {
  const item = await Project.create(req.body)
  await logActivity(`Project “${item.name}” created`, 'create')
  res.status(201).json(item.toJSON())
})

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!item) return res.status(404).json({ message: 'Project not found' })
  await logActivity(`Project “${item.name}” updated`, 'update')
  res.json(item.toJSON())
})

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Project.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ message: 'Project not found' })
  await logActivity(`Project “${item.name}” deleted`, 'delete')
  res.json({ ok: true })
})

router.post('/bulk-delete', requireAuth, async (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids : []
  await Project.deleteMany({ _id: { $in: ids } })
  await logActivity(`${ids.length} projects deleted`, 'delete')
  res.json({ ok: true })
})

router.post('/:id/duplicate', requireAuth, async (req, res) => {
  const source = await Project.findById(req.params.id)
  if (!source) return res.status(404).json({ message: 'Project not found' })
  const data = source.toObject()
  delete data._id
  data.name = `${source.name} (Copy)`
  data.slug = `${source.slug}-copy-${Date.now().toString(36).slice(-4)}`
  data.published = false
  data.draft = true
  data.featured = false
  const copy = await Project.create(data)
  await logActivity(`Project “${source.name}” duplicated`, 'create')
  res.status(201).json(copy.toJSON())
})

export default router

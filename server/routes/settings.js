import { Router } from 'express'
import { Settings } from '../models/Settings.js'
import { requireAuth } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'
import { mergeSettings } from '../../src/admin/data/settingsDefaults.js'

const router = Router()

router.get('/', requireAuth, async (_req, res) => {
  const doc = await Settings.findOne({ key: 'site' })
  res.json(mergeSettings(doc?.data || {}))
})

router.put('/', requireAuth, async (req, res) => {
  const next = mergeSettings({ ...(req.body || {}), updatedAt: new Date().toISOString() })
  const doc = await Settings.findOneAndUpdate(
    { key: 'site' },
    { key: 'site', data: next },
    { upsert: true, new: true }
  )
  await logActivity('Website settings updated', 'settings')
  res.json(mergeSettings(doc.data))
})

export default router

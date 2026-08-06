import { Router } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/signature', requireAuth, (_req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({
      message: 'Cloudinary is not configured. Add CLOUDINARY_* env vars.',
    })
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

  const timestamp = Math.round(Date.now() / 1000)
  const folder = 'maxbuild'
  const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, apiSecret)

  return res.json({ timestamp, folder, signature, cloudName, apiKey })
})

export default router

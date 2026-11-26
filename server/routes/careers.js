import { Router } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { Career } from '../models/Career.js'
import { JobApplication } from '../models/JobApplication.js'
import { requireAuth } from '../middleware/auth.js'
import { logActivity } from '../utils/activity.js'
import { sendCareerApplicationEmail } from '../utils/mailer.js'

const router = Router()

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx)$/i

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (
      ALLOWED_MIME_TYPES.has(file.mimetype) ||
      ALLOWED_EXTENSIONS.test(file.originalname || '')
    ) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, DOC, and DOCX resume files are allowed.'))
    }
  },
})

function uploadResumeToCloudinary(buffer, originalName) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return Promise.resolve('')
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

  const safeBase = (originalName || 'resume')
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')

  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'maxbuild/resumes',
        resource_type: 'raw',
        public_id: `${Date.now()}-${safeBase}`,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          console.warn('Cloudinary resume upload skipped:', error?.message)
          resolve('')
        } else {
          resolve(result.secure_url)
        }
      }
    )
    stream.end(buffer)
  })
}

router.get('/', requireAuth, async (_req, res) => {
  const items = await Career.find().sort({ displayOrder: 1, createdAt: -1 })
  res.json(items.map((item) => item.toJSON()))
})

router.post('/', requireAuth, async (req, res) => {
  const item = await Career.create(req.body)
  await logActivity(`Job opening “${item.title}” created`, 'create')
  res.status(201).json(item.toJSON())
})

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!item) return res.status(404).json({ message: 'Job opening not found' })
  await logActivity(`Job opening “${item.title}” updated`, 'update')
  res.json(item.toJSON())
})

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Career.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ message: 'Job opening not found' })
  await logActivity(`Job opening “${item.title}” removed`, 'delete')
  res.json({ ok: true })
})

router.post('/apply', (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Invalid resume upload' })
    }
    return next()
  })
}, async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim()
    const phone = String(req.body.phone || '').trim()
    const position = String(req.body.position || '').trim()
    const jobId = String(req.body.jobId || '').trim()
    const experience = String(req.body.experience || '').trim()
    const coverLetter = String(req.body.coverLetter || '').trim()

    if (name.length < 2) {
      return res.status(400).json({ message: 'Full name is required.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' })
    }
    if (phone.length < 7) {
      return res.status(400).json({ message: 'A valid phone number is required.' })
    }
    if (!position) {
      return res.status(400).json({ message: 'Please select a position.' })
    }
    if (!experience) {
      return res.status(400).json({ message: 'Experience is required.' })
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload your resume (PDF, DOC, or DOCX).' })
    }

    const resumeUrl = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname
    )

    const application = await JobApplication.create({
      jobId,
      position,
      name,
      email,
      phone,
      experience,
      coverLetter,
      resumeFileName: req.file.originalname,
      resumeUrl,
      emailSent: false,
    })

      const { previewUrl } = await sendCareerApplicationEmail({
        name,
        email,
        phone,
        position,
        experience,
        coverLetter,
        resumeFileName: req.file.originalname,
        resumeMimeType: req.file.mimetype,
        resumeBuffer: req.file.buffer,
        resumeUrl,
      })

    application.emailSent = true
    await application.save()
    await logActivity(`New job application from ${name} for “${position}”`, 'create')

    return res.status(201).json({
        ok: true,
        message: 'Your application has been submitted successfully. Our HR team will contact you soon.',
        ...(previewUrl ? { previewUrl } : {}),
      })
    } catch (err) {
      if (err.status === 503) {
        return res.status(503).json({ message: err.message })
      }
      return next(err)
    }
  })

export default router

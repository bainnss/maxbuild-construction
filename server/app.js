import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './db.js'
import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import serviceRoutes from './routes/services.js'
import teamRoutes from './routes/team.js'
import clientRoutes from './routes/clients.js'
import settingsRoutes from './routes/settings.js'
import uploadRoutes from './routes/upload.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'

const app = express()

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())

app.use(async (_req, _res, next) => {
  try {
    await connectDb()
    next()
  } catch (err) {
    next(err)
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/public', publicRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/admin', adminRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

export default app

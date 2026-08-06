import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { cookieOptions, requireAuth, signToken } from '../middleware/auth.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password, remember = true } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const user = await User.findOne({ username: String(username).trim() })
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const token = signToken(user.toJSON(), Boolean(remember))
  res.cookie('maxbuild_token', token, cookieOptions(Boolean(remember)))
  return res.json({ user: user.toJSON() })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('maxbuild_token', { path: '/' })
  return res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: req.user })
})

export default router

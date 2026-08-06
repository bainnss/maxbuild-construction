import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export function signToken(user, remember = true) {
  return jwt.sign(
    { sub: user.id || String(user._id), username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: remember ? '30d' : '12h' }
  )
}

export function cookieOptions(remember = true) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 12 * 60 * 60 * 1000,
  }
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const bearer = header.startsWith('Bearer ') ? header.slice(7) : null
    const token = req.cookies?.maxbuild_token || bearer
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not configured' })
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = user.toJSON()
    next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

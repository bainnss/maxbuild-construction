import bcrypt from 'bcryptjs'
import { User } from './models/User.js'

/** Create the admin user from env if it does not exist yet. */
export async function ensureAdminUser() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const existing = await User.findOne({ username })
  if (existing) return existing

  const password = process.env.ADMIN_PASSWORD || 'Pass@123'
  const passwordHash = await bcrypt.hash(password, 10)
  return User.create({
    username,
    passwordHash,
    name: 'MaxBuild Admin',
    role: 'Administrator',
  })
}

import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'MaxBuild Admin' },
    role: { type: String, default: 'Administrator' },
  },
  { timestamps: true }
)

userSchema.set('toJSON', jsonOptions)

export const User = mongoose.models.User || mongoose.model('User', userSchema)

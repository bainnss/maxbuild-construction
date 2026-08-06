import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: 'site' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
)

settingsSchema.set('toJSON', jsonOptions)

export const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema)

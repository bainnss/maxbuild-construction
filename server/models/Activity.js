import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const activitySchema = new mongoose.Schema(
  {
    type: { type: String, default: 'update' },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

activitySchema.index({ createdAt: -1 })
activitySchema.set('toJSON', jsonOptions)

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)

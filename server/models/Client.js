import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    displayOrder: { type: Number, default: 1 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

clientSchema.index({ published: 1, displayOrder: 1 })
clientSchema.set('toJSON', jsonOptions)

export const Client = mongoose.models.Client || mongoose.model('Client', clientSchema)

import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Building2' },
    image: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    features: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    displayOrder: { type: Number, default: 1 },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

serviceSchema.index({ published: 1, displayOrder: 1 })
serviceSchema.set('toJSON', jsonOptions)

export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema)

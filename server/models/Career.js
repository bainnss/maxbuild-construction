import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, default: '', trim: true },
    department: { type: String, default: 'Operations', trim: true },
    location: { type: String, required: true, trim: true },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    experience: { type: String, default: '', trim: true },
    salaryRange: { type: String, default: '', trim: true },
    openings: { type: Number, default: 1, min: 1 },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Draft'],
      default: 'Active',
    },
  },
  { timestamps: true }
)

careerSchema.index({ status: 1, displayOrder: 1 })
careerSchema.set('toJSON', jsonOptions)

export const Career =
  mongoose.models.Career || mongoose.model('Career', careerSchema)

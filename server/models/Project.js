import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: 'United States' },
    completionDate: { type: String, default: '' },
    startDate: { type: String, default: '' },
    status: { type: String, default: 'Completed' },
    category: { type: String, default: 'Commercial' },
    area: { type: String, default: '' },
    squareFeet: { type: String, default: '' },
    client: { type: String, default: '' },
    clientName: { type: String, default: '' },
    architectName: { type: String, default: '' },
    budget: { type: String, default: '' },
    duration: { type: String, default: '' },
    timeline: { type: String, default: '' },
    constructionType: { type: String, default: '' },
    image: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    materials: { type: [String], default: [] },
    challenges: { type: [String], default: [] },
    solutions: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 1 },
    published: { type: Boolean, default: true },
    draft: { type: Boolean, default: false },
    industry: { type: String, default: 'Commercial' },
  },
  { timestamps: true }
)

projectSchema.index({ published: 1, draft: 1, displayOrder: 1 })
projectSchema.set('toJSON', jsonOptions)

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)

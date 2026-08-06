import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, default: '' },
    department: { type: String, default: 'Leadership' },
    bio: { type: String, default: '' },
    biography: { type: String, default: '' },
    experience: { type: String, default: '' },
    yearsExperience: { type: String, default: '' },
    specialisation: { type: String, default: '' },
    specialisations: { type: [String], default: [] },
    linkedin: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    image: { type: String, default: '' },
    photo: { type: String, default: '' },
    socialLinks: { type: mongoose.Schema.Types.Mixed, default: {} },
    displayOrder: { type: Number, default: 1 },
    featured: { type: Boolean, default: false },
    status: { type: String, default: 'Active' },
  },
  { timestamps: true }
)

teamSchema.index({ status: 1, displayOrder: 1 })
teamSchema.set('toJSON', jsonOptions)

export const TeamMember =
  mongoose.models.TeamMember || mongoose.model('TeamMember', teamSchema)

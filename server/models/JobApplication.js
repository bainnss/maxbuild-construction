import mongoose from 'mongoose'
import { jsonOptions } from '../utils/json.js'

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: String, default: '' },
    position: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    coverLetter: { type: String, default: '' },
    resumeFileName: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
)

jobApplicationSchema.set('toJSON', jsonOptions)

export const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model('JobApplication', jobApplicationSchema)

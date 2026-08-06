import { Activity } from '../models/Activity.js'

export async function logActivity(message, type = 'update') {
  await Activity.create({ message, type })
  const extras = await Activity.find().sort({ createdAt: -1 }).skip(40)
  if (extras.length) {
    await Activity.deleteMany({ _id: { $in: extras.map((item) => item._id) } })
  }
}

import mongoose from 'mongoose'

const globalCache = globalThis

if (!globalCache.__maxbuildMongoose) {
  globalCache.__maxbuildMongoose = { conn: null, promise: null }
}

export async function connectDb() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  if (globalCache.__maxbuildMongoose.conn) {
    return globalCache.__maxbuildMongoose.conn
  }

  if (!globalCache.__maxbuildMongoose.promise) {
    // Serverless-friendly: small pool, no min pool, prune idle sockets.
    globalCache.__maxbuildMongoose.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 12000,
      maxIdleTimeMS: 30000,
    })
  }

  globalCache.__maxbuildMongoose.conn = await globalCache.__maxbuildMongoose.promise
  return globalCache.__maxbuildMongoose.conn
}

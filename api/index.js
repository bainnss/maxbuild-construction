import app from '../server/app.js'

// Vercel detects Express and keeps the invocation alive until the response finishes.
// Do not wrap in an async handler — that resolves too early and causes FUNCTION_INVOCATION_FAILED.
export default app

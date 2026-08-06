# Deploy MaxBuild (Vercel + MongoDB Atlas + Cloudinary)

One Vercel project serves both:
- **Frontend** — Vite build output (`dist/`)
- **API** — Express app via `api/index.js` (serverless)

## Before you deploy (checklist)

### 1. MongoDB Atlas
1. Create a free M0 cluster
2. Database user with password
3. Network Access → allow `0.0.0.0/0`
4. Copy connection string (`mongodb+srv://...`)

### 2. Cloudinary
Copy **Cloud name**, **API Key**, **API Secret** from the dashboard.

### 3. Local sanity check
```bash
copy .env.example .env
# fill MONGODB_URI, JWT_SECRET, ADMIN_*, CLOUDINARY_*
npm install
npm run seed
npm run dev
```
- Site: http://localhost:5173  
- Admin: http://localhost:5173/admin  
- API health: http://localhost:8787/api/health → `{"ok":true}`

### 4. Push this repo (including `api/index.js` + `vercel.json`)

### 5. Vercel project settings
Import the GitHub repo, then set:

| Setting | Value |
|---|---|
| Framework Preset | **Other** (builds are defined in `vercel.json`) |
| Root Directory | `.` (repo root) |
| Build / Output overrides | **Leave empty** — `vercel.json` owns them |

Add **Environment Variables** (Production + Preview):
- `MONGODB_URI`
- `JWT_SECRET` (long random string)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 6. After deploy — verify in this order
1. Open **Deployment → Functions** — you must see `api/index.js` (or `api`).
2. Visit `https://YOUR_DOMAIN/api/health` → `{"ok":true}`  
   If you still see Vercel `404 NOT_FOUND`, the function was not built (settings override or old deploy).
3. Then try admin login.

Change `ADMIN_PASSWORD` before giving the site to the client.

## What you do NOT need
- A separate backend host (Render/Railway/etc.)
- A VPS

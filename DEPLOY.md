# Deploy MaxBuild (Vercel + free backend)

You still deploy **one site on Vercel**. The API is part of this project (`/api`).  
Data lives in free **MongoDB Atlas**. Images live in free **Cloudinary**.

After this, edits on one computer appear on every other computer.

## 1. MongoDB Atlas (free database)

1. Sign up at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **free M0** cluster
3. Create a database user (username + password)
4. Network Access → **Allow Access from Anywhere** (`0.0.0.0/0`)  
   (needed for Vercel serverless IPs)
5. Database → Connect → Drivers → copy the connection string  
   Example: `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/maxbuild?retryWrites=true&w=majority`

## 2. Cloudinary (free image hosting)

1. Sign up at [https://cloudinary.com](https://cloudinary.com)
2. Dashboard → copy **Cloud name**, **API Key**, **API Secret**

## 3. Local setup

```bash
copy .env.example .env
```

Fill in `.env`, then:

```bash
npm install
npm run seed
npm run dev
```

- Website: http://localhost:5173
- Admin: http://localhost:5173/admin  
  Default login: `admin` / `Pass@123` (or whatever you set in `.env`)

## 4. Vercel deploy

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add the same env vars as `.env`:
   - `MONGODB_URI`
   - `JWT_SECRET` (use a long random string)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Deploy

Change `ADMIN_PASSWORD` before giving the site to the client.

## What you do NOT need

- A separate backend host (Render/Railway/etc.)
- A VPS
- Paid plans for a normal company brochure + CMS

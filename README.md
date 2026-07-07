# Birthday Card

Create a personalized, unlockable birthday card: names, a message, photos/videos,
background music, a PIN-protected reveal, and a wall of wishes from guests.

Built with Next.js (App Router, TypeScript, Tailwind) and Supabase (Postgres +
Storage), deployed on Vercel.

## Project structure

```
src/app/create/*      Six-step card creation flow (names, message, photos, music, wishes, review)
src/app/c/[slug]/*     Public card page guests open (PIN gate -> reveal)
src/app/api/cards/*    API routes: fetch public card info, verify PIN + return content
src/components/create  Creation-flow UI (step nav, dropzone, footer)
src/components/card    Guest-facing card UI (unlock gate, confetti, gallery)
src/lib/supabase       Browser / server / admin (service-role) Supabase clients
src/lib/pin.ts         PIN hashing/verification (bcrypt)
supabase/schema.sql    Database tables + RLS policies
supabase/storage.sql   Storage bucket for uploaded media
```

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a [Supabase](https://supabase.com) project.
3. In the Supabase SQL editor, run `supabase/schema.sql` then `supabase/storage.sql`.
4. Copy the env template and fill in your Supabase project's API keys (Project
   Settings -> API):
   ```bash
   cp .env.local.example .env.local
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deploying

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Import the repo into [Vercel](https://vercel.com/new).
3. Add the same environment variables from `.env.local` in the Vercel project
   settings (Production + Preview).
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain so shareable card
   links are generated correctly.

## Status

This is the initial scaffold: routing, Supabase clients, database schema, and
UI stubs are in place. Still to build: wiring the creation flow to actually
save a card + upload media to Supabase Storage, generating/copying the share
link on the Review step, and the wishes submission form on the public card
page.

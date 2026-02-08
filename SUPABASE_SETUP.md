# Supabase Setup Guide

This guide will help you set up Supabase for the tribute submission feature.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: `eoa-memorial` (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Add them to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Create the Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Paste and run this SQL:

```sql
-- Create tributes table
CREATE TABLE tributes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  relationship TEXT,
  message TEXT NOT NULL,
  photo_url TEXT,
  publish_approved BOOLEAN DEFAULT false,
  consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX idx_tributes_publish_approved ON tributes(publish_approved);
CREATE INDEX idx_tributes_created_at ON tributes(created_at DESC);
```

## Step 4: Set Up Storage Bucket

1. Go to **Storage** in the Supabase dashboard
2. Click "Create bucket"
3. Name: `tribute-photos`
4. **Make it public**: Toggle "Public bucket" ON
5. Click "Create bucket"

## Step 5: Set Up Storage Policies

1. Click on the `tribute-photos` bucket
2. Go to **Policies** tab
3. Click "New Policy"
4. Choose "For full customization" → "Use this template"
5. Name: `Allow public uploads`
6. Policy definition: Paste this SQL:

```sql
(bucket_id = 'tribute-photos'::text)
```

7. Allowed operation: `INSERT`
8. Target roles: `public`
9. Click "Review" → "Save policy"

6. Create another policy:
   - Name: `Allow public reads`
   - Policy definition: Same SQL as above
   - Allowed operation: `SELECT`
   - Target roles: `public`
   - Click "Save policy"

## Step 6: Test the Setup

1. Start your Next.js dev server: `npm run dev`
2. Navigate to the tribute form on your site
3. Submit a test tribute
4. Check Supabase dashboard → **Table Editor** → `tributes` table
5. You should see your test entry

## Approving Tributes for Public Display

Tributes are stored with `publish_approved = false` by default. To approve them for public display:

1. Go to Supabase dashboard → **Table Editor** → `tributes`
2. Find the tribute you want to approve
3. Click the row to edit
4. Toggle `publish_approved` to `true`
5. Save

The tribute will now appear on the Tribute Wall section of the website.

## Troubleshooting

### "Failed to upload photo"
- Check that the storage bucket `tribute-photos` exists and is public
- Verify storage policies allow INSERT operations

### "Failed to submit tribute"
- Check your `.env.local` file has the correct Supabase URL and key
- Verify the `tributes` table exists in your database
- Check browser console for detailed error messages

### Tributes not showing on the wall
- Make sure `publish_approved` is set to `true` in the database
- Check that the API route is working: visit `/api/tributes` in your browser

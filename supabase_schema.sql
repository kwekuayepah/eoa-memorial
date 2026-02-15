-- 1. Create the tributes table
CREATE TABLE IF NOT EXISTS public.tributes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  relationship TEXT,
  message TEXT NOT NULL,
  photo_url TEXT,
  publish_approved BOOLEAN DEFAULT false,
  consent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies

-- Allow anyone to submit a tribute (Insert)
CREATE POLICY "Enable insert for all users" 
ON public.tributes FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow anyone to view APPROVED tributes (Select)
CREATE POLICY "Enable read access for approved tributes" 
ON public.tributes FOR SELECT 
TO public 
USING (publish_approved = true);

-- 4. Create Storage Bucket for Photos
-- Note: If this fails, you can create the 'tribute-photos' bucket in the Storage dashboard manually.
INSERT INTO storage.buckets (id, name, public)
VALUES ('tribute-photos', 'tribute-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies

-- Allow public to view photos
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'tribute-photos');

-- Allow public to upload photos
CREATE POLICY "Public Uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'tribute-photos');

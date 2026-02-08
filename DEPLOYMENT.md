# Deployment Checklist

## Pre-Deployment

- [ ] Add hero portrait image: `public/images/hero/edward-owusu-agyei.jpg`
- [ ] Create OG image (1200x630px): `public/images/og-image.jpg`
- [ ] Add gallery photos to `public/images/gallery/` and register in `lib/data/gallery.ts`
- [ ] Set up Supabase project (see `SUPABASE_SETUP.md`)
- [ ] Update `lib/data/site-config.ts` with your actual site URL
- [ ] Test tribute form submission locally
- [ ] Verify all content in `lib/data/` files is correct

## Vercel Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)

3. **Environment Variables**
   Add these in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL, e.g., `https://your-project.vercel.app`)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

## Post-Deployment

- [ ] Test all sections on the live site
- [ ] Verify tribute form submission works
- [ ] Check mobile responsiveness
- [ ] Test modals (Directions, Livestream)
- [ ] Verify countdown timer shows correct time
- [ ] Check social sharing preview (OG image)
- [ ] Set up custom domain (optional)

## Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

## Monitoring

- Check Vercel Analytics for traffic
- Monitor Supabase dashboard for tribute submissions
- Review error logs in Vercel dashboard if issues arise

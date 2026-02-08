# Celebration of Life — Edward Owusu-Agyei

A memorial website celebrating the life of Edward Owusu-Agyei (19 August 1948 – 3 January 2026).

## Features

- **Hero Section** — Portrait, name, dates, and scripture verse
- **Order of Service** — Interactive accordion with full service details
- **Biography Timeline** — Life story told through visual timeline cards
- **Photo Gallery** — Masonry grid with lightbox viewer
- **Tribute Form** — Submit memories and condolences with photo upload
- **Tribute Wall** — Display approved tributes from visitors
- **Countdown Timer** — Service countdown with venue information
- **Directions & Livestream** — Modals with maps and streaming links

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom design system)
- **Framer Motion** (animations)
- **File-based storage** (no external database needed!)

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd eoa-memorial
```

2. Install dependencies:
```bash
npm install
```

3. Add the hero portrait image:
   - Already included: `public/images/hero/edward-owusu-agyei.jpg`

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## How Tributes Work

Tributes are stored **entirely in the app**:

- **Storage**: Tributes are saved to `lib/data/tributes.json`
- **Photos**: Uploaded photos are stored in `public/images/tributes/`
- **Approval**: Edit `lib/data/tributes.json` to set `publish_approved: true` for any tribute you want to display publicly

### Approving Tributes

1. Open `lib/data/tributes.json`
2. Find the tribute you want to approve
3. Change `"publish_approved": false` to `"publish_approved": true`
4. Save the file
5. The tribute will appear on the Tribute Wall

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main page composing all sections
│   ├── globals.css         # Tailwind + CSS variables
│   └── api/tributes/       # API routes for tribute submission
├── components/
│   ├── layout/             # Navbar, Footer, SectionDivider
│   ├── sections/           # Hero, Countdown, OrderOfService, etc.
│   ├── modals/             # DirectionsModal, LivestreamModal
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── data/               # Content data files + tributes.json
│   ├── db.ts               # File-based storage functions
│   └── utils.ts            # Utility functions
└── public/
    └── images/             # Static images + tribute photos
```

## Content Management

All content is centralized in `lib/data/`:

- `site-config.ts` — Memorial details, dates, venue, URLs
- `service-order.ts` — Order of service structure
- `biography.ts` — Life story timeline entries
- `gallery.ts` — Photo gallery images
- `tributes.json` — Submitted tributes (auto-generated)

Update these files to modify content without touching components.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy

**Note**: On Vercel, the file system is read-only except `/tmp`. For production, you may want to:
- Use Vercel KV for tribute storage (optional)
- Or commit `tributes.json` to git after each submission (manual process)
- Or use a different hosting provider that allows file writes

For now, tributes will work locally. For production, consider:
- Using Vercel KV (simple Redis-based storage)
- Or committing tributes.json to git after submissions

## Customization

### Colors

Edit `app/globals.css` and `tailwind.config.ts` to customize the color palette.

### Fonts

Fonts are configured in `app/layout.tsx`. Currently using:
- **Playfair Display** (headings)
- **Source Sans 3** (body)

### Images

- Hero portrait: `public/images/hero/edward-owusu-agyei.jpg` ✅ (already added)
- Gallery photos: Add to `public/images/gallery/` and register in `lib/data/gallery.ts`
- OG image: `public/images/og-image.jpg` (for social sharing)

## License

Private project for memorial purposes.

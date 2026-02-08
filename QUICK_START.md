# Quick Start Guide

Get the memorial site running locally in 2 minutes.

## 1. Install Dependencies

```bash
npm install
```

## 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

That's it! The hero portrait is already included, and everything works out of the box.

## How Tributes Work

Tributes are stored in `lib/data/tributes.json` - no database needed!

- Submit tributes via the form
- They're saved to `lib/data/tributes.json`
- Photos are saved to `public/images/tributes/`
- To approve a tribute for public display, edit `tributes.json` and set `publish_approved: true`

## What's Next?

- **Add gallery photos**: Place images in `public/images/gallery/` and register in `lib/data/gallery.ts`
- **Customize content**: Edit files in `lib/data/` to update memorial details
- **Deploy**: Push to GitHub and deploy on Vercel

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (18+ required)

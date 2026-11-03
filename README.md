# Kritika Upadhyay · portfolio

Built with [Astro](https://astro.build). Deployed on Vercel.

## Run it locally
```
npm install
npm run dev
```

## Structure
- `src/pages/index.astro`: the home page, assembled from components
- `src/components/`: Cursor, Starfield, Nav, Hero (first fold), Work (second fold), Footer (third fold)
- `src/layouts/Base.astro`: shared page shell (fonts, meta, background)
- `src/styles/global.css`: all styles
- `public/`: static files (favicon, résumé PDF)
- `astro.config.mjs`: add redirects for future landing pages here

## Still to fill in
- Dates on the work cards (`[MON YY]` in `src/components/Work.astro`)
- What the Fork number ("partners" in `Work.astro`)
- Instagram and Twitter links, résumé link (top of `src/components/Footer.astro`)
- Résumé PDF: add `public/resume.pdf`, then set `RESUME = '/resume.pdf'`

# Kritika Upadhyay · portfolio

Live at [kritikal.work](https://www.kritikal.work). Built with [Astro](https://astro.build), deployed on Vercel.

## Run it locally
```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Live routes
| Route | What it is | File |
|---|---|---|
| `/` | The one-time intro ("oh, you came!"). When the page has turned, the address becomes `/home` | `src/pages/index.astro` |
| `/home` | Home: the desk, with the postcard and the Contents cutouts, no intro. Every Back link comes here | `src/pages/home.astro` (renders `index.astro` without the intro) |
| `/work` | Proof of work: folders and film-strip cards | `src/pages/work.astro` |
| `/work/<slug>` | One page per case study | `src/pages/work/[slug].astro`, data in `src/data/cases/` |
| `/substack` | She Substacks (typewriter) | `src/pages/substack.astro` |
| `/contact` | Contact: where to find her, plus FAQs | `src/pages/contact.astro` |
| `/playground` | Things I do for fun | `src/pages/playground.astro` |
| `/recommendations` | Coffee recommendations (`/recommendations/list` is the plain list) | `src/pages/recommendations.astro` |
| `/roadmap` | The journey | `src/pages/roadmap.astro` |
| anything else | The 404 page | `src/pages/404.astro` |

Redirects (set in `astro.config.mjs`): `/jobs` → `/work`, `/journey` → `/roadmap`, `/coffee` → `/recommendations`, `/substacks` → `/substack`.

Removed, now showing the 404 page: `/work/who-nexus-is-for` (Nexus case study taken down, code commented out; see `src/data/cases/index.ts`, `src/pages/work.astro`, `astro.config.mjs`), `/icp-nexus`, `/work/icp-positioning-messaging-nexus`, `/home-redo`, `/work-redo`, `/home-revamp`, `/lets-talk`.

To add a case study: add it to `src/data/cases/` and to `CASES` and `FOLDERS` at the top of `src/pages/work.astro`.

## The old website (archived, still deployed)
The previous portfolio (dark starfield home, "See my work" hero, story thread, footer) was taken off the main routes when the new home went live. Its code is kept in the repo and it is still deployed under `/archive/`, hidden from search engines (`noindex`).

| Archived page | Deployed at | Where the code is | Was live at |
|---|---|---|---|
| Old home | [`/archive/old-home`](https://www.kritikal.work/archive/old-home) | `src/pages/archive/old-home.astro` | `/` and `/home` |
| Nexus case study (dummy draft) | [`/archive/nexus-draft`](https://www.kritikal.work/archive/nexus-draft) | `src/pages/archive/nexus-draft.astro` | `/nexus` |

The old site's building blocks (layout, global styles, Nav, Footer, Hero, StoryThread, Doodles, Milestone, Board, and the unused Cursor, Starfield, Venn, Work) live in `src/archive/`.

Note: links inside the archived home (Home, See my work) point at the new site's `/` and `/work`.

### Run the old site for reference
```
npm install
npm run dev
```
then open http://localhost:4321/archive/old-home

### Get the exact pre-launch code
Everything as it was before the switch (including the in-between `/home-revamp` desk, which was removed rather than archived) is saved in the git tag `archive/pre-go-live`:
```
git checkout archive/pre-go-live
npm install && npm run dev      # old home at /, /home and /home-revamp
```
Switch back with `git checkout main`.

## Structure
- `src/pages/`: one file per route (each new page is self-contained: its own markup, styles and script)
- `src/components/`: shared pieces used by the live site (`Analytics`, `CaseStudy`, `CaseBlocks`)
- `src/archive/`: the old site's components, layout and styles
- `public/`: images, fonts, résumé PDF, favicon, `sitemap.xml`

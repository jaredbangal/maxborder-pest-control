# Maxborder Pest Control

**Live:** https://maxborder-pest-control.vercel.app
**Repo:** https://github.com/jaredbangal/maxborder-pest-control (private)

Marketing site and lead-capture system for Maxborder Pest Control.
React + Vite frontend, Node/Express API, SQLite persistence.

**Design direction — "The Perimeter."** The brand name carries the idea, so the
whole site is built on it: a defended boundary line. Dashed survey rules that
draw themselves in on scroll, corner ticks bracketing cards like a surveyed
plot marker, and a hero graphic of a house inside a treated ring. Warm cream
paper with a real grain texture, Archivo Black display type matching the logo
wordmark, and burnt orange against deep navy.

### Day / night

A toggle sits at the top right of the header (and inside the mobile drawer).
Three states, not two: an explicit **light** or **dark** choice is remembered in
`localStorage`, and the default **system** follows the OS — so if your Mac
flips to dark at sunset, the page follows without a reload. An explicit choice
always beats the OS setting.

The theme is applied by a small inline script **before first paint**, so dark
users never get a white flash. That script has to be inline to work, so instead
of loosening the CSP the server hashes whatever inline scripts are in the built
`index.html` at boot and allows exactly those — the hashes can't drift out of
sync with the markup.

Sections that are *deliberately* dark (process, CTA, footer) use a separate
`inverse` / `on-inverse` token pair rather than borrowing `ink` / `cream`.
Those two swap between themes; the inverse pair does not, so those sections
stay dark at night instead of flipping to a blinding cream slab.

### Palette

| Token | Value | Where it goes |
|---|---|---|
| `--color-cream` | `#F4EEE0` | Page ground |
| `--color-ink` | `#12203A` | Deep navy — all body text and dark sections |
| `--color-orange` | `#C2410C` | Buttons, accents on light ground |
| `--color-orange-bright` | `#E8823A` | Accents **on navy only** |
| `--color-muted` | `#4E525A` | Secondary text |
| `--color-danger` | `#B3261E` | Form validation errors **only** |
| `--color-inverse` | `#12203A` → `#1E2C3C` | Always-dark sections, both themes |
| `--color-on-inverse` | `#F4EEE0` | Text on those sections |

The orange is deliberately deep. Brighter oranges (`#EA580C` and up) look
appealing in isolation but only manage ~3.5:1 behind white text, so every
button built on them fails AA. `#C2410C` clears it at 5.18:1.

`--color-orange-bright` exists because the primary orange only reaches 3.14:1
on navy. It is 5.94:1 there — but just 2.36:1 on cream, so it must never appear
on a light surface.

---

## Quick start

```bash
npm install
npm approve-scripts esbuild   # one-time: Vite needs the esbuild binary
cp .env.example server/.env   # then fill in ADMIN_API_KEY

npm run dev                   # API on :4000, site on :5173
```

Open <http://localhost:5173>. Vite proxies `/api` to the backend, so dev runs
same-origin and behaves like production.

### Production

```bash
npm run build     # builds the client into client/dist
npm start         # Express serves the API *and* the built SPA on one origin
```

When `client/dist` exists the API serves it, with SPA history fallback so deep
links like `/services/rodent-control` resolve. Hashed assets get a one-year
cache; `index.html` is always revalidated.

---

## Layout

```
api/index.js                  Vercel serverless entry (exports the Express app)
vercel.json                   Build + routing config for Vercel

client/                       React 18 + Vite 6 + Tailwind v4 + TypeScript
  src/
    styles/index.css          Design tokens (@theme) + brand motif + motion
    components/ui/            Primitives: Button, Field, Accordion, Rail, Reveal…
    components/layout/        Header, Footer, MobileNav, MobileCallBar, PageHero
    components/sections/      Page sections: Hero, Process, PestCategories, QuoteForm…
    pages/                    Route components
    hooks/index.ts            useInView, useCountUp, useScrollHeader, useAsync…
    lib/                      api client, types, SiteContext, constants

server/                       Node 22+ / Express 4 (ESM)
  src/
    index.js                  App wiring, error handling, SPA serving, shutdown
    security.js               Helmet CSP, CORS allowlist, rate limits, admin auth
    validation.js             Zod schemas for every write endpoint
    db.js                     node:sqlite schema + prepared statements
    data/content.js           All site copy, services, plans, pests, FAQs
    routes/                   content.js, leads.js, admin.js
    app.js                    Express app (no listen — reused by serverless)
    store.js                  Picks a storage backend at boot
    store.sqlite.js           Durable, used when real disk is available
    store.memory.js           Non-persistent fallback for serverless/demo
```

There is **no native dependency** — persistence uses Node's built-in
`node:sqlite`, so `npm install` never compiles anything.

### Storage

`store.js` chooses a backend at startup. SQLite needs two things serverless does
not give you — a writable durable filesystem, and (on Node 22) the
`--experimental-sqlite` flag — so on Vercel it falls back to an explicitly
non-persistent in-memory store. Forms still validate and respond correctly;
nothing pretends to be saved. The site shows a discreet footer note whenever
the active store is non-durable, driven by the API rather than a build flag, so
it disappears by itself once a real database is wired in.

---

## API

| Method | Route | Notes |
|---|---|---|
| `GET` | `/api/health` | Liveness probe, exempt from rate limits |
| `GET` | `/api/bootstrap` | **Everything the SPA needs, in one round trip** |
| `GET` | `/api/services` · `/api/services/:slug` | Service list / detail |
| `GET` | `/api/plans` · `/api/pests` · `/api/pest-categories` · `/api/faqs` · `/api/testimonials` · `/api/process` | Individual resources |
| `GET` | `/api/coverage/:zip` | Powers the hero ZIP checker |
| `POST` | `/api/quote` · `/api/contact` · `/api/callback` | Lead capture |
| `POST` | `/api/subscribe` | Newsletter |
| `GET` | `/api/admin/leads` | Requires `X-Admin-Key`; paginated |

```bash
# Read captured leads
curl -H "X-Admin-Key: $ADMIN_API_KEY" localhost:4000/api/admin/leads
```

Content is served from the API rather than bundled, so copy and pricing can be
edited in `server/src/data/content.js` and picked up on restart — no rebuild.

---

## Security

- **Helmet CSP** — `script-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`;
  HSTS with preload in production. Verified against the real production build.
- **CORS allowlist** from `CORS_ORIGINS`; unlisted origins are refused and logged.
- **Rate limiting** — 1000 reads / 15 min (offices share one NAT address, and
  reads are cacheable) and **10 writes / hour**, which is the limit that matters.
- **Zod validation** on every write: control characters stripped, lengths
  capped, enums closed, 32kb body ceiling.
- **Honeypot** field returns the ordinary success response, so bots do not learn
  they were caught.
- **Parameterised SQL** everywhere — no string-built queries.
- **No raw IPs stored.** Only a salted SHA-256 prefix, enough to spot repeat abuse.
- **Admin auth** hashes both keys before `timingSafeEqual`, so neither the value
  nor its length leaks through response timing. The server refuses to boot in
  production without `ADMIN_API_KEY` set.
- `npm audit` — **0 vulnerabilities**.

---

## Accessibility

Verified with automated sweeps, not assumed:

- **Contrast measured from rendered pixels**, not computed styles — the cream
  surfaces carry a `mix-blend-mode: multiply` grain that a CSSOM checker sees
  straight through. Headings **14.03:1**, body **6.72:1**, white-on-orange
  buttons **5.18:1**. Alpha floors are documented next to the tokens in
  `styles/index.css`.
- No horizontal overflow at **320 / 360 / 390 / 768 / 1440** or landscape phone.
- **All interactive targets ≥ 44px** at 320px wide.
- Full keyboard path: skip link first, visible focus rings, arrow-key stepper,
  drawer traps focus, Escape closes it and returns focus to the trigger.
- `prefers-reduced-motion` verified to leave **zero** content stuck invisible —
  the failure mode of every scroll-reveal system.
- Every field has a real `<label>`; errors use `role="alert"` and the first
  rejected field takes focus.
- Unique `<title>` and description per route, one `<h1>`, no heading skips.
- `<noscript>` fallback gives the phone number and address when JS is off.

---

## Deployment

Live at **https://maxborder-pest-control.vercel.app**, deployed from the repo
root. The GitHub repo is connected, so pushes to `main` redeploy automatically;
`vercel --prod` deploys manually.

Two things that will bite on a fresh clone if you touch them:

- `api/index.mjs` **must** keep the `.mjs` extension. The repo-root
  package.json has no `"type": "module"`, so a `.js` file there loads as
  CommonJS and every `/api` request fails.
- The CSP for the static HTML lives in `vercel.json` with literal script
  hashes. `npm run build` verifies them and fails with the correct value if the
  inline theme script changes.
 `vercel.json` builds the client to
`client/dist` and serves it statically, routes `/api/*` to the Express app via
`api/index.js`, and rewrites everything else to `index.html` for SPA routing.

**Leads are not stored on the Vercel deployment** — see Storage above. To make
lead capture durable, either set the `SMTP_*` and `LEAD_NOTIFY_TO` variables in
the Vercel project (each submission then emails you) or move to a hosted
Postgres and swap in a new backend behind the same `store.js` interface.

## Handover — decisions that need you

These need real business input; placeholders are in place and clearly marked.

0. **Error red.** Form validation uses `--color-danger` (`#B3261E`), which is
   the one red left on the site. Errors are deliberately not the brand orange —
   on an orange-accented page an orange error reads as ordinary emphasis rather
   than a problem. It only ever appears on an invalid field. If you want it gone
   too, change that single token in `client/src/styles/index.css`.
1. **Phone, email, address** — `(888) 629-7378` / `hello@maxborderpest.com` /
   the Austin address are invented. Real values go in `server/src/data/content.js`
   (and the `PHONE`/`EMAIL` constants in `client/src/lib/constants.ts`, plus the
   JSON-LD block in `client/index.html`).
2. **Pricing** — the $49 / $89 / $139 tiers and per-service prices are plausible
   placeholders, not your numbers.
3. **Testimonials** — written as realistic examples. **Replace before launch;
   publishing invented reviews as real ones is a legal problem, not just an
   editorial one.**
4. **Credentials** — the BBB / QualityPro / GreenPro badges and TDA licence
   `#TX-40219` are placeholders. Only display accreditations you actually hold.
5. **Coverage lookup** — `/api/coverage/:zip` currently treats Texas ZIPs
   (75000–79999) as in-network. Swap in your real service-area list.
6. **Photography** — the site ships asset-free by design (the hero is SVG). Real
   technician and property photos would lift it further; the layouts leave room.
7. **Email delivery** — lead notifications are logged until SMTP is configured.
   Set `SMTP_*` and `LEAD_NOTIFY_TO` in `.env` to turn them on.
8. **Legal pages** — Privacy, Terms, Accessibility and Sitemap links currently
   point at `/`. They need real content before launch.

## Operational notes

- SQLite is a genuinely good fit at this volume, but it is a single file on one
  disk. **Back up `server/data/maxborder.db`** — it holds every lead.
- Behind a proxy or load balancer, set `TRUST_PROXY=true` so rate limiting sees
  real client IPs rather than the proxy's.

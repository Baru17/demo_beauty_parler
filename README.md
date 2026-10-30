# AURELLE — Unisex Hair & Beauty Studio

A premium, single-page demo website for a **fictional** unisex salon in
Ramanathapuram, Tamil Nadu. Built as a client-acquisition demo: editorial
layouts, warm neutrals, champagne accents, and a fully responsive component
system.

> **This is a demonstration, not a live business.** AURELLE does not exist. No
> real address, phone number, email, opening hours, staff, awards, ratings or
> reviews are included. Any booking submitted through the site stays in the
> browser and books nothing.

---

## Stack

- React 18 + Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Lucide React icons
- CSS animations + IntersectionObserver reveals
- Self-hosted fonts via `@fontsource` (Cormorant Garamond + Jost)
- No router — deliberate single-page hash navigation
- `sharp` as a **dev-only** dependency for the image pipeline

---

## Quick start

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

To regenerate the optimised photography (optional, needs network access):

```bash
node scripts/build-images.mjs
```

---

## Project structure

```
public/
  images/           24 optimised WebP images (+ small variants) and og.webp
  favicon.svg
  _headers          Cloudflare Pages cache + security headers
src/
  components/       Page sections and shared UI
  config/
    businessConfig.js   ← single source of truth for all content
  hooks/            Booking context, focus trap, scroll lock, scroll spy
  lib/              Booking transport + date/time helpers
  pages/Home.jsx    Section composition
  styles/index.css  Design tokens, typography, components, motion
  App.jsx
  main.jsx
index.html          SEO / Open Graph / JSON-LD / font preload
scripts/
  build-images.mjs  Pexels download → warm grade → crop → WebP
```

---

## Customising for a real salon

### 1. Business details

Everything user-facing lives in `src/config/businessConfig.js`. Start with:

```js
name, wordmark, subtitle, tagline, shortDescription, announcement
location: { city, region, country, display }
```

Then add only **verified** values:

```js
contact: {
  phone: '+91 ...',        // used for tel: links
  phoneDisplay: '+91 ...', // optional formatted label
  email: 'hello@...',
  address: '...',
  instagram: 'https://instagram.com/...', // or @handle
  whatsapp: '91...',       // digits only, country code included
  mapsUrl: 'https://maps.google.com/...',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
},
hours: [{ days: 'Monday – Saturday', time: '10:00 – 20:00' }],
social: { instagram: '', facebook: '', youtube: '' },
```

The UI is conditional: unconfigured fields show neutral “will be updated”
messages instead of invented details, and the map falls back to a branded
placeholder until `mapsEmbedUrl` is supplied.

### 2. Pricing

`pricing.showPrices` is `false` by default, so services display “On request”.
The `samplePrice` values are illustrative only. Once real rates are confirmed:

```js
pricing: {
  showPrices: true,
  currency: 'INR',
  note: 'Prices may vary with hair length and product choice.',
  onRequestLabel: 'On request',
}
```

### 3. Services, gallery, values, testimonials

All are arrays in `businessConfig.js`:

- `services` — four categories, each with `items` (`name`, `description`, `samplePrice`)
- `experiences` — the three featured experiences (also drive the accessible tab list)
- `gallery.items` + `galleryCategories` — captions and filters
- `values` — the six “Why AURELLE” promises (Lucide icon names)
- `testimonials.items` — currently sample quotes labelled “Sample review”

If you do not have verified reviews, leave `testimonials.enabled` as `true` but
keep the sample labels; replacing them with invented reviews would be
misleading. Set `enabled: false` to remove the section entirely.

### 4. Photography

Replace files in `public/images`. Keep the same names **or** update the `images`
map (including `width`, `height`, `smallWidth`, `src`, `small`, `alt`). Keep each
slot's aspect ratio so layouts do not shift:

| Slot group | Aspect |
| --- | --- |
| Hero, about, service and featured images | 4:5 |
| About detail | 1:1 |
| Landscape gallery images | 4:3 |
| Portrait gallery images | 3:4 |

Images are served as WebP with `srcset`/`sizes`, explicit dimensions, lazy
loading and a branded fallback for missing files. The hero image is preloaded.

To rebuild from the current Pexels selection, edit `SLOTS` in
`scripts/build-images.mjs` and run `node scripts/build-images.mjs`. Credits and
sources are in [`CREDITS.md`](./CREDITS.md).

### 5. Booking integration

The form is **demo-only** by default:

```js
booking: {
  demoMode: true,
  endpoint: '',
  whatsappNumber: '',
  timeSlots: ['10:00', ...],
  disclaimer: 'Demo mode — your enquiry is not transmitted or booked.',
}
```

To connect a backend, set `demoMode: false` **and** provide an endpoint:

```js
booking: {
  demoMode: false,
  endpoint: 'https://your-worker.example.com/enquiries',
  ...
}
```

`submitEnquiry()` in `src/lib/booking.js` POSTs JSON:

```json
{
  "name": "…",
  "phone": "…",
  "email": "…",
  "category": "Hair",
  "service": "Haircut & Styling",
  "date": "2026-11-04",
  "time": "11:00",
  "message": "…"
}
```

Any `2xx` response is treated as success. The endpoint must handle validation,
spam protection and delivery (email, CRM, Google Sheets, etc.) itself.

To offer a WhatsApp hand-off, set `booking.whatsappNumber` to digits including
the country code (for example `919876543210`). A “Send via WhatsApp” action then
appears on the success screen and opens `wa.me` with a prefilled message. It is
only sent when the visitor presses it.

**Still required for production:** live availability and slot conflict checks,
email/SMS delivery, spam protection (Turnstile/reCAPTCHA or rate limiting), a
privacy notice, and a real confirmation workflow.

### 6. SEO and sharing

Update `index.html`: title, description, canonical URL and Open Graph/Twitter
tags. For social sharing, `og:image` should be an **absolute** URL:

```html
<meta property="og:image" content="https://your-domain.com/images/og.webp" />
```

`src/config/businessConfig.js` also contains a `seo` block used as reference.
The structured data is intentionally limited to `WebSite`; add `LocalBusiness`
only after the address, phone and hours are real and verified.

### 7. Colours, type and spacing

Design tokens live in `@theme` and the component layer of
`src/styles/index.css`:

```css
--color-ivory: #f8f5f0;
--color-charcoal: #191919;
--color-champagne: #c8a978;
--color-champagne-deep: #8a6a3c;
--color-beige: #e8ded1;
--color-warmgrey: #665f58;
```

Typography is Cormorant Garamond (display) + Jost (UI/body). Replace the
`@fontsource` imports and `--font-display` / `--font-sans` tokens to change it.

---

## Deploying to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push the project to GitHub or GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or 20 (`NODE_VERSION` env var if needed)
4. Deploy. `public/_headers` is copied into `dist` and applies long-lived
   immutable caching for `/images/*` and `/assets/*`.
5. Add a custom domain under **Custom domains**.

### Option B — Direct upload with Wrangler

```bash
npm run build
npx wrangler pages deploy dist --project-name aurelle-demo
```

The site is a single page using hash anchors, so no SPA rewrite rule is needed.
If you later add real routes, add a `_redirects` file with `/* /index.html 200`.

---

## What is demo-only (and needs real integration)

| Area | Current state | Needed before launch |
| --- | --- | --- |
| Contact details | Empty; neutral placeholders | Verified phone, email, address |
| Map | Branded placeholder | Google Maps embed or link |
| Opening hours | Empty; “will be updated” | Real hours, holiday notes |
| Booking | Validates + simulates, sends nothing | Endpoint, delivery, availability, spam protection |
| Prices | Hidden (“On request”) | Verified rate card; enable `showPrices` |
| Testimonials | Sample quotes, visibly labelled | Real reviews with permission |
| Gallery | Licensed stock, visibly labelled | Salon's own photography |
| Social links | Hidden until configured | Real profiles |
| Team / awards / stats | Intentionally omitted | Verified facts only |
| Payments | None | Deposit or payment provider |
| Analytics / consent | None | Privacy policy + consent if required |

---

## Accessibility & performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`,
  logical heading order, skip link.
- Keyboard-accessible filters, tabs (arrow/Home/End), lightbox (arrows/Escape),
  mobile drawer and booking dialog (focus trap + focus restore).
- Visible focus styles, labelled fields, inline validation with `aria-invalid`,
  live error messages, and status focus on submit.
- `prefers-reduced-motion` disables reveals, smooth scroll and long transitions.
- Colour tokens were checked against WCAG AA; the page passes an axe
  (WCAG 2.1 A/AA) scan with no reported violations in the page, booking modal,
  success screen, lightbox and mobile drawer.
- Responsive images with explicit dimensions, WebP, lazy loading below the fold,
  preloaded hero, self-hosted fonts and a small JS bundle.
- No layout shift from images; decorative overflow is clipped.

Verified at 320, 360, 390, 430, 768, 834, 1024, 1180, 1280, 1440 and 1920 px
wide with no horizontal page overflow. Production build was also exercised via
`npm run preview`.

---

## Credits

Photography: [Pexels](https://www.pexels.com/) under the
[Pexels License](https://www.pexels.com/license/). Full per-image sources are in
[`CREDITS.md`](./CREDITS.md).

Fonts: Cormorant Garamond and Jost via Fontsource, licensed under the SIL Open
Font License.

Icons: [Lucide](https://lucide.dev/) (ISC License).

---

## Usage note

This template is provided for demonstration and client presentations. Replace
all sample content, stock photography and placeholder claims with verified
business information before publishing it as a real salon website.

# Voltage Collective

> Sound. Pixels. Power.

A production-grade, mini electronics showcase store built with Next.js 15, TypeScript (strict), and Tailwind CSS. Voltage Collective is a fictional editorial electronics studio — twelve curated products, an opinionated catalog, and a deliberate, magazine-style aesthetic.

This is a portfolio / showcase project. Cart and auth are local-only (localStorage); checkout is mocked.

---

## Tech stack

| Layer        | Choice                                                   |
| ------------ | -------------------------------------------------------- |
| Framework    | **Next.js 15** (App Router, RSC by default)              |
| Language     | **TypeScript 5.6** — strict mode, every flag on          |
| Styling      | **Tailwind CSS 3.4** + a small layer of custom utilities |
| Fonts        | Instrument Serif (display) · Hanken Grotesk · JetBrains Mono — loaded via `next/font` |
| Data         | Static local JSON (`src/data/products.json`)             |
| State        | React Context + `useReducer` (Cart, Auth)                |
| Persistence  | `localStorage` for cart + mock auth                      |
| Images       | `next/image` with Unsplash remote patterns               |
| SEO          | Next.js Metadata API + JSON-LD + dynamic sitemap/robots  |

No Redux, no Zustand, no SWR, no UI library. Every component is hand-rolled.

---

## Features

### Pages
- **Home** — hero, scrolling marquee, featured products, why-us grid, dark CTA.
- **Catalog** (`/products`) — typed client-side filtering (search, category, price ceiling, sort) with empty-state handling and a sticky sidebar.
- **Product Detail** (`/products/[id]`) — dynamic route with `generateStaticParams`, per-page metadata, JSON-LD Product schema, related products.
- **Cart** (`/cart`) — add/remove, quantity stepper, totals (subtotal, shipping, tax, free-shipping threshold), persistent across sessions.
- **Sign-in** (`/login`) — lightweight mock auth (name + email → user). Required to "checkout".
- **Studio** (`/about`) — editorial brand story with timeline.
- **Contact** (`/contact`) — typed form, client-side validation, success state.
- **404** — branded not-found pages at the root and product level.

### UX / Design
- Editorial, magazine-like layout — numbered sections, italic serif headlines, mono labels for everything technical.
- Bone/ink/signal-orange palette with a subtle paper-grain overlay (SVG noise, ~4.5% opacity).
- Responsive across mobile / tablet / desktop with a custom mobile menu.
- Subtle motion: staggered hero entrance, marquee, hover reveals — no library, just CSS keyframes.

### Engineering
- **Strict TypeScript** — `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noUnusedLocals`, etc.
- **No `any`** anywhere in the codebase.
- **DRY / KISS / YAGNI** — small focused components, single responsibility, no premature abstraction.
- Reusable primitives — `Button`, `Input`, `Modal`, `Badge`, `Rating`, `EmptyState`, `SectionHeader`.
- Server components by default; `"use client"` only where state or browser APIs are needed.
- All async functions and data accessors are explicitly typed.

### Accessibility
- Semantic HTML5 (`header`, `main`, `nav`, `section`, `article`, `aside`).
- Visible focus rings on every interactive element (`:focus-visible` + signal orange).
- ARIA labels on icon-only buttons, image-only links, and rating widgets.
- Skip-to-content link, keyboard-dismissible modal, `aria-live` quantity readouts.
- Proper heading hierarchy on every page.

### SEO
- Dynamic `metadata` per page via the Next.js Metadata API (title template, description, canonical, Open Graph, Twitter).
- JSON-LD `Product` schema on every product detail page.
- Auto-generated `sitemap.xml` (static + dynamic product routes).
- `robots.txt` with sensible defaults (cart/login disallowed).
- `metadataBase` set so `next/image` and OG images resolve to absolute URLs.
- Semantic markup so search engines can parse without JS.

### Performance
- `next/image` for every product image (responsive `sizes`, lazy by default, `priority` for above-the-fold).
- Self-hosted Google fonts via `next/font` (no FOIT, no extra DNS).
- Server components keep the JS bundle small — only Cart, Auth, listing filters, forms, and the mobile menu ship JS.
- Static product pages via `generateStaticParams` (every product detail page is pre-rendered).
- No client-side data fetching for catalog data — JSON is imported at build.

---

## Folder structure

```bash
src/
├── app/                       # Next.js App Router pages, metadata, sitemap, robots
│   ├── about/
│   ├── cart/
│   ├── contact/
│   ├── login/
│   ├── products/
│   │   └── [id]/              # Dynamic product detail with generateStaticParams
│   ├── layout.tsx             # Root layout — fonts, providers, navbar, footer
│   ├── page.tsx               # Home
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── auth/                  # LoginForm
│   ├── cart/                  # CartItem, CartSummary, CartView
│   ├── contact/               # ContactForm
│   ├── home/                  # Hero, FeaturedProducts, WhyChooseUs, CTA
│   ├── layout/                # Navbar, Footer, Marquee
│   ├── product/               # ProductCard, ProductGrid, FilterSidebar, ProductSearch, ProductDetailView, RelatedProducts, AddToCartButton, ProductListing
│   └── ui/                    # Button, Input, Modal, Badge, Rating, EmptyState, SectionHeader
├── constants/                 # categories, routes, site, storage keys
├── context/                   # AuthContext, CartContext, Providers
├── data/                      # products.json — single source of truth
├── hooks/                     # useDebounce, useProductFilters
├── lib/                       # products, cart, format — pure business logic
├── styles/                    # globals.css
├── types/                     # product, cart, auth, index
└── utils/                     # cn, storage
```

---

## Setup

```bash
# 1. install
npm install

# 2. dev
npm run dev
# → http://localhost:3000

# 3. type-check
npm run type-check

# 4. lint
npm run lint

# 5. build + start
npm run build
npm start
```

### Requirements
- Node.js **18.18+** (Next.js 15 requirement)
- npm 9+

---

## Scripts

| Script               | What it does                                  |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start the dev server with HMR                 |
| `npm run build`      | Production build (static where possible)      |
| `npm start`          | Run the production build                      |
| `npm run lint`       | Run the Next.js ESLint config                 |
| `npm run type-check` | `tsc --noEmit` against the strict tsconfig    |

---

## Design system

| Token       | Value                 | Use                                      |
| ----------- | --------------------- | ---------------------------------------- |
| `bone`      | `#F2EDE3`             | Page background                          |
| `bone-2`    | `#EAE3D4`             | Surfaces, marquee bg                     |
| `ink`       | `#111111`             | Primary text, dark CTA                   |
| `muted`     | `#6B6A63`             | Secondary text, mono labels              |
| `signal`    | `#FF3D00`             | Accent — links, highlights, primary CTAs |
| `hairline`  | `rgba(17,17,17,0.12)` | Borders, dividers, range track           |

Type:
- **Display** — Instrument Serif, italic by default (variable `--font-display`).
- **Body** — Hanken Grotesk (variable `--font-sans`).
- **Mono** — JetBrains Mono (variable `--font-mono`) for labels, prices, IDs.

---

## AI usage

This project was scaffolded end-to-end with Claude (Anthropic's CLI). The AI:

- **Architected the folder structure** to satisfy the deliverables: `app/`, `components/{ui,layout,product,cart,home,contact,auth}`, `context/`, `hooks/`, `lib/`, `types/`, `constants/`, `data/`, `utils/`, `styles/`.
- **Wrote every interface and type first** (`src/types/`) and only then implemented the runtime — there are no `any`, no implicit returns, and the tsconfig has the full strict-mode bundle enabled (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.).
- **Designed the aesthetic** (bone + ink + signal-orange, italic serif display, mono details, paper-grain overlay) and committed to it across every page rather than mixing styles.
- **Generated the product data** (12 items across 5 categories) with consistent shape: id, slug, copy, price, image, rating, stock, highlights, specs.
- **Composed reusable primitives** for everything that repeats (cards, badges, ratings, empty states, section headers), instead of inlining the same JSX in multiple pages.
- **Implemented SEO** with the Next.js Metadata API, JSON-LD on product pages, a dynamic sitemap, and a robots.txt — and double-checked that every page exports `metadata` with a canonical and an Open Graph entry.

The human (you) decides what to ship and what to throw away. The catalog data, copy, and direction are editorial choices made for this showcase; rotate them to taste before sending to production.

---

## License

MIT — this is a showcase repository, fork it freely.

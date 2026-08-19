# Maison Elara — Luxury Leather Bag Atelier

A luxury women's leather bag brand storefront built with Next.js (App Router), TypeScript, and Tailwind CSS. The storefront is designed with a quiet luxury Parisian atelier aesthetic, featuring bespoke Cormorant Garamond typography, warm neutral palettes, interactive product galleries, client-side filtering, and direct WhatsApp concierge integration.

---

## 1. Data Architecture (`/data` Folder)

The entire storefront is content-driven through structured JSON files in the `/data/` directory:

- `products.json`: Catalog of all leather bags, SKU, pricing, MRP, multi-image galleries, specifications, and variant definitions (color swatches, buttons, dropdowns).
- `categories.json`: Product categories with slugs, descriptions, navigation visibility, and SEO tags.
- `collections.json`: Curated editorial collections (Signature, Everyday Luxury, The Evening Edit, Atelier Edit).
- `banners.json`: Hero carousel banners with copy, CTAs, text placement, and active scheduling.
- `testimonials.json`: Verified client quotes and reviews rendered in the infinite marquee.
- `faqs.json`: Grouped accordion FAQs covering ordering, payments, insured shipping, returns, and leather care.
- `pages.json`: Dynamic CMS pages (About Us, Leather Care Guide, Shipping & Returns).
- `settings.json`: Global atelier settings, business details, currency, WhatsApp templates, announcements, and theme tokens.
- `seo.json`: Global site title, description, OpenGraph images, and robot meta tags.

---

## 2. Adding & Managing Images

Refer to [`PHOTO_GUIDE.md`](./PHOTO_GUIDE.md) for full instructions on image dimensions, WebP compression, and directory hierarchies.

- Place product photographs in `public/uploads/products/[product_id]/`
- Place collection covers in `public/uploads/collections/`
- Reference these relative paths directly in `data/products.json` or `data/collections.json`

---

## 3. Local Development & Building

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile static export
npm run build
```

The static output will be generated in the `out/` directory.

---

## 4. Cloudflare Pages Deployment Settings

When deploying to **Cloudflare Pages**:

| Configuration | Value |
|---|---|
| **Framework Preset** | Next.js (Static HTML Export) |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `out` |
| **Node.js Version** | `20.x` (or `18.x`+) |

---

## 5. Automated Data Sync (BazaarKit / GitHub)

For decoupled content editing where BazaarKit Desktop commits changes directly to GitHub, update `lib/data.ts` to fetch from raw GitHub URLs. See deployment documentation for the fetch implementation.

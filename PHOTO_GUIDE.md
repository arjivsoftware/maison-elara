# Maison Elara — Product Photo & Asset Guide

This guide explains how to format, organize, and upload product photographs and visual assets for the Maison Elara storefront.

---

## 1. Directory Structure

Place all product images inside the `public/uploads/` directory:

```
public/
  uploads/
    products/
      prod_1722000000001/
        01.webp  (Primary / Thumbnail)
        02.webp  (Hardware / Detail)
        03.webp  (Interior view)
        04.webp  (Side profile / Lifestyle)
      prod_1722000000002/
        ...
    collections/
      col_1722000000001.webp
      col_1722000000002.webp
    banners/
      hero-editorial.webp
```

---

## 2. Recommended Dimensions & Format

| Asset Type | Recommended Ratio | Ideal Dimensions | File Format |
|---|---|---|---|
| **Product Photos** | 1:1 Square | 1200 &times; 1200 px | WebP or JPEG |
| **Collection Cards** | 4:5 Portrait / Tall | 1000 &times; 1250 px | WebP or JPEG |
| **Hero Banners** | 16:9 Landscape | 1920 &times; 1080 px | WebP or JPEG |

---

## 3. Linking Images in JSON

In `data/products.json`, reference the image paths:

```json
"images": [
  {
    "url": "public/uploads/products/prod_1722000000001/01.webp",
    "alt": "Maison Noir Structured Tote in black Italian leather",
    "sortOrder": 0
  },
  {
    "url": "public/uploads/products/prod_1722000000001/02.webp",
    "alt": "Maison Noir Tote gold hardware detail",
    "sortOrder": 1
  }
],
"thumbnail": "public/uploads/products/prod_1722000000001/01.webp"
```

The application's `resolveImageUrl()` utility automatically resolves paths starting with `public/` to valid web root URLs (e.g. `/uploads/products/...`).

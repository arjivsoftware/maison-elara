# GitHub → Cloudflare Pages Deployment Setup

Your Next.js ecommerce project is configured for **static export**, which works perfectly on Cloudflare Pages free plan.

---

## Files Included

| File | Purpose |
|------|---------|
| `next.config.ts` | Cleaned up — `output: 'export'` + `unoptimized: true` |
| `.gitignore` | Proper ignores for Next.js + Cloudflare |
| `public/_headers` | Cache rules + security headers |
| `public/_redirects` | 404 fallback for Cloudflare Pages |
| `.github/workflows/deploy.yml` | Auto-deploy on every `git push` |

---

## Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2 — Create Cloudflare Pages Project

**Option A — Dashboard (simplest, no GitHub Actions needed):**

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages**
2. Connect GitHub → select your repo
3. Set build settings:
   - **Framework preset:** `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Click **Save and Deploy**

Every `git push` to `main` will now auto-deploy. ✅

**Option B — GitHub Actions (more control):**

Use the `.github/workflows/deploy.yml` included. Then:

1. Create a Cloudflare API Token:
   - Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - **Create Token** → use template **"Edit Cloudflare Workers"**
   - Copy the token

2. Find your Account ID:
   - Cloudflare dashboard → right sidebar on any page

3. Add secrets to GitHub:
   - Your repo → **Settings** → **Secrets and variables** → **Actions**
   - Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`

4. Edit `deploy.yml`:
   - Replace `your-project-name` with your Cloudflare Pages project name

---

## Step 3 — Add Your Custom Domain (Free)

1. Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g. `myshop.com`)
3. If your domain DNS is already on Cloudflare: it's done in ~1 minute
4. If not on Cloudflare DNS: add the CNAME record your domain registrar

---

## Important Notes

- **JSON data files** in your `data/` folder are included in the static export automatically — no special config needed.
- **No API routes** will work on Cloudflare Pages free plan. If you have any `route.ts` API handlers, they need to move to an external service or be removed.
- **`@google/genai`** in your package.json: this only works client-side in a static export. Do not call it from server components or `generateStaticParams`.
- The `out/` folder is your built site — never commit it (it's in `.gitignore`).

---

## Build Settings Reference (for Cloudflare Dashboard)

```
Framework preset:      Next.js (Static HTML Export)
Build command:         npm run build
Build output dir:      out
Node.js version:       20 (set in Environment Variables: NODE_VERSION = 20)
```

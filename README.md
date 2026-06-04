# Frontier Manual

Static editorial publication built with Astro, MDX content collections, and Vercel.

## Publish an article

1. Copy a template from `templates/`.
2. Save as `src/content/<collection>/YYYY-MM-DD-slug.mdx`.
3. Set `status: published` in frontmatter.
4. Commit and deploy.

Homepage, indexes, topics, RSS, sitemap, and search update automatically.

## Local development

```bash
npm install
npm run dev
```

Search requires a production index:

```bash
npm run build
npm run preview
```

## Newsletter (Supabase)

Signups use Supabase + a Vercel serverless API. Full setup: [docs/SUPABASE_NEWSLETTER.md](docs/SUPABASE_NEWSLETTER.md).

## Deploy on Vercel

Import the repo. Vercel detects Astro; `vercel.json` runs `npm run build` (Astro + Pagefind). Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel env vars. Update `publication.url` in `src/config/publication.ts` for your production domain.

## Content layout

See `backend.md` for the full content system specification.

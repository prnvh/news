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

## Deploy on Vercel

Import the repo. Vercel detects Astro; `vercel.json` runs `npm run build` (Astro + Pagefind). Set `SITE` or update `publication.url` in `src/config/publication.ts` for your production domain.

## Content layout

See `backend.md` for the full content system specification.

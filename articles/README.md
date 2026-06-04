# Frontier Manual Articles

This folder is the writing desk. The app code lives next door in `../code`.

## Publish

1. Copy a template from `_templates/`.
2. Save it in `briefs/`, `essays/`, `research-notes/`, or `field-maps/`.
3. Name it `YYYY-MM-DD-slug.mdx` or `YYYY-MM-DD-slug.md`.
4. Fill the frontmatter and set `status: published`.
5. Put article images in `assets/images/` and reference them as `/images/file-name.png`.
6. Use simple lowercase image names with hyphens, like `jepa-latent-portal.png`.

Homepage, indexes, topics, RSS, sitemap, and search update automatically.

## Folders

- `briefs/`, `essays/`, `research-notes/`, `field-maps/`: published article collections
- `pages/`: editable page copy for About, Start Here, and Subscribe
- `topics/`: topic metadata used across the site
- `assets/images/`: images available at `/images/...`
- `_templates/`: starter files for new pieces
- `_notes/`: planning notes and old specs

## Local Preview

Run these from `../code`:

```bash
npm run dev
npm run build
npm run preview
```

## Deploy

Set the Vercel project root directory to `code`. The app's Vercel config lives there.

# Frontier Manual Articles

This folder is the writing desk. The app code lives next door in `../code`.

## Publish

1. Copy a template from `_templates/`.
2. Save it in the matching source folder:
   - Concept notes go in `concept-notes/`.
   - Paper breakdowns go in `paper-breakdowns/`.
   - Field breakdowns go in `field-breakdowns/`.
   - Field maps go in `field-maps/`.
3. Name it `YYYY-MM-DD-slug.mdx` or `YYYY-MM-DD-slug.md`.
4. Fill the frontmatter and set `status: published`.
5. Put article images in `assets/images/` and reference them as `/images/file-name.png`.
6. Use simple lowercase image names with hyphens, like `jepa-latent-portal.png`.

Homepage, indexes, topics, RSS, sitemap, and search update automatically. Public URLs use `/concept-notes`, `/paper-breakdowns`, `/field-breakdowns`, and `/field-maps`.

## Homepage Curation

Set `homepage: true` or `featured: true` in an entry's frontmatter to keep it in the homepage highlighted area. Everything else appears in Latest and on `/all`.

## Journal Architecture

- Field maps: big living atlas pieces, such as neuromorphic robotics, energy-based models, AI for science, or embodied intelligence.
- Paper breakdowns: atomic learning units. Each one should answer: what problem is the paper trying to solve, what is the core idea, what method did they use, what result matters, what assumptions does it make, what does it connect to, what confused me, what could be built from it, and how does it change the field map.
- Concept notes: clear explanations of one concept, such as event-based vision, spiking neural networks, or neuromorphic chips.
- Field breakdowns: narrower chapters inside a bigger map, such as robotic foundation models or event-based vision for robotics.

## Folders

- `concept-notes/`: concept notes
- `paper-breakdowns/`: paper breakdowns
- `field-breakdowns/`: field breakdowns
- `field-maps/`: living atlas pieces
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

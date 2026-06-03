# Backend / Content Ground Truth: Frontier Manual

## Core Principle

The website must be extremely easy to publish to.

Publishing a new article should require only:

```txt
1. Create one MDX file in the correct folder.
2. Fill out frontmatter.
3. Write the article body.
4. Commit and deploy.
```

Everything else should happen automatically:

```txt
homepage updates
section index updates
topic pages update
related articles resolve
RSS updates
sitemap updates
search index updates
reading time updates
```

Do not require me to manually edit the homepage, index pages, topic pages, or navigation when I publish a new article.

---

# 1. Architecture

Use a static content architecture.

Recommended stack:

```txt
Astro
Astro Content Collections
MDX
TypeScript
Vercel
Pagefind
RSS
Sitemap
```

There should be no CMS in v1.

Content should live in files.

---

# 2. Content Folder Structure

Use this exact structure:

```txt
src/
  content/
    briefs/
      2026-05-28-jepa-latent-prediction.mdx
    research-notes/
      2026-05-26-world-models-explained.mdx
    essays/
      2026-05-23-beyond-scale-obsession.mdx
    field-maps/
      2026-06-02-agi-research-directions.mdx
    pages/
      about.mdx
      start-here.mdx
      subscribe.mdx
    topics/
      agi.yaml
      world-models.yaml
      evaluation.yaml
      compute.yaml
      interpretability.yaml
      ai-safety.yaml
      india-ai.yaml
      data-efficient-ai.yaml
  lib/
    content.ts
    reading-time.ts
    slugs.ts
    topics.ts
    related.ts
    homepage.ts
```

Important:

```txt
Do not scatter content across random files.
Do not hardcode article data in components.
Do not manually create article arrays inside page files.
```

All content should come from collections.

---

# 3. Content Collections

Use Astro Content Collections with strict schemas.

Create collections for:

```txt
briefs
researchNotes
essays
fieldMaps
pages
topics
```

Use Zod schemas.

---

# 4. Shared Article Schema

All publishable article-like content should share common fields.

```ts
const baseArticleSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),

  status: z.enum(["draft", "published"]).default("published"),

  author: z.string().default("Frontier Manual"),

  slug: z.string().optional(),

  topics: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),

  summary: z.array(z.string()).min(1).max(6),

  readingTime: z.string().optional(),

  featured: z.boolean().default(false),
  homepage: z.boolean().default(false),

  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  heroImagePosition: z.enum(["left", "right", "wide", "none"]).default("right"),

  dek: z.string().optional(),

  related: z.array(z.string()).default([]),

  sources: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
    type: z.enum(["paper", "blog", "report", "news", "video", "website", "dataset", "code", "other"]).default("other"),
    note: z.string().optional()
  })).default([]),

  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional()
  }).optional()
});
```

If `slug` is missing, generate it from filename.

If `readingTime` is missing, calculate it automatically.

If `description` is missing, use `subtitle`.

---

# 5. Brief Schema

Briefs are timely pieces.

Collection folder:

```txt
src/content/briefs
```

Additional fields:

```ts
const briefSchema = baseArticleSchema.extend({
  type: z.literal("brief").default("brief"),
  sections: z.array(z.enum([
    "what-happened",
    "why-it-matters",
    "technical-context",
    "what-to-watch-next"
  ])).optional()
});
```

Expected MDX body headings:

```mdx
## What happened

## Why it matters

## Technical context

## What to watch next
```

Do not require those headings technically, but article templates should be designed around them.

---

# 6. Research Note Schema

Research notes may include paper/result metadata.

Collection folder:

```txt
src/content/research-notes
```

Additional fields:

```ts
const researchNoteSchema = baseArticleSchema.extend({
  type: z.literal("research-note").default("research-note"),

  paper: z.object({
    title: z.string(),
    authors: z.array(z.string()).default([]),
    year: z.union([z.string(), z.number()]).optional(),
    source: z.string().optional(),
    url: z.string().url().optional(),
    venue: z.string().optional()
  }).optional(),

  resultType: z.enum([
    "paper",
    "benchmark",
    "technical-report",
    "blog",
    "dataset",
    "model-release",
    "other"
  ]).default("paper")
});
```

Expected MDX body headings:

```mdx
## The result

## The core idea

## Why it matters

## Limitations

## My take
```

---

# 7. Essay Schema

Essays are long-form arguments.

Collection folder:

```txt
src/content/essays
```

Additional fields:

```ts
const essaySchema = baseArticleSchema.extend({
  type: z.literal("essay").default("essay"),

  pullQuote: z.object({
    text: z.string(),
    attribution: z.string().optional()
  }).optional()
});
```

Expected MDX body headings:

```mdx
## The claim

## The context

## The technical core

## The strongest objection

## What comes next
```

---

# 8. Field Map Schema

Field maps are evergreen guides.

Collection folder:

```txt
src/content/field-maps
```

Additional fields:

```ts
const fieldMapSchema = baseArticleSchema.extend({
  type: z.literal("field-map").default("field-map"),

  orientation: z.string(),

  mapSections: z.array(z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    readingTime: z.string().optional(),
    anchor: z.string()
  })),

  difficulty: z.enum(["accessible", "intermediate", "technical"]).default("intermediate")
});
```

Expected MDX body headings should correspond to `mapSections`.

Example:

```yaml
mapSections:
  - number: "01"
    title: "The problem"
    description: "What we mean by AGI and why it matters."
    readingTime: "2 min read"
    anchor: "the-problem"
```

---

# 9. Topic Schema

Topics should be YAML files, not hardcoded.

Folder:

```txt
src/content/topics
```

Example:

```yaml
name: World Models
slug: world-models
description: A guide to world models, latent prediction, planning, and their role in AGI research.
keyQuestions:
  - Can world models scale?
  - Do they require embodiment?
  - Are they complementary to LLMs?
  - What does planning require from a learned model?
coreConcepts:
  - term: Latent dynamics
    definition: Modeling state transitions in a learned representation space.
  - term: Planning
    definition: Using a model to evaluate possible future actions before acting.
furtherReading:
  - label: DreamerV3
    url: https://example.com
    type: paper
featuredSlugs:
  - world-models-explained
```

Schema:

```ts
const topicSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),

  keyQuestions: z.array(z.string()).default([]),

  coreConcepts: z.array(z.object({
    term: z.string(),
    definition: z.string()
  })).default([]),

  furtherReading: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
    type: z.string().optional()
  })).default([]),

  featuredSlugs: z.array(z.string()).default([])
});
```

Topic pages should automatically pull all published content whose `topics` includes the topic name or slug.

---

# 10. Draft Handling

Any content with:

```yaml
status: draft
```

must not appear in production pages, RSS, sitemap, search, homepage, or section indexes.

Drafts can appear only in local development if `import.meta.env.DEV` is true.

---

# 11. Slug Rules

Slug priority:

```txt
1. frontmatter slug if provided
2. filename without date prefix
```

Example:

```txt
2026-05-28-jepa-latent-prediction.mdx
```

becomes:

```txt
jepa-latent-prediction
```

Routes:

```txt
/briefs/jepa-latent-prediction
/research-notes/world-models-explained
/essays/beyond-scale-obsession
/field-maps/agi-research-directions
```

---

# 12. Reading Time

If `readingTime` is provided, use it.

If not, calculate automatically from body text.

Use:

```txt
225 words per minute
```

Round up to nearest minute.

Display:

```txt
7 min read
```

---

# 13. Content Utilities

Create these utility functions:

```ts
getAllArticles()
getPublishedArticles()
getArticlesByType(type)
getBriefs()
getResearchNotes()
getEssays()
getFieldMaps()
getArticleBySlug(slug)
getLatestArticles(limit)
getFeaturedArticle()
getArticlesByTopic(topicSlugOrName)
getRelatedArticles(article, limit)
getHomepageModel()
getTopics()
getTopicBySlug(slug)
```

These should live in:

```txt
src/lib/content.ts
src/lib/homepage.ts
src/lib/related.ts
src/lib/topics.ts
```

Do not duplicate article-fetching logic across pages.

---

# 14. Homepage Model Logic

The homepage must adapt to the amount of real published content.

Create:

```ts
getHomepageModel()
```

It returns:

```ts
{
  mode: "one-article" | "two-article" | "three-article" | "full",
  lead: Article,
  secondary: Article[],
  latestBriefs: Article[],
  researchNotes: Article[],
  essays: Article[],
  fieldMaps: Article[],
  hasBriefs: boolean,
  hasResearchNotes: boolean,
  hasEssays: boolean,
  hasFieldMaps: boolean
}
```

Rules:

```txt
0 published articles:
show empty launch page with publication mission and newsletter only.

1 published article:
use OneArticleHome.

2 published articles:
use TwoArticleHome.

3 published articles:
use ThreeArticleHome.

4+ published articles:
use FullHome.
```

Do not render empty sections.

Do not fake placeholders.

Do not create fake “coming soon” article cards.

---

# 15. Homepage Selection Rules

Lead article:

```txt
1. latest article with featured: true
2. latest article with homepage: true
3. latest essay
4. latest article of any type
```

Secondary articles:

```txt
latest published articles excluding lead
```

Latest briefs:

```txt
latest briefs excluding lead if lead is a brief
```

Research notes:

```txt
latest research notes excluding already shown
```

Essays:

```txt
latest essays excluding already shown
```

Field maps:

```txt
latest field maps excluding already shown
```

Never show the same article twice on homepage.

---

# 16. Related Articles Logic

Related articles should work automatically.

Priority:

```txt
1. Manual slugs in frontmatter `related`
2. Articles sharing topics
3. Articles sharing tags
4. Latest articles of different type
```

Limit default:

```txt
3
```

Do not include the current article.

Do not include drafts.

---

# 17. Image Handling

Images are optional.

Article frontmatter may include:

```yaml
heroImage: /images/architecture-window.jpg
heroImageAlt: View through a circular concrete window toward the sea.
heroImagePosition: right
```

If `heroImage` is missing:

```txt
Do not render broken image.
Do not render placeholder image.
Use text-only layout.
```

Image rules:

```txt
No generic placeholder image.
No gray rectangle.
No fake image slot.
No AI blob.
```

The layout should adapt gracefully.

---

# 18. Article Template Data

Each article route should receive:

```ts
article
body
relatedArticles
sameTypeArticles
topicObjects
latestBriefs if needed
furtherReading
```

Brief pages should get:

```ts
latestBriefs
```

Research note pages should get:

```ts
relatedNotes
furtherReading
```

Field map pages should get:

```ts
tableOfContents from mapSections
relatedReading
```

---

# 19. MDX Components

Support these MDX components:

```mdx
<Callout title="The core idea">
Text here.
</Callout>

<Aside title="Note">
Text here.
</Aside>

<PaperInfo />
<SourceList />
<ReadNext />
<Figure src="/images/file.jpg" alt="..." caption="..." />
```

But keep usage optional.

For most articles, standard markdown should be enough.

---

# 20. Article Authoring Templates

Create template files in:

```txt
templates/
  brief-template.mdx
  research-note-template.mdx
  essay-template.mdx
  field-map-template.mdx
```

These are not rendered by the site. They are for me to copy when writing.

## Brief Template

```mdx
---
title: ""
subtitle: ""
date: YYYY-MM-DD
type: brief
author: Frontier Manual
topics: []
tags: []
summary:
  - ""
  - ""
  - ""
sources: []
status: draft
---

## What happened

## Why it matters

## Technical context

## What to watch next
```

## Research Note Template

```mdx
---
title: ""
subtitle: ""
date: YYYY-MM-DD
type: research-note
author: Frontier Manual
topics: []
tags: []
summary:
  - ""
  - ""
  - ""
paper:
  title: ""
  authors: []
  year: ""
  source: ""
  url: ""
resultType: paper
sources: []
status: draft
---

## The result

## The core idea

## Why it matters

## Limitations

## My take
```

## Essay Template

```mdx
---
title: ""
subtitle: ""
date: YYYY-MM-DD
type: essay
author: Frontier Manual
topics: []
tags: []
summary:
  - ""
  - ""
  - ""
sources: []
status: draft
---

## The claim

## The context

## The technical core

## The strongest objection

## What comes next
```

## Field Map Template

```mdx
---
title: ""
subtitle: ""
date: YYYY-MM-DD
updated: YYYY-MM-DD
type: field-map
author: Frontier Manual
topics: []
tags: []
summary:
  - ""
  - ""
  - ""
orientation: ""
mapSections:
  - number: "01"
    title: ""
    description: ""
    readingTime: ""
    anchor: ""
difficulty: intermediate
sources: []
status: draft
---

## 01. Section title
```

---

# 21. Authoring Experience

Make the authoring system forgiving.

Required fields should be minimal:

```txt
title
subtitle
date
type
topics
summary
status
```

Everything else should have defaults.

If a non-critical field is missing, do not crash production.

If a critical field is missing, show a clear build-time error explaining which file has the problem.

---

# 22. Validation Errors

Validation errors should be clear.

Example:

```txt
Content error in src/content/essays/2026-05-23-beyond-scale-obsession.mdx:
Missing required field: summary
Expected: array of 1-6 strings
```

Do not let cryptic Zod errors leak directly if possible.

---

# 23. Search Index

Use Pagefind.

Index only published content.

Search page should search:

```txt
title
subtitle
summary
body
topics
tags
```

Do not index draft content.

---

# 24. RSS

Generate RSS from all published articles.

RSS should include:

```txt
title
description/subtitle
date
link
type
topics
```

Use latest 20 articles.

---

# 25. Sitemap

Generate sitemap for:

```txt
homepage
all published article pages
all listing pages
all topic pages
start-here
about
subscribe
search
```

Do not include draft content.

---

# 26. SEO Defaults

For every article:

```txt
title: article.seo.title || article.title
description: article.seo.description || article.description || article.subtitle
image: article.seo.image || article.heroImage || default OG image
canonical: route URL
```

Create Open Graph and Twitter metadata.

Use default OG image if article has none.

Default OG can be simple typographic, not generated art.

---

# 27. Publication Config

Create a single config file:

```txt
src/config/publication.ts
```

Example:

```ts
export const publication = {
  name: "Frontier Manual",
  tagline: "A publication on frontier AI, research culture, and the systems behind technical progress.",
  url: "https://frontiermanual.com",
  author: "Frontier Manual",
  email: "hello@frontiermanual.com",
  newsletterProvider: "buttondown",
  newsletterActionUrl: "",
  nav: [
    { label: "Briefs", href: "/briefs" },
    { label: "Research Notes", href: "/research-notes" },
    { label: "Essays", href: "/essays" },
    { label: "Field Maps", href: "/field-maps" },
    { label: "Topics", href: "/topics" },
    { label: "Start Here", href: "/start-here" },
    { label: "About", href: "/about" }
  ]
};
```

All site identity should come from this file.

Do not hardcode publication name/tagline across components.

---

# 28. Newsletter Config

Support a simple newsletter form component.

If `newsletterActionUrl` is empty:

```txt
show a disabled-looking but styled form in development
or use a simple mailto fallback
```

But do not break the layout.

Eventually I should only need to set:

```ts
newsletterActionUrl: "..."
```

and the form works.

---

# 29. Publishing Workflow

The intended workflow:

## Add a brief

```txt
1. Copy templates/brief-template.mdx
2. Put it in src/content/briefs/YYYY-MM-DD-slug.mdx
3. Fill frontmatter
4. Write body
5. Set status: published
6. Commit
```

## Add a research note

```txt
1. Copy templates/research-note-template.mdx
2. Put it in src/content/research-notes/YYYY-MM-DD-slug.mdx
3. Fill paper metadata if applicable
4. Write body
5. Set status: published
6. Commit
```

## Add an essay

```txt
1. Copy templates/essay-template.mdx
2. Put it in src/content/essays/YYYY-MM-DD-slug.mdx
3. Write body
4. Set status: published
5. Commit
```

No homepage editing should be needed.

---

# 30. Visual-Content Integration

The frontend must respect content state.

If only 1 article exists:

```txt
homepage looks intentional
```

If only 2 articles exist:

```txt
homepage looks intentional
```

If a content type has zero items:

```txt
its homepage section is hidden
```

If an article has no hero image:

```txt
template adapts
```

If an article has no manually related posts:

```txt
related posts are generated automatically
```

If no related posts exist:

```txt
hide Read Next
```

---

# 31. No Placeholder Policy

Hard rule:

```txt
Never render fake content.
Never render lorem ipsum.
Never render placeholder article cards.
Never render “Coming soon” cards in article grids.
Never render broken images.
Never render empty sections.
```

The only acceptable “coming soon” style is on Start Here or About, as plain editorial copy describing planned coverage.

---

# 32. Acceptance Criteria

The backend/content system is complete when:

```txt
1. I can publish a new article by adding one MDX file.
2. Homepage updates automatically.
3. Section pages update automatically.
4. Topic pages update automatically.
5. Related reading works automatically.
6. Drafts are hidden from production.
7. Reading time is automatic.
8. RSS updates automatically.
9. Sitemap updates automatically.
10. Search indexes published content.
11. Images are optional.
12. Missing non-critical fields do not break the site.
13. Missing critical fields produce clear errors.
14. No homepage or listing page requires manual article arrays.
15. The site looks good with 0, 1, 2, 3, and 4+ articles.
```

---

# 33. Final Instruction

Build this like a clean publishing engine, not a web app.

The content system should be boring, predictable, and hard to mess up.

The visual layer should be high-taste.

The authoring workflow should be simple enough that writing remains the main task.

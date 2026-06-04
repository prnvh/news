# Build Spec: Frontier Manual Website From Scratch

## Absolute Visual Ground Truth

The generated visual mockups are the ground truth.

Do not reinterpret the design as a generic blog, SaaS site, Substack clone, AI website, documentation site, or startup landing page.

The site should match the visual language shown in the mockups:

* warm paper background
* very large serif masthead
* editorial newspaper structure
* serious magazine-like article layouts
* black text with sparse deep red accents
* thin ruled lines
* strong hierarchy
* compact but tasteful information density
* no gradients
* no glowing elements
* no rounded cards
* no placeholder blocks
* no AI-style abstract visual language
* no component-library feel

The final result should feel like a serious media website with high editorial taste.

It should be a publication, not a portfolio and not a product landing page.

---

# 1. Product Identity

Working publication name:

```txt
Frontier Manual
```

Working tagline:

```txt
A publication on frontier AI, research culture, and the systems behind technical progress.
```

Primary subject matter:

```txt
frontier AI
research culture
technical progress
compute
evaluation
world models
AGI research
data-efficient AI
interpretability
alignment
technical institutions
```

Tone:

```txt
serious
clear
editorial
restrained
research-informed
non-hype
```

Do not use generic phrases like:

```txt
Unlock the future
Explore cutting-edge insights
Stay ahead of the curve
Your guide to AI
The future starts here
```

Those make the site feel AI-generated.

---

# 2. Core Website Model

This is a media publication with multiple content types.

The site should support:

```txt
Home
Briefs
Research Notes
Essays
Field Maps
Topics
Start Here
About
Subscribe
Search
RSS
```

Content is written as MDX files. No CMS is needed for v1.

The site should automatically render indexes, homepage modules, topic pages, and related reading from frontmatter.

---

# 3. Tech Stack

Use:

```txt
Astro
TypeScript
MDX
Vercel
Pagefind for static search
RSS feed
Sitemap
External newsletter embed or placeholder form component
```

Do not build:

```txt
custom CMS
custom newsletter backend
auth
comments
accounts
payment system
admin dashboard
AI chatbot
AI search
recommendation engine
```

This is a static editorial publication.

---

# 4. File Structure

Use this content structure:

```txt
articles/
  briefs/
  research-notes/
  essays/
  field-maps/
  topics/
  assets/
    images/

code/src/
  components/
    layout/
    editorial/
    article/
    homepage/
    newsletter/
  layouts/
  pages/
  styles/
```

Suggested page routes:

```txt
/
/briefs
/briefs/[slug]
/research-notes
/research-notes/[slug]
/essays
/essays/[slug]
/field-maps
/field-maps/[slug]
/topics
/topics/[slug]
/start-here
/about
/subscribe
/search
/rss.xml
```

---

# 5. Content Schema

All content types should use frontmatter.

## Shared Frontmatter

```yaml
title:
subtitle:
description:
date:
updated:
type:
author:
slug:
topics:
tags:
summary:
readingTime:
featured:
heroImage:
heroImageAlt:
related:
sources:
status:
```

`type` must be one of:

```txt
brief
research-note
essay
field-map
```

`summary` must support bullet points:

```yaml
summary:
  - Energy is a compatibility score, not electricity.
  - EBMs model which states make sense rather than directly predicting outputs.
  - The hard part is training and scaling.
```

---

# 6. Sample Real Content

Do not use lorem ipsum. Do not use placeholder documents.

Seed the site with realistic working content.

## Article 1: Essay

```yaml
title: Beyond Scale Obsession
subtitle: Why the current paradigm is hitting limits—and what comes next.
type: essay
date: 2026-05-23
readingTime: 15 min read
topics:
  - Compute
  - Evaluation
  - World Models
  - Interpretability
summary:
  - Scaling has delivered astonishing gains, but returns are bending.
  - The next frontier is not simply larger models, but better objectives, richer data, world models, targeted reasoning, and sharper evaluation.
  - The goal is not smaller models for its own sake. The goal is smarter progress.
```

Use this excerpt:

```txt
The last several years validated a simple bet: more compute, more data, larger models. That bet bought us fluency, generality, and surprise. But every empirical curve has a shape. We are now paying more for each increment, waiting longer for each iteration, and discovering new classes of failure the old recipe cannot solve.
```

## Article 2: Research Note

```yaml
title: World Models, Explained
subtitle: Internal simulators, latent dynamics, and the case for next-token world modeling.
type: research-note
date: 2026-05-26
readingTime: 12 min read
topics:
  - World Models
  - Representation Learning
  - Planning
  - Evaluation
paper:
  title: World Models are Superhuman World Simulators
  year: 2023
  authors:
    - Danijie Hafner
    - Heng Lyu
    - Jurgenson Zhao
    - Thomas Parr
    - Mohammad Norouzi
  source: Google DeepMind
summary:
  - World models learn compact representations of environments and predict future states.
  - They are useful because they let agents plan without acting directly in the real environment.
  - The key question is whether these latent simulators can scale beyond narrow control settings.
```

## Article 3: Brief

```yaml
title: JEPA and the Return of Latent Prediction
subtitle: Why several labs are betting on embedding-space forecasting again—and what changed.
type: brief
date: 2026-05-28
readingTime: 7 min read
topics:
  - World Models
  - Representation Learning
summary:
  - JEPA-style objectives predict embeddings instead of pixels.
  - Better encoders and data pipelines have made latent prediction more plausible.
  - The open question is whether this becomes a general world-modeling ingredient or remains a specialized tool.
```

## Article 4: Field Map

```yaml
title: A Map of Current AGI Research Directions
subtitle: An orientation to the problems, approaches, and open questions shaping the path toward generally intelligent systems.
type: field-map
date: 2026-06-02
updated: 2026-06-02
readingTime: 24 min read
topics:
  - AGI
  - Research Landscape
  - Systems
  - Evaluation
summary:
  - AGI research is not one path. It is a landscape of competing assumptions.
  - The major approaches include scaling, world models, hybrid systems, evaluation, alignment, and infrastructure.
  - The open questions matter more than the slogans.
```

These should be enough to render a full version of the site.

But the design must also handle only one or two articles without fake placeholders.

---

# 7. Design System

## Overall Visual Direction

The design should match the mockups.

Core style:

```txt
editorial
newspaper-like
serif-heavy
warm off-white paper
thin rules
deep red accents
structured but not cluttered
beautiful without images
```

Avoid completely:

```txt
gradients
glows
glassmorphism
rounded cards
generic SaaS buttons
huge CTA slabs
bright blue/purple AI colors
template-like cards
emoji icons
stock tech illustrations
AI-generated abstract blobs
shadow-heavy UI
```

---

# 8. Color System

Use these tokens:

```css
:root {
  --bg: #f4efe6;
  --paper: #fffaf1;
  --text: #101010;
  --muted: #5e574c;
  --faint: #8b8276;
  --border: #d1c4b2;
  --rule: #111111;
  --accent: #8a1f1f;
  --accent-soft: #eadfd3;
}
```

Usage:

```txt
Background: var(--bg)
Main text: var(--text)
Rules/borders: var(--border), var(--rule)
Links/accent metadata: var(--accent)
```

The red accent should be rare. It should appear on:

```txt
Subscribe link
active nav item
section underline
article type labels
important links
topic links
```

Do not use red as a fill color except very rarely.

---

# 9. Typography

Typography is the design.

Use:

```css
--font-display: "Newsreader", "Source Serif 4", Georgia, "Times New Roman", Times, serif;
--font-body: "Source Serif 4", Georgia, "Times New Roman", Times, serif;
--font-ui: "IBM Plex Sans", Inter, system-ui, sans-serif;
--font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
```

If fonts fail to load, the fallback should still look respectable.

## Masthead

```css
.masthead-title {
  font-family: var(--font-display);
  font-size: clamp(64px, 11vw, 132px);
  line-height: 0.82;
  letter-spacing: -0.075em;
  font-weight: 700;
}
```

## Lead Headline

```css
.lead-title {
  font-family: var(--font-display);
  font-size: clamp(44px, 6.5vw, 82px);
  line-height: 0.92;
  letter-spacing: -0.055em;
  font-weight: 700;
}
```

## Article Title

```css
.article-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 92px);
  line-height: 0.92;
  letter-spacing: -0.055em;
  font-weight: 700;
}
```

## Normal Story Title

```css
.story-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 40px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 700;
}
```

## Body

```css
.article-body {
  font-family: var(--font-body);
  font-size: 19px;
  line-height: 1.68;
  max-width: 680px;
}
```

## UI Labels

```css
.eyebrow,
.label,
.metadata-label {
  font-family: var(--font-ui);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}
```

---

# 10. Global Layout

Use a fixed editorial container.

```css
.site-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 44px;
}
```

Mobile:

```css
.site-shell {
  padding: 0 20px;
}
```

Rules:

```txt
No full-bleed hero sections.
No centered SaaS hero.
No oversized whitespace.
No cluttered component stacking.
```

Use horizontal rules generously but carefully.

---

# 11. Header / Masthead

The header must match the mockups.

Desktop structure:

```txt
Top strip:
left: date
center: tagline
right: Subscribe

Large masthead:
Frontier Manual

Navigation row:
Briefs
Research Notes
Essays
Field Maps
Topics
Start Here
About
Search icon
```

Important:

```txt
There must be exactly one navigation row.
No duplicated nav.
No mobile nav visible on desktop.
No repeated Search text.
No logo icon.
```

The masthead is text-only.

---

# 12. Footer

Footer must be compact and calm.

Do not make the footer a large sitemap.

Structure:

```txt
Top rule

Left:
Frontier Manual
A publication on frontier AI, research culture, and the systems behind technical progress.

Center:
Briefs · Research Notes · Essays · Field Maps · Topics · Start Here · About · Subscribe · RSS

Right:
© 2026 Frontier Manual
```

Rules:

```txt
No duplicate links.
No giant footer.
No multiple nav columns unless very restrained.
No repeated newsletter signup if the newsletter block appears immediately above.
```

---

# 13. Newsletter Block

Newsletter block should match the mockups but remain uncluttered.

Desktop:

```txt
Top rule
The weekly note.
One thoughtful email on frontier AI research, technical ideas, and the people building it.
[ email input ] [ Subscribe ]
Bottom rule
```

Do not use:

```txt
modal
popup
red full border
giant CTA banner
marketing copy
```

Use a quiet editorial block.

---

# 14. Homepage — Full Content Version

This layout applies when there are 4+ pieces.

Structure:

```txt
Header / masthead / nav

Front-page lead grid:
- lead story on left
- main image in middle
- latest briefs on right

Below:
- Research Notes column
- Essays column
- Field Maps column

Then:
- Topics strip, only if visually calm
- Newsletter block
- Footer
```

## Lead Grid

Use this exact feeling:

```txt
Left:
eyebrow label
large lead headline
subtitle
date / reading time
topic links

Middle:
large editorial image

Right:
Latest Briefs
compact rows
```

The lead story should dominate.

## Lower Three-Column Section

Use three columns:

```txt
Research Notes
Essays
Field Maps
```

Each column contains 2 items max.

Do not show 5+ items per column.

Do not make it cluttered.

Use thin vertical rules between columns.

---

# 15. Homepage — One Article Stage

When there is only 1 published article, do not fake placeholders.

The homepage should become a launch issue page.

Structure:

```txt
Header / masthead / nav

Single featured article:
left: article label, title, subtitle, metadata, topics, excerpt, "Read the essay"
right: image

Below:
"What this publication is"
"What to expect"
Newsletter block
Published so far
Footer
```

## One Article Stage Layout

The one-article homepage should show:

```txt
Featured article
Why this publication exists
What to expect
Newsletter signup
Published so far
```

Do not show:

```txt
Latest Briefs if there are no briefs
Research Notes if none exist
Field Maps if none exist
Topics strip if mostly empty
Fake coming soon cards
Empty grids
Placeholder docs
```

Use copy like:

```txt
What this publication is

Frontier Manual is a publication about the frontier of AI and the systems that shape technical progress.

We write long-form essays, field maps, and research notes that prioritize clarity, depth, and intellectual honesty over speed.

This is a slow publication on purpose. We'd rather be useful than first.
```

And:

```txt
What to expect

- AGI research landscapes and architectures
- World models and representation learning
- Evaluation, benchmarks, and measurement
- Compute, infrastructure, and scaling laws
- Alignment, safety, and governance
- Research culture and the people building it
```

Published so far should list only the real article.

---

# 16. Homepage — Two Article Stage

When there are exactly 2 published articles, use a two-feature layout.

Structure:

```txt
Header / masthead / nav

Top feature:
Essay feature with large title and image

Second feature:
Research note or brief with paper info / diagram

Below:
Why this publication exists
On deck
Newsletter block
Footer
```

Do not show empty sections.

Do not show fake “latest briefs.”

Do not show a full media grid yet.

The two-article homepage should feel intentional, like an early issue of a publication.

## Two Article Stage Example

Top:

```txt
ESSAY
Beyond Scale Obsession
Why the current paradigm is hitting limits—and what comes next.
[excerpt]
Read the essay
```

Second:

```txt
RESEARCH NOTE
World Models, Explained
Internal simulators, latent dynamics, and the case for next-token world modeling.
[paper info box]
Read the research note
```

Then:

```txt
Why this publication exists
On deck
The weekly note
Footer
```

On Deck should be real planned topics, not fake articles:

```txt
Evaluation
Rethinking how we measure intelligence and progress.

World Models
From next-token prediction to interactive simulators.

Data-efficient AI
Learning more from less—and why it is hard.
```

These are not clickable unless pages exist.

---

# 17. Homepage — Three Article Stage

When there are exactly 3 published articles, use a hybrid layout.

Structure:

```txt
Lead story grid:
lead story + image

Below:
two real secondary stories side-by-side

Then:
Why this publication exists
Newsletter
Footer
```

Do not create a full “Briefs / Research Notes / Essays / Field Maps” section unless those content types actually exist.

---

# 18. Conditional Rendering Rules

This is critical.

Do not render empty or fake sections.

Rules:

```txt
If no briefs exist, hide Latest Briefs.
If no research notes exist, hide Research Notes section.
If no field maps exist, hide Field Maps section.
If fewer than 4 total posts exist, do not use full media homepage.
If only 1 post exists, use one-article homepage.
If only 2 posts exist, use two-article homepage.
If only 3 posts exist, use three-article homepage.
If 4+ posts exist, use full media homepage.
```

No placeholders.

No lorem ipsum.

No “coming soon” cards on the homepage.

---

# 19. Brief Page Template

Briefs are short timely pieces.

Route:

```txt
/briefs/[slug]
```

Brief article layout should match the mockup:

```txt
Header / masthead / nav

Main content left:
eyebrow: BRIEF
title
subtitle
date / reading time
topics
image if present
summary box
article body sections:
  What happened
  Why it matters
  Technical context
  What to watch next

Right rail:
Latest Briefs
```

The right rail appears only on desktop.

On mobile, right rail moves below the article.

Summary box:

```txt
IN SHORT
- bullet
- bullet
- bullet
```

Style:

```txt
thin border
no icons
no filled background unless subtle
```

---

# 20. Research Note Page Template

Route:

```txt
/research-notes/[slug]
```

Research note layout:

```txt
Header / masthead / nav

Main content:
eyebrow: RESEARCH NOTE
title
subtitle
date / reading time
topics

Paper info box:
Paper
Year
Authors
Source

Summary box

Sections:
The result
The core idea
Why it matters
Limitations
My take

Right rail:
Related Notes
Further Reading
```

The paper info box should look like a serious table, not a card.

Use thin vertical dividers.

---

# 21. Essay Page Template

Route:

```txt
/essays/[slug]
```

Essay layout:

```txt
Compact header / nav
Large article header
Optional image on right
Summary box
Body
Pull quote if provided
Read next
Footer
```

Essay pages can use a slightly more spacious layout than briefs.

Body sections:

```txt
The claim
The context
The technical core
The strongest objection
What comes next
```

The mockup shows an image on the right in the essay header. Support this if `heroImage` exists.

Do not require images for essays.

If no image exists, make the article text layout beautiful without it.

---

# 22. Field Map Page Template

Route:

```txt
/field-maps/[slug]
```

Field maps are evergreen chapter-like guides.

Layout:

```txt
Header / masthead / nav

Top:
eyebrow: FIELD MAP
title
subtitle
metadata
topics
large diagram/image on right if available

Orientation box

Main section list:
01 The problem
02 Major approaches
03 World models
04 Scaling paradigms
05 Evaluation
06 Open questions
07 Reading path

Right rail:
On this page
Related reading
```

Field maps should feel like a major editorial object.

Use large red section numbers.

Use thin row dividers.

---

# 23. Listing Pages

## Briefs Listing

```txt
Briefs
Short analysis of recent developments in frontier AI and technology.

Rows:
date
title
subtitle
topics
reading time
```

No cards.

## Research Notes Listing

```txt
Research Notes
Paper breakdowns, benchmark notes, and technical observations.

Featured note if available
Archive rows
```

## Essays Listing

```txt
Essays
Long-form arguments and explanations.

Featured essay
Archive rows
```

## Field Maps Listing

```txt
Field Maps
Durable maps of important research areas.

Large chapter-like rows
```

---

# 24. Topics

Topics page:

```txt
Topics

A curated index of research areas covered by the publication.

Topic rows:
topic name
short description
number of published pieces
latest piece
```

Topic detail page:

```txt
Topic title
short description

Start here
Latest
Key questions
Core concepts
Further reading
```

Do not make topic pages simple tag dumps.

---

# 25. Start Here

Start Here should work even with few articles.

If enough articles exist:

```txt
Reading paths with links.
```

If few articles exist:

```txt
Show publication orientation and planned paths.
Only link articles that exist.
```

No fake article links.

Possible structure:

```txt
Start Here

This publication follows frontier AI through five recurring questions:

1. What is changing technically?
2. What is actually being measured?
3. What systems make progress possible?
4. What ideas are underrated?
5. What are people getting wrong?

Published so far:
[real links]

Coming paths:
AGI and world models
Evaluation and benchmarks
Compute and infrastructure
Interpretability and safety
```

---

# 26. About Page

Use serious, simple copy.

Structure:

```txt
About Frontier Manual

Frontier Manual is a publication on frontier AI, research culture, and the systems behind technical progress.

It covers essays, research notes, briefs, and field maps on the ideas shaping AI and computing.

Editorial principles:
- Clarity over hype.
- Sources over vibes.
- Accessible, not shallow.
- Slow when needed.
- Opinion is labeled.
```

No inflated founder language.

---

# 27. Subscribe Page

Simple.

```txt
Get the weekly note.

One thoughtful email when we publish. Long reads, not hot takes.

[Email input] [Subscribe]

No spam. Unsubscribe anytime.
```

---

# 28. Images and Visual Assets

Do not use generic AI images.

Use only:

```txt
architectural photography
monochrome diagrams
manual-like maps
simple abstract research diagrams
clean typographic cards
```

Image style:

```txt
quiet
architectural
earthy
editorial
non-futuristic
non-AI
```

Avoid:

```txt
robots
brains
neural network glow
purple gradients
3D abstract blobs
people staring at screens
stock server rooms
```

If no good image exists, use no image.

The layout must still work.

---

# 29. Components Needed

Build these components:

```txt
SiteShell
Header
Masthead
Nav
Footer
NewsletterBlock
ArticleHeader
ArticleBody
SummaryBox
PaperInfoBox
BriefRow
StoryRow
LeadStory
SecondaryStory
FieldMapRow
TopicLink
RelatedReading
ReadingPath
SourceList
ArticleList
OneArticleHome
TwoArticleHome
ThreeArticleHome
FullHome
```

Important:

```txt
Do not create one generic Card component and use it everywhere.
Different content types need different editorial treatment.
```

---

# 30. Responsive Behavior

Mobile must be clean.

Mobile homepage:

```txt
Masthead
Nav collapsed
Lead story
Image
Latest real items
Newsletter
Footer
```

Do not preserve complex three-column layouts on mobile.

Article pages mobile:

```txt
title
subtitle
metadata
summary
body
related
newsletter
footer
```

No sidebars on mobile.

---

# 31. Acceptance Criteria

The build is acceptable only if:

```txt
1. It visually matches the generated mockups.
2. It does not look like a generic AI-generated website.
3. It does not use placeholders or lorem ipsum.
4. It has special layouts for 1, 2, and 3 article stages.
5. Empty sections do not render.
6. The typography feels like a serious publication.
7. The homepage has real editorial hierarchy.
8. Article pages are beautiful and readable.
9. Briefs, research notes, essays, and field maps each feel distinct.
10. The footer is calm and not cluttered.
11. The newsletter block is quiet, not salesy.
12. The design works without images.
13. No rounded cards, gradients, glows, or SaaS components appear.
```

---

# 32. Implementation Order

Build in this order:

```txt
1. Astro + MDX setup
2. Content schemas
3. Global typography and color system
4. Header / masthead / nav
5. Footer
6. Article page base layout
7. Brief template
8. Research note template
9. Essay template
10. Field map template
11. One-article homepage
12. Two-article homepage
13. Three-article homepage
14. Full homepage
15. Listing pages
16. Topic pages
17. Start Here page
18. Subscribe page
19. Search
20. RSS / sitemap
21. Responsive polish
22. Final visual pass against generated mockups
```

---

# 33. Hard Rule

Do not “improve” the visual direction beyond the mockups.

The mockups are the target.

The job is to implement that visual system faithfully, while making the site robust at every content stage:

```txt
1 article
2 articles
3 articles
full publication
```

The site should look intentional from day one, without fake content.

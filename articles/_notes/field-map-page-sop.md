# Field Map Page SOP

Use this SOP whenever creating or updating a field map.

## Purpose

A field map is a navigable map page, not a long article first. The first screen should show:

1. Field-map chrome: back link, current map title, search.
2. Hero: type label, title, update recency, one short orientation paragraph.
3. Concepts rail: 5-7 concept columns connected by a thin timeline.
4. Two update lists: recently added papers and related concept notes.
5. Long-form map notes below the first screen.

## Frontmatter Contract

Required field-map fields:

```yaml
type: field-map
title:
subtitle:
updated:
orientation:
topics: []
summary:
  - ""
mapSections:
  - number: "01"
    title: ""
    description: ""
    readingTime: ""
    notesCount: 0
    papersCount: 0
    anchor: ""
```

## Concept Rail Rules

- Use six concepts by default. Five or seven are acceptable when the map truly needs it.
- Keep concept titles short enough to fit in two lines.
- Keep descriptions to 90-130 characters.
- `anchor` must match a real heading below the fold.
- `notesCount` is the current number of concept notes attached to that concept.
- `papersCount` is the current number of paper breakdowns attached to that concept.

## Lower Lists

The page automatically finds related paper breakdowns and concept notes by shared `topics`.

If there are no matching entries yet, the layout creates stable placeholder rows from the concept titles, linked to the relevant anchors. Replace those by publishing real paper breakdowns and concept notes with overlapping topics.

## Body Rules

Below the first-screen map, write the durable guide. Use headings that correspond to `mapSections.anchor`:

```md
## 01. Concept title

The section text...
```

## Pre-Publish Checklist

- The field map has 5-7 concepts.
- Every concept has `notesCount`, `papersCount`, and an `anchor`.
- Every `anchor` has a matching body section.
- The subtitle is short enough to sit as the right-side hero paragraph.
- Related paper breakdowns and concept notes share at least one topic when available.
- Run `npm run build` before shipping.

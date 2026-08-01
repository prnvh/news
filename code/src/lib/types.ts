import type { CollectionEntry } from "astro:content";

export type ArticleCollection =
  | "briefs"
  | "researchNotes"
  | "essays"
  | "fieldMaps";

export type ArticleType = "brief" | "research-note" | "essay" | "field-map";

export type BriefEntry = CollectionEntry<"briefs">;
export type ResearchNoteEntry = CollectionEntry<"researchNotes">;
export type EssayEntry = CollectionEntry<"essays">;
export type FieldMapEntry = CollectionEntry<"fieldMaps">;

export type ArticleEntry =
  | BriefEntry
  | ResearchNoteEntry
  | EssayEntry
  | FieldMapEntry;

export interface NormalizedArticle {
  id: string;
  slug: string;
  collection: ArticleCollection;
  type: ArticleType;
  title: string;
  subtitle?: string;
  description: string;
  date: Date;
  updated?: Date;
  status: "draft" | "published";
  author: string;
  topics: string[];
  tags: string[];
  summary: string[];
  readingTime: string;
  featured: boolean;
  homepage: boolean;
  heroImage?: string;
  heroImageAlt?: string;
  heroImagePosition: "left" | "right" | "wide" | "none";
  dek?: string;
  related: string[];
  sources: Array<{
    label: string;
    url: string;
    type: string;
    note?: string;
  }>;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
  url: string;
  entry: ArticleEntry;
  /** Type-specific frontmatter preserved on entry.data */
  data: ArticleEntry["data"];
}

import {
  getBriefs,
  getEssays,
  getFieldMaps,
  getPublishedArticles,
  getResearchNotes,
} from "./content";
import { formatRelativeDate } from "./format-date";
import type { ArticleType, NormalizedArticle } from "./types";

const HOMEPAGE_SECTION_LIMIT = 5;

export interface JournalRow {
  title: string;
  meta: string;
  href: string;
}

export interface JournalSection {
  label: string;
  href: string;
  rows: JournalRow[];
}

const JOURNAL_SECTION_CONFIG: Array<{
  label: string;
  href: string;
  type: ArticleType;
  metaPrefix: "Updated" | "";
}> = [
  { label: "Field Maps", href: "/field-maps", type: "field-map", metaPrefix: "Updated" },
  {
    label: "Paper Notes",
    href: "/paper-notes",
    type: "research-note",
    metaPrefix: "",
  },
  { label: "Concept Notes", href: "/concept-notes", type: "brief", metaPrefix: "" },
  {
    label: "Field Breakdowns",
    href: "/field-breakdowns",
    type: "essay",
    metaPrefix: "Updated",
  },
];

function sortByDate(articles: NormalizedArticle[]): NormalizedArticle[] {
  return [...articles].sort((a, b) => b.date.getTime() - a.date.getTime());
}

function journalMeta(
  article: NormalizedArticle,
  prefix: "Updated" | "",
): string {
  const date = article.updated ?? article.date;
  return formatRelativeDate(date, prefix);
}

function toJournalRows(
  articles: NormalizedArticle[],
  metaPrefix: "Updated" | "",
): JournalRow[] {
  return articles.slice(0, HOMEPAGE_SECTION_LIMIT).map((article) => ({
    title: article.title,
    meta: journalMeta(article, metaPrefix),
    href: article.url,
  }));
}

export async function getJournalSections(): Promise<JournalSection[]> {
  const byType: Record<ArticleType, NormalizedArticle[]> = {
    "field-map": sortByDate(await getFieldMaps()),
    brief: sortByDate(await getBriefs()),
    "research-note": sortByDate(await getResearchNotes()),
    essay: sortByDate(await getEssays()),
  };

  return JOURNAL_SECTION_CONFIG.map((section) => ({
    label: section.label,
    href: section.href,
    rows: toJournalRows(byType[section.type], section.metaPrefix),
  })).filter((section) => section.rows.length > 0);
}

export type HomepageMode =
  | "empty"
  | "one-article"
  | "two-article"
  | "three-article"
  | "full";

export interface HomepageModel {
  mode: HomepageMode;
  lead?: NormalizedArticle;
  secondary: NormalizedArticle[];
  latestBriefs: NormalizedArticle[];
  researchNotes: NormalizedArticle[];
  essays: NormalizedArticle[];
  fieldMaps: NormalizedArticle[];
  hasBriefs: boolean;
  hasResearchNotes: boolean;
  hasEssays: boolean;
  hasFieldMaps: boolean;
}

function pickLead(articles: NormalizedArticle[]): NormalizedArticle | undefined {
  const sorted = sortByDate(articles);
  const featured = sorted.find((a) => a.featured);
  if (featured) return featured;
  const homepage = sorted.find((a) => a.homepage);
  if (homepage) return homepage;
  const latestEssay = sorted.find((a) => a.type === "essay");
  if (latestEssay) return latestEssay;
  return sorted[0];
}

function excludeSlugs(
  articles: NormalizedArticle[],
  slugs: Set<string>,
  limit?: number,
): NormalizedArticle[] {
  const filtered = articles.filter((a) => !slugs.has(a.slug));
  return limit !== undefined ? filtered.slice(0, limit) : filtered;
}

export async function getHomepageModel(): Promise<HomepageModel> {
  const published = sortByDate(await getPublishedArticles());
  const count = published.length;

  if (count === 0) {
    return {
      mode: "empty",
      secondary: [],
      latestBriefs: [],
      researchNotes: [],
      essays: [],
      fieldMaps: [],
      hasBriefs: false,
      hasResearchNotes: false,
      hasEssays: false,
      hasFieldMaps: false,
    };
  }

  const mode: HomepageMode =
    count === 1
      ? "one-article"
      : count === 2
        ? "two-article"
        : count === 3
          ? "three-article"
          : "full";

  const lead = pickLead(published);
  const shown = new Set<string>();
  if (lead) shown.add(lead.slug);

  const briefs = published.filter((a) => a.type === "brief");
  const notes = published.filter((a) => a.type === "research-note");
  const essays = published.filter((a) => a.type === "essay");
  const maps = published.filter((a) => a.type === "field-map");

  const latestBriefs =
    mode === "full"
      ? excludeSlugs(briefs, shown, 4)
      : excludeSlugs(briefs, shown);
  for (const a of latestBriefs) shown.add(a.slug);

  const secondary =
    mode === "full"
      ? excludeSlugs(
          published.filter((a) => a.type !== "brief"),
          new Set(lead ? [lead.slug] : []),
          3,
        )
      : excludeSlugs(published, new Set(lead ? [lead.slug] : []), count - 1);
  for (const a of secondary) shown.add(a.slug);

  const researchNotes =
    mode === "full" ? excludeSlugs(notes, shown, 3) : excludeSlugs(notes, shown);
  for (const a of researchNotes) shown.add(a.slug);

  const essaySlice =
    mode === "full" ? excludeSlugs(essays, shown, 3) : excludeSlugs(essays, shown);
  for (const a of essaySlice) shown.add(a.slug);

  const fieldMaps =
    mode === "full" ? excludeSlugs(maps, shown, 3) : excludeSlugs(maps, shown);

  return {
    mode,
    lead,
    secondary,
    latestBriefs,
    researchNotes,
    essays: essaySlice,
    fieldMaps,
    hasBriefs: briefs.length > 0,
    hasResearchNotes: notes.length > 0,
    hasEssays: essays.length > 0,
    hasFieldMaps: maps.length > 0,
  };
}

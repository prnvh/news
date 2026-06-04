import { getPublishedArticles } from "./content";
import type { NormalizedArticle } from "./types";

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

function sortByDate(articles: NormalizedArticle[]): NormalizedArticle[] {
  return [...articles].sort((a, b) => b.date.getTime() - a.date.getTime());
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

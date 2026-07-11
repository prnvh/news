import { getFieldMaps, getResearchNotes } from "./content";
import type { NormalizedArticle } from "./types";
import type { CollectionEntry } from "astro:content";

function topicOverlap(a: NormalizedArticle, b: NormalizedArticle): number {
  const bTopics = new Set(b.topics.map((t) => t.toLowerCase()));
  return a.topics.filter((t) => bTopics.has(t.toLowerCase())).length;
}

export async function getFieldForArticle(
  article: NormalizedArticle,
): Promise<NormalizedArticle | undefined> {
  const fieldMaps = await getFieldMaps();
  return fieldMaps
    .filter((map) => topicOverlap(article, map) > 0)
    .sort((a, b) => topicOverlap(article, b) - topicOverlap(article, a))[0];
}

export async function getRelatedPaperCount(
  article: NormalizedArticle,
): Promise<number> {
  const papers = await getResearchNotes();
  const relatedSlugs = new Set(article.related);
  return papers.filter(
    (paper) =>
      paper.slug !== article.slug &&
      (relatedSlugs.has(paper.slug) || topicOverlap(article, paper) > 0),
  ).length;
}

export function formatConceptLabels(
  topicObjects: CollectionEntry<"topics">[],
): string {
  if (topicObjects.length === 0) return "—";
  return topicObjects.map((topic) => topic.data.name).join(", ");
}

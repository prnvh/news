import { getCollection, type CollectionEntry } from "astro:content";
import { publication } from "../config/publication";
import { readingTimeFromText } from "./reading-time";
import { resolveSlug } from "./slugs";
import type {
  ArticleCollection,
  ArticleEntry,
  ArticleType,
  NormalizedArticle,
} from "./types";

const ROUTE_PREFIX: Record<ArticleCollection, string> = {
  briefs: "/briefs",
  researchNotes: "/research-notes",
  essays: "/essays",
  fieldMaps: "/field-maps",
};

const COLLECTION_TO_TYPE: Record<ArticleCollection, ArticleType> = {
  briefs: "brief",
  researchNotes: "research-note",
  essays: "essay",
  fieldMaps: "field-map",
};

export function isVisibleInProduction(status: "draft" | "published"): boolean {
  if (status === "published") return true;
  return import.meta.env.DEV;
}

function collectionFromEntry(entry: ArticleEntry): ArticleCollection {
  return entry.collection;
}

export function normalizeArticle(entry: ArticleEntry): NormalizedArticle {
  const collection = collectionFromEntry(entry);
  const slug = resolveSlug(entry.id, entry.data.slug);
  const body = "body" in entry ? String(entry.body ?? "") : "";
  const readingTime =
    entry.data.readingTime?.trim() ||
    (body ? readingTimeFromText(body) : "1 min read");

  return {
    id: entry.id,
    slug,
    collection,
    type: COLLECTION_TO_TYPE[collection],
    title: entry.data.title,
    subtitle: entry.data.subtitle,
    description: entry.data.description ?? entry.data.subtitle,
    date: entry.data.date,
    updated: entry.data.updated,
    status: entry.data.status,
    author: entry.data.author,
    topics: entry.data.topics,
    tags: entry.data.tags,
    summary: entry.data.summary,
    readingTime,
    featured: entry.data.featured,
    homepage: entry.data.homepage,
    heroImage: entry.data.heroImage,
    heroImageAlt: entry.data.heroImageAlt,
    heroImagePosition: entry.data.heroImagePosition,
    dek: entry.data.dek,
    related: entry.data.related,
    sources: entry.data.sources.map((s) => ({
      label: s.label,
      url: s.url,
      type: s.type,
      note: s.note,
    })),
    seo: entry.data.seo,
    url: `${ROUTE_PREFIX[collection]}/${slug}`,
    entry,
    data: entry.data,
  };
}

async function loadArticleEntries(): Promise<ArticleEntry[]> {
  const [briefs, researchNotes, essays, fieldMaps] = await Promise.all([
    getCollection("briefs"),
    getCollection("researchNotes"),
    getCollection("essays"),
    getCollection("fieldMaps"),
  ]);
  return [...briefs, ...researchNotes, ...essays, ...fieldMaps];
}

export async function getAllArticles(): Promise<NormalizedArticle[]> {
  const entries = await loadArticleEntries();
  return entries.map(normalizeArticle);
}

export async function getPublishedArticles(): Promise<NormalizedArticle[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => isVisibleInProduction(a.status));
}

export async function getArticlesByType(
  type: ArticleType,
): Promise<NormalizedArticle[]> {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.type === type);
}

export async function getBriefs(): Promise<NormalizedArticle[]> {
  return getArticlesByType("brief");
}

export async function getResearchNotes(): Promise<NormalizedArticle[]> {
  return getArticlesByType("research-note");
}

export async function getEssays(): Promise<NormalizedArticle[]> {
  return getArticlesByType("essay");
}

export async function getFieldMaps(): Promise<NormalizedArticle[]> {
  return getArticlesByType("field-map");
}

export async function getArticleBySlug(
  slug: string,
): Promise<NormalizedArticle | undefined> {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getLatestArticles(
  limit = 10,
): Promise<NormalizedArticle[]> {
  const articles = await getPublishedArticles();
  return [...articles]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}

export async function getFeaturedArticle(): Promise<
  NormalizedArticle | undefined
> {
  const articles = await getPublishedArticles();
  const featured = articles
    .filter((a) => a.featured)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return featured[0];
}

export function articleSeo(article: NormalizedArticle) {
  return {
    title: article.seo?.title ?? article.title,
    description:
      article.seo?.description ?? article.description ?? article.subtitle,
    image:
      article.seo?.image ??
      article.heroImage ??
      publication.defaultOgImage,
    canonical: new URL(article.url, publication.url).href,
  };
}

export async function getPages() {
  const pages = await getCollection("pages");
  return pages.filter((p) => isVisibleInProduction(p.data.status));
}

export async function getPageBySlug(slug: string) {
  const pages = await getPages();
  return pages.find((p) => resolveSlug(p.id, undefined) === slug);
}

export type PageEntry = CollectionEntry<"pages">;

export function pageUrl(page: PageEntry): string {
  const slug = resolveSlug(page.id);
  if (slug === "start-here") return "/start-here";
  if (slug === "about") return "/about";
  if (slug === "subscribe") return "/subscribe";
  return `/${slug}`;
}

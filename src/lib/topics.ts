import { getCollection } from "astro:content";
import { getPublishedArticles, type NormalizedArticle } from "./content";

export async function getTopics() {
  return getCollection("topics");
}

export async function getTopicBySlug(slug: string) {
  const topics = await getTopics();
  return topics.find((t) => t.data.slug === slug);
}

function topicMatchesArticle(
  topicSlug: string,
  topicName: string,
  article: NormalizedArticle,
): boolean {
  const normalized = (s: string) => s.toLowerCase().trim();
  const slug = normalized(topicSlug);
  const name = normalized(topicName);
  return article.topics.some((t) => {
    const v = normalized(t);
    return v === slug || v === name || v.replace(/\s+/g, "-") === slug;
  });
}

export async function getArticlesByTopic(
  topicSlugOrName: string,
): Promise<NormalizedArticle[]> {
  const topic = await getTopicBySlug(topicSlugOrName);
  const topicName = topic?.data.name ?? topicSlugOrName;
  const topicSlug = topic?.data.slug ?? topicSlugOrName;
  const articles = await getPublishedArticles();
  return articles
    .filter((a) => topicMatchesArticle(topicSlug, topicName, a))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getTopicObjectsForArticle(article: NormalizedArticle) {
  const topics = await getTopics();
  return topics.filter((t) =>
    article.topics.some((label) => {
      const v = label.toLowerCase().trim();
      return (
        v === t.data.slug.toLowerCase() ||
        v === t.data.name.toLowerCase() ||
        v.replace(/\s+/g, "-") === t.data.slug.toLowerCase()
      );
    }),
  );
}

import type { NormalizedArticle } from "./types";
import { getPublishedArticles } from "./content";

export async function getRelatedArticles(
  article: NormalizedArticle,
  limit = 3,
): Promise<NormalizedArticle[]> {
  const all = await getPublishedArticles();
  const exclude = new Set([article.slug]);
  const picked: NormalizedArticle[] = [];

  const pushUnique = (candidates: NormalizedArticle[]) => {
    for (const c of candidates) {
      if (picked.length >= limit) return;
      if (exclude.has(c.slug)) continue;
      picked.push(c);
      exclude.add(c.slug);
    }
  };

  if (article.related.length > 0) {
    const manual = article.related
      .map((slug) => all.find((a) => a.slug === slug))
      .filter((a): a is NormalizedArticle => Boolean(a));
    pushUnique(manual);
  }

  if (picked.length < limit && article.topics.length > 0) {
    const byTopic = all.filter(
      (a) =>
        a.slug !== article.slug &&
        a.topics.some((t) => article.topics.includes(t)),
    );
    pushUnique(
      byTopic.sort((a, b) => b.date.getTime() - a.date.getTime()),
    );
  }

  if (picked.length < limit && article.tags.length > 0) {
    const byTag = all.filter(
      (a) =>
        a.slug !== article.slug && a.tags.some((t) => article.tags.includes(t)),
    );
    pushUnique(byTag.sort((a, b) => b.date.getTime() - a.date.getTime()));
  }

  if (picked.length < limit) {
    const otherTypes = all.filter(
      (a) => a.slug !== article.slug && a.type !== article.type,
    );
    pushUnique(
      otherTypes.sort((a, b) => b.date.getTime() - a.date.getTime()),
    );
  }

  if (picked.length < limit) {
    pushUnique(all.sort((a, b) => b.date.getTime() - a.date.getTime()));
  }

  return picked.slice(0, limit);
}

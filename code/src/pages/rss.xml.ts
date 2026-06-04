import rss from "@astrojs/rss";
import { getPublishedArticles } from "../lib/content";
import { publication } from "../config/publication";

export async function GET(context: { site: string | undefined }) {
  const articles = (await getPublishedArticles())
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 20);

  const site = context.site ?? publication.url;

  return rss({
    title: publication.name,
    description: publication.tagline,
    site,
    items: articles.map((article) => ({
      title: article.title,
      description: article.subtitle,
      pubDate: article.date,
      link: new URL(article.url, site).href,
      categories: [article.type, ...article.topics],
    })),
    customData: `<language>en-us</language>`,
  });
}

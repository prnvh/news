// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { publication } from "./src/config/publication.ts";

// https://astro.build/config
export default defineConfig({
  site: publication.url,
  output: "static",
  adapter: vercel(),
  integrations: [
    mdx({
      components: {
        Callout: "./src/components/mdx/Callout.astro",
        Aside: "./src/components/mdx/Aside.astro",
        Figure: "./src/components/mdx/Figure.astro",
        PaperInfo: "./src/components/mdx/PaperInfo.astro",
        SourceList: "./src/components/mdx/SourceList.astro",
        ReadNext: "./src/components/mdx/ReadNext.astro",
      },
    }),
    sitemap({
      filter: (page) => !page.includes("__draft"),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
});

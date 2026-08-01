import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articlesRoot = "../articles";
const articlePattern = "**/*.{md,mdx}";

const sourceSchema = z.object({
  label: z.string(),
  url: z.string().url(),
  type: z
    .enum([
      "paper",
      "blog",
      "report",
      "news",
      "video",
      "website",
      "dataset",
      "code",
      "other",
    ])
    .default("other"),
  note: z.string().optional(),
});

export const baseArticleSchema = z.object({
  title: z.string().min(1, "title is required"),
  subtitle: z.string().min(1, "subtitle is required"),
  description: z.string().optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  author: z.string().default("Frontier Manual"),
  slug: z.string().optional(),
  topics: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  summary: z
    .array(z.string())
    .min(1, "summary must have at least 1 item")
    .max(6, "summary must have at most 6 items"),
  readingTime: z.string().optional(),
  featured: z.boolean().default(false),
  homepage: z.boolean().default(false),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  heroImagePosition: z
    .enum(["left", "right", "wide", "none"])
    .default("right"),
  dek: z.string().optional(),
  related: z.array(z.string()).default([]),
  sources: z.array(sourceSchema).default([]),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    })
    .optional(),
});

const briefSchema = baseArticleSchema.extend({
  type: z.literal("brief").default("brief"),
  sections: z
    .array(
      z.enum([
        "what-happened",
        "why-it-matters",
        "technical-context",
        "what-to-watch-next",
      ]),
    )
    .optional(),
});

const researchNoteSchema = baseArticleSchema
  .omit({ subtitle: true, summary: true })
  .extend({
    type: z.literal("research-note").default("research-note"),
    // Paper notes are written as freeform markdown (Source / Authors / Goals / Notes).
    // Keep these optional so the YAML stays thin.
    subtitle: z.string().optional().default(""),
    summary: z.array(z.string()).default([]),
    paper: z
      .object({
        title: z.string(),
        authors: z.array(z.string()).default([]),
        year: z.union([z.string(), z.number()]).optional(),
        source: z.string().optional(),
        url: z.string().url().optional(),
        venue: z.string().optional(),
      })
      .optional(),
    resultType: z
      .enum([
        "paper",
        "benchmark",
        "technical-report",
        "blog",
        "dataset",
        "model-release",
        "other",
      ])
      .default("paper"),
  });

const essaySchema = baseArticleSchema.extend({
  type: z.literal("essay").default("essay"),
  pullQuote: z
    .object({
      text: z.string(),
      attribution: z.string().optional(),
    })
    .optional(),
});

const fieldMapSchema = baseArticleSchema.extend({
  type: z.literal("field-map").default("field-map"),
  orientation: z.string().min(1, "orientation is required for field maps"),
  mapSections: z
    .array(
      z.object({
        number: z.string(),
        title: z.string(),
        description: z.string(),
        readingTime: z.string().optional(),
        notesCount: z.number().int().nonnegative().optional(),
        papersCount: z.number().int().nonnegative().optional(),
        anchor: z.string().optional(),
        href: z.string().optional(),
        /** Article slugs (concept notes or paper breakdowns) shown under this section. */
        slugs: z
          .array(z.union([z.string(), z.null()]))
          .optional()
          .transform((list) =>
            list
              ?.filter((slug): slug is string => typeof slug === "string")
              .map((slug) => slug.trim())
              .filter(Boolean),
          ),
      }),
    )
    .min(1, "mapSections must have at least one section"),
  difficulty: z
    .enum(["accessible", "intermediate", "technical"])
    .default("intermediate"),
});

const pageSchema = z.object({
  title: z.string().min(1, "title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    })
    .optional(),
});

const topicSchema = z.object({
  name: z.string().min(1, "name is required"),
  slug: z.string().min(1, "slug is required"),
  description: z.string().min(1, "description is required"),
  keyQuestions: z.array(z.string()).default([]),
  coreConcepts: z
    .array(
      z.object({
        term: z.string(),
        definition: z.string(),
      }),
    )
    .default([]),
  furtherReading: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
        type: z.string().optional(),
      }),
    )
    .default([]),
  featuredSlugs: z.array(z.string()).default([]),
});

export const collections = {
  briefs: defineCollection({
    loader: glob({
      pattern: articlePattern,
      base: `${articlesRoot}/concept-notes`,
    }),
    schema: briefSchema,
  }),
  researchNotes: defineCollection({
    loader: glob({
      pattern: articlePattern,
      base: `${articlesRoot}/paper-breakdowns`,
    }),
    schema: researchNoteSchema,
  }),
  essays: defineCollection({
    loader: glob({
      pattern: articlePattern,
      base: `${articlesRoot}/field-breakdowns`,
    }),
    schema: essaySchema,
  }),
  fieldMaps: defineCollection({
    loader: glob({
      pattern: articlePattern,
      base: `${articlesRoot}/field-maps`,
    }),
    schema: fieldMapSchema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: articlePattern, base: `${articlesRoot}/pages` }),
    schema: pageSchema,
  }),
  topics: defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: `${articlesRoot}/topics` }),
    schema: topicSchema,
  }),
};

export const publication = {
  name: "Frontier Manual",
  tagline:
    "A public research notebook on brains, cognition, and embodied intelligence.",
  url: "https://frontiermanual.com",
  author: "Frontier Manual",
  email: "hello@frontiermanual.com",
  defaultOgImage: "/images/og-default.svg",
  newsletterProvider: "supabase" as "supabase" | "buttondown",
  newsletterActionUrl: "/api/newsletter/subscribe",
  nav: [
    { label: "Field Maps", href: "/field-maps" },
    { label: "Paper Notes", href: "/paper-notes" },
    { label: "Concept Notes", href: "/concept-notes" },
    { label: "Field Breakdowns", href: "/field-breakdowns" },
    { label: "Topics", href: "/topics" },
    { label: "Start Here", href: "/start-here" },
    { label: "About", href: "/about" },
  ],
};

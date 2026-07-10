export const publication = {
  name: "Frontier Manual",
  tagline: "A field guide to computing's new frontiers.",
  url: "https://frontiermanual.com",
  author: "Frontier Manual",
  email: "hello@frontiermanual.com",
  defaultOgImage: "/images/og-default.svg",
  newsletterProvider: "supabase" as "supabase" | "buttondown",
  newsletterActionUrl: "/api/newsletter/subscribe",
  nav: [
    { label: "Field Maps", href: "/field-maps" },
    { label: "Paper Breakdowns", href: "/paper-breakdowns" },
    { label: "Concept Notes", href: "/concept-notes" },
    { label: "Field Breakdowns", href: "/field-breakdowns" },
    { label: "Topics", href: "/topics" },
    { label: "Start Here", href: "/start-here" },
    { label: "About", href: "/about" },
  ],
};

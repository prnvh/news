export const publication = {
  name: "Frontier Manual",
  tagline:
    "A publication on frontier AI, research culture, and the systems behind technical progress.",
  url: "https://frontiermanual.com",
  author: "Frontier Manual",
  email: "hello@frontiermanual.com",
  defaultOgImage: "/images/og-default.svg",
  newsletterProvider: "supabase" as "supabase" | "buttondown",
  newsletterActionUrl: "/api/newsletter/subscribe",
  nav: [
    { label: "Briefs", href: "/briefs" },
    { label: "Research Notes", href: "/research-notes" },
    { label: "Essays", href: "/essays" },
    { label: "Field Maps", href: "/field-maps" },
    { label: "Topics", href: "/topics" },
    { label: "Start Here", href: "/start-here" },
    { label: "About", href: "/about" },
  ],
};

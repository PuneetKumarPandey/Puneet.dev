export const SITE_CONFIG = {
  name: "Puneet Pandey",
  title: "Puneet Pandey — AI Application Developer & Full Stack Engineer",
  description:
    "Building real-world AI systems and intelligent products. Based in Bengaluru, India.",
  url: "https://puneetpandey.dev",
  ogImage: "/og-image.png",
  // email: "hello@puneetpandey.dev", // ✅ keep this
  email: "puneetrkt3@gmail.com",
  location: "Bengaluru, India",

  nav: [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Systems", href: "#systems" },
    { label: "Vision", href: "#vision" },
    { label: "Contact", href: "#contact" },
  ],

  social: {
    github: "https://github.com/PuneetKumarPandey",
    linkedin: "https://www.linkedin.com/in/puneetkumarpandey/",
    twitter: "https://twitter.com/puneetpandey",
  },
} as const;

export type NavItem = (typeof SITE_CONFIG.nav)[number];

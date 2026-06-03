export const SITE = {
  name: "Operator Mode",
  tagline: "Build. Automate. Scale.",
  description:
    "I design and build custom websites, automation workflows, CRM systems, and AI-powered solutions that help businesses operate more efficiently.",
  footerDescription:
    "Independent developer focused on modern web development, automation, and business systems.",
  seoDescription:
    "Full-stack development, AI automation, workflow engineering, CRM systems, and technical SEO solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const SEO_KEYWORDS = [
  "Full Stack Developer",
  "AI Automation Developer",
  "n8n Developer",
  "SEO Specialist",
  "Custom Website Developer",
  "Workflow Automation",
] as const;

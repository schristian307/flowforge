export const SITE = {
  name: "FlowForge",
  tagline: "Build. Automate. Scale.",
  description:
    "Custom software, AI automation, CRM systems, and SEO solutions engineered for growth.",
  subheading:
    "Custom websites, AI automations, CRM systems, and SEO solutions that help businesses operate more efficiently.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@flowforge.dev",
} as const;

export const SEO_KEYWORDS = [
  "Full Stack Developer",
  "AI Automation Developer",
  "n8n Developer",
  "SEO Specialist",
  "Custom Website Developer",
  "Workflow Automation",
] as const;

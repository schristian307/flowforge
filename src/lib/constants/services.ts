export const SERVICE_OPTIONS = [
  "Custom Web Development",
  "AI Automation Systems",
  "CRM Development",
  "Lead Generation Systems",
  "SEO Optimization",
  "Business Process Automation",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export const BUDGET_SCORES: Record<(typeof BUDGET_OPTIONS)[number], number> = {
  "Under $1,000": 1,
  "$1,000 - $5,000": 2,
  "$5,000 - $15,000": 3,
  "$15,000 - $50,000": 4,
  "$50,000+": 5,
  "Not sure yet": 2,
};

export const SERVICES = [
  {
    title: "Custom Web Development",
    description:
      "Modern web applications, dashboards, and client portals built with Next.js and TypeScript.",
    icon: "Code2",
  },
  {
    title: "AI Automation Systems",
    description:
      "Intelligent workflows that qualify leads, route inquiries, and automate repetitive tasks.",
    icon: "Bot",
  },
  {
    title: "CRM Development",
    description:
      "Custom CRM platforms with pipelines, lead tracking, and integrated communication flows.",
    icon: "Users",
  },
  {
    title: "Lead Generation Systems",
    description:
      "End-to-end capture, scoring, and routing systems that convert visitors into qualified leads.",
    icon: "Target",
  },
  {
    title: "SEO Optimization",
    description:
      "Technical SEO, performance tuning, and search visibility improvements that drive organic growth.",
    icon: "Search",
  },
  {
    title: "Business Process Automation",
    description:
      "Connect tools, eliminate manual steps, and streamline operations with n8n and API integrations.",
    icon: "Workflow",
  },
] as const;

export const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Supabase", level: 92 },
      { name: "PostgreSQL", level: 85 },
      { name: "Node.js", level: 88 },
    ],
  },
  {
    category: "Automation",
    skills: [
      { name: "n8n", level: 94 },
      { name: "AI Workflows", level: 88 },
      { name: "Webhooks", level: 90 },
      { name: "API Integrations", level: 92 },
    ],
  },
  {
    category: "Marketing",
    skills: [
      { name: "SEO", level: 90 },
      { name: "Technical SEO", level: 92 },
      { name: "Analytics", level: 85 },
      { name: "Conversion Optimization", level: 82 },
    ],
  },
] as const;

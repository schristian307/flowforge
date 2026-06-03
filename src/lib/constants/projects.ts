export const PROJECTS = [
  {
    id: "ai-lead-qualification",
    title: "AI Lead Qualification Workflow",
    category: "Automation",
    stack: ["n8n", "TypeScript", "Supabase", "SMTP"],
    description:
      "Automated pipeline that captures website inquiries, scores leads, and routes follow-ups.",
    challenge:
      "Website inquiries arrived by email with no consistent way to score urgency, service fit, or next steps.",
    solution:
      "Built an n8n workflow that receives form submissions via webhook, applies scoring rules based on service type and message content, stores records in Supabase, sends internal notifications, and triggers automated client responses.",
    outcome:
      "A repeatable intake system where every lead is logged, scored, and routed without manual copy-paste between tools.",
  },
  {
    id: "journal-platform",
    title: "Academic Journal Management Platform",
    category: "Web Development",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    description:
      "Submission and editorial workflow for managing academic publications.",
    challenge:
      "Submission tracking, author communication, and review status lived in scattered email threads and spreadsheets.",
    solution:
      "Developed a Next.js application with author submission forms, Supabase-backed data storage, role-based admin access, and automated email notifications for status changes.",
    outcome:
      "One platform to receive submissions, track review progress, and notify authors — replacing manual coordination.",
  },
  {
    id: "technical-seo",
    title: "Technical SEO & Site Optimization",
    category: "SEO",
    stack: ["Technical SEO", "Analytics", "Performance"],
    description:
      "Site audits, on-page fixes, and performance improvements for search visibility.",
    challenge:
      "Sites had crawl issues, slow load times, weak metadata, and no clear picture of what was blocking organic growth.",
    solution:
      "Ran technical audits, fixed indexing and metadata problems, improved Core Web Vitals where possible, and set up analytics to track search and page performance over time.",
    outcome:
      "Clearer search foundation with documented fixes, measurable page speed gains, and ongoing visibility into traffic patterns.",
  },
  {
    id: "lead-intake-pipeline",
    title: "Lead Generation & Intake System",
    category: "Lead Generation",
    stack: ["n8n", "Webhooks", "Supabase", "Gmail SMTP"],
    description:
      "End-to-end capture, storage, and routing for inbound business inquiries.",
    challenge:
      "Leads from contact forms were easy to miss, hard to prioritize, and required manual follow-up each time.",
    solution:
      "Connected form submissions to an n8n automation that validates data, writes to Supabase, assigns a priority tier, alerts the owner, and sends a confirmation email to the prospect.",
    outcome:
      "Reliable lead capture with automatic storage and notification — nothing falls through when volume picks up.",
  },
  {
    id: "custom-website",
    title: "Custom Business Website",
    category: "Web Development",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    description:
      "Modern marketing sites with fast performance, responsive layouts, and integrated inquiry forms.",
    challenge:
      "Businesses needed a professional web presence that loads quickly, works on mobile, and captures inquiries without a bloated CMS.",
    solution:
      "Built custom Next.js sites with Tailwind styling, accessible layouts, contact forms connected to Supabase, and deployment on Vercel for fast global delivery.",
    outcome:
      "Clean, maintainable sites that present services clearly and funnel inquiries into a backend the client can actually manage.",
  },
  {
    id: "crm-pipeline",
    title: "CRM & Lead Pipeline System",
    category: "CRM",
    stack: ["Next.js", "Supabase", "PostgreSQL"],
    description:
      "Lightweight CRM for tracking contacts, services, and inquiry status.",
    challenge:
      "Spreadsheets and inbox folders were not enough to track who inquired, what they needed, or where each conversation stood.",
    solution:
      "Built a Supabase-backed CRM with contact records, service tags, budget fields, inquiry timestamps, and an admin dashboard to search, filter, and manage leads.",
    outcome:
      "Centralized lead history with structured data — the same pattern used to power the contact dashboard on this portfolio.",
  },
] as const;

export const PROJECT_FILTERS = [
  "All",
  "Automation",
  "Web Development",
  "SEO",
  "Lead Generation",
  "CRM",
] as const;

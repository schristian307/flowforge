const DEFAULT_SITE_URL = "https://www.operatormode.dev";

export const SITE = {
  name: "Operator Mode",
  tagline: "Build. Automate. Scale.",
  description:
    "I design and build custom websites, automation workflows, CRM systems, and AI-powered solutions that help businesses operate more efficiently.",
  footerDescription:
    "Independent developer focused on modern web development, automation, and business systems.",
  seoDescription:
    "Full-stack development, AI automation, workflow engineering, CRM systems, and technical SEO solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
} as const;

export function resolveSiteUrl(request?: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/$/, "");
  }

  if (request) {
    const host =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");

    if (host && !host.includes("localhost")) {
      const protocol = request.headers.get("x-forwarded-proto") ?? "https";
      return `${protocol}://${host}`.replace(/\/$/, "");
    }
  }

  return DEFAULT_SITE_URL;
}

export const SEO_KEYWORDS = [
  "Full Stack Developer",
  "AI Automation Developer",
  "n8n Developer",
  "SEO Specialist",
  "Custom Website Developer",
  "Workflow Automation",
] as const;

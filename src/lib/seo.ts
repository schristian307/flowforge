import { SITE, SEO_KEYWORDS } from "@/lib/constants/site";
import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        jobTitle: "Full Stack Developer & Automation Engineer",
        url: SITE.url,
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Supabase",
          "n8n",
          "AI Automation",
          "SEO",
          "CRM Development",
        ],
        worksFor: {
          "@type": "Organization",
          name: SITE.name,
        },
      },
    ],
  };
}

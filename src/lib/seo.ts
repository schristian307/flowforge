import { SITE, SEO_KEYWORDS } from "@/lib/constants/site";
import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.seoDescription,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: "Christian Sales" }],
  creator: "Christian Sales",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.seoDescription,
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
        description: SITE.seoDescription,
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: "Christian Sales",
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
      },
    ],
  };
}

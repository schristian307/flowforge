import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { NAV_LINKS } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";

export function Footer() {
  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";
  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";

  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">{SITE.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {SITE.footerDescription}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="size-5" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { Button, buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const githubUrl =
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com";
  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="#home"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {SITE.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/resume.pdf"
            download="Christian-Sales-Resume.pdf"
            aria-label="Download Christian Sales resume"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          >
            <FileDown className="size-4" />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          >
            <LinkedInIcon className="size-4" />
          </a>
          <Link
            href="#contact"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Get In Touch
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <a
                  href="/resume.pdf"
                  download="Christian-Sales-Resume.pdf"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <FileDown className="mr-2 size-4" />
                  Resume
                </a>
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className={cn(buttonVariants({ size: "sm" }), "flex-1")}
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

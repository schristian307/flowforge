"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedGrid } from "@/components/shared/AnimatedGrid";
import { GradientGlow } from "@/components/shared/GradientGlow";
import { PipelineVisualization } from "@/components/shared/PipelineVisualization";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden pt-16"
    >
      <AnimatedGrid />
      <GradientGlow className="pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-6 inline-flex items-center rounded-full border border-border/60 bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted-foreground backdrop-blur-sm">
            Full-Stack · Automation · SEO
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {SITE.tagline}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            {SITE.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              View Projects
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              href="#contact"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Book a Consultation
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <PipelineVisualization />
        </motion.div>
      </div>
    </section>
  );
}

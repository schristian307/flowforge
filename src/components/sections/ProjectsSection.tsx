"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/constants/projects";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        label="Projects"
        title="Selected work"
        description="Systems and workflows across development, automation, SEO, and lead management."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="col-span-2 py-16 text-center text-muted-foreground">
            No projects match this filter.
          </p>
        ) : (
          filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className={cn(
                "group rounded-xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm",
                "transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_40px_-16px_rgba(59,130,246,0.2)]"
              )}
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{project.category}</Badge>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-medium text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 space-y-4 border-t border-border/60 pt-5">
                <div>
                  <p className="text-xs font-medium tracking-wider text-primary uppercase">
                    Challenge
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-primary uppercase">
                    Solution
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-primary uppercase">
                    Outcome
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}

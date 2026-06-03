"use client";

import {
  Bot,
  Code2,
  Search,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SERVICES } from "@/lib/constants/services";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Bot,
  Users,
  Target,
  Search,
  Workflow,
};

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="services" className="bg-surface/30">
      <SectionHeader
        label="Services"
        title="What I build"
        description="End-to-end development and automation for businesses that need reliable, scalable systems."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon] ?? Code2;
          return (
            <motion.div
              key={service.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className={cn(
                "group rounded-xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm",
                "transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.25)]"
              )}
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-border bg-background text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                <Icon className="size-5" />
              </div>
              <h3 className="text-base font-medium text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

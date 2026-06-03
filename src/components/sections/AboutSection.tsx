import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { PORTFOLIO_STATS } from "@/lib/constants/stats";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeader
        label="About"
        title="Building systems that work"
        description="Independent developer specializing in full-stack applications, automation pipelines, and search optimization."
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            Focused on shipping practical software — custom web applications,
            AI-powered automation workflows, CRM systems, and lead generation
            pipelines that reduce manual work and scale with your business.
          </p>
          <p>
            From Next.js frontends to Supabase backends, n8n automations to
            technical SEO — every project is built with modern tools, clean
            architecture, and measurable outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PORTFOLIO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-[120px] flex-col justify-center rounded-xl border border-border/60 bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <p className="text-3xl font-semibold text-foreground md:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

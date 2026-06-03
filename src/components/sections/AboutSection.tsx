import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { PORTFOLIO_STATS } from "@/lib/constants/stats";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeader
        label="About"
        title="What I do"
        description="Independent developer — full-stack applications, automation, and technical SEO."
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            I build custom web applications, AI-powered automation workflows, and
            CRM systems that replace manual work with reliable, measurable
            processes. I develop lead generation pipelines and workflow systems
            that capture, score, and route inquiries without spreadsheets or
            copy-paste between tools.
          </p>
          <p>
            I automate business operations with n8n, API integrations, and modern
            backends — and I improve technical SEO so sites load fast, rank
            well, and convert. From Next.js frontends to Supabase data layers,
            every project is built with clean architecture and outcomes you can
            track.
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

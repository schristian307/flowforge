import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SkillBar } from "@/components/shared/SkillBar";
import { SKILL_GROUPS } from "@/lib/constants/skills";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="bg-surface/30">
      <SectionHeader
        label="Skills"
        title="Technical expertise"
        description="Proficiency across development, automation, and marketing technology."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-sm font-medium tracking-[0.15em] text-primary uppercase">
              {group.category}
            </h3>
            <div className="space-y-5">
              {group.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

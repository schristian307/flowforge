import { BUDGET_OPTIONS, BUDGET_SCORES } from "@/lib/constants/services";

export function getBudgetScore(budget: string): number {
  if (budget in BUDGET_SCORES) {
    return BUDGET_SCORES[budget as (typeof BUDGET_OPTIONS)[number]];
  }
  return 2;
}

export function getLeadScoreLabel(score: number): string {
  if (score >= 4.5) return "High";
  if (score >= 3) return "Medium";
  if (score >= 2) return "Low";
  return "Minimal";
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth";
import { getBudgetScore } from "@/lib/lead-score";
import type {
  ActionResult,
  Contact,
  LeadChartData,
  LeadStats,
} from "@/types/contact";
import {
  subDays,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  format,
} from "date-fns";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email || !isAdminEmail(user.email)) {
    return { supabase: null, user: null };
  }

  return { supabase, user };
}

export async function getLeads(): Promise<ActionResult<Contact[]>> {
  const { supabase, user } = await requireAdmin();
  if (!supabase || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: "Failed to fetch leads" };
  }

  return { success: true, data: data as Contact[] };
}

export async function deleteLead(id: string): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  if (!supabase || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    return { success: false, error: "Failed to delete lead" };
  }

  return { success: true };
}

function aggregateLeads(
  leads: { service: string; budget: string; created_at: string }[]
) {
  const now = new Date();
  const sevenDaysAgo = subDays(now, 7);
  const thirtyDaysAgo = subDays(now, 30);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const serviceCounts: Record<string, number> = {};
  const budgetCounts: Record<string, number> = {};
  const scoreBuckets: Record<string, number> = {
    High: 0,
    Medium: 0,
    Low: 0,
    Minimal: 0,
  };
  const dayCounts: Record<string, number> = {};

  let newLeads = 0;
  let monthlyInquiries = 0;
  let totalScore = 0;

  for (let i = 29; i >= 0; i--) {
    const d = subDays(now, i);
    dayCounts[format(d, "MMM d")] = 0;
  }

  for (const lead of leads) {
    const createdAt = parseISO(lead.created_at);
    const score = getBudgetScore(lead.budget);
    totalScore += score;

    serviceCounts[lead.service] = (serviceCounts[lead.service] ?? 0) + 1;
    budgetCounts[lead.budget] = (budgetCounts[lead.budget] ?? 0) + 1;

    if (score >= 4) scoreBuckets.High++;
    else if (score >= 3) scoreBuckets.Medium++;
    else if (score >= 2) scoreBuckets.Low++;
    else scoreBuckets.Minimal++;

    if (createdAt >= sevenDaysAgo) newLeads++;
    if (isWithinInterval(createdAt, { start: monthStart, end: monthEnd })) {
      monthlyInquiries++;
    }

    if (createdAt >= thirtyDaysAgo) {
      const key = format(createdAt, "MMM d");
      if (key in dayCounts) dayCounts[key]++;
    }
  }

  const topService =
    Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  const averageLeadScore =
    leads.length > 0
      ? Math.round((totalScore / leads.length) * 10) / 10
      : 0;

  return {
    totalLeads: leads.length,
    newLeads,
    topService,
    monthlyInquiries,
    averageLeadScore,
    inquiriesByDay: Object.entries(dayCounts).map(([label, value]) => ({
      label,
      value,
    })),
    byService: Object.entries(serviceCounts).map(([label, value]) => ({
      label,
      value,
    })),
    byBudget: Object.entries(budgetCounts).map(([label, value]) => ({
      label,
      value,
    })),
    leadScoreDistribution: Object.entries(scoreBuckets).map(
      ([label, value]) => ({ label, value })
    ),
  };
}

export async function getLeadStats(): Promise<ActionResult<LeadStats>> {
  const { supabase, user } = await requireAdmin();
  if (!supabase || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("service, budget, created_at");

  if (error) {
    return { success: false, error: "Failed to fetch stats" };
  }

  const aggregated = aggregateLeads(data ?? []);

  return {
    success: true,
    data: {
      totalLeads: aggregated.totalLeads,
      newLeads: aggregated.newLeads,
      topService: aggregated.topService,
      monthlyInquiries: aggregated.monthlyInquiries,
      averageLeadScore: aggregated.averageLeadScore,
    },
  };
}

export async function getLeadChartData(): Promise<ActionResult<LeadChartData>> {
  const { supabase, user } = await requireAdmin();
  if (!supabase || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("service, budget, created_at");

  if (error) {
    return { success: false, error: "Failed to fetch chart data" };
  }

  const aggregated = aggregateLeads(data ?? []);

  return {
    success: true,
    data: {
      inquiriesByDay: aggregated.inquiriesByDay,
      byService: aggregated.byService,
      byBudget: aggregated.byBudget,
      leadScoreDistribution: aggregated.leadScoreDistribution,
      averageLeadScore: aggregated.averageLeadScore,
    },
  };
}

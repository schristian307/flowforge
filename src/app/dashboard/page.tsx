import { getLeads, getLeadStats, getLeadChartData } from "@/actions/leads";
import { StatsWidgets } from "@/components/dashboard/StatsWidgets";
import { LeadCharts } from "@/components/dashboard/LeadCharts";
import { LeadsTable } from "@/components/dashboard/LeadsTable";

export default async function DashboardPage() {
  const [leadsResult, statsResult, chartResult] = await Promise.all([
    getLeads(),
    getLeadStats(),
    getLeadChartData(),
  ]);

  const leads = leadsResult.success ? (leadsResult.data ?? []) : [];
  const stats = statsResult.success
    ? statsResult.data!
    : {
        totalLeads: 0,
        newLeads: 0,
        topService: "N/A",
        monthlyInquiries: 0,
        averageLeadScore: 0,
      };

  const chartData = chartResult.success
    ? chartResult.data!
    : {
        inquiriesByDay: [],
        byService: [],
        byBudget: [],
        leadScoreDistribution: [],
        averageLeadScore: 0,
      };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact inquiries and lead analytics
        </p>
      </div>

      <StatsWidgets stats={stats} />

      <LeadCharts chartData={chartData} />

      <LeadsTable initialLeads={leads} />
    </div>
  );
}

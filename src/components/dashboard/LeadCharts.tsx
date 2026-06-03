"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeadChartData } from "@/types/contact";

interface LeadChartsProps {
  chartData: LeadChartData;
}

const lineConfig = {
  inquiries: { label: "Inquiries", color: "var(--chart-1)" },
} satisfies ChartConfig;

const serviceConfig = {
  value: { label: "Leads", color: "var(--chart-1)" },
} satisfies ChartConfig;

const budgetConfig = {
  value: { label: "Leads", color: "var(--chart-2)" },
} satisfies ChartConfig;

const scoreColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

const scoreConfig = {
  High: { label: "High", color: "var(--chart-1)" },
  Medium: { label: "Medium", color: "var(--chart-2)" },
  Low: { label: "Low", color: "var(--chart-3)" },
  Minimal: { label: "Minimal", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function LeadCharts({ chartData }: LeadChartsProps) {
  const lineData = chartData.inquiriesByDay.map((d) => ({
    date: d.label,
    inquiries: d.value,
  }));

  const serviceData = chartData.byService.map((d) => ({
    name: d.label.length > 18 ? d.label.slice(0, 16) + "…" : d.label,
    value: d.value,
    fullName: d.label,
  }));

  const budgetData = chartData.byBudget.map((d) => ({
    name: d.label,
    value: d.value,
  }));

  const scoreData = chartData.leadScoreDistribution.filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Inquiries (30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineConfig} className="h-[220px] w-full">
              <LineChart data={lineData} margin={{ left: 0, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval="preserveStartEnd"
                  minTickGap={24}
                />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="inquiries"
                  stroke="var(--color-inquiries)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lead Score Distribution
            </CardTitle>
            <p className="text-2xl font-semibold text-foreground">
              Avg {chartData.averageLeadScore}/5
            </p>
          </CardHeader>
          <CardContent>
            {scoreData.length === 0 ? (
              <p className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                No lead data yet
              </p>
            ) : (
              <ChartContainer config={scoreConfig} className="h-[220px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie
                    data={scoreData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell
                        key={entry.label}
                        fill={scoreColors[index % scoreColors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Service Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {serviceData.length === 0 ? (
              <p className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                No service data yet
              </p>
            ) : (
              <ChartContainer config={serviceConfig} className="h-[220px] w-full">
                <BarChart data={serviceData} layout="vertical" margin={{ left: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={100}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(_, payload) =>
                          payload?.[0]?.payload?.fullName ?? ""
                        }
                      />
                    }
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {budgetData.length === 0 ? (
              <p className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                No budget data yet
              </p>
            ) : (
              <ChartContainer config={budgetConfig} className="h-[220px] w-full">
                <BarChart data={budgetData} margin={{ left: 0, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Users, UserPlus, TrendingUp, Calendar, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeadStats } from "@/types/contact";

interface StatsWidgetsProps {
  stats: LeadStats;
}

const widgets = [
  {
    key: "totalLeads" as const,
    label: "Total Leads",
    icon: Users,
    format: (v: number | string) => v.toLocaleString(),
  },
  {
    key: "newLeads" as const,
    label: "New Leads (7d)",
    icon: UserPlus,
    format: (v: number | string) => v.toLocaleString(),
  },
  {
    key: "topService" as const,
    label: "Top Service",
    icon: TrendingUp,
    format: (v: number | string) => String(v),
  },
  {
    key: "monthlyInquiries" as const,
    label: "Monthly Inquiries",
    icon: Calendar,
    format: (v: number | string) => v.toLocaleString(),
  },
  {
    key: "averageLeadScore" as const,
    label: "Avg Lead Score",
    icon: Star,
    format: (v: number | string) => `${v}/5`,
  },
];

export function StatsWidgets({ stats }: StatsWidgetsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        const value = widget.format(stats[widget.key]);

        return (
          <Card key={widget.key} className="border-border/60 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {widget.label}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="truncate text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

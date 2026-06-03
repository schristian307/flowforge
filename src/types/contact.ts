export interface Contact {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

export interface LeadStats {
  totalLeads: number;
  newLeads: number;
  topService: string;
  monthlyInquiries: number;
  averageLeadScore: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface LeadChartData {
  inquiriesByDay: ChartDataPoint[];
  byService: ChartDataPoint[];
  byBudget: ChartDataPoint[];
  leadScoreDistribution: ChartDataPoint[];
  averageLeadScore: number;
}

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

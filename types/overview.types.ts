export interface BusinessOverviewStats {
  businessId: string;
  totalStaff: number;
  openPositions: number;
  recentEods7d: number;
  pendingEodApprovals: number;
  updatedAt: string;
}

export interface OverviewRecentInvoice {
  _id: string;
  staffId: string;
  staffName: string;
  staffEmail: string;
  periodStart: string;
  periodEnd: string;
  status: "draft" | "calculated" | "approved" | "paid";
  netPay: number;
  currency: string;
  createdAt: string;
}

export interface OverviewRecentInvoicesResponse {
  data: OverviewRecentInvoice[];
  total: number;
  limit: number;
}

export interface OverviewRecentEod {
  _id: string;
  staffId: string;
  staffName: string;
  staffEmail: string | null;
  date: string;
  hoursWorked: number;
  tasksCompleted: string;
  status: "submitted" | "reviewed" | "needs_revision";
  isApproved: boolean;
  createdAt: string;
}

export interface OverviewRecentEodsResponse {
  data: OverviewRecentEod[];
  total: number;
  limit: number;
}

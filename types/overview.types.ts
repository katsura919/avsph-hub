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

/* ── Attendance analytics ─────────────────────────────────────────────────── */

export interface AttendanceStats {
  businessId: string;
  rangeDays: number;
  totalRecords: number;
  statusCounts: {
    pending: number;
    approved: number;
    rejected: number;
  };
  totalHours: number;
  approvedHours: number;
  avgHoursPerDay: number;
  daily: { date: string; count: number; hours: number }[];
  updatedAt: string;
}

/* ── Recruitment analytics ────────────────────────────────────────────────── */

export interface RecruitmentStats {
  businessId: string;
  jobs: {
    total: number;
    open: number;
    draft: number;
    closed: number;
  };
  applicants: {
    total: number;
    active: number;
    hired: number;
    rejected: number;
    converted: number;
  };
  conversionRate: number;
  topOpenJobs: { jobId: string; title: string; applicantCount: number }[];
  updatedAt: string;
}

/* ── Workforce analytics ──────────────────────────────────────────────────── */

export interface WorkforceStats {
  businessId: string;
  totalStaff: number;
  byStatus: {
    active: number;
    on_leave: number;
    terminated: number;
  };
  byEmploymentType: Record<string, number>;
  byDepartment: { department: string; count: number }[];
  hires: { month: string; count: number }[];
  avgTenureMonths: number;
  updatedAt: string;
}

/* ── Payroll trend analytics ──────────────────────────────────────────────── */

export interface PayrollTrendCurrency {
  currency: string;
  periods: {
    month: string;
    netPay: number;
    calculatedPay: number;
    count: number;
  }[];
  breakdown: {
    regular: number;
    overtime: number;
    sundayPremium: number;
    nightDifferential: number;
    transportation: number;
  };
  statutory: {
    sss: number;
    pagIbig: number;
    philHealth: number;
  };
  totalNetPay: number;
  totalStatutory: number;
  invoiceCount: number;
}

export interface PayrollTrendStats {
  businessId: string;
  rangeMonths: number;
  currencies: PayrollTrendCurrency[];
  updatedAt: string;
}

// Types for Invoice feature

export type InvoiceStatus = "draft" | "calculated" | "approved" | "paid";
export type SalaryType = "hourly" | "daily" | "monthly" | "annual";

export interface InvoiceAdjustment {
  type: string;
  description?: string;
  amount: number;
}

export interface InvoiceEarningsBreakdown {
  regularEarnings: number;
  overtimeEarnings: number;
  sundayPremiumEarnings: number;
  nightDifferentialEarnings: number;
  transportationAllowanceEarnings: number;
}

export interface InvoiceStatutoryDeductions {
  sss: number;
  pagIbig: number;
  philHealth: number;
}

export interface Invoice {
  _id: string;
  staffId: string;
  businessId: string;
  currency: string;

  // Period details
  periodStart: string;
  periodEnd: string;

  // Calculation base
  totalHoursWorked: number;
  totalDaysWorked: number;
  salaryType: SalaryType;
  baseSalary: number;

  // Financials
  calculatedPay: number;
  earningsBreakdown: InvoiceEarningsBreakdown;
  statutoryDeductions: InvoiceStatutoryDeductions;
  deductions: InvoiceAdjustment[];
  additions: InvoiceAdjustment[];
  netPay: number;

  // Linkages
  eodIds: string[];
  eodCount: number;

  // State
  status: InvoiceStatus;
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
  notes?: string;

  // Staff info (stored in document)
  staffName: string;
  staffEmail: string;
  staffPosition: string;

  // Native
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // PHP Conversion (stored for non-PHP invoices)
  phpConversion?: {
    exchangeRate: number;
    baseSalaryPhp: number;
    calculatedPayPhp: number;
    netPayPhp: number;
    statutoryDeductions: InvoiceStatutoryDeductions;
    earningsBreakdownPhp: InvoiceEarningsBreakdown;
  };
}

// Invoice with staff details and linked EOD reports (from GET /invoices/:id)
export interface InvoiceDetail extends Invoice {
  staff?: {
    firstName: string;
    lastName: string;
    email: string;
    position?: string;
  };
  eodReports: Array<{
    _id: string;
    date: string;
    hoursWorked: number;
    regularHoursWorked?: number;
    overtimeHoursWorked?: number;
    nightDifferentialHours?: number;
    tasksCompleted: string;
    status: string;
    isApproved: boolean;
  }>;
}

// Request types
export interface GenerateInvoiceRequest {
  staffId: string;
  periodStart: string;
  periodEnd: string;
}

export interface GenerateBusinessInvoiceRequest {
  periodStart: string;
  periodEnd: string;
}

export interface ApproveInvoiceRequest {
  notes?: string;
}

export interface AddAdjustmentRequest {
  type: "deduction" | "addition";
  adjustmentType: string;
  description?: string;
  amount: number;
}

export interface RemoveAdjustmentRequest {
  type: "deduction" | "addition";
  index: number;
}

// Response types
export interface GenerateInvoiceResponse extends Invoice {
  message: string;
}

export interface BatchGenerateResult {
  message: string;
  summary: {
    total: number;
    generated: number;
    skipped: number;
    errors: number;
  };
  generated: Array<{
    _id: string;
    staffId: string;
    staffName: string;
    calculatedPay: number;
    netPay: number;
  }>;
  skipped: Array<{
    staffId: string;
    staffName: string;
    reason: string;
  }>;
  errors: Array<{
    staffId: string;
    staffName: string;
    reason: string;
  }>;
}

export interface RecalculateInvoiceResponse extends Invoice {
  message: string;
  recalculation: {
    previousHoursWorked: number;
    newHoursWorked: number;
    previousPay: number;
    newPay: number;
    eodsAdded: number;
    eodsRemoved: number;
  };
}

export interface ApproveInvoiceResponse extends Invoice {
  message: string;
}

export interface MarkPaidResponse extends Invoice {
  message: string;
}

export interface AdjustmentResponse extends Invoice {
  message: string;
}

export interface DeleteInvoiceResponse {
  message: string;
}

// Pagination
export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedInvoiceResponse {
  data: Invoice[];
  pagination: PaginationInfo;
}

// Query types
export interface InvoiceQuery {
  businessId?: string;
  staffId?: string;
  status?: InvoiceStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: string;
  limit?: string;
}

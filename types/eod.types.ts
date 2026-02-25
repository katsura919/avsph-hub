// Types for EOD (End of Day) Reports

export type EodStatus = "submitted" | "reviewed" | "needs_revision";

export interface EodReport {
  _id: string;
  staffId: string;
  businessId: string;
  date: string;
  hoursWorked: number;
  tasksCompleted: string;
  challenges?: string;
  nextDayPlan?: string;
  notes?: string;
  status: EodStatus;
  isApproved: boolean;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Enriched fields (populated by backend)
  staffName?: string;
  staffEmail?: string;
}

// Staff request types
export interface SubmitEodRequest {
  date: string;
  hoursWorked: number;
  tasksCompleted: string;
  challenges?: string;
  nextDayPlan?: string;
  notes?: string;
}

export interface EditOwnEodRequest {
  hoursWorked?: number;
  tasksCompleted?: string;
  challenges?: string;
  nextDayPlan?: string;
  notes?: string;
}

// Admin request types
export interface ReviewEodRequest {
  status: "reviewed" | "needs_revision";
  isApproved?: boolean;
  adminNotes?: string;
}

export interface AdminEditEodRequest {
  hoursWorked?: number;
  tasksCompleted?: string;
  date?: string;
  adminNotes?: string;
  status?: EodStatus;
  isApproved?: boolean;
}

// Response types
export interface SubmitEodResponse extends EodReport {
  message: string;
}

export interface EditEodResponse extends EodReport {
  message: string;
}

export interface ReviewEodResponse extends EodReport {
  message: string;
}

export interface DeleteEodResponse {
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

export interface PaginatedEodResponse {
  data: EodReport[];
  pagination: PaginationInfo;
}

// Query types
export interface EodQuery {
  startDate?: string;
  endDate?: string;
  status?: EodStatus;
  isApproved?: string;
  businessId?: string;
  staffId?: string;
  search?: string;
  page?: string;
  limit?: string;
}

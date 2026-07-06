// Types for leads (replaces GHL contact capture)
export interface Lead {
  _id: string;
  businessId: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  source: "contact_form" | "newsletter" | "other";
  status: "new" | "contacted" | "qualified" | "converted";
  notes?: string;
  tags?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LeadSource = Lead["source"];
export type LeadStatus = Lead["status"];

// Pagination types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface LeadListResponse {
  data: Lead[];
  pagination: PaginationInfo;
}

// Query params for fetching leads
export interface LeadQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  status?: LeadStatus;
  source?: LeadSource;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

// Filter-only subset shared by list + export (no pagination)
export type LeadFilterParams = Omit<LeadQueryParams, "page" | "limit">;

// Update lead request
export interface UpdateLeadRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: LeadSource;
  status?: LeadStatus;
  notes?: string;
  tags?: string[];
}

// Bulk action request/response
export type BulkLeadAction = "status" | "addTags" | "removeTags" | "delete";

export interface BulkLeadRequest {
  ids: string[];
  action: BulkLeadAction;
  value?: LeadStatus;
  tags?: string[];
}

export interface BulkLeadResponse {
  modified: number;
}

// Export response
export interface LeadExportResponse {
  data: Lead[];
  truncated: boolean;
  total: number;
}

// Response types
export interface DeleteLeadResponse {
  message: string;
}

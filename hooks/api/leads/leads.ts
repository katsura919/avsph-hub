import api from "@/utils/api";
import type {
  Lead,
  LeadListResponse,
  LeadQueryParams,
  LeadFilterParams,
  UpdateLeadRequest,
  DeleteLeadResponse,
  BulkLeadRequest,
  BulkLeadResponse,
  LeadExportResponse,
} from "@/types/leads.types";

// Serialize shared filter params (search/status/source/tags/date range)
const appendFilterParams = (
  qs: URLSearchParams,
  params?: LeadFilterParams,
): void => {
  if (params?.search) qs.append("search", params.search);
  if (params?.status) qs.append("status", params.status);
  if (params?.source) qs.append("source", params.source);
  if (params?.tags && params.tags.length) qs.append("tags", params.tags.join(","));
  if (params?.dateFrom) qs.append("dateFrom", params.dateFrom);
  if (params?.dateTo) qs.append("dateTo", params.dateTo);
};

// Get leads by business with search and pagination
export const getLeadsByBusiness = async (
  businessId: string,
  params?: LeadQueryParams,
): Promise<LeadListResponse> => {
  const queryParams = new URLSearchParams();

  appendFilterParams(queryParams, params);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const queryString = queryParams.toString();
  const url = `/businesses/${businessId}/leads${queryString ? `?${queryString}` : ""}`;

  const response = await api.get<LeadListResponse>(url);
  return response.data;
};

// Get distinct tags used across a business's leads
export const getLeadTags = async (
  businessId: string,
): Promise<string[]> => {
  const response = await api.get<{ tags: string[] }>(
    `/businesses/${businessId}/lead-tags`,
  );
  return response.data.tags;
};

// Export all matching leads (respects filters, capped server-side)
export const exportLeads = async (
  businessId: string,
  params?: LeadFilterParams,
): Promise<LeadExportResponse> => {
  const queryParams = new URLSearchParams();
  appendFilterParams(queryParams, params);
  const queryString = queryParams.toString();
  const url = `/businesses/${businessId}/leads/export${queryString ? `?${queryString}` : ""}`;

  const response = await api.get<LeadExportResponse>(url);
  return response.data;
};

// Bulk action on leads within a business
export const bulkLeads = async (
  businessId: string,
  body: BulkLeadRequest,
): Promise<BulkLeadResponse> => {
  const response = await api.post<BulkLeadResponse>(
    `/businesses/${businessId}/leads/bulk`,
    body,
  );
  return response.data;
};

// Get lead by ID
export const getLeadById = async (id: string): Promise<Lead> => {
  const response = await api.get<Lead>(`/leads/${id}`);
  return response.data;
};

// Update lead (status, notes, details)
export const updateLead = async (
  id: string,
  data: UpdateLeadRequest,
): Promise<Lead> => {
  const response = await api.patch<Lead>(`/leads/${id}`, data);
  return response.data;
};

// Delete lead (soft delete)
export const deleteLead = async (id: string): Promise<DeleteLeadResponse> => {
  const response = await api.delete<DeleteLeadResponse>(`/leads/${id}`);
  return response.data;
};

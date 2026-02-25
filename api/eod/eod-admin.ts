import api from "@/utils/api";
import type {
  EodReport,
  EodQuery,
  PaginatedEodResponse,
  ReviewEodRequest,
  ReviewEodResponse,
  AdminEditEodRequest,
  DeleteEodResponse,
} from "@/types/eod.types";

// Get all EOD reports (filtered by business access)
export const getAllEodReports = async (
  query?: EodQuery,
): Promise<EodReport[]> => {
  const params = new URLSearchParams();
  if (query?.businessId) params.append("businessId", query.businessId);
  if (query?.staffId) params.append("staffId", query.staffId);
  if (query?.status) params.append("status", query.status);
  if (query?.isApproved) params.append("isApproved", query.isApproved);
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);

  const queryString = params.toString();
  const url = queryString ? `/eod?${queryString}` : "/eod";

  const response = await api.get<EodReport[]>(url);
  return response.data;
};

// Get EOD reports by business (paginated, with search)
export const getEodByBusiness = async (
  businessId: string,
  query?: EodQuery,
): Promise<PaginatedEodResponse> => {
  const params = new URLSearchParams();
  if (query?.status) params.append("status", query.status);
  if (query?.isApproved) params.append("isApproved", query.isApproved);
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);
  if (query?.search) params.append("search", query.search);
  if (query?.page) params.append("page", query.page);
  if (query?.limit) params.append("limit", query.limit);

  const queryString = params.toString();
  const url = queryString
    ? `/businesses/${businessId}/eod?${queryString}`
    : `/businesses/${businessId}/eod`;

  const response = await api.get<PaginatedEodResponse>(url);
  return response.data;
};

// Get EOD reports by staff
export const getEodByStaff = async (
  staffId: string,
  query?: EodQuery,
): Promise<EodReport[]> => {
  const params = new URLSearchParams();
  if (query?.status) params.append("status", query.status);
  if (query?.isApproved) params.append("isApproved", query.isApproved);
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);

  const queryString = params.toString();
  const url = queryString
    ? `/staff/${staffId}/eod?${queryString}`
    : `/staff/${staffId}/eod`;

  const response = await api.get<EodReport[]>(url);
  return response.data;
};

// Get single EOD report by ID
export const getEodById = async (id: string): Promise<EodReport> => {
  const response = await api.get<EodReport>(`/eod/${id}`);
  return response.data;
};

// Review an EOD report (approve or return for revision)
export const reviewEod = async (
  id: string,
  data: ReviewEodRequest,
): Promise<ReviewEodResponse> => {
  const response = await api.put<ReviewEodResponse>(`/eod/${id}/review`, data);
  return response.data;
};

// Admin edit an EOD report (minor tweaks)
export const adminEditEod = async (
  id: string,
  data: AdminEditEodRequest,
): Promise<EodReport> => {
  const response = await api.put<EodReport>(`/eod/${id}`, data);
  return response.data;
};

// Soft delete an EOD report
export const deleteEod = async (id: string): Promise<DeleteEodResponse> => {
  const response = await api.delete<DeleteEodResponse>(`/eod/${id}`);
  return response.data;
};

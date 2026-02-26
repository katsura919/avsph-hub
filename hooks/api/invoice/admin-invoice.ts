import api from "@/utils/api";
import type {
  Invoice,
  InvoiceDetail,
  InvoiceQuery,
  PaginatedInvoiceResponse,
  GenerateInvoiceRequest,
  GenerateBusinessInvoiceRequest,
  GenerateInvoiceResponse,
  BatchGenerateResult,
  RecalculateInvoiceResponse,
  ApproveInvoiceRequest,
  ApproveInvoiceResponse,
  MarkPaidResponse,
  AddAdjustmentRequest,
  RemoveAdjustmentRequest,
  AdjustmentResponse,
  DeleteInvoiceResponse,
} from "@/types/invoice.types";

// ==================== GENERATION ====================

// Generate invoice for a single staff member
export const generateInvoice = async (
  data: GenerateInvoiceRequest,
): Promise<GenerateInvoiceResponse> => {
  const response = await api.post<GenerateInvoiceResponse>(
    "/invoices/generate",
    data,
  );
  return response.data;
};

// Batch generate invoices for all hourly staff in a business
export const generateBusinessInvoices = async (
  businessId: string,
  data: GenerateBusinessInvoiceRequest,
): Promise<BatchGenerateResult> => {
  const response = await api.post<BatchGenerateResult>(
    `/businesses/${businessId}/invoices/generate`,
    data,
  );
  return response.data;
};

// ==================== RETRIEVAL ====================

// Get all invoices (filtered by business access)
export const getAllInvoices = async (
  query?: InvoiceQuery,
): Promise<Invoice[]> => {
  const params = new URLSearchParams();
  if (query?.businessId) params.append("businessId", query.businessId);
  if (query?.staffId) params.append("staffId", query.staffId);
  if (query?.status) params.append("status", query.status);
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);

  const queryString = params.toString();
  const url = queryString ? `/invoices?${queryString}` : "/invoices";

  const response = await api.get<Invoice[]>(url);
  return response.data;
};

// Get single invoice by ID (with staff details and EOD breakdown)
export const getInvoiceById = async (id: string): Promise<InvoiceDetail> => {
  const response = await api.get<InvoiceDetail>(`/invoices/${id}`);
  return response.data;
};

// Get invoices by business (paginated, with search)
export const getInvoicesByBusiness = async (
  businessId: string,
  query?: InvoiceQuery,
): Promise<PaginatedInvoiceResponse> => {
  const params = new URLSearchParams();
  if (query?.status) params.append("status", query.status);
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);
  if (query?.search) params.append("search", query.search);
  if (query?.page) params.append("page", query.page);
  if (query?.limit) params.append("limit", query.limit);

  const queryString = params.toString();
  const url = queryString
    ? `/businesses/${businessId}/invoices?${queryString}`
    : `/businesses/${businessId}/invoices`;

  const response = await api.get<PaginatedInvoiceResponse>(url);
  return response.data;
};

// Get invoices by staff
export const getInvoicesByStaff = async (
  staffId: string,
  query?: InvoiceQuery,
): Promise<Invoice[]> => {
  const params = new URLSearchParams();
  if (query?.status) params.append("status", query.status);
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);

  const queryString = params.toString();
  const url = queryString
    ? `/staff/${staffId}/invoices?${queryString}`
    : `/staff/${staffId}/invoices`;

  const response = await api.get<Invoice[]>(url);
  return response.data;
};

// ==================== ACTIONS ====================

// Recalculate invoice (re-aggregate approved EODs)
export const recalculateInvoice = async (
  id: string,
): Promise<RecalculateInvoiceResponse> => {
  const response = await api.put<RecalculateInvoiceResponse>(
    `/invoices/${id}/recalculate`,
  );
  return response.data;
};

// Approve invoice
export const approveInvoice = async (
  id: string,
  data?: ApproveInvoiceRequest,
): Promise<ApproveInvoiceResponse> => {
  const response = await api.put<ApproveInvoiceResponse>(
    `/invoices/${id}/approve`,
    data || {},
  );
  return response.data;
};

// Mark invoice as paid
export const markInvoicePaid = async (
  id: string,
): Promise<MarkPaidResponse> => {
  const response = await api.put<MarkPaidResponse>(`/invoices/${id}/paid`);
  return response.data;
};

// Add adjustment (deduction or addition)
export const addInvoiceAdjustment = async (
  id: string,
  data: AddAdjustmentRequest,
): Promise<AdjustmentResponse> => {
  const response = await api.post<AdjustmentResponse>(
    `/invoices/${id}/adjustment`,
    data,
  );
  return response.data;
};

// Remove adjustment
export const removeInvoiceAdjustment = async (
  id: string,
  data: RemoveAdjustmentRequest,
): Promise<AdjustmentResponse> => {
  const response = await api.delete<AdjustmentResponse>(
    `/invoices/${id}/adjustment`,
    { data },
  );
  return response.data;
};

// Soft delete invoice
export const deleteInvoice = async (
  id: string,
): Promise<DeleteInvoiceResponse> => {
  const response = await api.delete<DeleteInvoiceResponse>(`/invoices/${id}`);
  return response.data;
};

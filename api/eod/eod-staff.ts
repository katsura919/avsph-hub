import api from "@/utils/api";
import type {
  EodReport,
  SubmitEodRequest,
  SubmitEodResponse,
  EditOwnEodRequest,
  EditEodResponse,
  EodQuery,
} from "@/types/eod.types";

// Submit an EOD report
export const submitEod = async (
  data: SubmitEodRequest,
): Promise<SubmitEodResponse> => {
  const response = await api.post<SubmitEodResponse>("/eod", data);
  return response.data;
};

// Edit and resubmit an EOD report (only when status is 'needs_revision')
export const resubmitEod = async (
  id: string,
  data: EditOwnEodRequest,
): Promise<EditEodResponse> => {
  const response = await api.put<EditEodResponse>(`/eod/${id}/resubmit`, data);
  return response.data;
};

// Get my EOD reports
export const getMyEodReports = async (
  query?: EodQuery,
): Promise<EodReport[]> => {
  const params = new URLSearchParams();
  if (query?.startDate) params.append("startDate", query.startDate);
  if (query?.endDate) params.append("endDate", query.endDate);
  if (query?.status) params.append("status", query.status);

  const queryString = params.toString();
  const url = queryString ? `/eod/me?${queryString}` : "/eod/me";

  const response = await api.get<EodReport[]>(url);
  return response.data;
};

// Get a single EOD report by ID (own report)
export const getMyEodById = async (id: string): Promise<EodReport> => {
  const response = await api.get<EodReport>(`/eod/me/${id}`);
  return response.data;
};

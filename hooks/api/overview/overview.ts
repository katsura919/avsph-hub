import api from "@/utils/api";
import type {
  BusinessOverviewStats,
  OverviewRecentEodsResponse,
  OverviewRecentInvoicesResponse,
} from "@/types/overview.types";

export const getBusinessOverviewStats = async (
  businessId: string,
): Promise<BusinessOverviewStats> => {
  const response = await api.get<BusinessOverviewStats>(
    `/businesses/${businessId}/overview/stats`,
  );
  return response.data;
};

export const getBusinessOverviewRecentInvoices = async (
  businessId: string,
  limit = 5,
): Promise<OverviewRecentInvoicesResponse> => {
  const response = await api.get<OverviewRecentInvoicesResponse>(
    `/businesses/${businessId}/overview/recent-invoices?limit=${limit}`,
  );
  return response.data;
};

export const getBusinessOverviewRecentEods = async (
  businessId: string,
  limit = 5,
): Promise<OverviewRecentEodsResponse> => {
  const response = await api.get<OverviewRecentEodsResponse>(
    `/businesses/${businessId}/overview/recent-eods?limit=${limit}`,
  );
  return response.data;
};

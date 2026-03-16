import { useQuery } from "@tanstack/react-query";
import {
  getBusinessOverviewRecentEods,
  getBusinessOverviewRecentInvoices,
  getBusinessOverviewStats,
} from "@/hooks/api/overview/overview";

export const useBusinessOverviewStats = (businessId: string) => {
  return useQuery({
    queryKey: ["overview", "stats", businessId],
    queryFn: () => getBusinessOverviewStats(businessId),
    enabled: !!businessId,
    staleTime: 30 * 1000,
  });
};

export const useBusinessOverviewRecentInvoices = (
  businessId: string,
  limit = 5,
) => {
  return useQuery({
    queryKey: ["overview", "recent-invoices", businessId, limit],
    queryFn: () => getBusinessOverviewRecentInvoices(businessId, limit),
    enabled: !!businessId,
    staleTime: 30 * 1000,
  });
};

export const useBusinessOverviewRecentEods = (
  businessId: string,
  limit = 5,
) => {
  return useQuery({
    queryKey: ["overview", "recent-eods", businessId, limit],
    queryFn: () => getBusinessOverviewRecentEods(businessId, limit),
    enabled: !!businessId,
    staleTime: 30 * 1000,
  });
};

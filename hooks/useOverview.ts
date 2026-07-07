import { useQuery } from "@tanstack/react-query";
import {
  getBusinessAttendanceStats,
  getBusinessOverviewRecentEods,
  getBusinessOverviewRecentInvoices,
  getBusinessOverviewStats,
  getBusinessPayrollTrend,
  getBusinessRecruitmentStats,
  getBusinessWorkforceStats,
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

export const useBusinessAttendanceStats = (businessId: string, days = 30) => {
  return useQuery({
    queryKey: ["overview", "attendance-stats", businessId, days],
    queryFn: () => getBusinessAttendanceStats(businessId, days),
    enabled: !!businessId,
    staleTime: 60 * 1000,
  });
};

export const useBusinessRecruitmentStats = (businessId: string) => {
  return useQuery({
    queryKey: ["overview", "recruitment-stats", businessId],
    queryFn: () => getBusinessRecruitmentStats(businessId),
    enabled: !!businessId,
    staleTime: 60 * 1000,
  });
};

export const useBusinessWorkforceStats = (businessId: string) => {
  return useQuery({
    queryKey: ["overview", "workforce-stats", businessId],
    queryFn: () => getBusinessWorkforceStats(businessId),
    enabled: !!businessId,
    staleTime: 60 * 1000,
  });
};

export const useBusinessPayrollTrend = (businessId: string, months = 6) => {
  return useQuery({
    queryKey: ["overview", "payroll-trend", businessId, months],
    queryFn: () => getBusinessPayrollTrend(businessId, months),
    enabled: !!businessId,
    staleTime: 60 * 1000,
  });
};

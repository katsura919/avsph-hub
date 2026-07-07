import api from "@/utils/api";
import type {
  AttendanceStats,
  BusinessOverviewStats,
  OverviewRecentEodsResponse,
  OverviewRecentInvoicesResponse,
  PayrollTrendStats,
  RecruitmentStats,
  WorkforceStats,
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

export const getBusinessAttendanceStats = async (
  businessId: string,
  days = 30,
): Promise<AttendanceStats> => {
  const response = await api.get<AttendanceStats>(
    `/businesses/${businessId}/overview/attendance-stats?days=${days}`,
  );
  return response.data;
};

export const getBusinessRecruitmentStats = async (
  businessId: string,
): Promise<RecruitmentStats> => {
  const response = await api.get<RecruitmentStats>(
    `/businesses/${businessId}/overview/recruitment-stats`,
  );
  return response.data;
};

export const getBusinessWorkforceStats = async (
  businessId: string,
): Promise<WorkforceStats> => {
  const response = await api.get<WorkforceStats>(
    `/businesses/${businessId}/overview/workforce-stats`,
  );
  return response.data;
};

export const getBusinessPayrollTrend = async (
  businessId: string,
  months = 6,
): Promise<PayrollTrendStats> => {
  const response = await api.get<PayrollTrendStats>(
    `/businesses/${businessId}/overview/payroll-trend?months=${months}`,
  );
  return response.data;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllEodReports,
  getEodByBusiness,
  getEodSummaryByBusiness,
  getEodByStaff,
  getEodById,
  reviewEod,
  adminEditEod,
  deleteEod,
  bulkEod,
} from "@/hooks/api/eod/eod-admin";
import type {
  ReviewEodRequest,
  AdminEditEodRequest,
  EodQuery,
  EodSummaryQuery,
  PaginatedEodResponse,
  PaginatedEodSummaryResponse,
  BulkEodRequest,
} from "@/types/eod.types";
import { AxiosError } from "axios";

interface ApiError {
  error?: string;
  message?: string;
}

// Hook to get all EOD reports (admin)
export const useAllEodReports = (query?: EodQuery) => {
  return useQuery({
    queryKey: ["eod", "all", query],
    queryFn: () => getAllEodReports(query),
    staleTime: 30 * 1000,
  });
};

// Hook to get EOD reports by business (paginated, with search)
export const useEodByBusiness = (businessId: string, query?: EodQuery) => {
  return useQuery<PaginatedEodResponse>({
    queryKey: ["eod", "business", businessId, query],
    queryFn: () => getEodByBusiness(businessId, query),
    enabled: !!businessId,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};

// Hook to get EOD summary reports by business
export const useEodSummaryByBusiness = (
  businessId: string,
  query?: EodSummaryQuery,
) => {
  return useQuery<PaginatedEodSummaryResponse>({
    queryKey: ["eod", "business", businessId, "summary", query],
    queryFn: () => getEodSummaryByBusiness(businessId, query),
    enabled: !!businessId,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};

// Hook to get EOD reports by staff
export const useEodByStaff = (staffId: string, query?: EodQuery) => {
  return useQuery({
    queryKey: ["eod", "staff", staffId, query],
    queryFn: () => getEodByStaff(staffId, query),
    enabled: !!staffId,
    staleTime: 30 * 1000,
  });
};

// Hook to get a single EOD report by ID
export const useEodById = (id: string) => {
  return useQuery({
    queryKey: ["eod", id],
    queryFn: () => getEodById(id),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
};

// Hook to review an EOD report (approve or return for revision)
export const useReviewEod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReviewEodRequest }) =>
      reviewEod(id, data),
    onSuccess: (data) => {
      const action =
        data.status === "reviewed" ? "approved" : "returned for revision";
      toast.success("EOD Report Updated", {
        description: `Report has been ${action}`,
      });
      queryClient.invalidateQueries({ queryKey: ["eod"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to review EOD report";
      toast.error("Review Failed", {
        description: message,
      });
    },
  });
};

// Hook to admin edit an EOD report (minor tweaks)
export const useAdminEditEod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminEditEodRequest }) =>
      adminEditEod(id, data),
    onSuccess: () => {
      toast.success("EOD Report Edited", {
        description: "Changes saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["eod"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to edit EOD report";
      toast.error("Edit Failed", {
        description: message,
      });
    },
  });
};

// Hook to delete an EOD report (soft delete)
export const useDeleteEod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEod(id),
    onSuccess: () => {
      toast.success("EOD Report Deleted", {
        description: "Report has been removed",
      });
      queryClient.invalidateQueries({ queryKey: ["eod"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete EOD report";
      toast.error("Delete Failed", {
        description: message,
      });
    },
  });
};

// Hook for bulk actions on EOD reports (approve / revise / delete)
export const useBulkEod = (businessId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BulkEodRequest) => bulkEod(businessId, body),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["eod"] });
      const labels: Record<BulkEodRequest["action"], string> = {
        approve: "Reports approved",
        revise: "Revision requested",
        delete: "Reports deleted",
      };
      toast.success(labels[variables.action], {
        description: `${data.modified} report${data.modified === 1 ? "" : "s"} updated.`,
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Bulk action failed";
      toast.error("Bulk Action Failed", { description: message });
    },
  });
};

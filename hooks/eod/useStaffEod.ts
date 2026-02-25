import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  submitEod,
  resubmitEod,
  getMyEodReports,
  getMyEodById,
} from "@/api/eod/eod-staff";
import type {
  SubmitEodRequest,
  EditOwnEodRequest,
  EodQuery,
} from "@/types/eod.types";
import { AxiosError } from "axios";

interface ApiError {
  error?: string;
  message?: string;
}

// Hook to get staff's own EOD reports
export const useMyEodReports = (query?: EodQuery) => {
  return useQuery({
    queryKey: ["eod", "me", query],
    queryFn: () => getMyEodReports(query),
    staleTime: 30 * 1000,
  });
};

// Hook to get a single EOD report by ID (own report)
export const useMyEodById = (id: string) => {
  return useQuery({
    queryKey: ["eod", "me", id],
    queryFn: () => getMyEodById(id),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
};

// Hook to submit an EOD report
export const useSubmitEod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitEodRequest) => submitEod(data),
    onSuccess: (data) => {
      toast.success("EOD Report Submitted!", {
        description: `Report for ${data.date} submitted successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["eod"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to submit EOD report";
      toast.error("Submission Failed", {
        description: message,
      });
    },
  });
};

// Hook to edit and resubmit an EOD report (when returned for revision)
export const useResubmitEod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditOwnEodRequest }) =>
      resubmitEod(id, data),
    onSuccess: () => {
      toast.success("EOD Report Resubmitted!", {
        description: "Your revised report has been resubmitted for review",
      });
      queryClient.invalidateQueries({ queryKey: ["eod"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to resubmit EOD report";
      toast.error("Resubmission Failed", {
        description: message,
      });
    },
  });
};

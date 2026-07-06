import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  getLeadsByBusiness,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadTags,
  exportLeads,
  bulkLeads,
} from "@/hooks/api/leads/leads";
import type {
  LeadQueryParams,
  LeadFilterParams,
  UpdateLeadRequest,
  BulkLeadRequest,
} from "@/types/leads.types";

interface ApiError {
  error?: string;
  message?: string;
}

// Get leads by business with search and pagination
export const useLeadsByBusiness = (
  businessId: string,
  params?: LeadQueryParams,
) => {
  return useQuery({
    queryKey: ["leads", "business", businessId, params],
    queryFn: () => getLeadsByBusiness(businessId, params),
    enabled: !!businessId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get distinct tags for a business
export const useLeadTags = (businessId: string) => {
  return useQuery({
    queryKey: ["leads", "tags", businessId],
    queryFn: () => getLeadTags(businessId),
    enabled: !!businessId,
    staleTime: 2 * 60 * 1000,
  });
};

// Get lead by ID
export const useLeadById = (id: string) => {
  return useQuery({
    queryKey: ["leads", id],
    queryFn: () => getLeadById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Update lead
export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadRequest }) =>
      updateLead(id, data),
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({
        queryKey: ["leads", "business", updatedLead.businessId],
      });
      queryClient.invalidateQueries({ queryKey: ["leads", updatedLead._id] });
      queryClient.invalidateQueries({
        queryKey: ["leads", "tags", updatedLead.businessId],
      });
      toast.success("Lead updated!", {
        description: `${updatedLead.firstName} ${updatedLead.lastName} has been updated successfully.`,
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update lead";
      toast.error("Update failed", {
        description: message,
      });
    },
  });
};

// Delete lead
export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, businessId }: { id: string; businessId: string }) =>
      deleteLead(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["leads", "business", variables.businessId],
      });
      toast.success("Lead deleted!", {
        description: "The lead has been removed successfully.",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete lead";
      toast.error("Deletion failed", {
        description: message,
      });
    },
  });
};

// Bulk action on leads (status / tags / delete)
export const useBulkLeads = (businessId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BulkLeadRequest) => bulkLeads(businessId, body),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["leads", "business", businessId],
      });
      queryClient.invalidateQueries({ queryKey: ["leads", "tags", businessId] });
      const labels: Record<BulkLeadRequest["action"], string> = {
        status: "Status updated",
        addTags: "Tags added",
        removeTags: "Tags removed",
        delete: "Leads deleted",
      };
      toast.success(labels[variables.action], {
        description: `${data.modified} lead${data.modified === 1 ? "" : "s"} updated.`,
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Bulk action failed";
      toast.error("Bulk action failed", { description: message });
    },
  });
};

// Export leads (returns full filtered set; component builds the CSV)
export const useExportLeads = (businessId: string) => {
  return useMutation({
    mutationFn: (params?: LeadFilterParams) => exportLeads(businessId, params),
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to export leads";
      toast.error("Export failed", { description: message });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  generateInvoice,
  generateBusinessInvoices,
  getAllInvoices,
  getInvoiceById,
  getInvoicesByBusiness,
  getInvoicesByStaff,
  recalculateInvoice,
  approveInvoice,
  markInvoicePaid,
  addInvoiceAdjustment,
  removeInvoiceAdjustment,
  deleteInvoice,
} from "@/hooks/api/invoice/admin-invoice";
import type {
  GenerateInvoiceRequest,
  GenerateBusinessInvoiceRequest,
  ApproveInvoiceRequest,
  AddAdjustmentRequest,
  RemoveAdjustmentRequest,
  InvoiceQuery,
  PaginatedInvoiceResponse,
} from "@/types/invoice.types";
import { AxiosError } from "axios";

interface ApiError {
  error?: string;
  message?: string;
}

// ==================== QUERIES ====================

// Hook to get all invoices (admin)
export const useAllInvoices = (query?: InvoiceQuery) => {
  return useQuery({
    queryKey: ["invoices", "all", query],
    queryFn: () => getAllInvoices(query),
    staleTime: 30 * 1000,
  });
};

// Hook to get a single invoice by ID (with staff + EOD details)
export const useInvoiceById = (id: string) => {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
    staleTime: 30 * 1000,
  });
};

// Hook to get invoices by business (paginated, with search)
export const useInvoicesByBusiness = (
  businessId: string,
  query?: InvoiceQuery,
) => {
  return useQuery<PaginatedInvoiceResponse>({
    queryKey: ["invoices", "business", businessId, query],
    queryFn: () => getInvoicesByBusiness(businessId, query),
    enabled: !!businessId,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
};

// Hook to get invoices by staff
export const useInvoicesByStaff = (staffId: string, query?: InvoiceQuery) => {
  return useQuery({
    queryKey: ["invoices", "staff", staffId, query],
    queryFn: () => getInvoicesByStaff(staffId, query),
    enabled: !!staffId,
    staleTime: 30 * 1000,
  });
};

// ==================== MUTATIONS ====================

// Hook to generate invoice for a single staff member
export const useGenerateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateInvoiceRequest) => generateInvoice(data),
    onSuccess: (data) => {
      toast.success("Invoice Generated", {
        description: `Draft invoice created with $${data.netPay.toFixed(2)} net pay`,
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to generate invoice";
      toast.error("Generation Failed", { description: message });
    },
  });
};

// Hook to batch generate invoices for a business
export const useGenerateBusinessInvoices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      businessId,
      data,
    }: {
      businessId: string;
      data: GenerateBusinessInvoiceRequest;
    }) => generateBusinessInvoices(businessId, data),
    onSuccess: (result) => {
      const { generated, skipped, errors } = result.summary;
      toast.success("Batch Generation Complete", {
        description: `${generated} generated, ${skipped} skipped, ${errors} errors`,
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to generate invoices";
      toast.error("Batch Generation Failed", { description: message });
    },
  });
};

// Hook to recalculate an invoice (re-aggregate approved EODs)
export const useRecalculateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recalculateInvoice(id),
    onSuccess: (data) => {
      const { eodsAdded, eodsRemoved, previousPay, newPay } =
        data.recalculation;
      const payDiff = newPay - previousPay;
      const diffText =
        payDiff === 0
          ? "no change"
          : payDiff > 0
            ? `+$${payDiff.toFixed(2)}`
            : `-$${Math.abs(payDiff).toFixed(2)}`;

      toast.success("Invoice Recalculated", {
        description: `${eodsAdded} EODs added, ${eodsRemoved} removed (${diffText})`,
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to recalculate invoice";
      toast.error("Recalculation Failed", { description: message });
    },
  });
};

// Hook to approve an invoice
export const useApproveInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: ApproveInvoiceRequest }) =>
      approveInvoice(id, data),
    onSuccess: () => {
      toast.success("Invoice Approved", {
        description: "Invoice has been approved and is now visible to staff",
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to approve invoice";
      toast.error("Approval Failed", { description: message });
    },
  });
};

// Hook to mark an invoice as paid
export const useMarkInvoicePaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markInvoicePaid(id),
    onSuccess: () => {
      toast.success("Invoice Marked as Paid", {
        description: "Payment has been recorded",
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to mark invoice as paid";
      toast.error("Payment Failed", { description: message });
    },
  });
};

// Hook to add an adjustment (deduction or addition)
export const useAddInvoiceAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddAdjustmentRequest }) =>
      addInvoiceAdjustment(id, data),
    onSuccess: (data) => {
      toast.success("Adjustment Added", {
        description: `Updated net pay: $${data.netPay.toFixed(2)}`,
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to add adjustment";
      toast.error("Adjustment Failed", { description: message });
    },
  });
};

// Hook to remove an adjustment
export const useRemoveInvoiceAdjustment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RemoveAdjustmentRequest }) =>
      removeInvoiceAdjustment(id, data),
    onSuccess: (data) => {
      toast.success("Adjustment Removed", {
        description: `Updated net pay: $${data.netPay.toFixed(2)}`,
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to remove adjustment";
      toast.error("Removal Failed", { description: message });
    },
  });
};

// Hook to delete an invoice (soft delete)
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInvoice(id),
    onSuccess: () => {
      toast.success("Invoice Deleted", {
        description: "Invoice has been removed",
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete invoice";
      toast.error("Delete Failed", { description: message });
    },
  });
};

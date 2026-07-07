import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  getStaffByBusiness,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  uploadStaffPhoto,
  uploadStaffDocument,
  bulkStaff,
} from "@/hooks/api/staff/staff-management";
import type {
  StaffQueryParams,
  CreateStaffRequest,
  UpdateStaffRequest,
  BulkStaffRequest,
} from "@/types/staff.types";
import {
  updateStaffProfile,
  addStaffDocument,
  changeStaffPassword,
  type UpdateStaffProfileRequest,
  type AddStaffDocumentRequest,
  type ChangeStaffPasswordRequest,
} from "@/hooks/api/staff/staff";
import { useStaffStore } from "@/store/staff.store";
interface ApiError {
  error?: string;
  message?: string;
}

// Get staff by business with search and pagination
export const useStaffByBusiness = (
  businessId: string,
  params?: StaffQueryParams,
) => {
  return useQuery({
    queryKey: ["staff", "business", businessId, params],
    queryFn: () => getStaffByBusiness(businessId, params),
    enabled: !!businessId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get staff by ID
export const useStaffById = (id: string) => {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => getStaffById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Create staff member
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStaffRequest) => createStaff(data),
    onSuccess: (newStaff) => {
      queryClient.invalidateQueries({
        queryKey: ["staff", "business", newStaff.businessId],
      });
      toast.success("Staff member created!", {
        description: `${newStaff.firstName} ${newStaff.lastName} has been added successfully.`,
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create staff member";
      toast.error("Creation failed", {
        description: message,
      });
    },
  });
};

// Update staff member
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStaffRequest }) =>
      updateStaff(id, data),
    onSuccess: (updatedStaff) => {
      queryClient.invalidateQueries({
        queryKey: ["staff", "business", updatedStaff.businessId],
      });
      queryClient.invalidateQueries({ queryKey: ["staff", updatedStaff._id] });
      toast.success("Staff member updated!", {
        description: `${updatedStaff.firstName} ${updatedStaff.lastName} has been updated successfully.`,
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update staff member";
      toast.error("Update failed", {
        description: message,
      });
    },
  });
};

// Delete staff member
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, businessId }: { id: string; businessId: string }) =>
      deleteStaff(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["staff", "business", variables.businessId],
      });
      toast.success("Staff member deleted!", {
        description: "The staff member has been removed successfully.",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete staff member";
      toast.error("Deletion failed", {
        description: message,
      });
    },
  });
};

// Bulk actions on staff (set status / delete)
export const useBulkStaff = (businessId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BulkStaffRequest) => bulkStaff(businessId, body),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["staff", "business", businessId],
      });
      const label =
        variables.action === "delete" ? "Staff deleted" : "Status updated";
      toast.success(label, {
        description: `${data.modified} staff member${data.modified === 1 ? "" : "s"} updated.`,
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

// Upload staff photo
export const useUploadStaffPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      uploadStaffPhoto(id, file),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["staff", "business", result.staff.businessId],
      });
      queryClient.invalidateQueries({ queryKey: ["staff", result.staff._id] });
      toast.success("Photo uploaded!", {
        description: "Staff photo has been updated successfully.",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to upload photo";
      toast.error("Upload failed", {
        description: message,
      });
    },
  });
};

// Upload staff document
export const useUploadStaffDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      uploadStaffDocument(id, file),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["staff", "business", result.staff.businessId],
      });
      queryClient.invalidateQueries({ queryKey: ["staff", result.staff._id] });
      toast.success("Document uploaded!", {
        description: `${result.document.name} has been uploaded successfully.`,
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to upload document";
      toast.error("Upload failed", {
        description: message,
      });
    },
  });
};

export const useUpdateStaffProfile = () => {
  const queryClient = useQueryClient();
  const { setStaff } = useStaffStore();

  return useMutation({
    mutationFn: (data: UpdateStaffProfileRequest) => updateStaffProfile(data),
    onSuccess: (data) => {
      setStaff(data.staff);
      queryClient.invalidateQueries({ queryKey: ["staff", "me"] });
      toast.success("Profile updated", {
        description: "Your profile has been saved.",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update profile";
      toast.error("Update failed", { description: message });
    },
  });
};

export const useAddStaffDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddStaffDocumentRequest) => addStaffDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff", "me"] });
      toast.success("Document added", {
        description: "The document has been added to your profile.",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to add document";
      toast.error("Upload failed", { description: message });
    },
  });
};

export const useChangeStaffPassword = () => {
  return useMutation({
    mutationFn: (data: ChangeStaffPasswordRequest) => changeStaffPassword(data),
    onSuccess: () => {
      toast.success("Password changed", {
        description: "Your password has been updated successfully.",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to change password";
      toast.error("Error", { description: message });
    },
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
    getJobPosts,
    getJobPostById,
    createJobPost,
    updateJobPost,
    updateJobPostStatus,
    deleteJobPost,
    getApplicantsByJob,
    updateApplicantStage,
    updateApplicant,
    hireApplicant,
    deleteApplicant,
} from "@/hooks/api/job-post/job-post";
import type {
    CreateJobPostRequest,
    UpdateJobPostRequest,
    UpdateApplicantRequest,
    HireApplicantRequest,
} from "@/types/jobPost.types";

interface ApiError {
    error?: string;
    message?: string;
}

// ─── Job Post Hooks ─────────────────────────────────────────────────────

// Get job posts by business
export const useJobPosts = (businessId?: string, status?: string) => {
    return useQuery({
        queryKey: ["jobPosts", businessId, status],
        queryFn: () => getJobPosts(businessId, status),
        enabled: !!businessId,
        staleTime: 2 * 60 * 1000,
    });
};

// Get job post by ID
export const useJobPostById = (id: string) => {
    return useQuery({
        queryKey: ["jobPosts", id],
        queryFn: () => getJobPostById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

// Create job post
export const useCreateJobPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateJobPostRequest) => createJobPost(data),
        onSuccess: (newJobPost) => {
            queryClient.invalidateQueries({
                queryKey: ["jobPosts", newJobPost.businessId],
            });
            toast.success("Job post created!", {
                description: `"${newJobPost.title}" has been created successfully.`,
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to create job post";
            toast.error("Creation failed", { description: message });
        },
    });
};

// Update job post
export const useUpdateJobPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateJobPostRequest }) =>
            updateJobPost(id, data),
        onSuccess: (updatedJobPost) => {
            queryClient.invalidateQueries({
                queryKey: ["jobPosts", updatedJobPost.businessId],
            });
            queryClient.invalidateQueries({
                queryKey: ["jobPosts", updatedJobPost._id],
            });
            toast.success("Job post updated!", {
                description: `"${updatedJobPost.title}" has been updated.`,
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to update job post";
            toast.error("Update failed", { description: message });
        },
    });
};

// Update job post status
export const useUpdateJobPostStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: string;
            status: "draft" | "open" | "closed";
        }) => updateJobPostStatus(id, status),
        onSuccess: (updatedJobPost) => {
            queryClient.invalidateQueries({
                queryKey: ["jobPosts", updatedJobPost.businessId],
            });
            queryClient.invalidateQueries({
                queryKey: ["jobPosts", updatedJobPost._id],
            });
            toast.success("Status updated!", {
                description: `Job post is now "${updatedJobPost.status}".`,
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to update status";
            toast.error("Status change failed", { description: message });
        },
    });
};

// Delete job post
export const useDeleteJobPost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            businessId,
        }: {
            id: string;
            businessId: string;
        }) => deleteJobPost(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["jobPosts", variables.businessId],
            });
            toast.success("Job post deleted!", {
                description: "The job post has been removed.",
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to delete job post";
            toast.error("Deletion failed", { description: message });
        },
    });
};

// ─── Applicant Hooks ────────────────────────────────────────────────────

// Get applicants by job post ID (for Kanban)
export const useApplicantsByJob = (jobId: string) => {
    return useQuery({
        queryKey: ["applicants", "job", jobId],
        queryFn: () => getApplicantsByJob(jobId),
        enabled: !!jobId,
        staleTime: 1 * 60 * 1000,
    });
};

// Update applicant stage (drag & drop)
export const useUpdateApplicantStage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, stage }: { id: string; stage: string }) =>
            updateApplicantStage(id, stage),
        onSuccess: (updatedApplicant) => {
            queryClient.invalidateQueries({
                queryKey: ["applicants", "job", updatedApplicant.jobId],
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to move applicant";
            toast.error("Stage update failed", { description: message });
        },
    });
};

// Update applicant (admin notes)
export const useUpdateApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateApplicantRequest;
        }) => updateApplicant(id, data),
        onSuccess: (updatedApplicant) => {
            queryClient.invalidateQueries({
                queryKey: ["applicants", "job", updatedApplicant.jobId],
            });
            toast.success("Applicant updated!");
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to update applicant";
            toast.error("Update failed", { description: message });
        },
    });
};

// Hire applicant
export const useHireApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: HireApplicantRequest;
        }) => hireApplicant(id, data),
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["applicants"] });
            queryClient.invalidateQueries({ queryKey: ["staff"] });
            toast.success("Applicant hired! 🎉", {
                description: `${result.staff.firstName} ${result.staff.lastName} is now a staff member. Temporary password: ${result.temporaryPassword}`,
                duration: 10000,
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to hire applicant";
            toast.error("Hire failed", { description: message });
        },
    });
};

// Delete applicant
export const useDeleteApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, jobId }: { id: string; jobId: string }) =>
            deleteApplicant(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["applicants", "job", variables.jobId],
            });
            toast.success("Applicant removed!", {
                description: "The applicant has been removed.",
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to delete applicant";
            toast.error("Deletion failed", { description: message });
        },
    });
};

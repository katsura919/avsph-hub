import api from "@/utils/api";
import type {
    JobPost,
    CreateJobPostRequest,
    UpdateJobPostRequest,
    Applicant,
    UpdateApplicantRequest,
    HireApplicantRequest,
    HireApplicantResponse,
    DeleteResponse,
} from "@/types/jobPost.types";

// ─── Job Post API ───────────────────────────────────────────────────────

// Get all job posts (with optional business and status filters)
export const getJobPosts = async (
    businessId?: string,
    status?: string,
): Promise<JobPost[]> => {
    const params = new URLSearchParams();
    if (businessId) params.append("businessId", businessId);
    if (status) params.append("status", status);

    const queryString = params.toString();
    const url = `/job-posts${queryString ? `?${queryString}` : ""}`;

    const response = await api.get<JobPost[]>(url);
    return response.data;
};

// Get job post by ID
export const getJobPostById = async (id: string): Promise<JobPost> => {
    const response = await api.get<JobPost>(`/job-posts/${id}`);
    return response.data;
};

// Create job post
export const createJobPost = async (
    data: CreateJobPostRequest,
): Promise<JobPost> => {
    const response = await api.post<JobPost>("/job-posts", data);
    return response.data;
};

// Update job post
export const updateJobPost = async (
    id: string,
    data: UpdateJobPostRequest,
): Promise<JobPost> => {
    const response = await api.put<JobPost>(`/job-posts/${id}`, data);
    return response.data;
};

// Update job post status
export const updateJobPostStatus = async (
    id: string,
    status: "draft" | "open" | "closed",
): Promise<JobPost> => {
    const response = await api.patch<JobPost>(`/job-posts/${id}/status`, {
        status,
    });
    return response.data;
};

// Delete job post (soft delete)
export const deleteJobPost = async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(`/job-posts/${id}`);
    return response.data;
};

// ─── Applicant API ──────────────────────────────────────────────────────

// Get applicants by job post ID (Kanban view)
export const getApplicantsByJob = async (
    jobId: string,
): Promise<Applicant[]> => {
    const response = await api.get<Applicant[]>(
        `/job-posts/${jobId}/applicants`,
    );
    return response.data;
};

// Update applicant stage (drag & drop)
export const updateApplicantStage = async (
    id: string,
    stage: string,
): Promise<Applicant> => {
    const response = await api.patch<Applicant>(`/applicants/${id}/stage`, {
        stage,
    });
    return response.data;
};

// Update applicant (admin notes, etc.)
export const updateApplicant = async (
    id: string,
    data: UpdateApplicantRequest,
): Promise<Applicant> => {
    const response = await api.patch<Applicant>(`/applicants/${id}`, data);
    return response.data;
};

// Hire applicant (convert to staff)
export const hireApplicant = async (
    id: string,
    data: HireApplicantRequest,
): Promise<HireApplicantResponse> => {
    const response = await api.post<HireApplicantResponse>(
        `/applicants/${id}/hire`,
        data,
    );
    return response.data;
};

// Delete applicant (soft delete)
export const deleteApplicant = async (id: string): Promise<DeleteResponse> => {
    const response = await api.delete<DeleteResponse>(`/applicants/${id}`);
    return response.data;
};

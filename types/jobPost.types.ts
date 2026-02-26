// ─── Job Post Types ─────────────────────────────────────────────────────

export interface JobPostStage {
    id: string;
    name: string;
    order: number;
    type: "active" | "hired" | "rejected";
}

export interface JobPost {
    _id: string;
    businessId: string;
    title: string;
    description: string;
    requirements: string[];
    employmentType: "full-time" | "part-time" | "contract";
    status: "draft" | "open" | "closed";
    stages: JobPostStage[];
    isActive: boolean;
    applicantCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateJobPostRequest {
    businessId: string;
    title: string;
    description: string;
    requirements?: string[];
    employmentType?: "full-time" | "part-time" | "contract";
    status?: "draft" | "open" | "closed";
    stages: JobPostStage[];
}

export interface UpdateJobPostRequest {
    title?: string;
    description?: string;
    requirements?: string[];
    employmentType?: "full-time" | "part-time" | "contract";
    status?: "draft" | "open" | "closed";
    stages?: JobPostStage[];
    isActive?: boolean;
}

// ─── Applicant Types ────────────────────────────────────────────────────

export interface Applicant {
    _id: string;
    jobId: string;
    businessId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    position: string;
    resume?: string;
    coverLetter?: string;
    stage: string;
    adminNotes?: string;
    isStaffConverted: boolean;
    staffId?: string;
    isActive: boolean;
    appliedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateApplicantRequest {
    adminNotes?: string;
    isActive?: boolean;
}

export interface HireApplicantRequest {
    salary: number;
    salaryType: "hourly" | "daily" | "monthly" | "annual";
}

export interface HireApplicantResponse {
    message: string;
    staff: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        position: string;
        businessId: string;
    };
    applicantId: string;
    temporaryPassword: string;
}

export interface DeleteResponse {
    message: string;
}

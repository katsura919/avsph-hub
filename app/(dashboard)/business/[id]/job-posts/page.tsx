"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Loader2,
    Plus,
    Briefcase,
    Users,
    Calendar,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    Globe,
    Lock,
    Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    useJobPosts,
    useUpdateJobPostStatus,
    useDeleteJobPost,
} from "@/hooks/useJobPost";
import { CreateJobPostDialog } from "./create-job-post-dialog";
import type { JobPost } from "@/types/jobPost.types";

const statusConfig = {
    draft: {
        label: "Draft",
        variant: "secondary" as const,
        icon: Lock,
    },
    open: {
        label: "Open",
        variant: "default" as const,
        icon: Globe,
    },
    closed: {
        label: "Closed",
        variant: "outline" as const,
        icon: Archive,
    },
};

export default function JobPostsPage() {
    const params = useParams();
    const businessId = params.id as string;
    const [filter, setFilter] = useState<string>("all");
    const [createOpen, setCreateOpen] = useState(false);
    const [editingJobPost, setEditingJobPost] = useState<JobPost | null>(null);

    const statusFilter = filter === "all" ? undefined : filter;
    const { data: jobPosts, isLoading } = useJobPosts(businessId, statusFilter);
    const { mutate: updateStatus } = useUpdateJobPostStatus();
    const { mutate: deleteJobPost } = useDeleteJobPost();

    const filters = [
        { value: "all", label: "All" },
        { value: "open", label: "Open" },
        { value: "draft", label: "Draft" },
        { value: "closed", label: "Closed" },
    ];

    const handleStatusChange = (
        id: string,
        status: "draft" | "open" | "closed",
    ) => {
        updateStatus({ id, status });
    };

    const handleDelete = (id: string) => {
        deleteJobPost({ id, businessId });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Job Posts</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage job listings and track applicants
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Job Post
                </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 border-b">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${filter === f.value
                                ? "border-foreground text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Job Posts Grid */}
            {!jobPosts || jobPosts.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <Briefcase className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">No job posts yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                        Create your first job post to start receiving applications and
                        managing candidates.
                    </p>
                    <Button className="mt-4" onClick={() => setCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Job Post
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {jobPosts.map((jobPost) => {
                        const config = statusConfig[jobPost.status];
                        const StatusIcon = config.icon;

                        return (
                            <Card
                                key={jobPost._id}
                                className="group relative transition-all hover:shadow-md hover:-translate-y-[1px]"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/business/${businessId}/job-posts/${jobPost._id}`}
                                                className="hover:underline"
                                            >
                                                <CardTitle className="text-base font-semibold leading-tight truncate">
                                                    {jobPost.title}
                                                </CardTitle>
                                            </Link>
                                            <CardDescription className="mt-1 line-clamp-2 text-xs">
                                                {jobPost.description}
                                            </CardDescription>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/business/${businessId}/job-posts/${jobPost._id}`}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Applicants
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setEditingJobPost(jobPost);
                                                        setCreateOpen(true);
                                                    }}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {jobPost.status !== "open" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleStatusChange(jobPost._id, "open")
                                                        }
                                                    >
                                                        <Globe className="mr-2 h-4 w-4" />
                                                        Open
                                                    </DropdownMenuItem>
                                                )}
                                                {jobPost.status !== "closed" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleStatusChange(jobPost._id, "closed")
                                                        }
                                                    >
                                                        <Archive className="mr-2 h-4 w-4" />
                                                        Close
                                                    </DropdownMenuItem>
                                                )}
                                                {jobPost.status !== "draft" && (
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleStatusChange(jobPost._id, "draft")
                                                        }
                                                    >
                                                        <Lock className="mr-2 h-4 w-4" />
                                                        Move to Draft
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => handleDelete(jobPost._id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge variant={config.variant}>
                                            <StatusIcon className="mr-1 h-3 w-3" />
                                            {config.label}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {jobPost.employmentType}
                                        </Badge>
                                    </div>
                                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5" />
                                            {jobPost.applicantCount ?? 0} applicants
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-3.5 w-3.5" />
                                            {jobPost.stages.length} stages
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(jobPost.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Create/Edit Dialog */}
            <CreateJobPostDialog
                open={createOpen}
                onOpenChange={(open) => {
                    setCreateOpen(open);
                    if (!open) setEditingJobPost(null);
                }}
                businessId={businessId}
                editingJobPost={editingJobPost}
            />
        </div>
    );
}

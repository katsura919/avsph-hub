"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    DragDropProvider,
    useDroppable,
} from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import {
    Loader2,
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    FileText,
    ExternalLink,
    UserCheck,
    MoreHorizontal,
    Trash2,
    StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Card import unused — Kanban uses custom divs
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    useJobPostById,
    useApplicantsByJob,
    useUpdateApplicantStage,
    useUpdateApplicant,
    useDeleteApplicant,
    useUpdateJobPostStatus,
} from "@/hooks/useJobPost";
import { HireDialog } from "./hire-dialog";
import type { Applicant, JobPostStage } from "@/types/jobPost.types";

// ─── Applicant Card (Sortable) ──────────────────────────────────────────

interface ApplicantCardProps {
    applicant: Applicant;
    stageId: string;
    index: number;
    onClick: () => void;
}

function ApplicantCard({ applicant, stageId, index, onClick }: ApplicantCardProps) {
    const { ref, isDragSource } = useSortable({
        id: applicant._id,
        index,
        type: "applicant",
        group: stageId,
        accept: ["applicant"],
        data: { applicant, stageId },
    });

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`rounded-lg border bg-card p-3 cursor-pointer hover:shadow-sm hover:border-foreground/20 transition-all active:scale-[0.98] touch-none select-none ${isDragSource ? "opacity-50 shadow-lg" : ""}`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                        {applicant.firstName} {applicant.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {applicant.email}
                    </p>
                </div>
                {applicant.isStaffConverted && (
                    <Badge
                        variant="outline"
                        className="shrink-0 text-[10px] bg-green-500/10 text-green-600 border-green-200"
                    >
                        <UserCheck className="mr-1 h-3 w-3" />
                        Hired
                    </Badge>
                )}
            </div>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(applicant.appliedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </span>
                {applicant.resume && (
                    <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Resume
                    </span>
                )}
            </div>
        </div>
    );
}

// ─── Kanban Column (Droppable) ──────────────────────────────────────────

interface KanbanColumnProps {
    stage: JobPostStage;
    applicants: Applicant[];
    onCardClick: (applicant: Applicant) => void;
}

const stageTypeStyles: Record<string, string> = {
    active: "border-t-blue-500",
    hired: "border-t-green-500",
    rejected: "border-t-red-500",
};

function KanbanColumn({ stage, applicants, onCardClick }: KanbanColumnProps) {
    const { ref: columnRef, isDropTarget } = useDroppable({
        id: `column-${stage.id}`,
        accept: ["applicant"],
        data: { stageId: stage.id },
    });

    return (
        <div
            ref={columnRef}
            className={`flex flex-col rounded-lg border bg-muted/30 min-w-[280px] w-[280px] shrink-0 border-t-2 transition-colors ${stageTypeStyles[stage.type] || "border-t-border"
                } ${isDropTarget ? "ring-2 ring-primary/40 bg-primary/5" : ""}`}
        >
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 pb-2">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{stage.name}</h3>
                    <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                        {applicants.length}
                    </span>
                </div>
            </div>

            {/* Cards */}
            <div className="flex-1 space-y-2 p-2 pt-0 min-h-[100px] overflow-y-auto">
                {applicants.map((applicant, idx) => (
                    <ApplicantCard
                        key={applicant._id}
                        applicant={applicant}
                        stageId={stage.id}
                        index={idx}
                        onClick={() => onCardClick(applicant)}
                    />
                ))}
                {applicants.length === 0 && (
                    <div className="flex items-center justify-center h-20 rounded-lg border border-dashed text-xs text-muted-foreground">
                        {isDropTarget ? "Drop here" : "No applicants"}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Kanban Page ───────────────────────────────────────────────────

export default function JobPostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const jobPostId = params.jobPostId as string;

    const { data: jobPost, isLoading: jobLoading } = useJobPostById(jobPostId);
    const { data: applicants, isLoading: appLoading } =
        useApplicantsByJob(jobPostId);
    const { mutate: updateStage } = useUpdateApplicantStage();
    const { mutate: updateApplicant } = useUpdateApplicant();
    const { mutate: deleteApplicant } = useDeleteApplicant();
    const { mutate: updateJobPostStatus } = useUpdateJobPostStatus();

    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
        null,
    );
    const [sheetOpen, setSheetOpen] = useState(false);
    const [hireOpen, setHireOpen] = useState(false);
    const [hireApplicant, setHireApplicant] = useState<Applicant | null>(null);
    const [adminNotes, setAdminNotes] = useState("");

    const isLoading = jobLoading || appLoading;

    // Save admin notes
    const saveNotes = useCallback(() => {
        if (!selectedApplicant) return;
        if (adminNotes !== (selectedApplicant.adminNotes || "")) {
            updateApplicant({
                id: selectedApplicant._id,
                data: { adminNotes },
            });
        }
    }, [selectedApplicant, adminNotes, updateApplicant]);

    // Open applicant detail sheet
    const handleCardClick = (applicant: Applicant) => {
        setSelectedApplicant(applicant);
        setAdminNotes(applicant.adminNotes || "");
        setSheetOpen(true);
    };

    // Handle drag end
    const handleDragEnd = useCallback(
        (event: any) => {
            const { source, target } = event.operation;

            if (!source || !target) return;
            if (event.canceled) return;

            const applicantId = source.id as string;

            // Find the applicant
            const currentApplicant = applicants?.find((a) => a._id === applicantId);
            if (!currentApplicant) return;

            let targetStageId: string | undefined;

            // If the source is a sortable, check if its group changed
            if (isSortable(source)) {
                const newGroup = source.sortable.group as string | undefined;
                if (newGroup && newGroup !== currentApplicant.stage) {
                    targetStageId = newGroup;
                }
            }

            // If the target is a column droppable (id starts with 'column-')
            if (!targetStageId) {
                const targetId = String(target.id);
                if (targetId.startsWith("column-")) {
                    targetStageId = targetId.replace("column-", "");
                } else if (target.data?.stageId) {
                    // Target is another applicant card, get its stageId
                    targetStageId = target.data.stageId;
                }
            }

            // Skip if same stage
            if (!targetStageId || targetStageId === currentApplicant.stage) return;

            // Validate stage exists
            const validStage = jobPost?.stages.find((s) => s.id === targetStageId);
            if (validStage) {
                updateStage({ id: applicantId, stage: validStage.id });
            }
        },
        [applicants, jobPost, updateStage],
    );

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!jobPost) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <h3 className="text-xl font-semibold">Job Post Not Found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    This job post may have been deleted.
                </p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => router.push(`/business/${businessId}/job-posts`)}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Job Posts
                </Button>
            </div>
        );
    }

    // Group applicants by stage
    const sortedStages = [...jobPost.stages].sort((a, b) => a.order - b.order);
    const applicantsByStage: Record<string, Applicant[]> = {};
    sortedStages.forEach((stage) => {
        applicantsByStage[stage.id] =
            applicants?.filter((a) => a.stage === stage.id) || [];
    });

    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
        draft: { label: "Draft", variant: "secondary" },
        open: { label: "Open", variant: "default" },
        closed: { label: "Closed", variant: "outline" },
    };
    const currentStatus = statusConfig[jobPost.status];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mt-0.5 shrink-0"
                        asChild
                    >
                        <Link href={`/business/${businessId}/job-posts`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold">{jobPost.title}</h1>
                            <Badge variant={currentStatus.variant}>
                                {currentStatus.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {jobPost.employmentType}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1 max-w-xl">
                            {jobPost.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {jobPost.status !== "open" && (
                        <Button
                            size="sm"
                            onClick={() =>
                                updateJobPostStatus({ id: jobPost._id, status: "open" })
                            }
                        >
                            Publish
                        </Button>
                    )}
                    {jobPost.status === "open" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                updateJobPostStatus({ id: jobPost._id, status: "closed" })
                            }
                        >
                            Close
                        </Button>
                    )}
                </div>
            </div>

            <Separator />

            {/* Kanban Board */}
            <div className="overflow-x-auto pb-4">
                <DragDropProvider onDragEnd={handleDragEnd}>
                    <div className="flex gap-3 min-h-[calc(100vh-280px)]">
                        {sortedStages.map((stage) => (
                            <KanbanColumn
                                key={stage.id}
                                stage={stage}
                                applicants={applicantsByStage[stage.id] || []}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                </DragDropProvider>
            </div>

            {/* Applicant Detail Drawer */}
            <Drawer open={sheetOpen} onOpenChange={setSheetOpen} direction="right">
                <DrawerContent className="h-full max-h-screen">
                    <div className="overflow-y-auto h-full">
                        {selectedApplicant && (
                            <>
                                <DrawerHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <DrawerTitle>
                                                {selectedApplicant.firstName}{" "}
                                                {selectedApplicant.lastName}
                                            </DrawerTitle>
                                            <DrawerDescription>
                                                {selectedApplicant.position}
                                            </DrawerDescription>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        deleteApplicant({
                                                            id: selectedApplicant._id,
                                                            jobId: selectedApplicant.jobId,
                                                        });
                                                        setSheetOpen(false);
                                                    }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete Applicant
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </DrawerHeader>

                                <div className="space-y-4 mt-6  px-5">
                                    {/* Status */}
                                    {selectedApplicant.isStaffConverted && (
                                        <div className="rounded-lg bg-green-500/10 border border-green-200 p-3 text-sm text-green-700">
                                            <UserCheck className="inline mr-2 h-4 w-4" />
                                            Converted to staff member
                                        </div>
                                    )}

                                    {/* Contact Info */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Contact</h4>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                                <a
                                                    href={`mailto:${selectedApplicant.email}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {selectedApplicant.email}
                                                </a>
                                            </div>
                                            {selectedApplicant.phone && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                                    {selectedApplicant.phone}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                Applied{" "}
                                                {new Date(
                                                    selectedApplicant.appliedAt,
                                                ).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Resume */}
                                    {selectedApplicant.resume && (
                                        <>
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium">Resume</h4>
                                                <a
                                                    href={selectedApplicant.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                                                >
                                                    <FileText className="h-3.5 w-3.5" />
                                                    View Resume
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                            <Separator />
                                        </>
                                    )}

                                    {/* Cover Letter */}
                                    {selectedApplicant.coverLetter && (
                                        <>
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium">Cover Letter</h4>
                                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                                    {selectedApplicant.coverLetter}
                                                </p>
                                            </div>
                                            <Separator />
                                        </>
                                    )}

                                    {/* Admin Notes */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
                                            <h4 className="text-sm font-medium">Admin Notes</h4>
                                        </div>
                                        <Textarea
                                            placeholder="Add private notes about this applicant..."
                                            value={adminNotes}
                                            onChange={(e) => setAdminNotes(e.target.value)}
                                            rows={3}
                                            className="text-sm"
                                        />
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={saveNotes}
                                            disabled={
                                                adminNotes === (selectedApplicant.adminNotes || "")
                                            }
                                        >
                                            Save Notes
                                        </Button>
                                    </div>

                                    <Separator />

                                    {/* Stage Move */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Move to Stage</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {sortedStages.map((stage) => (
                                                <Button
                                                    key={stage.id}
                                                    size="sm"
                                                    variant={
                                                        selectedApplicant.stage === stage.id
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="text-xs"
                                                    onClick={() => {
                                                        if (selectedApplicant.stage !== stage.id) {
                                                            updateStage({
                                                                id: selectedApplicant._id,
                                                                stage: stage.id,
                                                            });
                                                            setSheetOpen(false);
                                                        }
                                                    }}
                                                >
                                                    {stage.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hire Button */}
                                    {!selectedApplicant.isStaffConverted && (
                                        <>
                                            <Separator />
                                            <Button
                                                className="w-full"
                                                onClick={() => {
                                                    setHireApplicant(selectedApplicant);
                                                    setHireOpen(true);
                                                    setSheetOpen(false);
                                                }}
                                            >
                                                <UserCheck className="mr-2 h-4 w-4" />
                                                Hire & Create Staff
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Hire Dialog */}
            <HireDialog
                open={hireOpen}
                onOpenChange={setHireOpen}
                applicant={hireApplicant}
            />
        </div>
    );
}

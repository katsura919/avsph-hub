"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCreateJobPost, useUpdateJobPost } from "@/hooks/useJobPost";
import type {
  JobPost,
  JobPostStage,
  CreateJobPostRequest,
} from "@/types/jobPost.types";

interface CreateJobPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessId: string;
  editingJobPost?: JobPost | null;
}

// Default pipeline template
const defaultStages: JobPostStage[] = [
  { id: "applied", name: "Applied", order: 0, type: "active" },
  { id: "screening", name: "Screening", order: 1, type: "active" },
  { id: "interview", name: "Interview", order: 2, type: "active" },
  { id: "offer", name: "Offer", order: 3, type: "active" },
  { id: "hired", name: "Hired", order: 4, type: "hired" },
  { id: "rejected", name: "Rejected", order: 5, type: "rejected" },
];

const stageTypeColors: Record<string, string> = {
  active: "bg-blue-500/10 text-blue-600 border-blue-200",
  hired: "bg-green-500/10 text-green-600 border-green-200",
  rejected: "bg-red-500/10 text-red-600 border-red-200",
};

const initialForm: {
  title: string;
  overview: string;
  employmentType: "full-time" | "part-time" | "contract";
  status: "draft" | "open" | "closed";
  stages: JobPostStage[];
} = {
  title: "",
  overview: "",
  employmentType: "full-time",
  status: "draft",
  stages: [],
};

export function CreateJobPostDialog({
  open,
  onOpenChange,
  businessId,
  editingJobPost,
}: CreateJobPostDialogProps) {
  const [form, setForm] = useState(initialForm);
  const { mutate: createJobPost, isPending: isCreating } = useCreateJobPost();
  const { mutate: updateJobPost, isPending: isUpdating } = useUpdateJobPost();
  const isPending = isCreating || isUpdating;

  const isEditing = !!editingJobPost;

  // Pre-fill form when editing
  useEffect(() => {
    if (editingJobPost) {
      setForm({
        title: editingJobPost.title,
        overview: editingJobPost.overview,
        employmentType: editingJobPost.employmentType,
        status: editingJobPost.status,
        stages: editingJobPost.stages || [],
      });
    } else {
      setForm(initialForm);
    }
  }, [editingJobPost, open]);

  const resetForm = () => setForm(initialForm);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetForm();
    onOpenChange(newOpen);
  };

  // Stage management
  const addStage = () => {
    const newId = `stage-${Date.now()}`;
    setForm((prev) => ({
      ...prev,
      stages: [
        ...prev.stages,
        {
          id: newId,
          name: "",
          order: prev.stages.length,
          type: "active" as const,
        },
      ],
    }));
  };

  const updateStage = (
    index: number,
    field: keyof JobPostStage,
    value: string | number,
  ) => {
    setForm((prev) => ({
      ...prev,
      stages: prev.stages.map((s, i) =>
        i === index ? { ...s, [field]: value } : s,
      ),
    }));
  };

  const removeStage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      stages: prev.stages
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, order: i })),
    }));
  };

  const loadDefaultTemplate = () => {
    setForm((prev) => ({ ...prev, stages: [...defaultStages] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateJobPostRequest = {
      businessId,
      title: form.title.trim(),
      overview: form.overview.trim(),
      employmentType: form.employmentType,
      status: form.status,
      stages: form.stages.map((s, i) => ({ ...s, order: i })),
    };

    if (isEditing && editingJobPost) {
      updateJobPost(
        {
          id: editingJobPost._id,
          data: {
            title: payload.title,
            overview: payload.overview,
            employmentType: payload.employmentType,
            status: payload.status,
            stages: payload.stages,
          },
        },
        {
          onSuccess: () => {
            resetForm();
            onOpenChange(false);
          },
        },
      );
    } else {
      createJobPost(payload, {
        onSuccess: () => {
          resetForm();
          onOpenChange(false);
        },
      });
    }
  };

  const isValid =
    form.title.trim() &&
    form.overview.trim() &&
    form.stages.length > 0 &&
    form.stages.every((s) => s.name.trim());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Job Post" : "Create Job Post"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the job post details and hiring pipeline."
                : "Create a new job listing with a customizable hiring pipeline."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* ── Job Details ── */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Job Details
              </h4>
              <div className="grid gap-4">
                {/* Title */}
                <div className="grid gap-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g. Virtual Assistant"
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Overview */}
                <div className="grid gap-2">
                  <Label htmlFor="overview">
                    Overview <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="overview"
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    value={form.overview}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        overview: e.target.value,
                      }))
                    }
                    disabled={isPending}
                    rows={4}
                    required
                  />
                </div>

                {/* Employment Type & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Employment Type</Label>
                    <Select
                      value={form.employmentType}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          employmentType: value as typeof form.employmentType,
                        }))
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          status: value as typeof form.status,
                        }))
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* ── Hiring Pipeline ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Hiring Pipeline <span className="text-destructive">*</span>
                </h4>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={loadDefaultTemplate}
                    disabled={isPending}
                    className="text-xs"
                  >
                    Use Default Template
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addStage}
                    disabled={isPending}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Stage
                  </Button>
                </div>
              </div>

              {form.stages.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No stages configured. Click{" "}
                    <span className="font-medium text-foreground">
                      &quot;Use Default Template&quot;
                    </span>{" "}
                    to quickly set up a standard pipeline, or add stages
                    manually.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {form.stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="flex items-center gap-2 rounded-lg border bg-card p-2.5"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground w-5 shrink-0">
                        {index + 1}
                      </span>
                      <Input
                        placeholder="Stage name"
                        value={stage.name}
                        onChange={(e) =>
                          updateStage(index, "name", e.target.value)
                        }
                        disabled={isPending}
                        className="h-8 text-sm"
                      />
                      <Select
                        value={stage.type}
                        onValueChange={(value) =>
                          updateStage(index, "type", value)
                        }
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          stage.type === "active"
                            ? "bg-blue-500"
                            : stage.type === "hired"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => removeStage(index)}
                        disabled={isPending}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Save Changes" : "Create Job Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  EodReport,
  AdminEditEodRequest,
  EodStatus,
} from "@/types/eod.types";

// ──── Status config ────
const statusConfig: Record<
  string,
  { label: string; className: string; icon: React.ElementType }
> = {
  submitted: {
    label: "Submitted",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Clock,
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: CheckCircle2,
  },
  needs_revision: {
    label: "Needs Revision",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: AlertCircle,
  },
};

const approvalConfig: Record<string, { label: string; className: string }> = {
  true: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  false: {
    label: "Pending",
    className: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  },
};

// ──── Combined View + Edit EOD Dialog ────
export function ViewEodDialog({
  report,
  open,
  onOpenChange,
  onApprove,
  onRevise,
  onEdit,
  isEditPending,
}: {
  report: EodReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (report: EodReport) => void;
  onRevise?: (report: EodReport) => void;
  onEdit?: (id: string, data: AdminEditEodRequest) => void;
  isEditPending?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<AdminEditEodRequest>({});

  // Reset to view mode when dialog closes or report changes
  useEffect(() => {
    if (!open) {
      setEditing(false);
    }
  }, [open]);

  useEffect(() => {
    if (report) {
      setForm({
        date: report.date,
        hoursWorked: report.hoursWorked,
        regularHoursWorked: report.regularHoursWorked ?? report.hoursWorked,
        overtimeHoursWorked: report.overtimeHoursWorked ?? 0,
        nightDifferentialHours: report.nightDifferentialHours ?? 0,
        tasksCompleted: report.tasksCompleted,
        onSite: report.onSite,
        status: report.status,
        isApproved: report.isApproved,
        adminNotes: report.adminNotes ?? "",
      });
    }
  }, [report]);

  if (!report) return null;

  const status = statusConfig[report.status];
  const approval = approvalConfig[String(report.isApproved)];
  const StatusIcon = status?.icon || Clock;
  const isSubmitted = report.status === "submitted";
  const dateStr = new Date(report.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleNumberChange = (
    field: keyof AdminEditEodRequest,
    value: string,
  ) => {
    const num = value === "" ? undefined : parseFloat(value);
    setForm((prev) => ({ ...prev, [field]: num }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit?.(report._id, form);
  };

  // ──── Edit Mode ────
  if (editing) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Edit EOD Report
            </DialogTitle>
            <DialogDescription>
              {report.staffName || "Unknown"} — {dateStr}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={form.date ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-hours">Total Hours</Label>
                <Input
                  id="edit-hours"
                  type="number"
                  step="0.25"
                  min="0"
                  max="24"
                  value={form.hoursWorked ?? ""}
                  onChange={(e) =>
                    handleNumberChange("hoursWorked", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-regular">Regular Hours</Label>
                <Input
                  id="edit-regular"
                  type="number"
                  step="0.25"
                  min="0"
                  max="24"
                  value={form.regularHoursWorked ?? ""}
                  onChange={(e) =>
                    handleNumberChange("regularHoursWorked", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ot">Overtime Hours</Label>
                <Input
                  id="edit-ot"
                  type="number"
                  step="0.25"
                  min="0"
                  max="24"
                  value={form.overtimeHoursWorked ?? ""}
                  onChange={(e) =>
                    handleNumberChange("overtimeHoursWorked", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-night">Night Diff Hours</Label>
                <Input
                  id="edit-night"
                  type="number"
                  step="0.25"
                  min="0"
                  max="24"
                  value={form.nightDifferentialHours ?? ""}
                  onChange={(e) =>
                    handleNumberChange("nightDifferentialHours", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              <Label htmlFor="edit-tasks">Tasks Completed</Label>
              <Textarea
                id="edit-tasks"
                rows={3}
                value={form.tasksCompleted ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    tasksCompleted: e.target.value,
                  }))
                }
              />
            </div>

            {/* On-site toggle */}
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <Label htmlFor="edit-onsite" className="text-sm font-medium">
                  On-Site
                </Label>
                <p className="text-xs text-muted-foreground">
                  Staff was physically present at the office
                </p>
              </div>
              <Switch
                id="edit-onsite"
                checked={form.onSite ?? false}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, onSite: checked }))
                }
              />
            </div>

            {/* Status & Approval */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={form.status ?? report.status}
                  onValueChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      status: value as EodStatus,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="needs_revision">
                      Needs Revision
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end pb-1">
                <div className="flex items-center gap-3 rounded-md border p-3 w-full">
                  <Label
                    htmlFor="edit-approved"
                    className="text-sm font-medium"
                  >
                    Approved
                  </Label>
                  <Switch
                    id="edit-approved"
                    checked={form.isApproved ?? false}
                    onCheckedChange={(checked) =>
                      setForm((prev) => ({ ...prev, isApproved: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="space-y-2">
              <Label htmlFor="edit-admin-notes">Admin Notes</Label>
              <Textarea
                id="edit-admin-notes"
                rows={2}
                placeholder="Optional notes about the changes..."
                value={form.adminNotes ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, adminNotes: e.target.value }))
                }
              />
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(false)}
                disabled={isEditPending}
              >
                Back to View
              </Button>
              <Button type="submit" disabled={isEditPending}>
                {isEditPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // ──── View Mode ────
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            EOD Report
          </DialogTitle>
          <DialogDescription>{dateStr}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Staff info */}
          <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
            <div>
              <p className="text-sm font-medium">
                {report.staffName || "Unknown"}
              </p>
              <p className="text-xs text-muted-foreground">
                {report.staffEmail || report.staffId}
              </p>
            </div>
          </div>

          {/* Status & Approval Badges */}
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`font-normal ${status?.className}`}
            >
              <StatusIcon className="mr-1 h-3 w-3" />
              {status?.label || report.status}
            </Badge>
            <Badge
              variant="outline"
              className={`font-normal ${approval?.className}`}
            >
              {approval?.label}
            </Badge>
          </div>

          <Separator />

          {/* Hours Worked */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Total Hours Worked
              </p>
              <p className="text-sm font-semibold">{report.hoursWorked}h</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Regular / OT / Night
              </p>
              <p className="text-sm font-semibold">
                {report.regularHoursWorked ?? report.hoursWorked}h /{" "}
                {report.overtimeHoursWorked ?? 0}h /{" "}
                {report.nightDifferentialHours ?? 0}h
              </p>
            </div>
          </div>

          {/* On-Site */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Work Location
            </p>
            <Badge
              variant="outline"
              className={
                report.onSite
                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
              }
            >
              {report.onSite ? "On-Site" : "Remote"}
            </Badge>
          </div>

          {/* Tasks Completed */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Tasks Completed
            </p>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {report.tasksCompleted}
            </p>
          </div>

          {/* Challenges */}
          {report.challenges && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Challenges
              </p>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {report.challenges}
              </p>
            </div>
          )}

          {/* Next Day Plan */}
          {report.nextDayPlan && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Next Day Plan
              </p>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {report.nextDayPlan}
              </p>
            </div>
          )}

          {/* Notes */}
          {report.notes && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Notes
              </p>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {report.notes}
              </p>
            </div>
          )}

          {/* Admin Notes */}
          {report.adminNotes && (
            <>
              <Separator />
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Admin Notes
                </p>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {report.adminNotes}
                </p>
              </div>
            </>
          )}

          {/* Timestamps */}
          <Separator />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Submitted:{" "}
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
            {report.reviewedAt && (
              <span>
                Reviewed:{" "}
                {new Date(report.reviewedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {onEdit && (
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {isSubmitted && (
            <>
              <Button
                variant="outline"
                className="text-amber-600 border-amber-500/30 hover:bg-amber-500/10"
                onClick={() => {
                  onRevise?.(report);
                  onOpenChange(false);
                }}
              >
                Request Revision
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  onApprove?.(report);
                  onOpenChange(false);
                }}
              >
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

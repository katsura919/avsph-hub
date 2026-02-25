"use client";

import { useState, useCallback, useMemo } from "react";
import {
  FileText,
  Loader2,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  CalendarIcon,
} from "lucide-react";
import {
  useMyEodReports,
  useSubmitEod,
  useResubmitEod,
} from "@/hooks/eod/useStaffEod";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import type { EodQuery, EodReport, EodStatus } from "@/types/eod.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ──── Status config (shared) ────
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

// ──── Submit EOD Dialog ────
function SubmitEodDialog({
  open,
  onOpenChange,
  initialData,
  isResubmit = false,
  reportId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: EodReport;
  isResubmit?: boolean;
  reportId?: string;
}) {
  const submitMutation = useSubmitEod();
  const resubmitMutation = useResubmitEod();
  const isSubmitting = submitMutation.isPending || resubmitMutation.isPending;

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: initialData?.date?.split("T")[0] || today,
    hoursWorked: initialData?.hoursWorked?.toString() || "",
    tasksCompleted: initialData?.tasksCompleted || "",
    challenges: initialData?.challenges || "",
    nextDayPlan: initialData?.nextDayPlan || "",
    notes: initialData?.notes || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      date: form.date,
      hoursWorked: parseFloat(form.hoursWorked),
      tasksCompleted: form.tasksCompleted,
      ...(form.challenges && { challenges: form.challenges }),
      ...(form.nextDayPlan && { nextDayPlan: form.nextDayPlan }),
      ...(form.notes && { notes: form.notes }),
    };

    if (isResubmit && reportId) {
      const { date, ...resubmitPayload } = payload;
      resubmitMutation.mutate(
        { id: reportId, data: resubmitPayload },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        },
      );
    } else {
      submitMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false);
          resetForm();
        },
      });
    }
  };

  const resetForm = () => {
    setForm({
      date: today,
      hoursWorked: "",
      tasksCompleted: "",
      challenges: "",
      nextDayPlan: "",
      notes: "",
    });
  };

  const isValid = form.hoursWorked && form.tasksCompleted && form.date;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isResubmit ? "Resubmit EOD Report" : "Submit EOD Report"}
          </DialogTitle>
          <DialogDescription>
            {isResubmit
              ? "Revise and resubmit your end-of-day report."
              : "Fill out your end-of-day report for today."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date & Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  disabled={isResubmit}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoursWorked">Hours Worked</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hoursWorked"
                  name="hoursWorked"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="8"
                  value={form.hoursWorked}
                  onChange={handleChange}
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tasks Completed */}
          <div className="space-y-2">
            <Label htmlFor="tasksCompleted">Tasks Completed *</Label>
            <Textarea
              id="tasksCompleted"
              name="tasksCompleted"
              placeholder="Describe the tasks you completed today..."
              value={form.tasksCompleted}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>

          {/* Challenges */}
          <div className="space-y-2">
            <Label htmlFor="challenges">Challenges</Label>
            <Textarea
              id="challenges"
              name="challenges"
              placeholder="Any challenges or blockers you faced..."
              value={form.challenges}
              onChange={handleChange}
              rows={2}
            />
          </div>

          {/* Next Day Plan */}
          <div className="space-y-2">
            <Label htmlFor="nextDayPlan">Next Day Plan</Label>
            <Textarea
              id="nextDayPlan"
              name="nextDayPlan"
              placeholder="What do you plan to work on tomorrow..."
              value={form.nextDayPlan}
              onChange={handleChange}
              rows={2}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isResubmit ? "Resubmit" : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ──── View EOD Detail Dialog ────
function ViewEodDialog({
  report,
  open,
  onOpenChange,
}: {
  report: EodReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!report) return null;

  const status = statusConfig[report.status];
  const approval = approvalConfig[String(report.isApproved)];
  const StatusIcon = status?.icon || Clock;
  const dateStr = new Date(report.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            EOD Report
          </DialogTitle>
          <DialogDescription>{dateStr}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
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
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Hours Worked
            </p>
            <p className="text-sm font-semibold">{report.hoursWorked}h</p>
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

          {/* Admin Notes (if any) */}
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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ──── Main Page ────
export default function StaffEodPage() {
  // Filter state
  const [status, setStatus] = useState<string>("all");

  // Dialog state
  const [submitOpen, setSubmitOpen] = useState(false);
  const [viewReport, setViewReport] = useState<EodReport | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [resubmitReport, setResubmitReport] = useState<EodReport | null>(null);
  const [resubmitOpen, setResubmitOpen] = useState(false);

  // Build query
  const queryParams: EodQuery = {
    ...(status !== "all" && { status: status as EodStatus }),
  };

  // Fetch data
  const { data: reports, isLoading, isError } = useMyEodReports(queryParams);

  // Handlers
  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value);
  }, []);

  const handleView = useCallback((report: EodReport) => {
    setViewReport(report);
    setViewOpen(true);
  }, []);

  const handleResubmit = useCallback((report: EodReport) => {
    setResubmitReport(report);
    setResubmitOpen(true);
  }, []);

  // Memoized columns
  const columns = useMemo(
    () =>
      getColumns({
        onView: handleView,
        onResubmit: handleResubmit,
      }),
    [handleView, handleResubmit],
  );

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <FileText className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">
          Unable to Load EOD Reports
        </h3>
        <p className="mt-2 text-base text-muted-foreground">
          There was an error loading your EOD reports. Please try again.
        </p>
      </div>
    );
  }

  const eodReports = reports || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            My EOD Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Submit and track your end-of-day reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <span className="font-medium text-foreground">
              {eodReports.length}
            </span>
            <span>total reports</span>
          </div>
          <Button onClick={() => setSubmitOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Submit EOD
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={eodReports}
        isLoading={isLoading}
        statusFilter={status}
        onStatusFilter={handleStatusFilter}
      />

      {/* Submit EOD Dialog */}
      <SubmitEodDialog open={submitOpen} onOpenChange={setSubmitOpen} />

      {/* View EOD Dialog */}
      <ViewEodDialog
        report={viewReport}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      {/* Resubmit EOD Dialog */}
      {resubmitReport && (
        <SubmitEodDialog
          open={resubmitOpen}
          onOpenChange={(open) => {
            setResubmitOpen(open);
            if (!open) setResubmitReport(null);
          }}
          initialData={resubmitReport}
          isResubmit
          reportId={resubmitReport._id}
        />
      )}
    </div>
  );
}

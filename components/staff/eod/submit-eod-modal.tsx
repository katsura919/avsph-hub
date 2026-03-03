import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarIcon,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import { useResubmitEod, useSubmitEod } from "@/hooks/eod/useStaffEod";
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
import type { EodReport } from "@/types/eod.types";

export const statusConfig: Record<
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

export const approvalConfig: Record<
  string,
  { label: string; className: string }
> = {
  true: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  false: {
    label: "Pending",
    className: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  },
};

type FormState = {
  date: string;
  hoursWorked: string;
  regularHoursWorked: string;
  overtimeHoursWorked: string;
  nightDifferentialHours: string;
  tasksCompleted: string;
  onSite: boolean;
  challenges: string;
  nextDayPlan: string;
  notes: string;
};

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function buildFormState(initialData?: EodReport): FormState {
  return {
    date: initialData?.date?.split("T")[0] || getTodayDate(),
    hoursWorked:
      typeof initialData?.hoursWorked === "number"
        ? String(initialData.hoursWorked)
        : "",
    regularHoursWorked:
      typeof initialData?.regularHoursWorked === "number"
        ? String(initialData.regularHoursWorked)
        : "",
    overtimeHoursWorked:
      typeof initialData?.overtimeHoursWorked === "number"
        ? String(initialData.overtimeHoursWorked)
        : "",
    nightDifferentialHours:
      typeof initialData?.nightDifferentialHours === "number"
        ? String(initialData.nightDifferentialHours)
        : "",
    tasksCompleted: initialData?.tasksCompleted || "",
    onSite: initialData?.onSite ?? false,
    challenges: initialData?.challenges || "",
    nextDayPlan: initialData?.nextDayPlan || "",
    notes: initialData?.notes || "",
  };
}

function parseOptionalNumber(
  value: string,
  fallback?: number,
): number | undefined {
  if (value.trim() === "") {
    return fallback;
  }
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function SubmitEodDialog({
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
  const [form, setForm] = useState<FormState>(() =>
    buildFormState(initialData),
  );

  useEffect(() => {
    if (open) {
      setForm(buildFormState(initialData));
    }
  }, [open, initialData]);

  const parsed = useMemo(() => {
    const hoursWorked = parseOptionalNumber(form.hoursWorked);
    const regularHoursWorked = parseOptionalNumber(
      form.regularHoursWorked,
      hoursWorked,
    );
    const overtimeHoursWorked = parseOptionalNumber(
      form.overtimeHoursWorked,
      0,
    );
    const nightDifferentialHours = parseOptionalNumber(
      form.nightDifferentialHours,
      0,
    );
    return {
      hoursWorked,
      regularHoursWorked,
      overtimeHoursWorked,
      nightDifferentialHours,
    };
  }, [
    form.hoursWorked,
    form.regularHoursWorked,
    form.overtimeHoursWorked,
    form.nightDifferentialHours,
  ]);

  const hoursBreakdownError = useMemo(() => {
    const {
      hoursWorked,
      regularHoursWorked,
      overtimeHoursWorked,
      nightDifferentialHours,
    } = parsed;

    if (hoursWorked === undefined || hoursWorked < 0 || hoursWorked > 24) {
      return "Hours worked must be between 0 and 24.";
    }
    if (
      regularHoursWorked === undefined ||
      overtimeHoursWorked === undefined ||
      nightDifferentialHours === undefined
    ) {
      return "Hours fields must be valid numbers.";
    }
    if (regularHoursWorked < 0 || regularHoursWorked > 24) {
      return "Regular hours must be between 0 and 24.";
    }
    if (overtimeHoursWorked < 0 || overtimeHoursWorked > 24) {
      return "Overtime hours must be between 0 and 24.";
    }
    if (nightDifferentialHours < 0 || nightDifferentialHours > 24) {
      return "Night differential hours must be between 0 and 24.";
    }
    if (regularHoursWorked + overtimeHoursWorked > hoursWorked) {
      return "Regular + overtime hours cannot exceed total hours worked.";
    }
    if (nightDifferentialHours > hoursWorked) {
      return "Night differential hours cannot exceed total hours worked.";
    }

    return "";
  }, [parsed]);

  const isValid =
    !!form.date &&
    form.tasksCompleted.trim().length > 0 &&
    !hoursBreakdownError;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || parsed.hoursWorked === undefined) return;

    const payload = {
      date: form.date,
      hoursWorked: parsed.hoursWorked,
      ...(form.regularHoursWorked.trim() !== "" && {
        regularHoursWorked: parsed.regularHoursWorked,
      }),
      ...(form.overtimeHoursWorked.trim() !== "" && {
        overtimeHoursWorked: parsed.overtimeHoursWorked,
      }),
      ...(form.nightDifferentialHours.trim() !== "" && {
        nightDifferentialHours: parsed.nightDifferentialHours,
      }),
      tasksCompleted: form.tasksCompleted.trim(),
      onSite: form.onSite,
      ...(form.challenges.trim() && { challenges: form.challenges.trim() }),
      ...(form.nextDayPlan.trim() && { nextDayPlan: form.nextDayPlan.trim() }),
      ...(form.notes.trim() && { notes: form.notes.trim() }),
    };

    if (isResubmit && reportId) {
      const { date, ...resubmitPayload } = payload;
      resubmitMutation.mutate(
        { id: reportId, data: resubmitPayload },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    submitMutation.mutate(payload, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {isResubmit ? "Resubmit EOD Report" : "Submit EOD Report"}
          </DialogTitle>
          <DialogDescription>
            {isResubmit
              ? "Revise and resubmit your end-of-day report."
              : "Fill out your end-of-day report."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <Label htmlFor="hoursWorked">Total Hours Worked</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hoursWorked"
                  name="hoursWorked"
                  type="number"
                  step="0.25"
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="regularHoursWorked">Regular Hours</Label>
              <Input
                id="regularHoursWorked"
                name="regularHoursWorked"
                type="number"
                step="0.25"
                min="0"
                max="24"
                placeholder="Auto = total hours"
                value={form.regularHoursWorked}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtimeHoursWorked">Overtime Hours</Label>
              <Input
                id="overtimeHoursWorked"
                name="overtimeHoursWorked"
                type="number"
                step="0.25"
                min="0"
                max="24"
                placeholder="0"
                value={form.overtimeHoursWorked}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nightDifferentialHours">Night Diff Hours</Label>
              <Input
                id="nightDifferentialHours"
                name="nightDifferentialHours"
                type="number"
                step="0.25"
                min="0"
                max="24"
                placeholder="0"
                value={form.nightDifferentialHours}
                onChange={handleChange}
              />
            </div>
          </div>

          {hoursBreakdownError ? (
            <p className="text-sm text-destructive">{hoursBreakdownError}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              If regular hours are blank, backend treats regular hours as total
              hours worked.
            </p>
          )}

          <div className="flex items-center gap-2">
            <input
              id="onSite"
              name="onSite"
              type="checkbox"
              checked={form.onSite}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, onSite: e.target.checked }))
              }
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="onSite">Worked On-Site</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tasksCompleted">Tasks Completed</Label>
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

          <div className="space-y-2">
            <Label htmlFor="challenges">Challenges</Label>
            <Textarea
              id="challenges"
              name="challenges"
              placeholder="Any blockers or issues you encountered..."
              value={form.challenges}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextDayPlan">Next Day Plan</Label>
            <Textarea
              id="nextDayPlan"
              name="nextDayPlan"
              placeholder="What do you plan to work on next?"
              value={form.nextDayPlan}
              onChange={handleChange}
              rows={2}
            />
          </div>

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

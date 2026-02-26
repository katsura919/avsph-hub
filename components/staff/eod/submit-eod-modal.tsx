import React, { useState } from "react";
import {
  Loader2,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { EodQuery, EodReport, EodStatus } from "@/types/eod.types";
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

export const approvalConfig: Record<string, { label: string; className: string }> = {
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

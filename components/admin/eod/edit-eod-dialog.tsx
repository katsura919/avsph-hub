"use client";

import { useState, useEffect } from "react";
import { Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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

interface EditEodDialogProps {
  report: EodReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: AdminEditEodRequest) => void;
  isPending?: boolean;
}

export function EditEodDialog({
  report,
  open,
  onOpenChange,
  onSave,
  isPending = false,
}: EditEodDialogProps) {
  const [form, setForm] = useState<AdminEditEodRequest>({});

  // Reset form when report changes
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

  const handleNumberChange = (
    field: keyof AdminEditEodRequest,
    value: string,
  ) => {
    const num = value === "" ? undefined : parseFloat(value);
    setForm((prev) => ({ ...prev, [field]: num }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(report._id, form);
  };

  const dateStr = new Date(report.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Edit EOD Report
          </DialogTitle>
          <DialogDescription>
            {report.staffName || "Unknown"} — {dateStr}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                setForm((prev) => ({ ...prev, tasksCompleted: e.target.value }))
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
                  setForm((prev) => ({ ...prev, status: value as EodStatus }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="needs_revision">Needs Revision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end pb-1">
              <div className="flex items-center gap-3 rounded-md border p-3 w-full">
                <Label htmlFor="edit-approved" className="text-sm font-medium">
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

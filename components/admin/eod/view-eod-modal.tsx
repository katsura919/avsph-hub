import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { EodReport } from "@/types/eod.types";

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

// ──── View EOD Detail Dialog ────
export function ViewEodDialog({
  report,
  open,
  onOpenChange,
  onApprove,
  onRevise,
}: {
  report: EodReport | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove?: (report: EodReport) => void;
  onRevise?: (report: EodReport) => void;
}) {
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

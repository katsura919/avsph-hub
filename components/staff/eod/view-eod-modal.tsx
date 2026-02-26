import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Clock, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { EodReport } from "@/types/eod.types";
import {
  statusConfig,
  approvalConfig,
} from "@/components/staff/eod/submit-eod-modal";
// ──── View EOD Detail Dialog ────
export function ViewEodDialog({
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

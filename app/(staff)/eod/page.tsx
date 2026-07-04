"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { differenceInCalendarDays, format } from "date-fns";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  Plus,
  Wallet,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { SubmitEodDialog } from "@/components/staff/eod/submit-eod-modal";
import { ViewEodDialog } from "@/components/staff/eod/view-eod-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMyEodReports, useMyExpectedEarnings } from "@/hooks/eod/useStaffEod";
import type { EodQuery, EodReport, EodStatus } from "@/types/eod.types";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";

export default function StaffEodPage() {
  return (
    <Suspense fallback={null}>
      <StaffEodPageInner />
    </Suspense>
  );
}

function StaffEodPageInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [viewReport, setViewReport] = useState<EodReport | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [resubmitReport, setResubmitReport] = useState<EodReport | null>(null);
  const [resubmitOpen, setResubmitOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("action") === "submit") {
      setSubmitOpen(true);
    }
  }, [searchParams]);

  const queryParams: EodQuery = {
    ...(status !== "all" && { status: status as EodStatus }),
    ...(dateRange?.from && {
      startDate: dateRange.from.toISOString().split("T")[0],
    }),
    ...(dateRange?.to && {
      endDate: dateRange.to.toISOString().split("T")[0],
    }),
  };

  const { data: pagedData, isLoading, isError } = useMyEodReports(queryParams);
  const { data: earnings, isLoading: isEarningsLoading } = useMyExpectedEarnings();

  const payPeriodLabel =
    earnings?.periodStart && earnings?.periodEnd
      ? `${format(new Date(earnings.periodStart), "MMM d")} – ${format(new Date(earnings.periodEnd), "MMM d")}`
      : null;

  const payoutCaption = earnings?.nextPayoutDate
    ? (() => {
        const days = differenceInCalendarDays(
          new Date(earnings.nextPayoutDate),
          new Date(),
        );
        if (days < 0) return "Processing";
        if (days === 0) return "Today";
        if (days === 1) return "Tomorrow";
        return `In ${days} days`;
      })()
    : null;

  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value);
  }, []);

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  const handleView = useCallback((report: EodReport) => {
    setViewReport(report);
    setViewOpen(true);
  }, []);

  const handleResubmit = useCallback((report: EodReport) => {
    setResubmitReport(report);
    setResubmitOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getColumns({
        onResubmit: handleResubmit,
      }),
    [handleResubmit],
  );

  const eodReports = pagedData?.data ?? [];
  const totalCount = pagedData?.pagination?.totalCount ?? 0;

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-xl font-semibold">Unable to Load EOD Reports</h3>
        <p className="mt-2 text-base text-muted-foreground">
          There was an error loading your EOD reports. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">My EOD Reports</h1>
          <p className="text-sm text-muted-foreground">
            Submit and track your end-of-day reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <span className="font-medium text-foreground">{totalCount}</span>
            <span>total reports</span>
          </div>
          <Button onClick={() => setSubmitOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Submit EOD
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Wallet className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Estimated Pay
              </span>
            </div>
            <p className="mt-1.5 text-2xl font-bold tabular-nums">
              {isEarningsLoading
                ? "..."
                : (earnings?.estimatedPay ?? 0).toLocaleString()}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {payPeriodLabel ?? "Current pay period"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Approved
              </span>
            </div>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-emerald-500">
              {isEarningsLoading ? "..." : (earnings?.approvedEodCount ?? 0)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Reviewed & approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Pending
              </span>
            </div>
            <p className="mt-1.5 text-2xl font-bold tabular-nums text-amber-500">
              {isEarningsLoading ? "..." : (earnings?.pendingEodCount ?? 0)}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Next Payout
              </span>
            </div>
            <p className="mt-1.5 text-2xl font-bold tabular-nums">
              {earnings?.nextPayoutDate
                ? format(new Date(earnings.nextPayoutDate), "MMM d")
                : "-"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {payoutCaption ?? "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={eodReports}
        isLoading={isLoading}
        statusFilter={status}
        onStatusFilter={handleStatusFilter}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRowClick={(row) => handleView(row as EodReport)}
      />

      <SubmitEodDialog open={submitOpen} onOpenChange={setSubmitOpen} />

      <ViewEodDialog report={viewReport} open={viewOpen} onOpenChange={setViewOpen} />

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

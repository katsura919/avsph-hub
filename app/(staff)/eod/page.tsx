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
import { SubmitEodDialog } from "@/components/staff/eod/submit-eod-modal";
import { ViewEodDialog } from "@/components/admin/eod/view-eod-modal";


// ──── Main Page ────
export default function StaffEodPage() {
  // Filter state
  const [status, setStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<
    import("react-day-picker").DateRange | undefined
  >(undefined);

  // Dialog state
  const [submitOpen, setSubmitOpen] = useState(false);
  const [viewReport, setViewReport] = useState<EodReport | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [resubmitReport, setResubmitReport] = useState<EodReport | null>(null);
  const [resubmitOpen, setResubmitOpen] = useState(false);

  // Build query
  const queryParams: EodQuery = {
    ...(status !== "all" && { status: status as EodStatus }),
    ...(dateRange?.from && {
      startDate: dateRange.from.toISOString().split("T")[0],
    }),
    ...(dateRange?.to && {
      endDate: dateRange.to.toISOString().split("T")[0],
    }),
  };

  // Fetch data
  const { data: pagedData, isLoading, isError } = useMyEodReports(queryParams);

  // Handlers
  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value);
  }, []);

  const handleDateRangeChange = useCallback(
    (range: import("react-day-picker").DateRange | undefined) => {
      setDateRange(range);
    },
    [],
  );

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
        onResubmit: handleResubmit,
      }),
    [handleResubmit],
  );

  const eodReports = pagedData?.data ?? [];
  const totalCount = pagedData?.pagination?.totalCount ?? 0;

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
            <span className="font-medium text-foreground">{totalCount}</span>
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
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRowClick={(row) =>
          handleView(row as import("@/types/eod.types").EodReport)
        }
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

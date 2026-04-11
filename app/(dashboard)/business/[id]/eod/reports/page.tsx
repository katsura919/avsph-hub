"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Loader2,
  FileSpreadsheet,
  CalendarDays,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useBusinessById } from "@/hooks/useBusiness";
import { useEodSummaryByBusiness } from "@/hooks/eod/useAdminEod";
import type {
  EodSummaryPeriodType,
  EodSummaryQuery,
  EodSummaryItem,
} from "@/types/eod.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTodayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function formatHours(h: number): string {
  return `${h.toFixed(2)}h`;
}

const PERIOD_LABELS: Record<EodSummaryPeriodType, string> = {
  weekly: "Weekly (Mon–Sun)",
  "bimonthly-1": "1st – 15th",
  "bimonthly-2": "16th – End of Month",
  monthly: "Monthly",
};

export default function EodReportsPage() {
  const params = useParams();
  const businessId = params.id as string;

  const [periodType, setPeriodType] = useState<EodSummaryPeriodType>("weekly");
  const [referenceDate, setReferenceDate] = useState<string>(getTodayIso());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const limit = 20;

  const query: EodSummaryQuery = useMemo(
    () => ({
      periodType,
      referenceDate,
      page: String(page),
      limit: String(limit),
      ...(search && { search }),
    }),
    [periodType, referenceDate, page, search],
  );

  const { data: business, isLoading: isBusinessLoading } =
    useBusinessById(businessId);
  const { data, isLoading, isError } = useEodSummaryByBusiness(
    businessId,
    query,
  );

  const rows = data?.data ?? [];
  const pagination = data?.pagination;

  const exportToExcel = async () => {
    if (!rows.length) {
      toast.error("No data to export");
      return;
    }

    try {
      setIsExporting(true);
      const XLSX = await import("xlsx");

      const exportRows = rows.map((row: EodSummaryItem) => ({
        "Staff Name": row.staffName,
        "Staff Email": row.staffEmail ?? "",
        "Total Hours": row.totalHoursWorked,
        "Regular Hours": row.totalRegularHours,
        "Overtime Hours": row.totalOvertimeHours,
        "Night Differential Hours": row.totalNightDifferentialHours,
        "EOD Count": row.eodCount,
        "Approved Count": row.approvedCount,
        "Period Start": row.periodStart,
        "Period End": row.periodEnd,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "EOD Report");

      const today = getTodayIso();
      XLSX.writeFile(workbook, `eod-report-${businessId}-${today}.xlsx`);
      toast.success("Excel downloaded");
    } catch {
      toast.error("Failed to export Excel file");
    } finally {
      setIsExporting(false);
    }
  };

  if (isBusinessLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !business) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <FileSpreadsheet className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Unable to Load Reports</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          There was an error loading the EOD summary reports.
        </p>
      </div>
    );
  }

  const periodStart = rows[0]?.periodStart;
  const periodEnd = rows[0]?.periodEnd;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Button asChild variant="ghost" size="sm" className="h-7 px-2 -ml-2">
            <Link href={`/business/${businessId}/eod`}>
              <ArrowLeft className="mr-1 h-3.5 w-3.5" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">EOD Reports</h1>
          <p className="text-sm text-muted-foreground">
            Aggregated staff summary for{" "}
            <span className="font-medium text-foreground">{business.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:mt-1">
          {periodStart && periodEnd && (
            <Badge variant="secondary" className="gap-1 px-2.5 py-1 text-xs">
              <CalendarDays className="h-3 w-3" />
              {formatDate(periodStart)} – {formatDate(periodEnd)}
            </Badge>
          )}
          <Button
            onClick={exportToExcel}
            disabled={isExporting || !rows.length}
            size="sm"
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border bg-card p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Period Type
            </label>
            <Select
              value={periodType}
              onValueChange={(value) => {
                setPeriodType(value as EodSummaryPeriodType);
                setPage(1);
              }}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly (Mon–Sun)</SelectItem>
                <SelectItem value="bimonthly-1">1st – 15th</SelectItem>
                <SelectItem value="bimonthly-2">16th – End of Month</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Reference Date
            </label>
            <Input
              type="date"
              value={referenceDate}
              onChange={(e) => {
                setReferenceDate(e.target.value);
                setPage(1);
              }}
              className="bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Search Staff
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-background pl-8"
              />
            </div>
          </div>
        </div>

        {/* Active period label */}
        <p className="mt-3 text-xs text-muted-foreground">
          Showing:{" "}
          <span className="font-medium text-foreground">
            {PERIOD_LABELS[periodType]}
          </span>
          {referenceDate && (
            <>
              {" "}
              containing{" "}
              <span className="font-medium text-foreground">
                {formatDate(referenceDate)}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-[220px]">Staff</TableHead>
              <TableHead className="text-right">Total Hrs</TableHead>
              <TableHead className="text-right">Regular</TableHead>
              <TableHead className="text-right">Overtime</TableHead>
              <TableHead className="text-right">Night Diff</TableHead>
              <TableHead className="text-right">EODs</TableHead>
              <TableHead className="text-right">Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-[300px] text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading summary report...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((row) => (
                <TableRow key={row.staffId} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium leading-tight">
                        {row.staffName}
                      </span>
                      {row.staffEmail && (
                        <span className="text-xs text-muted-foreground">
                          {row.staffEmail}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatHours(row.totalHoursWorked)}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {formatHours(row.totalRegularHours)}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    {row.totalOvertimeHours > 0 ? (
                      <span className="text-amber-600 dark:text-amber-400">
                        {formatHours(row.totalOvertimeHours)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    {row.totalNightDifferentialHours > 0 ? (
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatHours(row.totalNightDifferentialHours)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.eodCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        row.approvedCount === row.eodCount
                          ? "default"
                          : "secondary"
                      }
                      className="ml-auto tabular-nums"
                    >
                      {row.approvedCount}/{row.eodCount}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-[260px] text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileSpreadsheet className="h-8 w-8 opacity-30" />
                    <p className="text-sm">No data for the selected period.</p>
                    <p className="text-xs">
                      Try a different period type or reference date.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page{" "}
            <span className="font-medium text-foreground">
              {pagination.page}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {pagination.totalPages}
            </span>{" "}
            &mdash; {pagination.totalCount}{" "}
            {pagination.totalCount === 1 ? "staff member" : "staff members"}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

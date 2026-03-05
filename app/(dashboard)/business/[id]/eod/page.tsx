"use client";

import { useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  FileText,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { type DateRange } from "react-day-picker";
import {
  useEodByBusiness,
  useReviewEod,
  useDeleteEod,
  useAdminEditEod,
} from "@/hooks/eod/useAdminEod";
import { useBusinessById } from "@/hooks/useBusiness";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import type { EodQuery, EodReport } from "@/types/eod.types";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ViewEodDialog } from "@/components/admin/eod/view-eod-modal";
import type { AdminEditEodRequest } from "@/types/eod.types";

export default function EodPage() {
  const params = useParams();
  const businessId = params.id as string;

  // Filter state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [approval, setApproval] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const limit = 20;

  // View/Edit modal state (combined into one dialog)
  const [viewReport, setViewReport] = useState<EodReport | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  // Build query params
  const queryParams: EodQuery = {
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status !== "all" && { status: status as EodQuery["status"] }),
    ...(approval !== "all" && { isApproved: approval }),
    ...(dateRange?.from && {
      startDate: dateRange.from.toISOString().split("T")[0],
    }),
    ...(dateRange?.to && {
      endDate: dateRange.to.toISOString().split("T")[0],
    }),
  };

  // Fetch data
  const { data: business, isLoading: isBusinessLoading } =
    useBusinessById(businessId);
  const {
    data: eodData,
    isLoading: isEodLoading,
    isError,
  } = useEodByBusiness(businessId, queryParams);

  // Mutations
  const reviewMutation = useReviewEod();
  const deleteMutation = useDeleteEod();
  const editMutation = useAdminEditEod();

  // Handlers
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value);
    setPage(1);
  }, []);

  const handleApprovalFilter = useCallback((value: string) => {
    setApproval(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleApprove = useCallback(
    (report: EodReport) => {
      reviewMutation.mutate({
        id: report._id,
        data: { status: "reviewed", isApproved: true },
      });
    },
    [reviewMutation],
  );

  const handleRevise = useCallback(
    (report: EodReport) => {
      reviewMutation.mutate({
        id: report._id,
        data: { status: "needs_revision" },
      });
    },
    [reviewMutation],
  );

  const handleView = useCallback((report: EodReport) => {
    setViewReport(report);
    setViewOpen(true);
  }, []);

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
    setPage(1);
  }, []);

  const handleEdit = useCallback((report: EodReport) => {
    setViewReport(report);
    setViewOpen(true);
  }, []);

  const handleEditSave = useCallback(
    (id: string, data: AdminEditEodRequest) => {
      editMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            setViewOpen(false);
            setViewReport(null);
          },
        },
      );
    },
    [editMutation],
  );

  const handleDelete = useCallback(
    (report: EodReport) => {
      deleteMutation.mutate(report._id);
    },
    [deleteMutation],
  );

  // Memoized columns with action callbacks
  const columns = useMemo(
    () =>
      getColumns({
        onApprove: handleApprove,
        onRevise: handleRevise,
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleApprove, handleRevise, handleView, handleEdit, handleDelete],
  );

  // Loading state
  if (isBusinessLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Error state
  if (isError || !business) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <FileText className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">
          Unable to Load EOD Reports
        </h3>
        <p className="mt-2 text-base text-muted-foreground">
          There was an error loading the EOD data. Please try again.
        </p>
      </div>
    );
  }

  const reports = eodData?.data || [];
  const pagination = eodData?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">EOD Reports</h1>
          <p className="text-sm text-muted-foreground">
            Review and manage end-of-day reports for {business.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pagination && (
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <span className="font-medium text-foreground">
                {pagination.totalCount}
              </span>
              <span>total reports</span>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={reports}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onApprovalFilter={handleApprovalFilter}
        searchValue={search}
        statusFilter={status}
        approvalFilter={approval}
        isLoading={isEodLoading}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRowClick={handleView}
      />

      {/* View / Edit EOD Dialog (combined) */}
      <ViewEodDialog
        report={viewReport}
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setViewReport(null);
        }}
        onApprove={handleApprove}
        onRevise={handleRevise}
        onEdit={handleEditSave}
        isEditPending={editMutation.isPending}
      />
    </div>
  );
}

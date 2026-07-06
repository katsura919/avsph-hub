"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Inbox, Loader2 } from "lucide-react";
import { startOfDay, endOfDay } from "date-fns";
import { type DateRange } from "react-day-picker";
import {
  useLeadsByBusiness,
  useUpdateLead,
  useDeleteLead,
  useLeadTags,
  useBulkLeads,
  useExportLeads,
} from "@/hooks/useLeads";
import { useBusinessById } from "@/hooks/useBusiness";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LeadDetailSheet } from "@/components/lead-detail-sheet";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { leadsToCsv, downloadCsv, slugify } from "./export-csv";
import type {
  Lead,
  LeadQueryParams,
  LeadFilterParams,
} from "@/types/leads.types";

export default function LeadsPage() {
  const params = useParams();
  const businessId = params.id as string;

  // Filter state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [tags, setTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selected lead for view/delete
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteLead, setDeleteLeadTarget] = useState<Lead | null>(null);

  // Shared filter params (list + export)
  const filterParams: LeadFilterParams = {
    ...(search && { search }),
    ...(status !== "all" && { status: status as LeadFilterParams["status"] }),
    ...(source !== "all" && { source: source as LeadFilterParams["source"] }),
    ...(tags.length > 0 && { tags }),
    ...(dateRange?.from && {
      dateFrom: startOfDay(dateRange.from).toISOString(),
      dateTo: endOfDay(dateRange.to ?? dateRange.from).toISOString(),
    }),
  };

  const queryParams: LeadQueryParams = {
    ...filterParams,
    page,
    limit: pageSize,
  };

  // Fetch data
  const { data: business, isLoading: isBusinessLoading } =
    useBusinessById(businessId);
  const {
    data: leadsData,
    isLoading: isLeadsLoading,
    isError,
  } = useLeadsByBusiness(businessId, queryParams);
  const { data: tagOptions = [] } = useLeadTags(businessId);

  const { mutate: updateLead } = useUpdateLead();
  const { mutate: deleteLeadMutation, isPending: isDeleting } = useDeleteLead();
  const { mutateAsync: bulkMutate } = useBulkLeads(businessId);
  const { mutateAsync: exportMutate, isPending: isExporting } =
    useExportLeads(businessId);

  // Filter handlers (all reset to page 1)
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value);
    setPage(1);
  }, []);

  const handleSourceFilter = useCallback((value: string) => {
    setSource(value);
    setPage(1);
  }, []);

  const handleTagFilter = useCallback((value: string[]) => {
    setTags(value);
    setPage(1);
  }, []);

  const handleDateRange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
    setPage(1);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleView = useCallback((lead: Lead) => {
    setViewLead(lead);
    setDetailOpen(true);
  }, []);

  const handleStatusChange = useCallback(
    (lead: Lead, newStatus: Lead["status"]) => {
      updateLead({ id: lead._id, data: { status: newStatus } });
    },
    [updateLead],
  );

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteLead) return;
    deleteLeadMutation(
      { id: deleteLead._id, businessId },
      { onSuccess: () => setDeleteLeadTarget(null) },
    );
  }, [deleteLead, deleteLeadMutation, businessId]);

  // Bulk handlers
  const handleBulkStatus = useCallback(
    (ids: string[], newStatus: string) =>
      bulkMutate({
        ids,
        action: "status",
        value: newStatus as Lead["status"],
      }),
    [bulkMutate],
  );

  const handleBulkAddTags = useCallback(
    (ids: string[], addTags: string[]) =>
      bulkMutate({ ids, action: "addTags", tags: addTags }),
    [bulkMutate],
  );

  const handleBulkRemoveTags = useCallback(
    (ids: string[], removeTags: string[]) =>
      bulkMutate({ ids, action: "removeTags", tags: removeTags }),
    [bulkMutate],
  );

  const handleBulkDelete = useCallback(
    (ids: string[]) => bulkMutate({ ids, action: "delete" }),
    [bulkMutate],
  );

  // Export handler
  const handleExport = useCallback(async () => {
    const result = await exportMutate(filterParams);
    if (!result.data.length) {
      const { toast } = await import("sonner");
      toast.info("No leads to export for the current filters.");
      return;
    }
    const csv = leadsToCsv(result.data);
    const filename = `leads-${slugify(business?.name ?? "business")}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    downloadCsv(filename, csv);
    if (result.truncated) {
      const { toast } = await import("sonner");
      toast.warning(
        `Export capped at ${result.data.length} rows. Narrow filters to export the rest.`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportMutate, filterParams, business?.name]);

  const columns = createColumns({
    onView: handleView,
    onDelete: setDeleteLeadTarget,
    onStatusChange: handleStatusChange,
  });

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
          <Inbox className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Unable to Load Leads</h3>
        <p className="mt-2 text-base text-muted-foreground">
          There was an error loading the leads data. Please try again.
        </p>
      </div>
    );
  }

  const leads = leadsData?.data || [];
  const pagination = leadsData?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">
            Leads captured from your website for {business.name}
          </p>
        </div>
        {pagination && (
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <span className="font-medium text-foreground">
              {pagination.total}
            </span>
            <span>total leads</span>
          </div>
        )}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={leads}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onRowClick={handleView}
        searchValue={search}
        isLoading={isLeadsLoading}
        statusFilter={status}
        onStatusFilter={handleStatusFilter}
        sourceFilter={source}
        onSourceFilter={handleSourceFilter}
        tagFilter={tags}
        onTagFilter={handleTagFilter}
        tagOptions={tagOptions}
        dateRange={dateRange}
        onDateRange={handleDateRange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        onExport={handleExport}
        isExporting={isExporting}
        onBulkStatus={handleBulkStatus}
        onBulkAddTags={handleBulkAddTags}
        onBulkRemoveTags={handleBulkRemoveTags}
        onBulkDelete={handleBulkDelete}
      />

      {/* Lead Detail Sheet */}
      <LeadDetailSheet
        lead={viewLead}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        tagOptions={tagOptions}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteLead}
        onOpenChange={(open) => !open && setDeleteLeadTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              {deleteLead &&
                (deleteLead.lastName
                  ? `${deleteLead.firstName} ${deleteLead.lastName}`
                  : deleteLead.firstName)}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

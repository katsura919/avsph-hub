"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileText, Loader2, CalendarRange, Zap } from "lucide-react";
import { useInvoicesByBusiness } from "@/hooks/invoice/useAdminInvoice";
import {
  useGenerateBusinessInvoices,
  useRecalculateInvoice,
  useApproveInvoice,
  useMarkInvoicePaid,
  useDeleteInvoice,
} from "@/hooks/invoice/useAdminInvoice";
import { useBusinessById } from "@/hooks/useBusiness";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import type { Invoice, InvoiceQuery } from "@/types/invoice.types";

// -- Helpers to get current and previous pay period boundaries --
function getCurrentPeriod() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  if (now.getDate() >= 16) {
    // 2nd half: 16th – end of month
    const lastDay = new Date(year, month + 1, 0).getDate();
    return {
      start: `${year}-${String(month + 1).padStart(2, "0")}-16`,
      end: `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`,
    };
  }
  // 1st half: 1st – 15th
  return {
    start: `${year}-${String(month + 1).padStart(2, "0")}-01`,
    end: `${year}-${String(month + 1).padStart(2, "0")}-15`,
  };
}

function getPreviousPeriod() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  if (now.getDate() >= 16) {
    // Previous = 1st half of same month
    return {
      start: `${year}-${String(month + 1).padStart(2, "0")}-01`,
      end: `${year}-${String(month + 1).padStart(2, "0")}-15`,
    };
  }
  // Previous = 2nd half of last month
  const prevDate = new Date(year, month, 0); // last day of prev month
  const prevYear = prevDate.getFullYear();
  const prevMonth = prevDate.getMonth();
  const lastDay = prevDate.getDate();
  return {
    start: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-16`,
    end: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${lastDay}`,
  };
}

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const businessId = params.id as string;

  // Filter state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 20;

  // Dialog state
  const [generateOpen, setGenerateOpen] = useState(false);
  const [periodStart, setPeriodStart] = useState(getPreviousPeriod().start);
  const [periodEnd, setPeriodEnd] = useState(getPreviousPeriod().end);
  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null);

  // Build query params
  const queryParams: InvoiceQuery = {
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status !== "all" && {
      status: status as InvoiceQuery["status"],
    }),
  };

  // Fetch data
  const { data: business, isLoading: isBusinessLoading } =
    useBusinessById(businessId);
  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    isError,
  } = useInvoicesByBusiness(businessId, queryParams);

  // Mutations
  const generateMutation = useGenerateBusinessInvoices();
  const recalculateMutation = useRecalculateInvoice();
  const approveMutation = useApproveInvoice();
  const markPaidMutation = useMarkInvoicePaid();
  const deleteMutation = useDeleteInvoice();

  // Handlers
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((value: string) => {
    setStatus(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowClick = useCallback(
    (invoice: Invoice) => {
      router.push(`/business/${businessId}/invoice/${invoice._id}`);
    },
    [router, businessId],
  );

  const handleGenerate = useCallback(() => {
    generateMutation.mutate(
      {
        businessId,
        data: { periodStart, periodEnd },
      },
      { onSuccess: () => setGenerateOpen(false) },
    );
  }, [generateMutation, businessId, periodStart, periodEnd]);

  const handleRecalculate = useCallback(
    (invoice: Invoice) => {
      recalculateMutation.mutate(invoice._id);
    },
    [recalculateMutation],
  );

  const handleApprove = useCallback(
    (invoice: Invoice) => {
      approveMutation.mutate({ id: invoice._id });
    },
    [approveMutation],
  );

  const handleMarkPaid = useCallback(
    (invoice: Invoice) => {
      markPaidMutation.mutate(invoice._id);
    },
    [markPaidMutation],
  );

  const handleDelete = useCallback((invoice: Invoice) => {
    setDeleteTarget(invoice);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget._id, {
        onSuccess: () => setDeleteTarget(null),
      });
    }
  }, [deleteMutation, deleteTarget]);

  // Quick period selectors
  const applyCurrentPeriod = () => {
    const p = getCurrentPeriod();
    setPeriodStart(p.start);
    setPeriodEnd(p.end);
  };

  const applyPreviousPeriod = () => {
    const p = getPreviousPeriod();
    setPeriodStart(p.start);
    setPeriodEnd(p.end);
  };

  const columns = createColumns({
    onView: handleRowClick,
    onRecalculate: handleRecalculate,
    onApprove: handleApprove,
    onMarkPaid: handleMarkPaid,
    onDelete: handleDelete,
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
          <FileText className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Unable to Load Invoices</h3>
        <p className="mt-2 text-base text-muted-foreground">
          There was an error loading the invoice data. Please try again.
        </p>
      </div>
    );
  }

  const invoices = invoiceData?.data || [];
  const pagination = invoiceData?.pagination;
  console.log("Fetched invoices:", invoices);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Manage payroll invoices for {business.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pagination && (
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <span className="font-medium text-foreground">
                {pagination.totalCount}
              </span>
              <span>total invoices</span>
            </div>
          )}
          <Button className="gap-2" onClick={() => setGenerateOpen(true)}>
            <Zap className="h-4 w-4" />
            Generate Invoices
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={invoices}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onRowClick={handleRowClick}
        searchValue={search}
        statusFilter={status}
        isLoading={isInvoiceLoading}
      />

      {/* Generate Invoices Dialog */}
      <Dialog open={generateOpen} onOpenChange={setGenerateOpen}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle>Generate Invoices</DialogTitle>
            <DialogDescription>
              Batch generate draft invoices for all hourly staff in this
              business for a specific pay period.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Quick period buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={applyPreviousPeriod}
              >
                <CalendarRange className="h-3.5 w-3.5" />
                Previous Period
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={applyCurrentPeriod}
              >
                <CalendarRange className="h-3.5 w-3.5" />
                Current Period
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="periodStart">Period Start</Label>
                <Input
                  id="periodStart"
                  type="date"
                  value={periodStart}
                  onChange={(e) => setPeriodStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="periodEnd">Period End</Label>
                <Input
                  id="periodEnd"
                  type="date"
                  value={periodEnd}
                  onChange={(e) => setPeriodEnd(e.target.value)}
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Invoices will be generated for all active hourly staff. Existing
              invoices for the same period will be skipped automatically.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setGenerateOpen(false)}
              disabled={generateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={
                generateMutation.isPending || !periodStart || !periodEnd
              }
              className="gap-2"
            >
              {generateMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this invoice
              {deleteTarget?.staffName ? ` for ${deleteTarget.staffName}` : ""}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

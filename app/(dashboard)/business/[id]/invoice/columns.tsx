"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  RefreshCw,
  CheckCircle2,
  DollarSign,
  Copy,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Invoice } from "@/types/invoice.types";
import { toast } from "sonner";

interface ColumnOptions {
  onView: (invoice: Invoice) => void;
  onRecalculate?: (invoice: Invoice) => void;
  onApprove?: (invoice: Invoice) => void;
  onMarkPaid?: (invoice: Invoice) => void;
  onDelete?: (invoice: Invoice) => void;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  },
  calculated: {
    label: "Calculated",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  paid: {
    label: "Paid",
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
};

const salaryTypeConfig: Record<string, string> = {
  hourly: "Hourly",
  daily: "Daily",
  monthly: "Monthly",
  annual: "Annual",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatPeriod(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const yearOpts: Intl.DateTimeFormatOptions = {
    ...opts,
    year: "numeric",
  };

  if (s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", yearOpts)}`;
  }
  return `${s.toLocaleDateString("en-US", yearOpts)} – ${e.toLocaleDateString("en-US", yearOpts)}`;
}

export const createColumns = ({
  onView,
  onRecalculate,
  onApprove,
  onMarkPaid,
  onDelete,
}: ColumnOptions): ColumnDef<Invoice>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "staffName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 h-8 data-[state=open]:bg-accent"
      >
        Staff
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {invoice.staffName || "Unknown Staff"}
          </span>
          <span className="text-xs text-muted-foreground">
            {invoice.staffPosition || "—"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "periodStart",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 h-8 data-[state=open]:bg-accent"
      >
        Period
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const invoice = row.original;
      return (
        <span className="text-sm">
          {formatPeriod(invoice.periodStart, invoice.periodEnd)}
        </span>
      );
    },
  },
  {
    accessorKey: "salaryType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("salaryType") as string;
      return (
        <span className="text-sm text-muted-foreground">
          {salaryTypeConfig[type] || type}
        </span>
      );
    },
  },
  {
    accessorKey: "eodCount",
    header: "EODs",
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">{row.getValue("eodCount")}</span>
    ),
  },
  {
    accessorKey: "totalHoursWorked",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 h-8 data-[state=open]:bg-accent"
      >
        Hours
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">
        {(row.getValue("totalHoursWorked") as number).toFixed(1)}h
      </span>
    ),
  },
  {
    accessorKey: "calculatedPay",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 h-8 data-[state=open]:bg-accent"
      >
        Gross Pay
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">
        {formatCurrency(row.getValue("calculatedPay") as number)}
      </span>
    ),
  },
  {
    accessorKey: "netPay",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4 h-8 data-[state=open]:bg-accent"
      >
        Net Pay
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const netPay = row.getValue("netPay") as number;
      return (
        <span className="text-sm font-medium tabular-nums">
          {formatCurrency(netPay)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config = statusConfig[status] || statusConfig.draft;
      return (
        <Badge variant="outline" className={`font-normal ${config.className}`}>
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;
      const isDraftOrCalculated =
        invoice.status === "draft" || invoice.status === "calculated";

      return (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(invoice._id);
                  toast.success("Invoice ID copied");
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onView(invoice)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>

              {isDraftOrCalculated && onRecalculate && (
                <DropdownMenuItem onClick={() => onRecalculate(invoice)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recalculate
                </DropdownMenuItem>
              )}

              {isDraftOrCalculated && onApprove && (
                <DropdownMenuItem onClick={() => onApprove(invoice)}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve
                </DropdownMenuItem>
              )}

              {invoice.status === "approved" && onMarkPaid && (
                <DropdownMenuItem onClick={() => onMarkPaid(invoice)}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Mark as Paid
                </DropdownMenuItem>
              )}

              {isDraftOrCalculated && onDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete(invoice)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

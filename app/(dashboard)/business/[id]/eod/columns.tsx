"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Copy,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Building2,
  Home,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { EodReport } from "@/types/eod.types";
import { toast } from "sonner";

const statusConfig = {
  submitted: {
    label: "Submitted",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  needs_revision: {
    label: "Needs Revision",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
};

const approvalConfig = {
  true: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  false: {
    label: "Pending",
    className: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  },
};

interface ColumnOptions {
  onApprove?: (report: EodReport) => void;
  onRevise?: (report: EodReport) => void;
  onView?: (report: EodReport) => void;
  onEdit?: (report: EodReport) => void;
  onDelete?: (report: EodReport) => void;
}

export function getColumns(
  options: ColumnOptions = {},
): ColumnDef<EodReport>[] {
  return [
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
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
          className="translate-y-[2px]"
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
        const report = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {report.staffName || "Unknown"}
            </span>
            <span className="text-xs text-muted-foreground">
              {report.staffEmail || report.staffId}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return (
          <span className="text-sm text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "hoursWorked",
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
      cell: ({ row }) => {
        const hours = row.getValue("hoursWorked") as number;
        return <span className="text-sm font-medium">{hours}h</span>;
      },
    },
    {
      id: "hoursBreakdown",
      header: "Regular / OT / Night",
      cell: ({ row }) => {
        const report = row.original;
        const regular = report.regularHoursWorked ?? report.hoursWorked;
        const overtime = report.overtimeHoursWorked ?? 0;
        const night = report.nightDifferentialHours ?? 0;
        return (
          <span className="text-sm text-muted-foreground">
            {regular}h / {overtime}h / {night}h
          </span>
        );
      },
    },
    {
      accessorKey: "onSite",
      header: "Location",
      cell: ({ row }) => {
        const onSite = row.original.onSite;
        if (onSite === true) {
          return (
            <Badge
              variant="outline"
              className="font-normal bg-violet-500/10 text-violet-600 border-violet-500/20 gap-1"
            >
              <Building2 className="h-3 w-3" />
              On-Site
            </Badge>
          );
        }
        if (onSite === false) {
          return (
            <Badge
              variant="outline"
              className="font-normal bg-sky-500/10 text-sky-600 border-sky-500/20 gap-1"
            >
              <Home className="h-3 w-3" />
              Remote
            </Badge>
          );
        }
        return <span className="text-xs text-muted-foreground">—</span>;
      },
    },
    {
      accessorKey: "tasksCompleted",
      header: "Tasks",
      cell: ({ row }) => {
        const tasks = row.getValue("tasksCompleted") as string;
        const truncated = tasks.length > 60 ? tasks.slice(0, 60) + "…" : tasks;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-muted-foreground cursor-default max-w-[250px] block truncate">
                  {truncated}
                </span>
              </TooltipTrigger>
              {tasks.length > 60 && (
                <TooltipContent side="bottom" className="max-w-[400px]">
                  <p className="text-sm whitespace-pre-wrap">{tasks}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusConfig;
        const config = statusConfig[status];
        return (
          <Badge
            variant="outline"
            className={`font-normal ${config?.className}`}
          >
            {config?.label || status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "isApproved",
      header: "Approval",
      cell: ({ row }) => {
        const isApproved = row.getValue("isApproved") as boolean;
        const key = String(isApproved) as keyof typeof approvalConfig;
        const config = approvalConfig[key];
        return (
          <Badge
            variant="outline"
            className={`font-normal ${config.className}`}
          >
            {config.label}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(String(row.getValue(id)));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original;
        const isSubmitted = report.status === "submitted";

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 data-[state=open]:bg-muted"
                onClick={(e) => e.stopPropagation()}
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
                  navigator.clipboard.writeText(report._id);
                  toast.success("Report ID copied to clipboard");
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => options.onView?.(report)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => options.onEdit?.(report)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {isSubmitted && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => options.onApprove?.(report)}
                    className="text-emerald-600 focus:text-emerald-600"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => options.onRevise?.(report)}
                    className="text-amber-600 focus:text-amber-600"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Request Revision
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => options.onDelete?.(report)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

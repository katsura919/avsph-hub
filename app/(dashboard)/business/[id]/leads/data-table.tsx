"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
  Inbox,
  Loader2,
  Download,
  SlidersHorizontal,
  Tag as TagIcon,
  Trash2,
} from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { LeadTagMultiselect } from "@/components/lead-tag-multiselect";
import type { PaginationInfo } from "@/types/leads.types";

const PAGE_SIZES = [10, 25, 50, 100];

// Friendly labels for hideable columns in the "Columns" menu
const COLUMN_LABELS: Record<string, string> = {
  name: "Name",
  tags: "Tags",
  source: "Source",
  status: "Status",
  company: "Company",
  createdAt: "Created",
};

interface DataTableProps<TData extends { _id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onSearch?: (search: string) => void;
  onRowClick?: (row: TData) => void;
  searchValue?: string;
  isLoading?: boolean;
  // Filters
  statusFilter?: string;
  onStatusFilter?: (status: string) => void;
  sourceFilter?: string;
  onSourceFilter?: (source: string) => void;
  tagFilter?: string[];
  onTagFilter?: (tags: string[]) => void;
  tagOptions?: string[];
  dateRange?: DateRange;
  onDateRange?: (range: DateRange | undefined) => void;
  // Page size
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  // Export
  onExport?: () => void;
  isExporting?: boolean;
  // Bulk actions (operate on selected row ids)
  onBulkStatus?: (ids: string[], status: string) => void | Promise<unknown>;
  onBulkAddTags?: (ids: string[], tags: string[]) => void | Promise<unknown>;
  onBulkRemoveTags?: (ids: string[], tags: string[]) => void | Promise<unknown>;
  onBulkDelete?: (ids: string[]) => void | Promise<unknown>;
}

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
];

export function DataTable<TData extends { _id: string }, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  onSearch,
  onRowClick,
  searchValue = "",
  isLoading = false,
  statusFilter = "all",
  onStatusFilter,
  sourceFilter = "all",
  onSourceFilter,
  tagFilter = [],
  onTagFilter,
  tagOptions = [],
  dateRange,
  onDateRange,
  pageSize = 10,
  onPageSizeChange,
  onExport,
  isExporting = false,
  onBulkStatus,
  onBulkAddTags,
  onBulkRemoveTags,
  onBulkDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [localSearch, setLocalSearch] = React.useState(searchValue);

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearch]);

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row._id,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: pagination?.totalPages ?? -1,
  });

  // Clear selection whenever the visible page of data changes (server-paginated)
  React.useEffect(() => {
    table.resetRowSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedIds = selectedRows.map((r) => r.original._id);
  const selectedCount = selectedIds.length;

  const hasFilters =
    localSearch ||
    statusFilter !== "all" ||
    sourceFilter !== "all" ||
    tagFilter.length > 0 ||
    !!dateRange?.from;

  const clearFilters = () => {
    setLocalSearch("");
    onSearch?.("");
    onStatusFilter?.("all");
    onSourceFilter?.("all");
    onTagFilter?.([]);
    onDateRange?.(undefined);
  };

  const hideableColumns = table
    .getAllColumns()
    .filter((c) => c.getCanHide());

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="h-9 pl-9 bg-background"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={onStatusFilter}>
            <SelectTrigger className="h-9 w-[130px] bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Source Filter */}
          <Select value={sourceFilter} onValueChange={onSourceFilter}>
            <SelectTrigger className="h-9 w-[140px] bg-background">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="contact_form">Contact Form</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Tag Filter */}
          <LeadTagMultiselect
            options={tagOptions}
            selected={tagFilter}
            onChange={(tags) => onTagFilter?.(tags)}
            triggerLabel="Tags"
            className="bg-background"
          />

          {/* Date Range Filter */}
          <DatePickerWithRange
            value={dateRange}
            onChange={onDateRange}
            placeholder="Date range"
            numberOfMonths={2}
            className="bg-background"
          />

          {/* Clear Filters */}
          {hasFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-9 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}

          {/* Right-aligned: columns + export */}
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Columns</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hideableColumns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {COLUMN_LABELS[column.id] ?? column.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="h-9 gap-2"
              onClick={onExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Bulk action bar */}
        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
            <span className="text-sm font-medium">
              {selectedCount} selected
            </span>
            <div className="h-4 w-px bg-border" />

            {/* Bulk status */}
            <Select
              onValueChange={(value) => onBulkStatus?.(selectedIds, value)}
            >
              <SelectTrigger className="h-8 w-[150px] bg-background">
                <SelectValue placeholder="Set status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Bulk add tags */}
            <BulkTagAction
              label="Add tags"
              options={tagOptions}
              allowCreate
              onApply={(tags) => onBulkAddTags?.(selectedIds, tags)}
            />

            {/* Bulk remove tags */}
            <BulkTagAction
              label="Remove tags"
              options={tagOptions}
              onApply={(tags) => onBulkRemoveTags?.(selectedIds, tags)}
            />

            {/* Bulk delete */}
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 text-destructive hover:text-destructive"
              onClick={() => onBulkDelete?.(selectedIds)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => table.resetRowSelection()}
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 bg-muted/50 text-xs font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[400px] text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Loading leads...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`group${onRowClick ? " cursor-pointer" : ""}`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[400px] text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Inbox className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">No leads found</p>
                      <p className="text-xs text-muted-foreground">
                        {hasFilters
                          ? "Try adjusting your search or filters"
                          : "Leads submitted through your site will show up here"}
                      </p>
                    </div>
                    {hasFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        className="mt-2"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Showing{" "}
              {Math.min(
                (pagination.page - 1) * pagination.limit + 1,
                pagination.total,
              )}{" "}
              to {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} results
            </span>
            {/* Page size */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Rows</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(v) => onPageSizeChange?.(Number(v))}
              >
                <SelectTrigger className="h-8 w-[70px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZES.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange?.(1)}
                disabled={pagination.page <= 1}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange?.(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onPageChange?.(pagination.page + 1)}
                disabled={!pagination.hasMore}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange?.(pagination.totalPages)}
                disabled={!pagination.hasMore}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Popover that stages a set of tags then applies them as a bulk add/remove
function BulkTagAction({
  label,
  options,
  allowCreate = false,
  onApply,
}: {
  label: string;
  options: string[];
  allowCreate?: boolean;
  onApply: (tags: string[]) => void | Promise<unknown>;
}) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<string[]>([]);

  const apply = () => {
    if (pending.length === 0) return;
    onApply(pending);
    setPending([]);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setPending([]);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <TagIcon className="h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] space-y-2 p-2" align="start">
        <LeadTagMultiselect
          options={options}
          selected={pending}
          onChange={setPending}
          allowCreate={allowCreate}
          triggerLabel="Choose tags"
          className="w-full bg-background"
        />
        <Button
          size="sm"
          className="w-full"
          disabled={pending.length === 0}
          onClick={apply}
        >
          {label}
          {pending.length > 0 ? ` (${pending.length})` : ""}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

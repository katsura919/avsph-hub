"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { type DateRange } from "react-day-picker";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Loader2,
  Pencil,
  Plus,
  UserMinus,
  Trash2,
  Clock,
  Wallet,
  Users,
  Gauge,
  Download,
  Printer,
  FileDown,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import {
  useClientById,
  useClientStaff,
  useClientWeeklyReport,
  useDeleteClient,
} from "@/hooks/useClient";
import { useUpdateStaff } from "@/hooks/useStaff";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreateClientDialog } from "@/components/create-client-dialog";
import { AssignStaffDialog } from "@/components/assign-staff-dialog";
import { ClientReportPDFDocument } from "@/components/client/ClientReportPDFDocument";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => null },
);

/** ISO date (YYYY-MM-DD) from a Date using its local Y/M/D. */
function isoOf(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Monday–Sunday range of the current week (local). */
function currentWeekRange(): DateRange {
  const now = new Date();
  const dow = now.getDay(); // 0 = Sun
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { from: monday, to: sunday };
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00.000Z`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function money(value: number, currency: string): string {
  if (currency === "USD") {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
  return `${currency} ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const businessId = params.id as string;
  const clientId = params.clientId as string;

  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(() =>
    currentWeekRange(),
  );

  const { data: client, isLoading: isClientLoading } = useClientById(clientId);
  // Roster is still fetched so the table has data (and an accurate count)
  // before/independently of the period report resolving.
  const { data: assignedStaff } = useClientStaff(clientId);
  const { mutate: updateStaff, isPending: isUnassigning } = useUpdateStaff();
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();

  /** Anything that changes the roster or a bill rate invalidates the report. */
  const refreshClientData = () =>
    queryClient.invalidateQueries({ queryKey: ["clients"] });

  const reportRange = useMemo(
    () =>
      range?.from && range?.to
        ? { from: isoOf(range.from), to: isoOf(range.to) }
        : range?.from
          ? { from: isoOf(range.from), to: isoOf(range.from) }
          : undefined,
    [range],
  );

  const {
    data: report,
    isLoading: isReportLoading,
    isFetching: isReportFetching,
  } = useClientWeeklyReport(clientId, reportRange);
  const rows = report?.staff ?? [];

  const handleUnassign = (staffId: string) => {
    updateStaff(
      { id: staffId, data: { clientId: "" } },
      { onSuccess: () => refreshClientData() },
    );
  };

  const handleDelete = () => {
    deleteClient(clientId, {
      onSuccess: () => router.push(`/business/${businessId}/clients`),
    });
  };

  const handleExportCsv = useMemo(
    () => () => {
      if (!report) return;
      const header = [
        "Staff",
        "Position",
        "Bill Rate (USD/hr)",
        "Hours",
        "Days Worked",
        "Client Pays (USD)",
        "Margin (USD)",
      ];
      const lines = report.staff.map((s) =>
        [
          s.name,
          s.position,
          s.hasBillRate ? s.billRateUsd : "",
          s.totalHours,
          s.daysWorked,
          s.billableUsd,
          s.marginUsd ?? "",
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      );
      const csv = [header.join(","), ...lines].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${report.client.name}_${report.periodStart}_${report.periodEnd}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [report],
  );

  if (isClientLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <Building2 className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold">Client not found</h3>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(`/business/${businessId}/clients`)}
        >
          Back to Clients
        </Button>
      </div>
    );
  }

  const detailRows: Array<{ icon: typeof Mail; label: string; value?: string }> =
    [
      { icon: Building2, label: "Company", value: client.companyName },
      { icon: User, label: "Contact Person", value: client.contactPerson },
      { icon: Mail, label: "Email", value: client.email },
      { icon: Phone, label: "Phone", value: client.phone },
      { icon: Globe, label: "Website", value: client.website },
      { icon: MapPin, label: "Address", value: client.address },
    ].filter((r) => r.value);

  const hasProfileInfo =
    detailRows.length > 0 ||
    (client.tags && client.tags.length > 0) ||
    !!client.notes ||
    !!client.billingInfo;

  const nativeCurrency = report?.currency ?? "PHP";
  const staffCount = report?.totals.staffCount ?? assignedStaff?.length ?? 0;
  const totalHours = report?.totals.totalHours ?? 0;

  // Header meta chips (only the ones we actually have)
  const metaChips: string[] = [
    client.companyName || "",
    client.email || "",
    client.phone || "",
  ].filter(Boolean);

  // Bill rate lookup by staff id, so an unsaved roster still renders an editor.
  const billRateByStaffId = new Map<string, number | undefined>(
    (assignedStaff ?? []).map((s) => [s._id, s.billRateUsd]),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:hidden">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="mt-0.5"
            onClick={() => router.push(`/business/${businessId}/clients`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {client.name}
                </h1>
                <Badge
                  variant={client.status === "active" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {client.status}
                </Badge>
              </div>
              {metaChips.length > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {metaChips.join(" · ")}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No contact details yet
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2" onClick={() => setAssignOpen(true)}>
            <Plus className="h-4 w-4" />
            Assign Staff
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this client?</AlertDialogTitle>
                <AlertDialogDescription>
                  {client.name} will be removed. Assigned staff keep their
                  records but will no longer be grouped under this client.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Period bar */}
      <div className="flex flex-wrap items-center gap-2 print:hidden">
        <DatePickerWithRange
          value={range}
          onChange={setRange}
          numberOfMonths={2}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRange(currentWeekRange())}
        >
          This week
        </Button>
        <span className="text-sm text-muted-foreground">
          {report
            ? `${formatDate(report.periodStart)} – ${formatDate(report.periodEnd)}`
            : "—"}
        </span>
        {isReportFetching && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleExportCsv}
            disabled={!report || rows.length === 0}
          >
            <Download className="h-4 w-4" />
            CSV
          </Button>
          {report && rows.length > 0 ? (
            <PDFDownloadLink
              document={<ClientReportPDFDocument report={report} />}
              fileName={`report_${report.client.name}_${report.periodStart}_${report.periodEnd}.pdf`}
            >
              {/* @ts-ignore react-pdf render-prop children */}
              {({ loading }: { loading: boolean }) => (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4" />
                  )}
                  PDF
                </Button>
              )}
            </PDFDownloadLink>
          ) : (
            <Button variant="outline" size="sm" className="gap-1.5" disabled>
              <FileDown className="h-4 w-4" />
              PDF
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => window.print()}
            disabled={!report}
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* KPI stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Assigned Staff"
          value={String(staffCount)}
        />
        <StatCard
          icon={Clock}
          label="Total Hours"
          value={totalHours.toLocaleString()}
          sub="in selected period"
        />
        <StatCard
          icon={Wallet}
          label="Client Pays (USD)"
          value={report ? money(report.totals.totalBillableUsd, "USD") : "—"}
          sub="billed to client"
        />
        <StatCard
          icon={Gauge}
          label="Margin (USD)"
          value={
            report && report.totals.totalMarginUsd != null
              ? money(report.totals.totalMarginUsd, "USD")
              : "—"
          }
          sub={
            report && report.totals.totalMarginUsd == null
              ? "needs USD rate"
              : "after staff cost"
          }
        />
      </div>

      {/* Notices */}
      {report && report.totals.missingBillRateCount > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400 print:hidden">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {report.totals.missingBillRateCount} staff have no bill rate set and
            are billing $0: {report.missingBillRateStaff.join(", ")}. Set their
            rate in the table below.
          </span>
        </div>
      )}
      {report && !report.usdConversionAvailable && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400 print:hidden">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            No USD exchange rate is configured, so margin is unavailable. Set a
            USD → PHP rate under Compensation › Exchange Rates. Staff cost is in{" "}
            {nativeCurrency}.
          </span>
        </div>
      )}

      {/* Staff & billing — the roster and the period report are the same set of
          people, so they live in one table: rate/assignment on the left,
          period-scoped numbers on the right. */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Staff &amp; Billing</CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => setAssignOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Assign Staff
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 bg-muted/50 text-xs">
                    Staff
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-xs">
                    Position
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-xs">
                    Bill Rate (USD/hr)
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-right text-xs">
                    Hours
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-right text-xs">
                    Days
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-right text-xs">
                    Client Pays
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-right text-xs">
                    Margin
                  </TableHead>
                  <TableHead className="h-11 bg-muted/50 text-right text-xs print:hidden">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isReportLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-[240px] text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-[240px] text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">
                          No staff assigned yet
                        </p>
                        <p className="max-w-sm text-xs text-muted-foreground">
                          Assign staff to {client.name}, set their bill rate,
                          and their approved hours will roll up here.
                        </p>
                        <Button
                          size="sm"
                          className="mt-1 gap-1.5"
                          onClick={() => setAssignOpen(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Assign Staff
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((s) => (
                    <TableRow key={s.staffId}>
                      <TableCell className="py-2.5 font-medium">
                        {s.name}
                      </TableCell>
                      <TableCell className="py-2.5 text-sm text-muted-foreground">
                        {s.position || "—"}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <BillRateInput
                          staffId={s.staffId}
                          billRateUsd={
                            billRateByStaffId.has(s.staffId)
                              ? billRateByStaffId.get(s.staffId)
                              : s.hasBillRate
                                ? s.billRateUsd
                                : undefined
                          }
                          onSaved={refreshClientData}
                        />
                      </TableCell>
                      <TableCell className="py-2.5 text-right">
                        {s.totalHours.toLocaleString()}
                      </TableCell>
                      <TableCell className="py-2.5 text-right">
                        {s.daysWorked}
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-semibold">
                        {money(s.billableUsd, "USD")}
                      </TableCell>
                      <TableCell className="py-2.5 text-right">
                        {s.marginUsd == null ? (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        ) : (
                          <span
                            className={
                              s.marginUsd < 0
                                ? "font-medium text-destructive"
                                : "font-medium text-success"
                            }
                          >
                            {money(s.marginUsd, "USD")}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-2.5 text-right print:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-muted-foreground hover:text-destructive"
                          onClick={() => handleUnassign(s.staffId)}
                          disabled={isUnassigning}
                        >
                          <UserMinus className="h-3.5 w-3.5" />
                          Unassign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              {rows.length > 0 && report && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {report.totals.totalHours.toLocaleString()}
                    </TableCell>
                    <TableCell />
                    <TableCell className="text-right font-semibold">
                      {money(report.totals.totalBillableUsd, "USD")}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {report.totals.totalMarginUsd != null
                        ? money(report.totals.totalMarginUsd, "USD")
                        : "—"}
                    </TableCell>
                    <TableCell className="print:hidden" />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Client details — collapsed by default; the header carries the fields
          people actually scan, and Edit opens the full form. */}
      <Collapsible className="print:hidden">
        <Card className="shadow-sm">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="group flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">Client Details</span>
                {!hasProfileInfo && (
                  <Badge variant="outline" className="text-[10px]">
                    empty
                  </Badge>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t px-6 py-5">
              {!hasProfileInfo ? (
                <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                  <p className="text-sm font-medium">No client details yet</p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    Add contact info, billing details, tags, and notes so your
                    team has everything about {client.name} in one place.
                  </p>
                  <Button
                    size="sm"
                    className="mt-1 gap-1.5"
                    onClick={() => setEditOpen(true)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Add Details
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {detailRows.length > 0 && (
                    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                      {detailRows.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="flex min-w-0 flex-col">
                            <span className="text-xs text-muted-foreground">
                              {row.label}
                            </span>
                            <span className="break-words">{row.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {client.tags && client.tags.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs text-muted-foreground">
                        Tags
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {client.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {client.billingInfo && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        Billing Info
                      </span>
                      <p className="whitespace-pre-wrap text-sm">
                        {client.billingInfo}
                      </p>
                    </div>
                  )}

                  {client.notes && (
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        Notes
                      </span>
                      <p className="whitespace-pre-wrap text-sm">
                        {client.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <CreateClientDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        businessId={businessId}
        client={client}
      />
      <AssignStaffDialog
        open={assignOpen}
        onOpenChange={setAssignOpen}
        businessId={businessId}
        clientId={clientId}
        clientName={client.name}
        onAssigned={refreshClientData}
      />
    </div>
  );
}

/**
 * Inline editor for a staff member's client bill rate (USD/hr).
 * Commits on blur or Enter, and only when the value actually changed.
 */
function BillRateInput({
  staffId,
  billRateUsd,
  onSaved,
}: {
  staffId: string;
  billRateUsd?: number;
  onSaved?: () => void;
}) {
  const { mutate: updateStaff, isPending } = useUpdateStaff();
  const initial = typeof billRateUsd === "number" ? String(billRateUsd) : "";
  const [value, setValue] = useState(initial);

  // Re-sync when the server value changes (e.g. after a refetch).
  useEffect(() => {
    setValue(typeof billRateUsd === "number" ? String(billRateUsd) : "");
  }, [billRateUsd]);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed === initial.trim()) return;
    const parsed = trimmed === "" ? 0 : Number(trimmed);
    if (!Number.isFinite(parsed) || parsed < 0) {
      setValue(initial);
      return;
    }
    updateStaff(
      { id: staffId, data: { billRateUsd: parsed } },
      { onSuccess: () => onSaved?.() },
    );
  };

  return (
    <div className="relative w-[120px]">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        $
      </span>
      <Input
        type="number"
        min="0"
        step="0.01"
        placeholder="0.00"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        disabled={isPending}
        className="h-8 pl-5 pr-2 text-sm"
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card className="gap-0 py-4 shadow-sm">
      <CardContent className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-1.5">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-bold tabular-nums leading-none">
            {value}
          </p>
          {sub && (
            <p className="truncate text-xs text-muted-foreground">{sub}</p>
          )}
        </div>
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      </CardContent>
    </Card>
  );
}

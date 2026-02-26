"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  FileText,
  RefreshCw,
  CheckCircle2,
  DollarSign,
  Clock,
  Calendar,
  User,
  Mail,
  Briefcase,
  ClipboardList,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
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
import {
  useInvoiceById,
  useRecalculateInvoice,
  useApproveInvoice,
  useMarkInvoicePaid,
} from "@/hooks/invoice/useAdminInvoice";

// ============ Helpers ============

const statusConfig: Record<
  string,
  { label: string; className: string; icon: React.ReactNode }
> = {
  draft: {
    label: "Draft",
    className: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    icon: <FileText className="h-3.5 w-3.5" />,
  },
  calculated: {
    label: "Calculated",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: <ClipboardList className="h-3.5 w-3.5" />,
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: <BadgeCheck className="h-3.5 w-3.5" />,
  },
  paid: {
    label: "Paid",
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: <DollarSign className="h-3.5 w-3.5" />,
  },
};

function fmt(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function fmtDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtPeriod(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const yearOpts: Intl.DateTimeFormatOptions = {
    ...opts,
    year: "numeric",
  };
  if (s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", yearOpts)}`;
  }
  return `${s.toLocaleDateString("en-US", yearOpts)} – ${e.toLocaleDateString("en-US", yearOpts)}`;
}

const salaryTypeLabels: Record<string, string> = {
  hourly: "Hourly",
  daily: "Daily",
  monthly: "Monthly",
  annual: "Annual",
};

// ============ Page ============

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const businessId = params.id as string;
  const invoiceId = params.invoiceId as string;

  const { data: invoice, isLoading, isError } = useInvoiceById(invoiceId);
  const recalculateMutation = useRecalculateInvoice();
  const approveMutation = useApproveInvoice();
  const markPaidMutation = useMarkInvoicePaid();

  const isDraftOrCalculated =
    invoice?.status === "draft" || invoice?.status === "calculated";

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Error / Not Found
  if (isError || !invoice) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <FileText className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Invoice Not Found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The invoice could not be loaded.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(`/business/${businessId}/invoice`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Invoices
        </Button>
      </div>
    );
  }

  const status = statusConfig[invoice.status] || statusConfig.draft;
  const staffFullName =
    invoice.staffName ||
    (invoice.staff
      ? `${invoice.staff.firstName} ${invoice.staff.lastName}`
      : "Unknown Staff");
  const staffEmail = invoice.staffEmail || invoice.staff?.email || "—";
  const staffPosition = invoice.staffPosition || invoice.staff?.position || "—";

  const totalDeductions = invoice.deductions.reduce(
    (sum, d) => sum + d.amount,
    0,
  );
  const totalAdditions = invoice.additions.reduce(
    (sum, a) => sum + a.amount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/business/${businessId}/invoice`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Invoice Details
            </h1>
            <p className="text-sm text-muted-foreground">
              {fmtPeriod(invoice.periodStart, invoice.periodEnd)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDraftOrCalculated && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={recalculateMutation.isPending}
              onClick={() => recalculateMutation.mutate(invoice._id)}
            >
              {recalculateMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Recalculate
            </Button>
          )}
          {isDraftOrCalculated && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Approve Invoice</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will approve the invoice for {staffFullName} with a net
                    pay of {fmt(invoice.netPay)}. The invoice will become
                    visible to the staff member.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={approveMutation.isPending}
                    onClick={() => approveMutation.mutate({ id: invoice._id })}
                  >
                    {approveMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Approve
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {invoice.status === "approved" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  Mark as Paid
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Mark as Paid</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confirm that {fmt(invoice.netPay)} has been paid to{" "}
                    {staffFullName}. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={markPaidMutation.isPending}
                    onClick={() => markPaidMutation.mutate(invoice._id)}
                  >
                    {markPaidMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm Payment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* ===== PAYSLIP CARD ===== */}
      <Card className="overflow-hidden">
        {/* Header stripe */}
        <div className="bg-primary px-6 py-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider opacity-80">
                Pay Statement
              </p>
              <h2 className="mt-1 text-lg font-semibold">
                {fmtPeriod(invoice.periodStart, invoice.periodEnd)}
              </h2>
            </div>
            <div className="text-right">
              <Badge
                variant="outline"
                className={`border-primary-foreground/30 text-primary-foreground ${status.className} bg-white/10`}
              >
                {status.icon}
                <span className="ml-1">{status.label}</span>
              </Badge>
              <p className="mt-1.5 text-xs opacity-70">
                Generated {fmtShortDate(invoice.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Staff Info Row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Employee
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{staffFullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {staffEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {staffPosition}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pay Details
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {fmt(invoice.baseSalary)}{" "}
                    <span className="text-muted-foreground">
                      /{" "}
                      {salaryTypeLabels[invoice.salaryType]?.toLowerCase() ||
                        invoice.salaryType}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {invoice.totalHoursWorked.toFixed(1)} hours worked
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {invoice.totalDaysWorked} days worked
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Earnings Breakdown */}
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Earnings Summary
            </p>

            <div className="rounded-lg border">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-medium">
                      Calculated Pay
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {fmt(invoice.calculatedPay)}
                    </TableCell>
                  </TableRow>

                  {/* Additions */}
                  {invoice.additions.length > 0 && (
                    <>
                      <TableRow className="hover:bg-transparent bg-emerald-500/5">
                        <TableCell
                          colSpan={2}
                          className="text-xs font-medium uppercase text-emerald-600"
                        >
                          Additions
                        </TableCell>
                      </TableRow>
                      {invoice.additions.map((a, i) => (
                        <TableRow
                          key={`add-${i}`}
                          className="hover:bg-transparent"
                        >
                          <TableCell className="pl-8 text-sm text-muted-foreground">
                            {a.type}
                            {a.description && (
                              <span className="ml-1 text-xs">
                                — {a.description}
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-emerald-600">
                            +{fmt(a.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="pl-8 text-sm font-medium">
                          Total Additions
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-medium text-emerald-600">
                          +{fmt(totalAdditions)}
                        </TableCell>
                      </TableRow>
                    </>
                  )}

                  {/* Deductions */}
                  {invoice.deductions.length > 0 && (
                    <>
                      <TableRow className="hover:bg-transparent bg-red-500/5">
                        <TableCell
                          colSpan={2}
                          className="text-xs font-medium uppercase text-red-600"
                        >
                          Deductions
                        </TableCell>
                      </TableRow>
                      {invoice.deductions.map((d, i) => (
                        <TableRow
                          key={`ded-${i}`}
                          className="hover:bg-transparent"
                        >
                          <TableCell className="pl-8 text-sm text-muted-foreground">
                            {d.type}
                            {d.description && (
                              <span className="ml-1 text-xs">
                                — {d.description}
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-red-600">
                            -{fmt(d.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="pl-8 text-sm font-medium">
                          Total Deductions
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-medium text-red-600">
                          -{fmt(totalDeductions)}
                        </TableCell>
                      </TableRow>
                    </>
                  )}

                  {/* Net Pay */}
                  <TableRow className="hover:bg-transparent bg-muted/50 border-t-2">
                    <TableCell className="text-base font-semibold">
                      Net Pay
                    </TableCell>
                    <TableCell className="text-right text-base font-bold tabular-nums">
                      {fmt(invoice.netPay)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Timestamps & Notes */}
          {(invoice.approvedAt || invoice.paidAt || invoice.notes) && (
            <>
              <Separator className="my-6" />
              <div className="grid gap-4 sm:grid-cols-3">
                {invoice.approvedAt && (
                  <div>
                    <p className="text-xs text-muted-foreground">Approved</p>
                    <p className="text-sm font-medium">
                      {fmtDate(invoice.approvedAt)}
                    </p>
                  </div>
                )}
                {invoice.paidAt && (
                  <div>
                    <p className="text-xs text-muted-foreground">Paid</p>
                    <p className="text-sm font-medium">
                      {fmtDate(invoice.paidAt)}
                    </p>
                  </div>
                )}
                {invoice.notes && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-muted-foreground">Notes</p>
                    <p className="text-sm">{invoice.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ===== EOD REPORTS TABLE ===== */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="h-4 w-4" />
              Linked EOD Reports
              <Badge variant="secondary" className="ml-1 font-normal">
                {invoice.eodReports?.length ?? invoice.eodCount} reports
              </Badge>
            </CardTitle>
            {invoice.eodReports?.length === 0 && isDraftOrCalculated && (
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertCircle className="h-3.5 w-3.5" />
                No approved EODs found for this period
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {invoice.eodReports && invoice.eodReports.length > 0 ? (
            <div className="rounded-b-lg border-t">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-10 bg-muted/50 text-xs font-medium">
                      Date
                    </TableHead>
                    <TableHead className="h-10 bg-muted/50 text-xs font-medium">
                      Hours
                    </TableHead>
                    <TableHead className="h-10 bg-muted/50 text-xs font-medium">
                      Status
                    </TableHead>
                    <TableHead className="h-10 bg-muted/50 text-xs font-medium">
                      Tasks
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.eodReports.map((eod) => (
                    <TableRow key={eod._id}>
                      <TableCell className="font-medium text-sm">
                        {fmtDate(eod.date)}
                      </TableCell>
                      <TableCell className="tabular-nums text-sm">
                        {eod.hoursWorked.toFixed(1)}h
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            eod.isApproved
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-normal"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20 font-normal"
                          }
                        >
                          {eod.isApproved ? "Approved" : eod.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate text-sm text-muted-foreground">
                        {eod.tasksCompleted || "—"}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Totals row */}
                  <TableRow className="hover:bg-transparent bg-muted/50 border-t-2 font-medium">
                    <TableCell className="text-sm font-semibold">
                      Total
                    </TableCell>
                    <TableCell className="tabular-nums text-sm font-semibold">
                      {invoice.totalHoursWorked.toFixed(1)}h
                    </TableCell>
                    <TableCell />
                    <TableCell className="text-sm text-muted-foreground">
                      {invoice.eodReports.length} report
                      {invoice.eodReports.length !== 1 ? "s" : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 border-t py-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <ClipboardList className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No EOD reports linked</p>
              <p className="text-xs text-muted-foreground">
                {isDraftOrCalculated
                  ? "Try recalculating to pull in newly approved EODs"
                  : "No approved EOD reports were found for this period"}
              </p>
              {isDraftOrCalculated && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 gap-1.5"
                  disabled={recalculateMutation.isPending}
                  onClick={() => recalculateMutation.mutate(invoice._id)}
                >
                  {recalculateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Recalculate
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

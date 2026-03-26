"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { InvoicePDFDocument } from "@/components/invoice/InvoicePDFDocument";
import {
  ArrowLeft,
  ArrowRightLeft,
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
  Download,
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

function fmt(amount: number, currency?: string) {
  const cur = currency || "USD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: cur,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function fmtPhp(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

const STATUTORY_TYPES = new Set(["SSS", "Pag-IBIG", "PhilHealth"]);

const PDFDownloadButton = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button
        disabled
        size="sm"
        variant="outline"
        className="flex items-center gap-2 h-9"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        PDF
      </Button>
    ),
  },
);

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
  console.log("Invoice data:", invoice); // Debug log
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
      <div className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center rounded-xl border border-dashed bg-card p-12 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <FileText className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">Invoice Not Found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The invoice could not be loaded or you do not have permission to view
          it.
        </p>
        <Button
          variant="outline"
          className="mt-6"
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

  const manualDeductions = invoice.deductions.filter(
    (d: any) => !STATUTORY_TYPES.has(d.type),
  );
  const totalManualDeductions = manualDeductions.reduce(
    (sum: number, d: any) => sum + d.amount,
    0,
  );
  const totalAdditions = invoice.additions.reduce(
    (sum: number, a: any) => sum + a.amount,
    0,
  );

  const cur = invoice.currency || "PHP";
  const php = invoice.phpConversion;
  const isNonPhp = cur !== "PHP" && !!php;

  // For non-PHP invoices, statutory deductions live in phpConversion (they are PHP-denominated)
  const effectiveStatutory =
    isNonPhp && php?.statutoryDeductions
      ? php.statutoryDeductions
      : invoice.statutoryDeductions;
  const totalStatutoryDeductions =
    (effectiveStatutory?.sss || 0) +
    (effectiveStatutory?.pagIbig || 0) +
    (effectiveStatutory?.philHealth || 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12 pt-4 px-4 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full"
            onClick={() => router.push(`/business/${businessId}/invoice`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Invoice Details
            </h1>
            <p className="text-sm text-muted-foreground">
              {fmtPeriod(invoice.periodStart, invoice.periodEnd)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`hidden sm:inline-flex px-3 py-1 text-sm border-2 ${status.className} mr-2`}
          >
            {status.icon}
            <span className="ml-2 font-medium">{status.label}</span>
          </Badge>

          {isDraftOrCalculated && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 h-9"
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
                <Button size="sm" className="gap-1.5 h-9">
                  <CheckCircle2 className="h-4 w-4" />
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Approve Invoice</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will approve the invoice for {staffFullName} with a net
                    pay of {fmt(invoice.netPay, cur)}. The invoice will become
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
                <Button size="sm" className="gap-1.5 h-9">
                  <DollarSign className="h-4 w-4" />
                  Mark as Paid
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Mark as Paid</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confirm that {fmt(invoice.netPay, cur)} has been paid to{" "}
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

          <PDFDownloadButton
            document={<InvoicePDFDocument invoice={invoice} />}
            fileName={`Invoice_${fmtShortDate(invoice.periodStart)}_${invoice.staffName?.replace(/\s+/g, "_") || "Staff"}.pdf`}
          >
            {/* @ts-ignore */}
            {({ loading }) => (
              <Button
                variant="outline"
                size="sm"
                disabled={loading}
                className="flex items-center gap-2 h-9"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">PDF</span>
              </Button>
            )}
          </PDFDownloadButton>
        </div>
      </div>

      {/* Mobile Badge */}
      <div className="sm:hidden -mt-2">
        <Badge
          variant="outline"
          className={`px-3 py-1 text-sm border-2 ${status.className}`}
        >
          {status.icon}
          <span className="ml-2 font-medium">{status.label}</span>
        </Badge>
      </div>

      {/* ===== PAYSLIP CARD ===== */}
      <Card className="border-border/50 shadow-sm overflow-hidden rounded-xl">
        {/* Company Header */}
        <div className="bg-primary px-6 py-4 sm:px-8 flex items-center gap-4">
          <Image
            src="/assets/logo.jpeg"
            alt="Advanced Virtual Staff"
            width={44}
            height={44}
            className="rounded-md shrink-0"
          />
          <div>
            <p className="text-primary-foreground font-bold text-lg leading-tight">
              Advanced Virtual Staff
            </p>
            <p className="text-primary-foreground/70 text-xs uppercase tracking-widest">
              Invoice
            </p>
          </div>
        </div>

        <div className="bg-muted/30 px-6 py-8 sm:px-8 border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-2">
                Pay Period
              </p>
              <h2 className="text-3xl font-bold">
                {fmtPeriod(invoice.periodStart, invoice.periodEnd)}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-muted-foreground mb-1">Generated</p>
              <p className="font-medium text-lg">
                {fmtDate(invoice.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          {/* VA & Pay Details Grid */}
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x border-b border-border/50 bg-card">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-muted-foreground pb-2 border-b border-border/40">
                <User className="h-4 w-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  Virtual Assistant Information
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-xl font-semibold">{staffFullName}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-3">
                  <Briefcase className="h-4 w-4 shrink-0" /> {staffPosition}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" /> {staffEmail}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 bg-muted/10">
              <div className="flex items-center gap-2 text-muted-foreground pb-2 border-b border-border/40">
                <DollarSign className="h-4 w-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  Pay Structure
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Currency
                  </span>
                  <Badge variant={cur !== "PHP" ? "default" : "secondary"}>
                    {cur}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Base Rate
                  </span>
                  <span className="font-medium text-lg">
                    {fmt(invoice.baseSalary, cur)}{" "}
                    <span className="text-muted-foreground text-sm font-normal">
                      /{" "}
                      {salaryTypeLabels[invoice.salaryType]?.toLowerCase() ||
                        invoice.salaryType}
                    </span>
                  </span>
                </div>
                {isNonPhp && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Base Rate (PHP)</span>
                    <span>
                      {fmtPhp(php.baseSalaryPhp)}{" "}
                      <span className="text-xs">@ {php.exchangeRate}</span>
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Hours Worked
                  </span>
                  <span className="font-medium">
                    {invoice.totalHoursWorked.toFixed(1)}{" "}
                    <span className="text-muted-foreground text-sm font-normal">
                      hrs
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Days Worked
                  </span>
                  <span className="font-medium">
                    {invoice.totalDaysWorked}{" "}
                    <span className="text-muted-foreground text-sm font-normal">
                      days
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Earnings Breakdown
            </h3>

            <div className="space-y-1">
              {/* Earnings */}
              <div className="flex justify-between py-2 text-sm">
                <span className="font-medium">Regular Earnings</span>
                <span>
                  {fmt(invoice.earningsBreakdown?.regularEarnings || 0, cur)}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Overtime Earnings</span>
                <span>
                  {fmt(invoice.earningsBreakdown?.overtimeEarnings || 0, cur)}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">Sunday Premium</span>
                <span>
                  {fmt(
                    invoice.earningsBreakdown?.sundayPremiumEarnings || 0,
                    cur,
                  )}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">
                  Night Differential
                </span>
                <span>
                  {fmt(
                    invoice.earningsBreakdown?.nightDifferentialEarnings || 0,
                    cur,
                  )}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">
                  Transportation Allowance
                  <span className="text-xs ml-1 opacity-60">(PHP)</span>
                </span>
                <span>
                  {fmtPhp(
                    invoice.earningsBreakdown
                      ?.transportationAllowanceEarnings || 0,
                  )}
                </span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between py-3 font-semibold text-base bg-muted/30 px-3 rounded-lg -mx-3">
                <span>Calculated Pay</span>
                <span>{fmt(invoice.calculatedPay, cur)}</span>
              </div>

              {/* Additions */}
              {invoice.additions.length > 0 && (
                <div className="mt-8 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 mb-3">
                    Additions
                  </h4>
                  <div className="space-y-1">
                    {invoice.additions.map((a: any, i: number) => (
                      <div
                        key={`add-${i}`}
                        className="flex justify-between py-1.5 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {a.type}{" "}
                          {a.description && (
                            <span className="text-xs ml-1 opacity-70 border-l pl-2 border-border/50">
                              {a.description}
                            </span>
                          )}
                        </span>
                        <span className="text-emerald-600 font-medium">
                          +{fmt(a.amount, cur)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 mt-2 text-sm font-medium border-t border-border/40">
                      <span>Total Additions</span>
                      <span className="text-emerald-600">
                        +{fmt(totalAdditions, cur)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Statutory Deductions */}
              {(totalStatutoryDeductions > 0 || !isNonPhp) && (
                <div className="mt-8 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-red-600/80 mb-3">
                    Statutory Deductions{isNonPhp ? " (PHP)" : ""}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-muted-foreground">SSS</span>
                      <span className="text-red-600 font-medium">
                        -
                        {isNonPhp
                          ? fmtPhp(effectiveStatutory?.sss || 0)
                          : fmt(effectiveStatutory?.sss || 0, cur)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-muted-foreground">Pag-IBIG</span>
                      <span className="text-red-600 font-medium">
                        -
                        {isNonPhp
                          ? fmtPhp(effectiveStatutory?.pagIbig || 0)
                          : fmt(effectiveStatutory?.pagIbig || 0, cur)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 text-sm">
                      <span className="text-muted-foreground">PhilHealth</span>
                      <span className="text-red-600 font-medium">
                        -
                        {isNonPhp
                          ? fmtPhp(effectiveStatutory?.philHealth || 0)
                          : fmt(effectiveStatutory?.philHealth || 0, cur)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 mt-2 text-sm font-medium border-t border-border/40">
                      <span>Total Statutory Deductions</span>
                      <span className="text-red-600">
                        -
                        {isNonPhp
                          ? fmtPhp(totalStatutoryDeductions)
                          : fmt(totalStatutoryDeductions, cur)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Manual Deductions */}
              {manualDeductions.length > 0 && (
                <div className="mt-8 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-red-600/80 mb-3">
                    Other Deductions
                  </h4>
                  <div className="space-y-1">
                    {manualDeductions.map((d: any, i: number) => (
                      <div
                        key={`ded-${i}`}
                        className="flex justify-between py-1.5 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {d.type}{" "}
                          {d.description && (
                            <span className="text-xs ml-1 opacity-70 border-l pl-2 border-border/50">
                              {d.description}
                            </span>
                          )}
                        </span>
                        <span className="text-red-600 font-medium">
                          -{fmt(d.amount, cur)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 mt-2 text-sm font-medium border-t border-border/40">
                      <span>Total Other Deductions</span>
                      <span className="text-red-600">
                        -{fmt(totalManualDeductions, cur)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* NET PAY FOOTER */}
          <div className="bg-primary px-6 py-8 sm:px-8 text-primary-foreground">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest opacity-80 font-medium mb-1">
                  Total Net Pay
                </p>
                <p className="text-xs opacity-60">
                  Calculated Pay + Additions - Deductions
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black tabular-nums tracking-tight">
                  {fmt(invoice.netPay, cur)}
                </div>
                {isNonPhp && php && (
                  <div className="mt-2 text-sm opacity-80 flex items-center gap-2 justify-end">
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    <span className="font-semibold">
                      {fmtPhp(php.netPayPhp)}
                    </span>
                    <span className="text-xs opacity-70">
                      @ 1 {cur} = {php.exchangeRate} PHP
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PHP Conversion Breakdown */}
          {isNonPhp && php && (
            <div className="px-6 py-5 sm:px-8 bg-amber-50/60 dark:bg-amber-950/20 border-t border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-4">
                <ArrowRightLeft className="h-4 w-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  PHP Conversion Breakdown
                </h3>
                <Badge
                  variant="outline"
                  className="ml-auto text-xs border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400"
                >
                  1 {cur} = {php.exchangeRate} PHP
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Base Salary
                  </p>
                  <p className="font-medium">{fmtPhp(php.baseSalaryPhp)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Calculated Pay
                  </p>
                  <p className="font-medium">{fmtPhp(php.calculatedPayPhp)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Deductions
                  </p>
                  <p className="font-medium text-red-600">
                    -{fmtPhp(totalStatutoryDeductions)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Net Pay</p>
                  <p className="font-bold text-amber-700 dark:text-amber-400">
                    {fmtPhp(php.netPayPhp)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timestamps & Notes */}
      {(invoice.approvedAt || invoice.paidAt || invoice.notes) && (
        <div className="px-2 grid gap-4 sm:grid-cols-3 text-sm border border-border/50 bg-muted/20 p-4 rounded-xl">
          {invoice.approvedAt && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                Approved On
              </p>
              <p className="font-medium text-foreground">
                {fmtDate(invoice.approvedAt)}
              </p>
            </div>
          )}
          {invoice.paidAt && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                Paid On
              </p>
              <p className="font-medium text-foreground">
                {fmtDate(invoice.paidAt)}
              </p>
            </div>
          )}
          {invoice.notes && (
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                Notes
              </p>
              <p className="text-foreground">{invoice.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* ===== EOD REPORTS TABLE ===== */}
      <Card className="border-border/50 shadow-sm rounded-xl overflow-hidden mt-10">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-5 pt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
              Linked EOD Reports
              <Badge
                variant="secondary"
                className="ml-2 font-medium bg-background border-border shadow-sm"
              >
                {invoice.eodReports?.length ?? invoice.eodCount}
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
            <div className="border-t-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-12 bg-muted/10 text-xs font-bold uppercase tracking-wider">
                      Date
                    </TableHead>
                    <TableHead className="h-12 bg-muted/10 text-xs font-bold uppercase tracking-wider">
                      Hours
                    </TableHead>
                    <TableHead className="h-12 bg-muted/10 text-xs font-bold uppercase tracking-wider">
                      Regular / OT / Night
                    </TableHead>
                    <TableHead className="h-12 bg-muted/10 text-xs font-bold uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="h-12 bg-muted/10 text-xs font-bold uppercase tracking-wider">
                      Tasks
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.eodReports.map((eod: any) => (
                    <TableRow
                      key={eod._id}
                      className="group hover:bg-muted/10 transition-colors"
                    >
                      <TableCell className="font-medium text-sm">
                        {fmtDate(eod.date)}
                      </TableCell>
                      <TableCell className="tabular-nums text-sm">
                        {eod.hoursWorked.toFixed(1)}h
                      </TableCell>
                      <TableCell className="tabular-nums text-sm text-muted-foreground">
                        {(eod.regularHoursWorked ?? eod.hoursWorked).toFixed(1)}
                        h / {(eod.overtimeHoursWorked ?? 0).toFixed(1)}h /{" "}
                        {(eod.nightDifferentialHours ?? 0).toFixed(1)}h
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            eod.isApproved
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-medium"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/30 font-medium"
                          }
                        >
                          {eod.isApproved ? "Approved" : eod.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {eod.tasksCompleted || "—"}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Totals row */}
                  <TableRow className="hover:bg-transparent bg-muted/30 font-medium">
                    <TableCell className="text-sm font-bold uppercase tracking-wider">
                      Total
                    </TableCell>
                    <TableCell className="tabular-nums text-sm font-bold">
                      {invoice.totalHoursWorked.toFixed(1)}h
                    </TableCell>
                    <TableCell />
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
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 border border-border/50">
                <ClipboardList className="h-8 w-8 text-muted-foreground/60" />
              </div>
              <p className="text-base font-semibold">
                No Linking Data Available
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                {isDraftOrCalculated
                  ? "Try recalculating to pull in newly approved EODs."
                  : "No detailed EOD reports were linked to this invoice at the time of calculation."}
              </p>
              {isDraftOrCalculated && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 gap-1.5"
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

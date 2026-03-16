"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Activity,
  Briefcase,
  Building2,
  FileText,
  Globe,
  Loader2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useBusinessById } from "@/hooks/useBusiness";
import {
  useBusinessOverviewRecentEods,
  useBusinessOverviewRecentInvoices,
  useBusinessOverviewStats,
} from "@/hooks/useOverview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const invoiceStatusClassMap: Record<string, string> = {
  draft: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  calculated: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  paid: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
};

const eodStatusClassMap: Record<string, string> = {
  submitted: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  reviewed: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  needs_revision: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateRange(periodStart: string, periodEnd: string): string {
  return `${formatDate(periodStart)} - ${formatDate(periodEnd)}`;
}

function formatCurrency(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: currency || "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);
  } catch {
    return `PHP ${(value || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

function formatStatusLabel(status: string): string {
  return status.replace(/_/g, " ");
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3)}...`;
}

export default function BusinessOverviewPage() {
  const params = useParams();
  const businessId = params.id as string;
  const { data: business, isLoading, isError } = useBusinessById(businessId);
  const { data: overviewStats, isLoading: isOverviewStatsLoading } =
    useBusinessOverviewStats(businessId);
  const {
    data: recentInvoices,
    isLoading: isRecentInvoicesLoading,
    isError: isRecentInvoicesError,
  } = useBusinessOverviewRecentInvoices(businessId, 5);
  const {
    data: recentEods,
    isLoading: isRecentEodsLoading,
    isError: isRecentEodsError,
  } = useBusinessOverviewRecentEods(businessId, 5);

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !business) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <Building2 className="h-10 w-10 text-destructive" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Business Not Found</h3>
        <p className="mt-2 text-base text-muted-foreground max-w-sm">
          The business you're looking for doesn't exist or you don't have access
          to it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 p-6 rounded-xl border bg-card shadow-sm">
        <div className="flex items-start gap-5">
          {business.logo ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border shadow-sm">
              <Image
                src={business.logo}
                alt={`${business.name} logo`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10 border shadow-sm">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
          )}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight">
                {business.name}
              </h1>
              <Badge
                variant={business.isActive ? "default" : "secondary"}
                className="h-6"
              >
                {business.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            {business.description ? (
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {business.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No description provided.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {business.website
                    .replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isOverviewStatsLoading ? "--" : (overviewStats?.totalStaff ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active records</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Positions
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isOverviewStatsLoading
                ? "--"
                : (overviewStats?.openPositions ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently recruiting
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent EODs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isOverviewStatsLoading
                ? "--"
                : (overviewStats?.recentEods7d ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Submitted in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
              {isOverviewStatsLoading
                ? "--"
                : (overviewStats?.pendingEodApprovals ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Waiting admin review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout for deeper details */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Content Area (span 4) */}
        <div className="md:col-span-4 space-y-6">
          <Card className="shadow-sm min-h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Recent Invoices
              </CardTitle>
              <CardDescription>
                Latest payroll records for this business.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isRecentInvoicesLoading && (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-20 rounded-lg border bg-muted/20"
                    />
                  ))}
                </div>
              )}

              {!isRecentInvoicesLoading && isRecentInvoicesError && (
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                  Unable to load recent invoices right now.
                </div>
              )}

              {!isRecentInvoicesLoading &&
                !isRecentInvoicesError &&
                recentInvoices?.data.length === 0 && (
                  <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    No invoices found for this business yet.
                  </div>
                )}

              {!isRecentInvoicesLoading &&
                !isRecentInvoicesError &&
                (recentInvoices?.data.length ?? 0) > 0 && (
                  <div className="space-y-3">
                    {recentInvoices?.data.map((invoice) => (
                      <div key={invoice._id} className="rounded-lg border p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium leading-tight">
                              {invoice.staffName || "Unknown staff"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDateRange(
                                invoice.periodStart,
                                invoice.periodEnd,
                              )}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              invoiceStatusClassMap[invoice.status] ||
                              invoiceStatusClassMap.draft
                            }
                          >
                            {formatStatusLabel(invoice.status)}
                          </Badge>
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-3">
                          <p className="text-xs text-muted-foreground truncate">
                            {invoice.staffEmail}
                          </p>
                          <p className="text-sm font-semibold">
                            {formatCurrency(invoice.netPay, invoice.currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              <Button asChild variant="outline" className="w-full" size="sm">
                <Link href={`/business/${businessId}/invoice`}>
                  View All Invoices
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Area (span 3) */}
        <div className="md:col-span-3 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recent Submitted EOD
              </CardTitle>
              <CardDescription>
                Latest EOD reports with review status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {isRecentEodsLoading && (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-24 rounded-lg border bg-muted/20"
                      />
                    ))}
                  </div>
                )}

                {!isRecentEodsLoading && isRecentEodsError && (
                  <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    Unable to load recent EOD submissions right now.
                  </div>
                )}

                {!isRecentEodsLoading &&
                  !isRecentEodsError &&
                  recentEods?.data.length === 0 && (
                    <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                      No submitted EOD reports yet.
                    </div>
                  )}

                {!isRecentEodsLoading &&
                  !isRecentEodsError &&
                  (recentEods?.data.length ?? 0) > 0 && (
                    <div className="space-y-3">
                      {recentEods?.data.map((report) => {
                        const statusKey = report.isApproved
                          ? "approved"
                          : report.status;

                        return (
                          <div
                            key={report._id}
                            className="rounded-lg border p-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium leading-tight">
                                  {report.staffName || "Unknown staff"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(report.date)} -{" "}
                                  {report.hoursWorked.toFixed(1)} hrs
                                </p>
                              </div>

                              <Badge
                                variant="outline"
                                className={
                                  eodStatusClassMap[statusKey] ||
                                  eodStatusClassMap.submitted
                                }
                              >
                                {formatStatusLabel(statusKey)}
                              </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                              {truncateText(
                                report.tasksCompleted ||
                                  "No task notes provided.",
                                100,
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-1"
                  size="sm"
                >
                  <Link href={`/business/${businessId}/eod`}>
                    View All EODs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

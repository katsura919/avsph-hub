"use client";

import { useParams } from "next/navigation";
import {
  Activity,
  Briefcase,
  Building2,
  FileText,
  Loader2,
  Users,
} from "lucide-react";
import { useBusinessById } from "@/hooks/useBusiness";
import { useBusinessOverviewStats } from "@/hooks/useOverview";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessAnalytics } from "@/components/business/business-analytics";

export default function BusinessOverviewPage() {
  const params = useParams();
  const businessId = params.id as string;
  const { data: business, isLoading, isError } = useBusinessById(businessId);
  const { data: overviewStats, isLoading: isOverviewStatsLoading } =
    useBusinessOverviewStats(businessId);

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
      {/* Quick Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="gap-0 py-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Total Staff
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">
              {isOverviewStatsLoading ? "…" : (overviewStats?.totalStaff ?? 0)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Active records</p>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Open Positions
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">
              {isOverviewStatsLoading
                ? "…"
                : (overviewStats?.openPositions ?? 0)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Currently recruiting
            </p>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Recent EODs
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">
              {isOverviewStatsLoading
                ? "…"
                : (overviewStats?.recentEods7d ?? 0)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Submitted in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-warning" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Pending Approvals
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-warning">
              {isOverviewStatsLoading
                ? "…"
                : (overviewStats?.pendingEodApprovals ?? 0)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Waiting admin review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics bento */}
      <BusinessAnalytics businessId={businessId} />
    </div>
  );
}

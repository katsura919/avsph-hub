"use client";

import { useMemo } from "react";
import {
  Building2,
  CalendarCheck,
  Clock,
  LineChart,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useBusinessAttendanceStats,
  useBusinessPayrollTrend,
  useBusinessRecruitmentStats,
  useBusinessWorkforceStats,
} from "@/hooks/useOverview";
import type {
  AttendanceStats,
  PayrollTrendCurrency,
  RecruitmentStats,
  WorkforceStats,
} from "@/types/overview.types";

/* ────────────────────────────────────────────────────────────────────────────
   Extended business insights: attendance, recruitment, workforce & payroll
   trend. Pure SVG/CSS driven by the app's design tokens — no chart dependency,
   consistent with components/business/business-analytics.tsx.

   Every series carries a text label + count/amount as a secondary encoding, so
   nothing relies on color alone (CVD-safe). Categorical ramps derive from
   --primary via color-mix, so they track every theme automatically.
──────────────────────────────────────────────────────────────────────────── */

const STATUS_COLOR = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--info)",
  primary: "var(--primary)",
  muted: "var(--muted-foreground)",
} as const;

/* Sequential ramp from --primary for ranked/categorical bars. */
function ramp(step: number): string {
  const pct = [100, 78, 60, 45, 34][Math.min(step, 4)];
  return pct === 100
    ? "var(--primary)"
    : `color-mix(in srgb, var(--primary) ${pct}%, transparent)`;
}

function formatCurrency(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "PHP",
      maximumFractionDigits: 0,
    }).format(value || 0);
  } catch {
    return `${currency} ${Math.round(value || 0).toLocaleString()}`;
  }
}

function formatTenure(months: number): string {
  if (months <= 0) return "—";
  const years = Math.floor(months / 12);
  const rem = Math.round(months % 12);
  if (years === 0) return `${Math.max(1, rem)} mo`;
  if (rem === 0) return `${years}y`;
  return `${years}y ${rem}m`;
}

/* ── shared primitives ────────────────────────────────────────────────────── */

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function BlockSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-40 animate-pulse rounded bg-muted/50" />
      <div className="h-3 w-full animate-pulse rounded-full bg-muted/40" />
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 w-full animate-pulse rounded bg-muted/30" />
        ))}
      </div>
    </div>
  );
}

type Segment = { key: string; label: string; count: number; color: string };

/* Proportional stacked bar + legend rows with counts. */
function SegmentedBar({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((a, s) => a + s.count, 0);
  const visible = segments.filter((s) => s.count > 0);

  return (
    <div className="space-y-2.5">
      <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-muted/40">
        {visible.map((s) => (
          <div
            key={s.key}
            className="h-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${total > 0 ? (s.count / total) * 100 : 0}%`,
              background: s.color,
            }}
            title={`${s.label} — ${s.count}`}
          />
        ))}
      </div>
      <div className="grid gap-1.5">
        {segments.map((s) => (
          <div
            key={s.key}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: s.color }}
              />
              {s.label}
            </span>
            <span className="tabular-nums font-medium text-foreground">
              {s.count}
              {total > 0 && (
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                  {Math.round((s.count / total) * 100)}%
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Horizontal ranked bars (label + value). */
function RankedBars({
  rows,
  formatValue = (n) => String(n),
}: {
  rows: { key: string; label: string; value: number }[];
  formatValue?: (n: number) => string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div key={r.key} className="space-y-1">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="truncate text-muted-foreground">{r.label}</span>
            <span className="tabular-nums font-medium text-foreground">
              {formatValue(r.value)}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/40">
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{
                width: `${(r.value / max) * 100}%`,
                background: ramp(i),
                minWidth: r.value > 0 ? 4 : 0,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Vertical bars over a time series. `fill` makes the chart grow to fill a
   flex parent (used when a card is stretched to match its row's height). */
function TimeBars({
  bars,
  color = STATUS_COLOR.primary,
  height = 96,
  fill = false,
}: {
  bars: { key: string; label: string; value: number; tip: string }[];
  color?: string;
  height?: number;
  fill?: boolean;
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);
  return (
    <div
      className={
        fill
          ? "flex flex-1 items-end gap-1.5"
          : "flex items-end gap-1.5"
      }
      style={fill ? { minHeight: height } : { height }}
    >
      {bars.map((b, i) => {
        const isLast = i === bars.length - 1;
        const heightPct = b.value === 0 ? 0 : (b.value / max) * 100;
        return (
          <div
            key={b.key}
            className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
            title={b.tip}
          >
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-[3px] transition-[height] duration-500 ease-out motion-reduce:transition-none"
                style={{
                  height: `${heightPct}%`,
                  minHeight: b.value > 0 ? 4 : 2,
                  background: isLast
                    ? color
                    : `color-mix(in srgb, ${color} 55%, transparent)`,
                  opacity: b.value === 0 ? 0.25 : 1,
                }}
              />
            </div>
            <span className="text-[9px] tabular-nums text-muted-foreground">
              {b.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── 1. Attendance ────────────────────────────────────────────────────────── */

export function AttendanceCard({ businessId }: { businessId: string }) {
  const { data, isLoading } = useBusinessAttendanceStats(businessId, 30);

  const days = useMemo(() => buildAttendanceDays(data), [data]);

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4" />
              Attendance
            </CardTitle>
            <CardDescription>Clock-ins over the last 30 days.</CardDescription>
          </div>
          {!isLoading && data && (
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums leading-none">
                {data.totalRecords}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">records</p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        {isLoading ? (
          <BlockSkeleton />
        ) : !data || data.totalRecords === 0 ? (
          <EmptyHint>No attendance recorded in this window.</EmptyHint>
        ) : (
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Approved hours
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-success">
                  {Math.round(data.approvedHours).toLocaleString()}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {data.avgHoursPerDay.toFixed(1)} hrs/day avg
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Pending
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-warning">
                  {data.statusCounts.pending}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  awaiting review
                </p>
              </div>
            </div>

            <SegmentedBar
              segments={[
                {
                  key: "approved",
                  label: "Approved",
                  count: data.statusCounts.approved,
                  color: STATUS_COLOR.success,
                },
                {
                  key: "pending",
                  label: "Pending",
                  count: data.statusCounts.pending,
                  color: STATUS_COLOR.warning,
                },
                {
                  key: "rejected",
                  label: "Rejected",
                  count: data.statusCounts.rejected,
                  color: STATUS_COLOR.muted,
                },
              ]}
            />

            <div className="flex flex-1 flex-col gap-2 border-t border-border/60 pt-4">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <Clock className="h-3 w-3" />
                Daily clock-ins (last 14 days)
              </p>
              <TimeBars bars={days} fill />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function buildAttendanceDays(data?: AttendanceStats) {
  const byDate = new Map<string, { count: number; hours: number }>();
  for (const d of data?.daily ?? []) {
    byDate.set(d.date, { count: d.count, hours: d.hours });
  }
  const out: { key: string; label: string; value: number; tip: string }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const hit = byDate.get(key);
    const count = hit?.count ?? 0;
    out.push({
      key,
      label: String(d.getDate()),
      value: count,
      tip: `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${count} clock-in${count === 1 ? "" : "s"}`,
    });
  }
  return out;
}

/* ── 2. Recruitment ───────────────────────────────────────────────────────── */

export function RecruitmentCard({ businessId }: { businessId: string }) {
  const { data, isLoading } = useBusinessRecruitmentStats(businessId);

  const hasData =
    !!data && (data.applicants.total > 0 || data.jobs.total > 0);

  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Recruitment
            </CardTitle>
            <CardDescription>Applicant pipeline & conversion.</CardDescription>
          </div>
          {!isLoading && data && (
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums leading-none">
                {data.jobs.open}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">open roles</p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {isLoading ? (
          <BlockSkeleton />
        ) : !hasData ? (
          <EmptyHint>No job posts or applicants yet.</EmptyHint>
        ) : (
          <RecruitmentBody data={data} />
        )}
      </CardContent>
    </Card>
  );
}

function RecruitmentBody({ data }: { data: RecruitmentStats }) {
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Conversion rate
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {Math.round(data.conversionRate * 100)}%
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {data.applicants.hired} hired of {data.applicants.total} applicant
            {data.applicants.total === 1 ? "" : "s"}
          </p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">
              {data.jobs.open}
            </span>{" "}
            open
          </p>
          <p className="mt-0.5">
            <span className="font-medium text-foreground">
              {data.jobs.draft}
            </span>{" "}
            draft
          </p>
          <p className="mt-0.5">
            <span className="font-medium text-foreground">
              {data.jobs.closed}
            </span>{" "}
            closed
          </p>
        </div>
      </div>

      <SegmentedBar
        segments={[
          {
            key: "active",
            label: "In pipeline",
            count: data.applicants.active,
            color: STATUS_COLOR.info,
          },
          {
            key: "hired",
            label: "Hired",
            count: data.applicants.hired,
            color: STATUS_COLOR.success,
          },
          {
            key: "rejected",
            label: "Rejected",
            count: data.applicants.rejected,
            color: STATUS_COLOR.muted,
          },
        ]}
      />

      {data.topOpenJobs.length > 0 && (
        <div className="space-y-2.5 border-t border-border/60 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Applicant load by open role
          </p>
          <RankedBars
            rows={data.topOpenJobs.map((j) => ({
              key: j.jobId,
              label: j.title,
              value: j.applicantCount,
            }))}
          />
        </div>
      )}
    </>
  );
}

/* ── 3. Workforce ─────────────────────────────────────────────────────────── */

export function WorkforceCard({ businessId }: { businessId: string }) {
  const { data, isLoading } = useBusinessWorkforceStats(businessId);

  const hires = useMemo(() => buildHireBars(data), [data]);

  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Workforce
            </CardTitle>
            <CardDescription>Headcount composition & growth.</CardDescription>
          </div>
          {!isLoading && data && (
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums leading-none">
                {data.totalStaff}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatTenure(data.avgTenureMonths)} avg tenure
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <BlockSkeleton />
        ) : !data || data.totalStaff === 0 ? (
          <EmptyHint>No active staff for this business yet.</EmptyHint>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Status
                </p>
                <SegmentedBar
                  segments={[
                    {
                      key: "active",
                      label: "Active",
                      count: data.byStatus.active,
                      color: STATUS_COLOR.success,
                    },
                    {
                      key: "on_leave",
                      label: "On leave",
                      count: data.byStatus.on_leave,
                      color: STATUS_COLOR.warning,
                    },
                    {
                      key: "terminated",
                      label: "Terminated",
                      count: data.byStatus.terminated,
                      color: STATUS_COLOR.muted,
                    },
                  ]}
                />
              </div>

              <div className="space-y-2.5 border-t border-border/60 pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Employment type
                </p>
                <RankedBars
                  rows={Object.entries(data.byEmploymentType)
                    .filter(([, v]) => v > 0)
                    .map(([k, v]) => ({
                      key: k,
                      label: k.replace(/-/g, " "),
                      value: v,
                    }))}
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  By department
                </p>
                {data.byDepartment.length > 0 ? (
                  <RankedBars
                    rows={data.byDepartment.slice(0, 5).map((d) => ({
                      key: d.department,
                      label: d.department,
                      value: d.count,
                    }))}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No departments assigned.
                  </p>
                )}
              </div>

              <div className="space-y-2 border-t border-border/60 pt-4">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  New hires (last 12 months)
                </p>
                <TimeBars bars={hires} height={72} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function buildHireBars(data?: WorkforceStats) {
  const byMonth = new Map<string, number>();
  for (const h of data?.hires ?? []) byMonth.set(h.month, h.count);
  const out: { key: string; label: string; value: number; tip: string }[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const count = byMonth.get(key) ?? 0;
    out.push({
      key,
      label: d.toLocaleDateString("en-US", { month: "narrow" }),
      value: count,
      tip: `${d.toLocaleDateString("en-US", { month: "long", year: "numeric" })} — ${count} hire${count === 1 ? "" : "s"}`,
    });
  }
  return out;
}

/* ── 4. Payroll trend ─────────────────────────────────────────────────────── */

export function PayrollTrendCard({ businessId }: { businessId: string }) {
  const { data, isLoading } = useBusinessPayrollTrend(businessId, 6);
  const currencies = data?.currencies ?? [];

  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          Payroll Trend
        </CardTitle>
        <CardDescription>
          Net pay & cost structure over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <BlockSkeleton />
        ) : currencies.length === 0 ? (
          <EmptyHint>No invoices in this window yet.</EmptyHint>
        ) : (
          currencies.map((c, i) => (
            <div
              key={c.currency}
              className={
                i > 0 ? "border-t border-border/60 pt-6" : undefined
              }
            >
              <PayrollCurrencyTrend
                currency={c}
                multi={currencies.length > 1}
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

const BREAKDOWN_META = [
  { key: "regular", label: "Regular" },
  { key: "overtime", label: "Overtime" },
  { key: "sundayPremium", label: "Sunday" },
  { key: "nightDifferential", label: "Night diff" },
  { key: "transportation", label: "Transport" },
] as const;

function PayrollCurrencyTrend({
  currency,
  multi,
}: {
  currency: PayrollTrendCurrency;
  multi: boolean;
}) {
  const months = useMemo(() => buildPayrollMonths(currency), [currency]);

  const breakdownTotal = BREAKDOWN_META.reduce(
    (a, m) => a + (currency.breakdown[m.key] || 0),
    0,
  );

  return (
    <div className="space-y-5">
      {multi && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {currency.currency}
        </p>
      )}

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Total net pay
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums">
            {formatCurrency(currency.totalNetPay, currency.currency)}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {currency.invoiceCount} invoice
            {currency.invoiceCount === 1 ? "" : "s"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Statutory
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-warning">
            {formatCurrency(currency.totalStatutory, currency.currency)}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            SSS · Pag-IBIG · PhilHealth
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Net pay by month
          </p>
          <TimeBars bars={months} height={104} />
        </div>

        <div className="space-y-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Earnings breakdown
          </p>
          {breakdownTotal > 0 ? (
            <>
              <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-muted/40">
                {BREAKDOWN_META.map((m, i) => {
                  const val = currency.breakdown[m.key] || 0;
                  if (val <= 0) return null;
                  return (
                    <div
                      key={m.key}
                      className="h-full"
                      style={{
                        width: `${(val / breakdownTotal) * 100}%`,
                        background: ramp(i),
                      }}
                      title={`${m.label} — ${formatCurrency(val, currency.currency)}`}
                    />
                  );
                })}
              </div>
              <div className="grid gap-1.5">
                {BREAKDOWN_META.map((m, i) => {
                  const val = currency.breakdown[m.key] || 0;
                  return (
                    <div
                      key={m.key}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: ramp(i) }}
                        />
                        {m.label}
                      </span>
                      <span className="tabular-nums font-medium text-foreground">
                        {formatCurrency(val, currency.currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No earnings breakdown available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function buildPayrollMonths(currency: PayrollTrendCurrency) {
  const byMonth = new Map<string, number>();
  for (const p of currency.periods) byMonth.set(p.month, p.netPay);
  const out: { key: string; label: string; value: number; tip: string }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const val = byMonth.get(key) ?? 0;
    out.push({
      key,
      label: d.toLocaleDateString("en-US", { month: "short" }),
      value: val,
      tip: `${d.toLocaleDateString("en-US", { month: "long", year: "numeric" })} — ${formatCurrency(val, currency.currency)}`,
    });
  }
  return out;
}


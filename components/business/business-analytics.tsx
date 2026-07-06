"use client";

import { useMemo } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  PiggyBank,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInvoicesByBusiness } from "@/hooks/invoice/useAdminInvoice";
import { useEodByBusiness } from "@/hooks/eod/useAdminEod";
import type { Invoice, InvoiceStatus } from "@/types/invoice.types";
import type { EodReport, EodStatus } from "@/types/eod.types";

/* ────────────────────────────────────────────────────────────────────────────
   Operations analytics for the business overview.

   Pure SVG/CSS charts driven by the app's status tokens (no chart dependency).
   Palette validated with the dataviz skill: Paid/Outstanding (success/warning)
   and EOD status (success/info/warning) pass CVD-separation and contrast; every
   series carries a text label + count as the required secondary encoding, so
   nothing relies on color alone.
──────────────────────────────────────────────────────────────────────────── */

function formatCurrency(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);
  } catch {
    return `${currency} ${(value || 0).toLocaleString()}`;
  }
}

const STATUS_COLOR = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--info)",
  primary: "var(--primary)",
  muted: "var(--muted-foreground)",
} as const;

/* ── Payroll: Paid vs Outstanding ─────────────────────────────────────────── */

type PayrollStats = ReturnType<typeof computePayrollStats>;

/* Aggregate one currency's invoices. Callers group by currency first — netPay
   is never summed across currencies (mixing USD + PHP totals is meaningless). */
function computePayrollStats(currency: string, invoices: Invoice[]) {
  const bucket = (status: InvoiceStatus) =>
    invoices.filter((i) => i.status === status);
  const sum = (list: Invoice[]) =>
    list.reduce((acc, i) => acc + (i.netPay || 0), 0);

  const paid = bucket("paid");
  const approved = bucket("approved");
  const calculated = bucket("calculated");
  const draft = bucket("draft");

  const paidTotal = sum(paid);
  const outstandingStages = [
    { key: "approved", label: "Approved", list: approved, color: STATUS_COLOR.success },
    { key: "calculated", label: "Calculated", list: calculated, color: STATUS_COLOR.info },
    { key: "draft", label: "Draft", list: draft, color: STATUS_COLOR.muted },
  ].map((s) => ({ ...s, amount: sum(s.list), count: s.list.length }));

  const outstandingTotal = outstandingStages.reduce((a, s) => a + s.amount, 0);
  const grandTotal = paidTotal + outstandingTotal;
  const paidPct = grandTotal > 0 ? (paidTotal / grandTotal) * 100 : 0;

  return {
    currency,
    paidTotal,
    paidCount: paid.length,
    outstandingTotal,
    outstandingCount: approved.length + calculated.length + draft.length,
    outstandingStages,
    grandTotal,
    paidPct,
  };
}

function PayrollCard({
  invoices,
  isLoading,
}: {
  invoices: Invoice[];
  isLoading: boolean;
}) {
  const groups = useMemo(() => {
    const byCurrency = new Map<string, Invoice[]>();
    for (const inv of invoices) {
      const cur = inv.currency || "USD";
      const list = byCurrency.get(cur);
      if (list) list.push(inv);
      else byCurrency.set(cur, [inv]);
    }
    return Array.from(byCurrency, ([currency, list]) =>
      computePayrollStats(currency, list),
    )
      .filter((s) => s.grandTotal > 0)
      .sort((a, b) => b.grandTotal - a.grandTotal);
  }, [invoices]);

  const multiCurrency = groups.length > 1;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4" />
          Payroll Status
        </CardTitle>
        <CardDescription>Paid vs outstanding across all invoices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {isLoading ? (
          <PayrollSkeleton />
        ) : groups.length === 0 ? (
          <EmptyHint>No invoices generated for this business yet.</EmptyHint>
        ) : (
          groups.map((stats, i) => (
            <div
              key={stats.currency}
              className={
                i > 0
                  ? "space-y-5 border-t border-border/60 pt-5"
                  : "space-y-5"
              }
            >
              {multiCurrency && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {stats.currency}
                </p>
              )}
              <PayrollCurrencyBlock stats={stats} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function PayrollCurrencyBlock({ stats }: { stats: PayrollStats }) {
  return (
    <>
      {/* Hero: outstanding */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Outstanding
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums text-warning">
            {formatCurrency(stats.outstandingTotal, stats.currency)}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {stats.outstandingCount} invoice
            {stats.outstandingCount === 1 ? "" : "s"} awaiting payment
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Paid
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-success">
            {formatCurrency(stats.paidTotal, stats.currency)}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {stats.paidCount} settled
          </p>
        </div>
      </div>

      {/* Paid vs Outstanding bar */}
      <div>
        <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-muted/40">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{
              width: `${stats.paidPct}%`,
              background: STATUS_COLOR.success,
            }}
            title={`Paid — ${formatCurrency(stats.paidTotal, stats.currency)}`}
          />
          <div
            className="h-full flex-1 rounded-full"
            style={{ background: STATUS_COLOR.warning }}
            title={`Outstanding — ${formatCurrency(stats.outstandingTotal, stats.currency)}`}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <LegendDot color={STATUS_COLOR.success} label="Paid" />
          <span className="tabular-nums font-medium text-foreground">
            {Math.round(stats.paidPct)}% collected
          </span>
          <LegendDot color={STATUS_COLOR.warning} label="Outstanding" alignEnd />
        </div>
      </div>

      {/* Outstanding breakdown by stage */}
      <div className="space-y-2 border-t border-border/60 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Outstanding by stage
        </p>
        {stats.outstandingStages.map((s) => (
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
              <span className="text-xs text-muted-foreground/70">
                ({s.count})
              </span>
            </span>
            <span className="tabular-nums font-medium text-foreground">
              {formatCurrency(s.amount, stats.currency)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── EOD status donut ─────────────────────────────────────────────────────── */

const EOD_STATUS_META: Record<
  EodStatus,
  { label: string; color: string }
> = {
  reviewed: { label: "Reviewed", color: STATUS_COLOR.success },
  submitted: { label: "Submitted", color: STATUS_COLOR.info },
  needs_revision: { label: "Needs Revision", color: STATUS_COLOR.warning },
};

function EodStatusCard({
  eods,
  isLoading,
}: {
  eods: EodReport[];
  isLoading: boolean;
}) {
  const stats = useMemo(() => {
    const order: EodStatus[] = ["reviewed", "submitted", "needs_revision"];
    const total = eods.length;
    const segments = order
      .map((status) => {
        const count = eods.filter((e) => e.status === status).length;
        return {
          status,
          count,
          pct: total > 0 ? (count / total) * 100 : 0,
          ...EOD_STATUS_META[status],
        };
      })
      .filter((s) => s.count > 0);
    const approvedCount = eods.filter((e) => e.isApproved).length;
    return { total, segments, approvedCount };
  }, [eods]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          EOD Report Status
        </CardTitle>
        <CardDescription>Review state across all submitted reports.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <DonutSkeleton />
        ) : stats.total === 0 ? (
          <EmptyHint>No EOD reports submitted yet.</EmptyHint>
        ) : (
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Donut segments={stats.segments} total={stats.total} />
            <div className="w-full space-y-2">
              {stats.segments.map((s) => (
                <div
                  key={s.status}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: s.color }}
                    />
                    {s.label}
                  </span>
                  <span className="tabular-nums text-foreground">
                    <span className="font-medium">{s.count}</span>
                    <span className="ml-1.5 text-xs text-muted-foreground">
                      {Math.round(s.pct)}%
                    </span>
                  </span>
                </div>
              ))}
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-border/60 pt-3 text-sm">
                <span className="text-muted-foreground">Approved</span>
                <span className="tabular-nums font-medium text-success">
                  {stats.approvedCount}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    of {stats.total}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Donut({
  segments,
  total,
  size = 132,
  stroke = 16,
}: {
  segments: { status: string; count: number; pct: number; label: string; color: string }[];
  total: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const gap = segments.length > 1 ? 1.5 : 0; // % gap between arcs
  let cursor = 0;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={`EOD status distribution, ${total} reports`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
          pathLength={100}
        />
        {segments.map((s) => {
          const dash = Math.max(s.pct - gap, 0.5);
          const el = (
            <circle
              key={s.status}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              pathLength={100}
              strokeDasharray={`${dash} ${100 - dash}`}
              strokeDashoffset={-cursor}
            >
              <title>{`${s.label} — ${s.count} (${Math.round(s.pct)}%)`}</title>
            </circle>
          );
          cursor += s.pct;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums leading-none">{total}</span>
        <span className="mt-0.5 text-[11px] text-muted-foreground">reports</span>
      </div>
    </div>
  );
}

/* ── EOD activity, last 14 days ───────────────────────────────────────────── */

function EodActivityCard({
  eods,
  isLoading,
}: {
  eods: EodReport[];
  isLoading: boolean;
}) {
  const stats = useMemo(() => {
    const days: { key: string; label: string; date: Date; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push({
        key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
        label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        date: d,
        count: 0,
      });
    }
    const index = new Map(days.map((d) => [d.key, d]));
    for (const e of eods) {
      const d = new Date(e.date);
      if (Number.isNaN(d.getTime())) continue;
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const bucket = index.get(key);
      if (bucket) bucket.count += 1;
    }
    const total = days.reduce((a, d) => a + d.count, 0);
    const max = Math.max(...days.map((d) => d.count), 1);
    return { days, total, max, avg: total / 14 };
  }, [eods]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              EOD Activity
            </CardTitle>
            <CardDescription>Reports submitted over the last 14 days.</CardDescription>
          </div>
          {!isLoading && (
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums leading-none">
                {stats.total}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.avg.toFixed(1)}/day avg
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-28 w-full animate-pulse rounded-lg bg-muted/40" />
        ) : (
          <div className="flex h-28 items-end gap-1.5">
            {stats.days.map((d, i) => {
              const isToday = i === stats.days.length - 1;
              const heightPct = d.count === 0 ? 0 : (d.count / stats.max) * 100;
              return (
                <div
                  key={d.key}
                  className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  title={`${d.label} — ${d.count} report${d.count === 1 ? "" : "s"}`}
                >
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-[3px] transition-[height] duration-500 ease-out motion-reduce:transition-none"
                      style={{
                        height: `${heightPct}%`,
                        minHeight: d.count > 0 ? 4 : 2,
                        background: isToday
                          ? STATUS_COLOR.primary
                          : "color-mix(in srgb, var(--primary) 55%, transparent)",
                        opacity: d.count === 0 ? 0.25 : 1,
                      }}
                    />
                  </div>
                  <span className="text-[9px] tabular-nums text-muted-foreground">
                    {d.date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ── shared bits ──────────────────────────────────────────────────────────── */

function LegendDot({
  color,
  label,
  alignEnd,
}: {
  color: string;
  label: string;
  alignEnd?: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-1.5 text-muted-foreground ${alignEnd ? "flex-row-reverse" : ""}`}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function PayrollSkeleton() {
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

function DonutSkeleton() {
  return (
    <div className="flex items-center gap-6">
      <div className="h-[132px] w-[132px] shrink-0 animate-pulse rounded-full bg-muted/40" />
      <div className="w-full space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 w-full animate-pulse rounded bg-muted/30" />
        ))}
      </div>
    </div>
  );
}

/* ── section wrapper ──────────────────────────────────────────────────────── */

export function BusinessAnalytics({ businessId }: { businessId: string }) {
  const { data: invoicePage, isLoading: invoicesLoading } =
    useInvoicesByBusiness(businessId, { limit: "500" });
  const { data: eodPage, isLoading: eodLoading } = useEodByBusiness(businessId, {
    limit: "500",
  });

  const invoices = invoicePage?.data ?? [];
  const eods = eodPage?.data ?? [];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Operations Analytics
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PayrollCard invoices={invoices} isLoading={invoicesLoading} />
        <EodStatusCard eods={eods} isLoading={eodLoading} />
      </div>

      <EodActivityCard eods={eods} isLoading={eodLoading} />
    </section>
  );
}

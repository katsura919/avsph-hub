import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { WeeklyReport } from "@/types/client.types";

function fmtMoney(amount: number, currency: string) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
  return `${currency} ${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

function fmtDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00.000Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 34,
    paddingBottom: 50,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1f2937",
  },
  topBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0b2f4a",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  brandRow: { flexDirection: "row", alignItems: "center" },
  companyLogo: { width: 32, height: 32, borderRadius: 4, marginRight: 10 },
  companyName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  companyTagline: {
    fontSize: 7,
    color: "#dbeafe",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  reportTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  reportSubtitle: {
    color: "#bfdbfe",
    textAlign: "right",
    fontSize: 8,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  panel: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 9,
  },
  panelTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
  },
  prominentText: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    alignItems: "center",
  },
  infoKey: { color: "#64748b", fontSize: 8 },
  infoValue: { color: "#0f172a", fontSize: 8, fontFamily: "Helvetica-Bold" },

  // Summary tiles
  summaryRowWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 8,
  },
  summaryTile: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 9,
  },
  summaryTileLabel: {
    fontSize: 7,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  summaryTileValue: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#0b2f4a",
  },

  // Table
  tableSection: {
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#334155",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  tRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "#ffffff",
  },
  tRowAlt: { backgroundColor: "#fbfdff" },
  tHeadRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  cName: { width: "26%", fontSize: 8, color: "#1e293b" },
  cPos: { width: "20%", fontSize: 8, color: "#64748b" },
  cHours: { width: "11%", fontSize: 8, textAlign: "right", color: "#1e293b" },
  cDays: { width: "9%", fontSize: 8, textAlign: "right", color: "#1e293b" },
  cRate: { width: "16%", fontSize: 8, textAlign: "right", color: "#64748b" },
  cPay: {
    width: "18%",
    fontSize: 8,
    textAlign: "right",
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
  },
  headText: {
    fontSize: 7,
    color: "#64748b",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  totalRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  fixedFooter: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 5,
  },
  footerText: { fontSize: 8, color: "#64748b" },
});

export function ClientReportPDFDocument({ report }: { report: WeeklyReport }) {
  if (!report) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Banner */}
        <View style={styles.topBanner}>
          <View style={styles.brandRow}>
            <Image style={styles.companyLogo} src="/assets/logo.jpeg" />
            <View>
              <Text style={styles.companyName}>Advanced Virtual Staff</Text>
              <Text style={styles.companyTagline}>Weekly Staffing Report</Text>
            </View>
          </View>
          <View>
            <Text style={styles.reportTitle}>Weekly Report</Text>
            <Text style={styles.reportSubtitle}>
              {fmtDate(report.periodStart)} – {fmtDate(report.periodEnd)}
            </Text>
          </View>
        </View>

        {/* Client + period panels */}
        <View style={styles.panelRow}>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Client</Text>
            <Text style={styles.prominentText}>{report.client.name}</Text>
            {report.client.companyName ? (
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Company</Text>
                <Text style={styles.infoValue}>
                  {report.client.companyName}
                </Text>
              </View>
            ) : null}
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Staff Count</Text>
              <Text style={styles.infoValue}>
                {report.totals.staffCount}
              </Text>
            </View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Period</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>From</Text>
              <Text style={styles.infoValue}>{fmtDate(report.periodStart)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>To</Text>
              <Text style={styles.infoValue}>{fmtDate(report.periodEnd)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>USD Rate</Text>
              <Text style={styles.infoValue}>
                {report.usdRate
                  ? `1 USD = PHP ${report.usdRate.toFixed(2)}`
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Summary tiles */}
        <View style={styles.summaryRowWrap}>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryTileLabel}>Total Hours</Text>
            <Text style={styles.summaryTileValue}>
              {report.totals.totalHours.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryTileLabel}>Total Due (USD)</Text>
            <Text style={styles.summaryTileValue}>
              {fmtMoney(report.totals.totalBillableUsd, "USD")}
            </Text>
          </View>
          <View style={styles.summaryTile}>
            <Text style={styles.summaryTileLabel}>Staff Count</Text>
            <Text style={styles.summaryTileValue}>
              {report.totals.staffCount}
            </Text>
          </View>
        </View>

        {/* Breakdown */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Staff Breakdown</Text>
          </View>
          <View style={styles.tHeadRow}>
            <Text style={[styles.cName, styles.headText]}>Staff</Text>
            <Text style={[styles.cPos, styles.headText]}>Position</Text>
            <Text style={[styles.cHours, styles.headText]}>Hours</Text>
            <Text style={[styles.cDays, styles.headText]}>Days</Text>
            <Text style={[styles.cRate, styles.headText]}>Rate/hr</Text>
            <Text style={[styles.cPay, styles.headText]}>Amount</Text>
          </View>
          {report.staff.map((s, i) => (
            <View
              key={s.staffId}
              style={i % 2 === 1 ? [styles.tRow, styles.tRowAlt] : styles.tRow}
            >
              <Text style={styles.cName}>{s.name}</Text>
              <Text style={styles.cPos}>{s.position || "—"}</Text>
              <Text style={styles.cHours}>
                {s.totalHours.toLocaleString()}
              </Text>
              <Text style={styles.cDays}>{s.daysWorked}</Text>
              <Text style={styles.cRate}>
                {s.hasBillRate ? fmtMoney(s.billRateUsd, "USD") : "not set"}
              </Text>
              <Text style={styles.cPay}>{fmtMoney(s.billableUsd, "USD")}</Text>
            </View>
          ))}
          {report.staff.length === 0 && (
            <View style={styles.tRow}>
              <Text style={{ fontSize: 8, color: "#64748b" }}>
                No staff assigned, or no approved hours for this period.
              </Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={[styles.cName, { fontFamily: "Helvetica-Bold" }]}>
              Total
            </Text>
            <Text style={styles.cPos}> </Text>
            <Text style={[styles.cHours, { fontFamily: "Helvetica-Bold" }]}>
              {report.totals.totalHours.toLocaleString()}
            </Text>
            <Text style={styles.cDays}> </Text>
            <Text style={styles.cRate}> </Text>
            <Text style={styles.cPay}>
              {fmtMoney(report.totals.totalBillableUsd, "USD")}
            </Text>
          </View>
        </View>

        {report.totals.missingBillRateCount > 0 && (
          <Text style={{ fontSize: 7, color: "#b45309" }}>
            Note: {report.totals.missingBillRateCount} staff have no bill rate
            set and are billed at $0 ({report.missingBillRateStaff.join(", ")}).
          </Text>
        )}

        <View style={styles.fixedFooter} fixed>
          <Text style={styles.footerText}>
            Generated {fmtDate(new Date().toISOString().split("T")[0])} —{" "}
            {report.client.name}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

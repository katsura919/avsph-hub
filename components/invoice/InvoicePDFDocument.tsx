import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Helper functions (duplicated for standalone PDF generation)
function fmt(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtPeriod(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: "numeric" };
  if (s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", yearOpts)}`;
  }
  return `${s.toLocaleDateString("en-US", yearOpts)} – ${e.toLocaleDateString("en-US", yearOpts)}`;
}

const STATUTORY_TYPES = new Set(["SSS", "Pag-IBIG", "PhilHealth"]);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 10,
    color: "#6b7280",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  rightAlign: {
    textAlign: "right",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  col: {
    width: "48%",
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
  },
  colTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 4,
  },
  mutedText: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  breakdownSection: {
    marginTop: 10,
  },
  breakdownTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rowBold: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    fontFamily: "Helvetica-Bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 4,
  },
  calcPayBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderRadius: 4,
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginVertical: 4,
  },
  sectionHeading: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginTop: 12,
    marginBottom: 4,
  },
  addText: { color: "#059669" },
  dedText: { color: "#dc2626" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: 20,
    borderRadius: 6,
    marginTop: 20,
  },
  footerLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    opacity: 0.8,
    marginBottom: 2,
  },
  footerDesc: {
    fontSize: 8,
    opacity: 0.6,
  },
  footerAmount: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
  },
});

export function InvoicePDFDocument({ invoice }: { invoice: any }) {
  if (!invoice) return null;

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
  const totalStatutoryDeductions =
    (invoice.statutoryDeductions?.sss || 0) +
    (invoice.statutoryDeductions?.pagIbig || 0) +
    (invoice.statutoryDeductions?.philHealth || 0);
  const totalManualDeductions = manualDeductions.reduce(
    (sum: number, d: any) => sum + d.amount,
    0,
  );
  const totalAdditions = invoice.additions.reduce(
    (sum: number, a: any) => sum + a.amount,
    0,
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.subtitle}>Pay Statement</Text>
            <Text style={styles.title}>
              {fmtPeriod(invoice.periodStart, invoice.periodEnd)}
            </Text>
          </View>
          <View style={styles.rightAlign}>
            <Text style={styles.mutedText}>Generated</Text>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12 }}>
              {fmtDate(invoice.createdAt)}
            </Text>
          </View>
        </View>

        {/* Grid info */}
        <View style={styles.gridRow}>
          <View style={styles.col}>
            <Text style={styles.colTitle}>Employee Information</Text>
            <Text style={styles.infoText}>{staffFullName}</Text>
            <Text style={styles.mutedText}>{staffPosition}</Text>
            <Text style={styles.mutedText}>{staffEmail}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.colTitle}>Pay Structure</Text>
            <View style={styles.flexRow}>
              <Text style={styles.mutedText}>Base Rate</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {fmt(invoice.baseSalary)} / {invoice.salaryType.toLowerCase()}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.mutedText}>Hours Worked</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {invoice.totalHoursWorked.toFixed(1)} hrs
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.mutedText}>Days Worked</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {invoice.totalDaysWorked} days
              </Text>
            </View>
          </View>
        </View>

        {/* Breakdown */}
        <View style={styles.breakdownSection}>
          <Text style={styles.breakdownTitle}>Earnings Breakdown</Text>

          <View style={styles.row}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              Regular Earnings
            </Text>
            <Text>{fmt(invoice.earningsBreakdown?.regularEarnings || 0)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.mutedText}>Overtime Earnings</Text>
            <Text>{fmt(invoice.earningsBreakdown?.overtimeEarnings || 0)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.mutedText}>Sunday Premium</Text>
            <Text>
              {fmt(invoice.earningsBreakdown?.sundayPremiumEarnings || 0)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.mutedText}>Night Differential</Text>
            <Text>
              {fmt(invoice.earningsBreakdown?.nightDifferentialEarnings || 0)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.mutedText}>Transportation Allowance (PHP)</Text>
            <Text>
              {fmtPhp(
                invoice.earningsBreakdown?.transportationAllowanceEarnings || 0,
              )}
            </Text>
          </View>

          <View style={styles.calcPayBox}>
            <Text>Calculated Pay</Text>
            <Text>{fmt(invoice.calculatedPay)}</Text>
          </View>

          {/* Additions */}
          {invoice.additions.length > 0 && (
            <View>
              <Text style={[styles.sectionHeading, styles.addText]}>
                Additions
              </Text>
              {invoice.additions.map((a: any, i: number) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.mutedText}>
                    {a.type} {a.description ? `(${a.description})` : ""}
                  </Text>
                  <Text style={styles.addText}>+{fmt(a.amount)}</Text>
                </View>
              ))}
              <View style={[styles.rowBold, styles.separator]}>
                <Text>Total Additions</Text>
                <Text style={styles.addText}>+{fmt(totalAdditions)}</Text>
              </View>
            </View>
          )}

          {/* Statutory */}
          <View>
            <Text style={[styles.sectionHeading, styles.dedText]}>
              Statutory Deductions
            </Text>
            <View style={styles.row}>
              <Text style={styles.mutedText}>SSS</Text>
              <Text style={styles.dedText}>
                -{fmt(invoice.statutoryDeductions?.sss || 0)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.mutedText}>Pag-IBIG</Text>
              <Text style={styles.dedText}>
                -{fmt(invoice.statutoryDeductions?.pagIbig || 0)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.mutedText}>PhilHealth</Text>
              <Text style={styles.dedText}>
                -{fmt(invoice.statutoryDeductions?.philHealth || 0)}
              </Text>
            </View>
            <View style={[styles.rowBold, styles.separator]}>
              <Text>Total Statutory Deductions</Text>
              <Text style={styles.dedText}>
                -{fmt(totalStatutoryDeductions)}
              </Text>
            </View>
          </View>

          {/* Manual Deductions */}
          {manualDeductions.length > 0 && (
            <View>
              <Text style={[styles.sectionHeading, styles.dedText]}>
                Other Deductions
              </Text>
              {manualDeductions.map((d: any, i: number) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.mutedText}>
                    {d.type} {d.description ? `(${d.description})` : ""}
                  </Text>
                  <Text style={styles.dedText}>-{fmt(d.amount)}</Text>
                </View>
              ))}
              <View style={[styles.rowBold, styles.separator]}>
                <Text>Total Other Deductions</Text>
                <Text style={styles.dedText}>
                  -{fmt(totalManualDeductions)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerLabel}>Total Net Pay</Text>
            <Text style={styles.footerDesc}>
              Calculated Pay + Additions - Deductions
            </Text>
          </View>
          <Text style={styles.footerAmount}>{fmt(invoice.netPay)}</Text>
        </View>
      </Page>
    </Document>
  );
}

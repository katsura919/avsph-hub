import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Helper functions (duplicated for standalone PDF generation)
function fmt(amount: number, currency = "USD") {
  if (currency === "PHP") {
    return `PHP ${new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function fmtPhp(amount: number) {
  return `PHP ${new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

function fmtPhpPeso(amount: number) {
  return `PHP ${new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
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
    paddingTop: 36,
    paddingHorizontal: 34,
    paddingBottom: 54,
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
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLogo: {
    width: 34,
    height: 34,
    borderRadius: 4,
    marginRight: 10,
  },
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
  invoiceTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  invoiceSubtitle: {
    color: "#bfdbfe",
    textAlign: "right",
    fontSize: 8,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  mutedText: {
    fontSize: 8,
    color: "#64748b",
  },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  panel: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 10,
    minHeight: 100,
  },
  panelTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  prominentText: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    alignItems: "center",
  },
  infoKey: {
    color: "#64748b",
    fontSize: 8,
  },
  infoValue: {
    color: "#0f172a",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  tableSection: {
    marginBottom: 12,
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
    paddingVertical: 7,
  },
  tableTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#334155",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  tableColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  tableColLabel: {
    width: "55%",
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  tableColBasis: {
    width: "20%",
    fontSize: 8,
    color: "#64748b",
    textAlign: "right",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  tableColAmount: {
    width: "25%",
    fontSize: 8,
    color: "#64748b",
    textAlign: "right",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "#ffffff",
  },
  tableRowAlt: {
    backgroundColor: "#fbfdff",
  },
  tableLabel: {
    width: "55%",
    color: "#1e293b",
    fontSize: 8,
  },
  tableBasis: {
    width: "20%",
    color: "#64748b",
    fontSize: 8,
    textAlign: "right",
  },
  tableAmount: {
    width: "25%",
    color: "#0f172a",
    fontSize: 8,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },
  tableTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  tableTotalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#0f172a",
  },
  tableTotalAmount: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#0f172a",
    textAlign: "right",
  },
  positiveAmount: {
    color: "#047857",
  },
  negativeAmount: {
    color: "#b91c1c",
  },
  summaryPanel: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  summaryTitle: {
    textTransform: "uppercase",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.7,
    color: "#334155",
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  summaryKey: {
    color: "#64748b",
    fontSize: 8,
  },
  summaryValue: {
    color: "#0f172a",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  netPayRow: {
    marginTop: 6,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  netPayLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
  },
  netPayAmount: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#0b2f4a",
  },
  convertedNetPayAmount: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#047857",
    textAlign: "right",
  },
  fixedFooter: {
    position: "absolute",
    left: 34,
    right: 34,
    bottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 6,
  },
  footerLeft: {
    fontSize: 8,
    color: "#64748b",
  },
  footerRight: {
    fontSize: 8,
    color: "#64748b",
    textAlign: "right",
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
  const additions = invoice.additions || [];
  const deductions = invoice.deductions || [];
  const cur = invoice.currency || "PHP";
  const php = invoice.phpConversion;
  const isNonPhp = cur !== "PHP" && !!php;
  const invoiceNumber =
    invoice.invoiceNumber || invoice.referenceNumber || invoice.id || "N/A";
  const generatedAt = invoice.createdAt || new Date().toISOString();
  const phpConversionRate = Number(
    php?.exchangeRate ||
      invoice.salaryPhpConversionRate ||
      invoice.phpConversionRate ||
      invoice.exchangeRate ||
      invoice.usdToPhpRate ||
      0,
  );
  const netPay = Number(invoice.netPay || 0);
  const convertedNetPayPhp =
    typeof php?.netPayPhp === "number"
      ? php.netPayPhp
      : phpConversionRate > 0
        ? netPay * phpConversionRate
        : 0;

  const manualDeductions = deductions.filter(
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
  const totalAdditions = additions.reduce(
    (sum: number, a: any) => sum + a.amount,
    0,
  );
  const earningsRows = [
    {
      label: "Regular Earnings",
      basis: `${Number(invoice.totalHoursWorked || 0).toFixed(1)}h`,
      amount: invoice.earningsBreakdown?.regularEarnings || 0,
    },
    {
      label: "Overtime Earnings",
      basis: "OT",
      amount: invoice.earningsBreakdown?.overtimeEarnings || 0,
    },
    {
      label: "Sunday Premium",
      basis: "Sun",
      amount: invoice.earningsBreakdown?.sundayPremiumEarnings || 0,
    },
    {
      label: "Night Differential",
      basis: "ND",
      amount: invoice.earningsBreakdown?.nightDifferentialEarnings || 0,
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBanner}>
          <View style={styles.brandRow}>
            <Image style={styles.companyLogo} src="/assets/logo.jpeg" />
            <View>
              <Text style={styles.companyName}>Advanced Virtual Staff</Text>
              <Text style={styles.companyTagline}>
                Payroll and Workforce Services
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>Payroll Invoice</Text>
            <Text style={styles.invoiceSubtitle}>
              Confidential Internal Document
            </Text>
          </View>
        </View>

        <View style={styles.panelRow}>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Virtual Assistant Information</Text>
            <Text style={styles.prominentText}>{staffFullName}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Position</Text>
              <Text style={styles.infoValue}>{staffPosition}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Email</Text>
              <Text style={styles.infoValue}>{staffEmail}</Text>
            </View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Pay Structure</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Base Rate</Text>
              <Text style={styles.infoValue}>
                {fmt(invoice.baseSalary, cur)} /{" "}
                {invoice.salaryType.toLowerCase()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>PHP Conversion Rate</Text>
              <Text style={styles.infoValue}>
                {phpConversionRate > 0
                  ? `1 ${cur} = PHP ${phpConversionRate.toFixed(2)}`
                  : "N/A"}
              </Text>
            </View>
            {isNonPhp && php?.baseSalaryPhp ? (
              <View style={styles.infoRow}>
                <Text style={styles.infoKey}>Base Rate (PHP)</Text>
                <Text style={styles.infoValue}>
                  {fmtPhpPeso(php.baseSalaryPhp)}
                </Text>
              </View>
            ) : null}
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Hours Worked</Text>
              <Text style={styles.infoValue}>
                {Number(invoice.totalHoursWorked || 0).toFixed(1)} hrs
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Days Worked</Text>
              <Text style={styles.infoValue}>
                {invoice.totalDaysWorked || 0} days
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Transportation Allowance</Text>
              <Text style={styles.infoValue}>
                {fmtPhp(
                  invoice.earningsBreakdown?.transportationAllowanceEarnings ||
                    0,
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Earnings Breakdown</Text>
          </View>
          <View style={styles.tableColumns}>
            <Text style={styles.tableColLabel}>Description</Text>
            <Text style={styles.tableColBasis}>Basis</Text>
            <Text style={styles.tableColAmount}>Amount</Text>
          </View>
          {earningsRows.map((row, i) => (
            <View
              key={row.label}
              style={
                i % 2 === 1
                  ? [styles.tableRow, styles.tableRowAlt]
                  : styles.tableRow
              }
            >
              <Text style={styles.tableLabel}>{row.label}</Text>
              <Text style={styles.tableBasis}>{row.basis}</Text>
              <Text style={styles.tableAmount}>{fmt(row.amount, cur)}</Text>
            </View>
          ))}
          <View style={styles.tableTotalRow}>
            <Text style={styles.tableTotalLabel}>Calculated Pay</Text>
            <Text style={styles.tableTotalAmount}>
              {fmt(invoice.calculatedPay || 0, cur)}
            </Text>
          </View>
        </View>

        {additions.length > 0 && (
          <View style={styles.tableSection}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableTitle}>Additions</Text>
            </View>
            <View style={styles.tableColumns}>
              <Text style={styles.tableColLabel}>Description</Text>
              <Text style={styles.tableColBasis}>Type</Text>
              <Text style={styles.tableColAmount}>Amount</Text>
            </View>
            {additions.map((a: any, i: number) => (
              <View
                key={`${a.type}-${i}`}
                style={
                  i % 2 === 1
                    ? [styles.tableRow, styles.tableRowAlt]
                    : styles.tableRow
                }
              >
                <Text style={styles.tableLabel}>
                  {a.type} {a.description ? `(${a.description})` : ""}
                </Text>
                <Text style={styles.tableBasis}>ADD</Text>
                <Text style={[styles.tableAmount, styles.positiveAmount]}>
                  +{fmt(a.amount || 0, cur)}
                </Text>
              </View>
            ))}
            <View style={styles.tableTotalRow}>
              <Text style={styles.tableTotalLabel}>Total Additions</Text>
              <Text style={[styles.tableTotalAmount, styles.positiveAmount]}>
                +{fmt(totalAdditions, cur)}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Deductions</Text>
          </View>
          <View style={styles.tableColumns}>
            <Text style={styles.tableColLabel}>Description</Text>
            <Text style={styles.tableColBasis}>Type</Text>
            <Text style={styles.tableColAmount}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>SSS</Text>
            <Text style={styles.tableBasis}>STAT</Text>
            <Text style={[styles.tableAmount, styles.negativeAmount]}>
              -{fmt(invoice.statutoryDeductions?.sss || 0, cur)}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.tableLabel}>Pag-IBIG</Text>
            <Text style={styles.tableBasis}>STAT</Text>
            <Text style={[styles.tableAmount, styles.negativeAmount]}>
              -{fmt(invoice.statutoryDeductions?.pagIbig || 0, cur)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>PhilHealth</Text>
            <Text style={styles.tableBasis}>STAT</Text>
            <Text style={[styles.tableAmount, styles.negativeAmount]}>
              -{fmt(invoice.statutoryDeductions?.philHealth || 0, cur)}
            </Text>
          </View>
          {manualDeductions.map((d: any, i: number) => (
            <View
              key={`${d.type}-${i}`}
              style={
                i % 2 === 0
                  ? [styles.tableRow, styles.tableRowAlt]
                  : styles.tableRow
              }
            >
              <Text style={styles.tableLabel}>
                {d.type} {d.description ? `(${d.description})` : ""}
              </Text>
              <Text style={styles.tableBasis}>OTHER</Text>
              <Text style={[styles.tableAmount, styles.negativeAmount]}>
                -{fmt(d.amount || 0, cur)}
              </Text>
            </View>
          ))}
          <View style={styles.tableTotalRow}>
            <Text style={styles.tableTotalLabel}>Total Deductions</Text>
            <Text style={[styles.tableTotalAmount, styles.negativeAmount]}>
              -{fmt(totalStatutoryDeductions + totalManualDeductions, cur)}
            </Text>
          </View>
        </View>

        <View style={styles.summaryPanel} wrap={false}>
          <Text style={styles.summaryTitle}>Payroll Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Calculated Pay</Text>
            <Text style={styles.summaryValue}>
              {fmt(invoice.calculatedPay || 0, cur)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Additions</Text>
            <Text style={[styles.summaryValue, styles.positiveAmount]}>
              +{fmt(totalAdditions, cur)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Statutory Deductions</Text>
            <Text style={[styles.summaryValue, styles.negativeAmount]}>
              -{fmt(totalStatutoryDeductions, cur)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Other Deductions</Text>
            <Text style={[styles.summaryValue, styles.negativeAmount]}>
              -{fmt(totalManualDeductions, cur)}
            </Text>
          </View>
          <View style={styles.netPayRow}>
            <Text style={styles.netPayLabel}>Net Pay</Text>
            <Text style={styles.netPayAmount}>{fmt(netPay, cur)}</Text>
          </View>
          {phpConversionRate > 0 ? (
            <>
              <View style={[styles.summaryRow, { marginTop: 4 }]}>
                <Text style={styles.summaryKey}>Net Pay (PHP)</Text>
                <Text style={styles.convertedNetPayAmount}>
                  {fmtPhpPeso(convertedNetPayPhp)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey}>Rate Used</Text>
                <Text style={styles.summaryValue}>
                  1 {cur} = PHP {phpConversionRate.toFixed(2)}
                </Text>
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.fixedFooter} fixed>
          <Text style={styles.footerLeft}>
            Generated {fmtDate(generatedAt)} | Reference {invoiceNumber}
          </Text>
          <Text
            style={styles.footerRight}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

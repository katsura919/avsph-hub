import type { Lead } from "@/types/leads.types";

// Columns included in a CSV export (full set, independent of table visibility)
const CSV_COLUMNS: { key: keyof Lead; header: string }[] = [
  { key: "firstName", header: "First Name" },
  { key: "lastName", header: "Last Name" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "company", header: "Company" },
  { key: "source", header: "Source" },
  { key: "status", header: "Status" },
  { key: "tags", header: "Tags" },
  { key: "notes", header: "Notes" },
  { key: "createdAt", header: "Created At" },
];

// Escape a single CSV cell per RFC 4180 (quote if it contains , " or newline)
function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = Array.isArray(value) ? value.join("; ") : String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function leadsToCsv(leads: Lead[]): string {
  const header = CSV_COLUMNS.map((c) => escapeCell(c.header)).join(",");
  const rows = leads.map((lead) =>
    CSV_COLUMNS.map((c) => escapeCell(lead[c.key])).join(","),
  );
  return [header, ...rows].join("\r\n");
}

// Trigger a client-side download of the given CSV text
export function downloadCsv(filename: string, csv: string): void {
  // BOM so Excel reads UTF-8 correctly
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

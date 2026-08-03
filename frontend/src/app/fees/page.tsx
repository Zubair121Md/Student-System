"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { feeInvoices, feeStructures } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

export default function FeesPage() {
  return (
    <AppShell title="Fees" subtitle="Structures and invoices">
      <PageHeader eyebrow="Operations" title="Fee management" subtitle="Installments, discounts, and receipts" />
      <h3 className="mb-3 text-sm font-semibold text-slate-500">Fee structures</h3>
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "grade", label: "Grade" },
          { key: "total", label: "Total" },
          { key: "installments", label: "Installments" },
        ]}
        rows={feeStructures.map((f) => ({
          name: f.name,
          grade: f.grade,
          total: formatCurrency(f.total),
          installments: String(f.installments),
        }))}
      />
      <h3 className="mb-3 mt-8 text-sm font-semibold text-slate-500">Invoices</h3>
      <DataTable
        columns={[
          { key: "no", label: "Invoice" },
          { key: "student", label: "Student" },
          { key: "grade", label: "Grade" },
          { key: "net", label: "Net" },
          { key: "due", label: "Due" },
          { key: "status", label: "Status" },
        ]}
        rows={feeInvoices.map((i) => ({
          no: <span className="font-semibold">{i.no}</span>,
          student: i.student,
          grade: i.grade,
          net: formatCurrency(i.net),
          due: i.due,
          status: <StatusPill status={i.status} />,
        }))}
      />
    </AppShell>
  );
}

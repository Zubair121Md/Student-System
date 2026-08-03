"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill } from "@/components/ui";
import { feeInvoices, feeStructures } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

export default function FeesPage() {
  return (
    <AppShell title="Fee management" subtitle="Structures, installments, discounts, receipts">
      <h2 className="mb-3 text-sm font-semibold">Fee structures</h2>
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
      <h2 className="mb-3 mt-8 text-sm font-semibold">Invoices</h2>
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
          no: <span className="font-medium">{i.no}</span>,
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export default function FeesPage() {
  const invoices = useQuery({
    queryKey: ["fees"],
    queryFn: () => api<Record<string, unknown>[]>("/fees/invoices?limit=80"),
  });
  const structures = useQuery({
    queryKey: ["fee-structures"],
    queryFn: () => api<Record<string, unknown>[]>("/fees/structures"),
  });

  return (
    <AppShell>
      <PageHeader title="Fee management" subtitle="Structures, installments, scholarships, late fees, receipts" />
      <h2 className="font-medium mb-2">Fee structures</h2>
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "grade", label: "Grade" },
          { key: "total", label: "Total" },
          { key: "installments", label: "Installments" },
        ]}
        rows={(structures.data || []).slice(0, 20).map((f) => ({
          name: String(f.name),
          grade: String(f.grade),
          total: formatCurrency(Number(f.total_amount)),
          installments: String(f.installments),
        }))}
      />
      <h2 className="font-medium mt-8 mb-2">Invoices</h2>
      <DataTable
        columns={[
          { key: "invoice_no", label: "Invoice" },
          { key: "student", label: "Student" },
          { key: "grade", label: "Grade" },
          { key: "net", label: "Net" },
          { key: "due", label: "Due" },
          { key: "status", label: "Status" },
        ]}
        rows={(invoices.data || []).map((i) => ({
          invoice_no: String(i.invoice_no),
          student: `${i.student_name} (${i.student_id})`,
          grade: String(i.grade),
          net: formatCurrency(Number(i.net_amount)),
          due: String(i.due_date),
          status: <StatusPill status={String(i.status)} />,
        }))}
      />
    </AppShell>
  );
}

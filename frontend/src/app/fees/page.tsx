"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { feeStructures } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { scopedFees } from "@/lib/rbac";
import { formatCurrency } from "@/lib/utils";

export default function FeesPage() {
  const { user } = useAuth();
  if (!user) return null;
  const invoices = scopedFees(user);
  const showStructures = ["super_admin", "accountant", "principal"].includes(user.role);

  return (
    <AppShell title="Fees" subtitle="Invoices in your scope">
      <PageHeader
        eyebrow="Operations"
        title="Fee management"
        subtitle={
          user.role === "parent" || user.role === "student"
            ? "Your fee invoices and dues"
            : user.role === "accountant"
              ? "Hyderabad collections desk"
              : "Scoped fee records"
        }
      />
      {showStructures && (
        <>
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
        </>
      )}
      <DataTable
        columns={[
          { key: "no", label: "Invoice" },
          { key: "student", label: "Student" },
          { key: "grade", label: "Grade" },
          { key: "net", label: "Net" },
          { key: "due", label: "Due" },
          { key: "status", label: "Status" },
        ]}
        rows={invoices.map((i) => ({
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

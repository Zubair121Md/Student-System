"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { employees, payroll } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

export default function HRPage() {
  return (
    <AppShell title="HR & payroll" subtitle="Staff and salary runs">
      <PageHeader eyebrow="People" title="HR & payroll" subtitle="Employees and monthly payroll" />
      <h3 className="mb-3 text-sm font-semibold text-slate-500">Employees</h3>
      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "designation", label: "Designation" },
          { key: "dept", label: "Department" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status" },
        ]}
        rows={employees.map((e) => ({
          id: e.id,
          name: e.name,
          designation: e.designation,
          dept: e.dept,
          email: e.email,
          status: <StatusPill status={e.status} />,
        }))}
      />
      <h3 className="mb-3 mt-8 text-sm font-semibold text-slate-500">Payroll</h3>
      <DataTable
        columns={[
          { key: "employee", label: "Employee" },
          { key: "month", label: "Month" },
          { key: "gross", label: "Gross" },
          { key: "deductions", label: "Deductions" },
          { key: "net", label: "Net" },
          { key: "status", label: "Status" },
        ]}
        rows={payroll.map((p) => ({
          employee: p.employee,
          month: p.month,
          gross: formatCurrency(p.gross),
          deductions: formatCurrency(p.deductions),
          net: formatCurrency(p.net),
          status: <StatusPill status={p.status} />,
        }))}
      />
    </AppShell>
  );
}

"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedEmployees, scopedPayroll } from "@/lib/rbac";
import { formatCurrency } from "@/lib/utils";

export default function HRPage() {
  const { user } = useAuth();
  if (!user) return null;
  const emps = scopedEmployees(user);
  const pay = scopedPayroll(user);

  return (
    <AppShell title="HR & payroll" subtitle="Staff in your scope">
      <PageHeader
        eyebrow="People"
        title="HR & payroll"
        subtitle={user.role === "hr" ? "Campus workforce and July payroll" : "Your HR records"}
      />
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
        rows={emps.map((e) => ({
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
        rows={pay.map((p) => ({
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

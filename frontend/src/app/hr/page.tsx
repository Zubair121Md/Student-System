"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

export default function HRPage() {
  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => api<Record<string, unknown>[]>("/hr/employees"),
  });
  const payroll = useQuery({
    queryKey: ["payroll"],
    queryFn: () => api<Record<string, unknown>[]>("/hr/payroll"),
  });

  return (
    <AppShell>
      <PageHeader title="HR & payroll" subtitle="Employees, leave, payroll runs, and appraisals" />
      <h2 className="font-medium mb-2">Employees</h2>
      <DataTable
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "designation", label: "Designation" },
          { key: "department", label: "Dept" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status" },
        ]}
        rows={(employees.data || []).map((e) => ({
          id: String(e.employee_id),
          name: String(e.full_name),
          designation: String(e.designation),
          department: String(e.department),
          email: String(e.email),
          status: <StatusPill status={String(e.status)} />,
        }))}
      />
      <h2 className="font-medium mt-8 mb-2">Payroll</h2>
      <DataTable
        columns={[
          { key: "employee", label: "Employee" },
          { key: "month", label: "Month" },
          { key: "gross", label: "Gross" },
          { key: "deductions", label: "Deductions" },
          { key: "net", label: "Net" },
          { key: "status", label: "Status" },
        ]}
        rows={(payroll.data || []).map((p) => ({
          employee: String(p.employee),
          month: String(p.month),
          gross: formatCurrency(Number(p.gross)),
          deductions: formatCurrency(Number(p.deductions)),
          net: formatCurrency(Number(p.net)),
          status: <StatusPill status={String(p.status)} />,
        }))}
      />
    </AppShell>
  );
}

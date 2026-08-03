"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatCard } from "@/components/ui";
import { api } from "@/lib/api";
import { formatCurrency, COMPANY } from "@/lib/utils";

type Summary = {
  campuses: number;
  students: number;
  employees: number;
  admissions: number;
  pending_fee_invoices: number;
  attendance_today: { present: number; absent: number };
  open_workflows: number;
  fees: { collected: number; pending: number };
};

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api<Summary>("/dashboard/summary"),
  });

  const feeData = [
    { name: "Collected", value: data?.fees.collected || 0 },
    { name: "Pending", value: data?.fees.pending || 0 },
  ];
  const attendanceData = [
    { name: "Present", value: data?.attendance_today.present || 0 },
    { name: "Absent", value: data?.attendance_today.absent || 0 },
  ];
  const COLORS = ["#0f6b4c", "#c45c26"];

  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        subtitle={`Overview across campuses · ${COMPANY}`}
      />
      {isLoading || !data ? (
        <p className="text-sm text-[var(--muted)]">Loading summary…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
            <StatCard label="Campuses" value={data.campuses} />
            <StatCard label="Students" value={data.students.toLocaleString("en-IN")} />
            <StatCard label="Staff" value={data.employees} />
            <StatCard label="Admissions" value={data.admissions} />
            <StatCard label="Pending fee invoices" value={data.pending_fee_invoices} />
            <StatCard
              label="Fees collected"
              value={formatCurrency(data.fees.collected)}
            />
            <StatCard
              label="Fees pending"
              value={formatCurrency(data.fees.pending)}
            />
            <StatCard label="Open workflows" value={data.open_workflows} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 h-80">
              <p className="text-sm font-medium mb-4">Fee collection</p>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={feeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9d2c3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} />
                  <Bar dataKey="value" fill="#0f6b4c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 h-80">
              <p className="text-sm font-medium mb-4">Attendance snapshot</p>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie data={attendanceData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                    {attendanceData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}

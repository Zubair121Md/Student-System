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
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatCard } from "@/components/ui";
import { api } from "@/lib/api";
import { formatCurrency, COMPANY } from "@/lib/utils";

export default function AnalyticsPage() {
  const summary = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: () => api<Record<string, unknown>>("/dashboard/summary"),
  });
  const admissions = useQuery({
    queryKey: ["adm-a"],
    queryFn: () => api<{ by_status: Record<string, number> }>("/admissions/analytics"),
  });
  const attendance = useQuery({
    queryKey: ["att-a"],
    queryFn: () => api<{ by_status: Record<string, number> }>("/attendance/analytics"),
  });

  const admData = Object.entries(admissions.data?.by_status || {}).map(([name, value]) => ({
    name,
    value,
  }));
  const attData = Object.entries(attendance.data?.by_status || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const fees = summary.data?.fees as { collected: number; pending: number } | undefined;

  return (
    <AppShell>
      <PageHeader title="Analytics" subtitle={`Reports and compliance views · ${COMPANY}`} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <StatCard label="Students" value={Number(summary.data?.students || 0).toLocaleString("en-IN")} />
        <StatCard label="Campuses" value={Number(summary.data?.campuses || 0)} />
        <StatCard label="Fees collected" value={formatCurrency(fees?.collected || 0)} />
        <StatCard label="Fees pending" value={formatCurrency(fees?.pending || 0)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 h-80">
          <p className="text-sm font-medium mb-3">Admissions by status</p>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={admData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9d2c3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0f6b4c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 h-80">
          <p className="text-sm font-medium mb-3">Attendance distribution</p>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={attData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9d2c3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#c45c26" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}

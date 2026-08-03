"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/AppShell";
import { Panel, StatCard, PageHeader } from "@/components/ui";
import { admissionByStatus, attendanceByStatus, summary } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle="Reports snapshot">
      <PageHeader eyebrow="Overview" title="Analytics" subtitle="Admissions, attendance, and fees" />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students" value={summary.students.toLocaleString("en-IN")} />
        <StatCard label="Campuses" value={String(summary.campuses)} />
        <StatCard label="Collected" value={formatCurrency(summary.feesCollected)} />
        <StatCard label="Pending" value={formatCurrency(summary.feesPending)} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Admissions by status">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" hide />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Attendance distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0b1220" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

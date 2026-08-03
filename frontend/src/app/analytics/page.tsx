"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/AppShell";
import { Panel, Stat } from "@/components/ui";
import { admissionByStatus, attendanceByStatus, summary } from "@/data/mock";
import { formatCurrency, COMPANY } from "@/lib/utils";

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle={`Reports snapshot · ${COMPANY}`}>
      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Students" value={summary.students.toLocaleString("en-IN")} tone="brand" />
        <Stat label="Campuses" value={summary.campuses} />
        <Stat label="Collected" value={formatCurrency(summary.feesCollected)} />
        <Stat label="Pending" value={formatCurrency(summary.feesPending)} tone="accent" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Admissions by status">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce3ea" />
                <XAxis dataKey="name" hide />
                <YAxis tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0b6e4f" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Attendance distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce3ea" />
                <XAxis dataKey="name" tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <YAxis tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1f4e79" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

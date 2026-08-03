"use client";

import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Panel, Stat } from "@/components/ui";
import { admissionByStatus, attendanceByStatus, summary } from "@/data/mock";
import { formatCurrency, COMPANY } from "@/lib/utils";

const feeTrend = [
  { m: "Mar", collected: 28, pending: 12 },
  { m: "Apr", collected: 32, pending: 11 },
  { m: "May", collected: 30, pending: 14 },
  { m: "Jun", collected: 36, pending: 10 },
  { m: "Jul", collected: 41, pending: 12 },
  { m: "Aug", collected: 38, pending: 11.5 },
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle={`Campus overview · ${COMPANY}`}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Campuses" value={summary.campuses} tone="brand" />
        <Stat label="Students" value={summary.students.toLocaleString("en-IN")} />
        <Stat label="Staff" value={summary.employees} />
        <Stat label="Open admissions" value={summary.admissions} tone="accent" />
        <Stat label="Fees collected" value={formatCurrency(summary.feesCollected)} hint="YTD sample" tone="brand" />
        <Stat label="Fees pending" value={formatCurrency(summary.feesPending)} />
        <Stat label="Present today" value={summary.presentToday.toLocaleString("en-IN")} />
        <Stat label="Workflows" value={summary.openWorkflows} hint="Awaiting approval" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Fee collection trend (₹ Lakh)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0b6e4f" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0b6e4f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce3ea" />
                <XAxis dataKey="m" tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <YAxis tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="collected" stroke="#0b6e4f" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Admissions pipeline">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce3ea" />
                <XAxis dataKey="name" tick={{ fill: "#5b6b78", fontSize: 11 }} interval={0} angle={-18} textAnchor="end" height={55} />
                <YAxis tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1f4e79" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-4">
        <Panel title="Attendance distribution">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceByStatus} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dce3ea" />
                <XAxis type="number" tick={{ fill: "#5b6b78", fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#5b6b78", fontSize: 12 }} width={70} />
                <Tooltip />
                <Bar dataKey="value" fill="#0b6e4f" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

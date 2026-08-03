"use client";

import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart,
} from "recharts";
import Link from "next/link";
import { ArrowRight, UserPlus, Users, Wallet, CalendarCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, StatCard, PageHeader } from "@/components/ui";
import { admissionByStatus, attendanceByStatus, summary } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

const feeTrend = [
  { m: "Mar", collected: 28 },
  { m: "Apr", collected: 32 },
  { m: "May", collected: 30 },
  { m: "Jun", collected: 36 },
  { m: "Jul", collected: 41 },
  { m: "Aug", collected: 38 },
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Today's operating pulse across campuses" eyebrow="Owner overview">
      <PageHeader
        eyebrow="Owner overview"
        title="Campus dashboard"
        subtitle="Admissions, attendance, fees, and staffing at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Campuses" value={String(summary.campuses)} hint="Active branches" />
        <StatCard label="Students" value={summary.students.toLocaleString("en-IN")} hint="Enrolled across campuses" />
        <StatCard label="Staff" value={String(summary.employees)} hint="Teachers and ops" />
        <StatCard label="Open admissions" value={String(summary.admissions)} hint="In pipeline" />
        <StatCard label="Fees collected" value={formatCurrency(summary.feesCollected)} hint="YTD sample" />
        <StatCard label="Fees pending" value={formatCurrency(summary.feesPending)} hint="Outstanding invoices" />
        <StatCard label="Present today" value={summary.presentToday.toLocaleString("en-IN")} hint={`${summary.absentToday} absent`} />
        <StatCard label="Workflows" value={String(summary.openWorkflows)} hint="Awaiting approval" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Fee collection trend (₹ Lakh)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f766e" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="m" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="collected" stroke="#0f766e" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Admissions pipeline">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0b1220" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Attendance distribution">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceByStatus} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} width={70} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f766e" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <QuickLink href="/admissions" icon={<UserPlus className="h-5 w-5" />} label="Review admissions" />
        <QuickLink href="/students" icon={<Users className="h-5 w-5" />} label="Student master" />
        <QuickLink href="/fees" icon={<Wallet className="h-5 w-5" />} label="Fee invoices" />
        <QuickLink href="/attendance" icon={<CalendarCheck className="h-5 w-5" />} label="Attendance" />
      </div>
    </AppShell>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold shadow-soft transition hover:border-accent"
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ArrowRight className="h-4 w-4 text-accent" />
    </Link>
  );
}

"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/AppShell";
import { Panel, StatCard, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import {
  roleStats,
  scopedAdmissions,
  scopedAttendance,
  scopedFees,
  admissionByStatus,
  attendanceByStatus,
} from "@/lib/rbac";

export default function AnalyticsPage() {
  const { user } = useAuth();
  if (!user) return null;
  const stats = roleStats(user).slice(0, 4);
  const fees = scopedFees(user);
  const adm = scopedAdmissions(user);
  const att = scopedAttendance(user);

  const localAdm =
    user.role === "super_admin"
      ? admissionByStatus
      : Object.entries(
          adm.reduce<Record<string, number>>((a, x) => {
            a[x.status] = (a[x.status] || 0) + 1;
            return a;
          }, {})
        ).map(([name, value]) => ({ name, value }));

  const localAtt =
    user.role === "super_admin"
      ? attendanceByStatus
      : Object.entries(
          att.reduce<Record<string, number>>((a, x) => {
            a[x.status] = (a[x.status] || 0) + 1;
            return a;
          }, {})
        ).map(([name, value]) => ({ name, value }));

  return (
    <AppShell title="Analytics" subtitle="Metrics for your role">
      <PageHeader
        eyebrow="Overview"
        title="Analytics"
        subtitle={
          user.role === "accountant"
            ? `Collections view · ${fees.length} invoices in scope`
            : "Charts reflect your data scope"
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title={user.role === "accountant" ? "Invoice statuses" : "Admissions by status"}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  user.role === "accountant"
                    ? Object.entries(
                        fees.reduce<Record<string, number>>((a, f) => {
                          a[f.status] = (a[f.status] || 0) + 1;
                          return a;
                        }, {})
                      ).map(([name, value]) => ({ name, value }))
                    : localAdm
                }
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Attendance sample">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={localAtt.length ? localAtt : [{ name: "n/a", value: 0 }]}>
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

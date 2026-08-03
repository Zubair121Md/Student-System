"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, StatCard, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedAttendance } from "@/lib/rbac";

export default function AttendancePage() {
  const { user } = useAuth();
  if (!user) return null;
  const rows = scopedAttendance(user);
  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <AppShell title="Attendance" subtitle="Records for your scope">
      <PageHeader
        eyebrow="Academics"
        title="Attendance"
        subtitle={
          user.role === "teacher"
            ? "Class 10-A recent marks"
            : user.role === "parent" || user.role === "student"
              ? "Your linked attendance history"
              : "Scoped attendance records"
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(counts).map(([name, value]) => (
          <StatCard key={name} label={name} value={String(value)} />
        ))}
      </div>
      <DataTable
        columns={[
          { key: "date", label: "Date" },
          { key: "student", label: "Student" },
          { key: "status", label: "Status" },
          { key: "mode", label: "Mode" },
          { key: "in", label: "In" },
          { key: "out", label: "Out" },
        ]}
        rows={rows.map((r) => ({
          date: r.date,
          student: r.student,
          status: <StatusPill status={r.status} />,
          mode: <span className="capitalize">{r.mode}</span>,
          in: r.in,
          out: r.out,
        }))}
      />
    </AppShell>
  );
}

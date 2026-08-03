"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatCard, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function AttendancePage() {
  const list = useQuery({
    queryKey: ["attendance"],
    queryFn: () => api<Record<string, unknown>[]>("/attendance?limit=80"),
  });
  const analytics = useQuery({
    queryKey: ["attendance-analytics"],
    queryFn: () =>
      api<{ by_status: Record<string, number>; by_mode: Record<string, number> }>(
        "/attendance/analytics"
      ),
  });

  return (
    <AppShell>
      <PageHeader
        title="Attendance"
        subtitle="RFID · Biometric · QR · Mobile · Classroom · Bus · Hostel"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {Object.entries(analytics.data?.by_status || {}).map(([k, v]) => (
          <StatCard key={k} label={k} value={v} />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {Object.entries(analytics.data?.by_mode || {}).map(([k, v]) => (
          <StatCard key={k} label={`Mode: ${k}`} value={v} />
        ))}
      </div>
      <DataTable
        columns={[
          { key: "date", label: "Date" },
          { key: "student_id", label: "Student #" },
          { key: "status", label: "Status" },
          { key: "mode", label: "Mode" },
          { key: "check_in", label: "In" },
          { key: "check_out", label: "Out" },
        ]}
        rows={(list.data || []).map((r) => ({
          date: String(r.date),
          student_id: String(r.student_id),
          status: <StatusPill status={String(r.status)} />,
          mode: String(r.mode),
          check_in: String(r.check_in || "—"),
          check_out: String(r.check_out || "—"),
        }))}
      />
    </AppShell>
  );
}

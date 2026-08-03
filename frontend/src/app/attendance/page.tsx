"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, Stat } from "@/components/ui";
import { attendance, attendanceByStatus } from "@/data/mock";

export default function AttendancePage() {
  return (
    <AppShell title="Attendance" subtitle="RFID · biometric · QR · classroom · bus · hostel">
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {attendanceByStatus.map((s) => (
          <Stat key={s.name} label={s.name} value={s.value.toLocaleString("en-IN")} />
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
        rows={attendance.map((r) => ({
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

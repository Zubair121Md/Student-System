"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function ExamsPage() {
  const { data } = useQuery({
    queryKey: ["exams"],
    queryFn: () => api<Record<string, unknown>[]>("/exams"),
  });

  return (
    <AppShell>
      <PageHeader title="Examinations" subtitle="Schedules, halls, invigilators, and result publishing" />
      <div className="space-y-4">
        {(data || []).map((exam) => (
          <div key={String(exam.id)} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <p className="font-display text-xl">{String(exam.name)}</p>
                <p className="text-sm text-[var(--muted)]">
                  {String(exam.start_date)} → {String(exam.end_date)} · {String(exam.exam_type)}
                </p>
              </div>
              <StatusPill status={String(exam.status)} />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-[var(--muted)]">
                  <tr>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Grade</th>
                    <th className="py-2 text-left">Time</th>
                    <th className="py-2 text-left">Room</th>
                    <th className="py-2 text-left">Invigilator</th>
                  </tr>
                </thead>
                <tbody>
                  {((exam.schedules as Record<string, unknown>[]) || []).map((s) => (
                    <tr key={String(s.id)} className="border-t border-[var(--line)]">
                      <td className="py-2">{String(s.exam_date)}</td>
                      <td className="py-2">{String(s.grade)}</td>
                      <td className="py-2">
                        {String(s.start_time)} – {String(s.end_time)}
                      </td>
                      <td className="py-2">{String(s.room)}</td>
                      <td className="py-2">{String(s.invigilator_id || "—")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { api } from "@/lib/api";

export default function TimetablePage() {
  const { data } = useQuery({
    queryKey: ["timetable"],
    queryFn: () => api<Record<string, unknown>[]>("/timetable?grade=10&section=A"),
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const periods = [1, 2, 3, 4, 5, 6];
  const map = new Map<string, Record<string, unknown>>();
  (data || []).forEach((slot) => {
    map.set(`${slot.day_of_week}-${slot.period}`, slot);
  });

  return (
    <AppShell>
      <PageHeader title="Timetable" subtitle="Grade 10-A · conflict-aware scheduling sample" />
      <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--panel)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--bg)] text-xs uppercase text-[var(--muted)]">
            <tr>
              <th className="px-3 py-3 text-left">Period</th>
              {days.map((d) => (
                <th key={d} className="px-3 py-3 text-left">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((p) => (
              <tr key={p} className="border-t border-[var(--line)]">
                <td className="px-3 py-3 font-medium">P{p}</td>
                {days.map((_, di) => {
                  const slot = map.get(`${di}-${p}`);
                  return (
                    <td key={di} className="px-3 py-3 align-top">
                      {slot ? (
                        <div>
                          <p className="font-medium">{String(slot.subject)}</p>
                          <p className="text-xs text-[var(--muted)]">{String(slot.teacher)}</p>
                          <p className="text-xs text-[var(--muted)]">{String(slot.room)}</p>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

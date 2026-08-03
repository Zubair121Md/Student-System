"use client";

import { AppShell } from "@/components/AppShell";
import { Panel, StatusPill } from "@/components/ui";
import { exams } from "@/data/mock";

export default function ExamsPage() {
  return (
    <AppShell title="Examinations" subtitle="Schedules, halls, and invigilators">
      <div className="space-y-4">
        {exams.map((exam) => (
          <Panel
            key={exam.id}
            title={exam.name}
            action={<StatusPill status={exam.status} />}
          >
            <p className="mb-4 text-sm text-[var(--muted)]">{exam.range} · {exam.type.replaceAll("_", " ")}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider text-[var(--muted)]">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Subject</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Room</th>
                    <th className="pb-2">Invigilator</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.schedules.map((s) => (
                    <tr key={s.date + s.subject} className="border-t border-[var(--line)]">
                      <td className="py-2.5">{s.date}</td>
                      <td className="py-2.5 font-medium">{s.subject}</td>
                      <td className="py-2.5">{s.time}</td>
                      <td className="py-2.5">{s.room}</td>
                      <td className="py-2.5">{s.invigilator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}

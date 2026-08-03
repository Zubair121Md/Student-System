"use client";

import { AppShell } from "@/components/AppShell";
import { Panel, StatusPill, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedExams } from "@/lib/rbac";

export default function ExamsPage() {
  const { user } = useAuth();
  if (!user) return null;
  const exams = scopedExams(user);

  return (
    <AppShell title="Examinations" subtitle="Schedules in your scope">
      <PageHeader eyebrow="Academics" title="Examinations" subtitle="Hall plans relevant to your role" />
      <div className="space-y-4">
        {exams.map((exam) => (
          <Panel key={exam.id} title={exam.name} action={<StatusPill status={exam.status} />}>
            <p className="mb-4 text-sm text-slate-500">
              {exam.range} · {exam.type.replaceAll("_", " ")}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Subject</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Room</th>
                    <th className="pb-2">Invigilator</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.schedules.map((s) => (
                    <tr key={s.date + s.subject} className="border-t border-slate-100">
                      <td className="py-2.5">{s.date}</td>
                      <td className="py-2.5 font-semibold">{s.subject}</td>
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
        {!exams.length && <p className="text-sm text-slate-500">No exams in your scope.</p>}
      </div>
    </AppShell>
  );
}

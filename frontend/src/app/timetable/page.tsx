"use client";

import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { timetable } from "@/data/mock";

const PERIODS = ["P1", "P2", "P3", "Break", "P4", "P5"];

export default function TimetablePage() {
  return (
    <AppShell title="Timetable" subtitle="Grade 10-A weekly schedule">
      <PageHeader eyebrow="Academics" title="Timetable" subtitle="Class periods and breaks" />
      <Panel>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Day</th>
                {PERIODS.map((p) => (
                  <th key={p} className="px-2 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row) => (
                <tr key={row.day} className="border-b border-slate-100 last:border-0">
                  <td className="px-2 py-3 font-semibold">{row.day}</td>
                  {row.periods.map((sub, i) => (
                    <td key={i} className="px-2 py-3">
                      <span
                        className={`inline-flex rounded-xl px-2.5 py-1.5 text-xs font-semibold ${
                          sub === "Break" ? "bg-slate-100 text-slate-500" : "bg-accentSoft text-accent"
                        }`}
                      >
                        {sub}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}

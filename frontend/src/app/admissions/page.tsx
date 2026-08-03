"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, Stat } from "@/components/ui";
import { admissions, admissionByStatus } from "@/data/mock";

export default function AdmissionsPage() {
  return (
    <AppShell title="Admissions" subtitle="Application → verification → assessment → approval → enrollment">
      <div className="mb-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {admissionByStatus.map((s) => (
          <Stat key={s.name} label={s.name} value={s.value} />
        ))}
      </div>
      <DataTable
        columns={[
          { key: "no", label: "Application" },
          { key: "name", label: "Applicant" },
          { key: "grade", label: "Grade" },
          { key: "parent", label: "Parent" },
          { key: "campus", label: "Campus" },
          { key: "entrance", label: "Entrance" },
          { key: "merit", label: "Merit" },
          { key: "status", label: "Status" },
        ]}
        rows={admissions.map((a) => ({
          no: <span className="font-medium text-[var(--brand)]">{a.no}</span>,
          name: a.name,
          grade: a.grade,
          parent: a.parent,
          campus: a.campus,
          entrance: a.entrance ?? "—",
          merit: a.merit ?? "—",
          status: <StatusPill status={a.status} />,
        }))}
      />
    </AppShell>
  );
}

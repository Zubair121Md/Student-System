"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, StatCard, PageHeader } from "@/components/ui";
import { admissions, admissionByStatus } from "@/data/mock";

export default function AdmissionsPage() {
  return (
    <AppShell title="Admissions" subtitle="Application through enrollment pipeline">
      <PageHeader eyebrow="People" title="Admissions" subtitle="Application → verification → assessment → approval → enrollment" />
      <div className="mb-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {admissionByStatus.map((s) => (
          <StatCard key={s.name} label={s.name} value={String(s.value)} />
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
          no: <span className="font-semibold text-accent">{a.no}</span>,
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

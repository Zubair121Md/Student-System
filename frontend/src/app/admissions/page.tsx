"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, StatCard, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedAdmissions } from "@/lib/rbac";

export default function AdmissionsPage() {
  const { user } = useAuth();
  if (!user) return null;
  const rows = scopedAdmissions(user);
  const byStatus = Object.entries(
    rows.reduce<Record<string, number>>((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {})
  );

  return (
    <AppShell title="Admissions" subtitle="Scoped to your campus access">
      <PageHeader
        eyebrow="People"
        title="Admissions"
        subtitle={
          user.role === "super_admin"
            ? "All campuses"
            : `Applications for ${user.campus}`
        }
      />
      {byStatus.length > 0 && (
        <div className="mb-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {byStatus.map(([name, value]) => (
            <StatCard key={name} label={name} value={String(value)} />
          ))}
        </div>
      )}
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
        rows={rows.map((a) => ({
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

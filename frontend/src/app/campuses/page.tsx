"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedCampuses } from "@/lib/rbac";

export default function CampusesPage() {
  const { user } = useAuth();
  if (!user) return null;
  const rows = scopedCampuses(user);

  return (
    <AppShell title="Campuses" subtitle="Branches you can access">
      <PageHeader
        eyebrow="Overview"
        title="Campuses"
        subtitle={user.role === "super_admin" ? "Full network directory" : `Focused on ${user.campus}`}
      />
      <DataTable
        columns={[
          { key: "code", label: "Code" },
          { key: "name", label: "Name" },
          { key: "city", label: "Location" },
          { key: "curriculum", label: "Curriculum" },
          { key: "students", label: "Students" },
          { key: "capacity", label: "Capacity" },
          { key: "status", label: "Status" },
        ]}
        rows={rows.map((c) => ({
          code: <span className="font-semibold">{c.code}</span>,
          name: c.name,
          city: `${c.city}, ${c.state}`,
          curriculum: c.curriculum,
          students: c.students.toLocaleString("en-IN"),
          capacity: c.capacity.toLocaleString("en-IN"),
          status: <StatusPill status={c.status} />,
        }))}
      />
    </AppShell>
  );
}

"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill } from "@/components/ui";
import { campuses } from "@/data/mock";

export default function CampusesPage() {
  return (
    <AppShell title="Campuses" subtitle="Multi-campus directory · MIA Solutions Pvt. Ltd.">
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
        rows={campuses.map((c) => ({
          code: <span className="font-medium">{c.code}</span>,
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

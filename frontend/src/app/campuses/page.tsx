"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function CampusesPage() {
  const { data } = useQuery({
    queryKey: ["campuses"],
    queryFn: () => api<Record<string, unknown>[]>("/campuses"),
  });

  return (
    <AppShell>
      <PageHeader title="Campuses" subtitle="Multi-campus directory · MIA Solutions Pvt. Ltd." />
      <DataTable
        columns={[
          { key: "code", label: "Code" },
          { key: "name", label: "Name" },
          { key: "city", label: "City" },
          { key: "curriculum", label: "Curriculum" },
          { key: "capacity", label: "Capacity" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status" },
        ]}
        rows={(data || []).map((c) => ({
          code: String(c.code),
          name: String(c.name),
          city: `${c.city}, ${c.state}`,
          curriculum: String(c.curriculum),
          capacity: String(c.capacity),
          email: String(c.email),
          status: <StatusPill status={c.is_active ? "active" : "inactive"} />,
        }))}
      />
    </AppShell>
  );
}

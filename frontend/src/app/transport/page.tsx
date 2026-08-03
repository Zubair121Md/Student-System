"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { api } from "@/lib/api";

export default function TransportPage() {
  const { data } = useQuery({
    queryKey: ["transport"],
    queryFn: () => api<Record<string, unknown>[]>("/transport/routes"),
  });

  return (
    <AppShell>
      <PageHeader title="Transport" subtitle="Routes, vehicles, drivers, and stop lists" />
      <DataTable
        columns={[
          { key: "code", label: "Code" },
          { key: "name", label: "Route" },
          { key: "vehicle", label: "Vehicle" },
          { key: "driver", label: "Driver" },
          { key: "phone", label: "Phone" },
          { key: "capacity", label: "Capacity" },
          { key: "stops", label: "Stops" },
        ]}
        rows={(data || []).map((r) => ({
          code: String(r.route_code),
          name: String(r.name),
          vehicle: String(r.vehicle_no),
          driver: String(r.driver_name),
          phone: String(r.driver_phone),
          capacity: String(r.capacity),
          stops: Array.isArray(r.stops) ? r.stops.slice(0, 3).join(", ") + "…" : "—",
        }))}
      />
    </AppShell>
  );
}

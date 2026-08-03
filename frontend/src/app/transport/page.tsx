"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { transport } from "@/data/mock";

export default function TransportPage() {
  return (
    <AppShell title="Transport" subtitle="Routes and vehicles">
      <PageHeader eyebrow="Operations" title="Transport" subtitle="Routes, drivers, and capacity" />
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
        rows={transport.map((r) => ({
          code: r.code,
          name: r.name,
          vehicle: r.vehicle,
          driver: r.driver,
          phone: r.phone,
          capacity: String(r.capacity),
          stops: String(r.stops),
        }))}
      />
    </AppShell>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function InventoryPage() {
  const { data } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => api<Record<string, unknown>[]>("/inventory"),
  });

  return (
    <AppShell>
      <PageHeader title="Inventory" subtitle="Lab equipment, uniforms, stationery, procurement stock" />
      <DataTable
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Item" },
          { key: "category", label: "Category" },
          { key: "qty", label: "Qty" },
          { key: "reorder", label: "Reorder" },
          { key: "stock", label: "Stock" },
        ]}
        rows={(data || []).map((i) => ({
          sku: String(i.sku),
          name: String(i.name),
          category: String(i.category),
          qty: `${i.quantity} ${i.unit}`,
          reorder: String(i.reorder_level),
          stock: <StatusPill status={i.low_stock ? "overdue" : "active"} />,
        }))}
      />
    </AppShell>
  );
}

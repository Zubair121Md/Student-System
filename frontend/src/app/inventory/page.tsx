"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable } from "@/components/ui";
import { inventory } from "@/data/mock";

export default function InventoryPage() {
  return (
    <AppShell title="Inventory" subtitle="Lab equipment, uniforms, stationery">
      <DataTable
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Item" },
          { key: "category", label: "Category" },
          { key: "qty", label: "Qty" },
          { key: "reorder", label: "Reorder at" },
          { key: "stock", label: "Stock" },
        ]}
        rows={inventory.map((i) => ({
          sku: i.sku,
          name: i.name,
          category: i.category,
          qty: String(i.qty),
          reorder: String(i.reorder),
          stock: i.low ? (
            <span className="text-xs font-semibold text-rose-700">Low stock</span>
          ) : (
            <span className="text-xs font-semibold text-emerald-700">In stock</span>
          ),
        }))}
      />
    </AppShell>
  );
}

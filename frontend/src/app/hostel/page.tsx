"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { api } from "@/lib/api";

export default function HostelPage() {
  const { data } = useQuery({
    queryKey: ["hostel"],
    queryFn: () => api<Record<string, unknown>[]>("/hostel"),
  });

  return (
    <AppShell>
      <PageHeader title="Hostel" subtitle="Blocks, rooms, occupancy, and wardens" />
      <div className="grid gap-4 lg:grid-cols-2">
        {(data || []).map((block) => (
          <div key={String(block.id)} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-display text-xl">{String(block.name)}</p>
            <p className="text-sm text-[var(--muted)] mb-3">
              {String(block.gender)} · Warden: {String(block.warden_name)}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {((block.rooms as Record<string, unknown>[]) || []).map((r) => (
                <div key={String(r.id)} className="rounded-lg border border-[var(--line)] p-2 text-center text-sm">
                  <p className="font-medium">{String(r.room_no)}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {String(r.occupied)}/{String(r.capacity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

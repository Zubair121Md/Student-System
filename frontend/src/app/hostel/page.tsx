"use client";

import { AppShell } from "@/components/AppShell";
import { Panel } from "@/components/ui";
import { hostel } from "@/data/mock";

export default function HostelPage() {
  return (
    <AppShell title="Hostel" subtitle="Blocks, rooms, and occupancy">
      <div className="grid gap-4 lg:grid-cols-2">
        {hostel.map((block) => (
          <Panel key={block.name} title={block.name}>
            <p className="mb-4 text-sm text-[var(--muted)] capitalize">
              {block.gender} · Warden: {block.warden}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {block.rooms.map((r) => (
                <div key={r.no} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-3 text-center">
                  <p className="font-semibold">{r.no}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{r.occupied}/{r.capacity}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
                    <div className="h-full rounded-full bg-[var(--brand)]" style={{ width: `${(r.occupied / r.capacity) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}

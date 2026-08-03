"use client";

import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { hostel } from "@/data/mock";

export default function HostelPage() {
  return (
    <AppShell title="Hostel" subtitle="Blocks and occupancy">
      <PageHeader eyebrow="Operations" title="Hostel" subtitle="Room allocation and wardens" />
      <div className="grid gap-6 lg:grid-cols-2">
        {hostel.map((block) => (
          <Panel key={block.name} title={block.name}>
            <p className="mb-4 text-sm capitalize text-slate-500">
              {block.gender} · Warden: {block.warden}
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {block.rooms.map((r) => (
                <div key={r.no} className="rounded-2xl bg-slate-50 p-3 text-center">
                  <p className="font-semibold">{r.no}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {r.occupied}/{r.capacity}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(r.occupied / r.capacity) * 100}%` }}
                    />
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

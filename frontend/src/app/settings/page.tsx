"use client";

import { AppShell } from "@/components/AppShell";
import { Panel } from "@/components/ui";
import { auditLogs, APP_NAME, COMPANY } from "@/data/mock";

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Organization profile and sample audit trail">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Organization">
          <p className="font-display text-3xl tracking-tight">{APP_NAME}</p>
          <p className="mt-1 text-[var(--muted)]">{COMPANY}</p>
          <div className="mt-5 space-y-2 text-sm">
            <p><span className="text-[var(--muted)]">Mode · </span>Static portfolio demo</p>
            <p><span className="text-[var(--muted)]">Data · </span>Sample / fake records only</p>
            <p><span className="text-[var(--muted)]">Roles · </span>Super Admin, Principal, Teacher, Parent, Student, Accountant, HR</p>
          </div>
        </Panel>
        <Panel title="Recent activity">
          <div className="space-y-2">
            {auditLogs.map((a) => (
              <div key={a.time + a.action} className="rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 text-sm">
                <p><span className="font-semibold capitalize">{a.action}</span> · {a.entity}</p>
                <p className="text-xs text-[var(--muted)]">{a.detail} · {a.time}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

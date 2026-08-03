"use client";

import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader } from "@/components/ui";
import { auditLogs, APP_NAME, COMPANY } from "@/data/mock";

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Organization profile">
      <PageHeader eyebrow="System" title="Settings" subtitle="Organization and sample activity" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Organization">
          <p className="font-display text-3xl font-semibold tracking-tight">{APP_NAME}</p>
          <p className="mt-1 text-slate-500">{COMPANY}</p>
          <div className="mt-5 space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Mode · </span>Static portfolio demo
            </p>
            <p>
              <span className="text-slate-500">Data · </span>Sample records only
            </p>
            <p>
              <span className="text-slate-500">Roles · </span>Super Admin, Principal, Teacher, Parent, Student,
              Accountant, HR
            </p>
          </div>
        </Panel>
        <Panel title="Recent activity">
          <div className="space-y-2">
            {auditLogs.map((a) => (
              <div key={a.time + a.action} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <p>
                  <span className="font-semibold capitalize">{a.action}</span> · {a.entity}
                </p>
                <p className="text-xs text-slate-500">
                  {a.detail} · {a.time}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

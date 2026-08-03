"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { api } from "@/lib/api";
import { APP_NAME, COMPANY } from "@/lib/utils";

export default function SettingsPage() {
  const meta = useQuery({
    queryKey: ["meta"],
    queryFn: () => api<Record<string, unknown>>("/meta"),
  });
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => api<Record<string, unknown>>("/health"),
  });
  const audits = useQuery({
    queryKey: ["audits"],
    queryFn: () => api<Record<string, unknown>[]>("/audit-logs?limit=20"),
  });

  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Organization, roles, audit trail" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm space-y-2">
          <p className="font-display text-2xl">{APP_NAME}</p>
          <p>{COMPANY}</p>
          <p className="text-[var(--muted)]">Test site: {String(meta.data?.is_test_site ?? true)}</p>
          <p className="text-[var(--muted)]">{String(meta.data?.banner || "")}</p>
          <p className="pt-2">API: {String(health.data?.status || "…")} · v{String(health.data?.version || "")}</p>
          <div className="pt-4 border-t border-[var(--line)]">
            <p className="font-medium mb-2">Roles</p>
            <p className="text-[var(--muted)]">
              Super Admin, Branch Admin, Principal, Teacher, Parent, Student, Accountant, HR
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
          <p className="font-medium mb-3">Recent audit logs</p>
          <div className="space-y-2 max-h-96 overflow-y-auto text-sm">
            {(audits.data || []).map((a) => (
              <div key={String(a.id)} className="rounded-lg border border-[var(--line)] px-3 py-2">
                <p>
                  <span className="font-medium">{String(a.action)}</span> · {String(a.entity)}
                </p>
                <p className="text-xs text-[var(--muted)]">{String(a.created_at)}</p>
              </div>
            ))}
            {!audits.data?.length && (
              <p className="text-[var(--muted)]">No audit entries visible for this role.</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

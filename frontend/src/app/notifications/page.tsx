"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { api } from "@/lib/api";

export default function NotificationsPage() {
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api<Record<string, unknown>[]>("/notifications"),
  });

  return (
    <AppShell>
      <PageHeader title="Notifications" subtitle="In-app alerts for the signed-in user" />
      <div className="space-y-3 max-w-2xl">
        {(data || []).map((n) => (
          <div key={String(n.id)} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4">
            <p className="font-medium">{String(n.title)}</p>
            <p className="text-sm text-[var(--muted)] mt-1">{String(n.body)}</p>
            <p className="text-xs text-[var(--muted)] mt-2">{String(n.created_at)}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

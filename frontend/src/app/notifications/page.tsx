"use client";

import { AppShell } from "@/components/AppShell";
import { notifications } from "@/data/mock";

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications" subtitle="In-app alerts for the signed-in demo user">
      <div className="mx-auto max-w-2xl space-y-3">
        {notifications.map((n) => (
          <div key={n.title} className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[var(--shadow)]">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">{n.title}</p>
              <span className="shrink-0 text-xs text-[var(--muted)]">{n.time}</span>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{n.body}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

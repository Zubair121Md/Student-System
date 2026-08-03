"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { notifications } from "@/data/mock";

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications" subtitle="In-app alerts">
      <PageHeader eyebrow="Alerts" title="Notifications" subtitle="Demo alerts for the signed-in user" />
      <div className="mx-auto max-w-2xl space-y-3">
        {notifications.map((n) => (
          <div key={n.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold">{n.title}</p>
              <span className="shrink-0 text-xs font-semibold text-slate-400">{n.time}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{n.body}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

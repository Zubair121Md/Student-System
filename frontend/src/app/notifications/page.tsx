"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedNotifications } from "@/lib/rbac";

export default function NotificationsPage() {
  const { user } = useAuth();
  if (!user) return null;
  const notes = scopedNotifications(user);

  return (
    <AppShell title="Notifications" subtitle="Alerts for your role">
      <PageHeader eyebrow="Alerts" title="Notifications" subtitle={`Inbox for ${user.full_name}`} />
      <div className="mx-auto max-w-2xl space-y-3">
        {notes.map((n) => (
          <div key={n.title + n.time} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
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

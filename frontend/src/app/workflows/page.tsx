"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { complaints } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { scopedWorkflows, scopedCirculars } from "@/lib/rbac";

export default function WorkflowsPage() {
  const { user } = useAuth();
  if (!user) return null;
  const workflows = scopedWorkflows(user);
  const circulars = scopedCirculars(user);
  const showComplaints = ["super_admin", "principal"].includes(user.role);

  return (
    <AppShell title="Workflows" subtitle="Approvals for your role">
      <PageHeader eyebrow="System" title="Workflows & communication" subtitle="Items assigned to your desk" />
      <h3 className="mb-3 text-sm font-semibold text-slate-500">Approvals</h3>
      <DataTable
        columns={[
          { key: "module", label: "Module" },
          { key: "step", label: "Step" },
          { key: "status", label: "Status" },
          { key: "comments", label: "Comments" },
        ]}
        rows={workflows.map((w) => ({
          module: w.module,
          step: w.step,
          status: <StatusPill status={w.status} />,
          comments: w.comments,
        }))}
      />
      <h3 className="mb-3 mt-8 text-sm font-semibold text-slate-500">Circulars</h3>
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "audience", label: "Audience" },
          { key: "date", label: "Date" },
        ]}
        rows={circulars.map((c) => ({ title: c.title, audience: c.audience, date: c.date }))}
      />
      {showComplaints && (
        <>
          <h3 className="mb-3 mt-8 text-sm font-semibold text-slate-500">Complaints</h3>
          <DataTable
            columns={[
              { key: "category", label: "Category" },
              { key: "subject", label: "Subject" },
              { key: "priority", label: "Priority" },
              { key: "status", label: "Status" },
            ]}
            rows={complaints.map((c) => ({
              category: c.category,
              subject: c.subject,
              priority: <span className="capitalize">{c.priority}</span>,
              status: <StatusPill status={c.status} />,
            }))}
          />
        </>
      )}
    </AppShell>
  );
}

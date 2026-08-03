"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill, PageHeader } from "@/components/ui";
import { workflows, circulars, complaints } from "@/data/mock";

export default function WorkflowsPage() {
  return (
    <AppShell title="Workflows" subtitle="Approvals and communication">
      <PageHeader eyebrow="System" title="Workflows & communication" subtitle="Approvals, circulars, complaints" />
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
    </AppShell>
  );
}

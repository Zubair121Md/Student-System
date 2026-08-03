"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, StatusPill } from "@/components/ui";
import { workflows, circulars, complaints } from "@/data/mock";

export default function WorkflowsPage() {
  return (
    <AppShell title="Workflows & communication" subtitle="Approvals, circulars, complaints">
      <h2 className="mb-3 text-sm font-semibold">Approvals</h2>
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
      <h2 className="mb-3 mt-8 text-sm font-semibold">Circulars</h2>
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "audience", label: "Audience" },
          { key: "date", label: "Date" },
        ]}
        rows={circulars.map((c) => ({ title: c.title, audience: c.audience, date: c.date }))}
      />
      <h2 className="mb-3 mt-8 text-sm font-semibold">Complaints</h2>
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

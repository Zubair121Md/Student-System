"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function WorkflowsPage() {
  const workflows = useQuery({
    queryKey: ["workflows"],
    queryFn: () => api<Record<string, unknown>[]>("/workflows"),
  });
  const complaints = useQuery({
    queryKey: ["complaints"],
    queryFn: () => api<Record<string, unknown>[]>("/complaints"),
  });
  const circulars = useQuery({
    queryKey: ["circulars"],
    queryFn: () => api<Record<string, unknown>[]>("/circulars"),
  });

  return (
    <AppShell>
      <PageHeader title="Workflows & communication" subtitle="Approvals, circulars, and complaints" />
      <h2 className="font-medium mb-2">Approvals</h2>
      <DataTable
        columns={[
          { key: "module", label: "Module" },
          { key: "step", label: "Step" },
          { key: "status", label: "Status" },
          { key: "comments", label: "Comments" },
        ]}
        rows={(workflows.data || []).map((w) => ({
          module: String(w.module),
          step: String(w.step),
          status: <StatusPill status={String(w.status)} />,
          comments: String(w.comments || "—"),
        }))}
      />
      <h2 className="font-medium mt-8 mb-2">Circulars</h2>
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "audience", label: "Audience" },
          { key: "published", label: "Published" },
        ]}
        rows={(circulars.data || []).map((c) => ({
          title: String(c.title),
          audience: String(c.audience),
          published: String(c.published_at).slice(0, 10),
        }))}
      />
      <h2 className="font-medium mt-8 mb-2">Complaints</h2>
      <DataTable
        columns={[
          { key: "category", label: "Category" },
          { key: "subject", label: "Subject" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status" },
        ]}
        rows={(complaints.data || []).map((c) => ({
          category: String(c.category),
          subject: String(c.subject),
          priority: String(c.priority),
          status: <StatusPill status={String(c.status)} />,
        }))}
      />
    </AppShell>
  );
}

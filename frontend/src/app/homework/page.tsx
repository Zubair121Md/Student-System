"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { api } from "@/lib/api";

export default function HomeworkPage() {
  const { data } = useQuery({
    queryKey: ["homework"],
    queryFn: () => api<Record<string, unknown>[]>("/homework"),
  });

  return (
    <AppShell>
      <PageHeader title="Homework" subtitle="Teacher assignments visible on parent and student portals" />
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "subject", label: "Subject" },
          { key: "class", label: "Class" },
          { key: "due", label: "Due" },
          { key: "description", label: "Description" },
        ]}
        rows={(data || []).map((h) => ({
          title: String(h.title),
          subject: String(h.subject),
          class: `${h.grade}-${h.section}`,
          due: String(h.due_date),
          description: String(h.description).slice(0, 60) + "…",
        }))}
      />
    </AppShell>
  );
}

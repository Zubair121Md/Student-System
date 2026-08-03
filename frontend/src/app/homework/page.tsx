"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { homework } from "@/data/mock";

export default function HomeworkPage() {
  return (
    <AppShell title="Homework" subtitle="Assignments">
      <PageHeader eyebrow="Academics" title="Homework" subtitle="Visible on parent and student views" />
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "subject", label: "Subject" },
          { key: "cls", label: "Class" },
          { key: "due", label: "Due" },
          { key: "desc", label: "Description" },
        ]}
        rows={homework.map((h) => ({
          title: <span className="font-semibold">{h.title}</span>,
          subject: h.subject,
          cls: h.cls,
          due: h.due,
          desc: h.desc,
        }))}
      />
    </AppShell>
  );
}

"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable } from "@/components/ui";
import { homework } from "@/data/mock";

export default function HomeworkPage() {
  return (
    <AppShell title="Homework" subtitle="Assignments for parent and student views">
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "subject", label: "Subject" },
          { key: "cls", label: "Class" },
          { key: "due", label: "Due" },
          { key: "desc", label: "Description" },
        ]}
        rows={homework.map((h) => ({
          title: <span className="font-medium">{h.title}</span>,
          subject: h.subject,
          cls: h.cls,
          due: h.due,
          desc: h.desc,
        }))}
      />
    </AppShell>
  );
}

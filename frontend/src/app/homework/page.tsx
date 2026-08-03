"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedHomework } from "@/lib/rbac";

export default function HomeworkPage() {
  const { user } = useAuth();
  if (!user) return null;
  const rows = scopedHomework(user);

  return (
    <AppShell title="Homework" subtitle="Assignments in your scope">
      <PageHeader
        eyebrow="Academics"
        title="Homework"
        subtitle={
          user.role === "teacher"
            ? "Assignments you set for Class 10-A"
            : "Homework for your class"
        }
      />
      <DataTable
        columns={[
          { key: "title", label: "Title" },
          { key: "subject", label: "Subject" },
          { key: "cls", label: "Class" },
          { key: "due", label: "Due" },
          { key: "desc", label: "Description" },
        ]}
        rows={rows.map((h) => ({
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

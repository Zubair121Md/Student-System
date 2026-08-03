"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedGrades } from "@/lib/rbac";

export default function GradesPage() {
  const { user } = useAuth();
  if (!user) return null;
  const rows = scopedGrades(user);

  return (
    <AppShell title="Grading" subtitle="Assessments in your scope">
      <PageHeader
        eyebrow="Academics"
        title="Grading & assessment"
        subtitle={
          user.role === "student" || user.role === "parent"
            ? "Results for your linked student"
            : user.role === "teacher"
              ? "Marks for Class 10-A"
              : "Scoped grade entries"
        }
      />
      <DataTable
        columns={[
          { key: "student", label: "Student" },
          { key: "subject", label: "Subject" },
          { key: "assessment", label: "Assessment" },
          { key: "type", label: "Type" },
          { key: "marks", label: "Marks" },
          { key: "weight", label: "Weight" },
          { key: "letter", label: "Grade" },
        ]}
        rows={rows.map((g) => ({
          student: g.student,
          subject: g.subject,
          assessment: g.assessment,
          type: <span className="capitalize">{g.type.replaceAll("_", " ")}</span>,
          marks: `${g.marks} / ${g.max}`,
          weight: g.weight,
          letter: <span className="font-bold text-accent">{g.letter}</span>,
        }))}
      />
    </AppShell>
  );
}

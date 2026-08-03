"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { grades } from "@/data/mock";

export default function GradesPage() {
  return (
    <AppShell title="Grading" subtitle="Weighted continuous assessment">
      <PageHeader eyebrow="Academics" title="Grading & assessment" subtitle="Grade 10 sample with weightages" />
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
        rows={grades.map((g) => ({
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

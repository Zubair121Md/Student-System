"use client";

import { AppShell } from "@/components/AppShell";
import { DataTable } from "@/components/ui";
import { grades } from "@/data/mock";

export default function GradesPage() {
  return (
    <AppShell title="Grading & assessment" subtitle="Weighted continuous assessment · Grade 10 sample">
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
          letter: <span className="font-semibold text-[var(--brand)]">{g.letter}</span>,
        }))}
      />
    </AppShell>
  );
}

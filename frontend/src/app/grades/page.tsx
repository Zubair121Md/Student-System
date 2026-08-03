"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader } from "@/components/ui";
import { api } from "@/lib/api";

export default function GradesPage() {
  const { data } = useQuery({
    queryKey: ["grades"],
    queryFn: () => api<Record<string, unknown>[]>("/grades?grade=10"),
  });

  return (
    <AppShell>
      <PageHeader
        title="Grading & assessment"
        subtitle="Weighted continuous assessment · GPA/CGPA ready · Grade 10 sample"
      />
      <DataTable
        columns={[
          { key: "student_id", label: "Student #" },
          { key: "subject", label: "Subject" },
          { key: "assessment", label: "Assessment" },
          { key: "type", label: "Type" },
          { key: "marks", label: "Marks" },
          { key: "weightage", label: "Weight" },
          { key: "letter", label: "Grade" },
        ]}
        rows={(data || []).slice(0, 100).map((g) => ({
          student_id: String(g.student_id),
          subject: String(g.subject),
          assessment: String(g.assessment),
          type: String(g.assessment_type),
          marks: `${g.marks_obtained} / ${g.max_marks}`,
          weightage: `${Number(g.weightage) * 100}%`,
          letter: String(g.grade_letter),
        }))}
      />
    </AppShell>
  );
}

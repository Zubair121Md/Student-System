"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

type StudentsRes = {
  total: number;
  items: {
    id: number;
    student_id: string;
    full_name: string;
    grade: string;
    section: string;
    roll_number: string;
    status: string;
    scholarship_code?: string;
  }[];
};

export default function StudentsPage() {
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["students", q, grade],
    queryFn: () =>
      api<StudentsRes>(
        `/students?limit=50${q ? `&q=${encodeURIComponent(q)}` : ""}${grade ? `&grade=${grade}` : ""}`
      ),
  });

  return (
    <AppShell>
      <PageHeader title="Students" subtitle={`Master records · ${data?.total ?? "…"} total in view`} />
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or ID"
          className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        />
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm"
        >
          <option value="">All grades</option>
          {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      ) : (
        <DataTable
          columns={[
            { key: "student_id", label: "Student ID" },
            { key: "full_name", label: "Name" },
            { key: "grade", label: "Grade" },
            { key: "section", label: "Sec" },
            { key: "roll_number", label: "Roll" },
            { key: "scholarship", label: "Scholarship" },
            { key: "status", label: "Status" },
          ]}
          rows={(data?.items || []).map((s) => ({
            student_id: (
              <Link className="text-[var(--brand)] underline-offset-2 hover:underline" href={`/students/${s.id}`}>
                {s.student_id}
              </Link>
            ),
            full_name: s.full_name,
            grade: s.grade,
            section: s.section,
            roll_number: s.roll_number,
            scholarship: s.scholarship_code || "—",
            status: <StatusPill status={s.status} />,
          }))}
        />
      )}
    </AppShell>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DataTable, SearchField, StatusPill, PageHeader } from "@/components/ui";
import { students } from "@/data/mock";

export default function StudentsPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return students;
    return students.filter(
      (x) =>
        x.full_name.toLowerCase().includes(s) ||
        x.student_id.toLowerCase().includes(s) ||
        x.campus.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <AppShell title="Students" subtitle="Student master across campuses">
      <PageHeader eyebrow="People" title="Students" subtitle="Search and open student profiles" />
      <div className="mb-4">
        <SearchField value={q} onChange={setQ} placeholder="Search name, ID, campus…" />
      </div>
      <DataTable
        columns={[
          { key: "id", label: "Student ID" },
          { key: "name", label: "Name" },
          { key: "class", label: "Class" },
          { key: "campus", label: "Campus" },
          { key: "scholarship", label: "Scholarship" },
          { key: "status", label: "Status" },
        ]}
        rows={filtered.map((s) => ({
          id: (
            <Link href={`/students/${s.id}`} className="font-semibold text-accent hover:underline">
              {s.student_id}
            </Link>
          ),
          name: s.full_name,
          class: `${s.grade}-${s.section}`,
          campus: s.campus,
          scholarship: s.scholarship || "—",
          status: <StatusPill status={s.status} />,
        }))}
      />
    </AppShell>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/AppShell";
import { DataTable, PageHeader, StatusPill, StatCard } from "@/components/ui";
import { api } from "@/lib/api";

export default function AdmissionsPage() {
  const list = useQuery({
    queryKey: ["admissions"],
    queryFn: () => api<Record<string, unknown>[]>("/admissions"),
  });
  const analytics = useQuery({
    queryKey: ["admissions-analytics"],
    queryFn: () => api<{ by_status: Record<string, number> }>("/admissions/analytics"),
  });

  const byStatus = analytics.data?.by_status || {};

  return (
    <AppShell>
      <PageHeader
        title="Admissions"
        subtitle="Application → Verification → Assessment → Approval → Fee Payment → Enrollment"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {Object.entries(byStatus).map(([k, v]) => (
          <StatCard key={k} label={k} value={v} />
        ))}
      </div>
      <DataTable
        columns={[
          { key: "application_no", label: "Application" },
          { key: "applicant_name", label: "Applicant" },
          { key: "applying_grade", label: "Grade" },
          { key: "parent_name", label: "Parent" },
          { key: "entrance_score", label: "Entrance" },
          { key: "merit_rank", label: "Merit" },
          { key: "status", label: "Status" },
        ]}
        rows={(list.data || []).map((a) => ({
          application_no: String(a.application_no),
          applicant_name: String(a.applicant_name),
          applying_grade: String(a.applying_grade),
          parent_name: String(a.parent_name),
          entrance_score: a.entrance_score != null ? String(a.entrance_score) : "—",
          merit_rank: a.merit_rank != null ? String(a.merit_rank) : "—",
          status: <StatusPill status={String(a.status)} />,
        }))}
      />
    </AppShell>
  );
}

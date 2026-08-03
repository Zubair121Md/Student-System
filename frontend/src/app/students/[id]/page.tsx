"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PageHeader, StatusPill } from "@/components/ui";
import { api } from "@/lib/api";

export default function StudentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: () => api<Record<string, unknown>>(`/students/${id}`),
  });

  return (
    <AppShell>
      <PageHeader title="Student profile" subtitle="Personal, guardian, medical, and allocation details" />
      {isLoading || !data ? (
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5 space-y-2 text-sm">
            <p className="font-display text-2xl">
              {String(data.first_name)} {String(data.last_name)}
            </p>
            <p className="text-[var(--muted)]">{String(data.student_id)}</p>
            <StatusPill status={String(data.status)} />
            <dl className="grid grid-cols-2 gap-3 pt-3">
              {[
                ["Grade", `${data.grade}-${data.section}`],
                ["Roll", data.roll_number],
                ["DOB", data.date_of_birth],
                ["Gender", data.gender],
                ["Blood group", data.blood_group || "—"],
                ["RFID", data.rfid_tag || "—"],
                ["Scholarship", data.scholarship_code || "—"],
                ["Admission", data.admission_date],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <dt className="text-xs text-[var(--muted)]">{String(k)}</dt>
                  <dd className="capitalize">{String(v)}</dd>
                </div>
              ))}
            </dl>
            <p className="pt-2"><span className="text-[var(--muted)]">Address: </span>{String(data.address)}</p>
            {data.medical_notes ? (
              <p><span className="text-[var(--muted)]">Medical: </span>{String(data.medical_notes)}</p>
            ) : null}
          </div>
          <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5">
            <p className="font-medium mb-3">Guardians</p>
            <div className="space-y-3">
              {(data.guardians as Record<string, unknown>[] | undefined)?.map((g) => (
                <div key={String(g.id)} className="rounded-lg border border-[var(--line)] p-3 text-sm">
                  <p className="font-medium">{String(g.full_name)}</p>
                  <p className="text-[var(--muted)]">
                    {String(g.relation)} · {String(g.phone)}
                  </p>
                  <p className="text-[var(--muted)]">{String(g.email || "")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { Panel, StatusPill, PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { scopedStudents } from "@/lib/rbac";
import { ArrowLeft } from "lucide-react";

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = Number(params.id);
  const allowed = useMemo(() => (user ? scopedStudents(user) : []), [user]);
  const s = allowed.find((x) => x.id === id);

  useEffect(() => {
    if (user && !s) router.replace("/students");
  }, [user, s, router]);

  if (!user || !s) return null;

  return (
    <AppShell title={s.full_name} subtitle={s.student_id}>
      <Link href="/students" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Back to students
      </Link>
      <PageHeader eyebrow="Profile" title={s.full_name} subtitle={s.student_id} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Details">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accentSoft font-display text-xl font-semibold text-accent">
              {s.full_name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </div>
            <StatusPill status={s.status} />
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["Class", `${s.grade}-${s.section}`],
              ["Roll", s.roll],
              ["Campus", s.campus],
              ["DOB", s.dob],
              ["Gender", s.gender],
              ["Blood", s.blood],
              ["RFID", s.rfid],
              ["Scholarship", s.scholarship || "—"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{k}</dt>
                <dd className="mt-0.5 font-semibold capitalize">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm">
            <span className="text-slate-500">Address · </span>
            {s.address}
          </p>
          {s.medical ? (
            <p className="mt-2 text-sm">
              <span className="text-slate-500">Medical · </span>
              {s.medical}
            </p>
          ) : null}
        </Panel>
        <Panel title="Guardians">
          <div className="space-y-3">
            {s.guardians.map((g) => (
              <div key={g.email} className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="font-semibold">{g.name}</p>
                <p className="text-sm text-slate-500">
                  {g.relation} · {g.phone}
                </p>
                <p className="text-sm text-slate-500">{g.email}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

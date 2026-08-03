"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Panel, StatusPill } from "@/components/ui";
import { students } from "@/data/mock";
import { ArrowLeft } from "lucide-react";

export default function StudentDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const s = students.find((x) => x.id === id) || students[0];

  return (
    <AppShell title={s.full_name} subtitle={s.student_id}>
      <Link href="/students" className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--brand)]">
        <ArrowLeft size={14} /> Back to students
      </Link>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Profile">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--brand-soft)] font-display text-xl text-[var(--brand)]">
              {s.full_name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-display text-2xl">{s.full_name}</p>
              <StatusPill status={s.status} />
            </div>
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
                <dt className="text-[11px] uppercase tracking-wider text-[var(--muted)]">{k}</dt>
                <dd className="mt-0.5 capitalize font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm"><span className="text-[var(--muted)]">Address · </span>{s.address}</p>
          {s.medical && <p className="mt-2 text-sm"><span className="text-[var(--muted)]">Medical · </span>{s.medical}</p>}
        </Panel>
        <Panel title="Guardians">
          <div className="space-y-3">
            {s.guardians.map((g) => (
              <div key={g.email} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4">
                <p className="font-semibold">{g.name}</p>
                <p className="text-sm text-[var(--muted)]">{g.relation} · {g.phone}</p>
                <p className="text-sm text-[var(--muted)]">{g.email}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

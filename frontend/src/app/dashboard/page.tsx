"use client";

import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart,
} from "recharts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Panel, StatCard, PageHeader, DataTable, StatusPill } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import {
  dashboardMeta,
  roleStats,
  roleQuickLinks,
  scopedStudents,
  scopedAdmissions,
  scopedFees,
  scopedAttendance,
  scopedGrades,
  scopedHomework,
  scopedWorkflows,
  scopedEmployees,
  scopedPayroll,
  linkedStudent,
  admissionByStatus,
  attendanceByStatus,
} from "@/lib/rbac";

const feeTrend = [
  { m: "Mar", collected: 28 },
  { m: "Apr", collected: 32 },
  { m: "May", collected: 30 },
  { m: "Jun", collected: 36 },
  { m: "Jul", collected: 41 },
  { m: "Aug", collected: 38 },
];

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  const meta = dashboardMeta(user);
  const stats = roleStats(user);
  const links = roleQuickLinks(user);

  return (
    <AppShell title="Dashboard" subtitle={meta.subtitle} eyebrow={meta.eyebrow}>
      <PageHeader eyebrow={meta.eyebrow} title={meta.title} subtitle={meta.subtitle} />

      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accentSoft px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
        Role · {user.role.replaceAll("_", " ")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} />
        ))}
      </div>

      <RolePanels role={user.role} />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold shadow-soft transition hover:border-accent"
          >
            <span>{l.label}</span>
            <ArrowRight className="h-4 w-4 text-accent" />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

function RolePanels({ role }: { role: string }) {
  const { user } = useAuth();
  if (!user) return null;

  if (role === "super_admin") {
    return (
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Fee collection trend (₹ Lakh)">
          <ChartArea />
        </Panel>
        <Panel title="Admissions pipeline">
          <ChartBars data={admissionByStatus} />
        </Panel>
        <div className="xl:col-span-2">
          <Panel title="Attendance distribution">
            <ChartBarsHoriz data={attendanceByStatus} />
          </Panel>
        </div>
      </div>
    );
  }

  if (role === "principal") {
    const adm = scopedAdmissions(user);
    const wf = scopedWorkflows(user);
    return (
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Campus admissions">
          <DataTable
            columns={[
              { key: "no", label: "App #" },
              { key: "name", label: "Name" },
              { key: "status", label: "Status" },
            ]}
            rows={adm.map((a) => ({
              no: a.no,
              name: a.name,
              status: <StatusPill status={a.status} />,
            }))}
          />
        </Panel>
        <Panel title="Approval queue">
          <DataTable
            columns={[
              { key: "module", label: "Module" },
              { key: "step", label: "Step" },
              { key: "status", label: "Status" },
            ]}
            rows={wf.map((w) => ({
              module: w.module,
              step: w.step,
              status: <StatusPill status={w.status} />,
            }))}
          />
        </Panel>
      </div>
    );
  }

  if (role === "teacher") {
    const roster = scopedStudents(user);
    const hw = scopedHomework(user);
    return (
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Class 10-A roster">
          <DataTable
            columns={[
              { key: "name", label: "Student" },
              { key: "roll", label: "Roll" },
              { key: "id", label: "ID" },
            ]}
            rows={roster.map((s) => ({
              name: s.full_name,
              roll: s.roll,
              id: s.student_id,
            }))}
          />
        </Panel>
        <Panel title="Your homework">
          <DataTable
            columns={[
              { key: "title", label: "Title" },
              { key: "due", label: "Due" },
              { key: "cls", label: "Class" },
            ]}
            rows={hw.map((h) => ({ title: h.title, due: h.due, cls: h.cls }))}
          />
        </Panel>
      </div>
    );
  }

  if (role === "parent" || role === "student") {
    const child = linkedStudent(user);
    const fees = scopedFees(user);
    const grades = scopedGrades(user);
    const att = scopedAttendance(user);
    return (
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title={role === "parent" ? "Child profile" : "My profile"}>
          {child ? (
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Name", child.full_name],
                ["Class", `${child.grade}-${child.section}`],
                ["Roll", child.roll],
                ["Campus", child.campus],
                ["ID", child.student_id],
                ["Scholarship", child.scholarship || "—"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-slate-500">No linked student.</p>
          )}
        </Panel>
        <Panel title="Recent attendance">
          <DataTable
            columns={[
              { key: "date", label: "Date" },
              { key: "status", label: "Status" },
              { key: "mode", label: "Mode" },
            ]}
            rows={att.map((a) => ({
              date: a.date,
              status: <StatusPill status={a.status} />,
              mode: a.mode,
            }))}
          />
        </Panel>
        <Panel title="Fee invoices">
          <DataTable
            columns={[
              { key: "no", label: "Invoice" },
              { key: "net", label: "Amount" },
              { key: "status", label: "Status" },
            ]}
            rows={fees.map((f) => ({
              no: f.no,
              net: `₹${f.net.toLocaleString("en-IN")}`,
              status: <StatusPill status={f.status} />,
            }))}
          />
        </Panel>
        <Panel title="Recent grades">
          <DataTable
            columns={[
              { key: "subject", label: "Subject" },
              { key: "marks", label: "Marks" },
              { key: "letter", label: "Grade" },
            ]}
            rows={grades.slice(0, 6).map((g) => ({
              subject: g.subject,
              marks: `${g.marks}/${g.max}`,
              letter: g.letter,
            }))}
          />
        </Panel>
      </div>
    );
  }

  if (role === "accountant") {
    const fees = scopedFees(user);
    return (
      <div className="mt-6">
        <Panel title="Hyderabad fee invoices">
          <DataTable
            columns={[
              { key: "no", label: "Invoice" },
              { key: "student", label: "Student" },
              { key: "net", label: "Net" },
              { key: "due", label: "Due" },
              { key: "status", label: "Status" },
            ]}
            rows={fees.map((f) => ({
              no: f.no,
              student: f.student,
              net: `₹${f.net.toLocaleString("en-IN")}`,
              due: f.due,
              status: <StatusPill status={f.status} />,
            }))}
          />
        </Panel>
      </div>
    );
  }

  if (role === "hr") {
    const emps = scopedEmployees(user);
    const pay = scopedPayroll(user);
    return (
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Employees">
          <DataTable
            columns={[
              { key: "name", label: "Name" },
              { key: "designation", label: "Role" },
              { key: "dept", label: "Dept" },
            ]}
            rows={emps.map((e) => ({
              name: e.name,
              designation: e.designation,
              dept: e.dept,
            }))}
          />
        </Panel>
        <Panel title="July payroll">
          <DataTable
            columns={[
              { key: "employee", label: "Employee" },
              { key: "net", label: "Net" },
              { key: "status", label: "Status" },
            ]}
            rows={pay.map((p) => ({
              employee: p.employee,
              net: `₹${p.net.toLocaleString("en-IN")}`,
              status: <StatusPill status={p.status} />,
            }))}
          />
        </Panel>
      </div>
    );
  }

  return null;
}

function ChartArea() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={feeTrend}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f766e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="m" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="collected" stroke="#0f766e" fill="url(#g1)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartBars({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#0b1220" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartBarsHoriz({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} width={70} />
          <Tooltip />
          <Bar dataKey="value" fill="#0f766e" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

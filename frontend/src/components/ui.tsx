import { type ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-3xl tracking-tight text-[var(--ink)]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl text-[var(--ink)]">{value}</p>
      {hint && <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p>}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: { key: string; label: string }[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--panel)]">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--bg)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--muted)]">
                No records
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-t border-[var(--line)] hover:bg-[var(--bg)]/60">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 whitespace-nowrap">
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "paid" || status === "present" || status === "approved" || status === "enrolled" || status === "active"
      ? "bg-emerald-50 text-emerald-800"
      : status === "pending" || status === "submitted" || status === "scheduled"
        ? "bg-amber-50 text-amber-800"
        : status === "overdue" || status === "absent" || status === "rejected" || status === "open"
          ? "bg-rose-50 text-rose-800"
          : "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${tone}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

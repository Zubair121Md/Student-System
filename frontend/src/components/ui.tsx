import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "brand" | "accent";
}) {
  const tones = {
    default: "from-white to-[#f8fafb]",
    brand: "from-[var(--brand-soft)] to-white",
    accent: "from-[#e8f0f7] to-white",
  };
  return (
    <div className={cn("rounded-2xl border border-[var(--line)] bg-gradient-to-br p-4 shadow-[var(--shadow)]", tones[tone])}>
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-display text-[1.85rem] leading-none tracking-tight">{value}</p>
      {hint && <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)]", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3 md:px-5">
          {title && <h2 className="text-sm font-semibold tracking-tight">{title}</h2>}
          {action}
        </div>
      )}
      <div className="p-4 md:p-5">{children}</div>
    </section>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: { key: string; label: string; className?: string }[];
  rows: Record<string, ReactNode>[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)]">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--line)] bg-[#f7f9fb] text-left">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--muted)]", c.className)}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[var(--line)] last:border-0 hover:bg-[#f7faf8]/80 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-4 py-3.5 align-middle whitespace-nowrap", c.className)}>
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  const tone =
    ["paid", "present", "approved", "enrolled", "active", "processed", "published"].includes(s)
      ? "bg-emerald-50 text-emerald-800 ring-emerald-100"
      : ["pending", "submitted", "scheduled", "interview", "assessment", "verification", "partial"].includes(s)
        ? "bg-amber-50 text-amber-900 ring-amber-100"
        : ["overdue", "absent", "rejected", "open", "late"].includes(s)
          ? "bg-rose-50 text-rose-800 ring-rose-100"
          : "bg-slate-100 text-slate-700 ring-slate-200";
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset", tone)}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-xs rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]"
    />
  );
}

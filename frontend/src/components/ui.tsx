"use client";

import clsx from "clsx";
import { type ReactNode } from "react";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function TextInput({
  id,
  value,
  type = "text",
  placeholder,
  onChange,
}: {
  id?: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-ink outline-none transition focus:border-accent"
    />
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300",
        className
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-card p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
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
    <section className={clsx("rounded-3xl border border-slate-200 bg-white p-6 shadow-soft", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h3 className="font-display text-xl font-semibold text-ink">{title}</h3> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
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
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
              {columns.map((c) => (
                <td key={c.key} className="whitespace-nowrap px-4 py-3.5 text-ink">
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
  const tone = ["paid", "present", "approved", "enrolled", "active", "processed", "published"].includes(s)
    ? "bg-emerald-50 text-emerald-800"
    : ["pending", "submitted", "scheduled", "interview", "assessment", "verification", "partial"].includes(s)
      ? "bg-amber-50 text-amber-900"
      : ["overdue", "absent", "rejected", "open", "late"].includes(s)
        ? "bg-rose-50 text-rose-800"
        : "bg-slate-100 text-slate-700";
  return (
    <span className={clsx("inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize", tone)}>
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
      className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition focus:border-accent"
    />
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">{title}</h2>
      {subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}
    </header>
  );
}

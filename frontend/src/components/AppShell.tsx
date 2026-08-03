"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { APP_NAME, COMPANY, formatRole } from "@/lib/utils";
import {
  LayoutDashboard, UserPlus, Users, CalendarCheck, GraduationCap,
  FileSpreadsheet, CalendarDays, Wallet, Bus, Building2, BookOpen,
  Package, Briefcase, BarChart3, Settings, Bell, LogOut, Menu, X,
  ClipboardList, GitBranch, Sparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admissions", label: "Admissions", icon: UserPlus },
  { href: "/students", label: "Students", icon: Users },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/grades", label: "Grading", icon: GraduationCap },
  { href: "/exams", label: "Exams", icon: FileSpreadsheet },
  { href: "/timetable", label: "Timetable", icon: CalendarDays },
  { href: "/fees", label: "Fees", icon: Wallet },
  { href: "/transport", label: "Transport", icon: Bus },
  { href: "/hostel", label: "Hostel", icon: Building2 },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/hr", label: "HR & Payroll", icon: Briefcase },
  { href: "/homework", label: "Homework", icon: ClipboardList },
  { href: "/workflows", label: "Workflows", icon: GitBranch },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/campuses", label: "Campuses", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="flex items-center gap-3 text-[var(--muted)]">
          <Sparkles className="animate-pulse" size={18} />
          <span>Loading {APP_NAME}…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") router.replace("/login");
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="test-banner">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Portfolio demo · sample data · {COMPANY}
      </div>

      <div className="flex pt-8">
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-[var(--sidebar)] text-white pt-8 transition-transform duration-300 lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-5 py-5 border-b border-white/10">
            <p className="font-display text-[1.65rem] leading-none tracking-tight">{APP_NAME}</p>
            <p className="mt-1.5 text-[11px] text-[var(--sidebar-muted)]">{COMPANY}</p>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] transition ${
                    active
                      ? "bg-[var(--brand)] text-white shadow-lg shadow-black/20"
                      : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-white"
                  }`}
                >
                  <Icon size={16} className={active ? "opacity-100" : "opacity-70 group-hover:opacity-100"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="m-3 rounded-2xl bg-white/5 p-3 border border-white/10">
            <p className="text-xs text-[var(--sidebar-muted)]">Signed in</p>
            <p className="mt-0.5 text-sm font-medium truncate">{user.full_name}</p>
            <p className="text-[11px] text-[var(--sidebar-muted)] capitalize">{formatRole(user.role)}</p>
          </div>
        </aside>

        {open && (
          <button className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px] lg:hidden fade-in" onClick={() => setOpen(false)} aria-label="Close" />
        )}

        <div className="min-w-0 flex-1">
          <header className="sticky top-8 z-20 flex items-center gap-3 border-b border-[var(--line)] bg-[var(--panel)]/90 px-4 py-3 backdrop-blur-md md:px-6">
            <button className="rounded-xl p-2 hover:bg-[var(--bg)] lg:hidden" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-xl md:text-2xl tracking-tight">{title}</h1>
              {subtitle && <p className="truncate text-sm text-[var(--muted)]">{subtitle}</p>}
            </div>
            <Link href="/notifications" className="relative rounded-xl p-2.5 text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--brand)]" />
            </Link>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </header>

          <main className="page-enter p-4 md:p-6 lg:p-8">{children}</main>

          <footer className="border-t border-[var(--line)] px-6 py-4 text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} {COMPANY}. {APP_NAME} portfolio demo.
          </footer>
        </div>
      </div>
    </div>
  );
}

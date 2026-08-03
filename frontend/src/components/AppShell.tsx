"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { APP_NAME, COMPANY } from "@/lib/utils";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  CalendarCheck,
  GraduationCap,
  FileSpreadsheet,
  Calendar,
  Wallet,
  Bus,
  Building2,
  BookOpen,
  Package,
  Briefcase,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ClipboardList,
  GitBranch,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admissions", label: "Admissions", icon: UserPlus },
  { href: "/students", label: "Students", icon: Users },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/grades", label: "Grading", icon: GraduationCap },
  { href: "/exams", label: "Examinations", icon: FileSpreadsheet },
  { href: "/timetable", label: "Timetable", icon: Calendar },
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

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[var(--bg)] text-[var(--ink)]">
        <p className="text-sm tracking-wide">Loading {APP_NAME}…</p>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined" && pathname !== "/login") {
      router.replace("/login");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="test-banner">
        Test site with sample data · {COMPANY} · Not for production use
      </div>
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[var(--line)] bg-[var(--panel)] pt-10 transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-5 py-4 border-b border-[var(--line)]">
            <p className="font-display text-2xl tracking-tight text-[var(--brand)]">{APP_NAME}</p>
            <p className="text-[11px] text-[var(--muted)] mt-0.5">{COMPANY}</p>
          </div>
          <nav className="p-3 space-y-0.5 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
                    active
                      ? "bg-[var(--brand-soft)] text-[var(--brand)] font-medium"
                      : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {open && (
          <button
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
        )}

        <div className="flex-1 min-w-0 pt-10">
          <header className="sticky top-10 z-20 flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--panel)]/90 backdrop-blur px-4 py-3">
            <button className="lg:hidden p-2 rounded-md hover:bg-[var(--bg)]" onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="flex-1">
              <p className="text-sm font-medium capitalize">{user.full_name}</p>
              <p className="text-xs text-[var(--muted)]">{user.role.replace("_", " ")} · {user.email}</p>
            </div>
            <Link href="/notifications" className="p-2 rounded-md hover:bg-[var(--bg)] text-[var(--muted)]">
              <Bell size={18} />
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--ink)] px-2 py-1.5 rounded-md hover:bg-[var(--bg)]"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </header>
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
          <footer className="px-6 py-4 text-xs text-[var(--muted)] border-t border-[var(--line)]">
            © {new Date().getFullYear()} {COMPANY}. {APP_NAME} test environment.
          </footer>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";
import { Bell, LogOut, Menu, X, GraduationCap as Grad } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { APP_NAME, COMPANY, formatRole } from "@/lib/utils";
import { navForRole, canAccess, scopedNotifications } from "@/lib/rbac";

export function AppShell({
  children,
  title,
  subtitle,
  eyebrow,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && user && !canAccess(user.role, pathname)) {
      router.replace("/dashboard");
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-slate-500">
        Loading {APP_NAME}…
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") router.replace("/login");
    return null;
  }

  const nav = navForRole(user.role);
  const alerts = scopedNotifications(user);

  return (
    <div className="min-h-screen bg-surface text-ink lg:grid lg:grid-cols-[280px_1fr]">
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col bg-panel text-white transition lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">{APP_NAME}</p>
            <h1 className="mt-2 font-display text-xl font-semibold leading-tight capitalize">
              {formatRole(user.role)} portal
            </h1>
            <p className="mt-1 text-xs text-white/50">{user.campus}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/35">{COMPANY}</p>
          </div>
          <button type="button" className="rounded-lg p-2 text-white/70 lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-4 mb-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200">Portfolio demo</p>
          <p className="mt-0.5 text-[11px] text-white/60">
            Signed in as {user.full_name} · data scoped to your role
          </p>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
          {nav.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
                        active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm font-semibold">{user.full_name}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/45">{formatRole(user.role)}</p>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {open ? (
        <button type="button" aria-label="Close menu" className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200/80 bg-surface/90 px-4 py-3 backdrop-blur lg:px-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <div className="min-w-0 flex-1">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
            ) : null}
            <p className="truncate font-display text-lg font-semibold tracking-tight lg:text-xl">{title}</p>
            {subtitle ? <p className="truncate text-xs text-slate-500">{subtitle}</p> : null}
          </div>
          <Link
            href="/notifications"
            className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-ink"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-white">
              {alerts.length}
            </span>
          </Link>
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm md:flex">
            <Grad className="h-4 w-4 text-accent" />
            <span className="font-semibold capitalize">{formatRole(user.role)}</span>
          </div>
        </header>

        <main className="px-4 py-6 lg:px-8 lg:py-8">{children}</main>

        <footer className="border-t border-slate-200/80 px-4 py-4 text-xs text-slate-500 lg:px-8">
          © {new Date().getFullYear()} {COMPANY}. {APP_NAME} · viewing as {formatRole(user.role)}.
        </footer>
      </div>
    </div>
  );
}

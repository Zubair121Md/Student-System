"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { DEMO_ACCOUNTS, APP_NAME, COMPANY } from "@/data/mock";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@miasolutions.test");
  const [password, setPassword] = useState("Test@1234");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="test-banner">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Portfolio demo · password for all accounts: Test@1234 · {COMPANY}
      </div>

      <div className="grid min-h-screen pt-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[var(--sidebar)] text-white lg:flex flex-col justify-between p-12 xl:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(11,110,79,.55), transparent 42%), radial-gradient(circle at 85% 75%, rgba(31,78,121,.45), transparent 40%), linear-gradient(160deg, transparent, rgba(255,255,255,.04))",
            }}
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/70">
              <ShieldCheck size={13} /> Student information system
            </p>
            <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight xl:text-7xl">{APP_NAME}</h1>
            <p className="mt-5 max-w-md text-lg text-white/70 leading-relaxed">
              Admissions, academics, fees, and campus operations — a polished portfolio demo for school teams.
            </p>
          </div>
          <div className="relative grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              ["6", "Campuses"],
              ["10.8k", "Students"],
              ["18", "Modules"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-[420px] page-enter">
            <div className="mb-8 lg:hidden">
              <p className="font-display text-4xl text-[var(--brand)]">{APP_NAME}</p>
              <p className="text-sm text-[var(--muted)]">{COMPANY}</p>
            </div>

            <h2 className="font-display text-3xl tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Sign in with a demo account to explore the portal.</p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
              <label className="block text-sm">
                <span className="mb-1.5 block text-[var(--muted)]">Email</span>
                <input
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 outline-none focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-[var(--muted)]">Password</span>
                <input
                  className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 outline-none focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </label>
              {error && <p className="text-sm text-rose-700">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] py-3 font-medium text-white transition hover:bg-[var(--brand-2)] disabled:opacity-60"
              >
                {busy ? "Signing in…" : "Sign in"}
                {!busy && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="mt-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Demo accounts</p>
              <div className="grid gap-2">
                {DEMO_ACCOUNTS.map((a) => (
                  <button
                    key={a.email}
                    type="button"
                    onClick={() => {
                      setEmail(a.email);
                      setPassword(a.password);
                    }}
                    className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-3.5 py-2.5 text-left text-sm transition hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]/40"
                  >
                    <span className="truncate font-medium">{a.full_name}</span>
                    <span className="ml-3 shrink-0 text-[11px] capitalize text-[var(--muted)]">{a.role.replaceAll("_", " ")}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

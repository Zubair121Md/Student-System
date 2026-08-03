"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import { APP_NAME, COMPANY } from "@/lib/utils";

type DemoAccount = { email: string; role: string };

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("admin@miasolutions.test");
  const [password, setPassword] = useState("Test@1234");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [accounts, setAccounts] = useState<DemoAccount[]>([]);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    api<{ accounts: DemoAccount[] }>("/auth/demo-accounts")
      .then((r) => setAccounts(r.accounts))
      .catch(() => {});
  }, []);

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
        Test site with sample data · {COMPANY} · Password for all demo accounts: Test@1234
      </div>
      <div className="grid min-h-screen pt-10 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden lg:flex flex-col justify-between p-12 text-white bg-[var(--brand)]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #7dcaa8 0%, transparent 40%), radial-gradient(circle at 80% 80%, #c45c26 0%, transparent 35%)",
            }}
          />
          <div className="relative">
            <p className="font-display text-5xl leading-none tracking-tight">{APP_NAME}</p>
            <p className="mt-3 text-white/80 max-w-md text-lg">
              Student information system for multi-campus schools — admissions, academics, fees,
              operations, and parent portals.
            </p>
          </div>
          <div className="relative space-y-2 text-sm text-white/75">
            <p>Built by {COMPANY}</p>
            <p>Demo environment · seeded sample data</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="font-display text-4xl text-[var(--brand)]">{APP_NAME}</p>
              <p className="text-sm text-[var(--muted)]">{COMPANY}</p>
            </div>
            <h1 className="font-display text-3xl mb-2">Sign in</h1>
            <p className="text-sm text-[var(--muted)] mb-6">Use a demo account to explore the portal.</p>
            <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
              <label className="block text-sm">
                <span className="text-[var(--muted)]">Email</span>
                <input
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:border-[var(--brand)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="text-[var(--muted)]">Password</span>
                <input
                  className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 outline-none focus:border-[var(--brand)]"
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
                className="w-full rounded-xl bg-[var(--brand)] py-2.5 text-white font-medium hover:bg-[var(--brand-dark)] disabled:opacity-60"
              >
                {busy ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">Demo accounts</p>
              <div className="grid gap-2">
                {accounts.map((a) => (
                  <button
                    key={a.email}
                    type="button"
                    onClick={() => {
                      setEmail(a.email);
                      setPassword("Test@1234");
                    }}
                    className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-left text-sm hover:border-[var(--brand)]"
                  >
                    <span>{a.email}</span>
                    <span className="text-xs text-[var(--muted)] capitalize">{a.role.replace("_", " ")}</span>
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

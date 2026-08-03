"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Field, PrimaryButton, TextInput, SecondaryButton } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { DEMO_ACCOUNTS, APP_NAME, COMPANY } from "@/data/mock";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_35%)]" />

      <div className="relative grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden rounded-3xl border border-slate-200/60 bg-panel p-10 text-white shadow-soft lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300">{COMPANY}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight tracking-tight">{APP_NAME}</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Admissions, academics, fees, and campus operations — a polished portfolio demo for school teams.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {[
              ["6", "Campuses"],
              ["10.8k", "Students"],
              ["18", "Modules"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-semibold">{n}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={onSubmit}
          className="relative w-full rounded-3xl border border-slate-200/80 bg-white p-8 shadow-soft"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-teal-200">
            <GraduationCap className="h-6 w-6" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{COMPANY}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{APP_NAME}</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in with a demo account to explore the portal.</p>
          <p className="mt-1 text-xs text-slate-500">Portfolio demo · password for all accounts: Test@1234</p>

          <div className="mt-8 grid gap-4">
            <Field label="Email" htmlFor="email">
              <TextInput id="email" value={email} onChange={setEmail} placeholder="admin@miasolutions.test" />
            </Field>
            <Field label="Password" htmlFor="password">
              <TextInput id="password" type="password" value={password} onChange={setPassword} placeholder="Password" />
            </Field>
          </div>

          {error ? <p className="mt-4 text-sm font-medium text-danger">{error}</p> : null}

          <PrimaryButton type="submit" disabled={busy} className="mt-6 w-full py-3">
            {busy ? "Signing in…" : "Enter portal"}
          </PrimaryButton>

          <div className="mt-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Demo accounts</p>
            <div className="grid gap-2">
              {DEMO_ACCOUNTS.map((a) => (
                <SecondaryButton
                  key={a.email}
                  className="w-full justify-between px-3 py-2.5 text-left"
                  onClick={() => {
                    setEmail(a.email);
                    setPassword(a.password);
                  }}
                >
                  <span className="truncate font-semibold">{a.full_name}</span>
                  <span className="shrink-0 text-[11px] uppercase tracking-wider text-slate-400">
                    {a.role.replaceAll("_", " ")}
                  </span>
                </SecondaryButton>
              ))}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

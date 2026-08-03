"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

type Msg = { role: "user" | "assistant"; content: string };

export function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I'm MIA Assist from MIA Solutions Pvt. Ltd. Ask about admissions, fees, attendance, exams, or any module. This is a test site with sample data.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!user) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const res = await api<{ reply: string; session_id: string }>("/chat", {
        method: "POST",
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });
      setSessionId(res.session_id);
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry — I couldn't reach the API. Check that the backend is running.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-lg hover:bg-[var(--brand-dark)] transition"
        aria-label="Open MIA Assist"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-2xl">
          <div className="bg-[var(--brand)] px-4 py-3 text-white">
            <p className="font-medium">MIA Assist</p>
            <p className="text-xs text-white/80">AI chatbot · MIA Solutions Pvt. Ltd.</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-[var(--brand)] text-white"
                    : "bg-[var(--bg)] text-[var(--ink)] border border-[var(--line)]"
                }`}
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-[var(--line)] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, attendance…"
              className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-[var(--brand)] p-2.5 text-white disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
